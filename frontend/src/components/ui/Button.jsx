import React from 'react'
import { motion } from 'framer-motion'

// =====================================================
// BUTTON COMPONENT
// =====================================================

const variantClasses = {
  primary:
    'bg-accent-500 hover:bg-accent-600 text-white shadow-lg hover:shadow-glow-purple border border-transparent',
  secondary:
    'bg-white hover:bg-gray-100 text-gray-900 border border-transparent shadow-md',
  outline:
    'bg-transparent border border-white/20 hover:border-accent-500 text-white hover:bg-accent-500/10',
  ghost:
    'bg-transparent hover:bg-white/5 text-white border border-transparent',
  danger:
    'bg-red-600 hover:bg-red-700 text-white border border-transparent shadow-md',
  success:
    'bg-green-600 hover:bg-green-700 text-white border border-transparent shadow-md',
}

const sizeClasses = {
  xs: 'px-3 py-1.5 text-xs rounded-lg',
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
  xl: 'px-10 py-5 text-lg rounded-2xl',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  leftIcon = null,
  rightIcon = null,
  fullWidth = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold font-inter
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    select-none
    ${fullWidth ? 'w-full' : ''}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `

  return (
    <motion.button
      type={type}
      className={baseClasses}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled || loading ? 1 : 1.02, y: disabled || loading ? 0 : -1 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  )
}

export default Button
