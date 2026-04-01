import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowRight, Grid3X3, Package } from 'lucide-react'
import { categories, products } from '../utils/data'

// =====================================================
// CATEGORIES PAGE
// =====================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const CategoriesPage = () => {
  const navigate = useNavigate()
  const [hoveredId, setHoveredId] = useState(null)

  const getProductsForCategory = (categoryName) =>
    products.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase())

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Categories</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black font-poppins text-white leading-tight">
                Shop by <span className="text-accent-500">Category</span>
              </h1>
              <p className="text-gray-400 mt-3 text-base max-w-lg">
                Browse our carefully curated collections — from essential tees to premium outerwear.
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Grid3X3 size={16} />
              <span>{categories.length} Categories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((cat) => {
            const catProducts = getProductsForCategory(cat.name)
            return (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                onHoverStart={() => setHoveredId(cat.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group block relative overflow-hidden rounded-3xl bg-[#111111] border border-white/5 hover:border-accent-500/30 transition-all duration-400"
                  style={{ aspectRatio: '4/3' }}
                >
                  {/* Background Image */}
                  <motion.img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{ scale: hoveredId === cat.id ? 1.08 : 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                          {cat.count} Products
                        </p>
                        <h3 className="text-white text-2xl font-black font-poppins">
                          {cat.name}
                        </h3>
                      </div>
                      <motion.div
                        className="w-10 h-10 bg-accent-500 rounded-2xl flex items-center justify-center flex-shrink-0"
                        animate={{
                          x: hoveredId === cat.id ? 0 : 10,
                          opacity: hoveredId === cat.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        <ArrowRight size={18} className="text-white" />
                      </motion.div>
                    </div>

                    {/* Preview products */}
                    {catProducts.length > 0 && (
                      <motion.div
                        className="flex gap-2 mt-4 overflow-hidden"
                        animate={{
                          y: hoveredId === cat.id ? 0 : 20,
                          opacity: hoveredId === cat.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {catProducts.slice(0, 3).map((p) => (
                          <div
                            key={p.id}
                            className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 flex-shrink-0"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {catProducts.length > 3 && (
                          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                            +{catProducts.length - 3}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* All Products CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="inline-flex flex-col items-center gap-4 bg-[#111111] border border-white/5 rounded-3xl px-10 py-8">
            <Package size={32} className="text-accent-500" />
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Browse Everything</h3>
              <p className="text-gray-400 text-sm">
                Can't decide? View all {products.length} products in one place.
              </p>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-7 py-3 rounded-2xl transition-all duration-300 shadow-glow-purple"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CategoriesPage
