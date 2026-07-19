import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">

        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600">
                <span className="text-[10px] font-black text-white tracking-tight">FXC</span>
              </div>
              <span className="text-sm font-semibold tracking-[0.12em] uppercase text-white">
                FXC
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-zinc-400 leading-6">
              Live trading • Real discussions • No signals • No hype
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="text-zinc-500 hover:text-white transition text-sm">Instagram</a>
              <a href="https://discord.gg/vrHwGxE3VA" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition text-sm">Discord</a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Product</h3>
            <div className="space-y-3">
              <Link to="/courses" className="block text-sm text-zinc-400 hover:text-white transition">Courses</Link>
              <Link to="/community" className="block text-sm text-zinc-400 hover:text-white transition">Community</Link>
              <Link to="/pricing" className="block text-sm text-zinc-400 hover:text-white transition">Pricing</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Contact</h3>
            <div className="space-y-3">
              <a href="#" className="block text-sm text-zinc-400 hover:text-white transition">Instagram</a>
              <a href="https://discord.gg/vrHwGxE3VA" target="_blank" rel="noreferrer" className="block text-sm text-zinc-400 hover:text-white transition">Discord</a>
              <a href="mailto:contact@fxc.com" className="block text-sm text-zinc-400 hover:text-white transition">Email</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Legal</h3>
            <div className="space-y-3">
              <Link to="/terms" className="block text-sm text-zinc-400 hover:text-white transition">Terms & Conditions</Link>
              <Link to="/privacy" className="block text-sm text-zinc-400 hover:text-white transition">Privacy Policy</Link>
            </div>
          </div>

        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs text-zinc-600 md:flex-row">
          <p>© 2026 FXC. All rights reserved.</p>
          <p>Tools for futures, currency & options involves substantial risk. Only risk capital should be used for trading.</p>
        </div>

      </div>
    </footer>
  )
}
