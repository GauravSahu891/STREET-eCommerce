const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true, unique: true },
    slug:  { type: String, required: true, unique: true, lowercase: true },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// Virtual: product count
categorySchema.virtual('productCount', {
  ref:          'Product',
  localField:   '_id',
  foreignField: 'category',
  count:        true,
})

module.exports = mongoose.model('Category', categorySchema)
