/* ══════════════════════════════════════════
   SMART RECOMMENDATION ENGINE + SECTIONS
   ══════════════════════════════════════════ */

function initRecommendations(product) {
  renderSimilarReco(product);
  renderOccasionReco(product);
  renderRecentlyViewed(product);
  renderCrossSell(product);
  initScrollArrows();
}

/* ── Scoring engine ── */
function scoreProduct(target, reference) {
  let score = 0;
  if (target.subCategory === reference.subCategory)   score += 5;
  if (target.category    === reference.category)      score += 2;
  const sharedOcc = (target.occasions||[]).filter(o=>(reference.occasions||[]).includes(o)).length;
  score += sharedOcc * 4;
  const sharedTags = (target.tags||[]).filter(t=>(reference.tags||[]).includes(t)).length;
  score += sharedTags * 2;
  const priceDiff = Math.abs(target.price - reference.price) / reference.price;
  if (priceDiff <= 0.3) score += 3;
  if (target.isBestseller) score += 2;
  return score;
}

/* ── You May Also Love ── */
function renderSimilarReco(product) {
  const container = document.getElementById('reco-similar');
  if (!container) return;
  const recs = PRODUCTS
    .filter(p => p.slug !== product.slug)
    .map(p => ({ product:p, score:scoreProduct(p,product) }))
    .filter(x => x.score > 0)
    .sort((a,b) => b.score - a.score)
    .slice(0,8)
    .map(x => x.product);
  recs.forEach((p,i) => container.appendChild(createRecoCard(p, i)));
}

/* ── Occasion-based ── */
function renderOccasionReco(product) {
  const container = document.getElementById('reco-occasion');
  const titleEl   = document.getElementById('occasion-reco-title');
  if (!container) return;
  const primaryOcc = product.occasions?.[0] || 'Wedding';
  if (titleEl) titleEl.textContent = `More for Your ${primaryOcc}`;
  const recs = PRODUCTS
    .filter(p => p.slug !== product.slug && (p.occasions||[]).includes(primaryOcc))
    .slice(0,8);
  if (recs.length === 0) {
    document.getElementById('occasion-reco')?.remove();
    return;
  }
  recs.forEach((p,i) => container.appendChild(createRecoCard(p, i)));
}

/* ── Recently Viewed ── */
function renderRecentlyViewed(currentProduct) {
  const container = document.getElementById('reco-recent');
  if (!container) return;
  let viewed = [];
  try { viewed = JSON.parse(localStorage.getItem('urvaah-recently-viewed')||'[]'); } catch(e){}
  const filtered = viewed.filter(v => v.slug !== currentProduct.slug).slice(0,6);
  if (filtered.length === 0) {
    document.getElementById('recently-viewed')?.remove();
    return;
  }
  filtered.forEach((item, i) => {
    const product = PRODUCTS.find(p => p.slug === item.slug);
    if (product) container.appendChild(createRecoCard(product, i));
  });
}

/* ── Frequently Bought Together ── */
function renderCrossSell(product) {
  const container = document.getElementById('crosssell-layout');
  if (!container) return;
  const outfitParts = getOutfitParts(product.id);
  if (!outfitParts) { document.getElementById('frequently-bought')?.remove(); return; }
  /* Pick first part from first zone */
  const firstZone = Object.values(outfitParts.zones).find(z=>!z.isMainProduct&&z.parts?.length);
  const secondZone = Object.values(outfitParts.zones).filter(z=>!z.isMainProduct&&z.parts?.length)[1];
  if (!firstZone) { document.getElementById('frequently-bought')?.remove(); return; }

  const part1 = firstZone.parts[0];
  const part2 = secondZone?.parts[0];
  const totalPrice = product.price + part1.price + (part2?.price||0);
  const totalMRP   = product.mrp   + part1.mrp   + (part2?.mrp  ||0);
  const saving     = totalMRP - totalPrice;

  const mainImgUrl = product.images?.main?.url || '';
  container.innerHTML = `
    <div class="crosssell-product">
      <div class="crosssell-img silk-swatch" id="csimg-main"
           style="background:linear-gradient(145deg,${product.gradientColors.join(',')});position:relative;overflow:hidden;border-radius:14px;">
        ${mainImgUrl ? `<img src="${mainImgUrl}" alt="${product.shortName}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;border-radius:14px;" onerror="this.remove()">` : ''}
      </div>
      <div style="font-size:13px;color:var(--text-secondary);margin-top:8px;">${product.shortName}</div>
      <div style="font-size:15px;font-weight:700;color:var(--gold);">Rs. ${product.price.toLocaleString('en-IN')}</div>
    </div>
    <div class="crosssell-plus">+</div>
    <div class="crosssell-product">
      <div class="crosssell-img" id="csimg-part1"
           style="background:linear-gradient(145deg,${part1.gradient.join(',')});background-size:400% 400%;animation:silkShimmer 5s ease infinite;overflow:hidden;border-radius:14px;"></div>
      <div style="font-size:13px;color:var(--text-secondary);margin-top:8px;">${part1.name}</div>
      <div style="font-size:15px;font-weight:700;color:var(--gold);">Rs. ${part1.price.toLocaleString('en-IN')}</div>
    </div>
    ${part2 ? `
    <div class="crosssell-plus">+</div>
    <div class="crosssell-product">
      <div class="crosssell-img" id="csimg-part2"
           style="background:linear-gradient(145deg,${part2.gradient.join(',')});background-size:400% 400%;animation:silkShimmer 5s ease infinite;overflow:hidden;border-radius:14px;"></div>
      <div style="font-size:13px;color:var(--text-secondary);margin-top:8px;">${part2.name}</div>
      <div style="font-size:15px;font-weight:700;color:var(--gold);">Rs. ${part2.price.toLocaleString('en-IN')}</div>
    </div>` : ''}
    <div class="crosssell-total">
      <div class="total-label">Bundle Price</div>
      <div class="total-price">Rs. ${totalPrice.toLocaleString('en-IN')}</div>
      ${saving > 0 ? `<div class="total-saving">Save Rs. ${saving.toLocaleString('en-IN')}</div>` : ''}
      <button class="btn-bundle" onclick="addBundleToCart()">
        🛒 Add Bundle to Cart
      </button>
    </div>`;
}

window.addBundleToCart = function() {
  const btn = document.querySelector('.btn-bundle');
  btn.textContent = '✓ Bundle Added!';
  btn.style.background = 'var(--green-success)';
  setTimeout(() => { btn.textContent='🛒 Add Bundle to Cart'; btn.style.background=''; }, 2000);
};

/* ── Create recommendation card ── */
function createRecoCard(product, index) {
  const discount = product.discount || Math.round((1-product.price/product.mrp)*100);
  const mainImgUrl = product.images?.main?.url || '';
  const gradientBg = `linear-gradient(145deg,${product.gradientColors.join(',')})`;
  const div = document.createElement('div');
  div.className = 'reco-card';
  div.style.animationDelay = `${index * 0.06}s`;
  div.innerHTML = `
    <div class="reco-card-img" id="rcimg-${product.id}-${index}"
         style="background:${gradientBg};background-size:400% 400%;animation:silkShimmer 5s ease infinite">
      ${mainImgUrl ? `<img src="${mainImgUrl}" alt="${product.shortName}" style="width:100%;height:100%;object-fit:cover;display:block;position:absolute;inset:0;" onerror="this.remove()">` : ''}
      ${product.isBestseller ? '<div class="reco-card-badge">BESTSELLER</div>' :
        product.isNewArrival ? '<div class="reco-card-badge">NEW</div>' : ''}
      <button class="reco-card-wishlist" aria-label="Add to wishlist">♡</button>
    </div>
    <div class="reco-card-info">
      <div class="reco-card-fabric">${product.subCategory || product.fabric}</div>
      <div class="reco-card-name">${product.name}</div>
      <div class="reco-card-price-row">
        <span class="reco-card-price">Rs. ${product.price.toLocaleString('en-IN')}</span>
        <span class="reco-card-mrp">Rs. ${product.mrp.toLocaleString('en-IN')}</span>
        <span class="reco-card-discount">-${discount}%</span>
      </div>
      <button class="reco-card-cta">View Product</button>
    </div>`;

  /* Navigate to product page */
  div.addEventListener('click', (e) => {
    if (e.target.classList.contains('reco-card-wishlist')) return;
    window.location.href = `product-detail.html?slug=${product.slug}`;
  });

  /* View Product button */
  div.querySelector('.reco-card-cta').addEventListener('click', (e) => {
    e.stopPropagation();
    window.location.href = `product-detail.html?slug=${product.slug}`;
  });

  /* Wishlist toggle */
  const wBtn = div.querySelector('.reco-card-wishlist');
  const wKey = `urvaah-wishlist`;
  let wishlist = [];
  try { wishlist = JSON.parse(localStorage.getItem(wKey)||'[]'); } catch(e){}
  
  // Check if current ID is in wishlist (assuming wishlist store IDs)
  const isWishlisted = wishlist.some(id => id === product.id || (id && id.id === product.id));

  if (isWishlisted) { wBtn.textContent='♥'; wBtn.classList.add('wishlisted'); }
  wBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    try { wishlist = JSON.parse(localStorage.getItem(wKey)||'[]'); } catch(e){}
    const idx = wishlist.findIndex(id => id === product.id || (id && id.id === product.id));
    if (idx > -1) {
      wishlist.splice(idx, 1);
      wBtn.textContent='♡'; wBtn.classList.remove('wishlisted');
    } else {
      wishlist.push(product.id);
      wBtn.textContent='♥'; wBtn.classList.add('wishlisted');
    }
    localStorage.setItem(wKey, JSON.stringify(wishlist));
    if (window.updateAllBadges) updateAllBadges();
  });

  return div;
}

/* ── Scroll arrows ── */
function initScrollArrows() {
  document.querySelectorAll('.scroll-arrow').forEach(btn => {
    btn.addEventListener('click', () => {
      const track = document.getElementById(btn.dataset.target);
      if (!track) return;
      const dir = parseInt(btn.dataset.dir);
      track.scrollBy({ left: dir * 280, behavior:'smooth' });
    });
  });
}

/* ── Helper: apply product image with gradient fallback ── */
function applyProductImage(el, product, imageType = 'main') {
  if (!el || !product) return;
  const imgData = product.images?.[imageType];
  const grad    = imgData?.gradient || product.gradientColors || ['#B8922A','#6B1F2A'];
  
  el.classList.add('silk-swatch');
  el.style.background = `linear-gradient(145deg, ${grad.join(',')})`;
  el.style.backgroundSize = '400% 400%';
  el.style.animation = 'silkShimmer 6s ease infinite';

  if (imgData && imgData.url) {
    const img = new Image();
    img.onload = () => {
      el.style.backgroundImage = `url('${imgData.url}')`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
    };
    img.src = imgData.url;
  }
}

window.applyProductImage = applyProductImage;

/* ── Initialization ── */
document.addEventListener('DOMContentLoaded', () => {
  const params  = new URLSearchParams(window.location.search);
  const slug    = params.get('slug');
  const product = getProductBySlug(slug);
  if (product) {
    initRecommendations(product);
  }
});
