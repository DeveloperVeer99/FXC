import { useState, useEffect, useRef } from 'react'
import { Lock, ArrowRight, X, Eye, EyeOff } from 'lucide-react'
import { authAPI } from '@/services/api'

interface AdminLoginProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: () => void
}

export function AdminLogin({ isOpen, onClose, onLoginSuccess }: AdminLoginProps) {
  const [secretKey, setSecretKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setSecretKey('')
      setError('')
      setShowKey(false)
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const key = secretKey.trim()
    if (!key) return
    setError('')
    setLoading(true)
    try {
      const res = await authAPI.login(key)
      if (res.data?.token) {
        sessionStorage.setItem('adminToken', res.data.token)
        setSecretKey('')
        onLoginSuccess()
        onClose()
      } else {
        setError('No token received. Please try again.')
      }
    } catch (err: any) {
      if (!err.response) {
        setError('Cannot reach server. Make sure the backend is running.')
      } else if (err.response.status === 401) {
        setError('Invalid secret key.')
      } else if (err.response.status === 503) {
        setError('Server is temporarily unavailable. Try again in a moment.')
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600">
                <Lock size={16} className="text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">Admin Access</h2>
                <p className="text-xs text-zinc-500 mt-0.5">FXC Dashboard</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/8 rounded-lg transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-widest">
                Secret Key
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type={showKey ? 'text' : 'password'}
                  value={secretKey}
                  onChange={e => { setSecretKey(e.target.value); setError('') }}
                  placeholder="Enter your secret key"
                  autoComplete="off"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  tabIndex={-1}
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 px-3.5 py-3 bg-red-500/10 border border-red-500/25 rounded-xl">
                <span className="text-red-400 text-xs leading-relaxed">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !secretKey.trim()}
              className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.25)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-[11px] text-zinc-600">
            Key is verified against the secure database
          </p>
        </div>
      </div>
    </div>
  )
}
