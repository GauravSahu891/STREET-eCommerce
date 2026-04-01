import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  MessageSquare,
} from 'lucide-react'
import { FaInstagram, FaYoutube, FaXTwitter, FaTiktok } from 'react-icons/fa6'

// =====================================================
// CONTACT PAGE
// =====================================================

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
  }),
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'hello@streetwear.com',
    sub: 'We reply within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+1 (555) 000-1234',
    sub: 'Mon–Fri, 9am–6pm EST',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: '123 Urban Ave, NYC',
    sub: 'New York, NY 10001',
  },
  {
    icon: Clock,
    title: 'Support Hours',
    value: 'Mon – Fri',
    sub: '9:00 AM – 6:00 PM EST',
  },
]

const socials = [
  { icon: FaInstagram, label: 'Instagram', handle: '@streetwear' },
  { icon: FaYoutube, label: 'YouTube', handle: 'STREET Channel' },
  { icon: FaXTwitter, label: 'Twitter/X', handle: '@streetwear' },
  { icon: FaTiktok, label: 'TikTok', handle: '@streetwear' },
]

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black font-poppins text-white">
            Get in <span className="text-accent-500">Touch</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-lg">
            Have a question about an order, need style advice, or want to collaborate? We're here for it.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-white font-bold text-xl mb-6">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.title}
                    className="flex gap-4 bg-[#111111] border border-white/5 rounded-2xl p-4"
                    variants={fadeUp}
                    custom={i * 0.1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 bg-accent-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon size={18} className="text-accent-400" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">
                        {info.title}
                      </p>
                      <p className="text-white font-semibold text-sm">{info.value}</p>
                      <p className="text-gray-500 text-xs">{info.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div
              className="bg-[#111111] border border-white/5 rounded-2xl p-5"
              variants={fadeUp}
              custom={0.5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-white font-semibold mb-4 flex items-center gap-2">
                <MessageSquare size={16} className="text-accent-400" />
                Follow Us
              </p>
              <div className="space-y-3">
                {socials.map(({ icon: Icon, label, handle }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 bg-white/5 group-hover:bg-accent-500/10 rounded-xl flex items-center justify-center transition-colors duration-200">
                      <Icon size={15} />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-gray-600 text-xs ml-auto">{handle}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8">
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-16 h-16 bg-green-500/10 rounded-3xl flex items-center justify-center mb-5">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-black text-xl mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-sm mb-6 max-w-xs">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="text-accent-400 hover:text-accent-300 text-sm font-medium transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-white font-bold text-xl mb-6">Send a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Jordan Lee"
                        className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl focus:border-accent-500 focus:outline-none transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="jordan@example.com"
                        className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl focus:border-accent-500 focus:outline-none transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#1a1a1a] border border-white/10 text-white text-sm px-4 py-3 rounded-xl focus:border-accent-500 focus:outline-none transition-colors duration-200 cursor-pointer"
                    >
                      <option value="" className="bg-[#1a1a1a] text-gray-600">Select a subject...</option>
                      <option value="order" className="bg-[#1a1a1a]">Order Inquiry</option>
                      <option value="returns" className="bg-[#1a1a1a]">Returns & Exchanges</option>
                      <option value="shipping" className="bg-[#1a1a1a]">Shipping Issue</option>
                      <option value="collaboration" className="bg-[#1a1a1a]">Collaboration</option>
                      <option value="other" className="bg-[#1a1a1a]">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl focus:border-accent-500 focus:outline-none transition-colors duration-200 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-glow-purple"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
