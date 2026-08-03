import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Save } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { bannerAPI } from '../services/api';

interface BannerData {
  _id?: string;
  text: string;
  message: string;
  isActive: boolean;
}

function FieldEditModal({ label, value, multiline, onSave, onClose }: {
  label: string; value: string; multiline?: boolean;
  onSave: (v: string) => void; onClose: () => void
}) {
  const [val, setVal] = useState(value)
  const cls = 'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500'
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-white font-bold mb-4 text-sm">Edit {label}</h3>
        {multiline
          ? <textarea value={val} onChange={e => setVal(e.target.value)} rows={3} className={cls} autoFocus />
          : <input value={val} onChange={e => setVal(e.target.value)} className={cls} autoFocus />
        }
        <div className="flex gap-2 mt-4">
          <button onClick={() => onSave(val)} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded transition flex items-center justify-center gap-1"><Save size={14} /> Save</button>
          <button onClick={onClose} className="flex-1 border border-zinc-600 hover:bg-zinc-800 text-white text-sm font-semibold py-2 rounded transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function EditableBanner() {
  const [banner, setBanner] = useState<BannerData | null>(null)
  const [editingField, setEditingField] = useState<{ label: string; field: keyof BannerData; value: string; multiline?: boolean } | null>(null)
  const { isAdminMode, dataSaved, sectionSaved, triggerDataRefresh } = useAdmin()

  useEffect(() => {
    bannerAPI.get().then(r => setBanner(r.data)).catch(() => {})
  }, [dataSaved, sectionSaved['banner']])

  if (!banner) return null

  const handleSave = async (value: string) => {
    if (!editingField || !banner) return
    const updated = { ...banner, [editingField.field]: value }
    try {
      await bannerAPI.update(updated)
      setBanner(updated)
      triggerDataRefresh('banner')
    } catch (e) { console.error(e) }
    setEditingField(null)
  }

  const EditBtn = ({ field, value, label, multiline }: { field: keyof BannerData; value: string; label: string; multiline?: boolean }) => {
    if (!isAdminMode) return null
    return (
      <button type="button" onClick={() => setEditingField({ label, field, value, multiline })}
        className="inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold rounded opacity-0 group-hover:opacity-100 transition-all align-middle">
        <Edit2 size={10} />
      </button>
    )
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#030308] px-6 py-32 sm:px-10 lg:px-14">
        {[...Array(4)].map((_, i) => (
          <motion.div key={i} className="absolute left-0 right-0 h-px" style={{ top: `${20 + i * 20}%` }}
            initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}>
            <div className="h-full bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />
          </motion.div>
        ))}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/15 blur-[160px] pointer-events-none" />
        <div className="absolute top-8 left-8 h-12 w-12 border-l border-t border-violet-500/20" />
        <div className="absolute top-8 right-8 h-12 w-12 border-r border-t border-violet-500/20" />
        <div className="absolute bottom-8 left-8 h-12 w-12 border-l border-b border-violet-500/20" />
        <div className="absolute bottom-8 right-8 h-12 w-12 border-r border-b border-violet-500/20" />

        <div className="relative mx-auto max-w-4xl text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-8 group">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">{banner.text}</span>
              <EditBtn field="text" value={banner.text} label="Banner Text" />
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ready to trade like
              <span className="block mt-2 bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">the institutions do?</span>
            </h2>

            <p className="group mx-auto mt-6 max-w-xl text-base text-zinc-400 leading-7">
              {banner.message}
              <EditBtn field="message" value={banner.message} label="Banner Message" multiline />
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="https://discord.gg/vrHwGxE3VA" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,0.4)] transition hover:bg-violet-500">
                Get Access →
              </a>
              <a href="https://discord.gg/vrHwGxE3VA" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Join Discord →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {editingField && (
        <FieldEditModal label={editingField.label} value={editingField.value} multiline={editingField.multiline} onSave={handleSave} onClose={() => setEditingField(null)} />
      )}
    </>
  )
}
