import React from 'react'

export default function HeroStats(): React.JSX.Element {
  return (
    <div className="mt-14 flex flex-wrap items-center justify-center gap-2 text-sm text-white/70">
      <span className="font-semibold text-white">★★★★★</span>
      <span>4.9/5 Rating</span>
      <span className="text-white/30">•</span>
      <span>500+ Active Learners</span>
    </div>
  )
}
