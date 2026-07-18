import React from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroButtons(): React.JSX.Element {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Link
        to="/signup"
        className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition hover:bg-violet-500"
      >
        Get Access <ArrowUpRight size={16} />
      </Link>
      <Link
        to="/course"
        className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        Explore Course <ArrowRight size={16} />
      </Link>
    </div>
  )
}
