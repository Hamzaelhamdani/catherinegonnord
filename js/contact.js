// Contact Form Handling with Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Initialize Supabase client
const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || null,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Disable submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Envoi en cours...</span>';

        try {
            // Insert message into Supabase
            const { data, error } = await supabase
                .from('contact_messages')
                .insert([formData]);

            if (error) {
                throw error;
            }

            console.log('✅ Message envoyé avec succès:', data);

            // Show success message
            showMessage('Merci ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.', 'success');

            // Reset form
            contactForm.reset();

            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        } catch (error) {
            console.error('❌ Erreur envoi formulaire:', error);
            showMessage('Désolé, une erreur s\'est produite. Veuillez réessayer ou me contacter directement par email.', 'error');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // Hide message after 8 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 8000);
    }
});
