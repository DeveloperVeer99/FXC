import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import TradingEcosystem from './TradingEcosystem'

export default function EcosystemCollapse(): React.JSX.Element {
  const [open, setOpen] = useState(false)

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <button
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          className="inline-flex items-center gap-3 rounded-full border border-white/6 bg-gradient-to-b from-[#07101a]/60 to-[#041018]/40 px-5 py-3 text-sm font-medium text-white/90 shadow-sm hover:shadow-[0_12px_40px_rgba(6,8,14,0.6)]"
        >
          <span>{open ? 'Hide' : 'Learn about our Trading Ecosystem'}</span>
          {open ? <ChevronUp className="h-4 w-4 text-violet-300" /> : <ChevronDown className="h-4 w-4 text-violet-300" />}
        </button>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="mt-8 overflow-hidden"
          >
            <div className="rounded-3xl border border-white/6 bg-gradient-to-b from-[#05060a]/50 to-[#041018]/40 p-6">
              <TradingEcosystem />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
