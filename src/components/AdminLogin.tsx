import { useState } from 'react'
import { X, Lock, LogIn } from 'lucide-react'
import { authAPI } from '@/services/api'

interface AdminLoginProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: () => void
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [secretKey, setSecretKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authAPI.login(secretKey)
      
      // Store token in sessionStorage (not localStorage)
      if (response.data.token) {
        sessionStorage.setItem('adminToken', response.data.token)
      }
      
      setSecretKey('')
      onLoginSuccess()
      onClose()
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Login failed'
      console.error('Login error:', errorMsg)
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/30 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#0d0d0d] to-[#0a0a0f] border border-white/10 rounded-2xl p-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-transparent to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative bg-[#0d0d0d]/95 rounded-2xl p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg">
                  <Lock size={20} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Admin Access
                </h2>
              </div>
              <p className="text-sm text-zinc-400">Enter your secret key to manage FXC</p>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              type="button"
              title="Close"
            >
              <X size={24} />
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <label className="block text-sm font-semibold text-zinc-300 mb-2">
                  Secret Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Paste your secret key here"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                  />
                  <Lock className="absolute right-3 top-3 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={20} />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur-sm">
                  <p className="text-red-300 text-sm font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !secretKey.trim()}
                className="w-full relative group overflow-hidden rounded-lg py-3 font-semibold transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-violet-600/50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center gap-2 text-white">
                  <LogIn size={18} />
                  {loading ? 'Verifying...' : 'Enter Dashboard'}
                </div>
                {(loading || !secretKey.trim()) && (
                  <div className="absolute inset-0 bg-black/20"></div>
                )}
              </button>

              <div className="pt-2">
                <p className="text-xs text-zinc-500 text-center leading-relaxed">
                  🔐 Your access key is verified against our secure database
                </p>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-[#0d0d0d] text-zinc-600">FXC Admin Portal</span>
              </div>
            </div>

            <div className="space-y-2 text-center">
              <p className="text-xs text-zinc-500">
                Unauthorized access attempts are logged
              </p>
              <div className="flex items-center justify-center gap-1 text-xs text-zinc-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Server connected
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
