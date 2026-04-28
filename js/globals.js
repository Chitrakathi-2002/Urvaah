/* ═══════════════════════════════════════════
   globals.js — Shared state: cart, wishlist,
   theme toggle, toast, localStorage helpers
   ═══════════════════════════════════════════ */

const STATE = {
  cart: [],
  wishlist: [],
  recentlyViewed: [],
};

function loadState() {
  try {
    STATE.cart          = JSON.parse(localStorage.getItem('urvaah-cart') || '[]');
    STATE.wishlist      = JSON.parse(localStorage.getItem('urvaah-wishlist') || '[]');
    STATE.recentlyViewed = JSON.parse(localStorage.getItem('urvaah-recently-viewed') || '[]');
  } catch(e) {}
}

function saveState() {
  localStorage.setItem('urvaah-cart',           JSON.stringify(STATE.cart));
  localStorage.setItem('urvaah-wishlist',        JSON.stringify(STATE.wishlist));
  localStorage.setItem('urvaah-recently-viewed', JSON.stringify(STATE.recentlyViewed));
  updateAllBadges();
}

/* ── Cart ── */
function cartAdd(product, qty = 1) {
  const existing = STATE.cart.find(i => i.id === product.id);
  if (existing) { existing.quantity += qty; }
  else { STATE.cart.push({ ...product, quantity: qty, addedAt: Date.now() }); }
  saveState();
  showToast(`${product.shortName} added to cart ✦`);
}

function cartRemove(productId) {
  STATE.cart = STATE.cart.filter(i => i.id !== productId);
  saveState();
}

function cartTotal() {
  return STATE.cart.reduce((s, i) => s + i.price * i.quantity, 0);
}

function cartCount() {
  return STATE.cart.reduce((s, i) => s + i.quantity, 0);
}

/* ── Wishlist ── */
function wishlistToggle(product) {
  const idx = STATE.wishlist.findIndex(i => i.id === product.id);
  if (idx > -1) {
    STATE.wishlist.splice(idx, 1);
    showToast('Removed from wishlist');
  } else {
    STATE.wishlist.push(product);
    showToast(`${product.shortName} saved ♥`);
  }
  saveState();
}

function isWishlisted(productId) {
  return STATE.wishlist.some(i => i.id === productId);
}

/* ── Recently Viewed ── */
function trackRecentlyViewed(product) {
  STATE.recentlyViewed = [
    { slug: product.slug, name: product.shortName, gradient: product.gradientColors, price: product.price },
    ...STATE.recentlyViewed.filter(v => v.slug !== product.slug)
  ].slice(0, 8);
  saveState();
}

/* ── Badges ── */
function updateAllBadges() {
  const cc = cartCount();
  const wc = STATE.wishlist.length;
  document.querySelectorAll('.cart-count, .cart-badge').forEach(el => {
    el.textContent = cc;
    el.style.display = cc > 0 ? 'flex' : 'none';
  });
  document.querySelectorAll('.wishlist-count').forEach(el => {
    el.textContent = wc;
    el.style.display = wc > 0 ? 'flex' : 'none';
  });
}

/* ── Toast ── */
function showToast(message, duration = 3000) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.style.cssText = `
      position:fixed; bottom:36px; left:50%; transform:translateX(-50%) translateY(20px);
      background:var(--text-primary); color:var(--bg-page);
      padding:13px 30px; border-radius:100px; font-size:14px; font-weight:700;
      z-index:10000; opacity:0; pointer-events:none;
      transition:all 0.35s cubic-bezier(0.23,1,0.32,1);
      box-shadow:0 12px 40px rgba(0,0,0,0.25); white-space:nowrap;
      font-family:'DM Sans',sans-serif;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, duration);
}

/* ── Theme Toggle ── */
function initTheme() {
  const saved = localStorage.getItem('urvaah-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cur  = document.documentElement.getAttribute('data-theme');
      const next = cur === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('urvaah-theme', next);
      // Update icon if present
      btn.querySelector('.theme-icon-moon') && (btn.querySelector('.theme-icon-moon').style.display = next === 'dark' ? 'none' : 'block');
      btn.querySelector('.theme-icon-sun')  && (btn.querySelector('.theme-icon-sun').style.display  = next === 'dark' ? 'block' : 'none');
    });
  });
}

/* ── Navbar Scroll ── */
function initNavbarScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ── Mobile Menu ── */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateAllBadges();
  initTheme();
  initNavbarScroll();
  initMobileMenu();
  lucide.createIcons();
});
