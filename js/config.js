// Configuration Supabase
// Les valeurs sont chargées depuis les variables d'environnement

const SUPABASE_CONFIG = {
    // URL de votre projet Supabase (depuis variable d'environnement)
    url: import.meta.env.VITE_SUPABASE_URL || process.env.url || '',
    
    // Clé publique anonyme (depuis variable d'environnement)
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.anonKey || ''
};

// IMPORTANT: 
// Les clés Supabase doivent être configurées dans les variables d'environnement
// de votre plateforme de déploiement (Vercel, Netlify, etc.)
//
// Noms des variables attendues:
// - url: L'URL de votre projet Supabase
// - anonKey: La clé publique anonyme

