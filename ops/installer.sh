#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Installation du site vitrine Hazav'Iary sur le serveur
# ---------------------------------------------------------------------------
# À lancer DEPUIS le dépôt cloné sur le serveur :
#
#   cd /var/www/hazaviary-site
#   bash ops/installer.sh --domaine hazaviary.mg
#   bash ops/installer.sh --domaine hazaviary.mg --email contact@hazaviary.mg
#
# Le script :
#   1. vérifie Docker et la disponibilité du port 8091
#   2. construit et démarre le conteneur du site (127.0.0.1:8091)
#   3. détecte le reverse proxy déjà installé (nginx ou Caddy) et prépare la
#      configuration correspondante
#   4. demande le certificat HTTPS si --email est fourni, sinon affiche la
#      commande à lancer
#
# Il ne touche JAMAIS aux conteneurs, volumes ou vhosts de l'application de
# gestion : il n'ajoute que ce qui concerne le site vitrine.
# Relançable sans risque : chaque étape vérifie l'existant avant d'agir.
set -euo pipefail

DOMAINE=""
EMAIL=""
PORT=8091

while [ $# -gt 0 ]; do
  case "$1" in
    --domaine) DOMAINE="${2:-}"; shift 2 ;;
    --email)   EMAIL="${2:-}";   shift 2 ;;
    -h|--help) sed -n '2,20p' "$0"; exit 0 ;;
    *) echo "Option inconnue : $1" >&2; exit 1 ;;
  esac
done

[ -n "$DOMAINE" ] || { echo "❌ Usage : bash ops/installer.sh --domaine hazaviary.mg [--email vous@exemple.mg]" >&2; exit 1; }

RACINE="$(cd "$(dirname "$0")/.." && pwd)"
cd "$RACINE"

echo "▶ Site       : $DOMAINE (et www.$DOMAINE)"
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

# ------------------------------------------------------- 2. Conteneur du site
[ -f .env ] || {
  echo "▶ Création du fichier .env (endpoint de formulaire vide)"
  echo 'NEXT_PUBLIC_CONTACT_ENDPOINT=' > .env
}

echo "▶ Construction et démarrage du conteneur…"
docker compose -f docker-compose.prod.yml up -d --build

echo "▶ Attente de la réponse du site…"
for i in $(seq 1 45); do
  if curl -fsS -o /dev/null "http://127.0.0.1:$PORT/"; then
    echo "✅ Le site répond sur 127.0.0.1:$PORT"
    break
  fi
  [ "$i" = 45 ] && { echo "❌ Pas de réponse après 90 s." >&2; docker compose -f docker-compose.prod.yml logs --tail 40 site >&2; exit 1; }
  sleep 2
done
echo

# ------------------------------------------------------- 3. Reverse proxy
VHOST="/etc/nginx/sites-available/hazaviary-site"

if command -v nginx >/dev/null 2>&1; then
  echo "▶ nginx détecté — préparation du vhost $DOMAINE"

  sudo tee "$VHOST" >/dev/null <<NGINX
# Site vitrine Hazav'Iary — conteneur hazaviary-site (127.0.0.1:$PORT)
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAINE www.$DOMAINE;

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
  echo "✅ nginx sert $DOMAINE en HTTP"

  # ----------------------------------------------------------- 4. HTTPS
  if command -v certbot >/dev/null 2>&1; then
    if [ -n "$EMAIL" ]; then
      echo "▶ Demande du certificat Let's Encrypt…"
      sudo certbot --nginx -d "$DOMAINE" -d "www.$DOMAINE" \
        --non-interactive --agree-tos -m "$EMAIL" --redirect
      echo "✅ HTTPS actif : https://$DOMAINE"
    else
      echo
      echo "➡  Dernière étape, le certificat HTTPS :"
      echo "   sudo certbot --nginx -d $DOMAINE -d www.$DOMAINE --redirect"
    fi
  else
    echo
    echo "➡  certbot n'est pas installé :"
    echo "   sudo apt install -y certbot python3-certbot-nginx"
    echo "   sudo certbot --nginx -d $DOMAINE -d www.$DOMAINE --redirect"
  fi

elif docker ps --format '{{.Names}} {{.Image}}' | grep -qi caddy; then
  echo "▶ Caddy détecté (conteneur) — ajoutez ce bloc à son Caddyfile,"
  echo "  puis relancez-le : docker compose restart caddy"
  cat <<CADDY

$DOMAINE, www.$DOMAINE {
	encode gzip
	reverse_proxy host.docker.internal:$PORT
}

CADDY
  echo "  (si host.docker.internal n'est pas résolu, utilisez l'IP de la passerelle"
  echo "   docker0 : ip -4 addr show docker0 | grep -oP 'inet \\K[\\d.]+')"

else
  echo "⚠  Aucun reverse proxy détecté (ni nginx, ni conteneur Caddy)."
  echo "   Le site tourne sur 127.0.0.1:$PORT mais n'est pas encore public."
  echo "   Installez nginx puis relancez ce script :"
  echo "     sudo apt install -y nginx certbot python3-certbot-nginx"
fi

echo
echo "──────────────────────────────────────────────────────────────"
echo "État du conteneur :"
docker compose -f docker-compose.prod.yml ps
echo
echo "Mise en ligne automatique : ajoutez les secrets VM_HOST, VM_USER et"
echo "VM_SSH_KEY dans GitHub (voir DEPLOY.md § 4) — ensuite chaque push sur"
echo "main redéploiera ce serveur tout seul."
