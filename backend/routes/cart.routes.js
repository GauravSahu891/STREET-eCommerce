const router = require('express').Router()
const {
  getCart, addToCart, updateCartItem, removeCartItem, clearCart, applyCoupon,
} = require('../controllers/cart.controller')
const { protect } = require('../middleware/auth.middleware')

// All cart routes are protected
router.use(protect)

router.get('/',                    getCart)
router.post('/add',                addToCart)
router.put('/items/:itemId',       updateCartItem)
router.delete('/items/:itemId',    removeCartItem)
router.delete('/clear',            clearCart)
router.post('/coupon',             applyCoupon)

module.exports = router
