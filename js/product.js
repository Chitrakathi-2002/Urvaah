// Product Page Logic
const urlParams = new URLSearchParams(window.location.search);
const productSlug = urlParams.get('slug');
const currentProduct = getProductBySlug(productSlug);

if (!currentProduct) {
  window.location.href = 'index.html';
}

function initProductPage() {
  addToRecentlyViewed(currentProduct);
  renderProductDetails();
  renderGallery();
  initUrgencySignals();
  initZoom();
}

function renderProductDetails() {
  document.title = `${currentProduct.name} | House of Urvaah`;
  document.getElementById('product-name').innerText = currentProduct.name;
  document.getElementById('product-tagline').innerText = currentProduct.tagline;
  document.getElementById('current-price').innerText = `Rs. ${currentProduct.price.toLocaleString()}`;
  document.getElementById('mrp').innerText = `Rs. ${currentProduct.mrp.toLocaleString()}`;
  document.getElementById('discount').innerText = `-${currentProduct.discount}% OFF`;
  document.getElementById('product-story').innerText = currentProduct.story;
  document.getElementById('breadcrumb').innerText = `Home / ${currentProduct.category} / ${currentProduct.subCategory} / ${currentProduct.shortName}`;

  // Colour Variants
  const colourContainer = document.getElementById('colour-selector');
  if (colourContainer && currentProduct.colorVariants) {
    colourContainer.innerHTML = '';
    currentProduct.colorVariants.forEach(variant => {
      const dot = document.createElement('div');
      dot.className = `colour-dot ${variant.active ? 'active' : ''}`;
      dot.style.background = `linear-gradient(135deg, ${variant.gradient.join(', ')})`;
      dot.onclick = () => {
        if (!variant.active) window.location.href = `product.html?slug=${variant.slug}`;
      };
      colourContainer.appendChild(dot);
    });
  }
}

function renderGallery() {
  const thumbStrip = document.getElementById('thumbnail-strip');
  const mainView = document.getElementById('main-view');
  
  thumbStrip.innerHTML = '';
  currentProduct.images.forEach((img, idx) => {
    const thumb = document.createElement('div');
    thumb.className = `thumb ${idx === 0 ? 'active' : ''}`;
    thumb.innerHTML = img.url 
      ? `<img src="${img.url}" style="width: 100%; height: 100%; object-fit: cover;">`
      : `<div style="width: 100%; height: 100%; background: linear-gradient(135deg, ${img.gradient.join(', ')})" class="shimmer"></div>`;
    
    thumb.onclick = () => {
      document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      setMainImage(img);
    };
    thumbStrip.appendChild(thumb);
  });

  setMainImage(currentProduct.images[0]);
}

function setMainImage(img) {
  const mainView = document.getElementById('main-view');
  const imgHtml = img.url 
    ? `<img id="zoom-img" src="${img.url}" style="width: 100%; height: 100%; object-fit: cover;">`
    : `<div style="width: 100%; height: 100%; background: linear-gradient(135deg, ${img.gradient.join(', ')})" class="shimmer"></div>`;
  mainView.innerHTML = imgHtml;
  initZoom(); // Re-init zoom for new image
}

function initUrgencySignals() {
  // Stock Bar
  const stockCountEl = document.getElementById('stock-count');
  stockCountEl.innerText = `Only ${currentProduct.stockCount} left in stock`;
  
  // Simulated Viewers
  let viewers = currentProduct.recentlyViewed;
  const viewerEl = document.createElement('div');
  viewerEl.style.fontSize = '12px';
  viewerEl.style.color = 'var(--text-muted)';
  viewerEl.style.marginTop = '10px';
  viewerEl.innerHTML = `<strong>${viewers}</strong> people are viewing this right now`;
  document.getElementById('urgency-signals').appendChild(viewerEl);

  setInterval(() => {
    viewers += Math.floor(Math.random() * 3) - 1;
    viewerEl.innerHTML = `<strong>${viewers}</strong> people are viewing this right now`;
  }, 5000);
}

function initZoom() {
  const mainView = document.getElementById('main-view');
  const img = document.getElementById('zoom-img');
  if (!img) return;

  mainView.onmousemove = (e) => {
    const { left, top, width, height } = mainView.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = 'scale(2)';
  };

  mainView.onmouseleave = () => {
    img.style.transform = 'scale(1)';
  };
}

// Event Listeners
document.getElementById('add-to-cart-btn')?.addEventListener('click', () => {
  addToCart(currentProduct);
});

document.getElementById('wishlist-btn')?.addEventListener('click', () => {
  toggleWishlist(currentProduct);
});

initProductPage();
lucide.createIcons();
