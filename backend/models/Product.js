const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: { type: Number, default: null },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    image:  { type: String, required: true },
    images: [{ type: String }],
    sizes:  [{ type: String }],
    colors: [
      {
        hex:  { type: String },
        name: { type: String },
      },
    ],
    badge: {
      type: String,
      enum: ['NEW', 'HOT', 'SALE', null],
      default: null,
    },
    stock: {
      type: Number,
      required: true,
      default: 100,
      min: 0,
    },
    sold:     { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    // Aggregated from reviews
    rating:      { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

// Auto-generate slug from name
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      + '-' + Date.now()
  }
  next()
})

// Virtual: discount percentage
productSchema.virtual('discountPercent').get(function () {
  if (!this.originalPrice || this.originalPrice <= this.price) return 0
  return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100)
})

// Text index for search
productSchema.index({ name: 'text', description: 'text' })
productSchema.index({ category: 1, isActive: 1 })
productSchema.index({ price: 1 })
productSchema.index({ rating: -1 })

module.exports = mongoose.model('Product', productSchema)
