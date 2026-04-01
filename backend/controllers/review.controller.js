const Review  = require('../models/Review')
const Order   = require('../models/Order')
const Product = require('../models/Product')
const { sendSuccess, sendError, paginationMeta } = require('../utils/apiResponse')

// ─── GET REVIEWS FOR A PRODUCT ─────────────────────
exports.getProductReviews = async (req, res, next) => {
  try {
    const page  = parseInt(req.query.page)  || 1
    const limit = parseInt(req.query.limit) || 10
    const skip  = (page - 1) * limit

    const [reviews, total] = await Promise.all([
      Review.find({ product: req.params.productId })
        .populate('user', 'name avatar')
        .sort('-createdAt')
        .skip(skip)
        .limit(limit),
      Review.countDocuments({ product: req.params.productId }),
    ])

    return sendSuccess(res, 200, 'Reviews fetched.', {
      reviews,
      pagination: paginationMeta(total, page, limit),
    })
  } catch (err) { next(err) }
}

// ─── CREATE REVIEW ─────────────────────────────────
exports.createReview = async (req, res, next) => {
  try {
    const { rating, title, comment } = req.body
    const productId = req.params.productId

    const product = await Product.findById(productId)
    if (!product) return sendError(res, 404, 'Product not found.')

    const existing = await Review.findOne({ product: productId, user: req.user._id })
    if (existing) return sendError(res, 409, 'You have already reviewed this product.')

    // Check if verified purchase
    const hasPurchased = await Order.findOne({
      user:   req.user._id,
      status: 'delivered',
      'items.product': productId,
    })

    const review = await Review.create({
      product:  productId,
      user:     req.user._id,
      rating,
      title,
      comment,
      verified: !!hasPurchased,
    })

    await review.populate('user', 'name avatar')

    return sendSuccess(res, 201, 'Review submitted.', { review })
  } catch (err) { next(err) }
}

// ─── UPDATE REVIEW ─────────────────────────────────
exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) return sendError(res, 404, 'Review not found.')

    if (review.user.toString() !== req.user._id.toString()) {
      return sendError(res, 403, 'You can only edit your own reviews.')
    }

    const { rating, title, comment } = req.body
    if (rating)  review.rating  = rating
    if (title)   review.title   = title
    if (comment) review.comment = comment

    await review.save()
    await Review.calcProductRating(review.product)

    return sendSuccess(res, 200, 'Review updated.', { review })
  } catch (err) { next(err) }
}

// ─── DELETE REVIEW ─────────────────────────────────
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) return sendError(res, 404, 'Review not found.')

    const isOwner = review.user.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin'

    if (!isOwner && !isAdmin) return sendError(res, 403, 'Not authorized.')

    await review.deleteOne()
    return sendSuccess(res, 200, 'Review deleted.')
  } catch (err) { next(err) }
}
