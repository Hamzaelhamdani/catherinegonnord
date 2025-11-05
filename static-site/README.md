# Catherine Gonnord - Site Portfolio Aquarelles

Site web statique pour présenter les aquarelles de Catherine Gonnord. Construit en HTML, CSS et JavaScript pur.

## 🎨 Caractéristiques

- **100% Statique** : HTML, CSS, JavaScript pur (pas de framework)
- **Design Élégant** : Palette de couleurs sage/vert, typographie raffinée
- **Navigation Sidebar** : Navigation fixe avec icônes
- **Pages** :
  - Accueil avec embed OnCyber
  - Galerie avec filtres et recherche
  - À propos de l'artiste
  - Formulaire de contact
- **Responsive** : Compatible mobile, tablette et desktop
- **Développement Local** : Ouverture directe des fichiers HTML dans le navigateur

## 📁 Structure du Projet

```
static-site/
├── index.html              # Page d'accueil avec OnCyber
├── gallery.html            # Galerie d'œuvres
├── about.html              # À propos de l'artiste
├── contact.html            # Formulaire de contact
├── styles/
│   ├── main.css           # Styles globaux + navigation
│   ├── gallery.css        # Styles de la galerie
│   ├── about.css          # Styles de la page à propos
│   └── contact.css        # Styles du formulaire de contact
└── js/
    ├── main.js            # JavaScript principal
    ├── artworks.js        # Données des œuvres
    ├── gallery.js         # Logique de la galerie
    └── contact.js         # Gestion du formulaire
```

## 🚀 Utilisation en Local

### Ouvrir le site

1. Ouvrez le fichier `index.html` directement dans votre navigateur
2. Ou utilisez un serveur local simple :

**Option 1 : Python**
```powershell
# Python 3
python -m http.server 8000

# Puis ouvrez http://localhost:8000
```

**Option 2 : Live Server (VS Code)**
- Installez l'extension "Live Server" dans VS Code
- Clic droit sur `index.html` → "Open with Live Server"

**Option 3 : Node.js**
```powershell
npx http-server -p 8000
```

## 🎨 Personnalisation

### Modifier les œuvres

Éditez `js/artworks.js` :

```javascript
const artworks = [
    {
        id: 1,
        title: "Titre de l'œuvre",
        category: "Eaux", // Eaux, Escaliers, ou Voyages
        price: 450,
        year: 2023,
        medium: "Aquarelle sur papier",
        dimensions: "30 x 40 cm",
        description: "Description de l'œuvre...",
        imageUrl: "/images/artwork1.jpg", // Ajoutez vos images
        available: true
    },
    // Ajoutez vos œuvres...
];
```

### Modifier les couleurs

Éditez les variables CSS dans `styles/main.css` :

```css
:root {
    --sage-deep: #4a5d3a;      /* Vert sauge foncé */
    --sage-medium: #8b9d69;    /* Vert sauge moyen */
    --sage-light: #c8d6a5;     /* Vert sauge clair */
    --sage-mist: #e8f0dc;      /* Vert sauge très clair */
    /* Modifiez selon vos préférences */
}
```

### Modifier l'embed OnCyber

Dans `index.html`, ligne ~60 :

```html
<iframe 
    src='https://oncyber.io/votre-espace' 
    frameborder='0' 
    allow="...">
</iframe>
```

## 📱 Pages Disponibles

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/index.html` | Embed OnCyber immersif |
| Galerie | `/gallery.html` | Toutes les œuvres avec filtres |
| À propos | `/about.html` | Biographie et expositions |
| Contact | `/contact.html` | Formulaire de contact |

## 🔧 Fonctionnalités JavaScript

### Galerie
- **Filtres par catégorie** : Eaux, Escaliers, Voyages
- **Barre de recherche** : Recherche dans titre et description
- **Affichage dynamique** : Cartes d'œuvres générées automatiquement
- **Animations** : Effets au survol et transitions fluides

### Navigation
- **Mise en surbrillance automatique** : Page active détectée
- **Smooth scroll** : Défilement fluide
- **Responsive** : Menu adaptatif sur mobile

### Contact
- **Validation de formulaire** : Vérification côté client
- **Messages de feedback** : Succès/erreur
- **TODO** : Intégration Supabase pour stockage

## 🔮 Prochaines Étapes

### Intégration Supabase (optionnel)

Pour ajouter une base de données dynamique :

1. Créez un compte [Supabase](https://supabase.com/) (gratuit)

2. Créez une table `artworks` :
```sql
CREATE TABLE artworks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    price NUMERIC,
    year INTEGER,
    medium TEXT,
    dimensions TEXT,
    description TEXT,
    image_url TEXT,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);
```

3. Ajoutez le SDK Supabase dans `index.html` :
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

4. Dans `js/gallery.js`, remplacez les données statiques :
```javascript
const { createClient } = supabase;
const supabaseClient = createClient('YOUR_URL', 'YOUR_KEY');

async function loadArtworks() {
    const { data, error } = await supabaseClient
        .from('artworks')
        .select('*');
    
    if (data) displayArtworks(data);
}
```

## 📂 Navigation

- **Accueil** : `index.html` - Galerie OnCyber immersive
- **Galerie** : `gallery.html` - Toutes les œuvres avec filtres
- **À propos** : `about.html` - Biographie et expositions
- **Contact** : `contact.html` - Formulaire de contact

## 📞 Support

Pour toute question :
- Email : contact@catherinegonnord.art
- Site : catherinegonnord.art

## 📄 Licence

© 2024 Catherine Gonnord. Tous droits réservés.

---

**Construit avec ❤️ en HTML, CSS et JavaScript pur**
