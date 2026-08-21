# Image du site vitrine Hazav'Iary — Next.js 15 en sortie « standalone ».
#
# Trois étapes pour que l'image finale ne contienne ni le code source, ni les
# dépendances de développement : seulement le serveur Node compilé et les
# fichiers publics.
#
#   deps  : installe les dépendances (couche mise en cache tant que
#           package-lock.json ne change pas)
#   build : compile le site (24 pages statiques + serveur standalone)
#   run   : image finale, ~180 Mo, tourne en utilisateur non privilégié

# ---------------------------------------------------------------- dépendances
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --------------------------------------------------------------------- build
FROM node:20-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# L'endpoint du formulaire est lu au moment du build (variable NEXT_PUBLIC_*) :
# il doit donc être passé ici, pas au démarrage du conteneur.
ARG NEXT_PUBLIC_CONTACT_ENDPOINT=""
ENV NEXT_PUBLIC_CONTACT_ENDPOINT=$NEXT_PUBLIC_CONTACT_ENDPOINT
RUN npm run build

# ----------------------------------------------------------------- exécution
FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Utilisateur dédié : le serveur n'a aucune raison de tourner en root.
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

# `public/` (logo, photos) et les fichiers statiques ne sont pas inclus dans la
# sortie standalone : on les copie explicitement.
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# Le conteneur est déclaré « sain » dès que le site répond.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
