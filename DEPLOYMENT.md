# Guide de Déploiement Karibotel

## 🚀 Déploiement sur Vercel (Recommandé)

Vercel est la plateforme idéale pour Next.js, créée par les mêmes développeurs.

### Prérequis
- Compte GitHub
- Compte Vercel (gratuit)
- Base de données MySQL accessible en ligne

### Étapes

1. **Pusher le code sur GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/votre-username/karibotel.git
git push -u origin main
```

2. **Importer sur Vercel**
- Aller sur https://vercel.com
- Cliquer sur "New Project"
- Importer votre repository GitHub
- Vercel détectera automatiquement Next.js

3. **Configurer les variables d'environnement**

Dans les paramètres du projet Vercel, ajouter:

```
DATABASE_URL=mysql://user:pass@host:3306/karibotel
NEXTAUTH_SECRET=votre-secret-genere
NEXTAUTH_URL=https://votre-app.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
EMAIL_FROM=Karibotel <noreply@karibotel.com>
```

4. **Déployer**
- Cliquer sur "Deploy"
- Vercel va builder et déployer automatiquement

5. **Initialiser la base de données**

Après le premier déploiement:
```bash
# En local, pointer vers la DB de production
DATABASE_URL="mysql://..." npx prisma migrate deploy
DATABASE_URL="mysql://..." npm run prisma:seed
```

### Mises à jour automatiques

Chaque push sur la branche `main` déclenchera un nouveau déploiement automatique.

## 🖥️ Déploiement sur cPanel

### Prérequis
- Hébergement avec Node.js activé
- Accès SSH
- MySQL disponible

### Étapes

1. **Builder le projet localement**
```bash
npm run build
```

2. **Uploader les fichiers**

Uploader via FTP/SFTP:
- `.next/`
- `node_modules/` (ou installer sur le serveur)
- `public/`
- `prisma/`
- `package.json`
- `package-lock.json`
- Tous les fichiers de config

3. **Configurer Node.js sur cPanel**
- Aller dans "Setup Node.js App"
- Créer une nouvelle application
- Version Node.js: 18+
- Dossier de l'application: `/home/user/karibotel`
- Fichier de démarrage: `node_modules/next/dist/bin/next`
- Arguments: `start`

4. **Installer les dépendances**
```bash
ssh user@votre-serveur.com
cd karibotel
npm install --production
npx prisma generate
```

5. **Configurer les variables d'environnement**

Créer `.env` sur le serveur:
```env
DATABASE_URL="mysql://user:pass@localhost:3306/karibotel"
NEXTAUTH_SECRET="votre-secret"
NEXTAUTH_URL="https://votre-domaine.com"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASSWORD="votre-mot-de-passe"
EMAIL_FROM="Karibotel <noreply@karibotel.com>"
NODE_ENV="production"
```

6. **Initialiser la base de données**
```bash
npx prisma migrate deploy
npm run prisma:seed
```

7. **Démarrer l'application**
```bash
npm start
```

8. **Configurer le domaine**
- Dans cPanel, pointer votre domaine vers l'application Node.js
- Port par défaut: 3000

## 🐳 Déploiement avec Docker

### Dockerfile

Créer `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://user:pass@db:3306/karibotel
      - NEXTAUTH_SECRET=your-secret
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      - MYSQL_ROOT_PASSWORD=rootpass
      - MYSQL_DATABASE=karibotel
      - MYSQL_USER=user
      - MYSQL_PASSWORD=pass
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### Commandes

```bash
# Builder et démarrer
docker-compose up -d

# Initialiser la DB
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npm run prisma:seed
```

## 🌐 Configuration DNS

### Pour un domaine personnalisé

1. **Chez votre registrar de domaine**
   - Ajouter un enregistrement A pointant vers l'IP du serveur
   - Ou un CNAME pointant vers votre app Vercel

2. **Exemple**
```
Type: A
Nom: @
Valeur: 123.456.789.0
TTL: 3600

Type: CNAME
Nom: www
Valeur: votre-app.vercel.app
TTL: 3600
```

## 🔒 SSL/HTTPS

### Vercel
- SSL automatique et gratuit
- Certificat Let's Encrypt
- Renouvellement automatique

### cPanel
- Utiliser Let's Encrypt (gratuit)
- Ou acheter un certificat SSL
- Activer "Force HTTPS Redirect"

### Nginx (si applicable)
```nginx
server {
    listen 80;
    server_name votre-domaine.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name votre-domaine.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Base de données en production

### Options recommandées

1. **PlanetScale** (MySQL serverless)
   - Gratuit jusqu'à 5GB
   - Scaling automatique
   - Backups automatiques

2. **Railway**
   - MySQL managé
   - Facile à configurer
   - Intégration avec Vercel

3. **AWS RDS**
   - MySQL managé
   - Haute disponibilité
   - Backups automatiques

4. **DigitalOcean Managed Database**
   - MySQL managé
   - Prix abordable
   - Backups quotidiens

### Configuration

Mettre à jour `DATABASE_URL` avec les credentials de production:
```
mysql://user:password@host:port/database?sslaccept=strict
```

## 🔐 Sécurité en production

### Checklist

- [ ] Changer le mot de passe admin par défaut
- [ ] Utiliser un NEXTAUTH_SECRET fort et unique
- [ ] Activer HTTPS
- [ ] Configurer les CORS si nécessaire
- [ ] Limiter les tentatives de connexion
- [ ] Activer les logs d'erreur
- [ ] Configurer les backups de la DB
- [ ] Utiliser des variables d'environnement sécurisées
- [ ] Mettre à jour régulièrement les dépendances

## 📈 Monitoring

### Vercel Analytics
- Activer dans les paramètres du projet
- Suivi des performances
- Métriques Web Vitals

### Logs
```bash
# Vercel
vercel logs

# cPanel
tail -f logs/error.log
```

## 🔄 Mises à jour

### Vercel
```bash
git add .
git commit -m "Update"
git push
# Déploiement automatique
```

### cPanel
```bash
# Sur le serveur
git pull
npm install
npm run build
pm2 restart karibotel
```

## 🆘 Dépannage

### Erreur de connexion DB
- Vérifier DATABASE_URL
- Vérifier que la DB est accessible depuis le serveur
- Vérifier les credentials

### Erreur 500
- Vérifier les logs
- Vérifier les variables d'environnement
- Vérifier que Prisma est généré

### Email ne fonctionne pas
- Vérifier les credentials email
- Vérifier que le port 587 n'est pas bloqué
- Tester avec un autre service SMTP

## 📞 Support

Pour plus d'aide:
- Documentation Vercel: https://vercel.com/docs
- Documentation Next.js: https://nextjs.org/docs
- Documentation Prisma: https://www.prisma.io/docs
