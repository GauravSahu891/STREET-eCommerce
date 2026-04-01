import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Edit3,
  Star,
  Check,
  ShoppingBag,
} from 'lucide-react'

// =====================================================
// PROFILE PAGE
// =====================================================

const tabs = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const mockOrders = [
  {
    id: '#STR-2025-0041',
    date: 'Mar 28, 2025',
    status: 'Delivered',
    statusColor: 'green',
    total: 219.98,
    items: [
      { name: 'Street Core Hoodie', size: 'L', qty: 1, price: 89.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=100&h=100&fit=crop&q=80' },
      { name: 'Cargo Jogger Pants', size: 'M', qty: 1, price: 79.99, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=100&h=100&fit=crop&q=80' },
    ],
  },
  {
    id: '#STR-2025-0029',
    date: 'Feb 15, 2025',
    status: 'Delivered',
    statusColor: 'green',
    total: 129.99,
    items: [
      { name: 'Urban Runner Pro', size: 'US 10', qty: 1, price: 129.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop&q=80' },
    ],
  },
  {
    id: '#STR-2025-0018',
    date: 'Jan 30, 2025',
    status: 'Shipped',
    statusColor: 'blue',
    total: 184.98,
    items: [
      { name: 'Oversized Bomber Jacket', size: 'M', qty: 1, price: 149.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop&q=80' },
      { name: 'Classic Logo Tee', size: 'L', qty: 1, price: 44.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop&q=80' },
    ],
  },
]

const statusColors = {
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [editMode, setEditMode] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    phone: '+1 (555) 000-5678',
    dob: '1998-04-15',
  })
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: true,
    newArrivals: false,
    newsletter: true,
  })

  const handleSave = () => {
    setSaved(true)
    setEditMode(false)
    setTimeout(() => setSaved(false), 2500)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: ShoppingBag, label: 'Total Orders', value: '3' },
                { icon: Heart, label: 'Wishlist Items', value: '—' },
                { icon: Star, label: 'Reviews Given', value: '5' },
                { icon: CreditCard, label: 'Total Spent', value: '$534' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 text-center">
                  <div className="w-9 h-9 bg-accent-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon size={16} className="text-accent-400" />
                  </div>
                  <div className="text-white font-black text-xl">{value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">Recent Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-accent-400 hover:text-accent-300 text-xs font-medium transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {mockOrders.slice(0, 2).map((order) => (
                  <div key={order.id} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 2).map((item, i) => (
                          <div key={i} className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#1a1a1a]">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{order.id}</p>
                        <p className="text-gray-500 text-xs">{order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[order.statusColor]}`}>
                        {order.status}
                      </span>
                      <span className="text-white font-bold text-sm">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'orders':
        return (
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-5">Order History</h3>
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-white/5">
                  <div>
                    <span className="text-white font-bold text-sm">{order.id}</span>
                    <span className="text-gray-500 text-xs ml-3">{order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[order.statusColor]}`}>
                      {order.status}
                    </span>
                    <span className="text-white font-bold">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                {/* Order Items */}
                <div className="p-4 space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-gray-500 text-xs">Size: {item.size} · Qty: {item.qty}</p>
                      </div>
                      <span className="text-white font-bold text-sm">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      case 'addresses':
        return (
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-5">Saved Addresses</h3>
            {[
              { label: 'Home', address: '123 Urban Ave, Apt 4B', city: 'New York, NY 10001', default: true },
              { label: 'Work', address: '456 Creative Blvd, Floor 3', city: 'New York, NY 10002', default: false },
            ].map((addr) => (
              <div key={addr.label} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 relative">
                {addr.default && (
                  <span className="absolute top-4 right-4 bg-accent-500/10 text-accent-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-accent-500/20">
                    Default
                  </span>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-accent-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-accent-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">{addr.label}</p>
                    <p className="text-gray-400 text-sm">{addr.address}</p>
                    <p className="text-gray-400 text-sm">{addr.city}</p>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full flex items-center justify-center gap-2 border border-dashed border-white/10 hover:border-accent-500/40 text-gray-500 hover:text-white py-4 rounded-2xl text-sm font-medium transition-all duration-200">
              + Add New Address
            </button>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-6">
            {/* Profile Info */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-bold">Personal Information</h3>
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-1.5 text-accent-400 hover:text-accent-300 text-xs font-medium transition-colors"
                  >
                    <Edit3 size={13} /> Edit
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 text-green-400 hover:text-green-300 text-xs font-medium transition-colors"
                  >
                    <Check size={13} /> Save
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Full Name', type: 'text' },
                  { key: 'email', label: 'Email', type: 'email' },
                  { key: 'phone', label: 'Phone', type: 'tel' },
                  { key: 'dob', label: 'Date of Birth', type: 'date' },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">{label}</label>
                    <input
                      type={type}
                      value={profile[key]}
                      disabled={!editMode}
                      onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-white/10 text-white text-sm px-3 py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed focus:border-accent-500 focus:outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>
              <AnimatePresence>
                {saved && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-400 text-sm mt-3 flex items-center gap-1.5"
                  >
                    <Check size={13} /> Profile updated successfully
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                <Bell size={16} className="text-accent-400" /> Notifications
              </h3>
              <div className="space-y-4">
                {[
                  { key: 'orders', label: 'Order Updates', desc: 'Shipping & delivery notifications' },
                  { key: 'promotions', label: 'Promotions', desc: 'Exclusive deals and discounts' },
                  { key: 'newArrivals', label: 'New Arrivals', desc: 'Be the first to know about new drops' },
                  { key: 'newsletter', label: 'Newsletter', desc: 'Weekly style inspiration' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-white text-sm font-medium">{label}</p>
                      <p className="text-gray-500 text-xs">{desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [key]: !notifications[key] })}
                      className={`relative w-10 h-5 rounded-full transition-all duration-300 flex-shrink-0 ${
                        notifications[key] ? 'bg-accent-500' : 'bg-white/10'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                          notifications[key] ? 'left-5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5">
              <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                <LogOut size={16} /> Account Actions
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm font-medium transition-all duration-200">
                  <LogOut size={14} />
                  Sign Out
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/5 text-sm font-medium transition-all duration-200">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Profile</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black flex-shrink-0">
              J
            </div>
            <div>
              <h1 className="text-2xl font-black font-poppins text-white">Jordan Lee</h1>
              <p className="text-gray-400 text-sm mt-0.5">Member since January 2024 · 3 orders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <aside className="lg:w-56 flex-shrink-0">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
              <Link
                to="/wishlist"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 whitespace-nowrap flex-shrink-0"
              >
                <Heart size={16} />
                Wishlist
              </Link>
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
