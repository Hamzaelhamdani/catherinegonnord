// Artwork Page JavaScript - Load single artwork from Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Initialize Supabase client
const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

// Get artwork ID from URL
const urlParams = new URLSearchParams(window.location.search);
const artworkId = urlParams.get('id');

// DOM Elements
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const artworkContent = document.getElementById('artworkContent');

// Load artwork on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🎨 Artwork Page - ID:', artworkId);
    
    if (!artworkId) {
        console.error('❌ Aucun ID dans l\'URL');
        showError();
        return;
    }

    await loadArtwork(artworkId);
});

// Load artwork from Supabase
async function loadArtwork(id) {
    // Convert ID to integer if it's a number string
    const numericId = parseInt(id, 10);
    const searchId = isNaN(numericId) ? id : numericId;
    
    console.log('📡 Chargement de l\'œuvre ID:', searchId, '(type:', typeof searchId, ')');
    
    try {
        const { data, error } = await supabase
            .from('artworks')
            .select('*')
            .eq('id', searchId)
            .single();
        
        console.log('📦 Réponse Supabase:', { data, error });
        
        if (error) {
            console.error('❌ Erreur de chargement depuis Supabase:', error);
            showError();
            return;
        }
        
        if (!data) {
            console.error('❌ Aucune donnée reçue');
            showError();
            return;
        }
        
        console.log('✅ Œuvre chargée:', data);
        displayArtwork(data);
    } catch (error) {
        console.error('❌ Exception:', error);
        showError();
    }
}

// Display artwork data
function displayArtwork(artwork) {
    // Hide loading, show content
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    artworkContent.classList.remove('hidden');

    // Update page title and meta tags for SEO
    const artworkTitle = artwork.title || 'Sans titre';
    const artworkYear = artwork.year || '';
    const category = getCategoryLabel(artwork.theme || artwork.category || 'aquarelle');
    const price = artwork.price ? `${artwork.price} €` : 'Prix sur demande';
    
    // Update page title
    document.title = `${artworkTitle} (${artworkYear}) - Aquarelle ${category} par Catherine Gonnord | À Vendre`;
    
    // Update meta description
    const description = `${artworkTitle} - Aquarelle originale ${category.toLowerCase()} de ${artworkYear} par Catherine Gonnord. ${artwork.technique || 'Aquarelle'}. Dimensions: ${artwork.dimensions || 'sur demande'}. Prix: ${price}. ${artwork.description || 'Œuvre unique disponible à l\'achat.'}`;
    document.getElementById('page-description').setAttribute('content', description.substring(0, 160));
    
    // Update Open Graph tags
    const currentUrl = `https://catherinegonnord.com/artwork.html?id=${artwork.id}`;
    document.getElementById('og-url').setAttribute('content', currentUrl);
    document.getElementById('og-title').setAttribute('content', `${artworkTitle} - ${category} ${artworkYear}`);
    document.getElementById('og-description').setAttribute('content', description.substring(0, 200));
    document.getElementById('canonical-url').setAttribute('href', currentUrl);
    
    if (artwork.image_url) {
        document.getElementById('og-image').setAttribute('content', artwork.image_url);
    }
    
    // Add structured data for the artwork
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        "name": artworkTitle,
        "image": artwork.image_url || "https://catherinegonnord.com/public/logo.png",
        "description": artwork.description || `Aquarelle ${category.toLowerCase()} par Catherine Gonnord`,
        "dateCreated": artworkYear,
        "artMedium": artwork.technique || "Aquarelle",
        "artworkSurface": artwork.support || "Papier",
        "width": {
            "@type": "Distance",
            "name": artwork.dimensions || "Sur demande"
        },
        "creator": {
            "@type": "Person",
            "name": "Catherine Gonnord",
            "jobTitle": "Artiste Aquarelliste"
        },
        "offers": {
            "@type": "Offer",
            "price": artwork.price || "0",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": currentUrl
        },
        "genre": category,
        "inLanguage": "fr"
    };
    
    // Add or update structured data script
    let structuredDataScript = document.getElementById('artwork-structured-data');
    if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.id = 'artwork-structured-data';
        structuredDataScript.type = 'application/ld+json';
        document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

    // Breadcrumb
    document.getElementById('breadcrumbTitle').textContent = artworkTitle;

    // Category
    document.getElementById('artworkCategory').textContent = category.toUpperCase();

    // Title
    document.getElementById('artworkTitle').textContent = artworkTitle;

    // Year
    document.getElementById('artworkYear').textContent = artworkYear;

    // Price
    const priceElement = document.getElementById('artworkPrice');
    priceElement.textContent = price;

    // Technique
    document.getElementById('artworkTechnique').textContent = artwork.technique || 'Non spécifiée';

    // Support
    document.getElementById('artworkSupport').textContent = artwork.support || 'Non spécifié';

    // Dimensions
    const dimensions = artwork.dimensions || `${artwork.width || '?'} × ${artwork.height || '?'} cm`;
    document.getElementById('artworkDimensions').textContent = dimensions;

    // Encadrement
    const encadrement = artwork.encadrement ? 'Encadrée' : 'Non encadrée';
    document.getElementById('artworkEncadrement').textContent = encadrement;

    // Image
    const imageContainer = document.getElementById('artworkImageContainer');
    if (artwork.image_url) {
        const img = document.createElement('img');
        img.src = artwork.image_url;
        img.alt = `${artworkTitle} - Aquarelle ${category} par Catherine Gonnord`;
        img.onerror = function() {
            // If image fails to load, show placeholder
            imageContainer.innerHTML = `
                <div class="artwork-image-placeholder">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <p>Image non disponible</p>
                </div>
            `;
        };
        imageContainer.appendChild(img);
    } else {
        imageContainer.innerHTML = `
            <div class="artwork-image-placeholder">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <p>Image non disponible</p>
            </div>
        `;
    }

    // Description (if available)
    if (artwork.description) {
        document.getElementById('artworkDescriptionSection').style.display = 'block';
        document.getElementById('artworkDescription').textContent = artwork.description;
    } else {
        document.getElementById('artworkDescriptionSection').style.display = 'none';
    }

    // Setup buy button
    setupBuyButton(artwork);
}

// Get category label
function getCategoryLabel(value) {
    const labels = {
        'abstractions': 'Abstractions',
        'architecture': 'Architecture',
        'eaux': 'Eaux',
        'escaliers': 'Escaliers',
        'interieurs': 'Intérieurs',
        'saisons': 'Saisons',
        'paysages': 'Paysages',
        'villes': 'Villes',
        'voyages': 'Voyages',
        'aquarelle': 'Aquarelle'
    };
    
    return labels[value] || value || 'Non catégorisé';
}

// Show error state
function showError() {
    loadingState.classList.add('hidden');
    errorState.classList.remove('hidden');
    artworkContent.classList.add('hidden');
}

// Setup buy button
function setupBuyButton(artwork) {
    const buyButton = document.getElementById('btnBuyArtwork');
    
    buyButton.addEventListener('click', function() {
        handleBuyArtwork(artwork);
    });
}

// Handle buy button click
function handleBuyArtwork(artwork) {
    // Placeholder - will be replaced with actual payment URL
    console.log('Achat de l\'œuvre:', artwork);
    
    // TODO: Open payment page in new tab
    // window.open('PAYMENT_URL_HERE', '_blank');
    
    // For now, show alert
    alert(`Fonction d'achat à configurer pour: ${artwork.title}\nPrix: ${artwork.price} €`);
}
