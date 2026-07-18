import React from 'react'
import { motion } from 'framer-motion'
import { Activity, BookOpen, Users, ShieldCheck } from 'lucide-react'

const cards = [
  {
    icon: Activity,
    tag: 'Core Method',
    title: 'Orderflow + Auction Theory',
    body: 'You learn to read the actual buying and selling happening at every price — footprint charts, delta, cumulative volume — not lagging indicators. Combined with Auction Market Theory, you understand why price is at a level, not just that it is.',
    wide: true,
  },
  {
    icon: BookOpen,
    tag: 'Structure',
    title: 'Skill-First, No Shortcuts',
    body: 'No signals. No copy-trading. Every concept is taught with the logic behind it so you can apply it independently in any market condition.',
    wide: false,
  },
  {
    icon: Users,
    tag: 'Community',
    title: 'Live Trading Floor',
    body: 'Learn while markets are open. Watch real orderflow being read in real time, ask questions, and build the habit of process-driven execution.',
    wide: false,
  },
  {
    icon: ShieldCheck,
    tag: 'Outcome',
    title: 'Built for Prop Firm Traders',
    body: 'The entire framework — entries, stops, sizing, consistency — is designed around passing prop firm evaluations and trading funded accounts with discipline.',
    wide: true,
  },
]

export default function TradingEcosystem(): React.JSX.Element {
  return (
    <section id="course" className="scroll-mt-20 bg-black px-4 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">What FourXClub Is</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Not Another Trading Course
          </h2>
          <p className="mt-4 text-base text-zinc-400 leading-7">
            Most courses teach patterns and indicators. We teach you to read the actual mechanics of price — the way institutions do.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Card 1 — wide (spans 2 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="group relative rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-7 lg:col-span-2 overflow-hidden hover:border-violet-500/25 transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                  <Activity className="h-4 w-4 text-violet-400" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-violet-500">{cards[0].tag}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{cards[0].title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">{cards[0].body}</p>

              {/* Visual accent */}
              <div className="mt-6 flex flex-wrap gap-2">
                {['Footprint Charts', 'Delta Analysis', 'CVD Divergence', 'Volume Profile', 'POC / VAH / VAL'].map((t) => (
                  <span key={t} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-mono text-zinc-500">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-7 overflow-hidden hover:border-violet-500/25 transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                  <BookOpen className="h-4 w-4 text-violet-400" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-violet-500">{cards[1].tag}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{cards[1].title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{cards[1].body}</p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="group relative rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-7 overflow-hidden hover:border-violet-500/25 transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                  <Users className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600">{cards[2].tag}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{cards[2].title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{cards[2].body}</p>

              <div className="mt-5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">Floor Active Now</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4 — wide */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-7 sm:col-span-2 lg:col-span-2 overflow-hidden hover:border-violet-500/25 transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                  <ShieldCheck className="h-4 w-4 text-violet-400" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-violet-500">{cards[3].tag}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{cards[3].title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">{cards[3].body}</p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { v: 'Process', l: 'Over Prediction' },
                  { v: 'Structure', l: 'Over Indicators' },
                  { v: 'Consistency', l: 'Over Big Wins' },
                  { v: 'Edge', l: 'Over Luck' },
                ].map((item) => (
                  <div key={item.v} className="rounded-lg border border-white/[0.06] bg-black/40 px-3 py-2.5 text-center">
                    <div className="text-xs font-bold text-white">{item.v}</div>
                    <div className="text-[10px] text-zinc-600 mt-0.5">{item.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
