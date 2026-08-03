import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const navLinks = [
  { label: 'Course', id: 'courses' },
  { label: 'Community', id: 'community' },
  { label: 'Pricing', id: 'pricing' },
]

interface NavbarProps {
  onAdminClick?: () => void
  onLogout?: () => void
}

export default function Navbar({ onAdminClick, onLogout }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAdminMode } = useAdmin()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileOpen(false)
    }
  }

  return (
    <>
      {/* Floating Navbar wrapper */}
      <div className="sticky top-0 z-50 flex justify-center px-4 pt-3 pb-1 sm:px-6">
        <header
          className={`w-full max-w-5xl rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'border border-violet-500/20 bg-[#0a0a14]/85 backdrop-blur-2xl shadow-[0_0_0_1px_rgba(139,92,246,0.08),0_8px_40px_rgba(0,0,0,0.6),0_0_80px_rgba(124,58,237,0.08)]'
              : 'border border-white/6 bg-white/3 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
          }`}
        >
          <nav className="flex h-14 items-center justify-between px-5 sm:px-6">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 shadow-[0_0_12px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_18px_rgba(124,58,237,0.7)] transition-shadow">
                <span className="text-[10px] font-black text-white tracking-tight">FXC</span>
              </div>
              <span className="text-sm font-semibold tracking-[0.12em] uppercase text-white">
                FXC
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.id)}
                  type="button"
                  className="relative px-4 py-2 text-sm font-medium text-zinc-400 transition-colors duration-150 hover:text-white group bg-none border-none cursor-pointer"
                >
                  {link.label}
                  <span className="absolute inset-x-4 bottom-1.5 h-px scale-x-0 bg-violet-500 transition-transform duration-200 group-hover:scale-x-100 origin-left" />
                </button>
              ))}
            </div>

            {/* Desktop Right - Admin/Logout Button */}
            <div className="hidden items-center gap-3 md:flex">
              {isAdminMode ? (
                <>
                  <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                    ✓ Admin Mode
                  </div>
                  <button
                    onClick={onLogout}
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-500"
                    title="Logout"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={onAdminClick}
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-violet-500 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
                  title="Admin Login"
                >
                  🔐 Admin <ArrowUpRight size={14} />
                </button>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white md:hidden"
              title="Toggle menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="border-t border-white/6 px-4 py-4 flex flex-col gap-1 md:hidden">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.id)}
                  type="button"
                  className="rounded-lg px-4 py-3 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white w-full text-left bg-none border-none cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-2 h-px bg-white/6" />
              <div className="mt-2 flex flex-col gap-2">
                {isAdminMode ? (
                  <>
                    <div className="rounded-lg bg-emerald-600/20 border border-emerald-500/30 px-4 py-2 text-center text-xs font-semibold text-emerald-400">
                      ✓ Admin Mode Active
                    </div>
                    <button
                      onClick={() => {
                        onLogout?.()
                        setMobileOpen(false)
                      }}
                      type="button"
                      className="rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-500"
                      title="Logout"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      onAdminClick?.()
                      setMobileOpen(false)
                    }}
                    type="button"
                    className="rounded-lg bg-violet-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-violet-500"
                    title="Admin Login"
                  >
                    🔐 Admin
                  </button>
                )}
              </div>
            </div>
          )}
        </header>
      </div>
    </>
  )
}
