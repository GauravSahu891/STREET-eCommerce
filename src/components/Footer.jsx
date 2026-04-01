import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, MapPin, Phone } from 'lucide-react'
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaXTwitter,
} from 'react-icons/fa6'

// =====================================================
// FOOTER COMPONENT
// =====================================================

const footerLinks = {
  shop: [
    { label: 'New Arrivals', path: '/products?sort=new' },
    { label: 'Best Sellers', path: '/products?sort=popular' },
    { label: 'Hoodies', path: '/products?category=hoodies' },
    { label: 'T-Shirts', path: '/products?category=t-shirts' },
    { label: 'Pants', path: '/products?category=pants' },
    { label: 'Shoes', path: '/products?category=shoes' },
    { label: 'Accessories', path: '/products?category=accessories' },
    { label: 'Sale', path: '/products?badge=sale' },
  ],
  company: [
    { label: 'About Us', path: '#about' },
    { label: 'Careers', path: '#careers' },
    { label: 'Press', path: '#press' },
    { label: 'Blog', path: '#blog' },
    { label: 'Sustainability', path: '#sustainability' },
    { label: 'Affiliates', path: '#affiliates' },
  ],
  support: [
    { label: 'Help Center', path: '#help' },
    { label: 'Shipping & Returns', path: '#shipping' },
    { label: 'Size Guide', path: '#size-guide' },
    { label: 'Track Order', path: '#track' },
    { label: 'Privacy Policy', path: '#privacy' },
    { label: 'Terms of Service', path: '#terms' },
  ],
}

const socialLinks = [
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com', color: 'hover:text-pink-400' },
  { icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com', color: 'hover:text-red-400' },
  { icon: FaXTwitter, label: 'X / Twitter', href: 'https://twitter.com', color: 'hover:text-white' },
  { icon: FaTiktok, label: 'TikTok', href: 'https://tiktok.com', color: 'hover:text-cyan-400' },
]

const paymentMethods = ['VISA', 'MC', 'AMEX', 'PayPal', 'Apple Pay']

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="bg-[#080808] border-t border-white/5">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link to="/" className="inline-block mb-4">
              <div className="logo-text text-3xl text-white">
                STR<span className="text-accent-500">=</span>T
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Define your street style. Premium streetwear crafted for those who move with intention. Quality that speaks, style that lasts.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin size={14} className="text-accent-500 flex-shrink-0" />
                <span>123 Street Ave, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Mail size={14} className="text-accent-500 flex-shrink-0" />
                <span>hello@street-brand.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Phone size={14} className="text-accent-500 flex-shrink-0" />
                <span>+1 (555) 000-0000</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 ${social.color} hover:border-white/10 hover:bg-white/10 transition-all duration-200`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-white font-semibold font-poppins mb-5 text-sm uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-accent-400 text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200">
                      <ArrowRight size={10} className="text-accent-500" />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold font-poppins mb-5 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-accent-400 text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200">
                      <ArrowRight size={10} className="text-accent-500" />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-white font-semibold font-poppins mb-5 text-sm uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-accent-400 text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200">
                      <ArrowRight size={10} className="text-accent-500" />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/5 pt-10 mb-10">
          <div className="max-w-xl">
            <h4 className="text-white font-semibold font-poppins text-lg mb-2">
              Subscribe for exclusive drops
            </h4>
            <p className="text-gray-500 text-sm mb-4">
              Be the first to know about new collections, drops, and member-exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <div className="flex-1 relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-500 text-sm pl-10 pr-4 py-3 rounded-xl focus:border-accent-500 focus:outline-none transition-colors duration-200"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex-shrink-0 ${
                  subscribed
                    ? 'bg-green-500 text-white'
                    : 'bg-accent-500 hover:bg-accent-600 text-white'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} STR=T. All rights reserved. Built with passion for streetwear culture.
          </p>

          <div className="flex items-center gap-2">
            {paymentMethods.map((method) => (
              <div
                key={method}
                className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-500 text-[10px] font-semibold font-mono tracking-wider"
              >
                {method}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
