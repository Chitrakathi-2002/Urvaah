// Global State Management (LocalStorage)
const state = {
  cart: JSON.parse(localStorage.getItem('urvaah_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('urvaah_wishlist')) || [],
  recentlyViewed: JSON.parse(localStorage.getItem('urvaah_recent')) || [],
};

function saveState() {
  localStorage.setItem('urvaah_cart', JSON.stringify(state.cart));
  localStorage.setItem('urvaah_wishlist', JSON.stringify(state.wishlist));
  localStorage.setItem('urvaah_recent', JSON.stringify(state.recentlyViewed));
  updateUI();
}

function updateUI() {
  const cartCounts = document.querySelectorAll('.cart-count');
  const wishlistCounts = document.querySelectorAll('.wishlist-count');
  
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  
  cartCounts.forEach(el => {
    el.innerText = totalItems;
    el.style.display = totalItems > 0 ? 'flex' : 'none';
  });

  wishlistCounts.forEach(el => {
    el.innerText = state.wishlist.length;
    el.style.display = state.wishlist.length > 0 ? 'flex' : 'none';
  });
}

// Actions
function addToCart(product) {
  const existing = state.cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }
  saveState();
  showToast(`${product.shortName} added to cart!`);
}

function toggleWishlist(product) {
  const idx = state.wishlist.findIndex(item => item.id === product.id);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast('Removed from wishlist');
  } else {
    state.wishlist.push(product);
    showToast('Added to wishlist');
  }
  saveState();
}

function addToRecentlyViewed(product) {
  state.recentlyViewed = [product, ...state.recentlyViewed.filter(p => p.id !== product.id)].slice(0, 10);
  saveState();
}

// Toast System
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  
  // Navbar scroll effect
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.onclick = () => {
      mobileMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    };
  }
});
