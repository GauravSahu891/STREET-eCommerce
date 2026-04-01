import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react'
import { ProductBadge } from './ui/Badge'
import useCart from '../hooks/useCart'
import useWishlist from '../hooks/useWishlist'

// =====================================================
// PRODUCT CARD COMPONENT
// =====================================================

const StarRating = ({ rating, size = 'sm' }) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} className="fill-amber-400 text-amber-400" size={size === 'sm' ? 12 : 14} />)
    } else if (i === fullStars && hasHalf) {
      stars.push(
        <span key={i} className="relative inline-block">
          <Star className="text-gray-600" size={size === 'sm' ? 12 : 14} />
          <span className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="fill-amber-400 text-amber-400" size={size === 'sm' ? 12 : 14} />
          </span>
        </span>
      )
    } else {
      stars.push(<Star key={i} className="text-gray-600" size={size === 'sm' ? 12 : 14} />)
    }
  }

  return <div className="flex items-center gap-0.5">{stars}</div>
}

const ProductCard = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1, product.sizes?.[0] || 'M', product.colors?.[0] || '#1a1a1a')
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block">
        <motion.div
          className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden"
          whileHover={{
            y: -6,
            boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.1)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden aspect-[3/4] bg-[#1a1a1a]">
            {/* Product Image */}
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextSibling.style.display = 'flex'
              }}
            />
            {/* Fallback placeholder (hidden by default) */}
            <div
              className="absolute inset-0 hidden items-center justify-center bg-[#1a1a1a] flex-col gap-2"
              style={{ display: 'none' }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-gray-700">
                <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.55 2.22l1.68 12A2 2 0 005.72 19.5H18.28a2 2 0 001.97-1.82l1.68-12a2 2 0 00-1.55-2.22z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-gray-600 text-xs font-medium">{product.category}</span>
            </div>

            {/* Dark overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-black/20"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3 z-10">
                <ProductBadge badge={product.badge} />
              </div>
            )}

            {/* Discount Badge */}
            {discount > 0 && (
              <div className="absolute top-3 right-3 z-10">
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  -{discount}%
                </span>
              </div>
            )}

            {/* Wishlist Button */}
            <motion.button
              onClick={handleWishlist}
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10 transition-all duration-200"
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 8,
                top: discount > 0 ? '3rem' : '0.75rem',
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                size={16}
                className={wishlisted ? 'fill-red-500 text-red-500' : 'text-white'}
              />
            </motion.button>

            {/* Quick View Button */}
            <motion.div
              className="absolute bottom-3 left-3 z-10"
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
              transition={{ duration: 0.25, delay: 0.05 }}
            >
              <Link
                to={`/products/${product.id}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <Eye size={12} />
                Quick View
              </Link>
            </motion.div>

            {/* Add to Cart Button */}
            <AnimatePresence>
              <motion.button
                key="add-to-cart"
                onClick={handleAddToCart}
                className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
                transition={{ duration: 0.25, delay: 0.08 }}
              >
                <motion.div
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
                    addedToCart
                      ? 'bg-green-500 text-white'
                      : 'bg-accent-500 hover:bg-accent-600 text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag size={12} />
                  {addedToCart ? 'Added!' : 'Add to Cart'}
                </motion.div>
              </motion.button>
            </AnimatePresence>
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Category */}
            <p className="text-xs text-accent-400 font-medium uppercase tracking-wider mb-1">
              {product.category}
            </p>

            {/* Name */}
            <h3 className="text-white font-semibold font-poppins text-sm leading-snug mb-2 line-clamp-2 group-hover:text-accent-300 transition-colors duration-200">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={product.rating} />
              <span className="text-gray-400 text-xs">
                {product.rating} ({product.reviews.toLocaleString()})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg price-tag">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-500 text-sm line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Color swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1.5 mt-3">
                {product.colors.slice(0, 4).map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-white/20 cursor-pointer hover:scale-125 transition-transform duration-200"
                    style={{ backgroundColor: color }}
                    title={product.colorNames?.[i] || color}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-gray-500 text-xs">+{product.colors.length - 4}</span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
