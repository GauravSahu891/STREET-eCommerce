require('dotenv').config()
const express      = require('express')
const cors         = require('cors')
const helmet       = require('helmet')
const morgan       = require('morgan')
const cookieParser = require('cookie-parser')
const rateLimit    = require('express-rate-limit')

const connectDB = require('./config/db')
const { errorHandler, notFound } = require('./middleware/error.middleware')

// ─── ROUTES ───────────────────────────────────────
const authRoutes     = require('./routes/auth.routes')
const userRoutes     = require('./routes/user.routes')
const productRoutes  = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')
const cartRoutes     = require('./routes/cart.routes')
const orderRoutes    = require('./routes/order.routes')
const wishlistRoutes = require('./routes/wishlist.routes')
const reviewRoutes   = require('./routes/review.routes')

// ─── CONNECT DATABASE ─────────────────────────────
connectDB()

const app = express()

// ─── SECURITY MIDDLEWARE ──────────────────────────
app.use(helmet())

// Rate limiting (100 req / 15 min per IP)
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max:      100,
    message:  { success: false, message: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders:   false,
  })
)

// Auth routes get a stricter limit (10 req / 15 min)
app.use(
  '/api/auth',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max:      10,
    message:  { success: false, message: 'Too many auth attempts, please try again later.' },
    skipSuccessfulRequests: true,
  })
)

// ─── CORE MIDDLEWARE ──────────────────────────────
app.use(cors({
  origin:      process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// ─── HEALTH CHECK ─────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🟢 STREET API is running',
    env:     process.env.NODE_ENV,
    time:    new Date().toISOString(),
  })
})

// ─── API ROUTES ───────────────────────────────────
app.use('/api/auth',       authRoutes)
app.use('/api/users',      userRoutes)
app.use('/api/products',   productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/cart',       cartRoutes)
app.use('/api/orders',     orderRoutes)
app.use('/api/wishlist',   wishlistRoutes)
app.use('/api/reviews',    reviewRoutes)

// ─── ERROR HANDLING ───────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ─── START SERVER ─────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🚀 STREET API running on http://localhost:${PORT}`)
  console.log(`📦 Environment : ${process.env.NODE_ENV}`)
  console.log(`🗄️  Database    : ${process.env.MONGO_URI}\n`)
})

module.exports = app
