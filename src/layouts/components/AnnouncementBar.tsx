import { useEffect, useState } from 'react'
import { Edit2, Save, X, EyeOff } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { bannerAPI } from '../../services/api'

interface BannerData {
  text: string
  ctaText: string
  message: string
  isActive: boolean
}

const defaultData: BannerData = {
  text: 'Limited Seats Available',
  ctaText: 'Enroll Now',
  message: 'Only a few spots left this batch',
  isActive: true,
}

function EditModal({ data, onSave, onClose }: {
  data: BannerData
  onSave: (d: BannerData) => void
  onClose: () => void
}) {
  const [val, setVal] = useState({ ...data })
  const inp = 'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500'
  return (
    <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-bold text-sm">Edit Announcement Bar</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white"><X size={16} /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Scrolling Text</label>
            <input value={val.text} onChange={e => setVal(v => ({ ...v, text: e.target.value }))} className={inp} placeholder="Limited Seats Available" />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">CTA Badge Text</label>
            <input value={val.ctaText} onChange={e => setVal(v => ({ ...v, ctaText: e.target.value }))} className={inp} placeholder="Enroll Now" />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Sub-message</label>
            <input value={val.message} onChange={e => setVal(v => ({ ...v, message: e.target.value }))} className={inp} placeholder="Only a few spots left this batch" />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <input type="checkbox" id="isActive" checked={val.isActive} onChange={e => setVal(v => ({ ...v, isActive: e.target.checked }))} className="w-4 h-4" />
            <label htmlFor="isActive" className="text-sm text-zinc-400 cursor-pointer">Show announcement bar</label>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={() => onSave(val)} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded transition flex items-center justify-center gap-1">
            <Save size={14} /> Save
          </button>
          <button onClick={onClose} className="flex-1 border border-zinc-600 hover:bg-zinc-800 text-white text-sm font-semibold py-2 rounded transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function AnnouncementBar() {
  const [data, setData] = useState<BannerData>(defaultData)
  const [editing, setEditing] = useState(false)
  const { isAdminMode, sectionSaved, triggerDataRefresh } = useAdmin()

  useEffect(() => {
    bannerAPI.get().then(r => {
      const d = r.data
      setData({
        text: d.text || defaultData.text,
        ctaText: d.ctaText || defaultData.ctaText,
        message: d.message || defaultData.message,
        isActive: d.isActive !== false,
      })
    }).catch(() => {})
  }, [sectionSaved['banner']])

  const handleSave = async (updated: BannerData) => {
    try {
      await bannerAPI.update(updated)
      setData(updated)
      triggerDataRefresh('banner')
    } catch (e) { console.error(e) }
    setEditing(false)
  }

  // In admin mode always show so it can be edited; otherwise respect isActive
  if (!data.isActive && !isAdminMode) return null

  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Build the repeating ticker content
  const tickerItems = Array.from({ length: 8 }, (_, i) => (
    <span key={i} className="inline-flex items-center gap-3 px-6">
      <span className="h-1 w-1 rounded-full bg-white/40" />
      <span className="font-semibold tracking-wide">{data.text}</span>
      <button
        type="button"
        onClick={scrollToCourses}
        className="rounded bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-700 hover:bg-violet-100 transition-colors cursor-pointer"
      >
        {data.ctaText}
      </button>
      <span className="text-white/60 text-xs hidden sm:inline">{data.message}</span>
    </span>
  ))

  return (
    <>
      <div className={`relative overflow-hidden bg-violet-700 ${!data.isActive ? 'opacity-50' : ''}`}>
        {/* Scrolling ticker */}
        <div
          className="flex whitespace-nowrap text-white text-xs py-2"
          style={{ animation: 'ticker 28s linear infinite', willChange: 'transform' }}
        >
          {tickerItems}
          {/* Duplicate for seamless loop */}
          {tickerItems}
        </div>

        {/* Admin controls */}
        {isAdminMode && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1.5 z-10">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="flex items-center gap-1 px-2 py-1 bg-white/20 hover:bg-white/30 text-white text-[10px] font-semibold rounded transition"
            >
              <Edit2 size={10} /> Edit
            </button>
            <button
              type="button"
              onClick={() => handleSave({ ...data, isActive: !data.isActive })}
              className="flex items-center gap-1 px-2 py-1 bg-white/20 hover:bg-white/30 text-white text-[10px] font-semibold rounded transition"
              title={data.isActive ? 'Hide bar' : 'Show bar'}
            >
              <EyeOff size={10} /> {data.isActive ? 'Hide' : 'Show'}
            </button>
          </div>
        )}

        <style>{`
          @keyframes ticker {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {editing && <EditModal data={data} onSave={handleSave} onClose={() => setEditing(false)} />}
    </>
  )
}
