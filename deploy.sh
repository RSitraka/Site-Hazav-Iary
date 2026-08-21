#!/usr/bin/env bash
# Déploiement du site vitrine sur le serveur : récupère le code et reconstruit
# le conteneur. Appelé par GitHub Actions (en SSH) à chaque push sur `main`, ou
# lancé à la main sur le serveur.
#
# Même forme que le deploy.sh de l'application de gestion, pour que les deux
# projets se déploient de la même façon.
set -euo pipefail

# Répertoire du site sur le serveur (surchargeable : SITE_DIR=... bash deploy.sh)
cd "${SITE_DIR:-/var/www/hazaviary-site}"

echo "▶ Récupération du code…"
git fetch --all --quiet
git reset --hard origin/main   # ne touche pas .env (non versionné)

echo "▶ (Re)construction et redémarrage du conteneur…"
docker compose -f docker-compose.prod.yml up -d --build

echo "▶ Attente de la mise en service…"
for i in $(seq 1 30); do
  if curl -fsS -o /dev/null http://127.0.0.1:8091/; then
    echo "✅ Déployé : $(git rev-parse --short HEAD)"
    docker image prune -f >/dev/null 2>&1 || true
    exit 0
  fi
  sleep 2
done

echo "❌ Le conteneur ne répond pas sur 127.0.0.1:8091 après 60 s." >&2
docker compose -f docker-compose.prod.yml logs --tail 50 site >&2
exit 1
