/* ==========================================================================
   Meridian Cacao — Interactive Engine & Confectionery Suite
   - Header sticky effect & off-canvas mobile drawer
   - Interactive "Build Your Box" custom gift atelier
   - Real-time Cart Drawer with cold-pack calculation & quantity steppers
   - Wishlist toggle with live header badge
   - Search Modal Dialog with quick suggestions
   - Animate On Scroll (AOS) via IntersectionObserver
   - Toast feedback notifications (#added)
   - Newsletter submission handling
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Header Sticky Effect & Mobile Drawer ---------- */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  const mobileToggle = document.querySelector('#mobileMenuToggle, .mobile-toggle');
  const mobileDrawer = document.querySelector('#mobileNavDrawer, .mobile-drawer');
  const drawerOverlay = document.querySelector('#mobileDrawerOverlay, .mobile-drawer-overlay');
  const drawerClose = document.querySelector('#mobileDrawerClose, .drawer-close');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  // Close drawer on link clicks
  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });


  /* ---------- 2. Toast Notification Engine ---------- */
  const toast = document.getElementById('added');
  const toastMsg = document.getElementById('toastMessage');
  let toastTimeout = null;

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message || "Added to your sweet selection.";
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }


  /* ---------- 3. Cart Drawer & State Management ---------- */
  const cartDrawer = document.getElementById('cartDrawer');
  const cartTriggerBtn = document.getElementById('cartTriggerBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const cartCountBadge = document.getElementById('cartCountBadge');

  let cart = [
    {
      id: "madagascar-dark-70",
      name: "Madagascar Dark Chocolate 70%",
      price: 12.50,
      qty: 1,
      img: "assets/img/artisan/signature_truffles.jpg"
    }
  ];

  function openCart() {
    cartDrawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCart();
  }

  function closeCart() {
    cartDrawer?.classList.remove('open');
    document.body.style.overflow = '';
  }

  cartTriggerBtn?.addEventListener('click', openCart);
  closeCartBtn?.addEventListener('click', closeCart);

  // Close cart on backdrop click
  cartDrawer?.addEventListener('click', (e) => {
    if (e.target === cartDrawer) closeCart();
  });

  function updateCartBadge() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCountBadge) cartCountBadge.textContent = totalCount;
  }

  function renderCart() {
    updateCartBadge();
    if (!cartItemsContainer || !cartTotalPrice) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div style="text-align:center; padding: 4rem 1.5rem; color:#785f52;">
          <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.6;">🍫</div>
          <p style="font-family:var(--meridian-serif); font-size:1.4rem; color:var(--meridian-brown); margin-bottom:0.5rem;">Your Tasting Cart is Empty</p>
          <p style="font-size:0.92rem;">Explore our single-origin bars or build a custom gift box.</p>
        </div>
      `;
      cartTotalPrice.textContent = "$0.00";
      return;
    }

    let subtotal = 0;
    cartItemsContainer.innerHTML = cart.map((item, idx) => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      return `
        <div class="cart-item" style="display:flex; gap:1.25rem; align-items:center; padding:1.25rem 0; border-bottom:1px solid #ede1d3;">
          <img src="${item.img}" alt="${item.name}" style="width:68px; height:68px; object-fit:cover; border-radius:6px; border:1px solid #e3d3c2;">
          <div style="flex-grow:1;">
            <h4 style="font-family:var(--meridian-serif); font-size:1.05rem; font-weight:600; color:var(--meridian-brown); margin-bottom:0.25rem;">${item.name}</h4>
            <div style="font-size:0.85rem; color:#7e6557; margin-bottom:0.6rem;">$${item.price.toFixed(2)} each</div>
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <button class="cart-qty-btn" data-action="dec" data-idx="${idx}" style="width:26px; height:26px; border-radius:4px; border:1px solid #d5c3b1; background:#fbf8f4; cursor:pointer; font-weight:700;">−</button>
              <span style="font-size:0.9rem; font-weight:700; min-width:20px; text-align:center;">${item.qty}</span>
              <button class="cart-qty-btn" data-action="inc" data-idx="${idx}" style="width:26px; height:26px; border-radius:4px; border:1px solid #d5c3b1; background:#fbf8f4; cursor:pointer; font-weight:700;">+</button>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:700; color:var(--meridian-dark); font-size:1.05rem; margin-bottom:0.5rem;">$${itemTotal.toFixed(2)}</div>
            <button class="cart-remove-btn" data-idx="${idx}" style="background:none; border:none; color:#b0424a; font-size:0.8rem; cursor:pointer; text-decoration:underline;">Remove</button>
          </div>
        </div>
      `;
    }).join('');

    cartTotalPrice.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Handle Cart item increment, decrement, and remove
  document.addEventListener('click', (e) => {
    const qtyBtn = e.target.closest('.cart-qty-btn');
    if (qtyBtn) {
      const idx = parseInt(qtyBtn.getAttribute('data-idx'), 10);
      const action = qtyBtn.getAttribute('data-action');
      if (action === 'inc') {
        cart[idx].qty += 1;
      } else if (action === 'dec') {
        if (cart[idx].qty > 1) {
          cart[idx].qty -= 1;
        } else {
          cart.splice(idx, 1);
        }
      }
      renderCart();
      return;
    }

    const removeBtn = e.target.closest('.cart-remove-btn');
    if (removeBtn) {
      const idx = parseInt(removeBtn.getAttribute('data-idx'), 10);
      cart.splice(idx, 1);
      renderCart();
      showToast("Item removed from your cart.");
      return;
    }
  });

  // Add to Cart from Product Cards
  document.querySelectorAll('[data-add-item]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-add-item');
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price')) || 12.00;

      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          id,
          name,
          price,
          qty: 1,
          img: "assets/img/artisan/signature_truffles.jpg"
        });
      }
      renderCart();
      showToast(`Added "${name}" to your cart.`);
      openCart();
    });
  });

  updateCartBadge();


  /* ---------- 4. Wishlist Toggle Engine ---------- */
  let wishlist = new Set();
  const wishlistBadge = document.getElementById('wishlistCountBadge');

  document.querySelectorAll('[data-wishlist]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-wishlist');
      if (wishlist.has(id)) {
        wishlist.delete(id);
        btn.classList.remove('active');
        showToast("Removed item from your wishlist.");
      } else {
        wishlist.add(id);
        btn.classList.add('active');
        showToast("Saved to your personal chocolate wishlist ♥");
      }
      if (wishlistBadge) wishlistBadge.textContent = wishlist.size;
    });
  });


  /* ---------- 5. Inline In-Place Header Search & Auto-Suggest ---------- */
  const headerSearchWrap = document.getElementById('headerSearchWrap');
  const searchTriggerBtn = document.getElementById('searchTriggerBtn');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const siteSearchInput = document.getElementById('siteSearchInput');
  const searchLiveDropdown = document.getElementById('searchLiveDropdown');

  // Searchable catalog list combining signature products & confections
  const searchableCatalog = [
    { name: "Creamy Milk Chocolate 70g", brand: "Schmitten", price: "$4.50", category: "Milk Chocolate", img: "assets/img/schmitten/milk-chocolate.jpg", link: "orders.html" },
    { name: "Intense Dark Chocolate 70g", brand: "Schmitten", price: "$4.80", category: "Dark Chocolate", img: "assets/img/schmitten/dark-chocolate.jpg", link: "orders.html" },
    { name: "Dark Chocolate with Almond & Orange", brand: "Schmitten", price: "$5.20", category: "Dark & Fruit", img: "assets/img/schmitten/almond-orange.jpg", link: "orders.html" },
    { name: "Dark Chocolate with Roasted Almonds", brand: "Schmitten", price: "$5.00", category: "Nuts & Dark", img: "assets/img/schmitten/roasted-almonds.jpg", link: "orders.html" },
    { name: "Dark Chocolate with Cocoa Nibs", brand: "Schmitten", price: "$5.20", category: "Dark Chocolate", img: "assets/img/schmitten/cocoa-nibs.jpg", link: "orders.html" },
    { name: "Madagascar Single-Origin 70% Dark", brand: "Schmitten", price: "$6.50", category: "Single Origin", img: "assets/img/artisan/signature_truffles.jpg", link: "orders.html" },
    { name: "Hoppits Cookie Crush Nougat Bar", brand: "Hoppits", price: "$3.50", category: "Snack Bars", img: "assets/img/schmitten/cookie-crush.jpg", link: "orders.html" },
    { name: "Hoppits Roasted Nuts & Rice Crispies", brand: "Hoppits", price: "$3.50", category: "Snack Bars", img: "assets/img/schmitten/nuts-crispies.jpg", link: "orders.html" },
    { name: "Royal Connoisseur Gift Hamper", brand: "Schmitten", price: "$65.00", category: "Gift Boxes", img: "assets/img/artisan/corporate_wooden_chest.jpg", link: "orders.html" },
    { name: "Artisan Truffle Celebration Box", brand: "Schmitten", price: "$42.00", category: "Truffles", img: "assets/img/artisan/signature_truffles.jpg", link: "orders.html" },
    { name: "Luxury Bar Duo Celebration Combo", brand: "Schmitten", price: "$28.00", category: "Gift Boxes", img: "assets/img/artisan/luxury_gift_box.jpg", link: "orders.html" },
    { name: "Gourmet Roasted Hazelnut Cocoa Spread", brand: "Schmitten", price: "$12.00", category: "Spreads", img: "assets/img/schmitten/dark-chocolate.jpg", link: "orders.html" }
  ];

  function toggleInlineSearch() {
    if (!headerSearchWrap) return;
    const isActive = headerSearchWrap.classList.contains('active');
    if (isActive) {
      if (siteSearchInput && siteSearchInput.value.trim().length > 0) {
        window.location.href = 'orders.html';
      } else {
        closeInlineSearch();
      }
    } else {
      openInlineSearch();
    }
  }

  function openInlineSearch() {
    if (!headerSearchWrap) return;
    headerSearchWrap.classList.add('active');
    siteSearchInput?.focus();
    renderLiveSearchResults(siteSearchInput?.value || '');
  }

  function closeInlineSearch() {
    if (!headerSearchWrap) return;
    headerSearchWrap.classList.remove('active');
    if (siteSearchInput) siteSearchInput.value = '';
    if (searchLiveDropdown) searchLiveDropdown.style.display = 'none';
  }

  function escapeSearchHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
  }

  function renderLiveSearchResults(query) {
    if (!searchLiveDropdown) return;
    const q = (query || '').trim().toLowerCase();

    let matches = [];
    if (q.length === 0) {
      matches = searchableCatalog.slice(0, 4);
    } else {
      matches = searchableCatalog.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q)
      );
    }

    if (matches.length === 0) {
      searchLiveDropdown.innerHTML = `
        <div style="padding:1.25rem 1rem; text-align:center; color:#765d52; font-size:0.85rem;">
          No confections matching "<strong>${escapeSearchHtml(query)}</strong>".
          <div style="margin-top:0.5rem;"><a href="orders.html" style="color:var(--gold-copper); text-decoration:none; font-weight:600;">Browse all confections →</a></div>
        </div>
      `;
    } else {
      searchLiveDropdown.innerHTML = `
        <div style="padding:0.4rem 0.9rem 0.2rem; font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#9b8175;">
          ${q.length === 0 ? 'Popular Confections' : `Found ${matches.length} Results`}
        </div>
        ${matches.map(item => `
          <a href="${item.link}" class="search-result-item">
            <img src="${item.img}" alt="${escapeSearchHtml(item.name)}">
            <div class="search-result-info">
              <div class="search-result-title">${escapeSearchHtml(item.name)}</div>
              <div class="search-result-sub">${escapeSearchHtml(item.brand)} • ${escapeSearchHtml(item.category)}</div>
            </div>
            <div class="search-result-price">${escapeSearchHtml(item.price)}</div>
          </a>
        `).join('')}
        <div style="padding:0.6rem 0.9rem; text-align:center; background:#fdf9f5; border-top:1px solid #ebdcd0;">
          <a href="orders.html" style="font-size:0.78rem; font-weight:700; color:#35160d; text-decoration:none;">View All In Confectionery Shop →</a>
        </div>
      `;
    }

    searchLiveDropdown.style.display = 'block';
  }

  searchTriggerBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleInlineSearch();
  });

  closeSearchBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    closeInlineSearch();
  });

  siteSearchInput?.addEventListener('input', (e) => {
    renderLiveSearchResults(e.target.value);
  });

  siteSearchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      window.location.href = 'orders.html';
    }
  });

  document.addEventListener('click', (e) => {
    if (headerSearchWrap && !headerSearchWrap.contains(e.target)) {
      closeInlineSearch();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeInlineSearch();
      closeCart();
      closeDrawer();
    }
  });


  /* ---------- 6. Interactive Box Builder Engine ---------- */
  let customBox = {
    size: 16,
    price: 44.00,
    packaging: "Midnight Velvet",
    variety: "Chef Curated Harmony",
    message: "Wishing you timeless sweetness and unforgettable moments."
  };

  const boxCapacityLabel = document.getElementById('boxCapacityLabel');
  const boxPackagingName = document.getElementById('boxPackagingName');
  const customBoxPriceLabel = document.getElementById('customBoxPriceLabel');
  const messagePreviewText = document.getElementById('messagePreviewText');
  const builderMessageInput = document.getElementById('builderMessageInput');
  const boxVisualContainer = document.getElementById('boxVisualContainer');
  const btnBuildBoxCart = document.getElementById('btnBuildBoxCart');

  // Step 1: Size Selector
  document.querySelectorAll('#sizeSelectorGroup .builder-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#sizeSelectorGroup .builder-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      customBox.size = parseInt(btn.getAttribute('data-size'), 10);
      customBox.price = parseFloat(btn.getAttribute('data-price'));
      updateBoxBuilder();
    });
  });

  // Step 2: Packaging Style
  document.querySelectorAll('#packSelectorGroup .builder-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#packSelectorGroup .builder-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      customBox.packaging = btn.getAttribute('data-pack');
      updateBoxBuilder();
    });
  });

  // Step 3: Chocolate Variety
  document.querySelectorAll('#varietySelectorGroup .builder-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#varietySelectorGroup .builder-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      customBox.variety = btn.getAttribute('data-variety');
      updateBoxBuilder();
    });
  });

  // Step 4: Message input
  builderMessageInput?.addEventListener('input', (e) => {
    customBox.message = e.target.value.trim() || "Wishing you timeless sweetness and unforgettable moments.";
    if (messagePreviewText) messagePreviewText.textContent = `"${customBox.message}"`;
  });

  function updateBoxBuilder() {
    if (boxCapacityLabel) boxCapacityLabel.textContent = `${customBox.size} Pieces Selected`;
    if (boxPackagingName) boxPackagingName.textContent = `${customBox.packaging} Box`;
    if (customBoxPriceLabel) customBoxPriceLabel.textContent = `$${customBox.price.toFixed(2)}`;

    // Rebuild visual tray cells based on size
    const tray = boxVisualContainer?.querySelector('.box-selected-tray');
    if (tray) {
      const labels = ["70%", "Caramel", "Hazelnut", "Pistachio", "Truffle", "Espresso", "Berry", "Fleur", "Matcha", "Gold", "Orange", "Pecan"];
      let cells = '';
      const cols = customBox.size > 16 ? 6 : 4;
      tray.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      for (let i = 0; i < customBox.size; i++) {
        const lbl = labels[i % labels.length];
        cells += `<div class="tray-cell">${lbl}</div>`;
      }
      tray.innerHTML = cells;
    }
  }

  // Add Custom Box to Cart
  btnBuildBoxCart?.addEventListener('click', () => {
    const boxId = `custom-box-${Date.now()}`;
    const boxTitle = `Custom ${customBox.packaging} (${customBox.size} Pcs)`;
    cart.push({
      id: boxId,
      name: boxTitle,
      price: customBox.price,
      qty: 1,
      img: "assets/img/artisan/luxury_gift_box.jpg"
    });
    renderCart();
    showToast(`Crafted and added ${boxTitle} to your cart!`);
    openCart();
  });


  /* ---------- 7. Newsletter Form Handler ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail')?.value;
    showToast(`Thank you for subscribing, ${email}! Welcome to the Meridian Cacao loop.`);
    newsletterForm.reset();
  });


  /* ---------- 8. AOS Animation Engine ---------- */
  const aosElements = document.querySelectorAll('[data-aos]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    aosElements.forEach(el => observer.observe(el));
  } else {
    aosElements.forEach(el => el.classList.add('aos-animate'));
  }


  /* ---------- 9. Home 2: Interactive Terroir Sensory Flight ---------- */
  const terroirData = {
    madagascar: {
      flag: "🇲🇬",
      region: "Sambirano Valley, North Madagascar",
      name: "Madagascar Single-Estate 72%",
      story: "Cultivated in alluvial volcanic soil fed by the Sambirano River. Famous among world pastry chefs for its natural berry acidity, raspberry brilliance, and delicate pink pepper finish with zero added fruit flavors.",
      pairing: '"Pair with a chilled Speyside Single Malt or freshly extracted double-shot espresso to amplify the tart red currant finish."',
      fruit: "92%", roast: "68%", floral: "78%", earth: "45%", silk: "88%"
    },
    ghana: {
      flag: "🇬🇭",
      region: "Suhum Agroforest, Ashanti Belt",
      name: "Ghana Heritage Roast 75%",
      story: "Shade-grown beneath dense mahogany and plantain canopies. Offers an extraordinarily deep, classic dark chocolate foundation with warm tobacco, toasted hazelnuts, and allspice notes.",
      pairing: '"Pair with a dark roast Ethiopian Pour-Over or an aged dark rum to accentuate the toasted woody warmth."',
      fruit: "38%", roast: "95%", floral: "42%", earth: "89%", silk: "82%"
    },
    ecuador: {
      flag: "🇪🇨",
      region: "Esmeraldas Rainforest, Arriba Nacional",
      name: "Ecuador Arriba Floral 70%",
      story: "Directly descended from ancient heirloom Nacional cacao trees. Revered worldwide for its intoxicating floral bouquet of white jasmine, orange blossom, and raw forest wildflower honey.",
      pairing: '"Pair with an aromatic Riesling or floral Oolong tea to allow the fragrant jasmine blossoms to linger on the finish."',
      fruit: "65%", roast: "60%", floral: "96%", earth: "52%", silk: "90%"
    },
    peru: {
      flag: "🇵🇪",
      region: "Ucayali River Basin, Amazonian Peru",
      name: "Peru Wild Ucayali Harvest 82%",
      story: "Harvested by indigenous river communities along the Amazonian tributaries. Delivers silky notes of browned butter toffee, dried figs, passionfruit brightness, and gentle macadamia cream.",
      pairing: '"Pair with a 10-year Tawny Port or peat-forward Islay Scotch for a breathtaking contrast of dried dark fruits and sweet smoke."',
      fruit: "72%", roast: "84%", floral: "68%", earth: "74%", silk: "94%"
    }
  };

  const terroirTabs = document.querySelectorAll('#terroirTabsGroup .terroir-tab-btn');
  terroirTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terroirTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const origin = tab.dataset.origin;
      const data = terroirData[origin];
      if (!data) return;

      const flagEl = document.getElementById('terroirFlag');
      const regEl = document.getElementById('terroirRegion');
      const nameEl = document.getElementById('terroirName');
      const storyEl = document.getElementById('terroirStory');
      const pairEl = document.getElementById('terroirPairing');

      if (flagEl) flagEl.textContent = data.flag;
      if (regEl) regEl.textContent = data.region;
      if (nameEl) nameEl.textContent = data.name;
      if (storyEl) storyEl.textContent = data.story;
      if (pairEl) pairEl.textContent = data.pairing;

      // Update Meters
      const meterFruit = document.getElementById('meterFruit');
      const meterRoast = document.getElementById('meterRoast');
      const meterFloral = document.getElementById('meterFloral');
      const meterEarth = document.getElementById('meterEarth');
      const meterSilk = document.getElementById('meterSilk');

      if (meterFruit) meterFruit.style.width = data.fruit;
      if (meterRoast) meterRoast.style.width = data.roast;
      if (meterFloral) meterFloral.style.width = data.floral;
      if (meterEarth) meterEarth.style.width = data.earth;
      if (meterSilk) meterSilk.style.width = data.silk;

      const valFruit = document.getElementById('meterFruitVal');
      const valRoast = document.getElementById('meterRoastVal');
      const valFloral = document.getElementById('meterFloralVal');
      const valEarth = document.getElementById('meterEarthVal');
      const valSilk = document.getElementById('meterSilkVal');

      if (valFruit) valFruit.textContent = data.fruit;
      if (valRoast) valRoast.textContent = data.roast;
      if (valFloral) valFloral.textContent = data.floral;
      if (valEarth) valEarth.textContent = data.earth;
      if (valSilk) valSilk.textContent = data.silk;
    });
  });


  /* ---------- 10. Home 2: Sommelier Pairing Lounge ---------- */
  const pairingData = {
    whiskey: {
      badge: "SPIRIT PAIRING #1",
      title: "Islay Peated Single Malt × 74% Smoked Sea Salt Dark Truffle",
      desc: "The bold smoky peat and maritime brine of an aged Islay whiskey cuts cleanly through the unctuous single-estate cocoa butter, allowing hidden notes of toasted macadamia and dried apricots to bloom on the palate.",
      ritual: "Take a small sip of whiskey, allow it to coat the tongue, place a bite of the truffle on the palate, and let the cocoa butter melt naturally without chewing."
    },
    port: {
      badge: "WINE PAIRING #2",
      title: "20-Year Tawny Port × 70% Dark Berry Ganache & Spiced Fig",
      desc: "The oxidized walnut, raisin, and caramel nuances of aged Portuguese Port harmonize effortlessly with our high-acid Madagascar dark chocolate, creating an opulent blackberry jam resonance.",
      ritual: "Sip port first, take a half piece of truffle, gently exhale through the nose as the dark berry acidity marries the tawny dried fig notes."
    },
    espresso: {
      badge: "SPECIALTY COFFEE PAIRING #3",
      title: "Ethiopian Yirgacheffe Espresso × 65% Gianduja Hazelnut Praline",
      desc: "The bright bergamot and jasmine lemon acidity of light-roast Ethiopian coffee lifts the buttery, nutty richness of Piedmont roasted hazelnut paste and silky milk chocolate.",
      ritual: "Enjoy a sip of warm crema, let the hazelnut praline melt over the tongue, then finish with a sip of sparkling mineral water."
    },
    tea: {
      badge: "BOTANICAL TEA PAIRING #4",
      title: "First-Flush Darjeeling × 68% Orange Blossom & Saffron Bonbon",
      desc: "Often hailed as the Champagne of teas, muscatel grape and floral Darjeeling tea elevates the delicate amber saffron threads and Seville orange peel encased in crisp dark chocolate.",
      ritual: "Steep tea to light amber, taste the saffron bonbon gently, and savor the botanical warmth lingering across your palate."
    }
  };

  const pairingTabs = document.querySelectorAll('#pairingTabsGroup .pairing-tab-btn');
  pairingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      pairingTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const pairKey = tab.dataset.pair;
      const pData = pairingData[pairKey];
      if (!pData) return;

      const pBadge = document.getElementById('pairCategoryBadge');
      const pTitle = document.getElementById('pairTitle');
      const pDesc = document.getElementById('pairDescription');
      const pRitual = document.getElementById('pairRitual');

      if (pBadge) pBadge.textContent = pData.badge;
      if (pTitle) pTitle.textContent = pData.title;
      if (pDesc) pDesc.textContent = pData.desc;
      if (pRitual) pRitual.textContent = pData.ritual;
    });
  });


  /* ---------- 11. Home 2: Sensory Profiler Quiz ---------- */
  let quizQ1 = "sweet";
  let quizQ2 = "fruity";

  const quizMap = {
    "sweet-fruity": {
      title: "The Velvety Orchard: 45% Milk Chocolate with Raspberry Fleur de Sel",
      desc: "Your palate appreciates luscious, creamy textures infused with tart berries and gentle salinity to balance sweetness."
    },
    "sweet-nutty": {
      title: "The Golden Gianduja: 52% Hazelnut Praline & Brown Butter Rocher",
      desc: "You love toasted nutty comforts, roasted hazelnut crunch, and smooth caramelized cocoa butter harmonies."
    },
    "sweet-smoky": {
      title: "The Amber Hearth: 55% Smoked Sea Salt Dark Milk Bar",
      desc: "A rich interplay between silky caramel sweetness and subtle hickory wood smoke for an unforgettable comforting finish."
    },
    "balanced-fruity": {
      title: "The Vibrant Epilogue: 72% Madagascar Sambirano Ganache",
      desc: "Your palate craves bright, energetic fruit acids balanced by silky stone-ground cacao with natural berry brilliance."
    },
    "balanced-nutty": {
      title: "The Artisan Reserve: 70% Ghana Cocoa with Roasted Valencia Almonds",
      desc: "Crisp roasted nuts suspended in dark chocolate boasting classic warm cocoa body and toasted tobacco accents."
    },
    "balanced-smoky": {
      title: "The Connoisseur Cask: 74% Bourbon Barrel Aged Dark Bonbon",
      desc: "Deep cocoa tannins conditioned in charred white oak barrels, releasing aromatic vanilla and roasted barrel warmth."
    },
    "bold-fruity": {
      title: "The Amazonian Dawn: 82% Peru Ucayali Wild Harvest Dark Bar",
      desc: "An uncompromising high-cacao adventure displaying wild passionfruit brightness and intense heirloom chocolate power."
    },
    "bold-nutty": {
      title: "The Black Forest Reserve: 85% Wild Beniano Criollo with Cocoa Nibs",
      desc: "Robust, earth-shaking dark cocoa depth studded with raw roasted nibs for maximum sensory crunch and pure antioxidant vigor."
    },
    "bold-smoky": {
      title: "The Obsidian Monolith: 88% Smoked Cocoa & Sea Salt Dark Tablet",
      desc: "For the purist: dense, brooding single-origin dark chocolate layered with volcanic mineral sea salt and oak smoke."
    }
  };

  function updateQuizResult() {
    const key = `${quizQ1}-${quizQ2}`;
    const result = quizMap[key] || quizMap["balanced-fruity"];
    const rTitle = document.getElementById('quizResultTitle');
    const rDesc = document.getElementById('quizResultDesc');
    if (rTitle) rTitle.textContent = result.title;
    if (rDesc) rDesc.textContent = result.desc;
  }

  const q1Buttons = document.querySelectorAll('#quizStep1Group .quiz-opt-btn');
  q1Buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      q1Buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      quizQ1 = btn.dataset.q1;
      updateQuizResult();
    });
  });

  const q2Buttons = document.querySelectorAll('#quizStep2Group .quiz-opt-btn');
  q2Buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      q2Buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      quizQ2 = btn.dataset.q2;
      updateQuizResult();
    });
  });


  /* ---------- 12. Services: Inquiry Pre-Selection & Smooth Scroll ---------- */
  const serviceInquireBtns = document.querySelectorAll('[data-service-select]');
  const serviceSelectDropdown = document.getElementById('ServiceCategory');
  const inquiryCard = document.getElementById('inquiryFormCard');

  serviceInquireBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedService = btn.dataset.serviceSelect;
      if (serviceSelectDropdown && selectedService) {
        // Find matching option
        for (let i = 0; i < serviceSelectDropdown.options.length; i++) {
          if (serviceSelectDropdown.options[i].value.toLowerCase().includes(selectedService.toLowerCase().substring(0, 10)) ||
              serviceSelectDropdown.options[i].text.toLowerCase().includes(selectedService.toLowerCase().substring(0, 10))) {
            serviceSelectDropdown.selectedIndex = i;
            break;
          }
        }
      }

      if (inquiryCard) {
        inquiryCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast(`Selected "${selectedService}". Kindly fill the details below.`);
      }
    });
  });


  /* ---------- 13. Collection / Corporate Gifting Page Interactive Engine ---------- */

  // 13.1 Hide / Show Filter Sidebar Toggle
  const btnToggleFilter = document.getElementById('btnToggleFilter');
  const hideFilterText = document.getElementById('hideFilterText');
  const ordersLayoutContainer = document.getElementById('ordersLayoutContainer');
  const filterSidebar = document.getElementById('filterSidebar');

  btnToggleFilter?.addEventListener('click', () => {
    const isCollapsed = filterSidebar?.classList.toggle('collapsed');
    ordersLayoutContainer?.classList.toggle('filter-collapsed', isCollapsed);
    if (hideFilterText) {
      hideFilterText.textContent = isCollapsed ? 'Show Filter' : 'Hide Filter';
    }
    showToast(isCollapsed ? 'Filter hidden — expanded to full view.' : 'Filter sidebar enabled.');
  });


  // 13.2 Sort By Dropdown & Dynamic Ordering
  const btnSortTrigger = document.getElementById('btnSortTrigger');
  const sortDropdownWrap = document.getElementById('sortDropdownWrap');
  const currentSortLabel = document.getElementById('currentSortLabel');
  const sortLinks = document.querySelectorAll('#sortDropdownMenu a[data-sort]');

  btnSortTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    sortDropdownWrap?.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!sortDropdownWrap?.contains(e.target)) {
      sortDropdownWrap?.classList.remove('open');
    }
  });

  function applySort(type) {
    const grid = document.getElementById('ordersProductsGrid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.schmitten-card'));
    cards.sort((a, b) => {
      const priceA = parseFloat(a.getAttribute('data-price')) || 0;
      const priceB = parseFloat(b.getAttribute('data-price')) || 0;
      const nameA = (a.getAttribute('data-name') || '').toLowerCase();
      const nameB = (b.getAttribute('data-name') || '').toLowerCase();

      if (type === 'phl') return priceB - priceA;
      if (type === 'plh') return priceA - priceB;
      if (type === 'az') return nameA.localeCompare(nameB);
      if (type === 'za') return nameB.localeCompare(nameA);
      return 0;
    });
    cards.forEach(card => grid.appendChild(card));
  }

  sortLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sortType = link.getAttribute('data-sort');
      const sortText = link.textContent.trim();
      if (currentSortLabel) currentSortLabel.textContent = sortText;
      sortDropdownWrap?.classList.remove('open');
      applySort(sortType);
      showToast(`Sorted: ${sortText}`);
    });
  });


  // 13.3 Filter Accordion Header Toggles
  const accordionHeaders = document.querySelectorAll('.filter-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.filter-accordion-item');
      if (item) {
        item.classList.toggle('open');
      }
    });
  });


  // 13.4 Live Product Filtering Engine
  function filterProducts() {
    const selectedCat = document.querySelector('input[name="catFilter"]:checked')?.value || 'all';
    const selectedBrand = document.querySelector('input[name="brandFilter"]:checked')?.value || 'all';
    const selectedFlavour = document.querySelector('input[name="flavourFilter"]:checked')?.value || 'all';
    const selectedPrice = document.querySelector('input[name="priceRangeFilter"]:checked')?.value || 'all';
    
    const checkedOccasions = Array.from(document.querySelectorAll('input[name="occasion"]:checked')).map(cb => cb.value);

    const cards = document.querySelectorAll('#ordersProductsGrid .schmitten-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const cCat = card.getAttribute('data-category') || '';
      const cBrand = card.getAttribute('data-brand') || '';
      const cFlavour = card.getAttribute('data-flavour') || '';
      const cPrice = parseFloat(card.getAttribute('data-price')) || 0;
      const cOccasion = card.getAttribute('data-occasion') || '';

      let match = true;

      // Category match
      if (selectedCat !== 'all' && cCat !== selectedCat) match = false;

      // Brand match
      if (selectedBrand !== 'all' && cBrand.toLowerCase() !== selectedBrand.toLowerCase()) match = false;

      // Flavour match
      if (selectedFlavour !== 'all' && !cFlavour.includes(selectedFlavour)) match = false;

      // Price match
      if (selectedPrice === 'under-100' && cPrice >= 100) match = false;
      if (selectedPrice === '100-300' && (cPrice < 100 || cPrice > 300)) match = false;
      if (selectedPrice === 'above-300' && cPrice <= 300) match = false;

      // Occasion match
      if (checkedOccasions.length > 0) {
        const hasOccasion = checkedOccasions.some(occ => cOccasion.includes(occ));
        if (!hasOccasion) match = false;
      }

      if (match) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const countEl = document.getElementById('activeProductCount');
    if (countEl) countEl.textContent = visibleCount;
  }

  // Attach live listeners to all radio buttons and checkboxes
  document.querySelectorAll('input[name="catFilter"], input[name="brandFilter"], input[name="flavourFilter"], input[name="priceRangeFilter"], input[name="occasion"]').forEach(input => {
    input.addEventListener('change', filterProducts);
  });

  // Category quick pills sync
  document.querySelectorAll('[data-cat-pill]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('[data-cat-pill]').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const catVal = pill.getAttribute('data-cat-pill');
      const radio = document.querySelector(`input[name="catFilter"][value="${catVal}"]`);
      if (radio) {
        radio.checked = true;
        filterProducts();
      }
    });
  });

  // Reset filters button
  document.getElementById('btnResetFilters')?.addEventListener('click', () => {
    const defaultRadios = document.querySelectorAll('input[name="catFilter"][value="all"], input[name="brandFilter"][value="all"], input[name="flavourFilter"][value="all"], input[name="priceRangeFilter"][value="all"]');
    defaultRadios.forEach(r => r.checked = true);
    document.querySelectorAll('input[name="occasion"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('[data-cat-pill]').forEach(p => p.classList.remove('active'));
    document.querySelector('[data-cat-pill="all"]')?.classList.add('active');
    filterProducts();
    showToast('Filters reset to show all luxury confections.');
  });


  // 13.5 Quick View Modal Dialog Engine
  const quickViewModal = document.getElementById('quickViewModal');
  const closeQuickViewModal = document.getElementById('closeQuickViewModal');
  const qvImage = document.getElementById('qvImage');
  const qvBrand = document.getElementById('qvBrand');
  const qvTitle = document.getElementById('qvTitle');
  const qvPrice = document.getElementById('qvPrice');
  const qvDesc = document.getElementById('qvDesc');
  const qvCocoa = document.getElementById('qvCocoa');
  const qvWeight = document.getElementById('qvWeight');
  const qvAddToCartBtn = document.getElementById('qvAddToCartBtn');
  let currentQuickViewProduct = null;

  function openQuickView(card) {
    if (!quickViewModal || !card) return;
    const id = card.getAttribute('data-id');
    const name = card.getAttribute('data-name');
    const price = parseFloat(card.getAttribute('data-price')) || 80;
    const brand = card.getAttribute('data-brand') || 'Schmitten';
    const img = card.getAttribute('data-img') || 'assets/img/schmitten/prod-creamy-milk.webp';
    const desc = card.getAttribute('data-desc') || '';
    const cocoa = card.getAttribute('data-cocoa') || 'Artisanal Blend';
    const weight = card.getAttribute('data-weight') || '70g';

    currentQuickViewProduct = { id, name, price, img };

    if (qvImage) qvImage.src = img;
    if (qvBrand) qvBrand.textContent = brand.toUpperCase();
    if (qvTitle) qvTitle.textContent = name;
    if (qvPrice) qvPrice.textContent = `Rs. ${price}`;
    if (qvDesc) qvDesc.textContent = desc;
    if (qvCocoa) qvCocoa.textContent = cocoa;
    if (qvWeight) qvWeight.textContent = weight;

    quickViewModal.classList.add('show');
    quickViewModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    if (!quickViewModal) return;
    quickViewModal.classList.remove('show');
    quickViewModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeQuickViewModal?.addEventListener('click', closeQuickView);
  quickViewModal?.addEventListener('click', (e) => {
    if (e.target === quickViewModal) closeQuickView();
  });

  // Handle Quick View & Add to Cart clicks from Product Cards
  document.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('[data-view-info]');
    if (viewBtn) {
      e.preventDefault();
      const card = viewBtn.closest('.schmitten-card');
      if (card) openQuickView(card);
      return;
    }

    const addCartBtn = e.target.closest('[data-add-cart]');
    if (addCartBtn) {
      e.preventDefault();
      const card = addCartBtn.closest('.schmitten-card');
      if (card) {
        const id = card.getAttribute('data-id');
        const name = card.getAttribute('data-name');
        const price = parseFloat(card.getAttribute('data-price')) || 80;
        const img = card.getAttribute('data-img') || 'assets/img/schmitten/prod-creamy-milk.webp';

        const existing = cart.find(item => item.id === id);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({ id, name, price, qty: 1, img });
        }
        renderCart();
        showToast(`Added "${name}" to your cart.`);
        openCart();
      }
      return;
    }
  });

  qvAddToCartBtn?.addEventListener('click', () => {
    if (!currentQuickViewProduct) return;
    const { id, name, price, img } = currentQuickViewProduct;
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, price, qty: 1, img });
    }
    renderCart();
    closeQuickView();
    showToast(`Added "${name}" to your sweet selection.`);
    openCart();
  });

});

