import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '../utils/data'

// =====================================================
// TESTIMONIALS SECTION
// =====================================================

const StarRow = ({ count }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < count ? 'fill-amber-400 text-amber-400' : 'text-gray-700'}
      />
    ))}
  </div>
)

const TestimonialCard = ({ testimonial, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="bg-[#111111] border border-white/5 rounded-2xl p-6 h-full flex flex-col relative overflow-hidden"
        whileHover={{
          y: -4,
          borderColor: 'rgba(139,92,246,0.15)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background glow on hover */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Quote icon */}
        <div className="w-10 h-10 bg-accent-500/10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0">
          <Quote size={18} className="text-accent-500" />
        </div>

        {/* Stars */}
        <StarRow count={testimonial.rating} />

        {/* Review text */}
        <p className="text-gray-300 text-sm leading-relaxed mt-4 flex-1">
          "{testimonial.text}"
        </p>

        {/* Divider */}
        <div className="border-t border-white/5 mt-6 pt-5">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-white/10"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[#111111]" />
            </div>

            {/* Info */}
            <div>
              <div className="text-white font-semibold text-sm">{testimonial.name}</div>
              <div className="text-gray-500 text-xs">{testimonial.role}</div>
            </div>

            {/* Verified */}
            <div className="ml-auto">
              <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-semibold">
                ✓ Verified
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star size={16} className="text-amber-400 fill-amber-400" />
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-poppins text-white mb-4">
            What Our
            <span className="text-gradient bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              {' '}Customers
            </span>{' '}
            Say
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Don't just take our word for it. Here's what real customers have to say about STREET.
          </p>
        </motion.div>

        {/* Summary stats */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { value: '4.9/5', label: 'Average Rating' },
            { value: '50,000+', label: 'Happy Customers' },
            { value: '98%', label: 'Would Recommend' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black font-poppins text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
