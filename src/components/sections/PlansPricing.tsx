import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight } from 'lucide-react'

const plans = [
  {
    name: 'Base Course',
    label: 'Popular',
    price: '₹5,999',
    description: 'For traders ready to level up with guidance and live market exposure.',
    cta: 'Get Started',
    highlights: [
      'Structured pre-recorded lessons (learn at your own pace)',
      'Access to a private trading community',
      '3 personalized 1-on-1 sessions',
      '1 Month Live Trading Floor Access',
    ],
    accent: false,
  },
  {
    name: 'Pro Mentorship',
    label: 'Best Value',
    price: '₹14,999',
    description: 'For serious traders aiming for consistency.',
    cta: 'Go Pro',
    highlights: [
      'Everything in Base Course',
      '8 intensive 1-on-1 mentoring sessions',
      '3 Months Live Trading Floor Access',
      'Personal mentorship for prop firm challenges',
      'Access to all future add-ons & updates',
    ],
    accent: true,
  },
]

function SpotlightCard({ plan }: { plan: typeof plans[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-xl border p-8 overflow-hidden cursor-default ${
        plan.accent ? 'border-violet-500/40 bg-[#0d0d0d]' : 'border-white/[0.08] bg-[#0d0d0d]'
      }`}
    >
      {plan.accent && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />}

      {/* Spotlight */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(124,58,237,0.12), transparent 70%)`,
          }}
        />
      )}

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-white">{plan.name}</p>
            <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>
          </div>
          <span className="flex-shrink-0 rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            {plan.label}
          </span>
        </div>

        <div className="mt-8">
          <div className="text-4xl font-bold text-white">{plan.price}</div>
          <p className="mt-1 text-xs text-zinc-500 uppercase tracking-widest">one-time payment</p>
        </div>

        <ul className="mt-8 space-y-3">
          {plan.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-sm text-zinc-300">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
                <Check className="h-3 w-3 text-violet-400" strokeWidth={2.5} />
              </span>
              {h}
            </li>
          ))}
        </ul>

        <button
          className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition ${
            plan.accent
              ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_30px_rgba(124,58,237,0.3)]'
              : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
          }`}
        >
          {plan.cta} <ArrowUpRight size={15} />
        </button>
      </div>
    </motion.div>
  )
}

export default function PlansPricing(): React.JSX.Element {
  return (
    <section id="pricing" className="scroll-mt-20 bg-black px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">Choose Your Path</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Plans & Pricing</h2>
          <p className="mt-4 text-base text-zinc-400">Pick the plan that matches your trading goals.</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {plans.map((plan) => <SpotlightCard key={plan.name} plan={plan} />)}
        </div>
      </div>
    </section>
  )
}
