// Gallery Page JavaScript
let currentCategory = 'all';
let currentSearch = '';

document.addEventListener('DOMContentLoaded', function() {
    displayArtworks();
    setupFilters();
    setupSearch();
});

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
    
    card.innerHTML = `
        <div class="artwork-image">
            <div class="artwork-placeholder">
                <span class="placeholder-icon">🎨</span>
                <p class="placeholder-text">${artwork.title}</p>
            </div>
            <div class="artwork-price-badge">${artwork.price} €</div>
        </div>
        <div class="artwork-info">
            <h3 class="artwork-title">${artwork.title}</h3>
            <p class="artwork-category">${artwork.categoryLabel}</p>
            <div class="artwork-details">
                <p>${artwork.medium}</p>
                <p>${artwork.dimensions}</p>
                <p>${artwork.year}</p>
            </div>
            <div class="artwork-footer">
                <span class="artwork-price-large">${artwork.price} €</span>
                <button class="btn-view-details">Voir détails</button>
            </div>
        </div>
    `;
    
    // Add click handler
    card.addEventListener('click', () => {
        window.location.href = `artwork.html?id=${artwork.id}`;
    });
    
    return card;
}

function filterArtworks() {
    return artworks.filter(artwork => {
        const matchesCategory = currentCategory === 'all' || artwork.category === currentCategory;
        const matchesSearch = currentSearch === '' || 
            artwork.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
            artwork.categoryLabel.toLowerCase().includes(currentSearch.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Update current category and display
            currentCategory = btn.dataset.category;
            displayArtworks();
        });
    });
    
    // Reset filters button
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentCategory = 'all';
            currentSearch = '';
            document.getElementById('searchInput').value = '';
            
            // Reset active filter
            filterButtons.forEach(b => b.classList.remove('active'));
            filterButtons[0].classList.add('active');
            
            displayArtworks();
        });
    }
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        displayArtworks();
    });
}

function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    resultsCount.textContent = `${count} œuvre${count > 1 ? 's' : ''} trouvée${count > 1 ? 's' : ''}`;
}

// Initial animation
window.addEventListener('load', () => {
    animateOnScroll();
});