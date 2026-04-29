/* ═══════════════════════════════════════════
   data.js — Homepage product data (index.html)
   Mirrors js/data/products.js but in the
   simpler array-image format used by index.html
   ═══════════════════════════════════════════ */

const PRODUCTS = [
  {
    id: 'prod_001',
    slug: 'venetian-maroon-golden-zari-kanjivaram',
    name: 'Venetian Maroon Golden Zari Kanjivaram Silk Saree',
    shortName: 'Venetian Maroon Kanjivaram',
    category: 'Sarees',
    subCategory: 'Kanjivaram',
    mrp: 7198,
    price: 3599,
    discount: 50,
    tagline: 'The Saree That Commands Every Room',
    story: `In the heart of Kanchipuram, master weavers spend days intertwining 24-karat gold-plated zari with the finest Kanjivaram silk. The result is this breathtaking Venetian Maroon saree — a piece that carries centuries of craft in every thread.`,
    images: [
      { type: 'main', url: 'assets/prod_001_main.png', label: 'Full Drape' },
      { type: 'detail', url: 'assets/prod_001_detail.png', gradient: ['#C9A84C','#F0D080','#8B6914'], label: 'Zari Detail' },
      { type: 'pallu', url: 'assets/prod_001_pallu.png', gradient: ['#8B1A2A','#C9A84C','#6B1F2A'], label: 'Pallu Design' },
      { type: 'flatlay', url: 'assets/prod_001_flatlay.png', gradient: ['#6B1F2A','#1a0808','#C9A84C'], label: 'Flat Lay' },
      { type: 'worn', url: 'assets/prod_001_worn.png', gradient: ['#3d0a10','#6B1F2A','#C9A84C'], label: 'Styled Look' },
    ],
    thumbnailGradient: ['#6B1F2A','#C9A84C','#8B1A2A'],
    fabric: 'Kanjivaram Silk',
    weave: 'Golden Zari',
    rating: 4.9,
    reviewCount: 86,
    stockCount: 7,
    isLowStock: true,
    isBestseller: true,
    recentlyViewed: 143,
    recentlyBought: 23,
    wishlistCount: 312,
    tags: ['wedding','kanjivaram','silk','gold-zari','maroon'],
    colorVariants: [
      { id:'cv_001', name:'Venetian Maroon', slug:'venetian-maroon-golden-zari-kanjivaram', gradient:['#6B1F2A','#C9A84C','#8B1A2A'], active:true },
      { id:'cv_002', name:'Persian Red',     slug:'persian-red-golden-zari-kanjivaram',     gradient:['#8B1A2A','#C9A84C','#6B0000'], active:false },
    ]
  },
  {
    id: 'prod_002',
    slug: 'baby-pink-feather-soft-saree',
    name: 'Baby Pink Feather Soft Organza Saree',
    shortName: 'Baby Pink Organza',
    category: 'Sarees',
    subCategory: 'Organza',
    mrp: 4998,
    price: 2499,
    discount: 50,
    tagline: 'Light as Air, Elegant as Ever',
    story: 'Crafted for the modern woman who loves subtlety and softness, this Baby Pink Organza Saree drapes like a gentle breeze.',
    images: [
      { type: 'main', url: 'assets/prod_002_main.png', label: 'Full Drape' },
      { type: 'detail', url: 'assets/prod_002_detail.png', gradient: ['#F8C8DC','#FADADD','#FFFFFF'], label: 'Fabric Detail' },
      { type: 'pallu', url: 'assets/prod_002_pallu.png', gradient: ['#F8C8DC','#FADADD','#FFFFFF'], label: 'Pallu' },
      { type: 'flatlay', url: 'assets/prod_002_flatlay.png', gradient: ['#FADADD','#FFFFFF','#F8C8DC'], label: 'Flat Lay' },
      { type: 'worn', url: 'assets/prod_002_worn.png', gradient: ['#F5D0D4','#FADADD','#FAF0F0'], label: 'Styled Look' },
    ],
    thumbnailGradient: ['#FADADD','#FFFFFF','#F8C8DC'],
    fabric: 'Organza Silk',
    weave: 'Digital Print',
    rating: 4.8,
    reviewCount: 42,
    stockCount: 15,
    isLowStock: false,
    recentlyViewed: 89,
    recentlyBought: 12,
    wishlistCount: 156,
    tags: ['party','organza','pink','lightweight'],
    colorVariants: [
      { id:'cv_005', name:'Baby Pink', slug:'baby-pink-feather-soft-saree', gradient:['#FADADD','#FFFFFF','#F8C8DC'], active:true }
    ]
  },
  {
    id: 'prod_003',
    slug: 'royal-blue-banarasi-silk',
    name: 'Royal Blue Banarasi Silk Saree',
    shortName: 'Royal Blue Banarasi',
    category: 'Sarees',
    subCategory: 'Banarasi',
    mrp: 8999,
    price: 4499,
    discount: 50,
    tagline: 'Timeless Tradition in Every Thread',
    story: 'Handwoven in the ancient city of Varanasi, this Royal Blue Banarasi saree features intricate silver zari work.',
    images: [
      { type: 'main', url: 'assets/prod_003_main.png', label: 'Full Drape' },
    ],
    thumbnailGradient: ['#002366','#C0C0C0','#000080'],
    fabric: 'Banarasi Silk',
    weave: 'Zari Weave',
    rating: 4.7,
    reviewCount: 28,
    stockCount: 5,
    isLowStock: true,
    isBestseller: true,
    recentlyViewed: 210,
    recentlyBought: 15,
    wishlistCount: 420,
    tags: ['wedding','banarasi','blue','traditional','silk'],
    colorVariants: []
  },
  {
    id: 'prod_008',
    slug: 'royal-ivory-zardosi-sherwani',
    name: 'Royal Ivory Hand-Embroidered Zardosi Sherwani',
    shortName: 'Royal Ivory Sherwani',
    category: 'Menswear',
    subCategory: 'Sherwani',
    mrp: 24999,
    price: 12499,
    discount: 50,
    tagline: 'The Ultimate Wedding Ensemble for Grooms',
    story: 'Designed for the modern groom who values heritage, this ivory sherwani features exquisite hand-done Zardosi embroidery across the collar, chest, and cuffs.',
    images: [
      { type: 'main', url: 'assets/prod_007_main.png', gradient: ['#F5EDD6','#C9A84C','#E8DDD0'], label: 'Main View' },
    ],
    thumbnailGradient: ['#F5EDD6','#C9A84C','#E8DDD0'],
    fabric: 'Raw Silk',
    weave: 'Zardosi Handwork',
    rating: 5.0,
    reviewCount: 12,
    stockCount: 3,
    isLowStock: true,
    isBestseller: true,
    recentlyViewed: 320,
    recentlyBought: 4,
    wishlistCount: 180,
    tags: ['menswear','sherwani','ivory','wedding','groom','luxury'],
    colorVariants: [
      { id:'cv_008a', name:'Ivory Gold', slug:'royal-ivory-zardosi-sherwani', gradient:['#F5EDD6','#C9A84C','#E8DDD0'], active:true }
    ]
  }
];

const CATEGORIES = [
  { name: 'Sarees', slug: 'sarees' },
  { name: 'Menswear', slug: 'menswear' },
  { name: 'Couples', slug: 'couples' }
];

// Helper functions
function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

function getProductsByCategory(cat) {
  return PRODUCTS.filter(p => p.category === cat || p.subCategory === cat);
}
