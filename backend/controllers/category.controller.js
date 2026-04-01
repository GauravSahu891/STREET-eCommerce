const Category = require('../models/Category')
const Product  = require('../models/Product')
const { sendSuccess, sendError } = require('../utils/apiResponse')

// ─── GET ALL CATEGORIES ────────────────────────────
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).populate('productCount')
    return sendSuccess(res, 200, 'Categories fetched.', { categories })
  } catch (err) { next(err) }
}

// ─── GET SINGLE CATEGORY (by slug or id) ──────────
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      $or: [{ slug: req.params.slug }, { _id: req.params.slug }],
      isActive: true,
    }).populate('productCount')

    if (!category) return sendError(res, 404, 'Category not found.')
    return sendSuccess(res, 200, 'Category fetched.', { category })
  } catch (err) { next(err) }
}

// ─── ADMIN: CREATE CATEGORY ────────────────────────
exports.createCategory = async (req, res, next) => {
  try {
    const { name, image, description } = req.body
    const slug = name.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-')
    const category = await Category.create({ name, slug, image, description })
    return sendSuccess(res, 201, 'Category created.', { category })
  } catch (err) { next(err) }
}

// ─── ADMIN: UPDATE CATEGORY ────────────────────────
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    })
    if (!category) return sendError(res, 404, 'Category not found.')
    return sendSuccess(res, 200, 'Category updated.', { category })
  } catch (err) { next(err) }
}

// ─── ADMIN: DELETE CATEGORY ────────────────────────
exports.deleteCategory = async (req, res, next) => {
  try {
    const count = await Product.countDocuments({ category: req.params.id, isActive: true })
    if (count > 0) {
      return sendError(res, 400, `Cannot delete: ${count} active product(s) use this category.`)
    }
    const category = await Category.findByIdAndUpdate(
      req.params.id, { isActive: false }, { new: true }
    )
    if (!category) return sendError(res, 404, 'Category not found.')
    return sendSuccess(res, 200, 'Category deleted.')
  } catch (err) { next(err) }
}
