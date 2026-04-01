import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ArrowRight, Flame } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { getTrendingProducts } from '../utils/data'

// =====================================================
// TRENDING PRODUCTS SECTION
// =====================================================

const TrendingProducts = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const trendingProducts = getTrendingProducts()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#0a0a0a] overflow-hidden">
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
              <Flame size={16} className="text-red-400 fill-red-400" />
              <span className="text-red-400 text-sm font-semibold uppercase tracking-widest">
                Trending Now
              </span>
              <span className="text-lg">🔥</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-black font-poppins text-white">
              What's{' '}
              <span className="text-gradient bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                Hot
              </span>{' '}
              Right Now
            </h2>

            <p className="text-gray-400 mt-3 text-base max-w-md">
              The styles everyone's wearing. Don't sleep on these — they go fast.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/products">
              <motion.button
                className="group flex items-center gap-2 border border-white/10 hover:border-red-500/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-500/5 transition-all duration-300 text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                See All Trending
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Swiper Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={trendingProducts.length > 4}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="pb-14"
            style={{ overflow: 'visible' }}
          >
            {trendingProducts.map((product, index) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Trending tags */}
        <motion.div
          className="mt-10 flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {['#StreetCore', '#UrbanFit', '#PremiumDrops', '#NewSeason', '#LimitedEdition', '#STREETStyle'].map(
            (tag) => (
              <Link
                key={tag}
                to="/products"
                className="px-4 py-2 bg-white/5 border border-white/8 rounded-full text-gray-400 hover:text-accent-400 hover:border-accent-500/30 hover:bg-accent-500/5 text-sm font-medium transition-all duration-200"
              >
                {tag}
              </Link>
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default TrendingProducts
