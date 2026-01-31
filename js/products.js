// Product Database
const products = [
    {
        id: 1,
        name: 'Whey Protein Powder',
        category: 'Protein',
        price: 49.99,
        rating: 4.8,
        emoji: '🥤',
        description: 'Premium whey protein powder with fast absorption and superior taste. Perfect for post-workout recovery.',
        benefits: ['Fast absorption', '25g protein per serving', 'Low sugar', 'Great taste', 'Mixes easily']
    },
    {
        id: 2,
        name: 'Creatine Monohydrate',
        category: 'Creatine',
        price: 29.99,
        rating: 4.9,
        emoji: '💪',
        description: 'Pure creatine monohydrate for increased strength and muscle mass. Scientifically proven formula.',
        benefits: ['Increases strength', 'Builds muscle', 'Proven effectiveness', 'Micronized formula', 'Pure powder']
    },
    {
        id: 3,
        name: 'Pre-Workout Energy',
        category: 'Pre-Workout',
        price: 39.99,
        rating: 4.7,
        emoji: '⚡',
        description: 'High-energy pre-workout formula with beta-alanine and caffeine for intense training sessions.',
        benefits: ['Increased energy', 'Enhanced focus', 'Beta-alanine', 'Caffeine boost', 'Better endurance']
    },
    {
        id: 4,
        name: 'Multi-Vitamin Complex',
        category: 'Vitamins',
        price: 24.99,
        rating: 4.6,
        emoji: '💊',
        description: 'Complete daily vitamin and mineral complex to support overall health and recovery.',
        benefits: ['Complete vitamin blend', 'Supports immunity', 'Aids recovery', 'Daily essential nutrients', 'High potency']
    },
    {
        id: 5,
        name: 'Resistance Bands Set',
        category: 'Accessories',
        price: 34.99,
        rating: 4.8,
        emoji: '🎋',
        description: 'Complete set of resistance bands for portable and versatile training anywhere.',
        benefits: ['5 different resistance levels', 'Portable', 'Durable latex', 'Carrying bag included', 'Full body workout']
    },
    {
        id: 6,
        name: 'Casein Protein Powder',
        category: 'Protein',
        price: 54.99,
        rating: 4.7,
        emoji: '🥛',
        description: 'Slow-release casein protein perfect for overnight recovery and prolonged protein delivery.',
        benefits: ['Slow release formula', 'Night-time recovery', '24g protein per serving', 'Creamy texture', 'Long-lasting']
    },
    {
        id: 7,
        name: 'BCAA Amino Acids',
        category: 'Pre-Workout',
        price: 32.99,
        rating: 4.6,
        emoji: '🧪',
        description: 'Branched-chain amino acids for muscle preservation and endurance during training.',
        benefits: ['3:1:2 BCAA ratio', 'Muscle preservation', 'Reduces fatigue', 'Improves endurance', 'Multiple flavors']
    },
    {
        id: 8,
        name: 'Foam Roller Pro',
        category: 'Accessories',
        price: 44.99,
        rating: 4.9,
        emoji: '🧘',
        description: 'High-density foam roller for deep muscle recovery and myofascial release.',
        benefits: ['Deep tissue massage', 'Muscle recovery', 'Improved mobility', 'Durable construction', 'Lightweight']
    },
    {
        id: 9,
        name: 'Vitamin D3 Supplement',
        category: 'Vitamins',
        price: 19.99,
        rating: 4.8,
        emoji: '☀️',
        description: 'High-potency Vitamin D3 for bone health, immunity, and mood support.',
        benefits: ['2000 IU per serving', 'Bone health', 'Immune support', 'Mood support', 'Third-party tested']
    },
    {
        id: 10,
        name: 'Creatine Gummies',
        category: 'Creatine',
        price: 34.99,
        rating: 4.5,
        emoji: '🍬',
        description: 'Convenient creatine gummies with great taste and consistent dosing.',
        benefits: ['Easy dosing', 'Great taste', 'Consistent results', 'No mixing needed', 'Travel-friendly']
    },
    {
        id: 11,
        name: 'Weight Lifting Straps',
        category: 'Accessories',
        price: 19.99,
        rating: 4.7,
        emoji: '✊',
        description: 'Premium weight lifting straps for heavy lifting and grip support.',
        benefits: ['Improved grip', 'Heavy lifting support', 'Durable material', 'Padded wrist support', 'Pair included']
    },
    {
        id: 12,
        name: 'Zinc & Magnesium',
        category: 'Vitamins',
        price: 22.99,
        rating: 4.7,
        emoji: '⚒️',
        description: 'Zinc and magnesium complex for testosterone support and recovery.',
        benefits: ['Testosterone support', 'Better sleep', 'Muscle recovery', 'Immune support', 'Highly absorbable']
    }
];

// Helper function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Helper function to get products by category
function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

// Get all categories
function getAllCategories() {
    return [...new Set(products.map(p => p.category))];
}
