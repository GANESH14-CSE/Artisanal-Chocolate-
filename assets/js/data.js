/* ==========================================================================
   Meridian Cacao — Artisanal Chocolatier & Confections
   Global Product, Story, and Interaction Data Model
   ========================================================================== */

window.MC = window.MC || {};

MC.brand = {
  name: "Meridian Cacao",
  tagline: "Artisanal Chocolatier & Confections",
  est: "2018",
  founderNames: "Julian Vance & Clara Thorne",
  contactEmail: "concierge@meridiancacao.com",
  phone: "+1 (800) 492-7220",
  address: "44 Artisans Way, Hudson Valley, NY 12534"
};

MC.signatureProducts = [
  {
    id: "madagascar-dark-70",
    name: "Madagascar Dark Chocolate 70%",
    category: "Dark & Rich",
    flavour: "Wild Raspberry & Citrus Blossom",
    cocoaPct: "70% Cocoa",
    price: 12.50,
    rating: 4.9,
    reviews: 148,
    badge: "Single Origin",
    img: "assets/img/artisan/signature_truffles.jpg",
    desc: "Single-estate Criollo cacao from the Sambirano Valley. Naturally bright with notes of summer red berries and wild forest honey.",
    weight: "80g Bar"
  },
  {
    id: "hazelnut-crunch",
    name: "Hazelnut Crunch Praline",
    category: "Nutty & Crunchy",
    flavour: "Roasted Piedmont Hazelnuts & Milk Cocoa",
    cocoaPct: "48% Cocoa",
    price: 11.00,
    rating: 4.8,
    reviews: 112,
    badge: "Award Winner",
    img: "assets/img/artisan/signature_truffles.jpg",
    desc: "Slow-roasted Italian IGP hazelnuts ground into silky golden praline and folded with crispy feuilletine wafers.",
    weight: "80g Bar"
  },
  {
    id: "sea-salt-caramel",
    name: "Sea Salt Caramel Dome",
    category: "Caramel & Sweet",
    flavour: "Guerande Fleur de Sel & Velvet Dark Shell",
    cocoaPct: "65% Cocoa",
    price: 13.50,
    rating: 5.0,
    reviews: 236,
    badge: "Bestseller",
    img: "assets/img/artisan/signature_truffles.jpg",
    desc: "Slow-simmered browned butter caramel finished with mineral sea salt, encased in a mirror-finish 65% chocolate sphere.",
    weight: "Box of 6"
  },
  {
    id: "pistachio-delight",
    name: "Pistachio Delight Bonbon",
    category: "Exotic Flavors",
    flavour: "Bronte Pistachio & Ivory Vanilla Cream",
    cocoaPct: "38% Cocoa",
    price: 14.00,
    rating: 4.9,
    reviews: 94,
    badge: "Chef's Pick",
    img: "assets/img/artisan/signature_truffles.jpg",
    desc: "Sicilian green pistachios stone-ground with Madagascar Bourbon vanilla into an unctuous white chocolate ganache.",
    weight: "Box of 6"
  },
  {
    id: "classic-milk",
    name: "Classic Milk Chocolate 42%",
    category: "Caramel & Sweet",
    flavour: "Alpine Whole Cream & Toasted Caramel",
    cocoaPct: "42% Cocoa",
    price: 10.50,
    rating: 4.8,
    reviews: 165,
    badge: "Signature",
    img: "assets/img/artisan/signature_truffles.jpg",
    desc: "Harmonious Venezuelan cocoa paired with non-GMO meadow milk cream. Melt-in-your-mouth richness with caramel undertones.",
    weight: "80g Bar"
  }
];

MC.flavorCategories = [
  {
    id: "dark-rich",
    title: "Dark & Rich",
    desc: "Single-origin terroirs from 70% to 85% cocoa with notes of wood, smoke, and tart berries.",
    badge: "Single Origin"
  },
  {
    id: "nutty-crunchy",
    title: "Nutty & Crunchy",
    desc: "Slow-roasted Piedmont hazelnuts, Marcona almonds, and caramelized pecans.",
    badge: "Roasted Daily"
  },
  {
    id: "fruity-fresh",
    title: "Fruity & Fresh",
    desc: "Tangy passion fruit, wild mountain raspberries, and sun-kissed Mediterranean orange peel.",
    badge: "Real Botanicals"
  },
  {
    id: "caramel-sweet",
    title: "Caramel & Sweet",
    desc: "Liquid fleur de sel caramels, browned butter toffees, and dulce de leche.",
    badge: "Fleur de Sel"
  },
  {
    id: "coffee-inspired",
    title: "Coffee Inspired",
    desc: "Single-estate Ethiopian Yirgacheffe cold brew ganache and dark mocha nib crumbles.",
    badge: "Arabica Blend"
  },
  {
    id: "exotic-flavors",
    title: "Exotic Flavors",
    desc: "Smoked sea salt, Japanese ceremonial matcha, rose petal infusion, and Kashmiri saffron.",
    badge: "Chef Reserve"
  }
];

MC.pairings = [
  {
    pair: "Dark Chocolate 72% × Single-Origin Espresso",
    chocolate: "Madagascar 72% Dark",
    beverage: "Ethiopian Roast Espresso",
    description: "Deep, bittersweet cacao notes amplify the roasted crema and subtle berry acidity of fresh espresso.",
    tag: "Morning Awakening"
  },
  {
    pair: "Milk Chocolate 42% × Fresh Strawberries",
    chocolate: "Alpine Milk 42%",
    beverage: "Juicy Wild Strawberries",
    description: "Rich whole-milk creaminess softens and contrasts the juicy, tart brightness of summer berries.",
    tag: "Summer Reverie"
  },
  {
    pair: "Hazelnut Praline × Foamy Cappuccino",
    chocolate: "Piedmont Hazelnut Praline",
    beverage: "Velvety Cappuccino",
    description: "Toasted hazelnut aromatics melt into the warm, frothed milk foam for a luxurious continental pairing.",
    tag: "Afternoon Indulgence"
  },
  {
    pair: "Caramel Chocolate × Sea Salt Crystals",
    chocolate: "Fleur de Sel Dark Dome",
    beverage: "Smoky Peat Islay Whiskey or Mineral Water",
    description: "The contrast between dark butter caramel and crisp salt minerals stimulates every taste receptor.",
    tag: "Evening Connoisseur"
  }
];

MC.subscriptions = [
  {
    id: "sub-classic",
    name: "Classic Discovery",
    price: 28,
    period: "month",
    description: "Ideal for the casual chocolate lover seeking fresh monthly delights.",
    features: [
      "2 Single-Origin Artisan Chocolate Bars",
      "4 Handcrafted Seasonal Truffles",
      "Printed Origin Tasting Notes & Flavor Map",
      "Free Temperature-Controlled Shipping"
    ],
    badge: "Popular Starter"
  },
  {
    id: "sub-premium",
    name: "Connoisseur Club",
    price: 48,
    period: "month",
    description: "Our most coveted monthly flight for curious and passionate palates.",
    features: [
      "4 Single-Estate Rare Origin Bars",
      "8 Hand-Painted Signature Bonbons",
      "Curated Sommelier Pairing Card",
      "15% Off All Boutique Store Purchases",
      "Complimentary Express Cold-Pack Delivery"
    ],
    badge: "Most Loved"
  },
  {
    id: "sub-luxury",
    name: "Master Chocolatier Reserve",
    price: 78,
    period: "month",
    description: "An extraordinary VIP presentation box curated directly by Master Chocolatier Julian Vance.",
    features: [
      "16 Limited-Edition Artisanal Bonbons & Truffles",
      "4 Micro-Harvest Reserve Slabs",
      "Advance Access to Seasonal Collections",
      "Personalized Gift Card & Silk Ribbon Packaging",
      "Invitation to Biannual Virtual Tasting Masterclass"
    ],
    badge: "Ultimate Luxury"
  }
];

MC.reviews = [
  {
    name: "Eleanor Vance",
    role: "Pastry Chef & Food Stylist, Paris",
    rating: 5,
    title: "Unmatched Nuance & Velvet Texture",
    comment: "The Madagascar 70% is hands down the most nuanced chocolate I've ever experienced. The red berry notes and slow, velvety melt are astonishing.",
    verified: true
  },
  {
    name: "Marcus Sterling",
    role: "Private Collector & Connoisseur, London",
    rating: 5,
    title: "Perfection in Every Detail",
    comment: "Ordered the 16-piece bespoke gift box for our anniversary. The presentation, the wax seal, and the liquid sea salt caramels were completely unmatched.",
    verified: true
  },
  {
    name: "Dr. Sophia Chen",
    role: "Culinary Critic & Author, New York",
    rating: 5,
    title: "Spoiled All Other Chocolate For Me",
    comment: "Their Connoisseur Club subscription arrives in pristine condition. Every batch is an extraordinary sensory journey through true heirloom cacao terroir.",
    verified: true
  }
];

MC.craftSteps = [
  {
    step: "01",
    title: "Cocoa Bean Selection",
    desc: "We source certified direct-trade heirloom Criollo and Trinitario beans directly from regenerative family agroforestry farms in Madagascar, Peru, and Ghana."
  },
  {
    step: "02",
    title: "Gentle Drum Roasting",
    desc: "Custom low-temperature convection roasting profiles tailored specifically to each harvest batch to unlock delicate floral and fruity terroir notes."
  },
  {
    step: "03",
    title: "Granite Stone Melanging",
    desc: "Natural granite wheels crush and refine the cocoa nibs and organic cane sugar continuously for 72 hours, achieving sub-18-micron velvety smoothness."
  },
  {
    step: "04",
    title: "Artisanal Conching",
    desc: "Gentle aerating and kneading at warm temperatures to evaporate excess volatile acids, allowing deep caramel and warm nutty flavors to blossom."
  },
  {
    step: "05",
    title: "Chilled Marble Tempering",
    desc: "Master chocolatiers hand-temper the molten mass across chilled Vermont granite slabs, locking in the perfect Beta-V crystalline structure for a crisp snap."
  },
  {
    step: "06",
    title: "Precision Molding",
    desc: "Poured into custom geometric molds and gently vibrated to release air bubbles, ensuring dense, silky texture throughout every bar and dome."
  },
  {
    step: "07",
    title: "Hand Finishing & Decorating",
    desc: "Individual truffles are hand-rolled in pure raw cocoa powder, dusted with 24k edible gold leaf, or hand-painted with colored organic cocoa butter."
  },
  {
    step: "08",
    title: "Eco-Luxe Packaging",
    desc: "Sealed in protective compostable botanical foil and enclosed inside rigid keepsake presentation boxes tied with copper-dyed cotton ribbons."
  }
];

MC.journeyMilestones = [
  { year: "2018", title: "The Beginning", desc: "A humble kitchen counter, a 5kg granite stone melanger, and an obsession with single-origin Madagascan cocoa." },
  { year: "2019", title: "First Chocolate Collection", desc: "Debuted three micro-batch dark chocolate bars at local farmers' markets, selling out in under two hours." },
  { year: "2021", title: "Growing the Artisan Workshop", desc: "Relocated to a dedicated solar-powered confectionery atelier in the Hudson Valley with climate-controlled marble rooms." },
  { year: "2022", title: "Expanding the Collection", desc: "Introduced fresh ganache truffles, liquid sea salt caramels, and vegan dark cocoa confections." },
  { year: "2023", title: "Introducing Gift Experiences", desc: "Launched custom handcrafted rigid presentation boxes with personalized wax-sealed greeting cards." },
  { year: "2024", title: "Launching Seasonal Collections", desc: "Debuted limited-run holiday and festival collections that celebrate global culinary traditions." },
  { year: "2025–2026", title: "Building the Chocolate Community", desc: "Now delighting over 50,000 discerning chocolate lovers worldwide while preserving heirloom cacao forests." }
];
