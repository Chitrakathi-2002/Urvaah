document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();
  ThemeManager.init();
  Cart.updateBadge();
  Wishlist.updateBadge();
});

let appliedCoupon = null;
let expressDelivery = false;
let giftWrap = false;

function renderCartPage() {
  const items = Cart.items;
  const hasItemsSection = document.getElementById('cart-has-items');
  const emptySection = document.getElementById('cart-empty');

  if (items.length === 0) {
    if (hasItemsSection) hasItemsSection.style.display = 'none';
    if (emptySection) emptySection.style.display    = 'block';
    return;
  }
  
  if (hasItemsSection) hasItemsSection.style.display = 'grid';
  if (emptySection) emptySection.style.display     = 'none';
  
  renderCartItems(items);
  updateSummary();
}

function renderCartItems(items) {
  const container = document.getElementById('cart-items-container');
  if (!container) return;
  container.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'cart-item-card';
    const grad = item.gradientColors || item.gradient || ['#6B1F2A','#C9A84C'];
    
    card.innerHTML = `
      <div class="cart-item-img silk-swatch" style="background:linear-gradient(145deg, ${grad.join(',')})">
        ${item.images?.main?.url ? `<img src="${item.images.main.url}" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` : ''}
      </div>
      <div class="cart-item-info">
        <div class="cart-item-tag">${item.subCategory || item.fabric || 'Premium Wear'}</div>
        <a href="product-detail.html?slug=${item.slug}" class="cart-item-name">${item.name}</a>
        
        <div class="cart-item-controls">
          <div class="qty-row">
            <button class="qty-btn" onclick="updateItemQty('${item.id}', ${item.quantity - 1})">−</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn" onclick="updateItemQty('${item.id}', ${item.quantity + 1})">+</button>
          </div>
          
          <div class="cart-item-price-block">
            <span class="cart-item-price">${formatINR(item.price * item.quantity)}</span>
            ${item.mrp ? `<span class="cart-item-mrp">${formatINR(item.mrp * item.quantity)}</span>` : ''}
          </div>
        </div>
        
        <div class="cart-item-actions" style="margin-top:15px; border-top:1px solid var(--border-default); padding-top:10px;">
          <button class="btn-remove" onclick="removeCartItem('${item.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Remove
          </button>
          <button class="btn-remove" onclick="moveToWishlist('${item.id}')" style="margin-left:20px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            Save for Later
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function updateSummary() {
  const items    = Cart.items;
  const subtotal = Cart.totalPrice;
  const saving   = Cart.totalSaving;
  let couponDisc = appliedCoupon ? appliedCoupon.discount : 0;
  let shipping   = expressDelivery ? 149 : 0;
  const total    = subtotal - couponDisc + shipping;
  const totalSave = saving + couponDisc;

  const itemsEl = document.getElementById('summary-items');
  const discountEl = document.getElementById('summary-discount');
  const couponEl = document.getElementById('summary-coupon');
  const shippingEl = document.getElementById('summary-shipping');
  const totalEl = document.getElementById('summary-total');
  const savingEl = document.getElementById('summary-saving');
  const headingEl = document.getElementById('cart-heading');

  if (itemsEl) itemsEl.textContent    = formatINR(subtotal);
  if (discountEl) discountEl.textContent = '- ' + formatINR(saving);
  if (couponEl) couponEl.textContent   = appliedCoupon ? '- ' + formatINR(couponDisc) : '—';
  if (shippingEl) shippingEl.textContent = shipping > 0 ? formatINR(shipping) : 'FREE ✓';
  if (totalEl) totalEl.textContent    = formatINR(total);
  if (savingEl) savingEl.textContent   = formatINR(totalSave);
  if (headingEl) headingEl.textContent = `My Cart (${Cart.totalItems} item${Cart.totalItems!==1?'s':''})`;

  /* Save checkout intent to localStorage for checkout page */
  localStorage.setItem('urvaah-checkout-intent', JSON.stringify({
    items, subtotal, couponDisc, shipping, total,
    couponCode: appliedCoupon?.code, expressDelivery, giftWrap,
  }));
}

// Global functions for event listeners
window.updateItemQty = (id, qty) => {
  Cart.updateQty(id, qty);
  renderCartPage();
};

window.removeCartItem = (id) => {
  Cart.remove(id);
  renderCartPage();
};

window.moveToWishlist = (id) => {
  const item = Cart.items.find(i => i.id === id);
  if (item) {
    Wishlist.toggle(item);
    Cart.remove(id);
    renderCartPage();
  }
};

/* Coupon apply */
document.getElementById('btn-apply-coupon')?.addEventListener('click', () => {
  const code  = document.getElementById('coupon-input').value.trim();
  const input = document.getElementById('coupon-input');
  if (!code) return;
  
  const result = applyCoupon(code, Cart.totalPrice);
  if (result.valid) {
    appliedCoupon = { ...result, code };
    input.style.borderColor = 'var(--green-success)';
    document.getElementById('coupon-success').textContent = '✓ ' + result.message;
    document.getElementById('coupon-success').style.display = 'block';
    document.getElementById('coupon-error').style.display   = 'none';
    Toast.show(result.message, 'success');
  } else {
    input.style.borderColor = 'var(--red-urgency)';
    document.getElementById('coupon-error').textContent = result.message;
    document.getElementById('coupon-error').style.display   = 'block';
    document.getElementById('coupon-success').style.display = 'none';
    appliedCoupon = null;
    Toast.show(result.message, 'error');
  }
  updateSummary();
});

/* Express + gift toggles */
document.getElementById('express-toggle')?.addEventListener('change', e => {
  expressDelivery = e.target.checked; updateSummary();
});
document.getElementById('gift-toggle')?.addEventListener('change', e => {
  giftWrap = e.target.checked; updateSummary();
});
