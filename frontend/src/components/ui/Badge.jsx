import React from 'react'

// =====================================================
// BADGE COMPONENT
// =====================================================

const badgeVariants = {
  new: 'bg-blue-500 text-white',
  hot: 'bg-red-500 text-white',
  sale: 'bg-accent-500 text-white',
  default: 'bg-gray-700 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-black',
  info: 'bg-cyan-500 text-white',
  premium: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black',
}

const badgeSizes = {
  xs: 'px-1.5 py-0.5 text-[10px]',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
}

const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  pulse = false,
  dot = false,
}) => {
  const normalizedVariant = typeof variant === 'string' ? variant.toLowerCase() : 'default'
  const variantClass = badgeVariants[normalizedVariant] || badgeVariants.default
  const sizeClass = badgeSizes[size] || badgeSizes.sm

  return (
    <span
      className={`
        inline-flex items-center gap-1
        font-bold uppercase tracking-wider
        rounded-full
        ${variantClass}
        ${sizeClass}
        ${pulse ? 'animate-pulse' : ''}
        ${className}
      `}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      )}
      {children}
    </span>
  )
}

export const ProductBadge = ({ badge, className = '' }) => {
  if (!badge) return null

  const lower = badge.toLowerCase()

  const configs = {
    new: { variant: 'new', label: 'NEW' },
    hot: { variant: 'hot', label: 'HOT' },
    sale: { variant: 'sale', label: 'SALE' },
  }

  const config = configs[lower] || { variant: 'default', label: badge }

  return (
    <Badge
      variant={config.variant}
      size="sm"
      className={`shadow-lg ${className}`}
    >
      {config.label}
    </Badge>
  )
}

export default Badge
