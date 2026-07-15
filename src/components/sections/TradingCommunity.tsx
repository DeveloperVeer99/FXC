import React, { useState } from 'react'
import { Check, MessageSquare, Share2, ArrowUpRight, Terminal } from 'lucide-react'

export default function TradingCommunity(): React.JSX.Element {
  const referralCode = 'REF-V4B5JI'
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <section id="community" className="scroll-mt-28 relative mx-auto max-w-6xl px-6 pb-24 pt-20 sm:px-8 lg:px-10 text-white">
      
      {/* DeepCharts ambient structural grid glow */}
      <div className="absolute right-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-500/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 -z-10 h-80 w-80 rounded-full bg-violet-500/[0.02] blur-[100px] pointer-events-none" />

      {/* Ticker-style Micro Header */}
      <div className="flex items-center justify-center gap-6 border-b border-zinc-900 pb-6 mb-12">
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
          <Terminal size={12} className="text-cyan-500" /> Server // fxc_desktop_v2
        </div>
        <div className="h-4 w-px bg-zinc-800" />
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-emerald-400 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Execution Desk
        </div>
      </div>

      {/* Main Header */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="text-4xl font-black tracking-tight text-white uppercase sm:text-5xl">
          Join the FourXclub <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Trading Community</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
          A private, well-moderated trading community for serious traders.
        </p>
      </div>

      {/* Terminal Console Card Container */}
      <div className="mt-10 rounded-xl border border-zinc-800 bg-[#08080c]/60 shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
        <div className="grid grid-cols-1 divide-y divide-zinc-800/80 lg:grid-cols-12 lg:divide-y-0 lg:divide-x lg:divide-zinc-800/80">

          {/* Left Block: Interactive Floor Access (7/12) */}
          <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between">
            <div>
              {/* Ticker Indicator tag */}
              <div className="mb-6 inline-flex items-center gap-2 rounded border border-emerald-500/25 bg-emerald-500/5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                First Month Free
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 flex-shrink-0 rounded-lg border border-zinc-800/80 bg-zinc-950/50 flex items-center justify-center text-cyan-400">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-wide text-white uppercase">Live Trading Discord</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    Exclusive Discord where traders learn together and stay disciplined.
                  </p>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="mt-8 space-y-4">
                {[
                  'Weekly live discussions and Q&A',
                  'Beginner-friendly environment',
                  'Direct access to experienced traders',
                  'Network with serious traders',
                  'No signals, no spam, no hype'
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950 text-cyan-400">
                      <Check className="h-2 w-2" strokeWidth={3} />
                    </span>
                    <span className="text-xs text-zinc-300 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Micro Dashboard Terminal Footer */}
            <div className="mt-10 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
                CL_NET // VERIFIED_GATEWAY
              </span>
              <a
                href="https://discord.gg/vrHwGxE3VA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-cyan-200 hover:bg-cyan-500/20 transition-colors"
              >
                Join Community <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Block: Referral Program (5/12) */}
          <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                Refer &amp; Earn Free Access
              </span>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Share your referral code. Both get 15 extra days free.
              </p>

              {/* Input Area */}
              <div className="space-y-2 pt-4">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Referral Key</span>
                <div className="flex items-stretch gap-2.5">
                  <div className="flex-1 flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/60 px-3.5 py-2.5">
                    <span className="font-mono text-sm tracking-widest text-cyan-400 font-black">{referralCode}</span>
                    <span className="text-[9px] font-mono text-zinc-600 uppercase">Code</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-all">
                      Generate
                    </button>
                    <button 
                      onClick={handleCopy}
                      className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-mono uppercase tracking-widest transition-all duration-200 border
                        ${copied 
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' 
                          : 'bg-white border-white text-zinc-950 hover:bg-zinc-100 hover:border-zinc-100'
                        }
                      `}
                    >
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Numeric Metrics */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-zinc-900">
              <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/20 p-4 text-center">
                <div className="text-2xl font-black text-white">+15</div>
                <div className="mt-1 text-[9px] font-mono uppercase tracking-widest text-zinc-500">Extra Days Free</div>
              </div>
              <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/20 p-4 flex flex-col items-center justify-center text-center">
                <Share2 size={16} className="text-zinc-500 mb-1" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Per Referral</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}