import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, ShoppingBag, TrendingUp } from 'lucide-react'
import { heroSlides } from '../utils/data'

// =====================================================
// HERO SECTION
// =====================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const FloatingBadge = ({ children, className = '', delay = 0 }) => (
  <motion.div
    className={`absolute bg-glass border border-white/10 rounded-2xl p-3 shadow-card ${className}`}
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: delay + 0.8, duration: 0.5, ease: 'easeOut' }}
    style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
  >
    {children}
  </motion.div>
)

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[activeSlide]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Purple glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-accent-600/15 rounded-full blur-[60px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            key={activeSlide}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse" />
                {slide.badge}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-poppins leading-none tracking-tight">
                <span className="text-white block">{slide.title}</span>
                <span className="block mt-1">
                  <span className="text-gradient bg-gradient-to-r from-accent-400 via-accent-500 to-blue-400 bg-clip-text text-transparent">
                    {slide.titleAccent}
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
            >
              {slide.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <Link to="/products">
                <motion.button
                  className="group flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-4 rounded-2xl shadow-glow-purple transition-all duration-300"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ShoppingBag size={18} />
                  Shop Now
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>
              </Link>
              <Link to="/products">
                <motion.button
                  className="group flex items-center gap-2 border border-white/15 hover:border-accent-500/50 text-white font-bold px-8 py-4 rounded-2xl hover:bg-accent-500/5 transition-all duration-300"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore Collection
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-8 pt-8 border-t border-white/5"
            >
              {[
                { value: '50K+', label: 'Customers' },
                { value: '200+', label: 'Products' },
                { value: '4.9', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black font-poppins text-white">{stat.value}</div>
                  <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Product Image */}
          <div className="relative flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                className="relative"
                initial={{ opacity: 0, scale: 0.95, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -40 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Image container */}
                <div className="relative w-80 sm:w-96 md:w-[420px] lg:w-[480px]">
                  {/* Glow behind image */}
                  <div className="absolute inset-8 bg-accent-500/30 blur-3xl rounded-full" />

                  {/* Main product image */}
                  <motion.div
                    className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <img
                      src={slide.image}
                      alt="Featured product"
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: '3/4' }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </motion.div>

                  {/* Floating badge - Rating */}
                  <FloatingBadge
                    className="top-8 -left-6 sm:-left-12"
                    delay={0}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-500/20 rounded-xl flex items-center justify-center">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">4.9/5</div>
                        <div className="text-gray-500 text-xs">12K Reviews</div>
                      </div>
                    </div>
                  </FloatingBadge>

                  {/* Floating badge - Trending */}
                  <FloatingBadge
                    className="bottom-20 -left-6 sm:-left-16"
                    delay={0.15}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <TrendingUp size={14} className="text-green-400" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">#1 Trending</div>
                        <div className="text-gray-500 text-xs">This week</div>
                      </div>
                    </div>
                  </FloatingBadge>

                  {/* Floating badge - New Drop */}
                  <FloatingBadge
                    className="top-16 -right-4 sm:-right-8"
                    delay={0.3}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-accent-500/20 rounded-xl flex items-center justify-center">
                        <ShoppingBag size={14} className="text-accent-400" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">New Drop</div>
                        <div className="text-gray-500 text-xs">Just arrived</div>
                      </div>
                    </div>
                  </FloatingBadge>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="absolute bottom-0 right-1/2 translate-x-1/2 lg:right-4 lg:translate-x-0 flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeSlide
                      ? 'w-8 h-2 bg-accent-500'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  )
}

export default HeroSection
