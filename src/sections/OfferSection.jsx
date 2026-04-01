import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Zap, ArrowRight, Tag } from 'lucide-react'

// =====================================================
// OFFER SECTION WITH COUNTDOWN TIMER
// =====================================================

const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate - new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

const CountdownBlock = ({ value, label }) => (
  <motion.div
    className="flex flex-col items-center min-w-[70px] md:min-w-[90px]"
    whileHover={{ scale: 1.05 }}
  >
    <div className="relative w-full">
      <div className="bg-white/5 border border-white/10 rounded-2xl px-4 md:px-6 py-4 md:py-5 text-center backdrop-blur-sm">
        <motion.span
          key={value}
          className="text-4xl md:text-5xl font-black font-poppins text-white block"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ textShadow: '0 0 20px rgba(139,92,246,0.5)' }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
    </div>
    <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest mt-2">
      {label}
    </span>
  </motion.div>
)

const OfferSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // Set countdown target to 3 days from now
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 3)
  targetDate.setHours(23, 59, 59, 999)

  const timeLeft = useCountdown(targetDate)

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#0d0d0d] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#0f0a1e] to-[#0a0a1a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-accent-900/40 via-transparent to-blue-900/20" />

          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-80 h-80 border border-accent-500/10 rounded-full" />
          <div className="absolute -top-10 -right-10 w-60 h-60 border border-accent-500/10 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-blue-500/10 rounded-full" />

          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(rgba(139,92,246,0.8) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="max-w-2xl mx-auto text-center">
              {/* Limited Time Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-accent-500/15 border border-accent-500/30 text-accent-300 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Zap size={14} className="fill-current" />
                Limited Time Offer
                <Zap size={14} className="fill-current" />
              </motion.div>

              {/* Discount Text */}
              <motion.h2
                className="text-6xl md:text-8xl font-black font-poppins leading-none mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-gradient bg-gradient-to-r from-accent-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
                  UP TO
                </span>
              </motion.h2>

              <motion.div
                className="text-7xl md:text-9xl font-black font-poppins leading-none text-white mb-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ textShadow: '0 0 60px rgba(139,92,246,0.4)' }}
              >
                50% OFF
              </motion.div>

              <motion.div
                className="flex items-center justify-center gap-2 text-gray-300 text-lg mb-10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Tag size={18} className="text-accent-400" />
                <span>On selected items — No code needed</span>
              </motion.div>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold mb-5">
                  Offer Ends In
                </p>
                <div className="flex items-center justify-center gap-3 md:gap-4 mb-10">
                  <CountdownBlock value={timeLeft.days} label="Days" />
                  <span className="text-accent-500 text-3xl font-bold mb-4">:</span>
                  <CountdownBlock value={timeLeft.hours} label="Hours" />
                  <span className="text-accent-500 text-3xl font-bold mb-4">:</span>
                  <CountdownBlock value={timeLeft.minutes} label="Minutes" />
                  <span className="text-accent-500 text-3xl font-bold mb-4">:</span>
                  <CountdownBlock value={timeLeft.seconds} label="Seconds" />
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.65 }}
              >
                <Link to="/products?badge=sale">
                  <motion.button
                    className="group inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-black font-black text-lg px-10 py-5 rounded-2xl shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.04, y: -3, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Claim Your Discount
                    <ArrowRight
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </motion.button>
                </Link>

                <p className="text-gray-600 text-xs mt-4">
                  *Offer valid while stocks last. Cannot be combined with other offers.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default OfferSection
