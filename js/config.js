// Configuration Supabase
// Remplacez les valeurs ci-dessous par vos propres clés Supabase

const SUPABASE_CONFIG = {
    // URL de votre projet Supabase
    // Format: https://xxxxxxxxxxxxx.supabase.co
    url: 'https://ssvmvyflghmjucocxaqt.supabase.co',
    
    // Clé publique anonyme (anon/public key)
    // Format: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzdm12eWZsZ2htanVjb2N4YXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNzIxODEsImV4cCI6MjA3NzY0ODE4MX0.cEkDuqlUN3Qtd3u5q6nh1oyHznfpnPbkQSHTKiGTXS4'
};

// Instructions pour obtenir vos clés:
// 1. Connectez-vous sur https://app.supabase.com
// 2. Sélectionnez votre projet
// 3. Allez dans Settings > API
// 4. Copiez "Project URL" pour l'url
// 5. Copiez "anon public" key pour anonKey

// IMPORTANT: Ces clés sont publiques (anon key) et peuvent être exposées
// dans le code frontend sans problème de sécurité.
// Ne JAMAIS mettre ici la "service_role" key qui est secrète !
