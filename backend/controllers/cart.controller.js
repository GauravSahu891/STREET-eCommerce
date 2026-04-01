const Cart    = require('../models/Cart')
const Product = require('../models/Product')
const { sendSuccess, sendError } = require('../utils/apiResponse')

const VALID_COUPONS = {
  STREET20: 20,
  SAVE10:   10,
  NEWUSER:  15,
}

const populateCart = (cart) =>
  cart.populate('items.product', 'name image price originalPrice stock sizes colors badge')

// ─── GET CART ──────────────────────────────────────
exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] })
    }
    await populateCart(cart)
    return sendSuccess(res, 200, 'Cart fetched.', { cart })
  } catch (err) { next(err) }
}

// ─── ADD TO CART ───────────────────────────────────
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, size, color } = req.body

    const product = await Product.findById(productId)
    if (!product || !product.isActive) return sendError(res, 404, 'Product not found.')
    if (product.stock < quantity) return sendError(res, 400, 'Insufficient stock.')

    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] })

    const existingIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.size  === size &&
        item.color === color
    )

    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += quantity
    } else {
      cart.items.push({ product: productId, quantity, size, color, price: product.price })
    }

    await cart.save()
    await populateCart(cart)
    return sendSuccess(res, 200, 'Item added to cart.', { cart })
  } catch (err) { next(err) }
}

// ─── UPDATE ITEM QUANTITY ──────────────────────────
exports.updateCartItem = async (req, res, next) => {
  try {
    const { itemId }  = req.params
    const { quantity } = req.body

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return sendError(res, 404, 'Cart not found.')

    const item = cart.items.id(itemId)
    if (!item) return sendError(res, 404, 'Cart item not found.')

    if (quantity <= 0) {
      cart.items.pull(itemId)
    } else {
      item.quantity = quantity
    }

    await cart.save()
    await populateCart(cart)
    return sendSuccess(res, 200, 'Cart updated.', { cart })
  } catch (err) { next(err) }
}

// ─── REMOVE ITEM FROM CART ─────────────────────────
exports.removeCartItem = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return sendError(res, 404, 'Cart not found.')

    cart.items.pull(req.params.itemId)
    await cart.save()
    await populateCart(cart)
    return sendSuccess(res, 200, 'Item removed.', { cart })
  } catch (err) { next(err) }
}

// ─── CLEAR CART ────────────────────────────────────
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return sendSuccess(res, 200, 'Cart already empty.')
    cart.items = []
    cart.coupon = { code: '', discount: 0 }
    await cart.save()
    return sendSuccess(res, 200, 'Cart cleared.', { cart })
  } catch (err) { next(err) }
}

// ─── APPLY COUPON ──────────────────────────────────
exports.applyCoupon = async (req, res, next) => {
  try {
    const { code } = req.body
    const discount = VALID_COUPONS[code?.toUpperCase()]

    if (!discount) return sendError(res, 400, 'Invalid or expired coupon code.')

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return sendError(res, 404, 'Cart not found.')

    cart.coupon = { code: code.toUpperCase(), discount }
    await cart.save()
    await populateCart(cart)

    return sendSuccess(res, 200, `Coupon applied! ${discount}% discount.`, { cart })
  } catch (err) { next(err) }
}
