// Shop Page Functionality

let filteredProducts = [];
let selectedCategories = [];

document.addEventListener('DOMContentLoaded', () => {
    initializeShop();
});

function initializeShop() {
    // Initialize filteredProducts with global products
    filteredProducts = [...products];
    // Load all products initially
    displayProducts(filteredProducts);

    // Setup event listeners
    setupFilterListeners();
    setupSortListener();
    updateResultCount();
}

function setupFilterListeners() {
    // Category filter
    const categoryAll = document.getElementById('categoryAll');
    const categoryFilters = document.querySelectorAll('.category-filter');

    categoryAll.addEventListener('change', () => {
        categoryFilters.forEach(filter => {
            filter.checked = false;
        });
        selectedCategories = [];
        applyFilters();
    });

    categoryFilters.forEach(filter => {
        filter.addEventListener('change', () => {
            if (filter.checked) {
                categoryAll.checked = false;
            }
            updateSelectedCategories();
            applyFilters();
        });
    });

    // Price range filter
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    priceRange.addEventListener('input', () => {
        priceValue.textContent = priceRange.value;
        applyFilters();
    });
}

function updateSelectedCategories() {
    const categoryFilters = document.querySelectorAll('.category-filter:checked');
    selectedCategories = Array.from(categoryFilters).map(filter => filter.value);
}

function setupSortListener() {
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', () => {
        applySort();
    });
}

function applyFilters() {
    const priceMax = parseFloat(document.getElementById('priceRange').value);
    
    filteredProducts = products.filter(product => {
        // Category filter
        if (selectedCategories.length > 0) {
            if (!selectedCategories.includes(product.category)) {
                return false;
            }
        }
        
        // Price filter
        if (product.price > priceMax) {
            return false;
        }
        
        return true;
    });

    applySort();
    updateResultCount();
    displayProducts(filteredProducts);
}

function applySort() {
    const sortValue = document.getElementById('sortSelect').value;
    
    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Keep original order
            filteredProducts.sort((a, b) => a.id - b.id);
    }
    
    displayProducts(filteredProducts);
}

function updateResultCount() {
    const resultCount = document.getElementById('resultCount');
    resultCount.textContent = `Showing ${filteredProducts.length} products`;
}

function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;">No products found. Try adjusting your filters.</p>';
        return;
    }

    productsGrid.innerHTML = productsToDisplay.map(product => `
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

// Product Details Modal
let currentProductId = null;

function viewProductDetails(productId) {
    currentProductId = productId;
    const product = getProductById(productId);
    
    if (!product) return;

    // Populate modal
    document.getElementById('modalImage').src = '';
    document.getElementById('modalImage').textContent = product.emoji;
    document.getElementById('modalName').textContent = product.name;
    document.getElementById('modalCategory').textContent = product.category;
    document.getElementById('modalRating').textContent = `★ ${product.rating}`;
    document.getElementById('modalRatingText').textContent = `(${Math.floor(Math.random() * 200) + 50} reviews)`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
    
    // Benefits list
    const benefitsList = document.getElementById('modalBenefits');
    benefitsList.innerHTML = product.benefits.map(benefit => `<li>${benefit}</li>`).join('');
    
    // Reset quantity
    document.getElementById('quantityInput').value = '1';
    
    // Show modal
    const modal = document.getElementById('productModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Setup modal controls
    setupModalControls();
}

function setupModalControls() {
    const quantityInput = document.getElementById('quantityInput');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const closeBtn = document.getElementById('modalClose');

    decreaseBtn.onclick = () => {
        let value = parseInt(quantityInput.value) || 1;
        if (value > 1) quantityInput.value = value - 1;
    };

    increaseBtn.onclick = () => {
        let value = parseInt(quantityInput.value) || 1;
        quantityInput.value = value + 1;
    };

    addToCartBtn.onclick = () => {
        const quantity = parseInt(quantityInput.value) || 1;
        cart.addItem(currentProductId, quantity);
        closeModal();
        showNotification(`Added ${quantity} item(s) to cart!`);
    };

    closeBtn.onclick = closeModal;
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

function getProductById(id) {
    return products.find(product => product.id === id);
}

function showNotification(message) {
    alert(message); // Simple implementation for demonstration
}
