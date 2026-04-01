const User    = require('../models/User')
const Product = require('../models/Product')
const { sendSuccess, sendError } = require('../utils/apiResponse')

// ─── GET WISHLIST ──────────────────────────────────
exports.getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('wishlist', 'name image price originalPrice rating reviewCount badge category slug')
    return sendSuccess(res, 200, 'Wishlist fetched.', { wishlist: user.wishlist })
  } catch (err) { next(err) }
}

// ─── TOGGLE WISHLIST ITEM ──────────────────────────
exports.toggleWishlist = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    if (!product) return sendError(res, 404, 'Product not found.')

    const user = await User.findById(req.user._id)
    const idx  = user.wishlist.indexOf(req.params.productId)

    let action
    if (idx >= 0) {
      user.wishlist.splice(idx, 1)
      action = 'removed'
    } else {
      user.wishlist.push(req.params.productId)
      action = 'added'
    }

    await user.save({ validateBeforeSave: false })
    await user.populate('wishlist', 'name image price originalPrice rating badge')

    return sendSuccess(res, 200, `Product ${action} ${action === 'added' ? 'to' : 'from'} wishlist.`, {
      wishlist: user.wishlist,
      action,
    })
  } catch (err) { next(err) }
}

// ─── CLEAR WISHLIST ────────────────────────────────
exports.clearWishlist = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { wishlist: [] })
    return sendSuccess(res, 200, 'Wishlist cleared.')
  } catch (err) { next(err) }
}
