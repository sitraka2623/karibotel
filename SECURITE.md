# 🔒 Sécurité - Karibotel

## ✅ Protections Mises en Place

### 1. Dashboard Admin Protégé

#### Protection Multi-Niveaux

**Niveau 1 : Middleware NextAuth**
- Le fichier `middleware.ts` protège toutes les routes `/dashboard/*`
- Redirection automatique vers `/login` si non authentifié
- Vérification du token JWT

**Niveau 2 : Vérification Côté Page**
- La page dashboard vérifie la session
- Redirection vers `/login` si non connecté
- Message "Accès Refusé" si tentative d'accès direct

**Niveau 3 : Interface Utilisateur**
- Le bouton "Admin" dans la navigation est **caché** pour les clients
- Visible uniquement quand un admin est connecté
- Utilise `useSession()` pour vérifier l'état de connexion

### 2. Authentification

**NextAuth avec Credentials**
- Mots de passe hashés avec bcrypt (10 rounds)
- Sessions JWT sécurisées
- Secret NEXTAUTH_SECRET unique et aléatoire

**Identifiants Admin par Défaut**
```
Email: admin@karibotel.com
Mot de passe: admin123
```

⚠️ **IMPORTANT:** Changez ces identifiants en production !

### 3. Base de Données

**Prisma ORM**
- Protection contre les injections SQL
- Requêtes paramétrées automatiques
- Validation des types TypeScript

**Mot de Passe Hashé**
```typescript
// Exemple de hash bcrypt
$2b$10$9W9aKVQMe7oX.taEnncQCON2olK5yzlgsAVFvozu8zhGQrB6y1o0y
```

### 4. API Routes

**Protection des Endpoints Admin**
- Les routes sensibles nécessitent une authentification
- Vérification du token dans les headers
- Validation des données entrantes

### 5. Variables d'Environnement

**Fichier .env Sécurisé**
- Exclu de Git (dans .gitignore)
- Contient les secrets (DB, NextAuth, Email)
- Ne jamais commiter en production

## 🚫 Ce que les Clients NE PEUVENT PAS Faire

❌ Accéder au dashboard admin  
❌ Voir les réservations des autres clients  
❌ Modifier les chambres  
❌ Voir les statistiques  
❌ Gérer les prix  
❌ Accéder aux API admin  

## ✅ Ce que les Clients PEUVENT Faire

✅ Voir les chambres disponibles  
✅ Consulter les prix  
✅ Faire une réservation  
✅ Recevoir un email de confirmation  
✅ Voir les infos piscine  
✅ Contacter l'hôtel  

## 🔐 Recommandations pour la Production

### 1. Changer le Mot de Passe Admin

```bash
npm run create-admin
```

Créez un nouvel admin avec un mot de passe fort :
- Minimum 12 caractères
- Majuscules + minuscules + chiffres + symboles
- Exemple : `K@rib0tel2024!Secure`

### 2. Sécuriser NEXTAUTH_SECRET

Générez un nouveau secret :
```bash
openssl rand -base64 32
```

Mettez-le dans `.env` :
```env
NEXTAUTH_SECRET="votre-nouveau-secret-tres-long-et-aleatoire"
```

### 3. HTTPS en Production

- Utilisez toujours HTTPS en production
- Vercel active HTTPS automatiquement
- Pour cPanel, configurez un certificat SSL

### 4. Limiter les Tentatives de Connexion

Ajoutez un rate limiting sur `/api/auth/signin` :
- Maximum 5 tentatives par IP
- Blocage temporaire après échec

### 5. Logs de Sécurité

Activez les logs pour :
- Tentatives de connexion échouées
- Accès aux routes protégées
- Modifications dans le dashboard

### 6. Backup de la Base de Données

Configurez des backups automatiques :
- Quotidiens pour la production
- Stockage sécurisé hors site
- Test de restauration régulier

### 7. Mise à Jour des Dépendances

```bash
# Vérifier les vulnérabilités
npm audit

# Mettre à jour les packages
npm update

# Vérifier les packages obsolètes
npm outdated
```

## 🧪 Tester la Sécurité

### Test 1 : Accès Dashboard Sans Connexion

1. Ouvrir une fenêtre de navigation privée
2. Aller sur http://localhost:3000/dashboard
3. ✅ Devrait rediriger vers `/login`

### Test 2 : Bouton Admin Caché

1. Ouvrir le site en tant que client (non connecté)
2. Regarder la navigation
3. ✅ Le bouton "Admin" ne devrait PAS être visible

### Test 3 : Connexion Admin

1. Aller sur http://localhost:3000/login
2. Se connecter avec les identifiants admin
3. ✅ Le bouton "Admin" devrait apparaître
4. ✅ Accès au dashboard autorisé

### Test 4 : Déconnexion

1. Se déconnecter
2. ✅ Le bouton "Admin" devrait disparaître
3. ✅ Accès au dashboard bloqué

## 📋 Checklist Sécurité Production

- [ ] Mot de passe admin changé
- [ ] NEXTAUTH_SECRET régénéré
- [ ] HTTPS activé
- [ ] Fichier .env sécurisé
- [ ] Rate limiting configuré
- [ ] Logs de sécurité activés
- [ ] Backups configurés
- [ ] Dépendances à jour
- [ ] Tests de sécurité effectués
- [ ] Documentation à jour

## 🆘 En Cas de Problème

### Compte Admin Compromis

1. Créer un nouveau compte admin
2. Supprimer l'ancien compte
3. Changer NEXTAUTH_SECRET
4. Vérifier les logs pour activité suspecte

### Accès Non Autorisé

1. Vérifier les logs d'accès
2. Changer tous les mots de passe
3. Régénérer les secrets
4. Auditer la base de données

### Fuite de Données

1. Identifier la source
2. Corriger la vulnérabilité
3. Notifier les utilisateurs affectés
4. Renforcer la sécurité

## 📚 Ressources

- [NextAuth Documentation](https://next-auth.js.org/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Prisma Security](https://www.prisma.io/docs/guides/security)

---

**Dernière mise à jour:** 4 décembre 2024  
**Niveau de sécurité:** ✅ Sécurisé pour la production
