import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  ArrowRight,
  Tag,
  Truck,
  Shield,
  ChevronRight,
  X,
} from 'lucide-react'
import useCart from '../hooks/useCart'

// =====================================================
// CART PAGE
// =====================================================

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4 bg-[#111111] border border-white/5 rounded-2xl p-4 md:p-5"
    >
      {/* Image */}
      <Link to={`/products/${item.id}`} className="flex-shrink-0">
        <div className="w-20 h-24 md:w-24 md:h-28 rounded-xl overflow-hidden bg-[#1a1a1a]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link
            to={`/products/${item.id}`}
            className="text-white font-semibold font-poppins text-sm md:text-base hover:text-accent-300 transition-colors line-clamp-2"
          >
            {item.name}
          </Link>
          <button
            onClick={() => onRemove(item.id, item.size, item.color)}
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <X size={14} />
          </button>
        </div>

        <p className="text-gray-500 text-xs mb-3">{item.category}</p>

        {/* Size & Color */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.size && (
            <span className="bg-white/5 border border-white/10 text-gray-400 text-xs px-2.5 py-1 rounded-lg">
              Size: <span className="text-white font-medium">{item.size}</span>
            </span>
          )}
          {item.color && (
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-400 text-xs px-2.5 py-1 rounded-lg">
              Color:
              <span
                className="w-3 h-3 rounded-full border border-white/20 inline-block"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-white font-medium">{item.colorName}</span>
            </span>
          )}
        </div>

        {/* Quantity & Price */}
        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(item.id, item.size, item.color, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-150"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-white text-sm font-bold">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.size, item.color, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-150"
            >
              <Plus size={12} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-white font-bold text-base md:text-lg">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            {item.quantity > 1 && (
              <div className="text-gray-500 text-xs">${item.price.toFixed(2)} each</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const CartPage = () => {
  const { cartItems, cartSubtotal, cartSavings, shippingCost, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (promoCode.toUpperCase() === 'STREET20') {
      setPromoApplied(true)
      setPromoError(false)
    } else {
      setPromoError(true)
      setPromoApplied(false)
      setTimeout(() => setPromoError(false), 3000)
    }
  }

  const handleCheckout = async () => {
    setCheckoutLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setCheckoutLoading(false)
    alert('Checkout functionality coming soon! Thank you for shopping with STR=T.')
  }

  const promoDiscount = promoApplied ? cartSubtotal * 0.2 : 0
  const finalTotal = cartTotal - promoDiscount

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Cart</span>
          </nav>

          {/* Empty State */}
          <motion.div
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-28 h-28 bg-[#111111] border border-white/5 rounded-3xl flex items-center justify-center mb-6"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ShoppingBag size={48} className="text-gray-600" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-black font-poppins text-white mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-400 max-w-sm mb-8 text-base">
              Looks like you haven't added anything to your cart yet. Explore our collection and find something you love!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <motion.button
                  className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-4 rounded-2xl shadow-glow-purple transition-all duration-300"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ShoppingBag size={18} />
                  Start Shopping
                </motion.button>
              </Link>
              <Link to="/">
                <motion.button
                  className="flex items-center gap-2 border border-white/10 hover:border-white/30 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ArrowLeft size={18} />
                  Back to Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white">Cart</span>
            </nav>
            <h1 className="text-3xl font-black font-poppins text-white">
              Shopping Cart
              <span className="ml-3 text-xl font-normal text-gray-500">
                ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </span>
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm transition-colors duration-200 px-4 py-2 rounded-xl hover:bg-red-500/5"
          >
            <Trash2 size={14} />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <CartItem
                  key={`${item.id}-${item.size}-${item.color}`}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </AnimatePresence>

            {/* Continue Shopping */}
            <div className="pt-4">
              <Link
                to="/products"
                className="flex items-center gap-2 text-accent-400 hover:text-accent-300 font-medium text-sm transition-colors duration-200 group"
              >
                <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-[#111111] border border-white/5 rounded-2xl p-6 sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-white font-bold text-lg mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Subtotal ({cartItems.reduce((a, i) => a + i.quantity, 0)} items)</span>
                  <span className="text-white font-medium">${cartSubtotal.toFixed(2)}</span>
                </div>
                {cartSavings > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Original Price</span>
                    <span className="text-gray-500 line-through">${(cartSubtotal + cartSavings).toFixed(2)}</span>
                  </div>
                )}
                {cartSavings > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-400">You Save</span>
                    <span className="text-green-400 font-medium">-${cartSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className={shippingCost === 0 ? 'text-green-400 font-medium' : 'text-white font-medium'}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                {promoApplied && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-accent-400">Promo (STREET20)</span>
                    <span className="text-accent-400 font-medium">-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-lg">Total</span>
                  <span className="text-white font-black text-2xl">${finalTotal.toFixed(2)}</span>
                </div>
                {shippingCost === 0 && (
                  <p className="text-green-400 text-xs mt-1 text-right">Free shipping applied!</p>
                )}
                {shippingCost > 0 && (
                  <p className="text-gray-500 text-xs mt-1 text-right">
                    Add ${(100 - cartSubtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Promo code"
                      disabled={promoApplied}
                      className={`w-full bg-[#1a1a1a] border text-white placeholder-gray-500 text-sm pl-9 pr-3 py-3 rounded-xl focus:outline-none transition-all duration-200 ${
                        promoApplied
                          ? 'border-green-500/40 text-green-400'
                          : promoError
                          ? 'border-red-500/40'
                          : 'border-white/10 focus:border-accent-500'
                      }`}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={promoApplied}
                    className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      promoApplied
                        ? 'bg-green-500/20 text-green-400 cursor-default'
                        : 'bg-accent-500/20 hover:bg-accent-500/30 text-accent-400 border border-accent-500/30'
                    }`}
                    whileHover={!promoApplied ? { scale: 1.03 } : {}}
                    whileTap={!promoApplied ? { scale: 0.97 } : {}}
                  >
                    {promoApplied ? '✓' : 'Apply'}
                  </motion.button>
                </form>
                {promoError && (
                  <p className="text-red-400 text-xs mt-1.5">Invalid promo code. Try STREET20!</p>
                )}
                {promoApplied && (
                  <p className="text-green-400 text-xs mt-1.5">20% discount applied!</p>
                )}
              </div>

              {/* Checkout Button */}
              <motion.button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 rounded-2xl shadow-glow-purple transition-all duration-300 mb-4 disabled:opacity-70 disabled:cursor-wait"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {checkoutLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-gray-600">
                <div className="flex items-center gap-1.5 text-xs">
                  <Shield size={12} className="text-green-500" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <Truck size={12} className="text-blue-400" />
                  Fast Delivery
                </div>
              </div>

              {/* Payment Icons */}
              <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                {['VISA', 'MC', 'AMEX', 'PayPal'].map((p) => (
                  <span
                    key={p}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-500 text-[10px] font-mono font-semibold"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
