import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Edit2, Save } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import api from '../../services/api'

interface FooterData {
  companyName: string
  email: string
  phone: string
  copyrightText: string
  disclaimerText: string
}

const defaultData: FooterData = {
  companyName: 'FXC',
  email: 'contact@fxc.com',
  phone: '',
  copyrightText: '© 2026 FXC. All rights reserved.',
  disclaimerText: 'Tools for futures, currency & options involves substantial risk. Only risk capital should be used for trading.',
}

function FieldModal({ label, value, multiline, onSave, onClose }: { label: string; value: string; multiline?: boolean; onSave: (v: string) => void; onClose: () => void }) {
  const [val, setVal] = useState(value)
  const cls = 'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500'
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-white font-bold mb-4 text-sm">Edit {label}</h3>
        {multiline ? <textarea value={val} onChange={e => setVal(e.target.value)} rows={3} className={cls} autoFocus /> : <input value={val} onChange={e => setVal(e.target.value)} className={cls} autoFocus />}
        <div className="flex gap-2 mt-4">
          <button onClick={() => onSave(val)} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded transition flex items-center justify-center gap-1"><Save size={14} /> Save</button>
          <button onClick={onClose} className="flex-1 border border-zinc-600 hover:bg-zinc-800 text-white text-sm font-semibold py-2 rounded transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function EditableFooter() {
  const [data, setData] = useState<FooterData>(defaultData)
  const [editingField, setEditingField] = useState<{ label: string; field: keyof FooterData; value: string; multiline?: boolean } | null>(null)
  const { isAdminMode, sectionSaved, triggerDataRefresh } = useAdmin()

  useEffect(() => {
    api.get('/footer').then(r => setData(r.data)).catch(() => setData(defaultData))
  }, [sectionSaved['footer']])

  const handleSave = async (value: string) => {
    if (!editingField) return
    const updated = { ...data, [editingField.field]: value }
    try { await api.put('/footer', updated); setData(updated); triggerDataRefresh('footer') } catch (e) { console.error(e) }
    setEditingField(null)
  }

  const EditBtn = ({ field, value, label, multiline }: { field: keyof FooterData; value: string; label: string; multiline?: boolean }) => {
    if (!isAdminMode) return null
    return <button type="button" onClick={() => setEditingField({ label, field, value, multiline })} className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold rounded opacity-0 group-hover:opacity-100 transition-all align-middle"><Edit2 size={10} /></button>
  }

  return (
    <>
      <footer className="border-t border-white/8 bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">

          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600">
                  <span className="text-[10px] font-black text-white tracking-tight">{data.companyName.slice(0, 3)}</span>
                </div>
                <span className="group text-sm font-semibold tracking-[0.12em] uppercase text-white">
                  {data.companyName}<EditBtn field="companyName" value={data.companyName} label="Company Name" />
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm text-zinc-400 leading-6">
                Live trading • Real discussions • No signals • No hype
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a href="#" className="text-zinc-500 hover:text-white transition text-sm">Instagram</a>
                <a href="https://discord.gg/vrHwGxE3VA" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition text-sm">Discord</a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Product</h3>
              <div className="space-y-3">
                {['courses', 'community', 'plans'].map(id => (
                  <button key={id} type="button" onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} className="block text-sm text-zinc-400 hover:text-white transition bg-none border-none cursor-pointer capitalize">
                    {id === 'plans' ? 'Pricing' : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Contact</h3>
              <div className="space-y-3">
                <a href="#" className="block text-sm text-zinc-400 hover:text-white transition">Instagram</a>
                <a href="https://discord.gg/vrHwGxE3VA" target="_blank" rel="noopener noreferrer" className="block text-sm text-zinc-400 hover:text-white transition">Discord</a>
                <span className="group flex items-center text-sm text-zinc-400">
                  <a href={`mailto:${data.email}`} className="hover:text-white transition">{data.email}</a>
                  <EditBtn field="email" value={data.email} label="Email" />
                </span>
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

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-zinc-600 md:flex-row">
            <p className="group">{data.copyrightText}<EditBtn field="copyrightText" value={data.copyrightText} label="Copyright Text" /></p>
            <p className="group">{data.disclaimerText}<EditBtn field="disclaimerText" value={data.disclaimerText} label="Disclaimer Text" multiline /></p>
          </div>

        </div>
      </footer>

      {editingField && <FieldModal label={editingField.label} value={editingField.value} multiline={editingField.multiline} onSave={handleSave} onClose={() => setEditingField(null)} />}
    </>
  )
}
