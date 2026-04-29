/* Each product in products.js links to outfit parts via outfitParts array.
   Parts are small product-like objects with their own images, prices, slugs. */

const OUTFIT_PARTS = {

  /* ── WOMEN PARTS for prod_001 (Venetian Maroon Kanjivaram) ── */
  'prod_001': {
    gender: 'women',
    zones: {
      jewellery: {
        label: 'Jewellery',
        icon: '💍',
        tip: 'Click to see matching jewellery',
        parts: [
          {
            id: 'jew_001', name: 'Gold Temple Necklace Set',
            subtitle: 'Choker + Long chain + Earrings',
            price: 4999, mrp: 9999,
            gradient: ['#C9A84C','#F0D080','#B8920A'],
            matchScore: 98,
            matchReason: 'Perfect with maroon — traditional temple design',
            slug: null, inStock: true,
            imageType: 'jewellery',
            image: 'assets/gold_temple_necklace_layer_1777402456532.png',
            imageLayer: 'assets/gold_temple_necklace_layer_1777402456532.png',
            aestheticTags: ['traditional', 'gold', 'temple'],
          },
          {
            id: 'jew_002', name: 'Ruby Pearl Necklace Set',
            subtitle: 'Ruby drops + Pearl chain',
            price: 6499, mrp: 12999,
            gradient: ['#8B0000','#C9A84C','#F0D080'],
            matchScore: 94,
            matchReason: 'Ruby reds complement maroon beautifully',
            slug: null, inStock: true,
            imageType: 'jewellery',
            image: 'assets/ruby_pearl_necklace_set_1777403427124.png',
            imageLayer: 'assets/ruby_pearl_necklace_set_1777403427124.png',
            aestheticTags: ['ruby', 'pearl', 'elegant'],
          },
          {
            id: 'jew_003', name: 'Antique Gold Maang Tikka',
            subtitle: 'Statement tikka with red stones',
            price: 1299, mrp: 2599,
            gradient: ['#C9A84C','#8B6914','#F0D080'],
            matchScore: 90,
            matchReason: 'Completes the bridal look',
            slug: null, inStock: true,
            imageType: 'jewellery',
            image: 'assets/antique_gold_maang_tikka_1777403452202.png',
            imageLayer: 'assets/antique_gold_maang_tikka_1777403452202.png',
            aestheticTags: ['antique', 'gold', 'bridal'],
          },
          {
            id: 'jew_004', name: 'Kundan Bangles Set (12pc)',
            subtitle: 'Maroon + gold enamel bangles',
            price: 899, mrp: 1799,
            gradient: ['#6B1F2A','#C9A84C','#F0D080'],
            matchScore: 96,
            matchReason: 'Maroon bangles echo the saree colour',
            slug: null, inStock: true,
            imageType: 'jewellery',
            image: 'assets/kundan_bangles_set_1777403474395.png',
            imageLayer: 'assets/kundan_bangles_set_1777403474395.png',
          },
        ]
      },
      blouse: {
        label: 'Blouse',
        icon: '👚',
        tip: 'Click to see matching blouses',
        parts: [
          {
            id: 'blouse_001', name: 'Matching Maroon Raw Silk Blouse',
            subtitle: 'Boat neck, elbow sleeve, zari border',
            price: 2499, mrp: 4999,
            gradient: ['#6B1F2A','#8B1A2A','#C9A84C'],
            matchScore: 100,
            matchReason: 'Exact match — comes with saree fabric',
            slug: 'maroon-raw-silk-blouse', inStock: true,
            imageType: 'blouse',
            image: 'assets/maroon_blouse_layer_1777402489425.png',
            imageLayer: 'assets/maroon_blouse_layer_1777402489425.png',
          },
          {
            id: 'blouse_002', name: 'Gold Brocade Blouse',
            subtitle: 'Deep back, 3/4 sleeve, gold weave',
            price: 3299, mrp: 6599,
            gradient: ['#C9A84C','#F0D080','#8B6914'],
            matchScore: 92,
            matchReason: 'Gold mirrors the saree zari work',
            slug: 'gold-brocade-blouse', inStock: true,
            imageType: 'blouse',
            image: 'assets/gold_brocade_blouse_1777403505795.png',
            imageLayer: 'assets/gold_brocade_blouse_1777403505795.png',
          },
          {
            id: 'blouse_003', name: 'Contrast Ivory Silk Blouse',
            subtitle: 'Sweetheart neck, cap sleeve',
            price: 2199, mrp: 4399,
            gradient: ['#F5EDD6','#E8DDD0','#C9A84C'],
            matchScore: 85,
            matchReason: 'Ivory contrast makes maroon pop',
            slug: 'ivory-silk-blouse', inStock: false,
            imageType: 'blouse',
            image: 'assets/mens_ivory_sherwani_main_1777401373003.png',
          },
        ]
      },
      saree: {
        label: 'Saree / Drape',
        icon: '👗',
        tip: 'This is your selected saree',
        isMainProduct: true,
        parts: [] /* Main product — shown as selected by default */
      },
      dupatta: {
        label: 'Dupatta',
        icon: '🧣',
        tip: 'Click to see matching dupattas',
        parts: [
          {
            id: 'dup_001', name: 'Gold Organza Dupatta',
            subtitle: 'Light organza, gold border',
            price: 1299, mrp: 2599,
            gradient: ['#C9A84C','#F0D080','#E8DDD0'],
            matchScore: 95,
            matchReason: 'Lightweight gold pairs with silk perfectly',
            slug: null, inStock: true,
            imageType: 'dupatta',
            image: 'assets/gold_brocade_blouse_1777403505795.png',
          },
          {
            id: 'dup_002', name: 'Maroon Banarasi Dupatta',
            subtitle: 'Heavy Banarasi, zari work',
            price: 2199, mrp: 4399,
            gradient: ['#6B1F2A','#8B1A2A','#C9A84C'],
            matchScore: 97,
            matchReason: 'Same colour family — rich coordinated look',
            slug: null, inStock: true,
            imageType: 'dupatta',
          },
        ]
      },
      footwear: {
        label: 'Footwear',
        icon: '👠',
        tip: 'Click to see matching footwear',
        parts: [
          {
            id: 'heel_001', name: 'Gold Embroidered Block Heels',
            subtitle: '2.5" block heel, embroidered strap',
            price: 2999, mrp: 5999,
            gradient: ['#C9A84C','#8B6914','#F0D080'],
            matchScore: 93,
            matchReason: 'Gold heels complement zari border',
            slug: null, inStock: true,
            imageType: 'footwear',
            image: 'assets/gold_heels_layer_1777402520837.png',
            imageLayer: 'assets/gold_heels_layer_1777402520837.png',
          },
          {
            id: 'heel_002', name: 'Maroon Velvet Jutti',
            subtitle: 'Hand-embroidered, flat, traditional',
            price: 1799, mrp: 3599,
            gradient: ['#6B1F2A','#C9A84C','#8B1A2A'],
            matchScore: 88,
            matchReason: 'Matches the saree colour perfectly',
            slug: null, inStock: true,
            imageType: 'footwear',
            image: 'assets/maroon_blouse_layer_1777402489425.png',
          },
        ]
      },
    }
  },

  /* ── MEN PARTS for prod_007 (Mint Green Jacquard Kurta) ── */
  'prod_007': {
    gender: 'men',
    zones: {
      headwear: {
        label: 'Headwear / Safa',
        icon: '👑',
        tip: 'Click to see matching headwear',
        parts: [
          {
            id: 'safa_001', name: 'Mint Green Safa / Pagdi',
            subtitle: 'Matching fabric, pre-tied',
            price: 899, mrp: 1799,
            gradient: ['#1a5c40','#2d9b6e','#a0d4bc'],
            matchScore: 98,
            matchReason: 'Exact match with kurta fabric',
            slug: null, inStock: true,
            imageType: 'headwear',
            image: 'assets/mens_luxury_detail_gold_embroidery_1777401762368.png',
          },
        ]
      },
      kurta: {
        label: 'Kurta',
        icon: '👔',
        tip: 'This is your selected kurta',
        isMainProduct: true,
        parts: []
      },
      bottom: {
        label: 'Churidar / Pant',
        icon: '👖',
        tip: 'Click to see matching bottoms',
        parts: [
          {
            id: 'pant_001', name: 'Ivory Cotton Churidar',
            subtitle: 'Slim fit, ankle length',
            price: 1499, mrp: 2999,
            gradient: ['#F5EDD6','#E8DDD0','#D4C8B8'],
            matchScore: 97,
            matchReason: 'Classic ivory contrast with mint kurta',
            slug: null, inStock: true,
            imageType: 'bottom',
          },
          {
            id: 'pant_002', name: 'Mint Green Churidar (Matching)',
            subtitle: 'Same fabric as kurta',
            price: 1299, mrp: 2599,
            gradient: ['#1a5c40','#2d9b6e','#a0d4bc'],
            matchScore: 95,
            matchReason: 'Full monochrome look — very elegant',
            slug: null, inStock: true,
            imageType: 'bottom',
          },
          {
            id: 'pant_003', name: 'Dark Green Patiala',
            subtitle: 'Loose fit patiala style',
            price: 1199, mrp: 2399,
            gradient: ['#0d4a2e','#1a7a4e','#2d9b6e'],
            matchScore: 82,
            matchReason: 'Darker shade adds depth to the outfit',
            slug: null, inStock: true,
            imageType: 'bottom',
          },
        ]
      },
      stole: {
        label: 'Stole / Dupatta',
        icon: '🧣',
        tip: 'Click to see matching stoles',
        parts: [
          {
            id: 'stole_001', name: 'Gold Brocade Stole',
            subtitle: 'Narrow brocade, gold thread work',
            price: 999, mrp: 1999,
            gradient: ['#C9A84C','#F0D080','#8B6914'],
            matchScore: 94,
            matchReason: 'Gold stole elevates the mint kurta',
            slug: null, inStock: true,
            imageType: 'stole',
            image: 'assets/mens_luxury_detail_gold_embroidery_1777401762368.png',
          },
        ]
      },
      jacket: {
        label: 'Jacket / Nehru',
        icon: '🥼',
        tip: 'Click to see matching jackets',
        parts: [
          {
            id: 'jacket_001', name: 'Ivory Nehru Jacket',
            subtitle: 'Brocade front, mandarin collar',
            price: 3499, mrp: 6999,
            gradient: ['#F5EDD6','#C9A84C','#E8DDD0'],
            matchScore: 96,
            matchReason: 'Ivory jacket over mint kurta = wedding-perfect',
            slug: null, inStock: true,
            imageType: 'jacket',
          },
          {
            id: 'jacket_002', name: 'Dark Green Velvet Jacket',
            subtitle: 'Velvet, gold buttons, slim fit',
            price: 4299, mrp: 8599,
            gradient: ['#0a3d22','#1D6B4F','#2D9B6E'],
            matchScore: 88,
            matchReason: 'Tone-on-tone green — ultra formal',
            slug: null, inStock: true,
            imageType: 'jacket',
          },
        ]
      },
      footwear: {
        label: 'Footwear',
        icon: '👞',
        tip: 'Click to see matching footwear',
        parts: [
          {
            id: 'shoe_001', name: 'Ivory Kolhapuri Chappal',
            subtitle: 'Handcrafted leather, traditional',
            price: 2499, mrp: 4999,
            gradient: ['#F5EDD6','#D4B896','#C9A84C'],
            matchScore: 92,
            matchReason: 'Classic ivory completes ethnic look',
            slug: null, inStock: true,
            imageType: 'footwear',
          },
          {
            id: 'shoe_002', name: 'Gold Mojari (Jutti)',
            subtitle: 'Embroidered toe, traditional cut',
            price: 1999, mrp: 3999,
            gradient: ['#C9A84C','#8B6914','#F0D080'],
            matchScore: 89,
            matchReason: 'Gold stitching ties the outfit together',
            slug: null, inStock: true,
            imageType: 'footwear',
            image: 'assets/gold_heels_layer_1777402520837.png',
          },
        ]
      },
    }
  },

  /* ── MEN PARTS for prod_008 (Royal Ivory Sherwani) ── */
  'prod_008': {
    gender: 'men',
    zones: {
      headwear: {
        label: 'Safa / Turban',
        icon: '👑',
        tip: 'Click to see matching Safas',
        parts: [
          {
            id: 'safa_002', name: 'Gold Brocade Safa',
            subtitle: 'Ivory & Gold Zari',
            price: 2499, mrp: 4999,
            gradient: ['#C9A84C','#F0D080','#E8DDD0'],
            matchScore: 99,
            matchReason: 'Perfect tonal match with ivory sherwani',
            slug: null, inStock: true,
            imageType: 'headwear',
            image: 'assets/mens_luxury_detail_gold_embroidery_1777401762368.png',
          },
          {
            id: 'safa_003', name: 'Maroon Velvet Safa',
            subtitle: 'Rich Maroon with Kalgi',
            price: 3499, mrp: 6999,
            gradient: ['#6B1F2A','#8B1A2A','#C9A84C'],
            matchScore: 92,
            matchReason: 'Royal contrast look',
            slug: null, inStock: true,
            imageType: 'headwear',
          },
        ]
      },
      kurta: {
        label: 'Sherwani',
        icon: '🥋',
        tip: 'This is your selected sherwani',
        isMainProduct: true,
        parts: []
      },
      bottom: {
        label: 'Churidar / Dhoti',
        icon: '👖',
        tip: 'Click to see matching bottoms',
        parts: [
          {
            id: 'pant_004', name: 'Premium Ivory Churidar',
            subtitle: 'Raw silk finish',
            price: 1999, mrp: 3999,
            gradient: ['#F5EDD6','#E8DDD0','#D4C8B8'],
            matchScore: 100,
            matchReason: 'Same fabric as sherwani',
            slug: null, inStock: true,
            imageType: 'bottom',
          },
        ]
      },
      stole: {
        label: 'Stole / Dupatta',
        icon: '🧣',
        tip: 'Click to see matching stoles',
        parts: [
          {
            id: 'stole_002', name: 'Heavy Zardosi Stole',
            subtitle: 'Matching ivory with gold border',
            price: 4999, mrp: 9999,
            gradient: ['#F5EDD6','#C9A84C','#E8DDD0'],
            matchScore: 98,
            matchReason: 'Part of the signature set',
            slug: null, inStock: true,
            imageType: 'stole',
            image: 'assets/mens_luxury_detail_gold_embroidery_1777401762368.png',
            imageLayer: 'assets/mens_luxury_detail_gold_embroidery_1777401762368.png',
          },
        ]
      },
      jewellery: {
        label: 'Mala / Necklace',
        icon: '💍',
        tip: 'Click to see groom necklaces',
        parts: [
          {
            id: 'mala_001', name: 'Multi-layer Pearl Mala',
            subtitle: 'Real pearls with emerald drops',
            price: 8999, mrp: 17999,
            gradient: ['#F5EDD6','#1D6B4F','#C9A84C'],
            matchScore: 96,
            matchReason: 'Essential royal groom accessory',
            slug: null, inStock: true,
            imageType: 'jewellery',
            image: 'assets/ruby_pearl_necklace_set_1777403427124.png',
            imageLayer: 'assets/ruby_pearl_necklace_set_1777403427124.png',
          },
        ]
      },
      footwear: {
        label: 'Mojaris / Juttis',
        icon: '👞',
        tip: 'Click to see matching footwear',
        parts: [
          {
            id: 'shoe_003', name: 'Embroidered Ivory Mojari',
            subtitle: 'Hand-done zardosi work',
            price: 3999, mrp: 7999,
            gradient: ['#F5EDD6','#C9A84C','#D4B896'],
            matchScore: 97,
            matchReason: 'Coordinates with sherwani embroidery',
            slug: null, inStock: true,
            imageType: 'footwear',
          },
        ]
      },
    }
  },
};

/* Helper: get outfit parts for a product */
function getOutfitParts(productId) {
  return OUTFIT_PARTS[productId] || null;
}
