const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    size:     { type: String, required: true },
    color:    { type: String, default: '' },
    price:    { type: Number, required: true }, // snapshot at time of adding
  },
  { _id: true }
)

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    coupon: {
      code:     { type: String, default: '' },
      discount: { type: Number, default: 0 }, // percentage
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

// Virtual: subtotal
cartSchema.virtual('subtotal').get(function () {
  return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

module.exports = mongoose.model('Cart', cartSchema)
