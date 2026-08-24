#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Installation du site vitrine Hazav'Iary — À CÔTÉ de l'application de gestion
# ---------------------------------------------------------------------------
# À lancer DEPUIS le dépôt cloné sur le serveur :
#
#   cd /var/www/hazaviary-site
#   bash ops/installer.sh --domaine hazaviary.mg
#   bash ops/installer.sh --domaine www.hazaviary.mg --email contact@hazaviary.mg
#
# Le script :
#   1. vérifie Docker et la disponibilité du port 8091
#   2. refuse de continuer si le nom de domaine demandé est DÉJÀ servi par une
#      autre configuration (ce serait peut-être l'application de gestion)
#   3. construit et démarre le conteneur du site (127.0.0.1:8091)
#   4. ajoute un vhost nginx dédié, puis demande le certificat HTTPS si
#      --email est fourni
#
# Ce qui appartient à l'application de gestion n'est jamais touché : ni ses
# conteneurs, ni ses volumes, ni ses vhosts, ni son Caddyfile. Le script
# n'écrit qu'un fichier, /etc/nginx/sites-available/hazaviary-site, et ne
# démarre qu'un conteneur, hazaviary-site.
# Relançable sans risque : chaque étape vérifie l'existant avant d'agir.
set -euo pipefail

DOMAINE=""
EMAIL=""
PORT=8091
VHOST="/etc/nginx/sites-available/hazaviary-site"

while [ $# -gt 0 ]; do
  case "$1" in
    --domaine) DOMAINE="${2:-}"; shift 2 ;;
    --email)   EMAIL="${2:-}";   shift 2 ;;
    -h|--help) sed -n '2,24p' "$0"; exit 0 ;;
    *) echo "Option inconnue : $1" >&2; exit 1 ;;
  esac
done

[ -n "$DOMAINE" ] || { echo "❌ Usage : bash ops/installer.sh --domaine hazaviary.mg [--email vous@exemple.mg]" >&2; exit 1; }

# Domaine racine (« hazaviary.mg ») : on sert aussi le www.
# Sous-domaine explicite (« www.hazaviary.mg », « site.hazaviary.mg ») : on ne
# sert que celui-là, pour ne pas empiéter sur ce qui répond déjà à côté.
case "$DOMAINE" in
  www.*|*.*.*) NOMS="$DOMAINE" ;;
  *)           NOMS="$DOMAINE www.$DOMAINE" ;;
esac

RACINE="$(cd "$(dirname "$0")/.." && pwd)"
cd "$RACINE"

echo "▶ Site       : $NOMS"
echo "▶ Répertoire : $RACINE"
echo

# --------------------------------------------------------------- 1. Prérequis
command -v docker >/dev/null || { echo "❌ Docker n'est pas installé. Voir https://docs.docker.com/engine/install/" >&2; exit 1; }
docker compose version >/dev/null 2>&1 || { echo "❌ Le plugin « docker compose » manque (paquet docker-compose-plugin)." >&2; exit 1; }
docker info >/dev/null 2>&1 || { echo "❌ Docker n'est pas accessible pour cet utilisateur. Ajoutez-le au groupe docker : sudo usermod -aG docker \$USER (puis reconnectez-vous)." >&2; exit 1; }

# Le port ne doit pas être pris par autre chose que notre propre conteneur.
if ss -ltn 2>/dev/null | grep -q "127.0.0.1:$PORT " && ! docker ps --format '{{.Names}}' | grep -qx hazaviary-site; then
  echo "❌ Le port $PORT est déjà utilisé par un autre service. Changez-le dans docker-compose.prod.yml." >&2
  exit 1
fi

# ------------------------------------------- 2. Garde-fou « installer à côté »
# Aucun nom demandé ne doit déjà être servi ailleurs : sans cette vérification,
# le vhost du site pourrait détourner le trafic de l'application de gestion.
# En cas de collision, on s'arrête AVANT d'écrire quoi que ce soit.
CONFLIT=""
for f in /etc/nginx/sites-enabled/* /etc/nginx/conf.d/*.conf; do
  [ -e "$f" ] || continue
  # Notre propre vhost (déjà installé par un passage précédent) ne compte pas.
  [ "$(readlink -f "$f")" = "$(readlink -f "$VHOST" 2>/dev/null || true)" ] && continue
  for nom in $NOMS; do
    if grep -Eq "^[[:space:]]*server_name[^;]*[[:space:]]$nom([[:space:];]|$)" "$f"; then
      CONFLIT="$CONFLIT $f($nom)"
    fi
  done
done

if [ -n "$CONFLIT" ]; then
  echo "❌ Déjà servi ailleurs :$CONFLIT" >&2
  echo "   Ce script n'écrase aucune configuration existante — c'est peut-être" >&2
  echo "   l'application de gestion. Choisissez un nom d'hôte libre, par exemple :" >&2
  echo "     bash ops/installer.sh --domaine www.${DOMAINE#www.}" >&2
  exit 1
fi

# --------------------------------------------------- 3. Conteneur du site
[ -f .env ] || {
  echo "▶ Création du fichier .env (endpoint de formulaire vide)"
  echo 'NEXT_PUBLIC_CONTACT_ENDPOINT=' > .env
}

echo "▶ Construction et démarrage du conteneur…"
docker compose -f docker-compose.prod.yml up -d --build

echo "▶ Attente de la réponse du site…"
for i in $(seq 1 45); do
  if curl -fs -o /dev/null "http://127.0.0.1:$PORT/"; then
    echo "✅ Le site répond sur 127.0.0.1:$PORT"
    break
  fi
  [ "$i" = 45 ] && { echo "❌ Pas de réponse après 90 s." >&2; docker compose -f docker-compose.prod.yml logs --tail 40 site >&2; exit 1; }
  sleep 2
done
echo

# --------------------------------------------------- 4. Exposition publique
if command -v nginx >/dev/null 2>&1; then
  echo "▶ nginx détecté — ajout du vhost du site (aucun autre fichier modifié)"

  sudo tee "$VHOST" >/dev/null <<NGINX
# Site vitrine Hazav'Iary — conteneur hazaviary-site (127.0.0.1:$PORT).
# Fichier géré par ops/installer.sh du dépôt Site-Hazav-Iary.
# L'application de gestion a sa propre configuration, indépendante de celle-ci.
server {
    listen 80;
    listen [::]:80;
    server_name $NOMS;

    location / {
        proxy_pass         http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header   Host              \$host;
        proxy_set_header   X-Real-IP         \$remote_addr;
        proxy_set_header   X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto \$scheme;
    }
}
NGINX

  sudo ln -sfn "$VHOST" /etc/nginx/sites-enabled/hazaviary-site
  sudo nginx -t
  sudo systemctl reload nginx
  echo "✅ nginx sert $NOMS en HTTP"

  CERT_ARGS=""
  for nom in $NOMS; do CERT_ARGS="$CERT_ARGS -d $nom"; done

  if command -v certbot >/dev/null 2>&1; then
    if [ -n "$EMAIL" ]; then
      echo "▶ Demande du certificat Let's Encrypt…"
      # --cert-name isole ce certificat : celui de l'application n'est pas touché.
      sudo certbot --nginx $CERT_ARGS --cert-name hazaviary-site \
        --non-interactive --agree-tos -m "$EMAIL" --redirect
      echo "✅ HTTPS actif : https://${NOMS%% *}"
    else
      echo
      echo "➡  Dernière étape, le certificat HTTPS :"
      echo "   sudo certbot --nginx$CERT_ARGS --cert-name hazaviary-site --redirect"
    fi
  else
    echo
    echo "➡  certbot n'est pas installé :"
    echo "   sudo apt install -y certbot python3-certbot-nginx"
    echo "   sudo certbot --nginx$CERT_ARGS --cert-name hazaviary-site --redirect"
  fi

elif docker ps --format '{{.Names}} {{.Image}}' | grep -qi caddy; then
  echo "⚠  Le serveur est en façade avec Caddy (conteneur), qui appartient à"
  echo "   l'application de gestion. Le script NE le modifie pas."
  echo
  echo "   Le site tourne sur 127.0.0.1:$PORT ; pour le publier, il faut ajouter"
  echo "   ce bloc — et rien d'autre — au Caddyfile, puis : docker compose restart caddy"
  cat <<CADDY

${NOMS//  / } {
	encode gzip
	reverse_proxy host.docker.internal:$PORT
}

CADDY
  echo "   Le bloc existant de l'application reste inchangé. Si"
  echo "   host.docker.internal n'est pas résolu, utilisez l'IP de docker0 :"
  echo "     ip -4 addr show docker0 | grep -oP 'inet \\K[\\d.]+'"

else
  echo "⚠  Aucun reverse proxy détecté (ni nginx, ni conteneur Caddy)."
  echo "   Le site tourne sur 127.0.0.1:$PORT mais n'est pas encore public."
  echo "   Installez nginx puis relancez ce script :"
  echo "     sudo apt install -y nginx certbot python3-certbot-nginx"
fi

echo
echo "──────────────────────────────────────────────────────────────"
echo "Conteneur du site (l'application de gestion n'apparaît pas ici) :"
docker compose -f docker-compose.prod.yml ps
echo
echo "Mise en ligne automatique : ajoutez les secrets VM_HOST, VM_USER et"
echo "VM_SSH_KEY dans GitHub (voir DEPLOY.md § 4) — ensuite chaque push sur"
echo "main redéploiera ce serveur tout seul."
