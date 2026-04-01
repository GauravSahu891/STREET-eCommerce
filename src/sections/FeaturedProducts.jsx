import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { getFeaturedProducts } from '../utils/data'

// =====================================================
// FEATURED PRODUCTS SECTION
// =====================================================

const FeaturedProducts = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const featuredProducts = getFeaturedProducts()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Label */}
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-accent-500" />
              <span className="text-accent-400 text-sm font-semibold uppercase tracking-widest">
                Featured
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-black font-poppins text-white">
              Hand-Picked
              <span className="block text-gradient bg-gradient-to-r from-accent-400 to-blue-400 bg-clip-text text-transparent">
                For You
              </span>
            </h2>

            <p className="text-gray-400 mt-3 text-base max-w-md">
              Our curated selection of premium streetwear essentials — the pieces our team loves most.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/products">
              <motion.button
                className="group flex items-center gap-2 border border-white/10 hover:border-accent-500/50 text-white font-semibold px-6 py-3 rounded-xl hover:bg-accent-500/5 transition-all duration-300 text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View All Products
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/products">
            <motion.button
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-10 py-4 rounded-2xl shadow-glow-purple transition-all duration-300"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <ShopAllIcon />
              Shop All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

const ShopAllIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)

export default FeaturedProducts
