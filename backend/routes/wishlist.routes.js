const router = require('express').Router()
const { getWishlist, toggleWishlist, clearWishlist } = require('../controllers/wishlist.controller')
const { protect } = require('../middleware/auth.middleware')

router.use(protect)

router.get('/',                       getWishlist)
router.post('/:productId/toggle',     toggleWishlist)
router.delete('/',                    clearWishlist)

module.exports = router
