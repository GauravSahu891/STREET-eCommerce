const router = require('express').Router()
const {
  getProducts, getProduct, getFeaturedProducts, getTrendingProducts,
  getRelatedProducts, createProduct, updateProduct, deleteProduct,
} = require('../controllers/product.controller')
const { protect } = require('../middleware/auth.middleware')
const admin       = require('../middleware/admin.middleware')

// ── Public routes ──────────────────────────────────
router.get('/',              getProducts)
router.get('/featured',      getFeaturedProducts)
router.get('/trending',      getTrendingProducts)
router.get('/:id',           getProduct)
router.get('/:id/related',   getRelatedProducts)

// ── Admin routes ───────────────────────────────────
router.post('/',     protect, admin, createProduct)
router.put('/:id',   protect, admin, updateProduct)
router.delete('/:id',protect, admin, deleteProduct)

module.exports = router
