import { Check, ArrowUpRight, BarChart2, Zap, Target } from 'lucide-react'

const perks = [
  'Everything in Base Course',
  '8 intensive 1-on-1 mentoring sessions',
  '3 Months Live Trading Floor Access',
  'Personal mentorship focused on clearing prop firm challenges',
  'Access to all future add-ons & updates (lifetime value)',
]

const features = [
  {
    icon: BarChart2,
    title: 'Auction Market Theory',
    desc: 'Use Volume Profiles to find Value Areas (VAH, VAL, POC) and identify structural balance versus directional breakouts.',
  },
  {
    icon: Zap,
    title: 'Orderflow Dynamics',
    desc: 'Read footprint charts, delta, and cumulative volume imbalances. Spot aggressive buyers or sellers trapped at extreme prices.',
  },
  {
    icon: Target,
    title: 'Optionflow & Liquidity',
    desc: 'Track resting institutional limit orders and options gamma positioning. Understand where larger players defend real interests.',
  },
]

export default function ProMentorship() {
  return (
    <section className="bg-black px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">

        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">Pro Mentorship</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pro Mentorship
            <span className="block mt-1 text-zinc-500">— ₹14,999</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400 leading-7">
            For serious traders aiming for consistency through mathematical execution and auction theory.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">

          {/* Left */}
          <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#0d0d0d] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-8 pb-6 border-b border-white/[0.08]">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">FXC // ORDERFLOW & OPTIONFLOW</span>
                <span className="ml-auto rounded border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-violet-400">
                  ENCRYPTED
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white">Pro Mentorship Program</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                Everything in Base Course, 8 intensive 1-on-1 mentoring sessions and 3 Months Live Trading Floor Access. Learn how institutions actually interact with liquidity.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Total Access</div>
                <div className="text-3xl font-bold text-white mt-1">₹14,999</div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                Enroll Now <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 rounded-xl border border-white/[0.08] bg-[#0d0d0d] p-8 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">What You Will Get</h4>
              <ul className="space-y-4">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
                      <Check className="h-3 w-3 text-violet-400" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm text-zinc-300 leading-normal">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-8 pt-6 border-t border-white/[0.08] text-[11px] font-mono uppercase tracking-widest text-zinc-600">
              Session schedules managed on booking calendar.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-white/[0.08] bg-[#0d0d0d] p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                <Icon className="h-5 w-5 text-violet-400" />
              </div>
              <h5 className="text-sm font-semibold text-white">{title}</h5>
              <p className="mt-2 text-xs leading-5 text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
