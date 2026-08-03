import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Edit2, Save, X, Plus, Trash2, ExternalLink } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import api from '../../services/api'

interface Social { platform: string; url: string }
interface FooterData {
  companyName: string
  tagline: string
  email: string
  socials: Social[]
  copyrightText: string
  disclaimerText: string
}

const defaultData: FooterData = {
  companyName: 'FXC',
  tagline: 'Live trading • Real discussions • No signals • No hype',
  email: 'contact@fxc.com',
  socials: [
    { platform: 'Instagram', url: '#' },
    { platform: 'Discord', url: 'https://discord.gg/vrHwGxE3VA' },
    { platform: 'X', url: '#' },
    { platform: 'YouTube', url: '#' },
  ],
  copyrightText: '© 2026 FXC. All rights reserved.',
  disclaimerText: 'Trading futures, currency & options involves substantial risk of loss. Only risk capital you can afford to lose.',
}

const SOCIAL_ICONS: Record<string, ReactElement> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  discord: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
}

function getSocialIcon(platform: string): ReactElement {
  const key = platform.toLowerCase()
  return SOCIAL_ICONS[key] ?? (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
    </svg>
  )
}

function FieldModal({ label, value, multiline, onSave, onClose }: {
  label: string; value: string; multiline?: boolean
  onSave: (v: string) => void; onClose: () => void
}) {
  const [val, setVal] = useState(value)
  const cls = 'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500'
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-sm">Edit {label}</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white"><X size={16} /></button>
        </div>
        {multiline
          ? <textarea value={val} onChange={e => setVal(e.target.value)} rows={3} className={cls} autoFocus />
          : <input value={val} onChange={e => setVal(e.target.value)} className={cls} autoFocus />
        }
        <div className="flex gap-2 mt-4">
          <button onClick={() => onSave(val)} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded transition flex items-center justify-center gap-1">
            <Save size={14} /> Save
          </button>
          <button onClick={onClose} className="flex-1 border border-zinc-600 hover:bg-zinc-800 text-white text-sm font-semibold py-2 rounded transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}

function SocialEditModal({ social, onSave, onClose }: {
  social: Social; onSave: (s: Social) => void; onClose: () => void
}) {
  const [val, setVal] = useState({ ...social })
  const cls = 'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500'
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-sm">Edit Social Link</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white"><X size={16} /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Platform Name</label>
            <input value={val.platform} onChange={e => setVal(v => ({ ...v, platform: e.target.value }))} className={cls} placeholder="e.g. Instagram" />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">URL</label>
            <input value={val.url} onChange={e => setVal(v => ({ ...v, url: e.target.value }))} className={cls} placeholder="https://..." />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={() => onSave(val)} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded transition flex items-center justify-center gap-1">
            <Save size={14} /> Save
          </button>
          <button onClick={onClose} className="flex-1 border border-zinc-600 hover:bg-zinc-800 text-white text-sm font-semibold py-2 rounded transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}

const NAV_SECTIONS = [
  { label: 'Course', id: 'courses' },
  { label: 'Community', id: 'community' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Mentorship', id: 'mentorship' },
]

export default function EditableFooter() {
  const [data, setData] = useState<FooterData>(defaultData)
  const [editingField, setEditingField] = useState<{ label: string; field: keyof Omit<FooterData, 'socials'>; value: string; multiline?: boolean } | null>(null)
  const [editingSocial, setEditingSocial] = useState<{ index: number; social: Social } | null>(null)
  const { isAdminMode, sectionSaved, triggerDataRefresh } = useAdmin()

  useEffect(() => {
    api.get('/footer').then(r => {
      const d = r.data
      setData({
        companyName: d.companyName || defaultData.companyName,
        tagline: d.tagline || defaultData.tagline,
        email: d.email || defaultData.email,
        socials: d.socials?.length ? d.socials : defaultData.socials,
        copyrightText: d.copyrightText || defaultData.copyrightText,
        disclaimerText: d.disclaimerText || defaultData.disclaimerText,
      })
    }).catch(() => setData(defaultData))
  }, [sectionSaved['footer']])

  const persist = async (updated: FooterData) => {
    try { await api.put('/footer', updated); setData(updated); triggerDataRefresh('footer') }
    catch (e) { console.error(e) }
  }

  const handleFieldSave = async (value: string) => {
    if (!editingField) return
    await persist({ ...data, [editingField.field]: value })
    setEditingField(null)
  }

  const handleSocialSave = async (social: Social) => {
    if (!editingSocial) return
    const socials = [...data.socials]
    if (editingSocial.index === socials.length) socials.push(social)
    else socials[editingSocial.index] = social
    await persist({ ...data, socials })
    setEditingSocial(null)
  }

  const deleteSocial = async (idx: number) => {
    await persist({ ...data, socials: data.socials.filter((_, i) => i !== idx) })
  }

  const EditBtn = ({ onClick }: { onClick: () => void }) => {
    if (!isAdminMode) return null
    return (
      <button type="button" onClick={onClick}
        className="inline-flex items-center gap-1 ml-1.5 px-1.5 py-0.5 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold rounded transition-all align-middle">
        <Edit2 size={9} /> Edit
      </button>
    )
  }

  return (
    <>
      <footer className="relative bg-[#050508] text-white overflow-hidden">
        {/* Top gradient border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        {/* Background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-700/8 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-10 sm:px-8 lg:px-10">

          {/* Main grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr_1fr_1.2fr]">

            {/* Brand column */}
            <div className="space-y-6">
              <Link to="/" className="group relative inline-flex items-center">
                <span className="relative text-lg font-black tracking-[0.18em] uppercase transition-all duration-300 group-hover:tracking-[0.26em]">
                  <span className="bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent group-hover:from-violet-400 group-hover:via-white group-hover:to-violet-400 transition-all duration-500">
                    FXC
                  </span>
                  <span className="text-violet-400 group-hover:text-white transition-colors duration-300">.IN</span>
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-violet-500 to-transparent group-hover:w-full transition-all duration-500" />
                </span>
              </Link>

              <p className="group/tag max-w-xs text-sm text-zinc-500 leading-6">
                {data.tagline}
                <EditBtn onClick={() => setEditingField({ label: 'Tagline', field: 'tagline', value: data.tagline })} />
              </p>

              {/* Social icons */}
              <div className="flex flex-wrap items-center gap-2">
                {data.socials.map((s, i) => (
                  <div key={i} className="group/social relative">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/4 text-zinc-400 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white transition-all text-sm font-bold"
                      title={s.platform}
                    >
                      {getSocialIcon(s.platform)}
                    </a>
                    {isAdminMode && (
                      <div className="absolute -top-1 -right-1 flex gap-0.5 opacity-0 group-hover/social:opacity-100 transition-all z-10">
                        <button type="button" onClick={() => setEditingSocial({ index: i, social: s })} className="h-4 w-4 bg-violet-600 hover:bg-violet-500 rounded text-white flex items-center justify-center"><Edit2 size={8} /></button>
                        <button type="button" onClick={() => deleteSocial(i)} className="h-4 w-4 bg-red-600 hover:bg-red-500 rounded text-white flex items-center justify-center"><Trash2 size={8} /></button>
                      </div>
                    )}
                  </div>
                ))}
                {isAdminMode && (
                  <button type="button" onClick={() => setEditingSocial({ index: data.socials.length, social: { platform: '', url: '' } })}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-dashed border-violet-500/30 text-violet-500 hover:border-violet-500/60 hover:text-violet-400 transition-all">
                    <Plus size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Product</h3>
              <ul className="space-y-3">
                {NAV_SECTIONS.map(({ label, id }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer bg-none border-none text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact — email only */}
            <div>
              <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Contact</h3>
              <div className="group/email flex items-center gap-2">
                <a href={`mailto:${data.email}`} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ExternalLink size={12} className="text-zinc-600" />
                  {data.email}
                </a>
                <EditBtn onClick={() => setEditingField({ label: 'Email', field: 'email', value: data.email })} />
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Legal</h3>
              <ul className="space-y-3">
                <li><Link to="/terms" className="text-sm text-zinc-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-sm text-zinc-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/refund" className="text-sm text-zinc-400 hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="mt-14 border-t border-white/6" />

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <p className="group/copy text-xs text-zinc-600">
              {data.copyrightText}
              <EditBtn onClick={() => setEditingField({ label: 'Copyright Text', field: 'copyrightText', value: data.copyrightText })} />
            </p>
            <p className="group/disc max-w-md text-xs text-zinc-700 leading-5 md:text-right">
              {data.disclaimerText}
              <EditBtn onClick={() => setEditingField({ label: 'Disclaimer', field: 'disclaimerText', value: data.disclaimerText, multiline: true })} />
            </p>
          </div>

        </div>
      </footer>

      {editingField && (
        <FieldModal label={editingField.label} value={editingField.value} multiline={editingField.multiline} onSave={handleFieldSave} onClose={() => setEditingField(null)} />
      )}
      {editingSocial && (
        <SocialEditModal social={editingSocial.social} onSave={handleSocialSave} onClose={() => setEditingSocial(null)} />
      )}
    </>
  )
}
