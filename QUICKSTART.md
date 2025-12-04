# 🚀 Démarrage Rapide - Karibotel

Guide ultra-rapide pour lancer l'application en 5 minutes.

## ⚡ Installation Express

### 1. Prérequis
- Node.js 18+ installé
- MySQL 8+ en cours d'exécution

### 2. Installation (3 commandes)

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier d'environnement
copy .env.example .env

# 3. Éditer .env avec vos informations
notepad .env
```

### 3. Configuration .env minimale

```env
DATABASE_URL="mysql://root:password@localhost:3306/karibotel"
NEXTAUTH_SECRET="changez-moi-en-production"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Base de données (3 commandes)

```bash
# Générer Prisma
npx prisma generate

# Créer les tables
npx prisma migrate dev --name init

# Insérer les données
npm run prisma:seed
```

### 5. Démarrer

```bash
npm run dev
```

Ouvrir http://localhost:3000

## 🔑 Connexion Admin

- URL: http://localhost:3000/login
- Email: `admin@karibotel.com`
- Mot de passe: `admin123`

## 📱 Pages Disponibles

- `/` - Accueil
- `/chambres` - Liste des chambres
- `/piscine` - Informations piscine
- `/reserver` - Formulaire de réservation
- `/contact` - Contact
- `/dashboard` - Admin (nécessite connexion)

## 🎯 Test Rapide

1. Aller sur http://localhost:3000
2. Cliquer sur "Réserver maintenant"
3. Remplir le formulaire
4. Vérifier l'email de confirmation (si configuré)
5. Se connecter au dashboard pour voir la réservation

## ⚙️ Configuration Email (Optionnel)

Pour tester l'envoi d'emails, ajouter dans `.env`:

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASSWORD="mot-de-passe-app-gmail"
EMAIL_FROM="Karibotel <noreply@karibotel.com>"
```

## 🛠️ Commandes Utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer production
npm start

# Voir la base de données
npx prisma studio

# Créer un nouvel admin
npm run create-admin

# Réinitialiser la DB
npx prisma migrate reset
```

## 🐛 Problèmes Courants

### Erreur de connexion MySQL
```
Error: Can't reach database server
```
**Solution:** Vérifier que MySQL est démarré et que DATABASE_URL est correct.

### Erreur Prisma
```
Error: @prisma/client did not initialize
```
**Solution:** 
```bash
npx prisma generate
```

### Port 3000 déjà utilisé
**Solution:** Changer le port
```bash
PORT=3001 npm run dev
```

## 📚 Documentation Complète

- [README.md](README.md) - Documentation principale
- [INSTALLATION.md](INSTALLATION.md) - Guide d'installation détaillé
- [FEATURES.md](FEATURES.md) - Liste des fonctionnalités
- [API.md](API.md) - Documentation API
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guide de déploiement

## 🎉 C'est Tout !

Votre application Karibotel est maintenant opérationnelle !

Pour toute question, consultez la documentation complète.
