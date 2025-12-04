# Guide d'Installation Karibotel

## Prérequis

- Node.js 18+ installé
- MySQL 8+ installé et en cours d'exécution
- Un compte email (Gmail recommandé) pour l'envoi d'emails

## Installation pas à pas

### 1. Installation des dépendances

```bash
cd karibotel
npm install
```

### 2. Configuration de la base de données MySQL

Créer une base de données MySQL:

```sql
CREATE DATABASE karibotel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'karibotel_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON karibotel.* TO 'karibotel_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Configuration des variables d'environnement

Créer un fichier `.env` à la racine:

```env
# Base de données
DATABASE_URL="mysql://karibotel_user:votre_mot_de_passe@localhost:3306/karibotel"

# NextAuth
NEXTAUTH_SECRET="générer-avec-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Email (exemple avec Gmail)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASSWORD="votre-mot-de-passe-app-gmail"
EMAIL_FROM="Karibotel <noreply@karibotel.com>"
```

**Générer NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Configuration Gmail:**
1. Aller sur https://myaccount.google.com/security
2. Activer l'authentification à 2 facteurs
3. Générer un mot de passe d'application
4. Utiliser ce mot de passe dans EMAIL_PASSWORD

### 4. Initialisation de la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma migrate dev --name init

# Insérer les données initiales
npm run prisma:seed
```

### 5. Vérification

Vérifier que tout est bien configuré:

```bash
# Voir les tables créées
npx prisma studio
```

### 6. Démarrage

```bash
npm run dev
```

Ouvrir http://localhost:3000

## Connexion Admin

- Email: `admin@karibotel.com`
- Mot de passe: `admin123`

⚠️ **Changez ces identifiants immédiatement en production !**

## Problèmes courants

### Erreur de connexion MySQL

```
Error: P1001: Can't reach database server
```

**Solution:**
- Vérifier que MySQL est démarré
- Vérifier les identifiants dans DATABASE_URL
- Vérifier que le port 3306 est ouvert

### Erreur Prisma

```
Error: @prisma/client did not initialize yet
```

**Solution:**
```bash
npx prisma generate
```

### Erreur d'envoi d'email

**Solution:**
- Vérifier les identifiants EMAIL_USER et EMAIL_PASSWORD
- Pour Gmail, utiliser un mot de passe d'application
- Vérifier que le port 587 n'est pas bloqué

## Production

### Variables d'environnement en production

```env
DATABASE_URL="mysql://user:pass@host:3306/karibotel"
NEXTAUTH_SECRET="secret-tres-securise-en-production"
NEXTAUTH_URL="https://votre-domaine.com"
EMAIL_HOST="smtp.votre-serveur.com"
EMAIL_PORT="587"
EMAIL_USER="noreply@votre-domaine.com"
EMAIL_PASSWORD="mot-de-passe-securise"
EMAIL_FROM="Karibotel <noreply@votre-domaine.com>"
```

### Build pour production

```bash
npm run build
npm start
```

## Support

Pour toute question, consultez la documentation Next.js et Prisma:
- https://nextjs.org/docs
- https://www.prisma.io/docs
