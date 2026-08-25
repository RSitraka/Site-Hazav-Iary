#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Synchronisation des réalisations : application de gestion → site vitrine
# ---------------------------------------------------------------------------
# Une fois par jour, sur le serveur. Le script :
#   1. prend un instantané COHÉRENT de la base de l'application
#      (`sqlite3 .backup`, jamais un `cp` — même méthode que son ops/backup.sh)
#   2. en extrait les chantiers terminés et les zones où du matériel a été posé
#   3. écrit src/data/realisations.json dans le dépôt du site
#   4. pousse le fichier s'il a changé — ce qui redéclenche la mise en ligne
#
# L'application n'est jamais modifiée : le script ne fait que LIRE une copie de
# sa base, prise sans l'arrêter. Il ne se connecte pas à elle, ne l'expose pas
# à internet et n'écrit rien dans son volume.
#
# CE QUI SORT (et rien d'autre) : code chantier, zone, année, matériel posé.
# Le nom du bénéficiaire, son téléphone, les montants convenus, les notes et
# les descriptions restent dans l'application — la requête ne les lit même pas.
#
# Usage :
#   bash ops/sync-realisations.sh                  # écrit et pousse si besoin
#   bash ops/sync-realisations.sh --sans-push      # écrit seulement (essai)
#   bash ops/sync-realisations.sh --deployer       # + relance deploy.sh ensuite
#
# Installation en tâche quotidienne (2 h du matin) :
#   crontab -e
#   0 2 * * * cd /var/www/hazaviary-site && bash ops/sync-realisations.sh >> /var/log/hazaviary-sync.log 2>&1
set -euo pipefail

VOLUME=${HAZAVIARY_VOLUME:-hazaviary_hazaviary-data}
DATA=${HAZAVIARY_DATA_DIR:-/var/lib/docker/volumes/$VOLUME/_data}
BASE=${HAZAVIARY_DB:-$DATA/hazaviary.db}
PUSH=1
DEPLOYER=0

while [ $# -gt 0 ]; do
  case "$1" in
    --sans-push) PUSH=0; shift ;;
    --deployer)  DEPLOYER=1; shift ;;
    -h|--help)   sed -n '2,30p' "$0"; exit 0 ;;
    *) echo "Option inconnue : $1" >&2; exit 1 ;;
  esac
done

RACINE="$(cd "$(dirname "$0")/.." && pwd)"
CIBLE="$RACINE/src/data/realisations.json"

log() { echo "[$(date '+%F %T')] $*"; }
die() { echo "[$(date '+%F %T')] ERREUR : $*" >&2; exit 1; }

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

# --- 1. Instantané cohérent de la base ---------------------------------------
# La requête ne lit que quatre colonnes publiables : code, zone, année et noms
# du matériel posé. Elle est écrite dans un fichier plutôt que passée en
# argument — les guillemets simples des littéraux SQL survivent ainsi tels
# quels (SQLite refuse les guillemets doubles comme littéraux de chaîne).
cat > "$WORK/requete.sql" <<'SQL'
SELECT json_object(
  'genere_le', strftime('%Y-%m-%dT%H:%M:%SZ', 'now'),
  'chantiers', (
    SELECT COALESCE(json_group_array(json_object(
      'code',     p.code,
      'zone',     COALESCE(l.name, ''),
      'annee',    CAST(substr(p.created_at, 1, 4) AS INTEGER),
      'materiel', COALESCE((
        SELECT json_group_array(nom) FROM (
          SELECT DISTINCT m.name AS nom
          FROM project_materials pm JOIN materials m ON m.id = pm.material_id
          WHERE pm.project_id = p.id ORDER BY m.name
        )
      ), json_array())
    )), json_array())
    FROM projects p LEFT JOIN locations l ON l.id = p.location_id
    WHERE p.status = 'termine' AND TRIM(COALESCE(p.code, '')) <> ''
    ORDER BY p.created_at DESC
  ),
  'zones', (
    SELECT COALESCE(json_group_array(nom), json_array()) FROM (
      SELECT DISTINCT l.name AS nom
      FROM locations l JOIN projects p ON p.location_id = l.id
      WHERE p.status = 'termine' ORDER BY l.name
    )
  )
);
SQL

# `-readonly` : la base de l'application est ouverte en lecture seule, elle ne
# peut donc pas être modifiée ni voir apparaître de fichiers annexes.
EXTRACTION='
  sqlite3 -readonly "$SRC" ".backup $OUT/copie.db" || exit 1
  sqlite3 "$OUT/copie.db" "PRAGMA integrity_check" > "$OUT/integrite" 2>/dev/null || echo illisible > "$OUT/integrite"
  sqlite3 "$OUT/copie.db" "SELECT COUNT(*) FROM projects" > "$OUT/nb_projets" 2>/dev/null || echo -1 > "$OUT/nb_projets"
  sqlite3 -noheader "$OUT/copie.db" < "$OUT/requete.sql" > "$OUT/realisations.json" 2> "$OUT/erreur" || true
'

if command -v sqlite3 >/dev/null 2>&1; then
  [ -f "$BASE" ] || die "base introuvable : $BASE (volume « $VOLUME » absent ?)"
  SRC="$BASE" OUT="$WORK" bash -c "set -e; $EXTRACTION" \
    || die "lecture de la base impossible — le fichier existant n'a pas été touché"
else
  log "sqlite3 absent de l'hôte, passage par un conteneur jetable"
  command -v docker >/dev/null 2>&1 || die "ni sqlite3 ni docker : impossible de lire la base proprement"

  # En production la base vit dans le volume Docker de l'application, dont le
  # contenu n'est lisible que par root : on monte alors le volume lui-même,
  # ce qui évite d'avoir à fouiller /var/lib/docker. Sinon (essai, base
  # exportée ailleurs), on monte le dossier qui contient le fichier.
  if [ "$BASE" = "$DATA/hazaviary.db" ] && docker volume inspect "$VOLUME" >/dev/null 2>&1; then
    MONTAGE="$VOLUME"
  else
    [ -f "$BASE" ] || die "base introuvable : $BASE"
    MONTAGE="$(cd "$(dirname "$BASE")" && pwd)"
  fi

  docker run --rm -v "$MONTAGE":/data:ro -v "$WORK":/out \
    -e SRC="/data/$(basename "$BASE")" -e OUT=/out \
    alpine:3.20 sh -c "set -e; apk add --no-cache sqlite >/dev/null; $EXTRACTION" \
    || die "lecture de la base impossible — le fichier existant n'a pas été touché"
fi

[ -s "$WORK/erreur" ] && log "sqlite : $(head -3 "$WORK/erreur" | tr '\n' ' ')"

# --- 2. Garde-fous ------------------------------------------------------------
# Mieux vaut une synchronisation en erreur qu'un site vidé de ses références par
# une base illisible ou mal montée.
[ "$(cat "$WORK/integrite" 2>/dev/null)" = ok ] \
  || die "instantané corrompu (integrity_check = $(cat "$WORK/integrite" 2>/dev/null)) — rien n'a été écrit"
NB=$(cat "$WORK/nb_projets" 2>/dev/null || echo -1)
[ "${NB:--1}" -ge 0 ] || die "table « projects » illisible : est-ce bien la base de production ?"
[ -s "$WORK/realisations.json" ] || die "extraction vide — rien n'a été écrit"
grep -q '"chantiers"' "$WORK/realisations.json" || die "sortie inattendue — rien n'a été écrit"

CHANTIERS=$(grep -o '"code"' "$WORK/realisations.json" | wc -l)
log "extraction : $CHANTIERS chantier(s) terminé(s) publiable(s), sur $NB projet(s) au total"

# --- 3. Écriture dans le dépôt ------------------------------------------------
mkdir -p "$(dirname "$CIBLE")"
# Mise en forme lisible pour que les différences Git soient parlantes. Sans
# python3 ni node, le JSON reste sur une ligne : valide, simplement moins beau.
if command -v python3 >/dev/null 2>&1; then
  python3 -m json.tool --indent 2 "$WORK/realisations.json" > "$CIBLE.tmp"
elif command -v node >/dev/null 2>&1; then
  node -e 'const f=process.argv[1];const d=require("fs").readFileSync(f,"utf8");process.stdout.write(JSON.stringify(JSON.parse(d),null,2)+"\n")' \
    "$WORK/realisations.json" > "$CIBLE.tmp"
else
  cp "$WORK/realisations.json" "$CIBLE.tmp"
fi
[ -s "$CIBLE.tmp" ] || die "mise en forme du JSON impossible — le fichier existant n'a pas été touché"
mv "$CIBLE.tmp" "$CIBLE"

cd "$RACINE"

if [ -z "$(git status --porcelain -- "$CIBLE")" ]; then
  log "aucun changement — rien à pousser"
  exit 0
fi

# `genere_le` change à chaque exécution : si c'est la seule différence, on
# remet le fichier en l'état plutôt que de pousser un commit vide de sens.
if git ls-files --error-unmatch "$CIBLE" >/dev/null 2>&1; then
  MODIFS=$(git diff -- "$CIBLE" | grep '^[+-]' | grep -v '^[+-][+-]' | grep -v genere_le || true)
  if [ -z "$MODIFS" ]; then
    log "seul l'horodatage a changé — on remet le fichier en l'état"
    git checkout -- "$CIBLE"
    exit 0
  fi
fi

log "réalisations mises à jour"
if [ "$PUSH" = 1 ]; then
  git add "$CIBLE"
  git -c user.name="Synchronisation Hazav'Iary" -c user.email="noreply@hazaviary.mg" \
    commit -q -m "Réalisations : synchronisation depuis l'application de gestion"
  git push origin HEAD:main
  log "poussé — la mise en ligne va se relancer toute seule"
else
  log "--sans-push : le fichier est écrit, rien n'est poussé"
fi

if [ "$DEPLOYER" = 1 ]; then
  log "redéploiement local…"
  bash "$RACINE/deploy.sh"
fi
