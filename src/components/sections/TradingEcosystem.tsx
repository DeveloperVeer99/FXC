import React from 'react'
import { Check } from 'lucide-react'

type CardProps = {
  title: string
  subtitle: string
  hint?: string
}

function Card({ title, subtitle, hint }: CardProps) {
  return (
    <div className="group relative flex h-36 w-full flex-col justify-between gap-3 rounded-2xl border border-transparent bg-gradient-to-b from-[#081018]/60 to-[#07101a]/40 p-6 shadow-[0_10px_30px_rgba(4,6,12,0.6)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,9,18,0.7)] overflow-visible">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-md font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-white/70">{subtitle}</p>
        </div>
      </div>
      {hint && <div className="text-xs text-white/50">{hint}</div>}

      <div className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-violet-700/75 p-[1px] shadow-[0_8px_24px_rgba(99,102,241,0.12)]">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#071028]">
            <Check className="h-3.5 w-3.5 text-white/95" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TradingEcosystem(): React.JSX.Element {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full bg-violet-900/30 px-3 py-1 text-sm font-medium text-violet-300">
          Mission &amp; Vision
        </span>
        <h2 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl">
          A Trading Ecosystem
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
          At FourXclub, we teach skill-first trading by blending orderflow, auction theory, and modern options positioning —
          a practical framework used by institutional traders.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Real-Time Market Learning"
          subtitle="Learn by observing markets as they move in real-time."
          hint="Live ticks, volume, and context-driven commentary"
        />

        <Card
          title="Focused Trading Community"
          subtitle="Small, serious group of learners and practitioners."
          hint="Peer reviews, trade critique, and accountability"
        />

        <Card
          title="Experienced Trader Access"
          subtitle="Direct mentorship from active institutional traders."
          hint="Office hours, live audits, and trade breakdowns"
        />

        <Card
          title="Skill Over Shortcuts"
          subtitle="Build discipline and process-first trading habits."
          hint="Method, risk control, and repeatable execution"
        />
      </div>
    </section>
  )
}
