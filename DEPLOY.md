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

---

## 0) Variante : hébergement gratuit, sans domaine

Le site n'a **aucune page dynamique** : il peut être exporté en HTML pur et hébergé
gratuitement, le temps d'acquérir le domaine.

```bash
STATIC_EXPORT=1 npm run build   # écrit un dossier out/ (~4,7 Mo, tout compris)
```

**Cloudflare Pages** (gratuit, sans carte bancaire, adresse `*.pages.dev` fournie) :

1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → dépôt `Site-Hazav-Iary`
2. Build command : `STATIC_EXPORT=1 npm run build` — Output directory : `out`
3. Variables d'environnement : `STATIC_EXPORT=1`, `NODE_VERSION=20`, et
   `NEXT_PUBLIC_SITE_URL=https://<votre-projet>.pages.dev`

C'est tout : **chaque push sur `main` redéploie le site automatiquement**, sans secret à
configurer. Netlify fonctionne à l'identique (le fichier `public/_headers` est compris par les
deux). GitHub Pages marche aussi, mais sert le site sous `/Site-Hazav-Iary/`, ce qui impose un
`basePath` — à éviter tant qu'une autre option existe.

Deux différences avec le conteneur Docker, tenues par l'hébergeur :

- les images ne sont plus redimensionnées à la volée — elles sont servies telles quelles ;
- les en-têtes de sécurité viennent de `public/_headers` et non de `next.config.ts`.

`NEXT_PUBLIC_SITE_URL` remplace `site.url` pour les balises canoniques, le sitemap et les images
de partage : sans elle, le site s'annoncerait sous un domaine qui n'existe pas encore. Le jour
où `hazaviary.mg` est acheté, il suffit de le rattacher au projet Pages (Custom domain) et de
retirer la variable — ou de revenir à l'installation ci-dessous, sur votre serveur.

---

## 1) Choisir l'adresse du site

Le site s'installe **à côté** de l'application de gestion, sans rien lui changer : son propre
conteneur, son propre port, son propre vhost, son propre certificat. L'application garde son
adresse, sa configuration et ses données.

| | Adresse | Conteneur | Port |
| --- | --- | --- | --- |
| Site vitrine | `hazaviary.mg` + `www.hazaviary.mg` | `hazaviary-site` | 8091 |
| Application de gestion | *inchangée* | `hazaviary-app` | 8090 |

**Le nom choisi doit être libre.** Si l'application répond déjà sur le domaine racine, donnez au
site un nom d'hôte distinct (`www.hazaviary.mg`, `site.hazaviary.mg`…) : `ops/installer.sh`
refuse de démarrer si le nom demandé est déjà servi par une autre configuration, plutôt que de
détourner son trafic.

Enregistrements DNS à créer chez le registrar : un `A` par nom d'hôte servi, vers l'IP du
serveur. Puis mettre `site.url` (`src/lib/site.ts`) à l'adresse retenue — elle alimente les
balises canoniques, le sitemap, les données structurées et les images de partage.

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

> Le bloc existant de l'application n'est pas modifié : on en **ajoute** un second. C'est la
> seule situation où un fichier de l'application est touché — parce que son Caddy occupe les
> ports 80 et 443. Avec nginx, rien de tel : le site a son propre fichier de vhost.

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

---

## Alimenter le site depuis l'application de gestion

Un site statique fige ses données au moment du build : pour qu'une nouvelle réalisation
apparaisse, il faut **redéclencher un build**. Deux montages possibles, sans jamais modifier
l'application.

C'est le rôle de **`ops/sync-realisations.sh`**, à lancer une fois par jour sur le serveur :

1. il prend un instantané **cohérent** de la base de l'application — `sqlite3 .backup` ouvert en
   lecture seule, jamais un `cp` : la même méthode que son propre `ops/backup.sh` ;
2. il en extrait les chantiers **terminés** (code, zone, année, matériel posé) et les zones où du
   matériel a réellement été installé ;
3. il écrit `src/data/realisations.json` et le pousse **s'il a changé** — ce qui redéclenche la
   mise en ligne comme n'importe quel commit.

```bash
cd /var/www/hazaviary-site
bash ops/sync-realisations.sh --sans-push   # essai : écrit le fichier, ne pousse rien
bash ops/sync-realisations.sh               # écrit et pousse
bash ops/sync-realisations.sh --deployer    # + relance deploy.sh (si le site tourne ici)

# Une fois par jour, à 2 h :
crontab -e
0 2 * * * cd /var/www/hazaviary-site && bash ops/sync-realisations.sh >> /var/log/hazaviary-sync.log 2>&1
```

**L'application n'est jamais modifiée** : le script lit une copie de sa base, prise sans
l'arrêter, ne s'y connecte pas et n'écrit rien dans son volume. Il refuse d'écrire quoi que ce
soit si l'instantané est corrompu, si la table `projects` est illisible ou si l'extraction est
vide : mieux vaut une synchronisation en erreur qu'un site vidé de ses références.

**Ce qui sort, et rien d'autre** : code chantier, zone, année, matériel. Le nom du bénéficiaire,
son téléphone, les montants et les notes ne sont même pas lus par la requête.

Le fichier `src/data/realisations.json` alimente `projects` et `installedZones`
(`src/lib/content.ts`). Tant qu'il est vide, la section « Références » n'apparaît pas et la page
annonce la couverture nationale.

> Pour pousser depuis le serveur, le dépôt doit y être cloné avec une clé de déploiement **en
> écriture** (GitHub → Settings → Deploy keys → *Allow write access*). Sans elle, utilisez
> `--sans-push --deployer` : le site se met à jour sur le serveur, sans passer par GitHub.
