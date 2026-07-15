import React from 'react'

export default function LiveTradingBanner(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#020712] via-[#051024] to-[#090d1d] px-6 py-20 sm:px-10 lg:px-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_24%)] opacity-80" />
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle,_rgba(255,255,255,0.08),_transparent_45%)] blur-3xl opacity-30" />
      <div className="relative mx-auto max-w-6xl text-center text-white">
        <p className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-200 shadow-[0_20px_70px_rgba(34,211,238,0.12)]">
          Live Trading Floor
        </p>
        <h2 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
          Learn Trading in Real Time
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          A focused trading community where learning happens live in the market, with real orderflow, liquidity context, and disciplined execution guidance.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <a
            href="https://discord.gg/vrHwGxE3VA"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_60px_rgba(34,211,238,0.24)] transition hover:scale-[1.01] hover:opacity-95"
          >
            Join Community
          </a>
          <a
            href="https://discord.gg/vrHwGxE3VA"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10"
          >
            Join Discord
          </a>
        </div>
      </div>
    </section>
  )
}
