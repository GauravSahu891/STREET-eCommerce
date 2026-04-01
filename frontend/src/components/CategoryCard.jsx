import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// =====================================================
// CATEGORY CARD COMPONENT
// =====================================================

const CategoryCard = ({ category, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="group"
    >
      <Link
        to={`/products?category=${category.slug}`}
        className="block"
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#1a1a1a] cursor-pointer"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Background Image */}
          <motion.img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-accent-500/20"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Border on hover */}
          <motion.div
            className="absolute inset-0 border-2 border-accent-500 rounded-2xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
                  {category.count} Products
                </p>
                <h3 className="text-white font-bold font-poppins text-xl group-hover:text-accent-300 transition-colors duration-200">
                  {category.name}
                </h3>
              </div>

              <motion.div
                className="w-9 h-9 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0"
                initial={{ x: 0, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={16} className="text-white" />
              </motion.div>
            </div>

            {/* Shop Now - appears on hover */}
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              whileHover={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-white text-sm font-semibold">Shop {category.name}</span>
                <ArrowRight size={16} className="text-accent-400" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default CategoryCard
