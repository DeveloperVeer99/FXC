import React from 'react'

export default function HeroBadge(): React.JSX.Element {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/6 bg-white/3 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-md shadow-sm sm:gap-3 sm:px-4 sm:py-2 sm:text-sm">
      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.28)] sm:h-2.5 sm:w-2.5 sm:shadow-[0_0_18px_rgba(16,185,129,0.32)]" />
      <span className="whitespace-nowrap">Now Live: Transform Your Skills</span>
    </div>
  )
}
