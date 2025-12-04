# Configuration Email SMTP pour Karibotel

## 🔑 Identifiants Admin

- **Email:** admin@karibotel.com
- **Mot de passe:** admin123

⚠️ **Important:** Changez ces identifiants en production !

---

## 📧 Configuration SMTP

### Option 1 : Gmail (Recommandé pour les tests)

#### Étapes :

1. **Activer l'authentification à 2 facteurs**
   - Allez sur https://myaccount.google.com/security
   - Activez la validation en deux étapes

2. **Générer un mot de passe d'application**
   - Allez sur https://myaccount.google.com/apppasswords
   - Sélectionnez "Autre (nom personnalisé)"
   - Nommez-le "Karibotel"
   - Copiez le mot de passe généré (16 caractères sans espaces)

3. **Modifier le fichier `.env`**

```env
# Configuration Email (Gmail)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"  # Mot de passe d'application
EMAIL_FROM="Karibotel <noreply@karibotel.mg>"
```

#### Exemple :
```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="karibotel.hotel@gmail.com"
EMAIL_PASSWORD="abcd efgh ijkl mnop"
EMAIL_FROM="Karibotel <noreply@karibotel.mg>"
```

---

### Option 2 : Outlook/Hotmail

```env
EMAIL_HOST="smtp-mail.outlook.com"
EMAIL_PORT="587"
EMAIL_USER="votre-email@outlook.com"
EMAIL_PASSWORD="votre-mot-de-passe"
EMAIL_FROM="Karibotel <noreply@karibotel.mg>"
```

---

### Option 3 : Service SMTP Professionnel

#### SendGrid (Gratuit jusqu'à 100 emails/jour)

```env
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_PORT="587"
EMAIL_USER="apikey"
EMAIL_PASSWORD="votre-api-key-sendgrid"
EMAIL_FROM="Karibotel <noreply@karibotel.mg>"
```

#### Mailgun

```env
EMAIL_HOST="smtp.mailgun.org"
EMAIL_PORT="587"
EMAIL_USER="postmaster@votre-domaine.mailgun.org"
EMAIL_PASSWORD="votre-mot-de-passe-mailgun"
EMAIL_FROM="Karibotel <noreply@karibotel.mg>"
```

---

## 🧪 Tester l'Envoi d'Email

### 1. Configurer le `.env`

Modifiez le fichier `.env` avec vos vrais identifiants SMTP.

### 2. Redémarrer le serveur

```bash
# Arrêter le serveur (Ctrl+C)
# Puis redémarrer
npm run dev
```

### 3. Faire une réservation test

1. Allez sur http://localhost:3000/reserver
2. Remplissez le formulaire avec votre vrai email
3. Soumettez la réservation
4. Vérifiez votre boîte email (et spam)

---

## 📋 Template Email

L'email de confirmation contient :

- **En-tête** : Logo Karibotel avec fond vert
- **Message** : Confirmation de réservation
- **Détails** :
  - Numéro de chambre
  - Date d'arrivée
  - Date de départ
  - Montant total (en Ariary)
- **Footer** : Message automatique

---

## 🔧 Dépannage

### Erreur : "Invalid login"

**Solution :** Vérifiez que vous utilisez un mot de passe d'application (pas votre mot de passe Gmail normal)

### Erreur : "Connection timeout"

**Solution :** 
- Vérifiez votre connexion internet
- Vérifiez que le port 587 n'est pas bloqué par votre firewall

### Email non reçu

**Solution :**
- Vérifiez le dossier spam
- Vérifiez que l'email dans EMAIL_USER est correct
- Vérifiez les logs du serveur pour voir les erreurs

### Voir les logs d'erreur

Les erreurs d'envoi d'email sont affichées dans la console du serveur :

```bash
# Dans le terminal où tourne npm run dev
# Vous verrez :
✅ Email envoyé avec succès
# ou
❌ Erreur envoi email: [détails de l'erreur]
```

---

## 🚀 Configuration Rapide (Gmail)

```bash
# 1. Ouvrir le fichier .env
notepad .env

# 2. Remplacer ces lignes :
EMAIL_USER="votre-vrai-email@gmail.com"
EMAIL_PASSWORD="votre-mot-de-passe-app"

# 3. Sauvegarder et fermer

# 4. Redémarrer le serveur
# Ctrl+C puis npm run dev
```

---

## 📝 Notes Importantes

1. **Ne jamais commiter le fichier `.env`** avec vos vrais identifiants
2. **Utiliser des mots de passe d'application** pour Gmail (pas votre mot de passe principal)
3. **Tester avec votre propre email** avant d'envoyer aux clients
4. **Vérifier le dossier spam** lors des premiers tests
5. **En production**, utiliser un service SMTP professionnel (SendGrid, Mailgun, etc.)

---

## ✅ Checklist

- [ ] Compte Gmail avec authentification à 2 facteurs activée
- [ ] Mot de passe d'application généré
- [ ] Fichier `.env` mis à jour avec les vrais identifiants
- [ ] Serveur redémarré
- [ ] Test de réservation effectué
- [ ] Email de confirmation reçu

---

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs du serveur
2. Testez avec un autre service SMTP
3. Vérifiez que votre email n'est pas bloqué par Gmail
4. Consultez la documentation Nodemailer : https://nodemailer.com/

---

**Date de création :** 4 décembre 2024
