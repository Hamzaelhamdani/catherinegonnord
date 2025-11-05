# Catherine Gonnord - Portfolio Aquarelles

Site web statique en HTML/CSS/JavaScript pur pour présenter les aquarelles de Catherine Gonnord.

## 🎨 Caractéristiques

- **100% Statique** : HTML, CSS et JavaScript pur - pas de framework
- **Navigation Sidebar** : Navigation fixe avec icônes
- **Galerie Interactive** : Filtres par catégorie et recherche
- **Design Élégant** : Palette sage/vert, typographie raffinée
- **Responsive** : Compatible mobile, tablette et desktop
- **OnCyber Integration** : Galerie 3D immersive intégrée

## 🌿 Palette de Couleurs

Thème sage/vert naturel :
- Sage Deep: #4a5d3a
- Sage Medium: #8b9d69
- Sage Light: #c8d6a5
- Sage Mist: #e8f0dc

## 🚀 Technologies

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables CSS
- **JavaScript Vanilla** : Pas de dépendances
- **Pas de build** : Fonctionne directement dans le navigateur

## 📁 Structure du Projet

```
static-site/
├── index.html              # Page d'accueil avec OnCyber
├── gallery.html            # Galerie des œuvres
├── about.html              # À propos de l'artiste
├── contact.html            # Formulaire de contact
├── styles/
│   ├── main.css           # Styles globaux + navigation
│   ├── gallery.css        # Styles galerie
│   ├── about.css          # Styles à propos
│   └── contact.css        # Styles contact
└── js/
    ├── main.js            # JavaScript principal
    ├── artworks.js        # Données des œuvres (6 œuvres)
    ├── gallery.js         # Logique galerie
    └── contact.js         # Gestion formulaire
```

## 🎯 Pages

- **Accueil (`index.html`)** : Galerie OnCyber immersive en iframe
- **Galerie (`gallery.html`)** : Collection avec filtres et recherche
- **À propos (`about.html`)** : Biographie et expositions
- **Contact (`contact.html`)** : Formulaire de contact

## 🖼️ Collection

6 aquarelles catégorisées :
- **Eaux** : Reflets et transparences
- **Escaliers** : Perspectives architecturales
- **Voyages** : Souvenirs de voyages

## 🚀 Utilisation Locale

**Option 1** : Double-cliquez sur `static-site/index.html`

**Option 2** : Serveur local avec Python
```powershell
cd static-site
python -m http.server 8000
# Ouvrir http://localhost:8000
```

**Option 3** : Live Server dans VS Code
- Installer l'extension "Live Server"
- Clic droit sur `index.html` → "Open with Live Server"

## 💼 Contact

Pour des questions sur les œuvres, utilisez le formulaire de contact sur `contact.html`.

---

## ✨ Fonctionnalités

- **OnCyber Embed** : Galerie 3D immersive sur la page d'accueil
- **Filtres Galerie** : Tri par catégorie (Eaux, Escaliers, Voyages)
- **Barre de Recherche** : Recherche dans titres et descriptions
- **Navigation Fixe** : Sidebar avec icônes toujours visible
- **Responsive** : S'adapte à tous les écrans
- **Animations** : Effets au survol et transitions fluides

## 🎨 Personnalisation

### Ajouter des Œuvres

Éditez `static-site/js/artworks.js` :

```javascript
const artworks = [
    {
        id: 1,
        title: "Nouvelle Œuvre",
        category: "Eaux", // ou "Escaliers" ou "Voyages"
        price: 450,
        year: 2024,
        medium: "Aquarelle sur papier",
        dimensions: "30 x 40 cm",
        description: "Description...",
        imageUrl: "/images/artwork.jpg",
        available: true
    }
];
```

### Modifier les Couleurs

Dans `static-site/styles/main.css` :

```css
:root {
    --sage-deep: #4a5d3a;
    --sage-medium: #8b9d69;
    --sage-light: #c8d6a5;
    --sage-mist: #e8f0dc;
}
```

## 📝 Licence

© 2024 Catherine Gonnord. Tous droits réservés.

---

**Site créé avec ❤️ en HTML, CSS et JavaScript pur**
