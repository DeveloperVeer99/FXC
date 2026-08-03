import { useEffect, useState } from 'react'
import { Edit2, Save, Plus, Trash2, X } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import api from '../../services/api'

interface TestimonialItem {
  name: string
  role: string
  text: string
  rating: number
}

interface TestimonialsData {
  introText: string
  items: TestimonialItem[]
}

const defaultItems: TestimonialItem[] = [
  { name: 'Arjun M.', role: 'Prop Trader, Mumbai', text: 'FXC completely changed how I read the market. The orderflow sessions are unlike anything on YouTube — this is real institutional knowledge.', rating: 5 },
  { name: 'Priya S.', role: 'Retail Trader, Bangalore', text: 'I went from random entries to understanding WHY price moves. The auction theory module alone was worth 10x the price.', rating: 5 },
  { name: 'Rahul K.', role: 'Futures Trader, Delhi', text: 'Cleared my first prop firm challenge after 3 months in the mentorship program. The live trading floor is insane — you learn by watching real trades.', rating: 5 },
  { name: 'Sneha T.', role: 'Options Trader, Pune', text: "The optionflow + gamma exposure framework is something I've never seen taught anywhere else. My win rate went from 42% to 61%.", rating: 5 },
  { name: 'Vikram R.', role: 'Swing Trader, Chennai', text: "The community is serious and focused. No noise, no signals — just real traders helping each other grow. Best investment I've made.", rating: 5 },
  { name: 'Ananya P.', role: 'Day Trader, Hyderabad', text: "I was skeptical at first but the 1-on-1 sessions are incredibly personalized. My mentor identified my exact weaknesses in the first session.", rating: 5 },
]

const defaultData: TestimonialsData = {
  introText: 'Real results from real traders in the FXC ecosystem.',
  items: defaultItems,
}

function TestimonialCard({ item, index, isAdminMode, onEdit, onDelete }: { item: TestimonialItem; index: number; isAdminMode: boolean; onEdit: (i: number) => void; onDelete: (i: number) => void }) {
  return (
    <div className="shrink-0 w-80 rounded-xl border border-white/8 bg-[#0d0d0d] p-6 hover:border-violet-500/25 transition-colors relative group/card">
      {isAdminMode && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-all">
          <button type="button" onClick={() => onEdit(index)} className="p-1 bg-violet-600 hover:bg-violet-500 rounded text-white"><Edit2 size={10} /></button>
          <button type="button" onClick={() => onDelete(index)} className="p-1 bg-red-600 hover:bg-red-500 rounded text-white"><Trash2 size={10} /></button>
        </div>
      )}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: item.rating }).map((_, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}
      </div>
      <p className="text-sm text-zinc-300 leading-relaxed">"{item.text}"</p>
      <div className="mt-4 pt-4 border-t border-white/6">
        <div className="text-sm font-semibold text-white">{item.name}</div>
        <div className="text-xs text-zinc-500 mt-0.5">{item.role}</div>
      </div>
    </div>
  )
}

function EditCardModal({ item, onSave, onClose }: { item: TestimonialItem; onSave: (v: TestimonialItem) => void; onClose: () => void }) {
  const [val, setVal] = useState<TestimonialItem>({ ...item })
  const cls = 'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500'
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-lg p-6 w-full max-w-md space-y-3" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-bold text-sm">Edit Testimonial</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white"><X size={16} /></button>
        </div>
        <input placeholder="Name" value={val.name} onChange={e => setVal(v => ({ ...v, name: e.target.value }))} className={cls} />
        <input placeholder="Role" value={val.role} onChange={e => setVal(v => ({ ...v, role: e.target.value }))} className={cls} />
        <textarea placeholder="Testimonial text" value={val.text} onChange={e => setVal(v => ({ ...v, text: e.target.value }))} rows={3} className={cls} />
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-sm">Rating:</span>
          {[1,2,3,4,5].map(n => (
            <button key={n} type="button" onClick={() => setVal(v => ({ ...v, rating: n }))} className={`text-lg ${n <= val.rating ? 'text-amber-400' : 'text-zinc-600'}`}>★</button>
          ))}
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={() => onSave(val)} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded transition flex items-center justify-center gap-1"><Save size={14} /> Save</button>
          <button onClick={onClose} className="flex-1 border border-zinc-600 hover:bg-zinc-800 text-white text-sm font-semibold py-2 rounded transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function EditableTestimonials() {
  const [data, setData] = useState<TestimonialsData>(defaultData)
  const [editingCardIdx, setEditingCardIdx] = useState<number | null>(null)
  const [editingIntro, setEditingIntro] = useState(false)
  const [introVal, setIntroVal] = useState('')
  const { isAdminMode, sectionSaved, triggerDataRefresh } = useAdmin()

  useEffect(() => {
    api.get('/testimonials').then(r => {
      const d = r.data
      setData({ introText: d.introText, items: d.items?.length ? d.items : defaultItems })
    }).catch(() => setData(defaultData))
  }, [sectionSaved['testimonials']])

  const saveData = async (updated: TestimonialsData) => {
    try { await api.put('/testimonials', updated); setData(updated); triggerDataRefresh('testimonials') } catch (e) { console.error(e) }
  }

  const handleCardSave = async (val: TestimonialItem) => {
    if (editingCardIdx === null) return
    const items = [...data.items]
    if (editingCardIdx === items.length) items.push(val)
    else items[editingCardIdx] = val
    await saveData({ ...data, items })
    setEditingCardIdx(null)
  }

  const deleteCard = async (idx: number) => {
    await saveData({ ...data, items: data.items.filter((_, i) => i !== idx) })
  }

  const saveIntro = async () => {
    await saveData({ ...data, introText: introVal })
    setEditingIntro(false)
  }

  const doubled = [...data.items, ...data.items]

  return (
    <>
      <section className="bg-black px-6 py-24 sm:px-8 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">Testimonials</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Traders Who <span className="text-violet-400">Leveled Up</span>
            </h2>
            <p className="group mt-4 text-base text-zinc-400">
              {data.introText}
              {isAdminMode && (
                <button type="button" onClick={() => { setIntroVal(data.introText); setEditingIntro(true) }} className="inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold rounded opacity-0 group-hover:opacity-100 transition-all align-middle"><Edit2 size={10} /></button>
              )}
            </p>
            {isAdminMode && (
              <button type="button" onClick={() => setEditingCardIdx(data.items.length)} className="mt-4 inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition">
                <Plus size={12} /> Add testimonial
              </button>
            )}
          </div>
        </div>

        {/* Row 1 — left to right */}
        <div className="relative overflow-hidden mb-4">
          <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />
          <div className="flex gap-4" style={{ animation: 'marquee-left 40s linear infinite', willChange: 'transform' }}>
            {doubled.map((t, i) => <TestimonialCard key={i} item={t} index={i % data.items.length} isAdminMode={isAdminMode} onEdit={setEditingCardIdx} onDelete={deleteCard} />)}
          </div>
        </div>

        {/* Row 2 — right to left */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />
          <div className="flex gap-4" style={{ animation: 'marquee-right 40s linear infinite', willChange: 'transform' }}>
            {doubled.map((t, i) => <TestimonialCard key={i} item={t} index={i % data.items.length} isAdminMode={isAdminMode} onEdit={setEditingCardIdx} onDelete={deleteCard} />)}
          </div>
        </div>

        <style>{`
          @keyframes marquee-left  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        `}</style>
      </section>

      {editingCardIdx !== null && (
        <EditCardModal
          item={editingCardIdx === data.items.length ? { name: '', role: '', text: '', rating: 5 } : data.items[editingCardIdx]}
          onSave={handleCardSave}
          onClose={() => setEditingCardIdx(null)}
        />
      )}

      {editingIntro && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setEditingIntro(false)}>
          <div className="bg-zinc-900 border border-violet-500/30 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-white font-bold mb-4 text-sm">Edit Intro Text</h3>
            <textarea value={introVal} onChange={e => setIntroVal(e.target.value)} rows={2} className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500" autoFocus />
            <div className="flex gap-2 mt-4">
              <button onClick={saveIntro} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded transition flex items-center justify-center gap-1"><Save size={14} /> Save</button>
              <button onClick={() => setEditingIntro(false)} className="flex-1 border border-zinc-600 hover:bg-zinc-800 text-white text-sm font-semibold py-2 rounded transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
