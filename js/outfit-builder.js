/* ══════════════════════════════════════════
   OUTFIT BUILDER CONTROLLER
   ══════════════════════════════════════════ */

let currentProduct = null;
let outfitParts    = null;
let selectedParts   = {}; // { zoneId: partObject }

function initOutfitBuilder(product) {
  currentProduct = product;
  outfitParts    = getOutfitParts(product.id);

  if (!outfitParts) {
    document.getElementById('outfit-builder')?.remove();
    return;
  }

  // Set initial gender and mannequin
  const initialGender = outfitParts.gender || 'women';
  toggleMannequin(initialGender);

  // Bind gender buttons
  document.querySelectorAll('.gender-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      toggleMannequin(btn.dataset.gender);
    });
  });

  // Bind hotspot pins
  document.querySelectorAll('.hotspot-pin, .zone-area').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const zone = el.dataset.zone;
      if (zone) selectZone(zone);
    });
    // Tooltip logic
    el.addEventListener('mouseenter', (e) => showZoneTooltip(e, el.dataset.zone));
    el.addEventListener('mouseleave', hideZoneTooltip);
  });

  // Tray clear
  document.getElementById('tray-clear')?.addEventListener('click', clearTray);

  // Add all to cart
  document.getElementById('btn-add-all-cart')?.addEventListener('click', addCompleteOutfitToCart);

  // Default selection: Saree/Kurta zone
  const mainZone = initialGender === 'women' ? 'saree' : 'kurta';
  selectZone(mainZone);
  
  loadFromHash();
  renderTray();

  // Mobile Bubble Toggle
  document.querySelector('.silhouette-col')?.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      this.classList.toggle('expanded');
    }
  });
}

function toggleMannequin(gender) {
  document.getElementById('silhouette-women').style.display = gender === 'women' ? 'block' : 'none';
  document.getElementById('silhouette-men').style.display   = gender === 'men'   ? 'block' : 'none';
  // Hide gender toggle if only one gender available
  const otherGender = gender === 'women' ? 'men' : 'women';
  if (!OUTFIT_PARTS[currentProduct.id + '_' + otherGender]) {
    // Note: In real app, we'd check if both exist. For now, keep toggle.
  }
}

/* ── Zone Selection ── */
function selectZone(zoneId) {
  const zone = outfitParts.zones[zoneId];
  if (!zone) return;

  // Update UI state
  document.querySelectorAll('.hotspot-pin, .zone-area').forEach(el => {
    el.classList.toggle('active', el.dataset.zone === zoneId);
  });

  // Update panel header
  document.getElementById('active-zone-name').textContent = zone.label;
  document.getElementById('active-zone-icon').textContent = zone.icon;
  document.getElementById('active-zone-tip').textContent  = zone.tip;

  renderPartsList(zoneId);
}

/* ── Parts Rendering ── */
function renderPartsList(zoneId) {
  const container = document.getElementById('parts-list');
  const zone = outfitParts.zones[zoneId];
  container.innerHTML = '';

  if (zone.isMainProduct) {
    container.innerHTML = `
      <div class="part-card selected">
        <div class="part-img silk-swatch" style="background:linear-gradient(145deg,${currentProduct.gradientColors.join(',')})">
           ${currentProduct.images?.main?.url ? `<img src="${currentProduct.images.main.url}" alt="${currentProduct.shortName}">` : ''}
        </div>
        <div class="part-info">
          <div class="part-name">${currentProduct.name}</div>
          <div class="part-subtitle">Currently Viewing</div>
          <div class="part-price-row">
            <span class="part-sale-price">Rs. ${currentProduct.price.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <div class="part-actions">
           <span style="font-size:12px;color:var(--gold);font-weight:700">✓ SELECTED</span>
        </div>
      </div>
    `;
    return;
  }

  if (!zone.parts || zone.parts.length === 0) {
    container.innerHTML = '<p style="padding:20px;text-align:center;color:var(--text-muted)">No matching items found for this zone.</p>';
    return;
  }

  // Master Plan: Aesthetic Engine Sorting
  const sortedParts = [...zone.parts].sort((a, b) => {
    const matchA = countMatches(a.aestheticTags, currentProduct.aestheticTags);
    const matchB = countMatches(b.aestheticTags, currentProduct.aestheticTags);
    return matchB - matchA;
  });

  sortedParts.forEach(part => {
    const isSelected = selectedParts[zoneId]?.id === part.id;
    // Calculate real-time match score based on tags
    const baseScore = part.matchScore || 80;
    const tagBonus = countMatches(part.aestheticTags, currentProduct.aestheticTags) * 5;
    const finalScore = Math.min(baseScore + tagBonus, 100);

    const card = document.createElement('div');
    card.className = `part-card ${isSelected ? 'selected' : ''} ${!part.inStock ? 'out-of-stock' : ''}`;
    card.innerHTML = `
      <div class="part-img" id="pimg-${part.id}" style="background:linear-gradient(145deg,${part.gradient.join(',')})">
        ${!part.inStock ? '<div class="oos-badge">OUT OF STOCK</div>' : ''}
      </div>
      <div class="part-info">
        <div class="part-match">${finalScore}% MATCH</div>
        <div class="part-name">${part.name}</div>
        <div class="part-subtitle">${part.subtitle}</div>
        <div class="part-match-reason">${part.matchReason}</div>
        <div class="part-price-row">
          <span class="part-sale-price">Rs. ${part.price.toLocaleString('en-IN')}</span>
          <span class="part-mrp">Rs. ${part.mrp.toLocaleString('en-IN')}</span>
        </div>
      </div>
      <div class="part-actions">
        <button class="btn-select-part ${isSelected ? 'selected-btn' : ''}" 
                onclick="event.stopPropagation(); togglePartSelection('${zoneId}', '${part.id}')">
          ${isSelected ? '✓ Selected' : 'Add to Look'}
        </button>
        <button class="btn-quick-add" onclick="event.stopPropagation(); addTrayItemToCart('${part.id}')">
          Quick Buy
        </button>
      </div>
    `;

    card.onclick = () => togglePartSelection(zoneId, part.id);
    container.appendChild(card);

    /* Generate AI image for part */
    if (window.applyProductImage) {
        applyProductImage(document.getElementById(`pimg-${part.id}`), currentProduct, part.imageType);
    }
  });
}

/* ── Tray Management ── */
function togglePartSelection(zoneId, partId) {
  const zone = outfitParts.zones[zoneId];
  const part = zone.parts.find(p => p.id === partId);

  if (!part.inStock) return;

  if (selectedParts[zoneId]?.id === partId) {
    delete selectedParts[zoneId];
  } else {
    selectedParts[zoneId] = part;
  }

  renderPartsList(zoneId);
  renderTray();
}

function updateMannequinLayers() {
  const gender = outfitParts.gender || 'women';
  
  // Clear all layers for current gender first
  const layers = document.querySelectorAll(`#preview-layers-${gender} image`);
  layers.forEach(l => l.setAttribute('opacity', '0'));

  // Update with selected parts
  Object.keys(selectedParts).forEach(zId => {
    const part = selectedParts[zId];
    if (!part) return;

    // Map zoneId to layerId
    const layerId = `layer-${zId}-${gender}`;
    const layerEl = document.getElementById(layerId);
    
    if (layerEl) {
      // In a real app, part.imageLayer would be a high-quality PNG. 
      // For this demo, we'll use specific generated assets if available, or a fallback.
      let imgUrl = part.imageLayer || ''; 
      
      // FALLBACK MAPPING (for demo purposes)
      if (part.id === 'jew_001') imgUrl = 'assets/gold_temple_necklace_layer_1777402456532.png';
      if (part.id === 'blouse_001' || part.id === 'blouse_002') imgUrl = 'assets/maroon_blouse_layer_1777402489425.png';
      if (part.id === 'heel_001') imgUrl = 'assets/gold_heels_layer_1777402520837.png';

      if (imgUrl) {
        layerEl.setAttribute('href', imgUrl);
        layerEl.setAttribute('opacity', '1');
      }
    }
  });
}

let lastPrice = 0;
function renderTray() {
  const trayContainer = document.getElementById('tray-items');
  const totalPriceEl  = document.getElementById('tray-total-price');
  const totalSavingEl = document.getElementById('tray-total-saving');

  trayContainer.innerHTML = '';
  let totalPrice = currentProduct.price;
  let totalMRP   = currentProduct.mrp;

  // Always show main product first
  trayContainer.appendChild(createTraySlot(currentProduct, 'Main Item', true));

  // Show other zones
  Object.keys(outfitParts.zones).forEach(zId => {
    const zone = outfitParts.zones[zId];
    if (zone.isMainProduct) return;

    const selected = selectedParts[zId];
    trayContainer.appendChild(createTraySlot(selected, zone.label, !!selected, zId));

    if (selected) {
      totalPrice += selected.price;
      totalMRP   += selected.mrp;
    }
  });

  // Animated Price Counter
  animatePrice(lastPrice, totalPrice, totalPriceEl);
  lastPrice = totalPrice;

  const saving = totalMRP - totalPrice;
  
  // Master Plan: Bundle Discounting
  const selectedCount = Object.keys(selectedParts).length;
  let bundleDiscount = 0;
  if (selectedCount >= 4) bundleDiscount = 0.10; // 10% off for 4+ items
  else if (selectedCount >= 2) bundleDiscount = 0.05; // 5% off for 2+ items

  if (bundleDiscount > 0) {
    const discountedPrice = Math.floor(totalPrice * (1 - bundleDiscount));
    const bundleSavings = totalPrice - discountedPrice;
    totalPriceEl.innerHTML = `<span style="font-size:16px;text-decoration:line-through;opacity:0.5;margin-right:10px">Rs. ${totalPrice.toLocaleString('en-IN')}</span> Rs. ${discountedPrice.toLocaleString('en-IN')}`;
    totalSavingEl.innerHTML = `Total Saving: Rs. ${(saving + bundleSavings).toLocaleString('en-IN')} <span class="bundle-badge">✦ BUNDLE SAVINGS (${bundleDiscount*100}%)</span>`;
  } else {
    totalSavingEl.textContent = saving > 0 ? `Total Saving: Rs. ${saving.toLocaleString('en-IN')}` : '';
  }

  updateMannequinLayers();
  updateUrlHash();
}

function updateUrlHash() {
  const parts = Object.keys(selectedParts).map(z => `${z}:${selectedParts[z].id}`).join(',');
  if (parts) {
    window.history.replaceState(null, null, `#look=${parts}`);
  } else {
    window.history.replaceState(null, null, ' ');
  }
}

function loadFromHash() {
  const hash = window.location.hash;
  if (hash.startsWith('#look=')) {
    const partsStr = hash.replace('#look=', '');
    partsStr.split(',').forEach(pair => {
      const [zId, pId] = pair.split(':');
      const zone = outfitParts.zones[zId];
      if (zone) {
        const part = zone.parts.find(p => p.id === pId);
        if (part) selectedParts[zId] = part;
      }
    });
    renderTray();
    // Select first zone if possible
    const firstZone = Object.keys(selectedParts)[0];
    if (firstZone) selectZone(firstZone);
  }
}

function animatePrice(start, end, el) {
  let startTime = null;
  const duration = 600;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    el.textContent = `Rs. ${current.toLocaleString('en-IN')}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

function createTraySlot(item, label, isFilled, zoneId) {
  const div = document.createElement('div');
  div.className = 'tray-slot';
  div.innerHTML = `
    <div class="tray-slot-img ${isFilled ? 'filled' : ''}" 
         style="${isFilled ? `background:linear-gradient(145deg,${(item.gradient || item.gradientColors).join(',')})` : ''}"
         onclick="${zoneId ? `selectZone('${zoneId}')` : ''}">
      ${!isFilled ? `<span class="empty-icon">${getZoneIcon(label)}</span>` : ''}
    </div>
    <div class="tray-slot-label">${label}</div>
    ${isFilled ? `<div class="tray-slot-price">Rs. ${item.price.toLocaleString('en-IN')}</div>` : ''}
  `;
  return div;
}

function getZoneIcon(label) {
  if (label.includes('Jewellery')) return '💍';
  if (label.includes('Blouse'))    return '👚';
  if (label.includes('Footwear'))  return '👠';
  if (label.includes('Dupatta'))   return '🧣';
  if (label.includes('Safa'))      return '👑';
  if (label.includes('Bottom'))    return '👖';
  if (label.includes('Jacket'))    return '🥼';
  return '✦';
}

function clearTray() {
  const slots = document.querySelectorAll('.tray-slot-img.filled');
  slots.forEach(slot => slot.classList.add('poof-animation'));
  
  setTimeout(() => {
    selectedParts = {};
    renderTray();
    const activeZone = document.querySelector('.hotspot-pin.active')?.dataset.zone || 'saree';
    renderPartsList(activeZone);
  }, 400);
}

/* ── Tooltip logic ── */
function showZoneTooltip(e, zoneId) {
  const tip = document.getElementById('zone-tooltip');
  const zone = outfitParts.zones[zoneId];
  if (!tip || !zone) return;

  tip.textContent = zone.label;
  tip.classList.add('visible');

  const rect = e.target.getBoundingClientRect();
  const wrapRect = document.getElementById('silhouette-wrap').getBoundingClientRect();

  tip.style.left = `${(rect.left + rect.width/2) - wrapRect.left}px`;
  tip.style.top  = `${(rect.top - wrapRect.top) - 35}px`;
}

function hideZoneTooltip() {
  document.getElementById('zone-tooltip')?.classList.remove('visible');
}

/* ── Cart Integration ── */
function addTrayItemToCart(partId) {
  // Find part in data
  let part = null;
  Object.values(outfitParts.zones).forEach(z => {
    const found = z.parts?.find(p => p.id === partId);
    if (found) part = found;
  });

  if (part && window.cartAdd) {
    cartAdd({
      id: part.id,
      name: part.name,
      shortName: part.name,
      price: part.price,
      mrp: part.mrp,
      gradientColors: part.gradient,
      slug: part.slug || currentProduct.slug
    });
  }
}

function addCompleteOutfitToCart() {
  // Add main product
  if (window.cartAdd) {
    cartAdd(currentProduct);
    // Add selected parts
    Object.values(selectedParts).forEach(part => {
      cartAdd({
        id: part.id,
        name: part.name,
        shortName: part.name,
        price: part.price,
        mrp: part.mrp,
        gradientColors: part.gradient,
        slug: part.slug || currentProduct.slug
      });
    });
    showToast('Complete look added to your bag! ✦');
  }
}

function countMatches(arr1, arr2) {
  if (!arr1 || !arr2) return 0;
  return arr1.filter(value => arr2.includes(value)).length;
}

// Global exposure
window.selectZone = selectZone;
window.togglePartSelection = togglePartSelection;
window.addTrayItemToCart = addTrayItemToCart;

/* ── Initialization ── */
document.addEventListener('DOMContentLoaded', () => {
  const params  = new URLSearchParams(window.location.search);
  const slug    = params.get('slug');
  const product = getProductBySlug(slug);
  if (product) {
    initOutfitBuilder(product);
  }
});
