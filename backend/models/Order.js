const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  product:     { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:        { type: String, required: true },
  image:       { type: String },
  price:       { type: Number, required: true },
  quantity:    { type: Number, required: true, min: 1 },
  size:        { type: String },
  color:       { type: String },
})

const shippingAddressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  street:   { type: String, required: true },
  city:     { type: String, required: true },
  state:    { type: String, required: true },
  zip:      { type: String, required: true },
  country:  { type: String, default: 'US' },
  phone:    { type: String },
})

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    items: [orderItemSchema],
    shippingAddress: shippingAddressSchema,

    // Pricing
    subtotal:     { type: Number, required: true },
    shippingCost: { type: Number, default: 0 },
    discount:     { type: Number, default: 0 },
    total:        { type: Number, required: true },
    couponCode:   { type: String, default: '' },

    // Payment
    paymentMethod: {
      type: String,
      enum: ['card', 'cod', 'paypal'],
      default: 'card',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paidAt: { type: Date },

    // Order lifecycle
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    statusHistory: [
      {
        status:    { type: String },
        note:      { type: String },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    deliveredAt:  { type: Date },
    cancelledAt:  { type: Date },
    cancelReason: { type: String },

    notes: { type: String, default: '' },
  },
  { timestamps: true }
)

// Auto-generate order number before save
orderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    this.orderNumber =
      'STR-' +
      new Date().getFullYear() +
      '-' +
      String(Math.floor(Math.random() * 90000) + 10000)
  }
  // push initial status to history
  if (this.isNew) {
    this.statusHistory.push({ status: this.status, note: 'Order placed' })
  }
  next()
})

module.exports = mongoose.model('Order', orderSchema)
