# 📋 Informations Importantes - Karibotel

## 🔑 Identifiants Admin

```
URL: http://localhost:3000/login
Email: admin@karibotel.com
Mot de passe: admin123
```

⚠️ **IMPORTANT:** Changez ces identifiants en production !

---

## 🏨 Informations Hôtel

**Nom:** Karibotel  
**Localisation:** Ranomafana, Fianarantsoa, Madagascar  
**Téléphone:** +261 34 XX XXX XX  
**Email:** contact@karibotel.mg  

---

## 💰 Prix des Chambres (Ariary)

| Chambre | Prix/nuit |
|---------|-----------|
| B01, B05, B09, B13 | 425 000 Ar |
| B02, B06, B10, B14 | 450 000 Ar |
| B03, B07, B11 | 475 000 Ar |
| B04, B08, B12 | 500 000 Ar |

---

## 🎨 Couleurs du Site

**Couleur principale:** #2E7D32 (Vert nature)  
**Couleur claire:** #4CAF50  
**Couleur foncée:** #1B5E20  

---

## 📧 Configuration Email

### Pour activer l'envoi d'emails :

1. **Configurer Gmail** (voir `GUIDE_RAPIDE_EMAIL.md`)
2. **Modifier `.env`** avec vos identifiants SMTP
3. **Redémarrer le serveur**
4. **Tester** : `npm run test-email votre-email@gmail.com`

### Fichier .env à configurer :

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASSWORD="mot-de-passe-app"
EMAIL_FROM="Karibotel <noreply@karibotel.mg>"
```

---

## 🗄️ Base de Données

**Type:** MySQL (via XAMPP)  
**Nom:** karibotel  
**Tables:**
- `chambres` - 14 chambres (B01-B14)
- `reservations` - Réservations clients
- `users` - Administrateurs
- `piscine` - Informations piscine

---

## 🚀 Commandes Utiles

```bash
# Démarrer le serveur
npm run dev

# Accéder à la base de données
npx prisma studio

# Tester l'envoi d'email
npm run test-email votre-email@gmail.com

# Créer un nouvel admin
npm run create-admin

# Réinitialiser les données
npm run prisma:seed
```

---

## 📱 Pages de l'Application

| Page | URL | Description |
|------|-----|-------------|
| Accueil | / | Page d'accueil avec hero |
| Chambres | /chambres | Liste des 14 chambres |
| Piscine | /piscine | Infos piscine |
| Réserver | /reserver | Formulaire de réservation |
| Contact | /contact | Coordonnées |
| Login Admin | /login | Connexion administrateur |
| Dashboard | /dashboard | Gestion réservations |

---

## ✅ Fonctionnalités

### Pour les Clients
- ✅ Voir les chambres disponibles
- ✅ Consulter les prix en Ariary
- ✅ Faire une réservation en ligne
- ✅ Recevoir un email de confirmation
- ✅ Voir les infos piscine
- ✅ Contacter l'hôtel

### Pour l'Admin
- ✅ Se connecter au dashboard
- ✅ Voir toutes les réservations
- ✅ Voir les statistiques
- ✅ Gérer les chambres (CRUD)
- ✅ Filtrer par statut
- ✅ Voir le taux d'occupation

---

## 🔒 Sécurité

- ✅ Authentification NextAuth
- ✅ Mots de passe hashés (bcrypt)
- ✅ Sessions JWT
- ✅ Routes admin protégées
- ✅ Validation des données
- ✅ Protection SQL injection (Prisma)

---

## 📝 Fichiers de Configuration

| Fichier | Description |
|---------|-------------|
| `.env` | Variables d'environnement (SMTP, DB, etc.) |
| `tailwind.config.ts` | Configuration des couleurs |
| `prisma/schema.prisma` | Schéma de la base de données |
| `package.json` | Dépendances et scripts |

---

## 🆘 Support & Documentation

| Document | Contenu |
|----------|---------|
| `START_HERE.md` | Guide de bienvenue |
| `QUICKSTART.md` | Démarrage rapide |
| `GUIDE_RAPIDE_EMAIL.md` | Configuration email (5 min) |
| `CONFIGURATION_EMAIL.md` | Guide email complet |
| `INSTALLATION.md` | Installation détaillée |
| `DEPLOYMENT.md` | Guide de déploiement |
| `API.md` | Documentation API |
| `MODIFICATIONS.md` | Changements effectués |

---

## 🎯 Prochaines Étapes

### Immédiat
1. ✅ Configurer l'email SMTP
2. ✅ Tester une réservation
3. ✅ Vérifier la réception d'email
4. ✅ Se connecter au dashboard admin

### Avant Production
1. ⚠️ Changer le mot de passe admin
2. ⚠️ Configurer un vrai service SMTP
3. ⚠️ Ajouter de vraies photos des chambres
4. ⚠️ Mettre à jour les coordonnées de contact
5. ⚠️ Tester sur mobile/tablette
6. ⚠️ Configurer un nom de domaine

---

## 📞 Contact Développeur

Pour toute question technique, consultez la documentation ou créez une issue.

---

**Dernière mise à jour:** 4 décembre 2024  
**Version:** 1.0.0  
**Statut:** ✅ Opérationnel
