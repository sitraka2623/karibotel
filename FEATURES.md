# Fonctionnalités Karibotel

## 🏨 Gestion des Chambres

### Affichage des chambres
- Grille moderne responsive (3 colonnes desktop, 2 tablette, 1 mobile)
- Badges de statut colorés:
  - 🟢 Vert = Disponible
  - 🟠 Orange = Réservé
  - 🔴 Rouge = Occupé
- Prix affiché par nuit
- Description de chaque chambre
- Bouton de réservation direct

### Chambres disponibles
- B01 à B14 (14 chambres au total)
- Chaque chambre a:
  - Numéro unique
  - Description personnalisable
  - Prix configurable
  - Statut de disponibilité
  - Photo (placeholder pour l'instant)

## 🏊 Piscine

### Informations affichées
- Horaires d'ouverture
- Règlement intérieur
- Description des installations
- Accès inclus avec la réservation

### Gestion admin
- Modification des horaires
- Mise à jour du règlement
- Modification de la description

## 📅 Système de Réservation

### Formulaire de réservation
- Nom complet (requis)
- Email (requis)
- Téléphone (requis)
- Sélection de chambre (liste déroulante)
- Date d'arrivée (calendrier)
- Date de départ (calendrier)

### Validation automatique
- Vérification de disponibilité en temps réel
- Détection des conflits de dates
- Calcul automatique du montant total
- Validation des données côté serveur

### Confirmation
- Page de confirmation après réservation
- Email automatique envoyé au client avec:
  - Détails de la réservation
  - Numéro de chambre
  - Dates de séjour
  - Montant total
  - Design aux couleurs de l'hôtel

## 🔐 Dashboard Administrateur

### Authentification
- Connexion sécurisée avec NextAuth
- Protection des routes admin
- Session persistante

### Statistiques
- Total des réservations
- Réservations en cours
- Réservations à venir
- Graphiques visuels

### Gestion des réservations
- Vue tableau complète
- Filtrage par statut:
  - En attente
  - Confirmée
  - En cours
  - Terminée
  - Annulée
- Informations client
- Dates de séjour
- Montant total

### Gestion des chambres
- Ajout de nouvelles chambres
- Modification des chambres existantes
- Suppression de chambres
- Gestion des prix
- Upload d'images (à venir)

## 🎨 Design

### Thème vert nature
- Couleur principale: #2E7D32
- Palette complète de verts
- Design moderne et épuré
- Animations fluides

### Responsive
- Mobile-first
- Tablette optimisé
- Desktop full-width
- Navigation adaptative

### Composants
- Boutons arrondis avec hover
- Cartes avec ombres
- Badges de statut colorés
- Formulaires stylisés
- Icônes React Icons

## 📧 Système d'Email

### Configuration
- Support SMTP (Gmail, SendGrid, etc.)
- Templates HTML personnalisés
- Envoi asynchrone

### Emails envoyés
- Confirmation de réservation
- Design aux couleurs de l'hôtel
- Informations complètes
- Responsive email

## 🔒 Sécurité

### Authentification
- Mots de passe hashés (bcrypt)
- Sessions JWT
- Protection CSRF
- Routes protégées

### Validation
- Validation côté client
- Validation côté serveur
- Sanitization des données
- Protection SQL injection (Prisma)

## 📊 Base de Données

### Tables
1. **Chambres**
   - ID unique
   - Numéro (B01-B14)
   - Description
   - Prix
   - Disponibilité
   - Photo

2. **Réservations**
   - ID unique
   - Informations client
   - Chambre liée
   - Dates de séjour
   - Statut
   - Montant total

3. **Users**
   - ID unique
   - Email
   - Mot de passe hashé
   - Nom
   - Rôle (admin)

4. **Piscine**
   - Horaires
   - Règlement
   - Description

### Relations
- Une chambre peut avoir plusieurs réservations
- Une réservation appartient à une chambre
- Cascade delete configuré

## 🚀 Performance

### Optimisations
- Server Components par défaut
- Client Components uniquement si nécessaire
- Images optimisées (Next.js Image)
- CSS Tailwind optimisé
- API Routes efficaces

### Caching
- Static Generation pour pages publiques
- ISR pour données dynamiques
- Client-side caching

## 📱 Pages

1. **Accueil** (`/`)
   - Hero section
   - Services
   - Call-to-action

2. **Chambres** (`/chambres`)
   - Grille de chambres
   - Filtres de disponibilité

3. **Piscine** (`/piscine`)
   - Informations complètes
   - Horaires et règlement

4. **Réserver** (`/reserver`)
   - Formulaire complet
   - Validation en temps réel

5. **Contact** (`/contact`)
   - Coordonnées
   - Formulaire de contact

6. **Dashboard** (`/dashboard`)
   - Statistiques
   - Gestion réservations
   - Gestion chambres

7. **Login** (`/login`)
   - Authentification admin

8. **Confirmation** (`/confirmation`)
   - Page de succès

## 🔄 API Routes

### Chambres
- `GET /api/chambres` - Liste
- `POST /api/chambres` - Créer
- `GET /api/chambres/[id]` - Détails
- `PUT /api/chambres/[id]` - Modifier
- `DELETE /api/chambres/[id]` - Supprimer

### Réservations
- `GET /api/reservations` - Liste
- `POST /api/reservations` - Créer

### Piscine
- `GET /api/piscine` - Infos
- `PUT /api/piscine` - Modifier

### Auth
- `POST /api/auth/signin` - Connexion
- `POST /api/auth/signout` - Déconnexion

## 🎯 Améliorations futures

- [ ] Upload d'images réelles pour chambres
- [ ] Système de paiement (Stripe)
- [ ] Calendrier de disponibilité visuel
- [ ] Notifications push
- [ ] Export PDF des réservations
- [ ] Multi-langue (i18n)
- [ ] Système d'avis clients
- [ ] Programme de fidélité
- [ ] Intégration Google Maps
- [ ] Chat en direct
