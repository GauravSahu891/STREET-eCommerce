const jwt        = require('jsonwebtoken')
const User       = require('../models/User')
const { generateAccessToken, generateRefreshToken, setTokenCookies, clearTokenCookies } = require('../utils/generateToken')
const { sendSuccess, sendError } = require('../utils/apiResponse')

// ─── REGISTER ──────────────────────────────────────
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const existing = await User.findOne({ email })
    if (existing) return sendError(res, 409, 'Email already registered.')

    const user = await User.create({ name, email, password })

    const accessToken  = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    user.refreshToken = refreshToken
    user.lastLogin    = new Date()
    await user.save({ validateBeforeSave: false })

    setTokenCookies(res, accessToken, refreshToken)

    return sendSuccess(res, 201, 'Account created successfully.', {
      user,
      accessToken,
    })
  } catch (err) {
    next(err)
  }
}

// ─── LOGIN ─────────────────────────────────────────
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')
    if (!user) return sendError(res, 401, 'Invalid email or password.')

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return sendError(res, 401, 'Invalid email or password.')

    if (!user.isActive) return sendError(res, 403, 'Account deactivated. Contact support.')

    const accessToken  = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    user.refreshToken = refreshToken
    user.lastLogin    = new Date()
    await user.save({ validateBeforeSave: false })

    setTokenCookies(res, accessToken, refreshToken)

    // Remove password from response
    user.password = undefined

    return sendSuccess(res, 200, 'Login successful.', { user, accessToken })
  } catch (err) {
    next(err)
  }
}

// ─── LOGOUT ────────────────────────────────────────
exports.logout = async (req, res, next) => {
  try {
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, { refreshToken: '' })
    }
    clearTokenCookies(res)
    return sendSuccess(res, 200, 'Logged out successfully.')
  } catch (err) {
    next(err)
  }
}

// ─── GET CURRENT USER ──────────────────────────────
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist', 'name image price')
    return sendSuccess(res, 200, 'User fetched.', { user })
  } catch (err) {
    next(err)
  }
}

// ─── REFRESH TOKEN ─────────────────────────────────
exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken || req.body.refreshToken
    if (!token) return sendError(res, 401, 'No refresh token provided.')

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    const user = await User.findById(decoded.id).select('+refreshToken')

    if (!user || user.refreshToken !== token) {
      return sendError(res, 401, 'Invalid refresh token.')
    }

    const accessToken     = generateAccessToken(user._id)
    const newRefreshToken = generateRefreshToken(user._id)

    user.refreshToken = newRefreshToken
    await user.save({ validateBeforeSave: false })

    setTokenCookies(res, accessToken, newRefreshToken)

    return sendSuccess(res, 200, 'Token refreshed.', { accessToken })
  } catch (err) {
    if (err.name === 'TokenExpiredError') return sendError(res, 401, 'Refresh token expired. Please login again.')
    next(err)
  }
}
