# Karibotel - Application de Réservation d'Hôtel

Application fullstack Next.js pour la gestion des réservations en ligne de l'hôtel Karibotel.

## 🚀 Fonctionnalités

- ✅ Gestion des chambres (B01 à B14)
- ✅ Système de réservation en ligne
- ✅ Vérification automatique de disponibilité
- ✅ Envoi d'emails de confirmation
- ✅ Section piscine avec horaires et règlement
- ✅ Dashboard administrateur sécurisé
- ✅ Statistiques et gestion des réservations
- ✅ Design moderne avec thème vert nature

## 🛠️ Technologies

- **Framework**: Next.js 14 (App Router)
- **Base de données**: MySQL avec Prisma ORM
- **Authentification**: NextAuth.js
- **Styling**: Tailwind CSS
- **Email**: Nodemailer
- **Icons**: React Icons

## 📦 Installation

1. Cloner le projet et installer les dépendances:

```bash
cd karibotel
npm install
```

2. Configurer les variables d'environnement:

Créer un fichier `.env` à la racine du projet:

```env
DATABASE_URL="mysql://user:password@localhost:3306/karibotel"
NEXTAUTH_SECRET="votre-secret-genere"
NEXTAUTH_URL="http://localhost:3000"

# Configuration email
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASSWORD="votre-mot-de-passe-app"
EMAIL_FROM="Karibotel <noreply@karibotel.com>"
```

Pour générer NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

3. Configurer la base de données:

```bash
# Générer le client Prisma
npm run prisma:generate

# Créer les tables
npm run prisma:migrate

# Initialiser les données (chambres + admin)
npm run prisma:seed
```

## 🚀 Démarrage

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 👤 Compte Admin par défaut

- **Email**: admin@karibotel.com
- **Mot de passe**: admin123

⚠️ **Important**: Changez ces identifiants en production !

## 📁 Structure du projet

```
karibotel/
├── app/
│   ├── api/              # API Routes
│   │   ├── auth/         # NextAuth
│   │   ├── chambres/     # Gestion chambres
│   │   ├── reservations/ # Gestion réservations
│   │   └── piscine/      # Infos piscine
│   ├── chambres/         # Page liste chambres
│   ├── piscine/          # Page piscine
│   ├── reserver/         # Formulaire réservation
│   ├── dashboard/        # Admin dashboard
│   ├── login/            # Page connexion
│   └── contact/          # Page contact
├── components/           # Composants réutilisables
├── lib/                  # Utilitaires
│   ├── prisma.ts        # Client Prisma
│   ├── auth.ts          # Configuration NextAuth
│   └── email.ts         # Service email
├── prisma/
│   ├── schema.prisma    # Schéma base de données
│   └── seed.ts          # Données initiales
└── types/               # Types TypeScript
```

## 🎨 Thème

Le design utilise une palette de couleurs vertes inspirée de la nature:

- Couleur principale: `#2E7D32`
- Couleur claire: `#4CAF50`
- Couleur foncée: `#1B5E20`

## 📧 Configuration Email

Pour Gmail, vous devez:
1. Activer l'authentification à deux facteurs
2. Générer un mot de passe d'application
3. Utiliser ce mot de passe dans `EMAIL_PASSWORD`

## 🗄️ Base de données

Le schéma inclut:
- **Chambres**: Numéro, description, prix, disponibilité
- **Réservations**: Client, dates, statut, montant
- **Users**: Administrateurs
- **Piscine**: Horaires, règlement, description

## 🔒 Sécurité

- Authentification sécurisée avec NextAuth
- Mots de passe hashés avec bcrypt
- Protection des routes admin
- Validation des données côté serveur

## 🚀 Déploiement

### Vercel (Recommandé)

1. Pusher le code sur GitHub
2. Importer le projet sur Vercel
3. Configurer les variables d'environnement
4. Déployer

### cPanel

1. Builder le projet: `npm run build`
2. Uploader les fichiers sur le serveur
3. Configurer Node.js sur cPanel
4. Configurer les variables d'environnement
5. Démarrer: `npm start`

## 📝 API Endpoints

- `GET /api/chambres` - Liste des chambres
- `POST /api/chambres` - Créer une chambre
- `GET /api/chambres/[id]` - Détails d'une chambre
- `PUT /api/chambres/[id]` - Modifier une chambre
- `DELETE /api/chambres/[id]` - Supprimer une chambre
- `GET /api/reservations` - Liste des réservations
- `POST /api/reservations` - Créer une réservation
- `GET /api/piscine` - Infos piscine
- `PUT /api/piscine` - Modifier infos piscine

## 🎯 Prochaines étapes

- [ ] Upload d'images pour les chambres
- [ ] Système de paiement en ligne
- [ ] Notifications push
- [ ] Export des réservations en PDF
- [ ] Multi-langue (FR/EN)
- [ ] Système d'avis clients

## 📄 Licence

Projet privé - Tous droits réservés © Karibotel
