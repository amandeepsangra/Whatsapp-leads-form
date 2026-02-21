/**
 * WhatsApp Leads Integration
 * Build by GAB Global Tech
 * -----------------------------------------
 * Hand-crafted with specific UI feedback
 */

const formInstance = document.querySelector('#whatsappForm');
const actionBtn = document.querySelector('#mainSubmit');

formInstance.addEventListener('submit', (event) => {
    event.preventDefault();

    // Bundle form entries
    const formData = {
        name: document.querySelector('#name').value.trim(),
        email: document.querySelector('#email').value.trim(),
        phone: document.querySelector('#phone').value.trim(),
        msg: document.querySelector('#message').value.trim()
    };

    // Basic check for required fields
    if (!formData.name || !formData.email || !formData.phone) {
        console.warn('Incomplete form submission attempted.');
        return;
    }

    // Prepare message string for WhatsApp
    const encodedMsg = `*New Lead Identified*%0A%0A` +
        `*Client Name:* ${formData.name}%0A` +
        `*Email:* ${formData.email}%0A` +
        `*Contact:* ${formData.phone}%0A` +
        `*Notes:* ${formData.msg || 'None'}`;

    // Target Number (WhatsApp API format)
    const waBase = "919876543210";
    const finalUrl = `https://wa.me/${waBase}?text=${encodedMsg}`;

    // Update UI state
    const spanTag = actionBtn.querySelector('span');
    const oldLabel = spanTag.innerText;

    actionBtn.disabled = true;
    spanTag.innerText = 'Connecting...';

    // Switch to loading icon
    const icon = actionBtn.querySelector('i');
    icon.className = 'fas fa-circle-notch fa-spin';

    // Trigger redirection after a brief visual confirmation
    setTimeout(() => {
        window.open(finalUrl, '_blank');

        // Restore UI
        actionBtn.disabled = false;
        spanTag.innerText = oldLabel;
        icon.className = 'fab fa-whatsapp';

        formInstance.reset();
    }, 750);
});

// Focus effects for better UX
document.querySelectorAll('.input-icon input, .input-icon textarea').forEach(field => {
    field.addEventListener('focus', () => {
        field.closest('.input-icon').style.transform = 'translateY(-2px)';
    });
    field.addEventListener('blur', () => {
        field.closest('.input-icon').style.transform = 'translateY(0)';
    });
});
