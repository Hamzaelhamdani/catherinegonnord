# Catherine Gonnord Art Platform

Une plateforme moderne et élégante pour présenter les œuvres aquarelles de Catherine Gonnord, artiste diplômée en architecture d'intérieur.

## 🎨 Caractéristiques

- **Design moderne et international** : Interface épurée avec une palette de couleurs inspirée du logo de l'artiste
- **Galerie interactive** : Présentation des œuvres avec système de filtres et de recherche
- **Responsive Design** : Optimisé pour tous les appareils
- **Performance optimisée** : Built avec Next.js 15 et Turbopack

## 🌿 Palette de couleurs

La plateforme utilise une palette verte inspirée du logo de Catherine Gonnord :
- Sage Deep (#2d5730)
- Sage Medium (#4a7c59) 
- Sage Soft (#7ba05b)
- Sage Light (#a8c686)

## 🚀 Technologies

- **Next.js 15** avec App Router et Turbopack
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour le styling
- **React** pour l'interface utilisateur

## 📁 Structure du projet

```
catpainting/
├── app/                    # Pages Next.js App Router
│   ├── page.tsx           # Landing page moderne
│   ├── gallery/           # Galerie des œuvres
│   ├── about/             # À propos de l'artiste
│   └── contact/           # Contact et commissions
├── src/
│   ├── components/        # Composants React
│   ├── data/             # Données des œuvres
│   └── lib/              # Utilitaires
└── public/
    ├── artworks/         # Images des œuvres (32 aquarelles)
    └── favicon.svg       # Système de favicons SVG
```

## 🎯 Pages principales

- **Landing Page** : Section unique moderne pour artistes internationaux
- **Galerie** : Collection complète avec 32 œuvres
- **À propos** : Histoire et philosophie artistique
- **Contact** : Formulaire pour commissions personnalisées

## 🖼️ Collection

La plateforme présente 32 aquarelles authentiques de Catherine Gonnord, couvrant :
- Paysages et voyages
- Intérieurs et architecture
- Abstractions contemporaines
- Études de mode et portraits

## 🚀 Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) pour voir l'application.

## 💼 Contact

Pour des commissions personnalisées ou des questions sur les œuvres, utilisez le formulaire de contact intégré.

---

*Plateforme développée avec passion pour mettre en valeur l'art de Catherine Gonnord*

## ✨ Features

### 🖼️ Public Gallery
- **Homepage** with artist story and featured artworks
- **Gallery** with category filtering and search
- **Artwork Details** with NFT minting options
- **About Page** with artist biography and exhibitions
- **Contact Form** with commission request options

### 🔐 Authentication & User Management
- Supabase Auth integration
- User registration and login
- Protected routes for admin and user areas
- Profile management

### 👨‍💼 Admin Back Office
- Dashboard with sales overview and analytics
- Artwork management (CRUD operations)
- Order tracking and status updates
- Customer management
- NFT minting interface
- Content management system

### 💎 NFT Integration
- Hedera Hashgraph blockchain integration
- NFT minting for digital ownership
- Metadata storage and certificate generation
- Bundle pricing (physical + NFT)

### 💳 E-commerce Features
- Stripe payment integration
- Physical artwork purchasing
- NFT token purchasing
- Order management and tracking

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: TailwindCSS with custom watercolor theme
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Payments**: Stripe
- **Blockchain**: Hedera SDK for NFT minting
- **Icons**: Heroicons
- **Fonts**: Inter & Lora from Google Fonts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account
- Hedera account (for NFT minting)

### 1. Clone and Install

```bash
cd catpainting
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Hedera Configuration
HEDERA_ACCOUNT_ID=your_hedera_account_id
HEDERA_PRIVATE_KEY=your_hedera_private_key
HEDERA_NETWORK=testnet

# App Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
3. Enable Row Level Security (RLS)
4. Configure authentication providers if needed

### 4. Stripe Setup

1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Configure webhook endpoints for order processing
4. Set up products and pricing in Stripe dashboard

### 5. Hedera Setup (Optional - for NFT features)

1. Create a Hedera testnet account
2. Get your account ID and private key
3. Configure the Hedera SDK for NFT minting

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Application Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── artwork/           # Artwork detail pages
│   ├── auth/              # Authentication pages
│   ├── gallery/           # Gallery pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── dashboard/         # User dashboard
├── components/            # Reusable React components
│   ├── AuthForm.tsx       # Authentication form
│   ├── Navigation.tsx     # Main navigation
│   └── ProtectedRoute.tsx # Route protection
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication context
├── lib/                   # Utility libraries
│   ├── supabase.ts        # Supabase client setup
│   ├── supabase-client.ts # Browser client
│   └── supabase-middleware.ts # SSR middleware
└── types/                 # TypeScript definitions
    └── database.ts        # Database type definitions
```

## 🎨 Design System

The application uses a custom watercolor-inspired design system:

### Color Palette
- **Paper**: #fefcf8 (main background)
- **Blue Light**: #e8f4f8 (accents)
- **Blue Medium**: #a8d1e0 (interactive elements)
- **Beige Light**: #f5f3f0 (soft backgrounds)
- **Warm Gray**: #6b7280 (text secondary)

### Typography
- **Headings**: Lora (serif font for artistic feel)
- **Body**: Inter (clean sans-serif for readability)

### Components
- Custom CSS classes for watercolor effects
- Soft shadows and gradients
- Responsive masonry grid for gallery
- Smooth animations and transitions

## 🔧 Key Components

### Authentication System
- `AuthContext`: Manages user state and authentication
- `ProtectedRoute`: Wraps admin pages requiring authentication
- `AuthForm`: Login/registration form with validation

### Admin Dashboard
- Overview statistics and recent activity
- CRUD operations for artworks
- Order management and tracking
- Customer relationship management

### Gallery & Artwork Display
- Responsive masonry grid layout
- Category filtering and search
- Dynamic artwork detail pages
- NFT purchase options

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## 🔐 Security Features

- Row Level Security (RLS) enabled in Supabase
- Protected admin routes
- Input validation and sanitization
- Secure payment processing with Stripe
- Environment variable protection

## 🧪 Testing

Run the development server and test:

1. **Homepage**: Navigate to homepage and verify design
2. **Gallery**: Test filtering and search functionality
3. **Authentication**: Test login/registration flow
4. **Admin Access**: Login as admin and test dashboard
5. **Responsive Design**: Test on mobile devices

## 📞 Support

For questions or issues:
- Email: contact@catpainting.fr
- Review the code documentation
- Check Supabase and Stripe documentation

## 🎯 Roadmap

- [ ] Stripe payment integration
- [ ] Hedera NFT minting
- [ ] Image upload and management
- [ ] User dashboard features
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] Inventory management
- [ ] Commission request system

## 📝 License

© 2025 Catpainting. All rights reserved.

---

**Built with ❤️ for Catherine Gonnord's artistic vision**
