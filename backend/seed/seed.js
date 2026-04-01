require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const connectDB  = require('../config/db')
const User       = require('../models/User')
const Category   = require('../models/Category')
const Product    = require('../models/Product')
const Review     = require('../models/Review')

// ─── CATEGORIES DATA ──────────────────────────────
const categoriesData = [
  { name: 'Hoodies',     slug: 'hoodies',     image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', description: 'Premium hoodies and sweatshirts' },
  { name: 'T-Shirts',    slug: 't-shirts',    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', description: 'Essential tees for every wardrobe' },
  { name: 'Pants',       slug: 'pants',       image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', description: 'Cargo joggers and street pants' },
  { name: 'Accessories', slug: 'accessories', image: 'https://images.pexels.com/photos/1184593/pexels-photo-1184593.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', description: 'Caps, bags, and accessories' },
  { name: 'Shoes',       slug: 'shoes',       image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', description: 'Sneakers and street footwear' },
  { name: 'Jackets',     slug: 'jackets',     image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', description: 'Bombers, coaches, and outerwear' },
]

// ─── PRODUCTS DATA FACTORY ────────────────────────
const buildProducts = (catMap) => [
  {
    name: 'Urban Runner Pro', category: catMap['Shoes'],
    price: 129.99, originalPrice: 179.99,
    description: 'The Urban Runner Pro is engineered for the streets. Featuring a premium cushioned sole with breathable mesh upper.',
    image:  'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      'https://images.pexels.com/photos/1545085/pexels-photo-1545085.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    ],
    sizes: ['US 7','US 8','US 9','US 10','US 11','US 12'],
    colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#ffffff', name: 'White' }, { hex: '#8b5cf6', name: 'Purple' }],
    badge: 'HOT', stock: 85, featured: true, trending: true,
  },
  {
    name: 'Street Core Hoodie', category: catMap['Hoodies'],
    price: 89.99, originalPrice: 119.99,
    description: 'Crafted from heavyweight 400gsm fleece cotton blend. Features a spacious kangaroo pocket, adjustable drawstring hood, and ribbed cuffs.',
    image:  'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    images: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      'https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    ],
    sizes: ['XS','S','M','L','XL','XXL'],
    colors: [{ hex: '#1a1a1a', name: 'Jet Black' }, { hex: '#8b5cf6', name: 'Purple Haze' }, { hex: '#374151', name: 'Storm Gray' }],
    badge: 'NEW', stock: 120, featured: true, trending: true,
  },
  {
    name: 'Classic Logo Tee', category: catMap['T-Shirts'],
    price: 44.99, originalPrice: 59.99,
    description: 'Made from 100% combed ring-spun cotton for ultra-soft feel. Features the iconic STR≡T logo with relaxed fit.',
    image:  'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    images: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      'https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    ],
    sizes: ['XS','S','M','L','XL','XXL'],
    colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#ffffff', name: 'White' }, { hex: '#7f1d1d', name: 'Crimson' }],
    badge: 'SALE', stock: 200, featured: true, trending: false,
  },
  {
    name: 'Cargo Jogger Pants', category: catMap['Pants'],
    price: 79.99, originalPrice: 99.99,
    description: 'Featuring 6 utility pockets, elastic waistband, tapered leg silhouette, and comfortable cotton-blend fabric.',
    image:  'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      'https://images.pexels.com/photos/1598506/pexels-photo-1598506.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    ],
    sizes: ['XS','S','M','L','XL','XXL'],
    colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#4b5320', name: 'Olive' }, { hex: '#374151', name: 'Slate' }],
    badge: 'HOT', stock: 90, featured: true, trending: true,
  },
  {
    name: 'Oversized Bomber Jacket', category: catMap['Jackets'],
    price: 149.99, originalPrice: 199.99,
    description: 'Premium nylon shell with satin lining, ribbed collar, cuffs and hem, front zip closure, multiple interior pockets.',
    image:  'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    images: [
      'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    ],
    sizes: ['XS','S','M','L','XL','XXL'],
    colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#1e3a5f', name: 'Navy' }, { hex: '#7f1d1d', name: 'Burgundy' }],
    badge: 'NEW', stock: 55, featured: false, trending: true,
  },
  {
    name: 'Chain Logo Cap', category: catMap['Accessories'],
    price: 34.99, originalPrice: 44.99,
    description: 'Embroidered chain-link logo, structured 6-panel design, adjustable snapback closure, premium cotton.',
    image:  'https://images.pexels.com/photos/1184593/pexels-photo-1184593.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    images: [
      'https://images.pexels.com/photos/1184593/pexels-photo-1184593.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      'https://images.pexels.com/photos/1478985/pexels-photo-1478985.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    ],
    sizes: ['One Size'],
    colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#ffffff', name: 'White' }, { hex: '#4b5320', name: 'Olive' }],
    badge: 'HOT', stock: 150, featured: false, trending: true,
  },
  {
    name: 'Tech Fleece Zip-Up', category: catMap['Hoodies'],
    price: 99.99, originalPrice: 129.99,
    description: 'Innovative tech fleece fabric with warmth without bulk. Full-length zipper, paneled construction, slim fit.',
    image:  'https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    images: [
      'https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    ],
    sizes: ['XS','S','M','L','XL','XXL'],
    colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#1e3a5f', name: 'Navy' }, { hex: '#4c1d95', name: 'Purple' }],
    badge: 'SALE', stock: 70, featured: false, trending: true,
  },
  {
    name: 'Graphic Print Tee', category: catMap['T-Shirts'],
    price: 49.99, originalPrice: 64.99,
    description: 'Oversized fit, premium screen-printed graphic, high-quality cotton blend that holds its shape wash after wash.',
    image:  'https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    images: [
      'https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    ],
    sizes: ['XS','S','M','L','XL','XXL'],
    colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#ffffff', name: 'White' }],
    badge: 'NEW', stock: 180, featured: false, trending: false,
  },
  {
    name: 'Tactical Cargo Shorts', category: catMap['Pants'],
    price: 59.99, originalPrice: 74.99,
    description: '8 functional pockets, ripstop fabric, adjustable waistband, relaxed fit. Built for skate sessions and street life.',
    image:  'https://images.pexels.com/photos/3782148/pexels-photo-3782148.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    images: [
      'https://images.pexels.com/photos/3782148/pexels-photo-3782148.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    ],
    sizes: ['XS','S','M','L','XL','XXL'],
    colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#4b5320', name: 'Olive' }],
    badge: null, stock: 60, featured: false, trending: false,
  },
  {
    name: 'High-Top Vulcan', category: catMap['Shoes'],
    price: 109.99, originalPrice: 139.99,
    description: 'Canvas upper with vulcanized rubber sole, cushioned insole, reinforced toe cap. Built to last, styled to stand out.',
    image:  'https://images.pexels.com/photos/1545085/pexels-photo-1545085.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    images: [
      'https://images.pexels.com/photos/1545085/pexels-photo-1545085.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    ],
    sizes: ['US 7','US 8','US 9','US 10','US 11','US 12'],
    colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#ffffff', name: 'White' }, { hex: '#7f1d1d', name: 'Red' }],
    badge: 'HOT', stock: 75, featured: false, trending: true,
  },
  {
    name: 'Crossbody Street Bag', category: catMap['Accessories'],
    price: 64.99, originalPrice: 84.99,
    description: 'Water-resistant nylon, adjustable strap, multiple zip compartments, sleek minimal design. Essential carry-all.',
    image:  'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      'https://images.pexels.com/photos/1478985/pexels-photo-1478985.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    ],
    sizes: ['One Size'],
    colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#374151', name: 'Gray' }],
    badge: 'NEW', stock: 45, featured: false, trending: false,
  },
  {
    name: 'Coach Street Jacket', category: catMap['Jackets'],
    price: 134.99, originalPrice: 169.99,
    description: 'Wind-resistant woven fabric, press-stud closure, two front pockets, relaxed silhouette. A classic that never fades.',
    image:  'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    ],
    sizes: ['XS','S','M','L','XL','XXL'],
    colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#1e3a5f', name: 'Navy' }, { hex: '#4b5320', name: 'Olive' }],
    badge: 'SALE', stock: 40, featured: false, trending: true,
  },
]

// ─── SEED FUNCTION ────────────────────────────────
const seed = async () => {
  await connectDB()

  console.log('\n🌱 Starting database seed...\n')

  // Clear existing data
  await Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Product.deleteMany(),
    Review.deleteMany(),
  ])
  console.log('🗑️  Cleared existing data.')

  // Create admin user
  const admin = await User.create({
    name:     'Admin',
    email:    'admin@street.com',
    password: 'Admin@123',
    role:     'admin',
  })
  console.log(`👤 Admin created   : ${admin.email} / Admin@123`)

  // Create demo user
  const user = await User.create({
    name:     'Jordan Lee',
    email:    'user@street.com',
    password: 'User@123',
    role:     'user',
  })
  console.log(`👤 User created    : ${user.email} / User@123`)

  // Create categories
  const categories = await Category.insertMany(categoriesData)
  console.log(`📂 Categories      : ${categories.length} created`)

  // Build catName -> ObjectId map
  const catMap = {}
  categories.forEach((c) => { catMap[c.name] = c._id })

  // Create products
  const products = await Product.insertMany(buildProducts(catMap))
  console.log(`📦 Products        : ${products.length} created`)

  // Create sample reviews
  const reviewsData = []
  const reviewTexts = [
    { rating: 5, title: 'Absolutely love it!',   comment: 'Premium quality, perfect fit. Exactly as described. Will buy again!' },
    { rating: 5, title: 'Great streetwear',       comment: 'The quality is unmatched. Every detail is on point. Highly recommend.' },
    { rating: 4, title: 'Really nice piece',      comment: 'Great product overall. The material feels premium. Runs slightly large.' },
    { rating: 5, title: 'My new favourite',       comment: 'Bought this as a gift and the person loved it. STREET never disappoints.' },
    { rating: 4, title: 'Solid quality',          comment: 'Good construction, looks exactly like the photos. Fast delivery too.' },
  ]

  products.slice(0, 6).forEach((product, i) => {
    reviewsData.push({
      product:  product._id,
      user:     i % 2 === 0 ? admin._id : user._id,
      rating:   reviewTexts[i % reviewTexts.length].rating,
      title:    reviewTexts[i % reviewTexts.length].title,
      comment:  reviewTexts[i % reviewTexts.length].comment,
      verified: true,
    })
  })

  await Review.insertMany(reviewsData)
  console.log(`⭐ Reviews         : ${reviewsData.length} created`)

  // Recalculate ratings
  for (const r of reviewsData) {
    await Review.calcProductRating(r.product)
  }
  console.log('📊 Product ratings : recalculated')

  console.log('\n✅ Seed complete!\n')
  console.log('─────────────────────────────────')
  console.log('  Admin  : admin@street.com / Admin@123')
  console.log('  User   : user@street.com  / User@123')
  console.log('─────────────────────────────────\n')

  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
