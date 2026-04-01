import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowRight, Zap, Shield, Leaf, Users, Award, TrendingUp } from 'lucide-react'

// =====================================================
// ABOUT PAGE
// =====================================================

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.12 },
  }),
}

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '200+', label: 'Premium Products' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '4.9', label: 'Avg. Rating' },
]

const values = [
  {
    icon: Zap,
    title: 'Performance First',
    desc: 'Every piece is engineered to handle real life — from the streets to the studio and everywhere in between.',
  },
  {
    icon: Shield,
    title: 'Built to Last',
    desc: 'Premium materials and meticulous construction mean your STREET pieces get better with every wear.',
  },
  {
    icon: Leaf,
    title: 'Conscious Craft',
    desc: 'We use sustainable fabrics and ethical manufacturing practices to reduce our footprint without compromising quality.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    desc: 'STREET is shaped by the people who wear it. Every drop is inspired by real feedback from our community.',
  },
]

const team = [
  {
    name: 'Jordan Lee',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80',
  },
  {
    name: 'Maya Torres',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
  },
  {
    name: 'Alex Kim',
    role: 'Brand Strategist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
  },
  {
    name: 'Sofia Reyes',
    role: 'Operations Lead',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80',
  },
]

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">About</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black font-poppins text-white">
            Our <span className="text-accent-500">Story</span>
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="inline-block text-accent-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Founded 2020
            </span>
            <h2 className="text-3xl md:text-4xl font-black font-poppins text-white leading-tight mb-6">
              Streetwear built for those who <span className="text-accent-500">move with purpose.</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-5">
              STREET was born from a simple idea: premium streetwear shouldn't require choosing between style and substance. We started in a small studio in New York City, obsessing over every stitch, every fabric, every silhouette.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Today, thousands of people worldwide trust STREET to be the backbone of their wardrobe. Our pieces are worn by skaters and creatives, athletes and artists — anyone who demands quality and refuses to compromise on style.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-7 py-3.5 rounded-2xl transition-all duration-300 shadow-glow-purple"
            >
              Shop the Collection
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            className="relative"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-square">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&h=700&fit=crop&q=80"
                alt="STREET brand"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-500/20 rounded-xl flex items-center justify-center">
                  <Award size={20} className="text-accent-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Premium Quality</p>
                  <p className="text-gray-500 text-xs">Certified materials</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">50K+ Orders</p>
                  <p className="text-gray-500 text-xs">Delivered worldwide</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0d0d0d] border-y border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-black font-poppins text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="text-center mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-black font-poppins text-white mb-4">
            What We <span className="text-accent-500">Stand For</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Our values aren't marketing copy — they're the principles behind every design decision we make.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              className="bg-[#111111] border border-white/5 hover:border-accent-500/20 rounded-3xl p-8 transition-all duration-300"
              variants={fadeUp}
              custom={i * 0.5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 bg-accent-500/10 rounded-2xl flex items-center justify-center mb-5">
                <val.icon size={22} className="text-accent-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{val.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#0d0d0d] border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black font-poppins text-white mb-4">
              Meet the <span className="text-accent-500">Team</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              A small but mighty crew obsessed with making streetwear that actually matters.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="text-center group"
                variants={fadeUp}
                custom={i * 0.15}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="relative mb-4 mx-auto w-24 h-24 md:w-32 md:h-32">
                  <div className="w-full h-full rounded-3xl overflow-hidden border-2 border-white/5 group-hover:border-accent-500/40 transition-all duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{member.name}</h4>
                <p className="text-gray-500 text-xs">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent-500/20 to-accent-900/20 border border-accent-500/20 p-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-500/10 via-transparent to-transparent" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-black font-poppins text-white mb-4">
              Ready to Define Your Style?
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Join 50,000+ people who trust STREET for premium streetwear that delivers on every promise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-glow-purple"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default AboutPage
