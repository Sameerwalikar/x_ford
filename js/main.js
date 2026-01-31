// Main JavaScript for all pages

// Declare products variable
const products = [
    { id: 1, emoji: '🍎', category: 'Fruits', name: 'Apple', rating: 4.5, price: 1.20 },
    { id: 2, emoji: '🍌', category: 'Fruits', name: 'Banana', rating: 4.0, price: 0.50 },
    { id: 3, emoji: '🥦', category: 'Vegetables', name: 'Broccoli', rating: 4.8, price: 2.00 },
    { id: 4, emoji: '🥕', category: 'Vegetables', name: 'Carrot', rating: 4.2, price: 1.00 },
    { id: 5, emoji: '🍗', category: 'Meats', name: 'Chicken', rating: 4.7, price: 5.00 },
    { id: 6, emoji: '🐟', category: 'Seafoods', name: 'Fish', rating: 4.6, price: 6.00 },
    // Additional products can be added here
];

// Declare cart object
const cart = {
    items: [],
    addItem: function(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity += quantity;
        } else {
            this.items.push({ id: productId, quantity: quantity });
        }
    }
};

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Load featured products on homepage
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadFeaturedProducts();
    }
});

// Load Featured Products on Homepage
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    // Show first 6 products as featured
    const featured = products.slice(0, 6);
    
    container.innerHTML = featured.map(product => `
        <div class="product-card" onclick="viewProductDetails(${product.id})">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${Array(Math.floor(product.rating)).fill('<span class="star">★</span>').join('')}
                    <span style="color: #999;">${product.rating}</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCartQuick(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart from featured/grid
function addToCartQuick(productId) {
    cart.addItem(productId, 1);
    showNotification('Product added to cart!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #00FF41;
        color: #000;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// View Product Details Function
function viewProductDetails(productId) {
    const product = products.find(product => product.id === productId);
    if (product) {
        alert(`Product Details:\nName: ${product.name}\nCategory: ${product.category}\nRating: ${product.rating}\nPrice: $${product.price.toFixed(2)}`);
    }
}
