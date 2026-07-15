import React from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HeroButtons(): React.JSX.Element {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Link
          to="/pricing"
          className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(139,92,246,0.28)] transition-all duration-200"
        >
          Join Now
          <ArrowRight size={18} />
        </Link>
      </motion.div>
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Link
          to="/course"
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white/90 backdrop-blur-xl transition-all duration-200 hover:border-white/20"
        >
          Claim your 1st FREE PDF
        </Link>
      </motion.div>
    </div>
  )
}
