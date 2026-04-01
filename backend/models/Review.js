const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title:   { type: String, trim: true, maxlength: 100 },
    comment: { type: String, required: true, trim: true, maxlength: 1000 },
    verified: { type: Boolean, default: false }, // verified purchase
  },
  { timestamps: true }
)

// One review per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true })

// After save/remove: recalculate product rating
reviewSchema.statics.calcProductRating = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        avgRating: { $avg: '$rating' },
        count:     { $sum: 1 },
      },
    },
  ])

  const Product = require('./Product')
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rating:      Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].count,
    })
  } else {
    await Product.findByIdAndUpdate(productId, { rating: 0, reviewCount: 0 })
  }
}

reviewSchema.post('save', function () {
  this.constructor.calcProductRating(this.product)
})

reviewSchema.post('deleteOne', { document: true }, function () {
  this.constructor.calcProductRating(this.product)
})

module.exports = mongoose.model('Review', reviewSchema)
