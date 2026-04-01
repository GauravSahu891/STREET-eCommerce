import React from 'react'
import HeroSection from '../sections/HeroSection'
import CategoriesSection from '../sections/CategoriesSection'
import FeaturedProducts from '../sections/FeaturedProducts'
import OfferSection from '../sections/OfferSection'
import TrendingProducts from '../sections/TrendingProducts'
import Testimonials from '../sections/Testimonials'
import Newsletter from '../sections/Newsletter'

// =====================================================
// HOME PAGE
// =====================================================

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <OfferSection />
      <TrendingProducts />
      <Testimonials />
      <Newsletter />
    </main>
  )
}

export default HomePage
