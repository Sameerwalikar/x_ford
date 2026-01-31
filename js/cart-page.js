// Cart Page Functionality

const cart = {
    items: [],
    updateQuantity: function(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
        }
    },
    removeItem: function(productId) {
        this.items = this.items.filter(item => item.id !== productId);
    },
    getCartData: function() {
        const subtotal = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shipping = 5; // Example shipping cost
        const tax = subtotal * 0.1; // Example tax rate
        const total = subtotal + shipping + tax;
        return { subtotal, shipping, tax, total };
    }
};

document.addEventListener('DOMContentLoaded', () => {
    displayCartPage();
});

function displayCartPage() {
    const emptyMessage = document.getElementById('emptyCartMessage');
    const cartContent = document.getElementById('cartContent');
    
    if (cart.items.length === 0) {
        emptyMessage.style.display = 'block';
        cartContent.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        cartContent.style.display = 'grid';
        renderCartItems();
        updateCartSummary();
    }
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    cartItemsContainer.innerHTML = cart.items.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.category}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-selector">
                    <button class="qty-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateItemQuantity(${item.id}, this.value)">
                    <button class="qty-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div style="text-align: right;">
                    <p style="font-weight: bold; margin-bottom: 0.5rem;">$${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateItemQuantity(productId, quantity) {
    const numQuantity = parseInt(quantity);
    if (numQuantity > 0) {
        cart.updateQuantity(productId, numQuantity);
        displayCartPage();
    }
}

function removeFromCart(productId) {
    cart.removeItem(productId);
    displayCartPage();
}

function updateCartSummary() {
    const cartData = cart.getCartData();
    
    document.getElementById('subtotal').textContent = `$${cartData.subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${cartData.shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${cartData.tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${cartData.total.toFixed(2)}`;
}
