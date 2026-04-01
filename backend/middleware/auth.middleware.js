const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  try {
    let token

    // Check Authorization header
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    }
    // Fallback: check cookie
    else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id).select('-password -refreshToken')
    if (!user) {
      return res.status(401).json({ success: false, message: 'User no longer exists.' })
    }
    if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'Account has been deactivated.' })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired. Please login again.' })
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token.' })
    }
    next(error)
  }
}

// Optional auth — attaches user if token present, but doesn't block if absent
const optionalAuth = async (req, res, next) => {
  try {
    let token
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password -refreshToken')
    }
    next()
  } catch {
    next()
  }
}

module.exports = { protect, optionalAuth }
