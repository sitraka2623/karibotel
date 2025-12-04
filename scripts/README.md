# Scripts Utilitaires

Ce dossier contient des scripts utilitaires pour la gestion de l'application Karibotel.

## 📜 Scripts Disponibles

### create-admin.ts

Crée un nouvel utilisateur administrateur dans la base de données.

**Usage:**
```bash
npm run create-admin
```

**Interactif:**
Le script vous demandera:
1. Nom complet
2. Email
3. Mot de passe

**Exemple:**
```bash
$ npm run create-admin

=== Création d'un nouvel administrateur ===

Nom complet: Marie Dupont
Email: marie@karibotel.com
Mot de passe: ********

✅ Administrateur créé avec succès!
ID: clx123abc...
Email: marie@karibotel.com
Nom: Marie Dupont
```

**Erreurs possibles:**
- Email déjà existant
- Champs manquants
- Erreur de connexion à la base de données

## 🔧 Créer un Nouveau Script

### Template de Base

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Votre code ici
  console.log('Script exécuté avec succès!')
}

main()
  .catch((error) => {
    console.error('Erreur:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### Ajouter au package.json

```json
{
  "scripts": {
    "mon-script": "tsx scripts/mon-script.ts"
  }
}
```

## 📝 Idées de Scripts Futurs

### backup-db.ts
Créer une sauvegarde de la base de données.

```bash
npm run backup-db
```

### reset-passwords.ts
Réinitialiser les mots de passe des utilisateurs.

```bash
npm run reset-passwords
```

### generate-report.ts
Générer un rapport des réservations.

```bash
npm run generate-report -- --month=06 --year=2024
```

### import-chambres.ts
Importer des chambres depuis un fichier CSV.

```bash
npm run import-chambres -- --file=chambres.csv
```

### export-reservations.ts
Exporter les réservations en CSV/PDF.

```bash
npm run export-reservations -- --format=csv --output=reservations.csv
```

### cleanup-old-reservations.ts
Nettoyer les anciennes réservations.

```bash
npm run cleanup-old-reservations -- --days=365
```

### send-reminders.ts
Envoyer des rappels aux clients.

```bash
npm run send-reminders
```

## 🛠️ Bonnes Pratiques

### 1. Gestion des Erreurs

```typescript
try {
  // Code
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      console.error('Contrainte unique violée')
    }
  }
  throw error
}
```

### 2. Validation des Arguments

```typescript
const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('Usage: npm run script -- --arg=value')
  process.exit(1)
}
```

### 3. Confirmation Interactive

```typescript
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('Êtes-vous sûr? (oui/non): ', (answer) => {
  if (answer.toLowerCase() === 'oui') {
    // Continuer
  } else {
    console.log('Opération annulée')
    process.exit(0)
  }
  rl.close()
})
```

### 4. Progress Bar

```typescript
let progress = 0
const total = 100

for (let i = 0; i < total; i++) {
  progress = ((i + 1) / total) * 100
  process.stdout.write(`\rProgress: ${progress.toFixed(0)}%`)
  // Traitement
}
console.log('\n✅ Terminé!')
```

### 5. Logging

```typescript
const log = {
  info: (msg: string) => console.log(`ℹ️  ${msg}`),
  success: (msg: string) => console.log(`✅ ${msg}`),
  error: (msg: string) => console.error(`❌ ${msg}`),
  warning: (msg: string) => console.warn(`⚠️  ${msg}`),
}

log.info('Démarrage du script...')
log.success('Opération réussie!')
log.error('Une erreur est survenue')
log.warning('Attention!')
```

## 🔒 Sécurité

### Variables d'Environnement

Toujours utiliser les variables d'environnement pour les données sensibles:

```typescript
const apiKey = process.env.API_KEY
if (!apiKey) {
  throw new Error('API_KEY non définie')
}
```

### Confirmation pour Actions Destructives

```typescript
if (process.env.NODE_ENV === 'production') {
  console.log('⚠️  ATTENTION: Vous êtes en PRODUCTION!')
  // Demander confirmation
}
```

## 📚 Ressources

- [tsx Documentation](https://github.com/esbuild-kit/tsx)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Node.js readline](https://nodejs.org/api/readline.html)

## 🤝 Contribution

Pour ajouter un nouveau script:

1. Créer le fichier dans `scripts/`
2. Ajouter la commande dans `package.json`
3. Documenter dans ce README
4. Tester localement
5. Créer une PR

---

**Note**: Tous les scripts doivent être exécutés depuis la racine du projet.
