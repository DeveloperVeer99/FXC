import React from 'react'

export default function HeroBadge(): React.JSX.Element {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
      <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">
        Behind Candlesticks
      </span>
    </div>
  )
}
