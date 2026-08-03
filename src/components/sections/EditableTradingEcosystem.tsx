import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, BookOpen, Users, ShieldCheck, Edit2, Save, X } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import api from '../../services/api'

function FieldModal({ label, value, multiline, onSave, onClose }: {
  label: string; value: string; multiline?: boolean
  onSave: (v: string) => void; onClose: () => void
}) {
  const [val, setVal] = useState(value)
  const cls = 'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500'
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-sm">Edit {label}</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white"><X size={16} /></button>
        </div>
        {multiline
          ? <textarea value={val} onChange={e => setVal(e.target.value)} rows={4} className={cls} autoFocus />
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

interface EcosystemCard { tag: string; title: string; body: string }
interface EcosystemData { title: string; subtitle: string; cards: EcosystemCard[] }

const defaultCards: EcosystemCard[] = [
  { tag: 'Core Method', title: 'Orderflow + Auction Theory', body: 'You learn to read the actual buying and selling happening at every price — footprint charts, delta, cumulative volume — not lagging indicators. Combined with Auction Market Theory, you understand why price is at a level, not just that it is.' },
  { tag: 'Structure', title: 'Skill-First, No Shortcuts', body: 'No signals. No copy-trading. Every concept is taught with the logic behind it so you can apply it independently in any market condition.' },
  { tag: 'Community', title: 'Live Trading Floor', body: 'Learn while markets are open. Watch real orderflow being read in real time, ask questions, and build the habit of process-driven execution.' },
  { tag: 'Outcome', title: 'Built for Prop Firm Traders', body: 'The entire framework — entries, stops, sizing, consistency — is designed around passing prop firm evaluations and trading funded accounts with discipline.' },
]

const defaultData: EcosystemData = {
  title: 'Not Another Trading Course',
  subtitle: 'Most courses teach patterns and indicators. We teach you to read the actual mechanics of price — the way institutions do.',
  cards: defaultCards,
}

type EditingField =
  | { kind: 'section'; field: 'title' | 'subtitle'; value: string; multiline?: boolean }
  | { kind: 'card'; index: number; field: keyof EcosystemCard; value: string; multiline?: boolean }

export default function EditableTradingEcosystem() {
  const [data, setData] = useState<EcosystemData>(defaultData)
  const [editing, setEditing] = useState<EditingField | null>(null)
  const { isAdminMode, dataSaved, sectionSaved, triggerDataRefresh } = useAdmin()

  useEffect(() => {
    api.get('/ecosystem').then(r => {
      const d = r.data
      setData({ title: d.title, subtitle: d.subtitle, cards: d.cards?.length ? d.cards : defaultCards })
    }).catch(() => setData(defaultData))
  }, [dataSaved, sectionSaved['ecosystem']])

  const persist = async (updated: EcosystemData) => {
    try { await api.put('/ecosystem', updated); setData(updated); triggerDataRefresh('ecosystem') }
    catch (e) { console.error(e) }
  }

  const handleSave = async (value: string) => {
    if (!editing) return
    if (editing.kind === 'section') {
      await persist({ ...data, [editing.field]: value })
    } else {
      const cards = data.cards.map((c, i) => i === editing.index ? { ...c, [editing.field]: value } : c)
      await persist({ ...data, cards })
    }
    setEditing(null)
  }

  const EditBtn = ({ onClick }: { onClick: () => void }) => {
    if (!isAdminMode) return null
    return (
      <button type="button" onClick={onClick} className="inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold rounded opacity-0 group-hover:opacity-100 transition-all align-middle">
        <Edit2 size={10} />
      </button>
    )
  }

  const cards = data.cards.length ? data.cards : defaultCards

  return (
    <>
      <section id="course" className="scroll-mt-20 bg-black px-4 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">What FXC Is</span>
            </div>
            <h2 className="group text-4xl font-black tracking-tight text-white sm:text-5xl">
              {data.title}
              <EditBtn onClick={() => setEditing({ kind: 'section', field: 'title', value: data.title })} />
            </h2>
            <p className="group mt-4 text-base text-zinc-400 leading-7">
              {data.subtitle}
              <EditBtn onClick={() => setEditing({ kind: 'section', field: 'subtitle', value: data.subtitle, multiline: true })} />
            </p>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Card 0 — wide */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0 }}
              className="group relative rounded-2xl border border-white/8 bg-[#0d0d0d] p-7 lg:col-span-2 overflow-hidden hover:border-violet-500/25 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                    <Activity className="h-4 w-4 text-violet-400" />
                  </div>
                  <span className="group/tag text-[10px] font-mono uppercase tracking-widest text-violet-500">
                    {cards[0]?.tag}
                    <EditBtn onClick={() => setEditing({ kind: 'card', index: 0, field: 'tag', value: cards[0]?.tag })} />
                  </span>
                </div>
                <h3 className="group/title text-xl font-bold text-white mb-3">
                  {cards[0]?.title}
                  <EditBtn onClick={() => setEditing({ kind: 'card', index: 0, field: 'title', value: cards[0]?.title })} />
                </h3>
                <p className="group/body text-sm text-zinc-400 leading-relaxed max-w-xl">
                  {cards[0]?.body}
                  <EditBtn onClick={() => setEditing({ kind: 'card', index: 0, field: 'body', value: cards[0]?.body, multiline: true })} />
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Footprint Charts', 'Delta Analysis', 'CVD Divergence', 'Volume Profile', 'POC / VAH / VAL'].map(t => (
                    <span key={t} className="rounded-full border border-white/8 bg-white/3 px-3 py-1 text-[11px] font-mono text-zinc-500">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 1 */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative rounded-2xl border border-white/8 bg-[#0d0d0d] p-7 overflow-hidden hover:border-violet-500/25 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                    <BookOpen className="h-4 w-4 text-violet-400" />
                  </div>
                  <span className="group/tag text-[10px] font-mono uppercase tracking-widest text-violet-500">
                    {cards[1]?.tag}
                    <EditBtn onClick={() => setEditing({ kind: 'card', index: 1, field: 'tag', value: cards[1]?.tag })} />
                  </span>
                </div>
                <h3 className="group/title text-lg font-bold text-white mb-3">
                  {cards[1]?.title}
                  <EditBtn onClick={() => setEditing({ kind: 'card', index: 1, field: 'title', value: cards[1]?.title })} />
                </h3>
                <p className="group/body text-sm text-zinc-400 leading-relaxed">
                  {cards[1]?.body}
                  <EditBtn onClick={() => setEditing({ kind: 'card', index: 1, field: 'body', value: cards[1]?.body, multiline: true })} />
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
              className="group relative rounded-2xl border border-white/8 bg-[#0d0d0d] p-7 overflow-hidden hover:border-violet-500/25 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                    <Users className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="group/tag text-[10px] font-mono uppercase tracking-widest text-emerald-600">
                    {cards[2]?.tag}
                    <EditBtn onClick={() => setEditing({ kind: 'card', index: 2, field: 'tag', value: cards[2]?.tag })} />
                  </span>
                </div>
                <h3 className="group/title text-lg font-bold text-white mb-3">
                  {cards[2]?.title}
                  <EditBtn onClick={() => setEditing({ kind: 'card', index: 2, field: 'title', value: cards[2]?.title })} />
                </h3>
                <p className="group/body text-sm text-zinc-400 leading-relaxed">
                  {cards[2]?.body}
                  <EditBtn onClick={() => setEditing({ kind: 'card', index: 2, field: 'body', value: cards[2]?.body, multiline: true })} />
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">Floor Active Now</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3 — wide */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative rounded-2xl border border-white/8 bg-[#0d0d0d] p-7 sm:col-span-2 lg:col-span-2 overflow-hidden hover:border-violet-500/25 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                    <ShieldCheck className="h-4 w-4 text-violet-400" />
                  </div>
                  <span className="group/tag text-[10px] font-mono uppercase tracking-widest text-violet-500">
                    {cards[3]?.tag}
                    <EditBtn onClick={() => setEditing({ kind: 'card', index: 3, field: 'tag', value: cards[3]?.tag })} />
                  </span>
                </div>
                <h3 className="group/title text-xl font-bold text-white mb-3">
                  {cards[3]?.title}
                  <EditBtn onClick={() => setEditing({ kind: 'card', index: 3, field: 'title', value: cards[3]?.title })} />
                </h3>
                <p className="group/body text-sm text-zinc-400 leading-relaxed max-w-xl">
                  {cards[3]?.body}
                  <EditBtn onClick={() => setEditing({ kind: 'card', index: 3, field: 'body', value: cards[3]?.body, multiline: true })} />
                </p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[{ v: 'Process', l: 'Over Prediction' }, { v: 'Structure', l: 'Over Indicators' }, { v: 'Consistency', l: 'Over Big Wins' }, { v: 'Edge', l: 'Over Luck' }].map(item => (
                    <div key={item.v} className="rounded-lg border border-white/6 bg-black/40 px-3 py-2.5 text-center">
                      <div className="text-xs font-bold text-white">{item.v}</div>
                      <div className="text-[10px] text-zinc-600 mt-0.5">{item.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {editing && (
        <FieldModal
          label={editing.kind === 'section' ? editing.field : `Card ${(editing as any).index + 1} ${(editing as any).field}`}
          value={editing.value}
          multiline={editing.multiline}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  )
}
