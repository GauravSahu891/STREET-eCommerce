import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CategoriesPage from './pages/CategoriesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import WishlistPage from './pages/WishlistPage'
import ProfilePage from './pages/ProfilePage'

// =====================================================
// SCROLL TO TOP ON ROUTE CHANGE
// =====================================================
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// =====================================================
// PAGE TRANSITION WRAPPER
// =====================================================
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
)

// =====================================================
// ANIMATED ROUTES
// =====================================================
const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/products" element={<PageTransition><ProductListingPage /></PageTransition>} />
        <Route path="/products/:id" element={<PageTransition><ProductDetailPage /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
        <Route path="/categories" element={<PageTransition><CategoriesPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/wishlist" element={<PageTransition><WishlistPage /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
        {/* 404 Fallback */}
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

// =====================================================
// 404 PAGE
// =====================================================
const NotFoundPage = () => (
  <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-4 pt-20">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-8xl font-black font-poppins text-white/10 mb-4 select-none">404</div>
      <h1 className="text-3xl font-black font-poppins text-white mb-3">Page Not Found</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist. Let's get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-4 rounded-2xl shadow-glow-purple transition-all duration-300"
        >
          Go Home
        </a>
        <a
          href="/products"
          className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/30 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300"
        >
          Browse Products
        </a>
      </div>
    </motion.div>
  </div>
)

// =====================================================
// MAIN APP LAYOUT
// =====================================================
const AppLayout = () => (
  <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
    <ScrollToTop />
    <Navbar />
    <div className="flex-1">
      <AnimatedRoutes />
    </div>
    <Footer />
  </div>
)

// =====================================================
// APP ROOT
// =====================================================
const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <AppLayout />
        </Router>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App
