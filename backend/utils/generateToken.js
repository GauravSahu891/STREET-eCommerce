const jwt = require('jsonwebtoken')

const generateAccessToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

const generateRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  })

const setTokenCookies = (res, accessToken, refreshToken) => {
  const isProd = process.env.NODE_ENV === 'production'

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure:   isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days
  })

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure:   isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge:   30 * 24 * 60 * 60 * 1000, // 30 days
    path:     '/api/auth/refresh',
  })
}

const clearTokenCookies = (res) => {
  res.cookie('accessToken',  '', { maxAge: 0 })
  res.cookie('refreshToken', '', { maxAge: 0, path: '/api/auth/refresh' })
}

module.exports = { generateAccessToken, generateRefreshToken, setTokenCookies, clearTokenCookies }
