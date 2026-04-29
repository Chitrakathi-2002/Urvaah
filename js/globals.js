/* ═══════════════════════════════════════════
   HOUSE OF URVAAH — GLOBAL STATE MANAGER
   All pages include this file first
   ═══════════════════════════════════════════ */

/* ── THEME ── */
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('urvaah-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      const cur  = document.documentElement.getAttribute('data-theme');
      const next = cur === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('urvaah-theme', next);
      this.updateToggleUI(next);
    });
    this.updateToggleUI(saved);
  },
  updateToggleUI(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const sun = btn.querySelector('.toggle-sun');
    const moon = btn.querySelector('.toggle-moon');
    if (sun) sun.style.opacity = theme === 'light' ? '1' : '0.3';
    if (moon) moon.style.opacity = theme === 'dark' ? '1' : '0.3';
  }
};

/* ── CART ── */
const Cart = {
  KEY: 'urvaah-cart',
  get items() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
    catch { return []; }
  },
  save(items) { 
    localStorage.setItem(this.KEY, JSON.stringify(items)); 
    this.updateBadge();
    if (window.CartDrawer && CartDrawer.render) CartDrawer.render();
  },

  add(product, qty = 1) {
    const items = this.items;
    const idx   = items.findIndex(i => i.id === product.id);
    if (idx > -1) { items[idx].quantity += qty; }
    else { items.push({ ...product, quantity: qty, addedAt: Date.now() }); }
    this.save(items);
    if (window.CartDrawer) CartDrawer.open();
    Toast.show(`"${product.shortName || product.name}" added to cart`, 'success');
  },
  remove(id) {
    this.save(this.items.filter(i => i.id !== id));
  },
  updateQty(id, qty) {
    if (qty <= 0) { this.remove(id); return; }
    const items = this.items;
    const idx   = items.findIndex(i => i.id === id);
    if (idx > -1) { items[idx].quantity = qty; this.save(items); }
  },
  clear() { this.save([]); },

  get totalItems()  { return this.items.reduce((s,i) => s + i.quantity, 0); },
  get totalPrice()  { return this.items.reduce((s,i) => s + i.price * i.quantity, 0); },
  get totalMRP()    { return this.items.reduce((s,i) => s + (i.mrp||i.price)*i.quantity, 0); },
  get totalSaving() { return this.totalMRP - this.totalPrice; },

  updateBadge() {
    document.querySelectorAll('.cart-badge').forEach(b => {
      const n = this.totalItems;
      b.textContent = n;
      b.style.display = n > 0 ? 'flex' : 'none';
    });
  }
};

/* ── WISHLIST ── */
const Wishlist = {
  KEY: 'urvaah-wishlist',
  get ids() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
    catch { return []; }
  },
  has(id)    { return this.ids.includes(id); },
  toggle(product) {
    let ids = this.ids;
    if (ids.includes(product.id)) {
      ids = ids.filter(i => i !== product.id);
      Toast.show(`Removed from wishlist`, 'info');
    } else {
      ids.push(product.id);
      Toast.show(`"${product.shortName||product.name}" saved to wishlist ♡`, 'success');
    }
    localStorage.setItem(this.KEY, JSON.stringify(ids));
    this.updateBadge();
    return this.has(product.id);
  },
  updateBadge() {
    document.querySelectorAll('.wishlist-badge').forEach(b => {
      const n = this.ids.length;
      b.textContent = n;
      b.style.display = n > 0 ? 'flex' : 'none';
    });
  }
};

/* ── RECENTLY VIEWED ── */
const RecentlyViewed = {
  KEY: 'urvaah-recently-viewed',
  add(product) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem(this.KEY)||'[]'); } catch{}
    list = list.filter(i => i.id !== product.id);
    list.unshift({ id:product.id, slug:product.slug,
      name:product.shortName||product.name,
      gradient:product.gradientColors, price:product.price });
    localStorage.setItem(this.KEY, JSON.stringify(list.slice(0,8)));
  },
  get list() {
    try { return JSON.parse(localStorage.getItem(this.KEY)||'[]'); } catch{ return []; }
  }
};

/* ── TOAST NOTIFICATIONS ── */
const Toast = {
  show(message, type = 'info', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText =
        'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    const colors = { success:'#2D9B6E', error:'#C0392B', info:'#C9A84C', warning:'#F0A060' };
    toast.style.cssText = `
      background:var(--card-bg); border:1px solid ${colors[type]||colors.info};
      border-left:4px solid ${colors[type]||colors.info};
      color:var(--text-primary); padding:14px 18px; border-radius:10px;
      font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
      box-shadow:0 8px 32px rgba(0,0,0,0.3); max-width:300px;
      animation:slideInRight 0.35s ease; cursor:pointer;`;
    toast.textContent = message;
    toast.addEventListener('click', () => toast.remove());
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

/* ── COUPON CODES ── */
const COUPONS = {
  'URVAAH10':   { type:'percent',  value:10, label:'10% off'              },
  'FIRST15':    { type:'percent',  value:15, label:'15% off for new users' },
  'WEDDING20':  { type:'percent',  value:20, label:'20% off wedding orders' },
  'FLAT500':    { type:'fixed',    value:500,label:'Flat Rs. 500 off'      },
  'PREPAID5':   { type:'percent',  value:5,  label:'Extra 5% off prepaid'  },
};

function applyCoupon(code, cartTotal) {
  const coupon = COUPONS[code.toUpperCase()];
  if (!coupon) return { valid:false, discount:0, message:'Invalid coupon code' };
  const discount = coupon.type === 'percent'
    ? Math.round(cartTotal * coupon.value / 100)
    : coupon.value;
  return { valid:true, discount, label:coupon.label,
    message:`${coupon.label} applied successfully!` };
}

/* ── FORMAT CURRENCY ── */
function formatINR(amount) {
  return 'Rs. ' + Math.round(amount).toLocaleString('en-IN');
}

/* ── GLOBAL INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Cart.updateBadge();
  Wishlist.updateBadge();
});
