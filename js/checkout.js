let currentStep = 1;
let paymentMethod = null;

/* ── Step navigation ── */
function goToStep(n) {
  document.querySelectorAll('.form-section').forEach((s,i) => {
    s.classList.toggle('active', i+1===n);
  });
  document.querySelectorAll('.step-circle').forEach((c,i) => {
    c.classList.toggle('active', i+1===n);
    c.classList.toggle('done', i+1 < n);
    if (i+1 < n) c.innerHTML = '✓';
    else c.innerHTML = i+1;
  });
  document.querySelectorAll('.step-line').forEach((l,i) => {
    l.classList.toggle('done', i+1 < n);
  });
  document.querySelectorAll('.step-label').forEach((l,i) => {
    l.classList.toggle('active', i+1===n);
  });
  currentStep = n;
  window.scrollTo({ top:0, behavior:'smooth' });
}

/* ── Validation helpers ── */
const validators = {
  name:    v => v.trim().length >= 2,
  phone:   v => /^[6-9]\d{9}$/.test(v.trim()),
  email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  pincode: v => /^\d{6}$/.test(v.trim()),
  upi:     v => /^[\w.\-_]+@[\w]+$/.test(v.trim()),
  card:    v => v.replace(/\s/g,'').length >= 15, // Simple check
  expiry:  v => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v.trim()),
  cvv:     v => /^\d{3,4}$/.test(v.trim()),
  text:    v => v.trim().length >= 3,
};

function validateField(input, type) {
  const isValid = validators[type]?.(input.value) ?? true;
  input.classList.toggle('valid', isValid);
  input.classList.toggle('error', !isValid && input.value !== '');
  const errEl = input.parentElement.querySelector('.form-error');
  if (errEl) errEl.classList.toggle('show', !isValid && input.value !== '');
  return isValid;
}

function validateSection(sectionId) {
  const section = document.getElementById(sectionId);
  const inputs  = section.querySelectorAll('[data-validate]');
  let allValid  = true;
  inputs.forEach(inp => {
    if (!validateField(inp, inp.dataset.validate)) allValid = false;
  });
  return allValid;
}

/* Real-time validation on blur */
document.querySelectorAll('[data-validate]').forEach(inp => {
  inp.addEventListener('blur', () => validateField(inp, inp.dataset.validate));
  inp.addEventListener('input', () => {
    if (inp.classList.contains('error')) validateField(inp, inp.dataset.validate);
  });
});

/* Card number formatting */
document.getElementById('card-number')?.addEventListener('input', e => {
  let v = e.target.value.replace(/\D/g,'').slice(0,16);
  e.target.value = v.replace(/(.{4})/g,'$1 ').trim();
});

/* Expiry formatting */
document.getElementById('card-expiry')?.addEventListener('input', e => {
  let v = e.target.value.replace(/\D/g,'').slice(0,4);
  if (v.length >= 2) v = v.slice(0,2) + '/' + v.slice(2);
  e.target.value = v;
});

/* Payment card selection */
document.querySelectorAll('.payment-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.payment-card').forEach(c=>c.classList.remove('selected'));
    card.classList.add('selected');
    paymentMethod = card.dataset.payment;
    document.getElementById('btn-place-order').disabled = false;
  });
});

/* Step 1 continue */
document.getElementById('btn-step1')?.addEventListener('click', () => {
  if (validateSection('section-contact')) goToStep(2);
  else Toast.show('Please fill all required fields correctly', 'error');
});

/* Step 2 continue */
document.getElementById('btn-step2')?.addEventListener('click', () => {
  if (validateSection('section-delivery')) goToStep(3);
  else Toast.show('Please fill your delivery address completely', 'error');
});

/* Geolocation fill */
document.getElementById('btn-detect-location')?.addEventListener('click', () => {
  navigator.geolocation?.getCurrentPosition(async pos => {
    try {
      const { latitude: lat, longitude: lng } = pos.coords;
      const res  = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      const addr = data.address;
      const cityField = document.getElementById('field-city');
      const pinField = document.getElementById('field-pincode');
      const stateField = document.getElementById('field-state');
      
      if (cityField) cityField.value = addr.city || addr.town || addr.village || '';
      if (pinField) pinField.value = addr.postcode || '';
      if (stateField) stateField.value = addr.state || '';
      
      Toast.show('Location detected!', 'success');
    } catch { Toast.show('Could not detect location', 'error'); }
  }, () => Toast.show('Location permission denied', 'error'));
});

/* Place Order */
document.getElementById('btn-place-order')?.addEventListener('click', async () => {
  if (!paymentMethod) { Toast.show('Please select a payment method', 'error'); return; }
  const btn = document.getElementById('btn-place-order');
  btn.classList.add('loading');
  btn.textContent = 'Processing...';
  btn.disabled    = true;

  /* Simulate payment processing */
  await new Promise(r => setTimeout(r, 1800));

  /* Save order to localStorage */
  const orderId = 'HOU' + Date.now().toString().slice(-8);
  const intent  = JSON.parse(localStorage.getItem('urvaah-checkout-intent')||'{}');
  const order   = {
    orderId,
    items:         Cart.items,
    total:         intent.total || Cart.totalPrice,
    paymentMethod,
    status:        'Confirmed',
    placedAt:      new Date().toISOString(),
    deliveryDays:  paymentMethod === 'prepaid' ? '3-5' : '5-7',
    customerName:  document.getElementById('field-name')?.value || 'Customer',
    address:       {
      line1:   document.getElementById('field-address1')?.value || '',
      city:    document.getElementById('field-city')?.value     || '',
      state:   document.getElementById('field-state')?.value    || '',
      pincode: document.getElementById('field-pincode')?.value  || '',
    }
  };
  localStorage.setItem('urvaah-last-order', JSON.stringify(order));
  Cart.clear();

  window.location.href = `order-success.html?order=${orderId}`;
});

/* Load summary from cart intent */
function loadCheckoutSummary() {
  const intent = JSON.parse(localStorage.getItem('urvaah-checkout-intent')||'{}');
  const items  = intent.items || Cart.items;
  const sumEl  = document.getElementById('checkout-summary-items');
  if (!sumEl) return;
  sumEl.innerHTML = '';
  items.forEach(item => {
    const grad = item.gradientColors || item.gradient || ['#6B1F2A','#C9A84C'];
    sumEl.innerHTML += `
      <div style="display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid var(--border-default);">
        <div style="width:56px;height:64px;border-radius:8px;flex-shrink:0;
             background:linear-gradient(145deg,${grad.join(',')});background-size:400% 400%;
             animation:silkShimmer 5s ease infinite;"></div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:600;color:var(--text-primary);">${item.name}</div>
          <div style="font-size:12px;color:var(--text-muted);">Qty: ${item.quantity}</div>
          <div style="font-size:14px;font-weight:700;color:var(--gold);">${formatINR(item.price*item.quantity)}</div>
        </div>
      </div>`;
  });
  
  const subtotalEl = document.getElementById('chk-subtotal');
  const discountEl = document.getElementById('chk-discount');
  const shippingEl = document.getElementById('chk-shipping');
  const totalEl = document.getElementById('chk-total');
  const giftBadge = document.getElementById('gift-wrap-badge');
  
  if (subtotalEl) subtotalEl.textContent = formatINR(intent.subtotal||Cart.totalPrice);
  if (discountEl) discountEl.textContent = intent.couponDisc ? '- '+formatINR(intent.couponDisc) : '—';
  if (shippingEl) shippingEl.textContent = intent.shipping>0 ? formatINR(intent.shipping) : 'FREE ✓';
  if (totalEl) totalEl.textContent    = formatINR(intent.total||Cart.totalPrice);
  if (giftBadge && intent.giftWrap) giftBadge.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Cart.updateBadge();
  Wishlist.updateBadge();
  loadCheckoutSummary();
  goToStep(1);
});

window.goToStep = goToStep;
