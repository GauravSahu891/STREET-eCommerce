import React from 'react'
import { motion } from 'framer-motion'

// =====================================================
// LOADING SPINNER COMPONENT
// =====================================================

const LoadingSpinner = ({
  size = 'md',
  color = 'accent',
  fullScreen = false,
  text = '',
  className = '',
}) => {
  const sizeMap = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }

  const colorMap = {
    accent: 'border-accent-500',
    white: 'border-white',
    blue: 'border-blue-500',
    gray: 'border-gray-400',
  }

  const spinnerSize = sizeMap[size] || sizeMap.md
  const spinnerColor = colorMap[color] || colorMap.accent

  if (fullScreen) {
    return (
      <motion.div
        className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <motion.div
            className="text-3xl font-black font-poppins tracking-tight"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            STR<span className="text-accent-500">=</span>T
          </motion.div>

          {/* Spinner */}
          <div className="relative">
            <div
              className={`${spinnerSize} rounded-full border-4 border-white/10 ${spinnerColor} border-t-transparent animate-spin`}
            />
            <div
              className={`absolute inset-0 rounded-full border-4 border-transparent border-b-accent-500/30 animate-spin`}
              style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
            />
          </div>

          {text && (
            <p className="text-gray-400 text-sm font-inter">{text}</p>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="relative">
        <div
          className={`${spinnerSize} rounded-full border-4 border-white/10 ${spinnerColor} border-t-transparent animate-spin`}
        />
      </div>
      {text && (
        <p className="text-gray-400 text-sm font-inter">{text}</p>
      )}
    </div>
  )
}

export const PageLoader = () => (
  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
    <LoadingSpinner size="lg" fullScreen={false} text="Loading..." />
  </div>
)

export const InlineLoader = ({ className = '' }) => (
  <LoadingSpinner size="sm" className={className} />
)

export default LoadingSpinner
