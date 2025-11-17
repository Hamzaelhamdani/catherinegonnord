// Gallery Page JavaScript - Supabase Integration with Advanced Filters
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Initialize Supabase client
const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

// Filter state
let filters = {
    search: '',
    theme: '',
    technique: '',
    support: '',
    format: '',
    orientation: '',
    style: '',
    encadrement: false,
    maxPrice: 5000,
    year: ''
};

let artworks = []; // Will be loaded from Supabase

document.addEventListener('DOMContentLoaded', async function() {
    await loadArtworksFromSupabase();
    populateYearFilter();
    setupFilters();
});

// Load artworks from Supabase
async function loadArtworksFromSupabase() {
    try {
        const { data, error } = await supabase
            .from('artworks')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Erreur de chargement depuis Supabase:', error);
            showError('Impossible de charger les œuvres. Vérifiez votre connexion.');
            return;
        }
        
        artworks = data || [];
        console.log(`✅ ${artworks.length} œuvres chargées depuis Supabase`);
        displayArtworks();
    } catch (error) {
        console.error('Erreur:', error);
        showError('Une erreur est survenue lors du chargement.');
    }
}

function getCategoryLabel(artwork) {
    // Try theme first (new system), fallback to category (old system)
    const value = artwork.theme || artwork.category || '';
    
    const labels = {
        'abstractions': 'Abstractions',
        'architecture': 'Architecture',
        'eaux': 'Eaux',
        'escaliers': 'Escaliers',
        'interieurs': 'Intérieurs',
        'paysages': 'Paysages',
        'portraits': 'Portraits',
        'saisons': 'Saisons',
        'villes': 'Villes',
        'voyages': 'Voyages'
    };
    
    return labels[value] || value || 'Non catégorisé';
}

function showError(message) {
    const grid = document.getElementById('artworkGrid');
    grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <p style="color: #dc2626; font-size: 1.2rem;">⚠️ ${message}</p>
        </div>
    `;
}

function displayArtworks() {
    const grid = document.getElementById('artworkGrid');
    const filteredArtworks = filterArtworks();
    
    grid.innerHTML = '';
    
    if (filteredArtworks.length === 0) {
        document.getElementById('noResults').classList.remove('hidden');
        document.getElementById('artworkGrid').classList.add('hidden');
    } else {
        document.getElementById('noResults').classList.add('hidden');
        document.getElementById('artworkGrid').classList.remove('hidden');
        
        filteredArtworks.forEach(artwork => {
            const artworkCard = createArtworkCard(artwork);
            grid.appendChild(artworkCard);
        });
    }
    
    updateResultsCount(filteredArtworks.length);
}

function createArtworkCard(artwork) {
    const card = document.createElement('div');
    card.className = 'artwork-card fade-in';
    
    // Get image URL or use placeholder
    const imageUrl = artwork.image_url || '';
    const hasImage = imageUrl && imageUrl.trim() !== '';
    
    // Get category/theme label
    const categoryLabel = getCategoryLabel(artwork);
    
    card.innerHTML = `
        <div class="artwork-image">
            ${hasImage ? 
                `<img src="${imageUrl}" alt="${artwork.title}" onerror="this.parentElement.innerHTML='<div class=\\'artwork-placeholder\\'><span class=\\'placeholder-icon\\'>🎨</span><p class=\\'placeholder-text\\'>${artwork.title}</p></div>'" style="width: 100%; height: 100%; object-fit: cover;">` :
                `<div class="artwork-placeholder">
                    <span class="placeholder-icon">🎨</span>
                    <p class="placeholder-text">${artwork.title}</p>
                </div>`
            }
            ${artwork.price ? `<div class="artwork-price-badge">${artwork.price} €</div>` : ''}
        </div>
        <div class="artwork-info">
            <h3 class="artwork-title">${artwork.title}</h3>
            <p class="artwork-category">${categoryLabel}</p>
            <div class="artwork-details">
                ${artwork.technique ? `<p>Technique: ${artwork.technique}</p>` : ''}
                ${artwork.dimensions ? `<p>${artwork.dimensions}</p>` : ''}
                ${artwork.year ? `<p>${artwork.year}</p>` : ''}
            </div>
            <div class="artwork-footer">
                ${artwork.price ? `<span class="artwork-price-large">${artwork.price} €</span>` : '<span class="artwork-price-large">Prix sur demande</span>'}
                <button class="btn-view-details">Voir détails</button>
            </div>
        </div>
    `;
    
    // Add click handler for the card
    card.addEventListener('click', (e) => {
        // Don't open page if clicking on the "Voir détails" button directly
        // (button has its own handler below)
        if (!e.target.classList.contains('btn-view-details')) {
            window.location.href = `artwork.html?id=${artwork.id}`;
        }
    });
    
    // Add specific handler for "Voir détails" button
    const viewDetailsBtn = card.querySelector('.btn-view-details');
    if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click
            window.location.href = `artwork.html?id=${artwork.id}`;
        });
    }
    
    return card;
}

function filterArtworks() {
    return artworks.filter(artwork => {
        // Search filter (titre, description)
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchesTitle = artwork.title?.toLowerCase().includes(searchLower);
            const matchesDesc = artwork.description?.toLowerCase().includes(searchLower);
            const matchesCategory = getCategoryLabel(artwork).toLowerCase().includes(searchLower);
            if (!matchesTitle && !matchesDesc && !matchesCategory) return false;
        }
        
        // Theme filter (checks both new 'theme' and old 'category' fields)
        if (filters.theme) {
            const artworkTheme = artwork.theme || artwork.category || '';
            if (artworkTheme !== filters.theme) return false;
        }
        
        // Technique filter
        if (filters.technique && artwork.technique !== filters.technique) {
            return false;
        }
        
        // Support filter
        if (filters.support && artwork.support !== filters.support) {
            return false;
        }
        
        // Format filter
        if (filters.format && artwork.format !== filters.format) {
            return false;
        }
        
        // Orientation filter
        if (filters.orientation && artwork.orientation !== filters.orientation) {
            return false;
        }
        
        // Style filter
        if (filters.style && artwork.style !== filters.style) {
            return false;
        }
        
        // Encadrement filter
        if (filters.encadrement && !artwork.encadrement) {
            return false;
        }
        
        // Price filter
        if (artwork.price && artwork.price > filters.maxPrice) {
            return false;
        }
        
        // Year filter
        if (filters.year && artwork.year != filters.year) {
            return false;
        }
        
        return true;
    });
}

function setupFilters() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        filters.search = e.target.value;
        displayArtworks();
    });
    
    // Theme filter
    const themeFilter = document.getElementById('themeFilter');
    themeFilter.addEventListener('change', (e) => {
        filters.theme = e.target.value;
        displayArtworks();
    });
    
    // Technique filter
    const techniqueFilter = document.getElementById('techniqueFilter');
    techniqueFilter.addEventListener('change', (e) => {
        filters.technique = e.target.value;
        displayArtworks();
    });
    
    // Support filter
    const supportFilter = document.getElementById('supportFilter');
    supportFilter.addEventListener('change', (e) => {
        filters.support = e.target.value;
        displayArtworks();
    });
    
    // Format filter
    const formatFilter = document.getElementById('formatFilter');
    formatFilter.addEventListener('change', (e) => {
        filters.format = e.target.value;
        displayArtworks();
    });
    
    // Orientation filter
    const orientationFilter = document.getElementById('orientationFilter');
    orientationFilter.addEventListener('change', (e) => {
        filters.orientation = e.target.value;
        displayArtworks();
    });
    
    // Style filter
    const styleFilter = document.getElementById('styleFilter');
    styleFilter.addEventListener('change', (e) => {
        filters.style = e.target.value;
        displayArtworks();
    });
    
    // Encadrement filter
    const encadrementFilter = document.getElementById('encadrementFilter');
    encadrementFilter.addEventListener('change', (e) => {
        filters.encadrement = e.target.checked;
        displayArtworks();
    });
    
    // Price range filter
    const priceRange = document.getElementById('priceRange');
    const maxPriceDisplay = document.getElementById('maxPriceDisplay');
    priceRange.addEventListener('input', (e) => {
        filters.maxPrice = parseInt(e.target.value);
        maxPriceDisplay.textContent = `${filters.maxPrice} €`;
        displayArtworks();
    });
    
    // Year filter
    const yearFilter = document.getElementById('yearFilter');
    yearFilter.addEventListener('change', (e) => {
        filters.year = e.target.value;
        displayArtworks();
    });
    
    // Reset filters button
    const resetBtn = document.getElementById('resetAllFilters');
    resetBtn.addEventListener('click', resetFilters);
    
    const resetBtn2 = document.getElementById('resetFilters');
    if (resetBtn2) {
        resetBtn2.addEventListener('click', resetFilters);
    }
}

function resetFilters() {
    filters = {
        search: '',
        theme: '',
        technique: '',
        support: '',
        format: '',
        orientation: '',
        style: '',
        encadrement: false,
        maxPrice: 5000,
        year: ''
    };
    
    // Reset form controls
    document.getElementById('searchInput').value = '';
    document.getElementById('themeFilter').value = '';
    document.getElementById('techniqueFilter').value = '';
    document.getElementById('supportFilter').value = '';
    document.getElementById('formatFilter').value = '';
    document.getElementById('orientationFilter').value = '';
    document.getElementById('styleFilter').value = '';
    document.getElementById('encadrementFilter').checked = false;
    document.getElementById('priceRange').value = 5000;
    document.getElementById('maxPriceDisplay').textContent = '5000 €';
    document.getElementById('yearFilter').value = '';
    
    displayArtworks();
}

// Populate year filter with available years
function populateYearFilter() {
    const yearFilter = document.getElementById('yearFilter');
    const years = new Set();
    
    artworks.forEach(artwork => {
        if (artwork.year) {
            years.add(artwork.year);
        }
    });
    
    const sortedYears = Array.from(years).sort((a, b) => b - a);
    
    sortedYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    resultsCount.textContent = `${count} œuvre${count > 1 ? 's' : ''} trouvée${count > 1 ? 's' : ''}`;
}

// Initial animation
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.artwork-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});