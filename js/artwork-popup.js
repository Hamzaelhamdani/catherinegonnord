// Artwork Popup Functions

// Global variable to store current artwork data
let currentArtwork = null;

/**
 * Open artwork detail popup
 */
window.openArtworkPopup = function(artwork) {
    currentArtwork = artwork;
    const popup = document.getElementById('artworkPopup');
    
    // Populate popup with artwork data
    populatePopupData(artwork);
    
    // Show popup with animation
    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Close artwork detail popup
 */
window.closeArtworkPopup = function() {
    const popup = document.getElementById('artworkPopup');
    popup.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    currentArtwork = null;
}

/**
 * Populate popup with artwork data
 */
function populatePopupData(artwork) {
    // Category
    const category = artwork.theme || artwork.category || 'AQUARELLE';
    document.getElementById('popupCategory').textContent = category.toUpperCase();
    
    // Title
    document.getElementById('popupTitle').textContent = artwork.title || 'Sans titre';
    
    // Year
    document.getElementById('popupYear').textContent = artwork.year || '';
    
    // Price
    const priceElement = document.getElementById('popupPrice');
    if (artwork.price) {
        priceElement.textContent = `${artwork.price} €`;
    } else {
        priceElement.textContent = 'Prix sur demande';
    }
    
    // Technique
    document.getElementById('popupTechnique').textContent = artwork.technique || 'Non spécifiée';
    
    // Support
    document.getElementById('popupSupport').textContent = artwork.support || 'Non spécifié';
    
    // Dimensions
    const dimensions = artwork.dimensions || `${artwork.width || '?'} × ${artwork.height || '?'} cm`;
    document.getElementById('popupDimensions').textContent = dimensions;
    
    // Encadrement
    const encadrement = artwork.encadrement ? 'Encadrée' : 'Non encadrée';
    document.getElementById('popupEncadrement').textContent = encadrement;
    
    // Image
    const imageContainer = document.getElementById('popupImageContainer');
    imageContainer.innerHTML = '';
    
    if (artwork.image_url) {
        const img = document.createElement('img');
        img.src = artwork.image_url;
        img.alt = artwork.title || 'Œuvre d\'art';
        img.onerror = function() {
            // If image fails to load, show placeholder
            imageContainer.innerHTML = `
                <div class="popup-image-placeholder">
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
            <div class="popup-image-placeholder">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <p>Image non disponible</p>
            </div>
        `;
    }
    
    // Description (if available)
    if (artwork.description) {
        document.getElementById('popupDescriptionSection').style.display = 'block';
        document.getElementById('popupDescription').textContent = artwork.description;
    } else {
        document.getElementById('popupDescriptionSection').style.display = 'none';
    }
    
    // Setup buy button
    setupBuyButton(artwork);
}

/**
 * Setup buy button click handler
 */
function setupBuyButton(artwork) {
    const buyButton = document.getElementById('btnBuyArtwork');
    
    // Remove previous event listeners by cloning
    const newBuyButton = buyButton.cloneNode(true);
    buyButton.parentNode.replaceChild(newBuyButton, buyButton);
    
    // Add new click handler
    newBuyButton.addEventListener('click', function() {
        handleBuyArtwork(artwork);
    });
}

/**
 * Handle buy button click
 * This function will be updated with the payment link
 */
function handleBuyArtwork(artwork) {
    // Placeholder - will be replaced with actual payment URL
    console.log('Achat de l\'œuvre:', artwork);
    
    // TODO: Open payment page in new tab
    // window.open('PAYMENT_URL_HERE', '_blank');
    
    // For now, show alert
    alert(`Fonction d'achat à configurer pour: ${artwork.title}\nPrix: ${artwork.price} €`);
}

// Close popup when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('artworkPopup');
    
    if (popup) {
        popup.addEventListener('click', function(e) {
            // Close if clicking on overlay (not on popup content)
            if (e.target === popup) {
                closeArtworkPopup();
            }
        });
    }
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeArtworkPopup();
        }
    });
});
