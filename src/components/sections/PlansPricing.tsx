import React from 'react'
import { Check } from 'lucide-react'

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
      '1 Month Live Trading Floor Access (watch real trades, real decisions)'
    ],
    accent: 'from-violet-500 to-violet-400',
    cardClass: 'border border-violet-500/30 bg-zinc-950/80',
    buttonClass: 'bg-violet-500 text-zinc-950 hover:bg-violet-400'
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
      'Personal mentorship focused on clearing prop firm challenges',
      'Access to all future add-ons & updates (lifetime value)'
    ],
    accent: 'from-cyan-400 to-sky-400',
    cardClass: 'border border-cyan-400/20 bg-[#071023]/80',
    buttonClass: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
  }
]

export default function PlansPricing(): React.JSX.Element {
  return (
    <section id="pricing" className="scroll-mt-28 mx-auto max-w-6xl px-6 pb-24 pt-20 sm:px-8 lg:px-10 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-violet-200">
          Choose Your Path
        </span>
        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Plans & Pricing
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
          Pick the plan that matches your trading goals.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative overflow-hidden rounded-[2rem] p-8 shadow-[0_28px_120px_rgba(15,23,42,0.35)] ${plan.cardClass}`}>
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${plan.accent}`} />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-white">{plan.name}</p>
                  <p className="mt-3 text-sm text-zinc-400">{plan.description}</p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  {plan.label}
                </span>
              </div>

              <div className="mt-8">
                <div className="text-4xl font-black tracking-tight text-white">{plan.price}</div>
                <p className="mt-2 text-sm text-zinc-500">one-time payment</p>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-6 text-zinc-300">
                    <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-cyan-300">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <button className={`mt-10 w-full rounded-full px-5 py-3 text-sm font-semibold transition ${plan.buttonClass}`}>
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
