import React, { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SlidersHorizontal,
  X,
  ChevronRight,
  ChevronDown,
  Grid3X3,
  LayoutList,
  Search,
} from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../utils/data'

// =====================================================
// PRODUCT LISTING PAGE
// =====================================================

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'new', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
]

const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'One Size']

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-white/5 pb-5 mb-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-4 group"
      >
        <span className="text-white font-semibold text-sm uppercase tracking-wider">{title}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid')

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const cat = searchParams.get('category')
    return cat ? [cat] : []
  })
  const [selectedSizes, setSelectedSizes] = useState([])
  const [priceRange, setPriceRange] = useState([0, 250])
  const [selectedBadge, setSelectedBadge] = useState(searchParams.get('badge') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
    setCurrentPage(1)
  }

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setPriceRange([0, 250])
    setSelectedBadge('')
    setSortBy('featured')
    setSearchQuery('')
    setCurrentPage(1)
  }

  const activeFilterCount =
    selectedCategories.length +
    selectedSizes.length +
    (priceRange[0] > 0 || priceRange[1] < 250 ? 1 : 0) +
    (selectedBadge ? 1 : 0)

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.some(
          (cat) => p.category.toLowerCase() === cat.toLowerCase()
        )
      )
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s))
      )
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    if (selectedBadge) {
      result = result.filter(
        (p) => p.badge && p.badge.toLowerCase() === selectedBadge.toLowerCase()
      )
    }

    switch (sortBy) {
      case 'new':
        result = [...result].reverse()
        break
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'popular':
        result = [...result].sort((a, b) => b.reviews - a.reviews)
        break
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [selectedCategories, selectedSizes, priceRange, selectedBadge, sortBy, searchQuery])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const FilterPanel = () => (
    <div className="space-y-0">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
            placeholder="Search products..."
            className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-500 text-sm pl-9 pr-4 py-2.5 rounded-xl focus:border-accent-500 focus:outline-none transition-colors duration-200"
          />
        </div>
      </div>

      {/* Categories */}
      <FilterSection title="Category">
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-150 ${
                  selectedCategories.includes(cat.name)
                    ? 'bg-accent-500 border-accent-500'
                    : 'border-white/20 group-hover:border-accent-500/60'
                }`}
                onClick={() => toggleCategory(cat.name)}
              >
                {selectedCategories.includes(cat.name) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm transition-colors duration-150 flex-1 ${
                  selectedCategories.includes(cat.name)
                    ? 'text-accent-400'
                    : 'text-gray-400 group-hover:text-white'
                }`}
                onClick={() => toggleCategory(cat.name)}
              >
                {cat.name}
              </span>
              <span className="text-gray-600 text-xs">{cat.count}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="250"
            value={priceRange[1]}
            onChange={(e) => { setPriceRange([priceRange[0], parseInt(e.target.value)]); setCurrentPage(1) }}
            className="w-full"
          />
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">${priceRange[0]}</span>
            <span className="text-accent-400 text-sm font-semibold">${priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      {/* Sizes */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${
                selectedSizes.includes(size)
                  ? 'bg-accent-500 border-accent-500 text-white'
                  : 'border-white/10 text-gray-400 hover:border-accent-500/40 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Badge */}
      <FilterSection title="Collection">
        <div className="space-y-2">
          {[
            { value: '', label: 'All' },
            { value: 'new', label: 'New Arrivals' },
            { value: 'hot', label: 'Hot Items' },
            { value: 'sale', label: 'On Sale' },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-150 ${
                  selectedBadge === opt.value
                    ? 'bg-accent-500 border-accent-500'
                    : 'border-white/20 group-hover:border-accent-500/60'
                }`}
                onClick={() => { setSelectedBadge(opt.value); setCurrentPage(1) }}
              >
                {selectedBadge === opt.value && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </div>
              <span
                className={`text-sm transition-colors duration-150 ${
                  selectedBadge === opt.value
                    ? 'text-accent-400'
                    : 'text-gray-400 group-hover:text-white'
                }`}
                onClick={() => { setSelectedBadge(opt.value); setCurrentPage(1) }}
              >
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-500/20 text-red-400 hover:bg-red-500/5 rounded-xl text-sm font-medium transition-all duration-200"
        >
          <X size={14} />
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Page Header */}
      <div className="bg-[#0d0d0d] border-b border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Products</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black font-poppins text-white">All Products</h1>
              <p className="text-gray-400 text-sm mt-1">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-base">Filters</h2>
                {activeFilterCount > 0 && (
                  <span className="bg-accent-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-[#1a1a1a] border border-white/10 text-gray-300 px-4 py-2.5 rounded-xl text-sm font-medium hover:border-accent-500/40 transition-all duration-200"
                >
                  <SlidersHorizontal size={15} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-accent-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <span className="text-gray-500 text-sm hidden sm:block">
                  Showing {paginatedProducts.length} of {filteredProducts.length} results
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1) }}
                  className="bg-[#1a1a1a] border border-white/10 text-gray-300 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-accent-500 transition-colors duration-200 cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* View toggle */}
                <div className="hidden sm:flex items-center gap-1 bg-[#1a1a1a] border border-white/10 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-150 ${
                      viewMode === 'grid'
                        ? 'bg-accent-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-150 ${
                      viewMode === 'list'
                        ? 'bg-accent-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <LayoutList size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter tags */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="flex items-center gap-1.5 bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {cat}
                    <button onClick={() => toggleCategory(cat)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {selectedSizes.map((size) => (
                  <span
                    key={size}
                    className="flex items-center gap-1.5 bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {size}
                    <button onClick={() => toggleSize(size)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {selectedBadge && (
                  <span className="flex items-center gap-1.5 bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-medium px-3 py-1.5 rounded-full capitalize">
                    {selectedBadge}
                    <button onClick={() => setSelectedBadge('')}>
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            {paginatedProducts.length === 0 ? (
              <motion.div
                className="flex flex-col items-center justify-center py-24 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-20 h-20 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-4">
                  <Search size={32} className="text-gray-600" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={clearFilters}
                  className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${sortBy}-${currentPage}-${selectedCategories.join(',')}`}
                  className={`grid gap-5 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {paginatedProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2.5 rounded-xl bg-[#1a1a1a] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-accent-500 text-white shadow-glow-purple'
                        : 'bg-[#1a1a1a] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2.5 rounded-xl bg-[#1a1a1a] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-white/5 z-50 lg:hidden max-h-[85vh] overflow-y-auto rounded-t-3xl"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white font-bold text-lg">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
                  >
                    <X size={20} />
                  </button>
                </div>
                <FilterPanel />
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full mt-4 bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 rounded-2xl transition-colors duration-200"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductListingPage
