import { useEffect, useState } from 'react'
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

const SOCIAL_ICONS: Record<string, string> = {
  instagram: '📸',
  discord: '💬',
  x: '𝕏',
  twitter: '𝕏',
  youtube: '▶',
  telegram: '✈',
  linkedin: 'in',
}

function getSocialIcon(platform: string) {
  return SOCIAL_ICONS[platform.toLowerCase()] ?? '🔗'
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
        className="inline-flex items-center gap-1 ml-1.5 px-1.5 py-0.5 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold rounded opacity-0 group-hover:opacity-100 transition-all align-middle">
        <Edit2 size={9} />
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
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:shadow-[0_0_28px_rgba(124,58,237,0.6)] transition-shadow">
                  <span className="text-[11px] font-black text-white tracking-tight">FXC</span>
                </div>
                <span className="group/name text-base font-bold tracking-[0.15em] uppercase text-white">
                  {data.companyName}
                  <EditBtn onClick={() => setEditingField({ label: 'Company Name', field: 'companyName', value: data.companyName })} />
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
