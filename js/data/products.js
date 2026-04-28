const PRODUCTS = [
  {
    id: 'prod_001',
    slug: 'venetian-maroon-golden-zari-kanjivaram',
    name: 'Venetian Maroon Golden Zari Kanjivaram Silk Saree',
    shortName: 'Venetian Maroon Kanjivaram',
    category: 'Sarees', subCategory: 'Kanjivaram',
    fabric: 'Kanjivaram Silk', weave: 'Golden Zari',
    origin: 'Kanchipuram, Tamil Nadu',
    mrp: 7198, price: 3599, discount: 50,
    emiFrom: 299, codAvailable: true,
    tagline: 'The Saree That Commands Every Room',
    headline: 'Where Royal Maroon Meets 24-Karat Golden Threads',
    story: `In the heart of Kanchipuram, master weavers spend days intertwining 24-karat gold-plated zari with the finest Kanjivaram silk. The result is this breathtaking Venetian Maroon saree — a piece that carries centuries of craft in every thread.\n\nThe deep maroon, inspired by the richness of a Venetian sunset, is complemented by intricate golden temple borders and a pallu that tells stories of ancient royalty. This isn't just a saree — it's an heirloom passed down through generations.`,
    bulletPoints: [
      'Authentic Kanchipuram Kanjivaram silk — Grade A quality',
      '24-karat gold-plated genuine zari work throughout',
      'Temple border with traditional peacock motif design',
      'Rich pallu with geometric temple pattern',
      'Comes with matching maroon blouse piece (0.8m)',
      'Certified by Silk Mark India — 100% authentic',
    ],
    fabricDetails: {
      'Fabric Type':   'Pure Kanjivaram Silk',
      'Zari Quality':  '24-Karat Gold Plated',
      'Saree Length':  '5.5 Meters',
      'Blouse Piece':  '0.8 Meters (Included)',
      'Weight':        '850 Grams Approx.',
      'Transparency':  'Opaque',
      'Wash Care':     'Dry Clean Only',
      'Origin':        'Kanchipuram, Tamil Nadu',
      'Certification': 'Silk Mark India Certified',
      'Weave Type':    'Traditional Korvai Technique',
    },
    occasions: ['Wedding', 'Reception', 'Festive'],
    gradientColors: ['#6B1F2A', '#C9A84C', '#8B1A2A'],
    rating: 4.9, reviewCount: 86,
    ratingBreakdown: { 5: 80, 4: 5, 3: 1, 2: 0, 1: 0 },
    stockCount: 7, isLowStock: true, isBestseller: true,
    recentViews: 143, recentSold: 23, wishlistCount: 312,
    images: {
      main:    { url: 'assets/prod_001_main.png',    type: 'main',    alt: 'Venetian Maroon Kanjivaram full drape',  gradient: ['#6B1F2A','#C9A84C','#8B1A2A'] },
      detail:  { url: 'assets/prod_001_detail.png',  type: 'detail',  alt: 'Golden zari border close-up',            gradient: ['#C9A84C','#F0D080','#8B6914'] },
      worn:    { url: 'assets/prod_001_worn.png',    type: 'worn',    alt: 'Worn at wedding ceremony',               gradient: ['#3d0a10','#6B1F2A','#C9A84C'] },
      flatlay: { url: 'assets/prod_001_flatlay.png', type: 'flatlay', alt: 'Flat lay with blouse piece',             gradient: ['#6B1F2A','#1a0808','#C9A84C'] },
      pallu:   { url: 'assets/prod_001_pallu.png',   type: 'pallu',   alt: 'Pallu temple design detail',             gradient: ['#8B1A2A','#C9A84C','#6B1F2A'] },
    },
    colorVariants: [
      { id: 'cv_001', name: 'Venetian Maroon', slug: 'venetian-maroon-golden-zari-kanjivaram', gradient: ['#6B1F2A','#C9A84C','#8B1A2A'], active: true },
      { id: 'cv_002', name: 'Persian Red',     slug: 'persian-red-golden-zari-kanjivaram',     gradient: ['#8B1A2A','#C9A84C','#6B0000'], active: false },
    ],
    video: { youtubeId: null, localSrc: null, label: 'Watch Draping Process', duration: '0:28' },
    tags: ['wedding','kanjivaram','silk','gold-zari','maroon','traditional'],
    metaTitle: 'Venetian Maroon Kanjivaram Silk Saree | House of Urvaah',
    metaDesc: 'Buy Venetian Maroon Kanjivaram silk saree with 24K golden zari. Wedding saree. Free shipping. COD available.',
  },
  {
    id: 'prod_002',
    slug: 'baby-pink-feather-soft-saree',
    name: 'Baby Pink Feather Soft Organza Saree',
    shortName: 'Baby Pink Organza',
    category: 'Sarees', subCategory: 'Organza',
    fabric: 'Organza Silk', weave: 'Digital Print',
    origin: 'Surat, Gujarat',
    mrp: 4998, price: 2499, discount: 50,
    emiFrom: 199, codAvailable: true,
    tagline: 'Light as Air, Elegant as Ever',
    headline: 'Featherlight Organza for the Modern Indian Woman',
    story: `Crafted for the modern woman who loves subtlety and softness, this Baby Pink Organza Saree drapes like a gentle breeze. Perfect for engagement ceremonies, cocktail parties and summer weddings.\n\nThe delicate floral digital print adds a contemporary touch to a timeless silhouette, making you effortlessly the most elegant woman in the room.`,
    bulletPoints: [
      'Premium Japanese Organza fabric — ultra lightweight',
      'Full digital print with anti-fade technology',
      'Elegant scalloped border design',
      'Comes with matching pink blouse piece (0.8m)',
      'Perfect for summer weddings and cocktail parties',
    ],
    fabricDetails: {
      'Fabric Type':   'Japanese Organza',
      'Print Type':    'Digital Print',
      'Saree Length':  '5.5 Meters',
      'Blouse Piece':  '0.8 Meters (Included)',
      'Weight':        '280 Grams Approx.',
      'Transparency':  'Semi-transparent',
      'Wash Care':     'Gentle Machine Wash / Hand Wash',
      'Origin':        'Surat, Gujarat',
    },
    occasions: ['Engagement', 'Cocktail', 'Summer Wedding'],
    gradientColors: ['#FADADD', '#FFFFFF', '#F8C8DC'],
    rating: 4.8, reviewCount: 42,
    ratingBreakdown: { 5: 36, 4: 5, 3: 1, 2: 0, 1: 0 },
    stockCount: 15, isLowStock: false, isBestseller: false,
    recentViews: 89, recentSold: 12, wishlistCount: 156,
    images: {
      main:    { url: 'assets/prod_002_main.png',    type: 'main',    alt: 'Baby Pink Organza Saree full drape',    gradient: ['#FADADD','#FFFFFF','#F8C8DC'] },
      detail:  { url: 'assets/prod_002_detail.png',  type: 'detail',  alt: 'Organza fabric and scalloped border',   gradient: ['#F8C8DC','#FADADD','#FFFFFF'] },
      worn:    { url: 'assets/prod_002_worn.png',    type: 'worn',    alt: 'Worn in garden engagement setting',     gradient: ['#F5D0D4','#FADADD','#FAF0F0'] },
      flatlay: { url: 'assets/prod_002_flatlay.png', type: 'flatlay', alt: 'Flat lay with pink roses',             gradient: ['#FADADD','#FFFFFF','#F8C8DC'] },
      pallu:   { url: 'assets/prod_002_pallu.png',   type: 'pallu',   alt: 'Floral pallu close-up',                gradient: ['#F8C8DC','#FADADD','#FFFFFF'] },
    },
    colorVariants: [
      { id: 'cv_005', name: 'Baby Pink', slug: 'baby-pink-feather-soft-saree', gradient: ['#FADADD','#FFFFFF','#F8C8DC'], active: true },
    ],
    video: { youtubeId: null, localSrc: null, label: 'See How It Drapes', duration: '0:20' },
    tags: ['party','organza','pink','lightweight','modern','summer'],
    metaTitle: 'Baby Pink Organza Saree | House of Urvaah',
    metaDesc: 'Shop Baby Pink Feather Soft Organza Saree. Perfect for parties and summer weddings. Free shipping. COD.',
  },
];

function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug) || null;
}
function getProductsByCategory(cat) {
  return PRODUCTS.filter(p => p.category === cat || p.subCategory === cat);
}
function getRecommendations(currentProduct, limit = 6) {
  return PRODUCTS
    .filter(p => p.slug !== currentProduct.slug)
    .map(p => ({
      product: p,
      score: (currentProduct.tags || []).filter(t => (p.tags || []).includes(t)).length
           + (p.subCategory === currentProduct.subCategory ? 4 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.product);
}
