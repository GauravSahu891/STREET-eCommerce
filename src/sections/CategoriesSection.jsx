import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Grid3X3 } from 'lucide-react'
import CategoryCard from '../components/CategoryCard'
import { categories } from '../utils/data'

// =====================================================
// CATEGORIES SECTION
// =====================================================

const CategoriesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="categories" className="py-20 md:py-28 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Grid3X3 size={16} className="text-accent-500" />
            <span className="text-accent-400 text-sm font-semibold uppercase tracking-widest">
              Browse
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-poppins text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            From head to toe — explore our full range of premium streetwear categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.07 }}
            >
              <CategoryCard category={category} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Featured category callout */}
        <motion.div
          className="mt-12 rounded-3xl overflow-hidden relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-accent-900/50 via-accent-800/30 to-blue-900/30 border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative">
              <span className="text-accent-400 text-sm font-semibold uppercase tracking-widest block mb-2">
                All Season Drops
              </span>
              <h3 className="text-3xl md:text-4xl font-black font-poppins text-white mb-2">
                New Collection
                <br />
                <span className="text-gradient bg-gradient-to-r from-accent-400 to-blue-400 bg-clip-text text-transparent">
                  Just Landed
                </span>
              </h3>
              <p className="text-gray-400 max-w-md">
                Fresh styles for every season. Premium quality, street-ready designs made to last.
              </p>
            </div>

            <div className="relative flex-shrink-0">
              <motion.a
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                Explore All
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CategoriesSection
