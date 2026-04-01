import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  ShoppingBag,
  Heart,
  ArrowLeft,
  Minus,
  Plus,
  ChevronRight,
  Shield,
  Truck,
  RefreshCw,
  Share2,
  Check,
  ChevronDown,
} from 'lucide-react'
import { getProductById, getRelatedProducts } from '../utils/data'
import useCart from '../hooks/useCart'
import ProductCard from '../components/ProductCard'

// =====================================================
// PRODUCT DETAIL PAGE
// =====================================================

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-700'}
      />
    ))}
  </div>
)

const tabList = ['Description', 'Reviews', 'Shipping & Returns']

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = getProductById(id)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <p className="text-gray-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/products"
          className="bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-3 rounded-xl transition-colors duration-200"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  const relatedProducts = getRelatedProducts(id, product.category)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 1) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 3000)
      return
    }
    const size = selectedSize || product.sizes[0]
    const color = product.colors[selectedColorIndex]
    addToCart(product, quantity, size, color)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const handleBuyNow = () => {
    if (!selectedSize && product.sizes.length > 1) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 3000)
      return
    }
    const size = selectedSize || product.sizes[0]
    const color = product.colors[selectedColorIndex]
    addToCart(product, quantity, size, color)
    navigate('/cart')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight size={14} />
          <span className="text-gray-400">{product.category}</span>
          <ChevronRight size={14} />
          <span className="text-white truncate max-w-48">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              className="relative rounded-3xl overflow-hidden bg-[#111111] border border-white/5 aspect-square"
              layoutId={`product-image-${product.id}`}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const fb = e.currentTarget.parentElement.querySelector('.img-fallback')
                    if (fb) fb.style.display = 'flex'
                  }}
                />
              </AnimatePresence>
              <div className="img-fallback absolute inset-0 items-center justify-center bg-[#1a1a1a] flex-col gap-3" style={{ display: 'none' }}>
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="text-gray-700">
                  <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.55 2.22l1.68 12A2 2 0 005.72 19.5H18.28a2 2 0 001.97-1.82l1.68-12a2 2 0 00-1.55-2.22z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-500 text-sm">{product.category}</span>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full ${
                      product.badge === 'NEW'
                        ? 'bg-blue-500'
                        : product.badge === 'HOT'
                        ? 'bg-red-500'
                        : 'bg-accent-500'
                    } text-white`}
                  >
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    -{discount}%
                  </span>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:border-accent-500/40 transition-all duration-200"
              >
                <Heart
                  size={18}
                  className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}
                />
              </button>
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-2xl overflow-hidden aspect-square bg-[#111111] border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-accent-500 shadow-glow-purple'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0'
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-accent-400 text-sm font-semibold uppercase tracking-widest">
                {product.category}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-black font-poppins text-white mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={product.rating} />
              <span className="text-white font-semibold">{product.rating}</span>
              <span className="text-gray-500 text-sm">
                ({product.reviews.toLocaleString()} reviews)
              </span>
              <span className="text-gray-700">·</span>
              <span className="text-green-400 text-sm font-medium">In Stock</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-white/5">
              <span className="text-4xl font-black font-poppins text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-500 text-xl line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-green-400 font-bold text-sm bg-green-500/10 px-2 py-0.5 rounded-lg">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white font-semibold text-sm">Color:</span>
                <span className="text-gray-400 text-sm">
                  {product.colorNames?.[selectedColorIndex] || 'Select Color'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedColorIndex(index)}
                    className={`relative w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                      selectedColorIndex === index
                        ? 'border-accent-500 scale-110 shadow-glow-purple'
                        : 'border-white/20 hover:border-white/50'
                    }`}
                    style={{ backgroundColor: color }}
                    whileHover={{ scale: selectedColorIndex === index ? 1.1 : 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    title={product.colorNames?.[index]}
                  >
                    {selectedColorIndex === index && (
                      <Check
                        size={14}
                        className={`absolute inset-0 m-auto ${
                          color === '#ffffff' || color === '#f5f5f5' ? 'text-black' : 'text-white'
                        }`}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className={`font-semibold text-sm ${sizeError ? 'text-red-400' : 'text-white'}`}>
                  {sizeError ? '⚠ Please select a size' : 'Size:'}
                  {selectedSize && !sizeError && (
                    <span className="text-gray-400 font-normal ml-2">{selectedSize}</span>
                  )}
                </span>
                <button className="text-accent-400 text-xs hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false) }}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-150 ${
                      selectedSize === size
                        ? 'bg-accent-500 border-accent-500 text-white shadow-glow-purple'
                        : sizeError
                        ? 'border-red-500/30 text-gray-400 hover:border-red-500/60 hover:text-white'
                        : 'border-white/10 text-gray-400 hover:border-accent-500/40 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-white font-semibold text-sm block mb-3">Quantity:</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
                  <motion.button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-150"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus size={16} />
                  </motion.button>
                  <span className="w-12 text-center text-white font-bold text-lg">{quantity}</span>
                  <motion.button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-150"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
                <span className="text-gray-500 text-sm">Max 10 per order</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-8">
              <motion.button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 font-bold py-4 rounded-2xl transition-all duration-300 ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-accent-500 hover:bg-accent-600 text-white shadow-glow-purple'
                }`}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {addedToCart ? (
                  <>
                    <Check size={18} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    Add to Cart
                  </>
                )}
              </motion.button>
              <motion.button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 font-bold py-4 rounded-2xl bg-white hover:bg-gray-100 text-black transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Orders over $100' },
                { icon: RefreshCw, label: 'Free Returns', sub: '30-day policy' },
                { icon: Shield, label: 'Secure Pay', sub: '100% protected' },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="bg-[#111111] border border-white/5 rounded-xl p-3 flex flex-col items-center text-center gap-1"
                >
                  <Icon size={18} className="text-accent-400" />
                  <span className="text-white text-xs font-semibold">{label}</span>
                  <span className="text-gray-500 text-xs">{sub}</span>
                </div>
              ))}
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors duration-200">
              <Share2 size={14} />
              Share this product
            </button>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-20">
          {/* Tab headers */}
          <div className="flex gap-0 border-b border-white/5 mb-8">
            {tabList.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`relative px-6 py-4 text-sm font-semibold transition-all duration-200 ${
                  activeTab === index
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
                {activeTab === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500"
                    layoutId="tabIndicator"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 0 && (
                <div className="max-w-2xl">
                  <p className="text-gray-300 leading-relaxed mb-6 text-base">{product.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Material', value: '100% Premium Cotton Blend' },
                      { label: 'Fit', value: 'Relaxed / Oversized' },
                      { label: 'Care', value: 'Machine wash cold' },
                      { label: 'Origin', value: 'Designed in NYC' },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-[#111111] border border-white/5 rounded-xl p-4">
                        <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</div>
                        <div className="text-white text-sm font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="max-w-2xl space-y-4">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-5xl font-black text-white">{product.rating}</div>
                      <div className="flex justify-center mt-1">
                        <StarRating rating={product.rating} />
                      </div>
                      <div className="text-gray-500 text-sm mt-1">
                        {product.reviews.toLocaleString()} reviews
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 6 : star === 2 ? 2 : 2
                        return (
                          <div key={star} className="flex items-center gap-3">
                            <span className="text-gray-500 text-xs w-4">{star}</span>
                            <Star size={10} className="fill-amber-400 text-amber-400 flex-shrink-0" />
                            <div className="flex-1 bg-[#1a1a1a] rounded-full h-1.5">
                              <div
                                className="bg-amber-400 h-1.5 rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-gray-500 text-xs w-8">{pct}%</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Reviews are verified purchases. Average rating based on {product.reviews.toLocaleString()} customer reviews.
                  </p>
                </div>
              )}

              {activeTab === 2 && (
                <div className="max-w-2xl space-y-6">
                  {[
                    {
                      title: 'Free Standard Shipping',
                      desc: 'On all orders over $100. Delivered in 5-7 business days.',
                      icon: Truck,
                    },
                    {
                      title: 'Express Shipping',
                      desc: '$14.99 flat rate. Delivered in 2-3 business days.',
                      icon: Truck,
                    },
                    {
                      title: 'Free Returns',
                      desc: 'Return any unworn item within 30 days for a full refund.',
                      icon: RefreshCw,
                    },
                  ].map(({ title, desc, icon: Icon }) => (
                    <div key={title} className="flex gap-4 bg-[#111111] border border-white/5 rounded-2xl p-5">
                      <div className="w-10 h-10 bg-accent-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-accent-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{title}</h4>
                        <p className="text-gray-400 text-sm">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black font-poppins text-white">
                You Might Also Like
              </h2>
              <Link
                to="/products"
                className="text-accent-400 hover:text-accent-300 text-sm font-medium flex items-center gap-1 transition-colors"
              >
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailPage
