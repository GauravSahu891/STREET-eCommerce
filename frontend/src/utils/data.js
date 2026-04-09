// =====================================================
// MOCK DATA FOR STREET ECOMMERCE
// Images: Pexels CDN (reliable, fashion-specific, no auth needed)
// Format: https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg
// =====================================================

// ─── IMAGE HELPERS ──────────────────────────────────
const px = (id, w = 800, h = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`

const pxSq = (id, size = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${size}&h=${size}&fit=crop`

// ─── PRODUCT CATALOG ────────────────────────────────
export const products = [
  // ── SHOES ──────────────────────────────────────────
  {
    id: 1,
    name: "Urban Runner Pro",
    category: "Shoes",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.8,
    reviews: 234,
    badge: "HOT",
    image: px(2529148),      // White Nike sneakers
    images: [
      px(2529148),            // White Nike
      px(1598505),            // Colorful Adidas
      px(1545085),            // Sneakers side view
      px(2048742),            // Sneaker close-up
    ],
    description:
      "The Urban Runner Pro is engineered for the streets. Featuring a premium cushioned sole with breathable mesh upper, this sneaker combines performance and style seamlessly. Perfect for long walks, casual outings, or light athletic activities.",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["#1a1a1a", "#ffffff", "#8b5cf6", "#3b82f6"],
    colorNames: ["Black", "White", "Purple", "Blue"],
    inStock: true,
    featured: true,
    trending: true,
  },
  // ── HOODIES ────────────────────────────────────────
  {
    id: 2,
    name: "Street Core Hoodie",
    category: "Hoodies",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviews: 412,
    badge: "NEW",
    image: px(1183266),      // Person in black hoodie
    images: [
      px(1183266),            // Black hoodie model
      px(3622608),            // Hoodie back view
      px(1021693),            // Dark street hoodie
      px(2897531),            // Oversized hoodie
    ],
    description:
      "The Street Core Hoodie is your ultimate urban companion. Crafted from heavyweight 400gsm fleece cotton blend, it offers premium warmth and durability. Features a spacious kangaroo pocket, adjustable drawstring hood, and ribbed cuffs.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["#1a1a1a", "#2d2d2d", "#8b5cf6", "#374151"],
    colorNames: ["Jet Black", "Charcoal", "Purple Haze", "Storm Gray"],
    inStock: true,
    featured: true,
    trending: true,
  },
  // ── T-SHIRTS ────────────────────────────────────────
  {
    id: 3,
    name: "Classic Logo Tee",
    category: "T-Shirts",
    price: 44.99,
    originalPrice: 59.99,
    rating: 4.6,
    reviews: 678,
    badge: "SALE",
    image: px(1656684),      // White tee on model
    images: [
      px(1656684),            // White tee front
      px(2294342),            // Classic tee back
      px(3765114),            // Tee detail
      px(1192601),            // T-shirt flat lay
    ],
    description:
      "The Classic Logo Tee is the cornerstone of any streetwear wardrobe. Made from 100% combed ring-spun cotton for an ultra-soft feel. Features the iconic STR≡T logo on the chest, a relaxed fit, and reinforced shoulder seams for longevity.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["#1a1a1a", "#ffffff", "#374151", "#7f1d1d"],
    colorNames: ["Black", "White", "Gray", "Crimson"],
    inStock: true,
    featured: true,
    trending: false,
  },
  // ── PANTS ──────────────────────────────────────────
  {
    id: 4,
    name: "Cargo Jogger Pants",
    category: "Pants",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviews: 289,
    badge: "HOT",
    image: px(1598507),      // Cargo pants
    images: [
      px(1598507),            // Cargo pants front
      px(1598506),            // Cargo pants side
      px(2220316),            // Pants pockets
    ],
    description:
      "The Cargo Jogger Pants redefine functional streetwear. Featuring 6 utility pockets, an elastic waistband with adjustable drawstring, tapered leg silhouette, and a comfortable cotton-blend fabric. The perfect blend of style and practicality.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["#1a1a1a", "#374151", "#4b5320", "#292524"],
    colorNames: ["Black", "Slate", "Olive", "Earth"],
    inStock: true,
    featured: true,
    trending: true,
  },
  // ── JACKETS ────────────────────────────────────────
  {
    id: 5,
    name: "Oversized Bomber Jacket",
    category: "Jackets",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviews: 156,
    badge: "NEW",
    image: px(1124468),      // Bomber jacket model
    images: [
      px(1124468),            // Bomber jacket front
      px(1040945),            // Street jacket
      px(1488463),            // Jacket detail
      px(845434),             // Jacket worn
    ],
    description:
      "The Oversized Bomber Jacket makes a bold statement. Featuring premium nylon shell with satin lining, ribbed collar, cuffs and hem, front zip closure, and multiple interior pockets. An instant wardrobe upgrade.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["#1a1a1a", "#1e3a5f", "#374151", "#7f1d1d"],
    colorNames: ["Black", "Navy", "Gray", "Burgundy"],
    inStock: true,
    featured: false,
    trending: true,
  },
  // ── ACCESSORIES ────────────────────────────────────
  {
    id: 6,
    name: "Chain Logo Cap",
    category: "Accessories",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.5,
    reviews: 521,
    badge: "HOT",
    image: px(2986445),      // Snapback cap
    images: [
      px(2986445),            // Cap front
      px(1478985),            // Cap side view
      px(2220316),            // Cap worn
      px(1070536),            // Cap close-up
    ],
    description:
      "The Chain Logo Cap adds the perfect finishing touch to any fit. Features an embroidered chain-link logo on the front, structured 6-panel design, adjustable snapback closure, and premium cotton construction.",
    sizes: ["One Size"],
    colors: ["#1a1a1a", "#ffffff", "#4b5320"],
    colorNames: ["Black", "White", "Olive"],
    inStock: true,
    featured: false,
    trending: true,
  },
  // ── HOODIES ────────────────────────────────────────
  {
    id: 7,
    name: "Tech Fleece Zip-Up",
    category: "Hoodies",
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviews: 198,
    badge: "SALE",
    image: px(2897531),      // Zip-up hoodie
    images: [
      px(2897531),            // Zip-up front
      px(3622608),            // Zip-up back
      px(1021693),            // Zip detail
      px(1183266),            // Worn on street
    ],
    description:
      "The Tech Fleece Zip-Up combines athletic performance with street style. Made from innovative tech fleece fabric that provides warmth without bulk. Features full-length zipper, paneled construction, and slim fit profile.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["#1a1a1a", "#1e3a5f", "#4c1d95"],
    colorNames: ["Black", "Navy", "Purple"],
    inStock: true,
    featured: false,
    trending: true,
  },
  // ── T-SHIRTS ────────────────────────────────────────
  {
    id: 8,
    name: "Graphic Print Tee",
    category: "T-Shirts",
    price: 49.99,
    originalPrice: 64.99,
    rating: 4.6,
    reviews: 334,
    badge: "NEW",
    image: px(2294342),      // Graphic tee model
    images: [
      px(2294342),            // Graphic tee front
      px(1656684),            // Tee on model
      px(3765114),            // Print detail
      px(1192601),            // Flatlay tee
    ],
    description:
      "The Graphic Print Tee is a wearable canvas of street culture. Features an oversized fit, premium screen-printed graphic, and high-quality cotton blend fabric that holds its shape wash after wash.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["#1a1a1a", "#ffffff", "#374151"],
    colorNames: ["Black", "White", "Ash Gray"],
    inStock: true,
    featured: false,
    trending: false,
  },
  // ── PANTS ──────────────────────────────────────────
  {
    id: 9,
    name: "Tactical Cargo Shorts",
    category: "Pants",
    price: 59.99,
    originalPrice: 74.99,
    rating: 4.5,
    reviews: 267,
    badge: null,
    images: [
      px(1598507),            // Cargo detail
      px(2220316),            // Pocket detail
      px(1598506),            // Side view
    ],
    description:
      "The Tactical Cargo Shorts are built for the urban explorer. 8 functional pockets, ripstop fabric construction, adjustable waistband, and a relaxed fit. Handles everything from skate sessions to casual hangouts.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["#1a1a1a", "#4b5320", "#374151"],
    colorNames: ["Black", "Olive", "Slate"],
    inStock: true,
    featured: false,
    trending: false,
  },
  // ── SHOES ──────────────────────────────────────────
  {
    id: 10,
    name: "High-Top Vulcan",
    category: "Shoes",
    price: 109.99,
    originalPrice: 139.99,
    rating: 4.8,
    reviews: 445,
    badge: "HOT",
    image: px(1545085),      // High-top sneakers
    images: [
      px(1545085),            // High-top side
      px(2048742),            // High-top detail
      px(2529148),            // Sneaker top view
      px(1598505),            // Sneaker pair
    ],
    description:
      "The High-Top Vulcan is a timeless silhouette reimagined for the modern street. Canvas upper with vulcanized rubber sole, cushioned insole, and reinforced toe cap. Built to last, styled to stand out.",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["#1a1a1a", "#ffffff", "#7f1d1d"],
    colorNames: ["Black", "White", "Red"],
    inStock: true,
    featured: false,
    trending: true,
  },
  // ── ACCESSORIES ────────────────────────────────────
  {
    id: 11,
    name: "Crossbody Street Bag",
    category: "Accessories",
    price: 64.99,
    originalPrice: 84.99,
    rating: 4.7,
    reviews: 189,
    badge: "NEW",
    image: px(1152077),      // Black crossbody bag
    images: [
      px(1152077),            // Bag front
      px(2905238),            // Bag side
      px(1152076),            // Bag strap detail
      px(1478985),            // Bag worn
    ],
    description:
      "The Crossbody Street Bag is the ultimate carry-all for the urban lifestyle. Features water-resistant nylon construction, adjustable strap, multiple zip compartments, and a sleek minimal design.",
    sizes: ["One Size"],
    colors: ["#1a1a1a", "#374151", "#4b5320"],
    colorNames: ["Black", "Gray", "Olive"],
    inStock: true,
    featured: false,
    trending: false,
  },
  // ── JACKETS ────────────────────────────────────────
  {
    id: 12,
    name: "Coach Street Jacket",
    category: "Jackets",
    price: 134.99,
    originalPrice: 169.99,
    rating: 4.8,
    reviews: 223,
    badge: "SALE",
    image: px(1040945),      // Street jacket on model
    images: [
      px(1040945),            // Jacket front
      px(845434),             // Jacket back
      px(1124468),            // Jacket detail
      px(1488463),            // Jacket lifestyle
    ],
    description:
      "The Coach Street Jacket brings vintage vibes to modern streets. Wind-resistant woven fabric, press-stud closure, two front pockets, and a relaxed silhouette. A classic that never goes out of style.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["#1a1a1a", "#1e3a5f", "#4b5320"],
    colorNames: ["Black", "Navy", "Olive"],
    inStock: true,
    featured: false,
    trending: true,
  },
]

// ─── CATEGORIES ─────────────────────────────────────
export const categories = [
  {
    id: 1,
    name: "Hoodies",
    image: pxSq(1183266),    // Black hoodie model
    count: 24,
    slug: "hoodies",
  },
  {
    id: 2,
    name: "T-Shirts",
    image: pxSq(1656684),    // White tee model
    count: 36,
    slug: "t-shirts",
  },
  {
    id: 3,
    name: "Pants",
    image: pxSq(1598507),    // Cargo pants
    count: 18,
    slug: "pants",
  },
  {
    id: 4,
    name: "Accessories",
    image: pxSq(2986445),    // Snapback cap
    count: 42,
    slug: "accessories",
  },
  {
    id: 5,
    name: "Shoes",
    image: pxSq(2529148),    // White sneakers
    count: 29,
    slug: "shoes",
  },
  {
    id: 6,
    name: "Jackets",
    image: pxSq(1124468),    // Bomber jacket
    count: 15,
    slug: "jackets",
  },
]

// ─── TESTIMONIALS ────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: "Marcus Johnson",
    role: "Streetwear Enthusiast",
    avatar: pxSq(220453, 100),
    rating: 5,
    text: "STREET has completely transformed my wardrobe. The quality is unmatched — every piece feels premium, the stitching is perfect, and the fits are exactly what the lookbook shows. The Urban Runner Pro is now my daily driver.",
  },
  {
    id: 2,
    name: "Aisha Chen",
    role: "Fashion Blogger",
    avatar: pxSq(774909, 100),
    rating: 5,
    text: "I've been following STREET since day one and they consistently deliver. The Street Core Hoodie is insanely soft and the colorways are fire. My followers always ask where I get my fits. Fast shipping too!",
  },
  {
    id: 3,
    name: "Tyler Brooks",
    role: "Skateboarder",
    avatar: pxSq(1222271, 100),
    rating: 5,
    text: "Finally a brand that gets it. The Cargo Jogger Pants hold up to serious use — I've been skating in them for months and they look as good as day one. This is my go-to brand now.",
  },
  {
    id: 4,
    name: "Sofia Reyes",
    role: "Creative Director",
    avatar: pxSq(1239291, 100),
    rating: 5,
    text: "The attention to detail at STREET is what separates them from the rest. From the packaging to the garment tags — everything is considered. The Oversized Bomber Jacket is a masterpiece. Zero complaints.",
  },
]

// ─── HERO SLIDES ─────────────────────────────────────
export const heroSlides = [
  {
    id: 1,
    title: "DEFINE YOUR",
    titleAccent: "STREET STYLE",
    subtitle: "Premium streetwear crafted for those who move with intention. Quality that speaks, style that lasts.",
    cta: "Shop Now",
    ctaLink: "/products",
    image: px(1036623),      // Fashion model streetwear
    badge: "NEW COLLECTION",
  },
  {
    id: 2,
    title: "NEW SEASON",
    titleAccent: "NEW DROPS",
    subtitle: "Fresh silhouettes, premium materials, and bold colorways to elevate your everyday look.",
    cta: "Explore Collection",
    ctaLink: "/products",
    image: px(1183266),      // Hoodie hero
    badge: "SS 2025",
  },
  {
    id: 3,
    title: "BUILT FOR",
    titleAccent: "THE STREETS",
    subtitle: "Engineered for urban life. Every stitch, every fabric, every detail designed with purpose.",
    cta: "Shop Now",
    ctaLink: "/products",
    image: px(1124468),      // Jacket hero
    badge: "LIMITED EDITION",
  },
]

// ─── HELPERS ─────────────────────────────────────────
export const getFeaturedProducts = () => products.filter((p) => p.featured)
export const getTrendingProducts = () => products.filter((p) => p.trending)
export const getProductById = (id) => products.find((p) => p.id === parseInt(id))
export const getRelatedProducts = (id, category) =>
  products.filter((p) => p.category === category && p.id !== parseInt(id)).slice(0, 4)
