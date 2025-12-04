# 📧 Guide Rapide - Configuration Email

## 🔑 Identifiants Admin

```
Email: admin@karibotel.com
Mot de passe: admin123
```

---

## ⚡ Configuration Rapide (5 minutes)

### 1. Créer un compte Gmail dédié (optionnel)

Créez un nouveau compte Gmail pour Karibotel, par exemple :
- `karibotel.ranomafana@gmail.com`

### 2. Activer l'authentification à 2 facteurs

1. Allez sur https://myaccount.google.com/security
2. Cliquez sur "Validation en deux étapes"
3. Suivez les instructions

### 3. Générer un mot de passe d'application

1. Allez sur https://myaccount.google.com/apppasswords
2. Sélectionnez "Autre (nom personnalisé)"
3. Tapez "Karibotel"
4. Cliquez sur "Générer"
5. **Copiez le mot de passe** (16 caractères, ex: `abcd efgh ijkl mnop`)

### 4. Configurer le fichier .env

Ouvrez le fichier `.env` et modifiez :

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="karibotel.ranomafana@gmail.com"
EMAIL_PASSWORD="abcd efgh ijkl mnop"
EMAIL_FROM="Karibotel <noreply@karibotel.mg>"
```

### 5. Redémarrer le serveur

```bash
# Arrêter le serveur (Ctrl+C dans le terminal)
# Puis redémarrer
npm run dev
```

### 6. Tester l'envoi d'email

```bash
# Tester avec votre email
npm run test-email votre-email@gmail.com
```

---

## 🧪 Test Complet

1. Allez sur http://localhost:3000/reserver
2. Remplissez le formulaire avec **votre vrai email**
3. Sélectionnez une chambre et des dates
4. Cliquez sur "Confirmer la réservation"
5. Vérifiez votre boîte email (et le dossier spam)

---

## ✅ Email de Confirmation

Le client recevra un email avec :

```
┌─────────────────────────────────┐
│      🏨 KARIBOTEL               │
│   (Fond vert #2E7D32)           │
└─────────────────────────────────┘

Confirmation de réservation

Bonjour [Nom du client],

Votre réservation a été confirmée avec succès !

┌─────────────────────────────────┐
│ Détails de la réservation       │
├─────────────────────────────────┤
│ Chambre : B01                   │
│ Date d'arrivée : 15/12/2024     │
│ Date de départ : 18/12/2024     │
│ Montant total : 425 000 Ar      │
└─────────────────────────────────┘

Nous vous attendons avec impatience !

Cet email est envoyé automatiquement.
```

---

## 🔧 Dépannage Rapide

### ❌ "Invalid login"
→ Utilisez un **mot de passe d'application**, pas votre mot de passe Gmail normal

### ❌ "Connection timeout"
→ Vérifiez votre connexion internet et que le port 587 n'est pas bloqué

### ❌ Email non reçu
→ Vérifiez le **dossier spam**

### ❌ Voir les erreurs
→ Regardez la console du serveur (terminal où tourne `npm run dev`)

---

## 📝 Commandes Utiles

```bash
# Tester l'envoi d'email
npm run test-email votre-email@gmail.com

# Voir les logs du serveur
# (dans le terminal où tourne npm run dev)

# Redémarrer le serveur
# Ctrl+C puis npm run dev
```

---

## 🎯 Checklist

- [ ] Compte Gmail créé/configuré
- [ ] Authentification à 2 facteurs activée
- [ ] Mot de passe d'application généré
- [ ] Fichier `.env` mis à jour
- [ ] Serveur redémarré
- [ ] Test d'email réussi
- [ ] Réservation test effectuée
- [ ] Email de confirmation reçu

---

## 💡 Conseils

1. **Testez d'abord** avec votre propre email
2. **Vérifiez le spam** lors des premiers tests
3. **Gardez le mot de passe d'application** en sécurité
4. **Ne commitez jamais** le fichier `.env` sur Git

---

**Besoin d'aide ?** Consultez `CONFIGURATION_EMAIL.md` pour plus de détails.
