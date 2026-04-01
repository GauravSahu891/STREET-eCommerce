const router = require('express').Router()
const {
  getProfile, updateProfile, changePassword,
  addAddress, updateAddress, deleteAddress,
  getAllUsers, deleteUser,
} = require('../controllers/user.controller')
const { protect }  = require('../middleware/auth.middleware')
const admin        = require('../middleware/admin.middleware')

// ── Protected user routes ──────────────────────────
router.get('/profile',         protect, getProfile)
router.put('/profile',         protect, updateProfile)
router.put('/change-password', protect, changePassword)

// Address management
router.post('/addresses',              protect, addAddress)
router.put('/addresses/:addressId',    protect, updateAddress)
router.delete('/addresses/:addressId', protect, deleteAddress)

// ── Admin routes ───────────────────────────────────
router.get('/',      protect, admin, getAllUsers)
router.delete('/:id',protect, admin, deleteUser)

module.exports = router
