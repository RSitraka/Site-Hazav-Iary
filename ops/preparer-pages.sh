#!/usr/bin/env bash
#
# Prépare le dossier `out/` (export statique) pour un hébergeur de fichiers
# statiques type GitHub Pages. À lancer après :
#
#   STATIC_EXPORT=1 BASE_PATH=/Site-Hazav-Iary npm run build
#
# Le script ne touche à AUCUN fichier de contenu : il ajoute un fichier vide et
# copie deux images. Les pages exportées contiennent le rendu React sérialisé,
# précédé de sa longueur en octets — la moindre réécriture de texte, même
# correcte en apparence, décale cette longueur et le site se vide de lui-même
# au chargement. Ce qui doit changer se décide donc à la génération, pas ici.
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
#    LinkedIn refusent l'aperçu. On dépose une copie `.png` à côté — c'est elle
#    que désignent les balises (voir `ogImagePath` dans `src/lib/seo.ts`).
#    L'original est conservé : les rares liens sans extension restent valides.
for nom in opengraph-image twitter-image; do
  if [ -f "out/$nom" ]; then
    cp "out/$nom" "out/$nom.png"
    echo "→ out/$nom.png"
  fi
done

echo "✅ out/ prêt à être publié"
