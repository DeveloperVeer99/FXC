import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

export default function LiveTradingBanner(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden bg-[#030308] px-6 py-32 sm:px-10 lg:px-14">

      {/* Animated beam lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px"
          style={{ top: `${20 + i * 20}%` }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
        >
          <div className="h-full bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />
        </motion.div>
      ))}

      {/* Central glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/15 blur-[160px] pointer-events-none" />

      {/* Corner accents */}
      <div className="absolute top-8 left-8 h-12 w-12 border-l border-t border-violet-500/20" />
      <div className="absolute top-8 right-8 h-12 w-12 border-r border-t border-violet-500/20" />
      <div className="absolute bottom-8 left-8 h-12 w-12 border-l border-b border-violet-500/20" />
      <div className="absolute bottom-8 right-8 h-12 w-12 border-r border-b border-violet-500/20" />

      <div className="relative mx-auto max-w-4xl text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">Live Trading Floor</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ready to trade like
            <span className="block mt-2 bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">
              the institutions do?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base text-zinc-400 leading-7">
            A focused trading community where learning happens live in the market — real orderflow, liquidity context, and disciplined execution guidance.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://discord.gg/vrHwGxE3VA"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,0.4)] transition hover:bg-violet-500 hover:shadow-[0_0_60px_rgba(124,58,237,0.6)]"
            >
              Get Access <ArrowUpRight size={16} />
            </a>
            <a
              href="https://discord.gg/vrHwGxE3VA"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Join Discord <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
