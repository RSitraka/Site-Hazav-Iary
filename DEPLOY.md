# Mise en ligne du site vitrine

Le site se déploie **comme l'application de gestion** : un conteneur Docker sur le serveur,
placé derrière le reverse proxy déjà en place, et reconstruit automatiquement à chaque `push`
sur `main` par GitHub Actions.

```
git push origin main
      │
      ▼
GitHub Actions ──① lint + build (échoue ⇒ rien n'est déployé)
      │
      └──② ssh serveur ──▶ deploy.sh ──▶ docker compose up -d --build
                                          └─ conteneur hazaviary-site sur 127.0.0.1:8091
                                                   ▲
                                          nginx / Caddy (HTTPS) ──▶ visiteurs
```

Ce qui est fourni dans le dépôt :

| Fichier | Rôle |
| --- | --- |
| `Dockerfile` | Image Next.js « standalone », utilisateur non privilégié, healthcheck |
| `docker-compose.prod.yml` | Le conteneur, exposé **uniquement** sur `127.0.0.1:8091` |
| `deploy.sh` | Récupère le code, reconstruit, attend que le site réponde |
| `.github/workflows/deploy.yml` | Vérification puis déploiement à chaque push sur `main` |

> Le port **8091** évite le conflit avec l'application de gestion, qui occupe **8090**.

---

## 1) Choisir l'adresse du site

Le site vitrine est la porte d'entrée du public : il a vocation à occuper le **domaine
principal**, l'application de gestion passant sur un sous-domaine.

| | Adresse | Conteneur |
| --- | --- | --- |
| Site vitrine | `hazaviary.mg` + `www.hazaviary.mg` | `hazaviary-site` (8091) |
| Application de gestion | `app.hazaviary.mg` | `hazaviary-app` (8090) |

Enregistrements DNS à créer chez le registrar : un `A` pour `@`, `www` et `app` vers l'IP du
serveur. Puis mettre à jour `site.url` dans `src/lib/site.ts` avec l'adresse retenue — elle
alimente les balises canoniques, le sitemap, les données structurées et les images de partage.

---

## 2) Installation initiale sur le serveur (une seule fois)

En SSH sur le serveur :

```bash
# Le dépôt du site, à côté de celui de l'application
sudo mkdir -p /var/www/hazaviary-site
sudo chown "$USER":"$USER" /var/www/hazaviary-site
git clone https://github.com/RSitraka/Site-Hazav-Iary.git /var/www/hazaviary-site
cd /var/www/hazaviary-site

# Construit le conteneur, prépare le reverse proxy, demande le certificat
bash ops/installer.sh --domaine hazaviary.mg --email VOTRE@EMAIL
```

`ops/installer.sh` est relançable sans risque : il vérifie Docker, refuse de démarrer si le
port 8091 est pris, attend que le site réponde, détecte nginx ou Caddy et n'ajoute que la
configuration du site vitrine — il ne touche jamais aux conteneurs, volumes ou vhosts de
l'application de gestion. Sans `--email`, il affiche la commande `certbot` au lieu de la lancer.

Les sections 3 et 4 ci-dessous détaillent ce que fait le script, pour le faire à la main ou
pour comprendre ce qu'il a écrit.

---

## 3) Exposer le site en HTTPS

### Si le serveur utilise nginx + certbot

`/etc/nginx/sites-available/hazaviary-site` :

```nginx
server {
    listen 80;
    server_name hazaviary.mg www.hazaviary.mg;

    location / {
        proxy_pass         http://127.0.0.1:8091;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/hazaviary-site /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d hazaviary.mg -d www.hazaviary.mg   # certificat + redirection HTTPS
```

### Si le serveur utilise Caddy (docker-compose.yml de l'application)

Ajouter au `Caddyfile`, à côté du bloc existant :

```caddy
hazaviary.mg, www.hazaviary.mg {
	encode gzip
	reverse_proxy host.docker.internal:8091
}
```

Puis `docker compose restart caddy`. Caddy obtient le certificat tout seul.

> Si l'application occupait le domaine racine, c'est le moment de la basculer sur
> `app.hazaviary.mg` dans son propre `Caddyfile` / vhost nginx.

---

## 4) Auto-déploiement à chaque push

**a. Clé de déploiement** (sur votre poste) :

```bash
ssh-keygen -t ed25519 -f hazaviary_site_deploy -N ""
ssh-copy-id -i hazaviary_site_deploy.pub UTILISATEUR@IP_DU_SERVEUR
```

**b. Secrets GitHub** — dépôt `Site-Hazav-Iary` → Settings → Secrets and variables → Actions :

| Secret | Valeur |
| --- | --- |
| `VM_HOST` | IP ou nom d'hôte du serveur |
| `VM_USER` | utilisateur SSH (ex. `ubuntu`) |
| `VM_SSH_KEY` | contenu du fichier **privé** `hazaviary_site_deploy` |

Ce sont les mêmes noms que pour l'application de gestion : si les deux dépôts visent le même
serveur, ce sont les mêmes valeurs.

**c. C'est prêt :**

```bash
git push origin main   # → vérification, puis mise en ligne automatique
```

Tant que les secrets ne sont pas définis, le job « Mettre en ligne » s'arrête en erreur avec un
message explicite : le build est vérifié, mais rien n'est déployé.

---

## Opérations

```bash
cd /var/www/hazaviary-site
docker compose -f docker-compose.prod.yml logs -f site   # logs du site
docker compose -f docker-compose.prod.yml ps             # état du conteneur
bash deploy.sh                                           # déployer à la main

# Revenir à la version précédente
git reset --hard HEAD~1 && docker compose -f docker-compose.prod.yml up -d --build
```

Le site est entièrement statique : aucun volume, aucune base, rien à sauvegarder. Un
redéploiement ne peut donc rien perdre — contrairement à l'application de gestion, dont le
volume `hazaviary-data` ne doit jamais être supprimé.
