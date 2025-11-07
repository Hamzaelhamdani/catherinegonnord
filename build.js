// build.js - Script pour générer config.js avec les variables d'environnement
const fs = require('fs');

const config = `// Configuration Supabase
// Généré automatiquement par build.js

const SUPABASE_CONFIG = {
    url: '${process.env.url || ''}',
    anonKey: '${process.env.anonKey || ''}'
};
`;

fs.writeFileSync('js/config.js', config);
console.log('✅ config.js généré avec les variables d\'environnement');
