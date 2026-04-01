const Product  = require('../models/Product')
const Category = require('../models/Category')
const { sendSuccess, sendError, paginationMeta } = require('../utils/apiResponse')

// ─── GET ALL PRODUCTS (with filters, sort, pagination, search) ──
exports.getProducts = async (req, res, next) => {
  try {
    const page     = parseInt(req.query.page)  || 1
    const limit    = parseInt(req.query.limit) || 12
    const skip     = (page - 1) * limit

    const filter = { isActive: true }

    // Search
    if (req.query.search) {
      filter.$text = { $search: req.query.search }
    }

    // Category filter (by slug or id)
    if (req.query.category) {
      const cat = await Category.findOne({
        $or: [{ slug: req.query.category }, { _id: req.query.category }],
      })
      if (cat) filter.category = cat._id
    }

    // Price range
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {}
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice)
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice)
    }

    // Badge filter
    if (req.query.badge) filter.badge = req.query.badge.toUpperCase()

    // Boolean filters
    if (req.query.featured === 'true') filter.featured = true
    if (req.query.trending === 'true') filter.trending = true

    // Sort
    const sortMap = {
      'price-asc':  { price:  1 },
      'price-desc': { price: -1 },
      'rating':     { rating: -1 },
      'popular':    { sold:   -1 },
      'newest':     { createdAt: -1 },
      'featured':   { featured: -1, createdAt: -1 },
    }
    const sort = sortMap[req.query.sort] || { createdAt: -1 }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('category', 'name slug'),
      Product.countDocuments(filter),
    ])

    return sendSuccess(res, 200, 'Products fetched.', {
      products,
      pagination: paginationMeta(total, page, limit),
    })
  } catch (err) { next(err) }
}

// ─── GET SINGLE PRODUCT ────────────────────────────
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
      isActive: true,
    }).populate('category', 'name slug')

    if (!product) return sendError(res, 404, 'Product not found.')
    return sendSuccess(res, 200, 'Product fetched.', { product })
  } catch (err) { next(err) }
}

// ─── GET FEATURED PRODUCTS ─────────────────────────
exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ featured: true, isActive: true })
      .limit(8)
      .populate('category', 'name slug')
    return sendSuccess(res, 200, 'Featured products fetched.', { products })
  } catch (err) { next(err) }
}

// ─── GET TRENDING PRODUCTS ─────────────────────────
exports.getTrendingProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ trending: true, isActive: true })
      .limit(8)
      .populate('category', 'name slug')
    return sendSuccess(res, 200, 'Trending products fetched.', { products })
  } catch (err) { next(err) }
}

// ─── GET RELATED PRODUCTS ──────────────────────────
exports.getRelatedProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return sendError(res, 404, 'Product not found.')

    const related = await Product.find({
      category: product.category,
      _id:      { $ne: product._id },
      isActive: true,
    })
      .limit(4)
      .populate('category', 'name slug')

    return sendSuccess(res, 200, 'Related products fetched.', { products: related })
  } catch (err) { next(err) }
}

// ─── ADMIN: CREATE PRODUCT ─────────────────────────
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    await product.populate('category', 'name slug')
    return sendSuccess(res, 201, 'Product created.', { product })
  } catch (err) { next(err) }
}

// ─── ADMIN: UPDATE PRODUCT ─────────────────────────
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new:           true,
      runValidators: true,
    }).populate('category', 'name slug')

    if (!product) return sendError(res, 404, 'Product not found.')
    return sendSuccess(res, 200, 'Product updated.', { product })
  } catch (err) { next(err) }
}

// ─── ADMIN: DELETE PRODUCT ─────────────────────────
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return sendError(res, 404, 'Product not found.')
    // Soft delete
    product.isActive = false
    await product.save()
    return sendSuccess(res, 200, 'Product deleted.')
  } catch (err) { next(err) }
}
