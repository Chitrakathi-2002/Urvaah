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
      { type: 'detail', url: null, gradient: ['#C9A84C','#F0D080','#8B6914'], label: 'Zari Detail' }
    ],
    thumbnailGradient: ['#6B1F2A','#C9A84C','#8B1A2A'],
    fabric: 'Kanjivaram Silk',
    weave: 'Golden Zari',
    rating: 4.9,
    reviewCount: 86,
    stockCount: 7,
    isLowStock: true,
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
    story: 'Crafted for the modern woman who loves subtlety...',
    images: [{ type: 'main', url: 'assets/prod_002_main.png', label: 'Full Drape' }],
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
