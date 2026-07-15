import React from 'react'

export default function HeroBackground(): React.JSX.Element {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.18),transparent_22%),radial-gradient(circle_at_top_right,rgba(129,140,248,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_24%),linear-gradient(180deg,rgba(5,5,5,0.96),rgba(5,5,5,0.98))]" />
      <div className="absolute left-1/2 top-[-8%] h-[740px] w-[740px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[220px]" />
      <div className="absolute right-[-8%] top-[12%] h-[520px] w-[520px] rounded-full bg-cyan-400/12 blur-[220px]" />
      <div className="absolute bottom-[-12%] left-[-8%] h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-[220px]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px] opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black to-transparent opacity-90" />
    </div>
  )
}
