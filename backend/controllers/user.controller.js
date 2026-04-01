const User  = require('../models/User')
const Order = require('../models/Order')
const { sendSuccess, sendError, paginationMeta } = require('../utils/apiResponse')

// ─── GET MY PROFILE ────────────────────────────────
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist', 'name image price rating')
    return sendSuccess(res, 200, 'Profile fetched.', { user })
  } catch (err) { next(err) }
}

// ─── UPDATE MY PROFILE ─────────────────────────────
exports.updateProfile = async (req, res, next) => {
  try {
    const allowed = ['name', 'phone', 'avatar']
    const updates = {}
    allowed.forEach((key) => { if (req.body[key] !== undefined) updates[key] = req.body[key] })

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new:              true,
      runValidators:    true,
    })
    return sendSuccess(res, 200, 'Profile updated.', { user })
  } catch (err) { next(err) }
}

// ─── CHANGE PASSWORD ───────────────────────────────
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) {
      return sendError(res, 400, 'Please provide current and new password.')
    }

    const user = await User.findById(req.user._id).select('+password')
    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) return sendError(res, 401, 'Current password is incorrect.')

    user.password = newPassword
    await user.save()

    return sendSuccess(res, 200, 'Password updated successfully.')
  } catch (err) { next(err) }
}

// ─── ADDRESS MANAGEMENT ────────────────────────────
exports.addAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)

    // If new address is default, unset others
    if (req.body.isDefault) {
      user.addresses.forEach((a) => { a.isDefault = false })
    }
    user.addresses.push(req.body)
    await user.save()

    return sendSuccess(res, 201, 'Address added.', { addresses: user.addresses })
  } catch (err) { next(err) }
}

exports.updateAddress = async (req, res, next) => {
  try {
    const user    = await User.findById(req.user._id)
    const address = user.addresses.id(req.params.addressId)
    if (!address) return sendError(res, 404, 'Address not found.')

    if (req.body.isDefault) {
      user.addresses.forEach((a) => { a.isDefault = false })
    }
    Object.assign(address, req.body)
    await user.save()

    return sendSuccess(res, 200, 'Address updated.', { addresses: user.addresses })
  } catch (err) { next(err) }
}

exports.deleteAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    user.addresses = user.addresses.filter(
      (a) => a._id.toString() !== req.params.addressId
    )
    await user.save()
    return sendSuccess(res, 200, 'Address removed.', { addresses: user.addresses })
  } catch (err) { next(err) }
}

// ─── ADMIN: GET ALL USERS ──────────────────────────
exports.getAllUsers = async (req, res, next) => {
  try {
    const page  = parseInt(req.query.page)  || 1
    const limit = parseInt(req.query.limit) || 20
    const skip  = (page - 1) * limit

    const query = {}
    if (req.query.role)   query.role     = req.query.role
    if (req.query.search) query.$or = [
      { name:  new RegExp(req.query.search, 'i') },
      { email: new RegExp(req.query.search, 'i') },
    ]

    const [users, total] = await Promise.all([
      User.find(query).sort('-createdAt').skip(skip).limit(limit),
      User.countDocuments(query),
    ])

    return sendSuccess(res, 200, 'Users fetched.', {
      users,
      pagination: paginationMeta(total, page, limit),
    })
  } catch (err) { next(err) }
}

// ─── ADMIN: DELETE USER ────────────────────────────
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return sendError(res, 404, 'User not found.')
    if (user.role === 'admin') return sendError(res, 403, 'Cannot delete admin users.')

    await user.deleteOne()
    return sendSuccess(res, 200, 'User deleted.')
  } catch (err) { next(err) }
}
