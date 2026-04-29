document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Cart.updateBadge();
  Wishlist.updateBadge();
  renderWishlistPage();
});

function renderWishlistPage() {
  const ids   = Wishlist.ids;
  const saved = ids.map(id => PRODUCTS.find(p=>p.id===id)).filter(Boolean);

  const countEl = document.getElementById('wishlist-count');
  if (countEl) countEl.textContent = `(${saved.length} item${saved.length!==1?'s':''})`;

  const grid  = document.getElementById('wishlist-grid');
  const empty = document.getElementById('wishlist-empty');
  
  if (!grid || !empty) return;
  grid.innerHTML = '';

  if (saved.length === 0) {
    grid.style.display  = 'none';
    empty.style.display = 'flex';
    renderBestsellers();
    return;
  }
  
  grid.style.display  = 'grid';
  empty.style.display = 'none';

  saved.forEach((product, i) => {
    // createRecoCard is from recommendations.js
    const card = typeof createRecoCard === 'function' ? createRecoCard(product, i) : document.createElement('div');
    
    /* Add "Move to Cart" button */
    const moveBtn = document.createElement('button');
    moveBtn.className = 'btn-move-to-cart';
    moveBtn.textContent = '🛒 Move to Cart';
    moveBtn.addEventListener('click', e => {
      e.stopPropagation();
      Cart.add(product, 1);
      Wishlist.toggle(product);
      renderWishlistPage();
    });
    
    const infoPart = card.querySelector('.reco-card-info');
    if (infoPart) infoPart.appendChild(moveBtn);
    grid.appendChild(card);
  });
}

function renderBestsellers() {
  const container = document.getElementById('bestseller-reco');
  if (!container) return;
  container.innerHTML = '';
  
  const bestsellers = PRODUCTS.filter(p => p.isBestseller).slice(0, 4);
  bestsellers.forEach((product, i) => {
    const card = typeof createRecoCard === 'function' ? createRecoCard(product, i) : document.createElement('div');
    container.appendChild(card);
  });
}
