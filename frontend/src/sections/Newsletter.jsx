import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, ArrowRight, Check, Shield } from 'lucide-react'

// =====================================================
// NEWSLETTER SECTION
// =====================================================

const Newsletter = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    setStatus('loading')
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 5000)
  }

  const benefits = [
    'Early access to new drops',
    'Exclusive member discounts',
    'Style guides & lookbooks',
    'No spam, ever',
  ]

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
          <div className="absolute inset-0 bg-gradient-to-br from-[#13091f] via-[#0f0a1a] to-[#090d1f]" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/3 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl" />
          </div>

          {/* Decorative lines */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center">
              {/* Icon */}
              <motion.div
                className="w-16 h-16 bg-accent-500/15 border border-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Mail size={28} className="text-accent-400" />
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-accent-400 text-sm font-semibold uppercase tracking-widest block mb-3">
                  Newsletter
                </span>
                <h2 className="text-4xl md:text-5xl font-black font-poppins text-white mb-4">
                  Stay in the{' '}
                  <span className="text-gradient bg-gradient-to-r from-accent-400 to-blue-400 bg-clip-text text-transparent">
                    Loop
                  </span>
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
                  Join 50,000+ streetwear enthusiasts. Get first access to new drops, exclusive deals, and style inspiration.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 mb-8 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex-1 relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={`w-full bg-white/5 border text-white placeholder-gray-500 text-sm pl-11 pr-4 py-4 rounded-2xl focus:outline-none transition-all duration-200 ${
                      status === 'error'
                        ? 'border-red-500/50 focus:border-red-500'
                        : 'border-white/10 focus:border-accent-500'
                    }`}
                    disabled={status === 'loading' || status === 'success'}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`flex items-center justify-center gap-2 font-bold px-6 py-4 rounded-2xl transition-all duration-300 flex-shrink-0 ${
                    status === 'success'
                      ? 'bg-green-500 text-white cursor-default'
                      : status === 'loading'
                      ? 'bg-accent-500/60 text-white cursor-wait'
                      : 'bg-accent-500 hover:bg-accent-600 text-white shadow-glow-purple'
                  }`}
                  whileHover={status === 'idle' ? { scale: 1.03, y: -1 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.97 } : {}}
                >
                  {status === 'success' ? (
                    <>
                      <Check size={16} />
                      Subscribed!
                    </>
                  ) : status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </motion.form>

              {/* Error message */}
              {status === 'error' && (
                <motion.p
                  className="text-red-400 text-sm mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Please enter a valid email address.
                </motion.p>
              )}

              {/* Benefits */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-4 mb-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <Check size={12} className="text-green-500 flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </motion.div>

              {/* Privacy note */}
              <motion.div
                className="flex items-center justify-center gap-2 text-gray-600 text-xs"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Shield size={12} className="text-gray-600" />
                We respect your privacy. Unsubscribe at any time. No spam, ever.
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
