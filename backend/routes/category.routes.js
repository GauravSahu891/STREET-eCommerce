const router = require('express').Router()
const {
  getCategories, getCategory, createCategory, updateCategory, deleteCategory,
} = require('../controllers/category.controller')
const { protect } = require('../middleware/auth.middleware')
const admin       = require('../middleware/admin.middleware')

router.get('/',          getCategories)
router.get('/:slug',     getCategory)
router.post('/',         protect, admin, createCategory)
router.put('/:id',       protect, admin, updateCategory)
router.delete('/:id',    protect, admin, deleteCategory)

module.exports = router
