/* ══════════════════════════════════════════
   recommendations-data.js — Advanced Bundles
   ══════════════════════════════════════════ */

const BUNDLE_DATA = {
  'wedding-set-01': {
    id: 'bundle_001',
    name: 'Complete Bridal Heritage Set',
    description: 'The Venetian Maroon Saree paired with Temple Jewellery and Maroon Velvet Juttis.',
    products: ['prod_001', 'jew_001', 'heel_002'],
    discountPct: 15, // Extra discount for buying bundle
  },
  'groom-set-01': {
    id: 'bundle_002',
    name: 'The Royal Mint Groom Look',
    description: 'Mint Green Jacquard Kurta with Ivory Nehru Jacket and Gold Mojaris.',
    products: ['prod_007', 'jacket_001', 'shoe_002'],
    discountPct: 10,
  }
};

function getBundleByProduct(productId) {
  return Object.values(BUNDLE_DATA).find(b => b.products.includes(productId)) || null;
}
