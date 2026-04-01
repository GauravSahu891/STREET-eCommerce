import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2, ShoppingBag, ChevronRight, ArrowRight } from 'lucide-react'
import useWishlist from '../hooks/useWishlist'
import useCart from '../hooks/useCart'
import { Star } from 'lucide-react'

// =====================================================
// WISHLIST PAGE
// =====================================================

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product, 1, product.sizes?.[0] || 'M', product.colors?.[0] || '#1a1a1a')
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        <div className="bg-[#0d0d0d] border-b border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-5">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white">Wishlist</span>
            </nav>
            <h1 className="text-4xl font-black font-poppins text-white">
              My <span className="text-accent-500">Wishlist</span>
            </h1>
          </div>
        </div>

        <motion.div
          className="flex flex-col items-center justify-center py-32 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-[#111111] border border-white/5 rounded-3xl flex items-center justify-center mb-6">
            <Heart size={40} className="text-gray-600" />
          </div>
          <h2 className="text-white font-black text-2xl mb-3">Your wishlist is empty</h2>
          <p className="text-gray-400 text-base mb-8 max-w-sm">
            Save items you love by tapping the heart icon on any product.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-glow-purple"
          >
            Browse Products <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Wishlist</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black font-poppins text-white">
                My <span className="text-accent-500">Wishlist</span>
              </h1>
              <p className="text-gray-400 mt-1 text-sm">{wishlistItems.length} saved item{wishlistItems.length !== 1 ? 's' : ''}</p>
            </div>
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm font-medium transition-colors duration-200"
            >
              <Trash2 size={15} />
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          layout
        >
          <AnimatePresence>
            {wishlistItems.map((product, index) => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="bg-[#111111] border border-white/5 hover:border-accent-500/20 rounded-3xl overflow-hidden group transition-all duration-300"
                >
                  {/* Image */}
                  <Link to={`/products/${product.id}`} className="block relative overflow-hidden aspect-square">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.4 }}
                    />
                    {product.badge && (
                      <span
                        className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white ${
                          product.badge === 'NEW' ? 'bg-blue-500' :
                          product.badge === 'HOT' ? 'bg-red-500' : 'bg-accent-500'
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        -{discount}%
                      </span>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-accent-500 text-xs font-semibold uppercase tracking-wider mb-1">
                      {product.category}
                    </p>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-white font-bold text-sm mb-2 hover:text-accent-400 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={11}
                            className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-700'}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 text-xs">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-white font-black text-base">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-gray-600 text-sm line-through">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-accent-500 hover:bg-accent-600 text-white font-bold py-2.5 rounded-xl text-xs transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <ShoppingBag size={13} />
                        Add to Cart
                      </motion.button>
                      <motion.button
                        onClick={() => removeFromWishlist(product.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Remove from wishlist"
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 border border-white/10 hover:border-accent-500/40 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300"
          >
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
