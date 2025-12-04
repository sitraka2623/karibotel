# Guide de Contribution

Merci de votre intérêt pour contribuer à Karibotel ! 🎉

## 🤝 Comment Contribuer

### Signaler un Bug

1. Vérifier que le bug n'a pas déjà été signalé dans les [Issues](../../issues)
2. Créer une nouvelle issue avec le template "Bug Report"
3. Inclure:
   - Description claire du problème
   - Étapes pour reproduire
   - Comportement attendu vs actuel
   - Captures d'écran si applicable
   - Environnement (OS, navigateur, version Node.js)

### Proposer une Fonctionnalité

1. Créer une issue avec le template "Feature Request"
2. Décrire:
   - Le problème que cela résout
   - La solution proposée
   - Des alternatives considérées
   - Des maquettes/wireframes si applicable

### Soumettre une Pull Request

1. **Fork** le repository
2. **Clone** votre fork
   ```bash
   git clone https://github.com/votre-username/karibotel.git
   ```

3. **Créer une branche** pour votre fonctionnalité
   ```bash
   git checkout -b feature/ma-nouvelle-fonctionnalite
   ```

4. **Installer les dépendances**
   ```bash
   npm install
   ```

5. **Faire vos modifications**
   - Suivre les conventions de code
   - Ajouter des tests si applicable
   - Mettre à jour la documentation

6. **Tester localement**
   ```bash
   npm run dev
   npm run build
   ```

7. **Commit** vos changements
   ```bash
   git add .
   git commit -m "feat: ajouter nouvelle fonctionnalité"
   ```

8. **Push** vers votre fork
   ```bash
   git push origin feature/ma-nouvelle-fonctionnalite
   ```

9. **Créer une Pull Request** sur GitHub

## 📝 Conventions de Code

### Style de Code

- Utiliser TypeScript pour tout nouveau code
- Suivre les règles ESLint configurées
- Utiliser Prettier pour le formatage
- Nommer les composants en PascalCase
- Nommer les fichiers en kebab-case ou PascalCase selon le type

### Structure des Composants

```typescript
'use client' // Si nécessaire

import { useState } from 'react'
import { FaIcon } from 'react-icons/fa'

interface Props {
  title: string
  onAction: () => void
}

export default function MonComposant({ title, onAction }: Props) {
  const [state, setState] = useState('')

  return (
    <div className="container">
      <h1>{title}</h1>
      <button onClick={onAction}>Action</button>
    </div>
  )
}
```

### Commits

Utiliser [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, point-virgules manquants, etc.
- `refactor:` Refactoring de code
- `test:` Ajout de tests
- `chore:` Maintenance

Exemples:
```
feat: ajouter système de paiement Stripe
fix: corriger validation email dans formulaire
docs: mettre à jour guide d'installation
```

### Tailwind CSS

- Utiliser les classes utilitaires Tailwind
- Préférer les classes personnalisées pour les composants réutilisables
- Utiliser les couleurs du thème (primary, nature-*)

```tsx
// ✅ Bon
<button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
  Cliquer
</button>

// ❌ Éviter
<button style={{ backgroundColor: '#2E7D32' }}>
  Cliquer
</button>
```

## 🧪 Tests

### Ajouter des Tests

```typescript
// tests/reservation.test.ts
import { describe, it, expect } from 'vitest'
import { validateReservation } from '@/lib/validation'

describe('Validation Réservation', () => {
  it('devrait valider une réservation correcte', () => {
    const reservation = {
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+33612345678',
      dateArrivee: '2024-06-15',
      dateDepart: '2024-06-20',
    }
    expect(validateReservation(reservation)).toBe(true)
  })
})
```

### Lancer les Tests

```bash
npm test
```

## 📚 Documentation

### Mettre à Jour la Documentation

- Documenter toute nouvelle fonctionnalité
- Mettre à jour README.md si nécessaire
- Ajouter des exemples d'utilisation
- Documenter les nouvelles API routes

### Commentaires dans le Code

```typescript
/**
 * Calcule le montant total d'une réservation
 * @param prix Prix par nuit
 * @param jours Nombre de jours
 * @returns Montant total en euros
 */
function calculerMontant(prix: number, jours: number): number {
  return prix * jours
}
```

## 🔍 Revue de Code

### Checklist avant PR

- [ ] Le code compile sans erreur
- [ ] Les tests passent
- [ ] La documentation est à jour
- [ ] Le code suit les conventions
- [ ] Pas de console.log oubliés
- [ ] Les variables d'environnement sont documentées
- [ ] Les migrations Prisma sont incluses si nécessaire

### Processus de Revue

1. Un mainteneur reviewera votre PR
2. Des changements peuvent être demandés
3. Une fois approuvée, la PR sera mergée
4. Votre contribution sera ajoutée au CHANGELOG

## 🐛 Déboguer

### Logs

```typescript
// Développement
console.log('Debug:', data)

// Production - utiliser un logger
import { logger } from '@/lib/logger'
logger.info('Info message', { data })
logger.error('Error message', { error })
```

### Prisma Studio

```bash
npx prisma studio
```

### Next.js DevTools

- Utiliser React DevTools
- Vérifier les Network requests
- Consulter les logs serveur

## 🎨 Design

### Ajouter de Nouveaux Composants UI

1. Suivre le design system existant
2. Utiliser les couleurs du thème
3. Assurer la responsivité
4. Tester sur mobile/tablette/desktop

### Couleurs

```typescript
// tailwind.config.ts
colors: {
  primary: '#2E7D32',
  'primary-light': '#4CAF50',
  'primary-dark': '#1B5E20',
  nature: {
    50: '#E8F5E9',
    // ...
    900: '#1B5E20',
  }
}
```

## 🔒 Sécurité

### Signaler une Vulnérabilité

**NE PAS** créer une issue publique pour les vulnérabilités de sécurité.

Envoyer un email à: security@karibotel.com

Inclure:
- Description de la vulnérabilité
- Étapes pour reproduire
- Impact potentiel
- Suggestions de correction si possible

## 📦 Dépendances

### Ajouter une Dépendance

1. Vérifier qu'elle est nécessaire
2. Vérifier la licence
3. Vérifier la maintenance du package
4. Documenter son utilisation

```bash
npm install package-name
```

### Mettre à Jour les Dépendances

```bash
npm outdated
npm update
```

## 🌍 Internationalisation

### Ajouter une Langue

1. Créer les fichiers de traduction
2. Mettre à jour la configuration i18n
3. Tester toutes les pages

## 📱 Responsive

### Breakpoints

```typescript
// Tailwind breakpoints
sm: '640px'   // Mobile large
md: '768px'   // Tablette
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
```

### Tester

- Chrome DevTools
- Vrais devices si possible
- Différents navigateurs

## ✅ Checklist Finale

Avant de soumettre votre PR:

- [ ] Code testé localement
- [ ] Tests ajoutés/mis à jour
- [ ] Documentation mise à jour
- [ ] Commits suivent les conventions
- [ ] Pas de conflits avec main
- [ ] Build réussit
- [ ] ESLint passe
- [ ] TypeScript compile
- [ ] Responsive testé

## 🎓 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

## 💬 Questions

Des questions ? N'hésitez pas à:
- Créer une issue
- Rejoindre notre Discord (si applicable)
- Envoyer un email à: dev@karibotel.com

## 🙏 Remerciements

Merci à tous les contributeurs qui aident à améliorer Karibotel !

---

**Happy Coding! 🚀**
