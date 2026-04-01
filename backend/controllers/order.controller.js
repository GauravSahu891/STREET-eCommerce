const Order   = require('../models/Order')
const Cart    = require('../models/Cart')
const Product = require('../models/Product')
const { sendSuccess, sendError, paginationMeta } = require('../utils/apiResponse')

// ─── PLACE ORDER ───────────────────────────────────
exports.placeOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod = 'card', notes = '' } = req.body

    // Load cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')
    if (!cart || cart.items.length === 0) {
      return sendError(res, 400, 'Your cart is empty.')
    }

    // Verify stock and build order items
    const orderItems = []
    let subtotal = 0

    for (const item of cart.items) {
      const product = item.product
      if (!product || !product.isActive) {
        return sendError(res, 400, `Product "${product?.name || 'Unknown'}" is no longer available.`)
      }
      if (product.stock < item.quantity) {
        return sendError(res, 400, `Insufficient stock for "${product.name}".`)
      }
      orderItems.push({
        product:  product._id,
        name:     product.name,
        image:    product.image,
        price:    item.price,
        quantity: item.quantity,
        size:     item.size,
        color:    item.color,
      })
      subtotal += item.price * item.quantity
    }

    const shippingCost = subtotal > 100 ? 0 : 9.99
    const discount     = cart.coupon?.discount
      ? Math.round((subtotal * cart.coupon.discount) / 100 * 100) / 100
      : 0
    const total = subtotal - discount + shippingCost

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      subtotal,
      shippingCost,
      discount,
      total,
      couponCode:    cart.coupon?.code || '',
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      paidAt:        paymentMethod === 'cod' ? undefined : new Date(),
      notes,
    })

    // Decrement stock & increment sold
    await Promise.all(
      orderItems.map((item) =>
        Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity, sold: item.quantity },
        })
      )
    )

    // Clear cart after order
    cart.items  = []
    cart.coupon = { code: '', discount: 0 }
    await cart.save()

    await order.populate('items.product', 'name image')

    return sendSuccess(res, 201, 'Order placed successfully.', { order })
  } catch (err) { next(err) }
}

// ─── GET MY ORDERS ─────────────────────────────────
exports.getMyOrders = async (req, res, next) => {
  try {
    const page  = parseInt(req.query.page)  || 1
    const limit = parseInt(req.query.limit) || 10
    const skip  = (page - 1) * limit

    const [orders, total] = await Promise.all([
      Order.find({ user: req.user._id })
        .sort('-createdAt')
        .skip(skip)
        .limit(limit),
      Order.countDocuments({ user: req.user._id }),
    ])

    return sendSuccess(res, 200, 'Orders fetched.', {
      orders,
      pagination: paginationMeta(total, page, limit),
    })
  } catch (err) { next(err) }
}

// ─── GET SINGLE ORDER ──────────────────────────────
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'name image slug')

    if (!order) return sendError(res, 404, 'Order not found.')

    // Users can only view their own orders (admins see all)
    if (req.user.role !== 'admin' && order.user.toString() !== req.user._id.toString()) {
      return sendError(res, 403, 'Access denied.')
    }

    return sendSuccess(res, 200, 'Order fetched.', { order })
  } catch (err) { next(err) }
}

// ─── CANCEL ORDER ──────────────────────────────────
exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return sendError(res, 404, 'Order not found.')

    if (order.user.toString() !== req.user._id.toString()) {
      return sendError(res, 403, 'Access denied.')
    }

    const cancellable = ['pending', 'confirmed']
    if (!cancellable.includes(order.status)) {
      return sendError(res, 400, `Cannot cancel an order that is "${order.status}".`)
    }

    order.status      = 'cancelled'
    order.cancelledAt = new Date()
    order.cancelReason = req.body.reason || 'Cancelled by customer'
    order.statusHistory.push({ status: 'cancelled', note: order.cancelReason })

    // Restore stock
    await Promise.all(
      order.items.map((item) =>
        Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity, sold: -item.quantity },
        })
      )
    )

    await order.save()
    return sendSuccess(res, 200, 'Order cancelled.', { order })
  } catch (err) { next(err) }
}

// ─── ADMIN: GET ALL ORDERS ─────────────────────────
exports.getAllOrders = async (req, res, next) => {
  try {
    const page   = parseInt(req.query.page)  || 1
    const limit  = parseInt(req.query.limit) || 20
    const skip   = (page - 1) * limit
    const filter = {}

    if (req.query.status)        filter.status        = req.query.status
    if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('user', 'name email')
        .sort('-createdAt')
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter),
    ])

    return sendSuccess(res, 200, 'Orders fetched.', {
      orders,
      pagination: paginationMeta(total, page, limit),
    })
  } catch (err) { next(err) }
}

// ─── ADMIN: UPDATE ORDER STATUS ────────────────────
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

    if (!validStatuses.includes(status)) {
      return sendError(res, 400, 'Invalid order status.')
    }

    const order = await Order.findById(req.params.id)
    if (!order) return sendError(res, 404, 'Order not found.')

    order.status = status
    order.statusHistory.push({ status, note: note || `Status updated to ${status}` })
    if (status === 'delivered') order.deliveredAt = new Date()

    await order.save()
    return sendSuccess(res, 200, 'Order status updated.', { order })
  } catch (err) { next(err) }
}
