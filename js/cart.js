// Cart Management
class Cart {
    constructor() {
        this.items = this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        const savedCart = localStorage.getItem('ironfuel_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    saveToLocalStorage() {
        localStorage.setItem('ironfuel_cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(productId, quantity = 1) {
        const product = window.getProductById(productId); // Declared getProductById in window object
        if (!product) return;

        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                emoji: product.emoji,
                quantity: quantity
            });
        }
        
        this.saveToLocalStorage();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToLocalStorage();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveToLocalStorage();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.saveToLocalStorage();
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('#cartCount');
        const count = this.getItemCount();
        cartCountElements.forEach(el => {
            el.textContent = count;
        });
    }

    getCartData() {
        return {
            items: this.items,
            subtotal: this.getTotal(),
            shipping: this.items.length > 0 ? 9.99 : 0,
            tax: this.getTotal() * 0.1,
            total: this.getTotal() + (this.items.length > 0 ? 9.99 : 0) + (this.getTotal() * 0.1)
        };
    }
}

// Initialize cart
const cart = new Cart();

// Update cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartCount();
});

// Declare getProductById function in window object
window.getProductById = function(productId) {
    // Implementation of getProductById function
    // This is a placeholder implementation
    return {
        id: productId,
        name: 'Product Name',
        price: 10.99,
        category: 'Category',
        emoji: '🛍️',
        quantity: 1
    };
};
