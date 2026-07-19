const testimonials = [
  {
    name: 'Arjun M.',
    role: 'Prop Trader, Mumbai',
    text: 'FXC completely changed how I read the market. The orderflow sessions are unlike anything on YouTube — this is real institutional knowledge.',
    rating: 5,
  },
  {
    name: 'Priya S.',
    role: 'Retail Trader, Bangalore',
    text: 'I went from random entries to understanding WHY price moves. The auction theory module alone was worth 10x the price.',
    rating: 5,
  },
  {
    name: 'Rahul K.',
    role: 'Futures Trader, Delhi',
    text: 'Cleared my first prop firm challenge after 3 months in the mentorship program. The live trading floor is insane — you learn by watching real trades.',
    rating: 5,
  },
  {
    name: 'Sneha T.',
    role: 'Options Trader, Pune',
    text: 'The optionflow + gamma exposure framework is something I\'ve never seen taught anywhere else. My win rate went from 42% to 61%.',
    rating: 5,
  },
  {
    name: 'Vikram R.',
    role: 'Swing Trader, Chennai',
    text: 'The community is serious and focused. No noise, no signals — just real traders helping each other grow. Best investment I\'ve made.',
    rating: 5,
  },
  {
    name: 'Ananya P.',
    role: 'Day Trader, Hyderabad',
    text: 'I was skeptical at first but the 1-on-1 sessions are incredibly personalized. My mentor identified my exact weaknesses in the first session.',
    rating: 5,
  },
]

const doubled = [...testimonials, ...testimonials]

export default function Testimonials() {
  return (
    <section className="bg-black px-6 py-24 sm:px-8 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">Testimonials</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Traders Who{' '}
            <span className="text-violet-400">Leveled Up</span>
          </h2>
          <p className="mt-4 text-base text-zinc-400">Real results from real traders in the FXC ecosystem.</p>
        </div>
      </div>

      {/* Row 1 — left to right */}
      <div className="relative overflow-hidden mb-4">
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />
        <div className="flex gap-4" style={{ animation: 'marquee-left 40s linear infinite', willChange: 'transform' }}>
          {doubled.map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />
        <div className="flex gap-4" style={{ animation: 'marquee-right 40s linear infinite', willChange: 'transform' }}>
          {doubled.map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </div>

      <style>{`
        @keyframes marquee-left  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  )
}

function TestimonialCard({ name, role, text, rating }: typeof testimonials[0]) {
  return (
    <div className="flex-shrink-0 w-80 rounded-xl border border-white/[0.08] bg-[#0d0d0d] p-6 hover:border-violet-500/25 transition-colors">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-amber-400 text-xs">★</span>
        ))}
      </div>
      <p className="text-sm text-zinc-300 leading-relaxed">"{text}"</p>
      <div className="mt-4 pt-4 border-t border-white/[0.06]">
        <div className="text-sm font-semibold text-white">{name}</div>
        <div className="text-xs text-zinc-500 mt-0.5">{role}</div>
      </div>
    </div>
  )
}
