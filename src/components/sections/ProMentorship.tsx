import React from 'react'
import { Lock, Check, Sparkles, ArrowUpRight, BarChart2, Zap, Target } from 'lucide-react'

export default function ProMentorship(): React.JSX.Element {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-28 pt-20 sm:px-8 lg:px-10 overflow-hidden text-white">
      
      {/* Subtle Ambient Glow Backdrops */}
      <div className="absolute left-1/3 top-1/4 -z-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-10 -z-10 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.04] blur-[150px] pointer-events-none" />

      {/* Header Section */}
      <div className="mx-auto max-w-4xl text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/20 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-rose-300">
            Pro Mentorship
          </span>
        </div>
        
        <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl uppercase">
          Pro Mentorship 
          <span className="block mt-2 bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            — ₹14,999
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400 leading-relaxed">
          For serious traders aiming for consistency through mathematical execution and auction theory.
        </p>
      </div>

      {/* Two-Column Premium Layout (All inner backgrounds are set to transparent) */}
      <div className="mt-12 grid gap-8 lg:grid-cols-12 items-stretch">
        
        {/* Left Column: Glassmorphic Interactive Console Container */}
        <div className="lg:col-span-7 group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-transparent p-8 md:p-10 transition-all duration-300 hover:border-violet-500/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]">
          
          {/* Corner Grid Highlights */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-violet-500/40 rounded-tl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40 rounded-br-2xl pointer-events-none" />
          
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-zinc-800/60">
              <div className="flex items-center gap-3">
                <div className="flex space-x-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                  FXC // ORDERFLOW &amp; OPTIONFLOW
                </span>
              </div>
              <span className="rounded-md border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                ENCRYPTED
              </span>
            </div>

            {/* Core Card Hero content */}
            <div className="mt-8 flex flex-col sm:flex-row items-start gap-5">
              {/* Blue/Violet visual asset box from the old design */}
              <div className="relative w-full sm:w-48 h-40 flex-shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/85 to-violet-600 flex flex-col items-center justify-center border border-cyan-400/20 shadow-[0_0_35px_rgba(6,182,212,0.15)] overflow-hidden">
                <div className="absolute top-3 right-3 rounded bg-black/50 px-2 py-0.5 text-[9px] font-mono tracking-widest text-cyan-300 uppercase border border-cyan-500/20">
                  Encrypted
                </div>
                <div className="h-14 w-14 rounded-xl bg-[#030303]/70 border border-white/5 flex items-center justify-center shadow-inner">
                  <Lock className="h-6 w-6 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white tracking-wide uppercase">
                  Pro Mentorship Program
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Everything in Base Course, 8 intensive 1-on-1 mentoring sessions and 3 Months Live Trading Floor Access. Learn how institutions actually interact with liquidity.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing & Premium CTA Action Bar */}
          <div className="mt-12 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:items-start gap-1">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Total Access</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">₹14,999</span>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">Base + Live</span>
              </div>
            </div>
            
            <button className="relative group/btn w-full sm:w-auto overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 shadow-[0_4px_25px_rgba(124,58,237,0.3)] hover:shadow-[0_4px_35px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98]">
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Enroll Now <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: "What you get" Perks */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-zinc-800/50 bg-transparent p-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h4 className="text-base font-semibold text-white tracking-wide">What You Will Get</h4>
            </div>
            
            <ul className="space-y-4">
              {[
                'Everything in Base Course',
                '8 intensive 1-on-1 mentoring sessions',
                '3 Months Live Trading Floor Access',
                'Personal mentorship focused on clearing prop firm challenges',
                'Access to all future add-ons & updates (lifetime value)'
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-violet-950/40 border border-violet-500/30">
                    <Check className="h-3 w-3 text-violet-400" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm text-white/75 leading-normal">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800/40 text-center lg:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Session schedules managed on booking calendar.
            </span>
          </div>
        </div>

      </div>

      {/* Real & Authentic Features Highlight Row */}
      <div className="mt-20 grid gap-6 md:grid-cols-3 border-t border-white/[0.04] pt-16">
        
        {/* Block 1 */}
        <div className="rounded-xl border border-white/[0.02] bg-transparent p-6">
          <div className="h-10 w-10 rounded-lg bg-violet-950/30 border border-violet-500/20 flex items-center justify-center mb-4">
            <BarChart2 className="h-5 w-5 text-violet-400" />
          </div>
          <h5 className="text-base font-semibold text-white tracking-wide">Auction Market Theory</h5>
          <p className="mt-2 text-xs leading-relaxed text-white/50">
            Use Volume Profiles to find Value Areas (VAH, VAL, POC) and identify structural balance versus directional breakouts. Stop chasing lines and trade acceptance.
          </p>
        </div>

        {/* Block 2 */}
        <div className="rounded-xl border border-white/[0.02] bg-transparent p-6">
          <div className="h-10 w-10 rounded-lg bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-center mb-4">
            <Zap className="h-5 w-5 text-cyan-400" />
          </div>
          <h5 className="text-base font-semibold text-white tracking-wide">Orderflow Dynamics</h5>
          <p className="mt-2 text-xs leading-relaxed text-white/50">
            Read footprint charts, delta, and cumulative volume imbalances. Spot aggressive buyers or sellers trapped at extreme prices before key reversals occur.
          </p>
        </div>

        {/* Block 3 */}
        <div className="rounded-xl border border-white/[0.02] bg-transparent p-6">
          <div className="h-10 w-10 rounded-lg bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center mb-4">
            <Target className="h-5 w-5 text-emerald-400" />
          </div>
          <h5 className="text-base font-semibold text-white tracking-wide">Optionflow &amp; Liquidity</h5>
          <p className="mt-2 text-xs leading-relaxed text-white/50">
            Track resting institutional limit orders and options gamma positioning. Understand where larger players have real financial interests to defend.
          </p>
        </div>

      </div>
    </section>
  )
}