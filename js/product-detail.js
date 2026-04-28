/* ═══════════════════════════════════════════
   product-detail.js — Main P3 Controller
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const params  = new URLSearchParams(window.location.search);
  const slug    = params.get('slug');
  const product = getProductBySlug(slug);

  if (!product) { window.location.href = 'index.html'; return; }

  // Meta
  document.title = product.metaTitle || product.name + ' | House of Urvaah';

  // Init all sections
  initBrandStory(product);
  initVideoSection(product);
  initFabricAccordion(product);
  initReviews(product);
  initInfluencerGrid(product);
  initSizeGuideModal(product);
  initCountdown();
  initLiveViewerCount(product);
  initLightbox(product);
  initScrollReveal();
  trackRecentlyViewed(product);

  // Wire Add-to-Cart
  document.getElementById('add-to-cart-btn')?.addEventListener('click', () => {
    cartAdd(product);
    const btn = document.getElementById('add-to-cart-btn');
    const orig = btn.textContent;
    btn.textContent = '✓ Added to Cart!';
    btn.style.background = 'var(--green-success)';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 2000);
  });
});

/* ══ BRAND STORY ══ */
function initBrandStory(p) {
  const el = id => document.getElementById(id);
  if (el('story-headline')) el('story-headline').textContent = p.headline;
  if (el('story-text'))     el('story-text').textContent     = p.story;
  if (el('story-bullets')) {
    p.bulletPoints.forEach(b => {
      const li = document.createElement('li');
      li.textContent = b;
      el('story-bullets').appendChild(li);
    });
  }
  // Use real artisan image for main story visual
  const mainImg = el('story-main-img');
  const detImg  = el('story-detail-img');
  if (mainImg) {
    mainImg.style.backgroundImage    = `url('assets/brand_story_artisan.png')`;
    mainImg.style.backgroundSize     = 'cover';
    mainImg.style.backgroundPosition = 'center';
    // Fallback
    const testImg = new Image();
    testImg.onerror = () => applyGradient(mainImg, p.images.worn?.gradient || p.gradientColors);
    testImg.src = 'assets/brand_story_artisan.png';
  }
  if (detImg) {
    detImg.style.backgroundImage    = `url('${p.images.worn?.url || ''}')`;
    detImg.style.backgroundSize     = 'cover';
    detImg.style.backgroundPosition = 'center';
    const testImg2 = new Image();
    testImg2.onerror = () => applyGradient(detImg, p.images.detail?.gradient || p.gradientColors);
    testImg2.src = p.images.worn?.url || '';
    if (!p.images.worn?.url) applyGradient(detImg, p.images.detail?.gradient || p.gradientColors);
  }
}

function applyGradient(el, colors) {
  el.style.background     = `linear-gradient(145deg, ${colors.join(', ')})`;
  el.style.backgroundSize = '400% 400%';
  el.style.animation      = 'silkShimmer 6s ease infinite';
}

/* ══ VIDEO ══ */
function initVideoSection(p) {
  const w = document.getElementById('video-wrapper');
  if (!w) return;
  if (p.video?.youtubeId) {
    w.innerHTML = `<iframe src="https://www.youtube.com/embed/${p.video.youtubeId}?rel=0&modestbranding=1"
      title="${p.name}" allow="autoplay; encrypted-media" allowfullscreen loading="lazy"></iframe>`;
  } else if (p.video?.localSrc) {
    w.innerHTML = `<video src="${p.video.localSrc}" controls playsinline muted loop
      controlslist="nodownload" style="position:absolute;inset:0;width:100%;height:100%;"></video>`;
  } else {
    // Try using worn image as video cover
    const coverImg = p.images.worn?.url || p.images.main?.url || null;
    const g = p.gradientColors;
    w.style.background = `linear-gradient(145deg, ${g.join(',')})`;
    w.style.backgroundSize = '400% 400%';
    if (coverImg) {
      w.style.backgroundImage = `url('${coverImg}')`;
      w.style.backgroundSize = 'cover';
      w.style.backgroundPosition = 'center';
    }
    w.innerHTML = `
      <div class="video-placeholder">
        <div style="
          position:absolute;inset:0;
          background:linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);
        "></div>
        <div style="position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:16px">
          <button class="video-play-btn" style="animation:goldPulse 2s ease-in-out infinite" aria-label="Play video">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <div style="text-align:center">
            <p style="font-family:'Playfair Display',serif;font-size:20px;color:#fff;font-weight:700;margin-bottom:6px">${p.video?.label || 'Watch the Making'}</p>
            <p style="font-size:13px;color:rgba(255,255,255,0.75);letter-spacing:1px">DRAPING TUTORIAL · COMING SOON</p>
          </div>
          <div style="display:flex;gap:24px;margin-top:8px">
            <div style="text-align:center;color:rgba(255,255,255,0.8)">
              <p style="font-size:22px;font-weight:700;font-family:'Playfair Display',serif;color:#F0D080">${p.reviewCount}+</p>
              <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase">Happy Customers</p>
            </div>
            <div style="width:1px;background:rgba(255,255,255,0.2)"></div>
            <div style="text-align:center;color:rgba(255,255,255,0.8)">
              <p style="font-size:22px;font-weight:700;font-family:'Playfair Display',serif;color:#F0D080">${p.rating}</p>
              <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase">★ Rating</p>
            </div>
            <div style="width:1px;background:rgba(255,255,255,0.2)"></div>
            <div style="text-align:center;color:rgba(255,255,255,0.8)">
              <p style="font-size:22px;font-weight:700;font-family:'Playfair Display',serif;color:#F0D080">${p.wishlistCount}</p>
              <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase">Wishlisted</p>
            </div>
          </div>
        </div>
      </div>`;
  }
}

/* ══ ACCORDION ══ */
function initFabricAccordion(p) {
  const accordionContent = [
    (() => {
      const rows = Object.entries(p.fabricDetails).map(([k, v]) =>
        `<tr><td>${k}</td><td>${v}</td></tr>`).join('');
      return `<table class="fabric-spec-table"><tbody>${rows}</tbody></table>`;
    })(),
    `<table class="fabric-spec-table"><tbody>
      <tr><td>Saree Length</td><td>${p.fabricDetails['Saree Length'] || '5.5 Meters'}</td></tr>
      <tr><td>Blouse Piece</td><td>${p.fabricDetails['Blouse Piece'] || '0.8 Meters'}</td></tr>
      <tr><td>Weight</td><td>${p.fabricDetails['Weight'] || 'N/A'}</td></tr>
     </tbody></table>
     <p style="margin-top:12px;font-size:13px;color:var(--text-muted)">
       Need help? <button onclick="openSizeGuide()" style="background:none;border:none;
       color:var(--gold);cursor:pointer;font-weight:600;font-size:13px;">Open Size Guide →</button></p>`,
    `<ul class="care-list">
       <li>🎁 Premium gift box packaging — complimentary</li>
       <li>🌸 Fresh rose petal layer inside box</li>
       <li>📜 Handwritten certificate of authenticity</li>
       <li>🚚 Ships in 1-2 business days after confirmation</li>
       <li>📦 Delivered in 3-5 days standard / 1-2 days express</li>
     </ul>`,
    `<ul class="care-list">
       <li>🧴 Dry clean only — strongly recommended</li>
       <li>💧 If hand wash: use cold water & mild detergent only</li>
       <li>🚫 Do not wring or twist — damages zari threads</li>
       <li>☀️ Dry in shade — direct sun fades zari gold</li>
       <li>📦 Store folded in muslin cloth to preserve silk lustre</li>
       <li>✨ Iron on reverse side, medium heat, with cloth cover</li>
     </ul>`,
    `<ul class="care-list">
       <li>✅ 7-day easy return from delivery date</li>
       <li>📦 Must be unused, unwashed, with original tags attached</li>
       <li>📸 Share unboxing video for faster processing</li>
       <li>💰 Refund processed in 5-7 business days to source</li>
       <li>📞 WhatsApp us for exchanges — we are happy to help</li>
     </ul>`,
  ];

  document.querySelectorAll('.accordion-panel').forEach((panel, i) => {
    const body    = panel.querySelector('.accordion-body');
    const trigger = panel.querySelector('.accordion-trigger');
    if (body && accordionContent[i]) body.innerHTML = accordionContent[i];

    // First panel open by default
    if (i === 0 && body) { body.classList.add('open'); trigger?.setAttribute('aria-expanded', 'true'); }

    trigger?.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.accordion-panel').forEach(p2 => {
        const t = p2.querySelector('.accordion-trigger');
        const b = p2.querySelector('.accordion-body');
        t?.setAttribute('aria-expanded', 'false');
        b?.classList.remove('open');
      });
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        body?.classList.add('open');
      }
    });
  });
}

/* ══ REVIEWS ══ */
function renderStars(rating, size = 15) {
  return Array.from({ length: 5 }, (_, i) => {
    const color = i < rating ? 'var(--gold)' : 'var(--border-default)';
    return `<span style="color:${color};font-size:${size}px">★</span>`;
  }).join('');
}

function initReviews(p) {
  // Avg rating
  const avgEl    = document.getElementById('avg-rating');
  const starsEl  = document.getElementById('avg-stars');
  const totalEl  = document.getElementById('rating-total');
  const barsEl   = document.getElementById('rating-bars');
  if (avgEl)   avgEl.textContent   = p.rating.toFixed(1);
  if (starsEl) starsEl.innerHTML   = renderStars(p.rating, 22);
  if (totalEl) totalEl.textContent = `${p.reviewCount} reviews`;

  // Rating bars
  if (barsEl) {
    const total = Object.values(p.ratingBreakdown).reduce((a, b) => a + b, 0);
    [5, 4, 3, 2, 1].forEach(star => {
      const count = p.ratingBreakdown[star] || 0;
      const pct   = total > 0 ? Math.round((count / total) * 100) : 0;
      barsEl.innerHTML += `
        <div class="rating-bar-row">
          <span class="bar-label">${star}★</span>
          <div class="bar-track"><div class="bar-fill" data-pct="${pct}"></div></div>
          <span class="bar-pct">${pct}%</span>
        </div>`;
    });
    // Animate on scroll
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.bar-fill').forEach(b => { b.style.width = b.dataset.pct + '%'; });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(barsEl);
  }

  // UGC grid — mix real photos and gradient tiles
  const ugcGrid = document.getElementById('ugc-grid');
  if (ugcGrid) {
    const ugcItems = [
      { img: 'assets/ugc_1.png',         gradient: ['#6B1F2A','#C9A84C'] },
      { img: 'assets/ugc_2.png',         gradient: ['#FADADD','#F5D0D4'] },
      { img: 'assets/influencer_1.png',  gradient: ['#3d0a10','#6B1F2A'] },
      { img: 'assets/influencer_2.png',  gradient: ['#E8B4B8','#F5D0D4'] },
      { img: 'assets/influencer_5.png',  gradient: ['#1D6B4F','#2D9B6E'] },
      { img: 'assets/prod_001_worn.png', gradient: ['#C9A84C','#F0D080'] },
      { img: 'assets/influencer_4.png',  gradient: ['#F5C518','#FDE68A'] },
      { img: 'assets/prod_001_flatlay.png', gradient: ['#6B1F2A','#1a0808'] },
    ];
    ugcItems.forEach((item, i) => {
      const tile = document.createElement('div');
      tile.className = 'ugc-photo-tile';
      tile.style.backgroundImage    = `url('${item.img}')`;
      tile.style.backgroundSize     = 'cover';
      tile.style.backgroundPosition = 'center';
      tile.style.backgroundColor    = item.gradient[0];
      tile.innerHTML = `<div class="ugc-play-overlay">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
      </div>`;
      // Error fallback
      const img = new Image();
      img.onerror = () => {
        tile.style.backgroundImage = 'none';
        tile.style.background = `linear-gradient(135deg,${item.gradient[0]},${item.gradient[1]})`;
        tile.style.backgroundSize = '400% 400%';
      };
      img.src = item.img;
      ugcGrid.appendChild(tile);
    });
  }

  // Render review cards
  renderReviewCards(REVIEWS_DATA);

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      const filtered = f === 'all'   ? REVIEWS_DATA
                     : f === 'photo' ? REVIEWS_DATA.filter(r => r.photos?.length > 0)
                     : REVIEWS_DATA.filter(r => r.rating === parseInt(f));
      renderReviewCards(filtered);
    });
  });

  // Sort
  document.getElementById('review-sort')?.addEventListener('change', e => {
    const sorted = [...REVIEWS_DATA].sort((a, b) => {
      if (e.target.value === 'helpful') return b.helpfulCount - a.helpfulCount;
      if (e.target.value === 'high')    return b.rating - a.rating;
      if (e.target.value === 'low')     return a.rating - b.rating;
      return 0;
    });
    renderReviewCards(sorted);
  });
}

function renderReviewCards(reviews) {
  const container = document.getElementById('review-cards');
  if (!container) return;
  container.innerHTML = '';
  reviews.forEach((r, i) => {
    const initials = r.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const photosHTML = r.photos?.length > 0
      ? `<div class="review-photos">${r.photos.map(ph =>
          `<div class="review-photo" style="background:linear-gradient(135deg,${ph.gradient.join(',')})"></div>`
        ).join('')}</div>` : '';
    container.innerHTML += `
      <article class="review-card" style="animation-delay:${i * 0.07}s">
        <div class="review-header">
          <div class="reviewer-avatar" style="background:${r.avatarColor}22;color:${r.avatarColor}">${initials}</div>
          <div class="reviewer-info">
            <h4>${r.name}</h4>
            <div class="reviewer-meta">
              <span>${r.location}</span> · <span>${r.date}</span>
              ${r.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
            </div>
          </div>
        </div>
        <div class="review-star-row">${renderStars(r.rating)}</div>
        <p class="review-product-tag">${r.product}</p>
        <p class="review-text">${r.text}</p>
        ${photosHTML}
        <div class="review-helpful">
          <span>Helpful?</span>
          <button class="helpful-btn" onclick="markHelpful(this,${r.id},${r.helpfulCount})">👍 Yes (${r.helpfulCount})</button>
          <button class="helpful-btn">👎 No</button>
        </div>
      </article>`;
  });
}

window.markHelpful = function(btn, id, count) {
  const key = `urvaah_helpful_${id}`;
  if (localStorage.getItem(key)) return;
  localStorage.setItem(key, '1');
  btn.textContent = `👍 Yes (${count + 1})`;
  btn.style.borderColor = 'var(--gold)'; btn.style.color = 'var(--gold)';
};

/* ══ INFLUENCER GRID ══ */
function initInfluencerGrid(p) {
  const grid = document.getElementById('influencer-grid');
  if (!grid) return;
  const data = [
    { name: 'Priya Sharma',  handle: '@priya.eth',      followers: '124K', occasion: 'Wedding look',   img: 'assets/influencer_1.png' },
    { name: 'Meera Nair',    handle: '@meera_looks',    followers: '89K',  occasion: 'Sangeet look',   img: 'assets/influencer_2.png' },
    { name: 'Anu Krishnan',  handle: '@anufashion',     followers: '210K', occasion: 'Reception look', img: 'assets/influencer_3.png' },
    { name: 'Divya Patel',   handle: '@divstyles',      followers: '56K',  occasion: 'Festive look',   img: 'assets/influencer_4.png' },
    { name: 'Riya Menon',    handle: '@riyas_saree',    followers: '143K', occasion: 'Mehendi look',   img: 'assets/influencer_5.png' },
    { name: 'Sneha Reddy',   handle: '@snehafashion',   followers: '78K',  occasion: 'Cocktail look',  img: 'assets/influencer_6.png' },
  ];
  const fallbackGrads = [
    ['#6B1F2A','#C9A84C','#8B1A2A'], ['#E8B4B8','#F5D0D4','#C9A84C'],
    ['#1D6B4F','#2D9B6E','#A8D8B9'], ['#F5C518','#FDE68A','#C9A84C'],
    ['#7B5CF0','#C4B5FD','#DDD6FE'], ['#0d2b5e','#1a4fa0','#4d80d0'],
  ];
  data.forEach((inf, i) => {
    const card = document.createElement('div');
    card.className = 'influencer-card';
    // Try real image first, fallback to gradient
    card.style.backgroundImage = `url('${inf.img}')`;
    card.style.backgroundSize  = 'cover';
    card.style.backgroundPosition = 'center';
    card.style.backgroundColor = fallbackGrads[i][0]; // shown while image loads
    card.innerHTML = `
      <div class="influencer-overlay">
        <p class="influencer-name">${inf.name}</p>
        <p class="influencer-handle">${inf.handle} · ${inf.followers}</p>
        <p class="influencer-occasion">${inf.occasion} ✦</p>
      </div>`;
    // Image error fallback
    const img = new Image();
    img.onerror = () => {
      card.style.backgroundImage = 'none';
      card.style.background = `linear-gradient(145deg,${fallbackGrads[i].join(',')})`;
      card.style.backgroundSize = '400% 400%';
    };
    img.src = inf.img;
    grid.appendChild(card);
  });
}

/* ══ SIZE GUIDE MODAL ══ */
function initSizeGuideModal(p) {
  const modal   = document.getElementById('size-guide-modal');
  const content = modal?.querySelector('.size-guide-content');
  if (!modal || !content) return;
  content.innerHTML = `
    <p style="font-size:14px;color:var(--text-secondary);margin-bottom:20px">
      Use this guide to find the perfect saree length and blouse fabric for your fit.
    </p>
    <h4 style="color:var(--gold);margin-bottom:10px;font-family:'Playfair Display',serif">Saree Length Guide</h4>
    <table class="size-table">
      <thead><tr><th>Your Height</th><th>Recommended Length</th><th>Notes</th></tr></thead>
      <tbody>
        <tr><td>Below 5'1"</td><td>5 to 5.5 meters</td><td>Petite fit</td></tr>
        <tr><td>5'1" – 5'5"</td><td>5.5 meters (standard)</td><td>Perfect drape</td></tr>
        <tr><td>5'5" – 5'9"</td><td>5.5 to 6 meters</td><td>Tall fit</td></tr>
        <tr><td>Above 5'9"</td><td>6 meters+</td><td>Extended drape</td></tr>
      </tbody>
    </table>
    <h4 style="color:var(--gold);margin:20px 0 10px;font-family:'Playfair Display',serif">Blouse Guide</h4>
    <table class="size-table">
      <thead><tr><th>Bust Size</th><th>Blouse Size</th><th>Fabric Needed</th></tr></thead>
      <tbody>
        <tr><td>32" – 34"</td><td>S</td><td>0.6 meters</td></tr>
        <tr><td>34" – 36"</td><td>M</td><td>0.7 meters</td></tr>
        <tr><td>36" – 38"</td><td>L</td><td>0.8 meters (included)</td></tr>
        <tr><td>38" – 40"</td><td>XL</td><td>0.9 meters</td></tr>
      </tbody>
    </table>
    <div style="margin-top:20px;padding:16px;background:var(--bg-surface);border-radius:12px;">
      <p style="font-size:13px;color:var(--text-secondary)">💬 Still confused? Our style expert will help you.</p>
      <a href="https://wa.me/919876543210?text=I need help with saree size"
         target="_blank" class="btn-review-wa" style="display:inline-flex;margin-top:12px">
        Chat with Style Expert
      </a>
    </div>`;

  document.getElementById('close-size-modal')?.addEventListener('click', closeSizeGuide);
  modal.addEventListener('click', e => { if (e.target === modal) closeSizeGuide(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSizeGuide(); });
}
window.openSizeGuide  = () => { const m = document.getElementById('size-guide-modal'); if(m){ m.style.display = 'flex'; document.body.style.overflow = 'hidden'; } };
window.closeSizeGuide = () => { const m = document.getElementById('size-guide-modal'); if(m){ m.style.display = 'none'; document.body.style.overflow = ''; } };

/* ══ COUNTDOWN ══ */
function initCountdown() {
  const key = 'urvaah_sale_end';
  let end = parseInt(localStorage.getItem(key) || '0');
  if (!end || end < Date.now()) {
    const midnight = new Date(); midnight.setHours(23, 59, 59, 999);
    end = midnight.getTime(); localStorage.setItem(key, end);
  }
  const pad = n => String(n).padStart(2, '0');
  function tick() {
    const rem = end - Date.now();
    if (rem <= 0) return;
    const h = Math.floor(rem / 3600000);
    const m = Math.floor((rem % 3600000) / 60000);
    const s = Math.floor((rem % 60000) / 1000);
    const sEl = document.getElementById('cd-secs');
    const prevS = sEl?.textContent;
    const set = (id, v) => { const el = document.getElementById(id); if(el) el.textContent = pad(v); };
    set('cd-hours', h); set('cd-mins', m); set('cd-secs', s);
    if (sEl && prevS !== pad(s)) {
      sEl.style.animation = 'none';
      requestAnimationFrame(() => { sEl.style.animation = 'tickFlip 0.5s ease'; });
    }
  }
  tick(); setInterval(tick, 1000);
}

/* ══ LIVE VIEWERS ══ */
function initLiveViewerCount(p) {
  let count = p.recentViews || 143;
  const el = document.getElementById('viewer-count');
  if (el) el.textContent = count;
  setInterval(() => {
    if (Math.random() > 0.6) {
      count = Math.max(count - 1, p.recentViews - 3);
    } else {
      count = Math.min(count + 1, p.recentViews + 8);
    }
    if (el) el.textContent = count;
  }, 18000 + Math.random() * 12000);
}

/* ══ LIGHTBOX ══ */
function initLightbox(p) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  // Only show images that have a real URL
  const imgs   = Object.values(p.images).filter(img => !!img.url);
  let current  = 0;

  window.openLightbox = (idx = 0) => {
    current = Math.min(idx, imgs.length - 1);
    showSlide(current);
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Build thumbs once
    const thumbsEl = document.getElementById('lightbox-thumbs');
    if (thumbsEl && thumbsEl.children.length === 0) {
      imgs.forEach((img, i) => {
        const t = document.createElement('div');
        t.className = 'lightbox-thumb' + (i === current ? ' active' : '');
        t.style.backgroundImage = `url('${img.url}')`;
        t.style.backgroundSize  = 'cover';
        t.style.backgroundPosition = 'center';
        t.onclick = () => { current = i; showSlide(current); };
        thumbsEl.appendChild(t);
      });
    }
  };

  function showSlide(idx) {
    const img   = imgs[idx];
    const imgEl = document.getElementById('lightbox-img');
    const capEl = document.getElementById('lightbox-caption');
    if (imgEl) {
      imgEl.style.background = '';
      imgEl.style.width = '';
      imgEl.style.height = '';
      imgEl.innerHTML = `<img src="${img.url}" alt="${img.alt || ''}"
        style="max-width:80vw;max-height:78vh;border-radius:12px;object-fit:contain;display:block">`;
    }
    if (capEl) capEl.textContent = img.alt || '';
    document.querySelectorAll('.lightbox-thumb').forEach((t, i) =>
      t.classList.toggle('active', i === idx));
  }

  document.getElementById('lightbox-close')?.addEventListener('click', () => {
    lb.style.display = 'none'; document.body.style.overflow = '';
  });
  document.getElementById('lightbox-prev')?.addEventListener('click', () => {
    current = (current - 1 + imgs.length) % imgs.length; showSlide(current);
  });
  document.getElementById('lightbox-next')?.addEventListener('click', () => {
    current = (current + 1) % imgs.length; showSlide(current);
  });
  document.addEventListener('keydown', e => {
    if (lb.style.display === 'none') return;
    if (e.key === 'ArrowLeft')  document.getElementById('lightbox-prev')?.click();
    if (e.key === 'ArrowRight') document.getElementById('lightbox-next')?.click();
    if (e.key === 'Escape')     document.getElementById('lightbox-close')?.click();
  });
}

/* ══ SCROLL REVEAL ══ */
function initScrollReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = 'floatUp 0.65s ease forwards';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.brand-story, .product-video-section, .fabric-details, .reviews-section, .influencer-section')
    .forEach(el => { el.style.opacity = '0'; io.observe(el); });
}
