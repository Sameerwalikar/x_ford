// Contact Page Functionality

document.addEventListener('DOMContentLoaded', () => {
    setupContactForm();
});

function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateContactForm()) {
            submitContactForm();
        }
    });
}

function validateContactForm() {
    const fields = [
        { id: 'contactName', name: 'Name' },
        { id: 'contactEmail', name: 'Email' },
        { id: 'contactSubject', name: 'Subject' },
        { id: 'contactMessage', name: 'Message' }
    ];

    let isValid = true;

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorElement = document.getElementById(`${field.id}Error`);
        
        let error = '';

        if (!input.value.trim()) {
            error = `${field.name} is required`;
            isValid = false;
        } else if (field.id === 'contactEmail' && !isValidEmail(input.value)) {
            error = 'Please enter a valid email address';
            isValid = false;
        } else if (field.id === 'contactMessage' && input.value.trim().length < 10) {
            error = 'Message must be at least 10 characters';
            isValid = false;
        }

        if (error) {
            errorElement.textContent = error;
            errorElement.classList.add('show');
        } else {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    });

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('contactSuccessMessage');

    // Hide form and show success message
    form.style.display = 'none';
    successMessage.style.display = 'block';

    // Reset form after 5 seconds
    setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        successMessage.style.display = 'none';
    }, 5000);
}
