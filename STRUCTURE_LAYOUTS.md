# 📐 Structure des Layouts - Karibotel

## 🎯 Organisation des Layouts

L'application utilise une structure de layouts hiérarchique pour séparer clairement l'interface publique du dashboard admin.

### 📁 Structure des Dossiers

```
app/
├── layout.tsx                    # Layout racine (sans navbar)
├── providers.tsx                 # Providers NextAuth
├── (public)/                     # Groupe de routes publiques
│   ├── layout.tsx               # Layout public (avec Navbar)
│   ├── page.tsx                 # Page d'accueil
│   ├── chambres/
│   │   └── page.tsx            # Liste des chambres
│   ├── piscine/
│   │   └── page.tsx            # Page piscine
│   ├── reserver/
│   │   └── page.tsx            # Formulaire de réservation
│   ├── contact/
│   │   └── page.tsx            # Page contact
│   └── confirmation/
│       └── page.tsx            # Confirmation de réservation
├── dashboard/                    # Routes admin
│   ├── layout.tsx               # Layout dashboard (sidebar sombre)
│   ├── page.tsx                 # Tableau de bord
│   ├── chambres/
│   │   └── page.tsx            # Gestion des chambres
│   ├── reservations/
│   │   └── page.tsx            # Gestion des réservations
│   ├── statistiques/
│   │   └── page.tsx            # Page statistiques
│   └── parametres/
│       └── page.tsx            # Paramètres de l'hôtel
├── login/
│   └── page.tsx                 # Page de connexion (sans navbar)
└── api/                         # Routes API
    ├── auth/
    ├── chambres/
    ├── reservations/
    ├── stats/
    └── piscine/
```

## 🔧 Fonctionnement des Layouts

### 1. Layout Racine (`app/layout.tsx`)
```tsx
// Layout minimal sans navbar
<html>
  <body>
    <Providers>
      {children}  // Contenu des pages
    </Providers>
  </body>
</html>
```

**Caractéristiques :**
- Contient uniquement les providers (NextAuth)
- Pas de navbar
- S'applique à toutes les pages
- Permet aux layouts enfants de définir leur propre UI

### 2. Layout Public (`app/(public)/layout.tsx`)
```tsx
// Layout avec navbar pour le site public
<>
  <Navbar />
  {children}
</>
```

**Caractéristiques :**
- Affiche la navbar verte avec logo et menu
- S'applique uniquement aux pages publiques
- Navigation : Accueil, Chambres, Piscine, Réserver, Contact

**Pages concernées :**
- `/` - Page d'accueil
- `/chambres` - Liste des chambres
- `/piscine` - Page piscine
- `/reserver` - Formulaire de réservation
- `/contact` - Page contact
- `/confirmation` - Confirmation de réservation

### 3. Layout Dashboard (`app/dashboard/layout.tsx`)
```tsx
// Layout avec sidebar pour l'admin
<div className="flex">
  <Sidebar />  // Sidebar sombre avec navigation admin
  <main>
    {children}
  </main>
</div>
```

**Caractéristiques :**
- Sidebar sombre fixe à gauche
- Navigation admin : Tableau de bord, Chambres, Réservations, Statistiques, Paramètres
- Protégé par authentification NextAuth
- Complètement indépendant du site public

**Pages concernées :**
- `/dashboard` - Tableau de bord
- `/dashboard/chambres` - Gestion des chambres
- `/dashboard/reservations` - Gestion des réservations
- `/dashboard/statistiques` - Statistiques et analytics
- `/dashboard/parametres` - Paramètres de l'hôtel

### 4. Page Login (`app/login/page.tsx`)
**Caractéristiques :**
- Pas de layout spécifique
- Hérite uniquement du layout racine
- Pas de navbar ni sidebar
- Interface de connexion centrée

## 🎨 Avantages de cette Structure

### ✅ Séparation Claire
- **Site public** : Navbar verte, design nature
- **Dashboard admin** : Sidebar sombre, design professionnel
- **Login** : Interface minimaliste

### ✅ Performance
- Chaque layout charge uniquement ce dont il a besoin
- Pas de composants inutiles dans le dashboard
- Navigation optimisée

### ✅ Maintenance
- Modifications du site public n'affectent pas le dashboard
- Modifications du dashboard n'affectent pas le site public
- Code organisé et facile à comprendre

### ✅ Sécurité
- Dashboard protégé par middleware
- Routes publiques accessibles sans authentification
- Séparation logique des permissions

## 🔄 Routes Groupées

Next.js utilise les parenthèses `(nom)` pour créer des groupes de routes sans affecter l'URL :

- `app/(public)/page.tsx` → URL : `/`
- `app/(public)/chambres/page.tsx` → URL : `/chambres`
- `app/dashboard/page.tsx` → URL : `/dashboard`

Les groupes permettent d'organiser le code sans changer les URLs.

## 🚀 Navigation

### Site Public
```
Navbar (toujours visible)
├── Accueil (/)
├── Chambres (/chambres)
├── Piscine (/piscine)
├── Réserver (/reserver)
└── Contact (/contact)
```

### Dashboard Admin
```
Sidebar (toujours visible)
├── Tableau de bord (/dashboard)
├── Chambres (/dashboard/chambres)
├── Réservations (/dashboard/reservations)
├── Statistiques (/dashboard/statistiques)
├── Paramètres (/dashboard/parametres)
└── Déconnexion
```

## 📝 Modifications Effectuées

1. ✅ Supprimé la Navbar du layout racine
2. ✅ Créé un groupe `(public)` avec son propre layout
3. ✅ Déplacé toutes les pages publiques dans `(public)`
4. ✅ Dashboard reste indépendant avec sa sidebar
5. ✅ Login reste sans navbar

## 🎯 Résultat

- **Site public** : Navbar verte visible sur toutes les pages publiques
- **Dashboard** : Sidebar sombre, pas de navbar
- **Login** : Interface propre sans navigation
- **Séparation totale** entre public et admin

---

**Version** : 1.0.0  
**Dernière mise à jour** : Décembre 2024
