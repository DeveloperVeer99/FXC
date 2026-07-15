import { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const navItems = [
  { name: 'Course', href: '#course' },
  { name: 'Community', href: '#community' },
  { name: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-5 z-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/10 bg-black/50 px-5 py-3 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
        <Link to="/" className="text-sm font-semibold uppercase tracking-[0.35em] text-white">
          FXC
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium tracking-[0.12em] text-zinc-300 transition-all duration-200 hover:text-white"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link to="/login" className="text-sm font-medium text-zinc-400 transition hover:text-white">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(124,58,237,0.25)] transition duration-200 hover:bg-violet-400"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-[#08080D]/95 p-5 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.24)] md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium tracking-[0.12em] text-zinc-300 transition hover:text-white"
              >
                {item.name}
              </a>
            ))}
            <div className="mt-3 h-px bg-white/10" />
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-zinc-300 transition hover:text-white"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
