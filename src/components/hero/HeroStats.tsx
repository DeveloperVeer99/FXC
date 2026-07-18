import React from 'react'

export default function HeroStats(): React.JSX.Element {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-white/[0.08] pt-10">
      {[
        { value: '500+', label: 'Active Learners' },
        { value: '4.9/5', label: 'Rating' },
        { value: '₹14,999', label: 'Pro Mentorship' },
      ].map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-2xl font-black text-white">{stat.value}</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-widest text-white/40">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
