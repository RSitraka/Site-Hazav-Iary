#!/usr/bin/env bash
#
# Prépare le dossier `out/` (export statique) pour un hébergeur de fichiers
# statiques type GitHub Pages. À lancer après :
#
#   STATIC_EXPORT=1 BASE_PATH=/Site-Hazav-Iary npm run build
#
# Deux ajustements, et rien d'autre : le contenu du site n'est pas modifié.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -d out ]; then
  echo "✖ Dossier out/ absent — lancez d'abord le build en export statique." >&2
  exit 1
fi

# 1) Sans ce fichier, GitHub Pages fait passer le site par Jekyll, qui ignore
#    les dossiers commençant par un souligné : tout `_next/` disparaîtrait,
#    donc le CSS et le JavaScript avec.
touch out/.nojekyll

# 2) Next exporte les images de partage sans extension (`out/opengraph-image`).
#    Un hébergeur statique déduit le type MIME de l'extension : sans elle, le
#    fichier est servi en `application/octet-stream` et Facebook, WhatsApp ou
#    LinkedIn refusent l'aperçu. On renomme, puis on corrige les liens qui les
#    désignent (balises Open Graph, Twitter Card et données structurées).
for nom in opengraph-image twitter-image; do
  if [ -f "out/$nom" ] && [ ! -f "out/$nom.png" ]; then
    mv "out/$nom" "out/$nom.png"
    echo "→ out/$nom → out/$nom.png"
  fi
done

# La classe de caractères exclut « . » et « / » : un lien déjà corrigé
# (`…-image.png`) et les morceaux de chemin interne (`chunks/app/…-image/…`)
# ne sont donc pas touchés, même si le script est relancé.
find out -type f \( -name '*.html' -o -name '*.txt' -o -name '*.xml' -o -name '*.webmanifest' \) \
  -exec sed -i \
    -e 's|/opengraph-image\([^./a-zA-Z0-9]\)|/opengraph-image.png\1|g' \
    -e 's|/twitter-image\([^./a-zA-Z0-9]\)|/twitter-image.png\1|g' {} +

echo "✅ out/ prêt à être publié"
