document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();

  /* Read order */
  const order = JSON.parse(localStorage.getItem('urvaah-last-order') || '{}');
  if (!order.orderId) { 
    // Fallback if no order found
    const displayId = document.getElementById('order-id-display');
    if (displayId) displayId.textContent = '#HOU' + Date.now().toString().slice(-8);
  } else {
    /* Populate order details */
    const idEl = document.getElementById('order-id-display');
    const custEl = document.getElementById('order-customer');
    const addrEl = document.getElementById('order-address');
    const payEl = document.getElementById('order-payment');
    const delEl = document.getElementById('order-delivery');
    const totEl = document.getElementById('order-total');

    if (idEl) idEl.textContent = '#' + order.orderId;
    if (custEl) custEl.textContent   = order.customerName || 'Customer';
    if (addrEl) addrEl.textContent    = `${order.address?.line1||''}, ${order.address?.city||''}, ${order.address?.state||''} — ${order.address?.pincode||''}`;
    if (payEl) payEl.textContent = order.paymentMethod === 'cod' ? 'Cash on Delivery' : '✓ Online Payment';
    if (delEl) delEl.textContent = order.deliveryDays + ' Business Days';
    if (totEl) totEl.textContent = formatINR(order.total||0);

    /* Order items */
    const itemsEl = document.getElementById('order-items-list');
    if (itemsEl) {
      (order.items||[]).forEach(item => {
        itemsEl.innerHTML += `<div class="order-row">
          <span>${item.name} × ${item.quantity}</span>
          <strong>${formatINR(item.price * item.quantity)}</strong>
        </div>`;
      });
    }
  }

  /* Copy order ID */
  document.getElementById('order-id-display')?.addEventListener('click', () => {
    const text = document.getElementById('order-id-display').textContent.replace('#','');
    navigator.clipboard?.writeText(text);
    Toast.show('Order ID copied!', 'success', 1500);
  });

  /* Track via WhatsApp */
  document.getElementById('btn-track-order')?.addEventListener('click', () => {
    const id = order.orderId || 'NEW';
    const msg = encodeURIComponent(`Hi House of Urvaah! I'd like to track my order #${id}. 🙏`);
    window.open(`https://wa.me/91XXXXXXXXXX?text=${msg}`, '_blank');
  });

  /* Share on WhatsApp */
  document.getElementById('btn-share-order')?.addEventListener('click', () => {
    const msg = encodeURIComponent(`Just ordered from House of Urvaah! 🎉 Beautiful handcrafted ethnic wear.\nShop here: https://houseofurvaah.com`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  });

  /* Confetti burst */
  launchConfetti();

  /* Load recommendations */
  const track = document.getElementById('success-reco-track');
  if (track && typeof createRecoCard === 'function') {
    const firstProduct = (order.items && order.items[0]) ? PRODUCTS.find(p => p.id === order.items[0].id) : PRODUCTS[0];
    const recos = PRODUCTS.filter(p => p.id !== (firstProduct?.id)).slice(0, 4);
    recos.forEach((p, i) => {
      track.appendChild(createRecoCard(p, i));
    });
  }
});

function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const colors = ['#C9A84C','#F0D080','#6B1F2A','#E8B4B8','#2D9B6E','#F5EDD6','#7B5CF0'];
  const pieces = Array.from({length:130}, () => ({
    x:  width  * Math.random(),
    y:  height * Math.random() - height,
    w:  Math.random() * 10 + 5,
    h:  Math.random() * 5  + 3,
    vx: (Math.random()-.5) * 5,
    vy: Math.random() * 4  + 2,
    rot: Math.random() * 360,
    rotV: (Math.random()-.5) * 6,
    color: colors[Math.floor(Math.random()*colors.length)],
    alpha: 1,
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);
    let alive = false;
    pieces.forEach(p => {
      if (p.alpha <= 0) return;
      alive = true;
      p.x   += p.vx;
      p.y   += p.vy;
      p.vy  += 0.12;   
      p.rot += p.rotV;
      if (p.y > height * 0.7) p.alpha -= 0.018;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle   = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });
    if (alive) requestAnimationFrame(draw);
    else canvas.remove();
  }
  setTimeout(() => requestAnimationFrame(draw), 800);
}
