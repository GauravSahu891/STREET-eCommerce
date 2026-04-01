const router = require('express').Router()
const { register, login, logout, getMe, refreshToken } = require('../controllers/auth.controller')
const { protect } = require('../middleware/auth.middleware')

// POST /api/auth/register
router.post('/register', register)

// POST /api/auth/login
router.post('/login', login)

// POST /api/auth/logout
router.post('/logout', protect, logout)

// GET  /api/auth/me
router.get('/me', protect, getMe)

// POST /api/auth/refresh
router.post('/refresh', refreshToken)

module.exports = router
