const router = require('express').Router()
const {
  placeOrder, getMyOrders, getOrder, cancelOrder,
  getAllOrders, updateOrderStatus,
} = require('../controllers/order.controller')
const { protect } = require('../middleware/auth.middleware')
const admin       = require('../middleware/admin.middleware')

// ── Protected user routes ──────────────────────────
router.post('/',           protect, placeOrder)
router.get('/my',          protect, getMyOrders)
router.get('/:id',         protect, getOrder)
router.put('/:id/cancel',  protect, cancelOrder)

// ── Admin routes ───────────────────────────────────
router.get('/',            protect, admin, getAllOrders)
router.put('/:id/status',  protect, admin, updateOrderStatus)

module.exports = router
