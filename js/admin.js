// Admin Panel JavaScript with Supabase Integration

// Vérifier que la configuration Supabase est chargée
if (typeof SUPABASE_CONFIG === 'undefined') {
    console.error('SUPABASE_CONFIG is not defined. Make sure config.js is loaded before admin.js');
    alert('Erreur de configuration: Le fichier config.js n\'a pas été chargé correctement.');
}

// Supabase Configuration (importé depuis config.js)
const supabase = window.supabase.createClient(
    SUPABASE_CONFIG.url, 
    SUPABASE_CONFIG.anonKey
);

console.log('Supabase client initialized:', supabase ? 'Success' : 'Failed');

// Demo mode for testing without Supabase
const DEMO_MODE = false; // Set to true to bypass Supabase for testing

// State
let currentUser = null;
let editingArtworkId = null;
let demoArtworks = []; // For demo mode

// DOM Elements
const loginSection = document.getElementById('loginSection');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const addArtworkBtn = document.getElementById('addArtworkBtn');
const artworkModal = document.getElementById('artworkModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const artworkForm = document.getElementById('artworkForm');
const artworksTableBody = document.getElementById('artworksTableBody');
const artworkImage = document.getElementById('artworkImage');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const confirmDialog = document.getElementById('confirmDialog');
const confirmTitle = document.getElementById('confirmTitle');
const confirmMessage = document.getElementById('confirmMessage');
const confirmOk = document.getElementById('confirmOk');
const confirmCancel = document.getElementById('confirmCancel');

// Check if user is logged in on page load
checkUser();

// Event Listeners
loginForm.addEventListener('submit', handleLogin);
logoutBtn.addEventListener('click', handleLogout);
addArtworkBtn.addEventListener('click', () => openModal());
closeModal.addEventListener('click', closeArtworkModal);
cancelBtn.addEventListener('click', closeArtworkModal);
artworkForm.addEventListener('submit', handleArtworkSubmit);
artworkImage.addEventListener('change', handleImagePreview);

// Close modal when clicking outside
artworkModal.addEventListener('click', (e) => {
    if (e.target === artworkModal) {
        closeArtworkModal();
    }
});

// Confirm dialog event listeners
confirmCancel.addEventListener('click', closeConfirmDialog);
confirmDialog.addEventListener('click', (e) => {
    if (e.target === confirmDialog) {
        closeConfirmDialog();
    }
});

// Authentication Functions
async function checkUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
            console.warn('Auth check error:', error);
            showLogin();
            return;
        }
        
        if (user) {
            currentUser = user;
            showDashboard();
            loadArtworks();
        } else {
            showLogin();
        }
    } catch (error) {
        console.error('Check user error:', error);
        showLogin();
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Add loading state
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;
    loginError.classList.add('hidden');
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        
        currentUser = data.user;
        
        // Small delay for smooth transition
        setTimeout(() => {
            submitBtn.classList.remove('btn-loading');
            submitBtn.disabled = false;
            showDashboard();
            loadArtworks();
        }, 500);
    } catch (error) {
        submitBtn.classList.remove('btn-loading');
        submitBtn.disabled = false;
        showError(loginError, error.message);
    }
}

async function handleLogout() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        currentUser = null;
        showLogin();
    } catch (error) {
        console.error('Logout error:', error);
    }
}

function showDashboard() {
    loginSection.classList.add('hidden');
    adminDashboard.classList.remove('hidden');
}

function showLogin() {
    loginSection.classList.remove('hidden');
    adminDashboard.classList.add('hidden');
}

// Artwork CRUD Functions
async function loadArtworks() {
    try {
        const { data: artworks, error } = await supabase
            .from('artworks')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Supabase error:', error);
            // Show helpful error message
            if (error.message.includes('relation') || error.message.includes('does not exist')) {
                artworksTableBody.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align: center; padding: 3rem;">
                            <div style="color: var(--gray-700);">
                                <h3 style="color: var(--primary); margin-bottom: 1rem;">⚠️ Base de données non configurée</h3>
                                <p style="margin-bottom: 1rem;">La table "artworks" n'existe pas encore dans Supabase.</p>
                                <p style="font-size: 0.9rem; color: var(--gray-600);">
                                    Suivez les instructions dans <strong>SUPABASE_SETUP.md</strong><br>
                                    pour créer la base de données avec le script <strong>supabase-setup.sql</strong>
                                </p>
                            </div>
                        </td>
                    </tr>
                `;
                return;
            }
            throw error;
        }
        
        displayArtworks(artworks);
    } catch (error) {
        console.error('Error loading artworks:', error);
        artworksTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 3rem; color: var(--gray-600);">
                    <p style="color: #dc2626; margin-bottom: 0.5rem;">❌ Erreur de chargement</p>
                    <p style="font-size: 0.9rem;">${error.message}</p>
                </td>
            </tr>
        `;
    }
}

function displayArtworks(artworks) {
    if (!artworks || artworks.length === 0) {
        artworksTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 3rem; color: var(--gray-500);">
                    Aucune œuvre dans la galerie. Cliquez sur "Ajouter une œuvre" pour commencer.
                </td>
            </tr>
        `;
        return;
    }
    
    artworksTableBody.innerHTML = artworks.map(artwork => `
        <tr>
            <td>
                ${artwork.image_url ? 
                    `<img src="${artwork.image_url}" alt="${artwork.title}" class="artwork-thumbnail">` :
                    `<div class="artwork-thumbnail" style="background: var(--gray-200); display: flex; align-items: center; justify-content: center; color: var(--gray-500);">🎨</div>`
                }
            </td>
            <td><strong>${artwork.title}</strong></td>
            <td><span class="category-badge category-${artwork.category}">${getCategoryLabel(artwork.category)}</span></td>
            <td>${artwork.dimensions}</td>
            <td><span class="artwork-price">${artwork.price} €</span></td>
            <td><span class="artwork-year">${artwork.year}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon-only btn-edit" onclick="editArtwork(${artwork.id})" title="Modifier">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </button>
                    <button class="btn-icon-only btn-delete" onclick="deleteArtwork(${artwork.id}, '${artwork.title}')" title="Supprimer">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getCategoryLabel(category) {
    const labels = {
        'eaux': 'Eaux',
        'escaliers': 'Escaliers',
        'voyages': 'Voyages'
    };
    return labels[category] || category;
}

// Modal Functions
function openModal(artworkId = null) {
    editingArtworkId = artworkId;
    const modalTitle = document.getElementById('modalTitle');
    const submitBtnText = document.getElementById('submitBtnText');
    
    if (artworkId) {
        modalTitle.textContent = 'Modifier l\'œuvre';
        submitBtnText.textContent = 'Mettre à jour';
        loadArtworkData(artworkId);
    } else {
        modalTitle.textContent = 'Ajouter une œuvre';
        submitBtnText.textContent = 'Enregistrer';
        artworkForm.reset();
        imagePreview.classList.add('hidden');
    }
    
    artworkModal.classList.remove('hidden');
    document.getElementById('formError').classList.add('hidden');
}

async function loadArtworkData(artworkId) {
    try {
        const { data, error } = await supabase
            .from('artworks')
            .select('*')
            .eq('id', artworkId)
            .single();
        
        if (error) throw error;
        
        document.getElementById('artworkId').value = data.id;
        document.getElementById('artworkTitle').value = data.title;
        document.getElementById('artworkTheme').value = data.theme || data.category;
        document.getElementById('artworkYear').value = data.year;
        document.getElementById('artworkTechnique').value = data.technique || 'aquarelle';
        document.getElementById('artworkSupport').value = data.support || 'papier';
        document.getElementById('artworkFormat').value = data.format || 'moyen';
        document.getElementById('artworkOrientation').value = data.orientation || 'paysage';
        document.getElementById('artworkStyle').value = data.style || 'figuratif';
        document.getElementById('artworkEncadrement').value = data.encadrement ? 'true' : 'false';
        document.getElementById('artworkMedium').value = data.medium || '';
        document.getElementById('artworkDimensions').value = data.dimensions;
        document.getElementById('artworkPrice').value = data.price;
        document.getElementById('artworkDescription').value = data.description || '';
        
        if (data.image_url) {
            previewImg.src = data.image_url;
            imagePreview.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error loading artwork:', error);
    }
}

function closeArtworkModal() {
    artworkModal.classList.add('hidden');
    artworkForm.reset();
    editingArtworkId = null;
    imagePreview.classList.add('hidden');
}

// Form Submission
async function handleArtworkSubmit(e) {
    e.preventDefault();
    
    const formError = document.getElementById('formError');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const submitBtnText = document.getElementById('submitBtnText');
    
    formError.classList.add('hidden');
    
    // Add loading state
    submitBtn.disabled = true;
    const originalText = submitBtnText.textContent;
    submitBtnText.textContent = 'Enregistrement...';
    
    try {
        // Mapper les nouveaux thèmes vers les anciennes catégories pour compatibilité
        const themeValue = document.getElementById('artworkTheme').value;
        const themeToCategoryMap = {
            'abstractions': 'eaux',
            'architecture': 'escaliers',
            'eaux': 'eaux',
            'escaliers': 'escaliers',
            'interieurs': 'escaliers',
            'saisons': 'voyages',
            'paysages': 'voyages',
            'villes': 'voyages',
            'voyages': 'voyages'
        };
        const mappedCategory = themeToCategoryMap[themeValue] || 'eaux';
        
        // Préparer les données avec tous les champs
        const fullArtworkData = {
            title: document.getElementById('artworkTitle').value,
            theme: themeValue,
            year: parseInt(document.getElementById('artworkYear').value),
            technique: document.getElementById('artworkTechnique').value,
            support: document.getElementById('artworkSupport').value,
            format: document.getElementById('artworkFormat').value,
            orientation: document.getElementById('artworkOrientation').value,
            style: document.getElementById('artworkStyle').value,
            encadrement: document.getElementById('artworkEncadrement').value === 'true',
            medium: document.getElementById('artworkMedium').value || '',
            dimensions: document.getElementById('artworkDimensions').value,
            price: parseFloat(document.getElementById('artworkPrice').value),
            description: document.getElementById('artworkDescription').value || '',
            // Utiliser la catégorie mappée pour compatibilité
            category: mappedCategory
        };
        
        // Version de compatibilité avec anciennes colonnes seulement
        // (au cas où la migration SQL n'a pas été faite)
        const compatibilityData = {
            title: fullArtworkData.title,
            category: mappedCategory,
            year: fullArtworkData.year,
            medium: `${fullArtworkData.technique} sur ${fullArtworkData.support}`,
            dimensions: fullArtworkData.dimensions,
            price: fullArtworkData.price,
            description: fullArtworkData.description
        };
        
        // Essayer d'abord avec toutes les données
        let artworkData = fullArtworkData;
        
        // Handle image upload
        const imageFile = artworkImage.files[0];
        if (imageFile) {
            submitBtnText.textContent = 'Upload de l\'image...';
            try {
                const imageUrl = await uploadImage(imageFile);
                artworkData.image_url = imageUrl;
                console.log('✅ Image uploadée avec succès:', imageUrl);
            } catch (uploadError) {
                console.error('❌ Erreur upload image:', uploadError);
                
                // Afficher une alerte claire à l'utilisateur
                const continueWithoutImage = confirm(
                    '⚠️ L\'upload de l\'image a échoué.\n\n' +
                    'Erreur: ' + uploadError.message + '\n\n' +
                    'Vérifiez que le bucket "artwork-images" existe dans Supabase Storage.\n\n' +
                    'Voulez-vous continuer SANS image ?'
                );
                
                if (!continueWithoutImage) {
                    submitBtn.disabled = false;
                    submitBtnText.textContent = originalText;
                    return; // Annuler l'enregistrement
                }
                // Sinon, continuer sans image
                console.warn('⚠️ Enregistrement sans image');
            }
        }
        
        if (editingArtworkId) {
            // Update existing artwork - Essayer d'abord avec toutes les nouvelles colonnes
            const { error } = await supabase
                .from('artworks')
                .update(fullArtworkData)
                .eq('id', editingArtworkId);
            
            // Si erreur de colonne ou contrainte, essayer avec mode compatibilité
            if (error && error.message && (error.message.includes('column') || error.message.includes('constraint'))) {
                console.warn('⚠️ Nouvelles colonnes non disponibles ou contrainte ancienne, utilisation du mode compatibilité');
                const { error: compatError } = await supabase
                    .from('artworks')
                    .update(compatibilityData)
                    .eq('id', editingArtworkId);
                
                if (compatError) throw compatError;
                
                alert('⚠️ Modifié en mode compatibilité.\n\nPour utiliser tous les filtres, exécutez:\nsupabase-migration-filters.sql');
            } else if (error) {
                throw error;
            }
        } else {
            // Insert new artwork
            const { error } = await supabase
                .from('artworks')
                .insert([artworkData]);
            
            // Si erreur de colonne, essayer avec mode compatibilité  
            if (error && error.message && error.message.includes('column')) {
                console.warn('⚠️ Nouvelles colonnes non disponibles, utilisation du mode compatibilité');
                const { error: compatError } = await supabase
                    .from('artworks')
                    .insert([compatibilityData]);
                
                if (compatError) throw compatError;
                
                alert('✅ Œuvre enregistrée en mode compatibilité.\n\n⚠️ Pour utiliser tous les nouveaux filtres, exécutez le script SQL:\nsupabase-migration-filters.sql');
            } else if (error) {
                throw error;
            }
        }
        
        closeArtworkModal();
        loadArtworks();
    } catch (error) {
        console.error('❌ Form submission error:', error);
        console.error('Error details:', error.message, error.details, error.hint);
        submitBtn.disabled = false;
        submitBtnText.textContent = originalText;
        
        // Message d'erreur plus détaillé
        let errorMessage = 'Une erreur est survenue lors de l\'enregistrement.';
        
        if (error.message && error.message.includes('column') && error.message.includes('does not exist')) {
            errorMessage = '⚠️ Erreur de base de données:\n\n' +
                          'Les nouvelles colonnes n\'existent pas encore dans Supabase.\n\n' +
                          '🔧 Solution:\n' +
                          '1. Allez dans Supabase > SQL Editor\n' +
                          '2. Exécutez le script: supabase-migration-filters.sql\n' +
                          '3. Réessayez d\'ajouter l\'œuvre\n\n' +
                          'Erreur technique: ' + error.message;
        } else if (error.message && error.message.includes('artworks_category_check')) {
            errorMessage = '⚠️ Contrainte de catégorie:\n\n' +
                          'La base de données a encore l\'ancienne contrainte sur "category".\n\n' +
                          '🔧 Solution:\n' +
                          '1. Allez dans Supabase > SQL Editor\n' +
                          '2. Exécutez le script: supabase-migration-filters.sql\n' +
                          '3. Cela supprimera l\'ancienne contrainte\n\n' +
                          'En attendant, vos œuvres sont enregistrées avec catégorie mappée.';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        showError(formError, errorMessage);
        
        // Afficher aussi une alerte
        if (error.message && (error.message.includes('column') || error.message.includes('constraint'))) {
            alert('⚠️ Base de données non à jour.\n\nExécutez le script SQL:\nsupabase-migration-filters.sql\n\npour supprimer les anciennes contraintes.');
        }
    }
}

// Image Upload
async function uploadImage(file) {
    try {
        // Vérifier la taille du fichier (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            throw new Error('Le fichier est trop grand (max 5MB). Taille: ' + (file.size / 1024 / 1024).toFixed(2) + 'MB');
        }
        
        // Vérifier le type de fichier
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            throw new Error('Type de fichier non autorisé. Utilisez JPG, PNG ou WebP.');
        }
        
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `artworks/${fileName}`;
        
        console.log('📤 Upload de l\'image:', filePath);
        
        const { error: uploadError, data: uploadData } = await supabase.storage
            .from('artwork-images')
            .upload(filePath, file);
        
        if (uploadError) {
            console.error('❌ Erreur Supabase Storage:', uploadError);
            
            // Messages d'erreur personnalisés
            if (uploadError.message.includes('Bucket not found')) {
                throw new Error('Le bucket "artwork-images" n\'existe pas. Créez-le dans Supabase Storage.');
            } else if (uploadError.message.includes('new row violates row-level security')) {
                throw new Error('Problème de permissions. Vérifiez les politiques du bucket dans Storage.');
            } else {
                throw new Error(uploadError.message);
            }
        }
        
        console.log('✅ Fichier uploadé:', uploadData);
        
        const { data } = supabase.storage
            .from('artwork-images')
            .getPublicUrl(filePath);
        
        console.log('✅ URL publique générée:', data.publicUrl);
        
        return data.publicUrl;
    } catch (error) {
        console.error('❌ Error uploading image:', error);
        throw error;
    }
}

function handleImagePreview(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            imagePreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

// Delete Artwork
async function deleteArtwork(id, title) {
    return new Promise((resolve) => {
        // Show custom confirm dialog
        confirmTitle.textContent = 'Confirmer la suppression';
        confirmMessage.textContent = `Êtes-vous sûr de vouloir supprimer l'œuvre "${title}" ?`;
        confirmDialog.classList.remove('hidden');
        
        // Handle confirmation
        const handleConfirm = async () => {
            confirmDialog.classList.add('hidden');
            confirmOk.removeEventListener('click', handleConfirm);
            
            try {
                const { error } = await supabase
                    .from('artworks')
                    .delete()
                    .eq('id', id);
                
                if (error) throw error;
                
                loadArtworks();
                resolve(true);
            } catch (error) {
                showError(null, 'Erreur lors de la suppression: ' + error.message);
                resolve(false);
            }
        };
        
        confirmOk.addEventListener('click', handleConfirm, { once: true });
    });
}

function closeConfirmDialog() {
    confirmDialog.classList.add('hidden');
}

// Make functions globally accessible
window.editArtwork = (id) => openModal(id);
window.deleteArtwork = deleteArtwork;

// Utility Functions
function showError(element, message) {
    element.textContent = message;
    element.classList.remove('hidden');
    setTimeout(() => {
        element.classList.add('hidden');
    }, 5000);
}

// ============================================
// MESSAGES TAB FUNCTIONALITY
// ============================================

let currentMessageFilter = 'all';

// Setup tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(`${tab}Tab`).classList.add('active');
        
        // Load messages if switching to messages tab
        if (tab === 'messages') {
            loadMessages();
        }
    });
});

// Setup message filters
document.querySelectorAll('.filter-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-toggle').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentMessageFilter = btn.dataset.filter;
        loadMessages();
    });
});

// Load messages from Supabase
async function loadMessages() {
    const container = document.getElementById('messagesContainer');
    container.innerHTML = '<p style="text-align: center; padding: 2rem;">Chargement...</p>';
    
    try {
        let query = supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });
        
        // Apply filter
        if (currentMessageFilter === 'unread') {
            query = query.eq('read', false);
        } else if (currentMessageFilter === 'read') {
            query = query.eq('read', true);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        displayMessages(data);
        updateUnreadCount();
    } catch (error) {
        console.error('Error loading messages:', error);
        container.innerHTML = `<p class="error-message">Erreur lors du chargement des messages: ${error.message}</p>`;
    }
}

// Display messages
function displayMessages(messages) {
    const container = document.getElementById('messagesContainer');
    
    if (messages.length === 0) {
        container.innerHTML = `
            <div class="empty-messages">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                </svg>
                <h3>Aucun message</h3>
                <p>Aucun message ${currentMessageFilter === 'unread' ? 'non lu' : currentMessageFilter === 'read' ? 'lu' : ''} trouvé</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = messages.map(msg => createMessageCard(msg)).join('');
}

// Create message card HTML
function createMessageCard(msg) {
    const date = new Date(msg.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    return `
        <div class="message-card ${msg.read ? '' : 'unread'}">
            <div class="message-header">
                <div class="message-info">
                    <h3>${msg.name}</h3>
                    <div class="message-meta">
                        <span>✉️ ${msg.email}</span>
                        ${msg.phone ? `<span>📞 ${msg.phone}</span>` : ''}
                    </div>
                </div>
                <span class="message-date">${date}</span>
            </div>
            <div class="message-subject">${msg.subject}</div>
            <div class="message-text">${msg.message}</div>
            <div class="message-actions">
                ${!msg.read ? `<button class="btn-mark-read" onclick="markAsRead('${msg.id}')">Marquer comme lu</button>` : ''}
                <button class="btn-delete-message" onclick="deleteMessage('${msg.id}', '${msg.name}')">Supprimer</button>
            </div>
        </div>
    `;
}

// Mark message as read
async function markAsRead(id) {
    try {
        const { error } = await supabase
            .from('contact_messages')
            .update({ read: true })
            .eq('id', id);
        
        if (error) throw error;
        
        loadMessages();
    } catch (error) {
        console.error('Error marking message as read:', error);
        alert('Erreur lors de la mise à jour du message');
    }
}

// Delete message
async function deleteMessage(id, name) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le message de ${name} ?`)) {
        return;
    }
    
    try {
        const { error } = await supabase
            .from('contact_messages')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        
        loadMessages();
    } catch (error) {
        console.error('Error deleting message:', error);
        alert('Erreur lors de la suppression du message');
    }
}

// Update unread count badge
async function updateUnreadCount() {
    try {
        const { data, error } = await supabase
            .from('contact_messages')
            .select('id', { count: 'exact' })
            .eq('read', false);
        
        if (error) throw error;
        
        const badge = document.getElementById('unreadCount');
        const count = data.length;
        
        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error getting unread count:', error);
    }
}

// Make functions globally accessible
window.markAsRead = markAsRead;
window.deleteMessage = deleteMessage;

// Check for new messages every minute
setInterval(updateUnreadCount, 60000);
