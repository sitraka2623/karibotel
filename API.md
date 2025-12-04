# Documentation API Karibotel

## Base URL

```
http://localhost:3000/api
```

## Authentification

Les routes admin nécessitent une authentification via NextAuth.

## Endpoints

### 🏨 Chambres

#### GET /api/chambres
Récupère la liste de toutes les chambres.

**Réponse:**
```json
[
  {
    "id": "clx123...",
    "numero": "B01",
    "description": "Chambre confortable...",
    "prix": 85,
    "disponible": true,
    "photo": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /api/chambres
Crée une nouvelle chambre (Admin requis).

**Body:**
```json
{
  "numero": "B15",
  "description": "Chambre spacieuse",
  "prix": 120,
  "disponible": true,
  "photo": "url-image.jpg"
}
```

**Réponse:** 201 Created
```json
{
  "id": "clx456...",
  "numero": "B15",
  "description": "Chambre spacieuse",
  "prix": 120,
  "disponible": true,
  "photo": "url-image.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### GET /api/chambres/[id]
Récupère les détails d'une chambre.

**Réponse:**
```json
{
  "id": "clx123...",
  "numero": "B01",
  "description": "Chambre confortable...",
  "prix": 85,
  "disponible": true,
  "photo": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PUT /api/chambres/[id]
Met à jour une chambre (Admin requis).

**Body:**
```json
{
  "prix": 95,
  "disponible": false
}
```

**Réponse:**
```json
{
  "id": "clx123...",
  "numero": "B01",
  "description": "Chambre confortable...",
  "prix": 95,
  "disponible": false,
  "photo": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### DELETE /api/chambres/[id]
Supprime une chambre (Admin requis).

**Réponse:**
```json
{
  "message": "Chambre supprimée"
}
```

### 📅 Réservations

#### GET /api/reservations
Récupère toutes les réservations (Admin requis).

**Réponse:**
```json
[
  {
    "id": "clx789...",
    "nom": "Jean Dupont",
    "email": "jean@example.com",
    "telephone": "+33612345678",
    "chambreId": "clx123...",
    "chambre": {
      "id": "clx123...",
      "numero": "B01",
      "description": "...",
      "prix": 85,
      "disponible": true,
      "photo": null
    },
    "dateArrivee": "2024-06-15T00:00:00.000Z",
    "dateDepart": "2024-06-20T00:00:00.000Z",
    "statut": "confirmee",
    "montantTotal": 425,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /api/reservations
Crée une nouvelle réservation.

**Body:**
```json
{
  "nom": "Jean Dupont",
  "email": "jean@example.com",
  "telephone": "+33612345678",
  "chambreId": "clx123...",
  "dateArrivee": "2024-06-15",
  "dateDepart": "2024-06-20"
}
```

**Réponse:** 201 Created
```json
{
  "id": "clx789...",
  "nom": "Jean Dupont",
  "email": "jean@example.com",
  "telephone": "+33612345678",
  "chambreId": "clx123...",
  "chambre": {
    "id": "clx123...",
    "numero": "B01",
    "prix": 85
  },
  "dateArrivee": "2024-06-15T00:00:00.000Z",
  "dateDepart": "2024-06-20T00:00:00.000Z",
  "statut": "confirmee",
  "montantTotal": 425,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Erreurs possibles:**
- 400: Chambre non disponible pour ces dates
- 404: Chambre non trouvée
- 500: Erreur serveur

### 🏊 Piscine

#### GET /api/piscine
Récupère les informations de la piscine.

**Réponse:**
```json
{
  "id": "clx999...",
  "horaires": "Lundi - Dimanche : 8h00 - 20h00",
  "reglement": "- La piscine est réservée aux clients...",
  "description": "Notre piscine chauffée...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PUT /api/piscine
Met à jour les informations de la piscine (Admin requis).

**Body:**
```json
{
  "horaires": "Lundi - Dimanche : 9h00 - 21h00",
  "reglement": "Nouveau règlement...",
  "description": "Nouvelle description..."
}
```

**Réponse:**
```json
{
  "id": "clx999...",
  "horaires": "Lundi - Dimanche : 9h00 - 21h00",
  "reglement": "Nouveau règlement...",
  "description": "Nouvelle description...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 🔐 Authentification

#### POST /api/auth/signin
Connexion admin.

**Body:**
```json
{
  "email": "admin@karibotel.com",
  "password": "admin123"
}
```

**Réponse:**
```json
{
  "user": {
    "id": "clx111...",
    "email": "admin@karibotel.com",
    "name": "Administrateur",
    "role": "admin"
  },
  "expires": "2024-02-01T00:00:00.000Z"
}
```

#### POST /api/auth/signout
Déconnexion.

**Réponse:**
```json
{
  "url": "/"
}
```

## Codes d'erreur

| Code | Description |
|------|-------------|
| 200 | Succès |
| 201 | Créé avec succès |
| 400 | Requête invalide |
| 401 | Non authentifié |
| 403 | Non autorisé |
| 404 | Ressource non trouvée |
| 500 | Erreur serveur |

## Exemples d'utilisation

### JavaScript/Fetch

```javascript
// Récupérer les chambres
const chambres = await fetch('/api/chambres')
  .then(res => res.json())

// Créer une réservation
const reservation = await fetch('/api/reservations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nom: 'Jean Dupont',
    email: 'jean@example.com',
    telephone: '+33612345678',
    chambreId: 'clx123...',
    dateArrivee: '2024-06-15',
    dateDepart: '2024-06-20',
  }),
}).then(res => res.json())
```

### cURL

```bash
# Récupérer les chambres
curl http://localhost:3000/api/chambres

# Créer une réservation
curl -X POST http://localhost:3000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Jean Dupont",
    "email": "jean@example.com",
    "telephone": "+33612345678",
    "chambreId": "clx123...",
    "dateArrivee": "2024-06-15",
    "dateDepart": "2024-06-20"
  }'
```

### Python

```python
import requests

# Récupérer les chambres
response = requests.get('http://localhost:3000/api/chambres')
chambres = response.json()

# Créer une réservation
data = {
    'nom': 'Jean Dupont',
    'email': 'jean@example.com',
    'telephone': '+33612345678',
    'chambreId': 'clx123...',
    'dateArrivee': '2024-06-15',
    'dateDepart': '2024-06-20'
}
response = requests.post('http://localhost:3000/api/reservations', json=data)
reservation = response.json()
```

## Validation

### Réservation

- `nom`: String, requis, min 2 caractères
- `email`: Email valide, requis
- `telephone`: String, requis
- `chambreId`: ID valide, requis
- `dateArrivee`: Date ISO, requis, >= aujourd'hui
- `dateDepart`: Date ISO, requis, > dateArrivee

### Chambre

- `numero`: String, requis, unique
- `description`: String, requis
- `prix`: Number, requis, > 0
- `disponible`: Boolean, défaut: true
- `photo`: String, optionnel

## Rate Limiting

Actuellement aucune limite n'est appliquée. En production, considérer:
- 100 requêtes/minute pour les endpoints publics
- 1000 requêtes/minute pour les endpoints admin

## Webhooks

Pas de webhooks implémentés actuellement. Fonctionnalité future possible pour:
- Notification de nouvelle réservation
- Changement de statut de réservation
- Mise à jour de disponibilité

## Versioning

Version actuelle: v1 (implicite)

Futures versions utiliseront le format: `/api/v2/...`
