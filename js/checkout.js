// Checkout Page Functionality

const cart = {
    items: [],
    getCartData() {
        return {
            subtotal: 0,
            shipping: 0,
            tax: 0,
            total: 0
        };
    },
    clear() {
        this.items = [];
    }
};

document.addEventListener('DOMContentLoaded', () => {
    displayCheckoutPage();
    setupCheckoutForm();
});

function displayCheckoutPage() {
    displayOrderItems();
    updateCheckoutSummary();
}

function displayOrderItems() {
    const orderItemsContainer = document.getElementById('orderItems');
    
    if (cart.items.length === 0) {
        orderItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    orderItemsContainer.innerHTML = cart.items.map(item => `
        <div class="order-item">
            <span class="order-item-name">${item.name}</span>
            <span class="order-item-quantity">x${item.quantity}</span>
            <span class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
}

function updateCheckoutSummary() {
    const cartData = cart.getCartData();
    
    document.getElementById('checkoutSubtotal').textContent = `$${cartData.subtotal.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = `$${cartData.shipping.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${cartData.tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${cartData.total.toFixed(2)}`;
}

function setupCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateCheckoutForm()) {
            submitOrder();
        }
    });
}

function validateCheckoutForm() {
    const fields = [
        { id: 'firstName', name: 'First Name' },
        { id: 'lastName', name: 'Last Name' },
        { id: 'email', name: 'Email' },
        { id: 'phone', name: 'Phone' },
        { id: 'address', name: 'Address' },
        { id: 'city', name: 'City' },
        { id: 'state', name: 'State' },
        { id: 'zip', name: 'ZIP Code' }
    ];

    let isValid = true;

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorElement = document.getElementById(`${field.id}Error`);
        
        let error = '';

        if (!input.value.trim()) {
            error = `${field.name} is required`;
            isValid = false;
        } else if (field.id === 'email' && !isValidEmail(input.value)) {
            error = 'Please enter a valid email address';
            isValid = false;
        } else if (field.id === 'phone' && !isValidPhone(input.value)) {
            error = 'Please enter a valid phone number';
            isValid = false;
        } else if (field.id === 'zip' && !isValidZip(input.value)) {
            error = 'Please enter a valid ZIP code';
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

function isValidPhone(phone) {
    return /^[\d\-\+\(\)\s]{10,}$/.test(phone.replace(/\s/g, ''));
}

function isValidZip(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip);
}

function submitOrder() {
    // Generate order number
    const orderNumber = Math.floor(Math.random() * 1000000);
    const email = document.getElementById('email').value;

    // Show success modal
    const modal = document.getElementById('successModal');
    document.getElementById('confirmEmail').textContent = email;
    document.getElementById('orderNumber').textContent = orderNumber;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Clear cart
    setTimeout(() => {
        cart.clear();
    }, 1000);
}

// Close success modal and redirect
document.addEventListener('DOMContentLoaded', () => {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        const backButton = successModal.querySelector('.btn-primary');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    }
});
