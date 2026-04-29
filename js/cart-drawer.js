const CartDrawer = {
  open() {
    document.getElementById('cart-drawer')?.classList.add('open');
    document.getElementById('cart-drawer-overlay')?.classList.add('open');
    document.getElementById('cart-drawer')?.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    this.render();
  },
  close() {
    document.getElementById('cart-drawer')?.classList.remove('open');
    document.getElementById('cart-drawer-overlay')?.classList.remove('open');
    document.getElementById('cart-drawer')?.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  },
  render() {
    const items   = Cart.items;
    const isEmpty = items.length === 0;
    const drawerEmpty = document.getElementById('drawer-empty');
    const drawerFooter = document.getElementById('drawer-footer');
    const drawerCount = document.getElementById('drawer-count');
    
    if (drawerEmpty) drawerEmpty.style.display  = isEmpty ? 'flex' : 'none';
    if (drawerFooter) drawerFooter.style.display = isEmpty ? 'none' : 'block';
    if (drawerCount) drawerCount.textContent = `(${Cart.totalItems} item${Cart.totalItems!==1?'s':''})`;

    /* Shipping progress */
    const FREE_SHIPPING_THRESHOLD = 999;
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - Cart.totalPrice);
    const pct = Math.min(100, (Cart.totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
    const fillEl = document.getElementById('shipping-fill');
    const msgEl = document.getElementById('shipping-msg');
    
    if (fillEl) fillEl.style.width = pct + '%';
    if (msgEl) msgEl.innerHTML = remaining > 0
      ? `Add ${formatINR(remaining)} more for Free Shipping!`
      : `🎉 You've unlocked free shipping!`;

    /* Render items */
    const container = document.getElementById('drawer-items');
    if (!container) return;
    container.innerHTML = '';
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'drawer-item';
      const grad = item.gradientColors || item.gradient || ['#6B1F2A','#C9A84C'];
      el.innerHTML = `
        <a href="product-detail.html?slug=${item.slug||''}" class="drawer-item-img"
           style="background:linear-gradient(145deg,${grad.join(',')})"
           onclick="CartDrawer.close()"></a>
        <div class="drawer-item-body">
          <a href="product-detail.html?slug=${item.slug||''}" class="drawer-item-name"
             onclick="CartDrawer.close()">${item.name}</a>
          <div class="drawer-item-sub">${item.fabric||item.subCategory||''}</div>
          <div>
            <span class="drawer-item-price">${formatINR(item.price)}</span>
            ${item.mrp&&item.mrp!==item.price
              ? `<span class="drawer-item-mrp">${formatINR(item.mrp)}</span>` : ''}
          </div>
          <div class="qty-row">
            <button class="qty-btn" onclick="Cart.updateQty('${item.id}',${item.quantity-1})">−</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn" onclick="Cart.updateQty('${item.id}',${item.quantity+1})">+</button>
          </div>
        </div>
        <button class="drawer-item-remove" aria-label="Remove ${item.name}"
                onclick="Cart.remove('${item.id}')">✕</button>`;
      container.appendChild(el);
    });

    /* Subtotal */
    const subtotalEl = document.getElementById('drawer-subtotal');
    const savingEl = document.getElementById('drawer-saving');
    
    if (subtotalEl) subtotalEl.textContent = formatINR(Cart.totalPrice);
    if (savingEl) {
      if (Cart.totalSaving > 0) {
        savingEl.textContent = formatINR(Cart.totalSaving);
        savingEl.parentElement.style.display = 'flex';
      } else {
        savingEl.parentElement.style.display = 'none';
      }
    }
  }
};

/* Escape key closes drawer */
document.addEventListener('keydown', e => { if(e.key==='Escape') CartDrawer.close(); });

// Global exposure
window.CartDrawer = CartDrawer;
