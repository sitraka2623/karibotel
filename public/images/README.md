# 📁 Organisation des Images

## Structure Recommandée

```
public/
├── images/
│   ├── logo/
│   │   ├── logo.png
│   │   ├── logo-white.png
│   │   └── favicon.ico
│   ├── chambres/
│   │   ├── B01.jpg
│   │   ├── B02.jpg
│   │   ├── B03.jpg
│   │   └── ... (B04 à B14)
│   ├── piscine/
│   │   ├── piscine-1.jpg
│   │   ├── piscine-2.jpg
│   │   └── piscine-3.jpg
│   └── hero/
│       ├── hero-bg.jpg
│       └── hotel-exterior.jpg
```

## 📝 Instructions

1. **Copiez votre dossier `images`** dans le dossier `public/`
2. Les images seront accessibles via `/images/...`

## 🖼️ Utilisation dans le Code

### Pour le Logo
```tsx
import Image from 'next/image'

<Image 
  src="/images/logo/logo.png" 
  alt="Karibotel Logo"
  width={200}
  height={80}
/>
```

### Pour les Chambres
```tsx
<Image 
  src="/images/chambres/B01.jpg" 
  alt="Chambre B01"
  width={400}
  height={300}
/>
```

### Pour la Piscine
```tsx
<Image 
  src="/images/piscine/piscine-1.jpg" 
  alt="Piscine Karibotel"
  width={800}
  height={600}
/>
```

## 📏 Tailles Recommandées

- **Logo**: 200x80px (PNG avec fond transparent)
- **Chambres**: 800x600px (JPG, qualité 80%)
- **Piscine**: 1200x800px (JPG, qualité 85%)
- **Hero**: 1920x1080px (JPG, qualité 90%)

## 🎯 Optimisation

Next.js optimise automatiquement les images avec le composant `Image` :
- Lazy loading
- Responsive
- WebP automatique
- Compression

---

**Note**: Placez simplement votre dossier `images` dans `public/` et les images seront accessibles !
