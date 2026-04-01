const router = require('express').Router()
const {
  getProductReviews, createReview, updateReview, deleteReview,
} = require('../controllers/review.controller')
const { protect } = require('../middleware/auth.middleware')

// GET reviews for a product (public)
router.get('/product/:productId', getProductReviews)

// Protected review actions
router.post('/product/:productId', protect, createReview)
router.put('/:id',                 protect, updateReview)
router.delete('/:id',              protect, deleteReview)

module.exports = router
