import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Edit2 } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import api from '../../services/api'

interface StatsData {
  activeLearnersValue: number;
  completionRate: number;
  avgROI: number;
  averageRating: string;
}

function useCounter(target: number, duration = 1800, inView = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return count
}

const defaultStatsData: StatsData = {
  activeLearnersValue: 500,
  completionRate: 98,
  avgROI: 14,
  averageRating: '4.9',
}

const candles = [
  { o: 60, h: 75, l: 55, c: 70 }, { o: 70, h: 80, l: 65, c: 68 },
  { o: 68, h: 85, l: 62, c: 82 }, { o: 82, h: 90, l: 78, c: 79 },
  { o: 79, h: 88, l: 72, c: 86 }, { o: 86, h: 95, l: 83, c: 91 },
  { o: 91, h: 98, l: 85, c: 88 }, { o: 88, h: 94, l: 80, c: 93 },
  { o: 93, h: 100, l: 89, c: 97 },
]

function CandleChart() {
  const H = 80, W = 200, maxH = 100, minL = 55, range = maxH - minL
  const toY = (v: number) => H - ((v - minL) / range) * H
  const cw = W / candles.length
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-20 opacity-60">
      {candles.map((c, i) => {
        const x = i * cw + cw / 2
        const isUp = c.c >= c.o
        const color = isUp ? '#34d399' : '#f87171'
        const bodyTop = toY(Math.max(c.o, c.c))
        const bodyH = Math.max(2, Math.abs(toY(c.o) - toY(c.c)))
        return (
          <g key={i}>
            <line x1={x} y1={toY(c.h)} x2={x} y2={toY(c.l)} stroke={color} strokeWidth="0.8" opacity="0.6" />
            <rect x={x - cw * 0.3} y={bodyTop} width={cw * 0.6} height={bodyH} fill={color} rx="0.5" />
          </g>
        )
      })}
    </svg>
  )
}

// Inline edit modal for a single stat field
function StatEditModal({ label, fieldKey, value, onSave, onClose }: {
  label: string; fieldKey: keyof StatsData; value: string | number;
  onSave: (key: keyof StatsData, val: string) => void; onClose: () => void
}) {
  const [val, setVal] = useState(String(value))
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-lg p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <h3 className="text-white font-bold mb-4 text-sm">Edit {label}</h3>
        <input
          type="text"
          value={val}
          onChange={e => setVal(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500"
          autoFocus
        />
        <div className="flex gap-2 mt-4">
          <button onClick={() => onSave(fieldKey, val)} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded transition">Save</button>
          <button onClick={onClose} className="flex-1 border border-zinc-600 hover:bg-zinc-800 text-white text-sm font-semibold py-2 rounded transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}

function StatCard({ value, suffix, label, sub, inView, onEdit, isAdmin }: {
  value: number; suffix: string; label: string; sub: string; inView: boolean;
  onEdit: () => void; isAdmin: boolean
}) {
  const count = useCounter(value, 1600, inView)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl border border-white/8 bg-[#0d0d0d] p-6 overflow-hidden group hover:border-violet-500/30 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      {isAdmin && (
        <button
          type="button"
          onClick={onEdit}
          className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 px-1.5 py-1 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold rounded opacity-0 group-hover:opacity-100 transition-all"
        >
          <Edit2 size={10} /> Edit
        </button>
      )}
      <div className="text-4xl font-black text-white tabular-nums">{count}{suffix}</div>
      <div className="mt-2 text-sm font-semibold text-zinc-200">{label}</div>
      <div className="mt-1 text-xs text-zinc-500">{sub}</div>
    </motion.div>
  )
}

export default function EditableStatsSection() {
  const [statsData, setStatsData] = useState<StatsData>(defaultStatsData)
  const [editingField, setEditingField] = useState<{ label: string; fieldKey: keyof StatsData; value: string | number } | null>(null)
  const { isAdminMode, dataSaved, sectionSaved, triggerDataRefresh } = useAdmin()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    api.get('/stats').then(r => setStatsData(r.data)).catch(() => {})
  }, [dataSaved, sectionSaved['stats']])

  const handleSave = async (key: keyof StatsData, val: string) => {
    try {
      const updated = { ...statsData, [key]: key === 'averageRating' ? val : Number(val) }
      await api.put('/stats', updated)
      setStatsData(updated as StatsData)
      triggerDataRefresh('stats')
    } catch (e) { console.error(e) }
    setEditingField(null)
  }

  const statCards = [
    { value: statsData.activeLearnersValue, suffix: '+', label: 'Active Learners', sub: 'and growing every week', fieldKey: 'activeLearnersValue' as keyof StatsData },
    { value: statsData.completionRate, suffix: '%', label: 'Completion Rate', sub: 'students finish the course', fieldKey: 'completionRate' as keyof StatsData },
    { value: statsData.avgROI, suffix: 'x', label: 'Avg ROI Improvement', sub: 'after 3 months of practice', fieldKey: 'avgROI' as keyof StatsData },
    { value: parseFloat(statsData.averageRating), suffix: '★', label: 'Average Rating', sub: 'across all cohorts', fieldKey: 'averageRating' as keyof StatsData },
  ]

  return (
    <>
      <section ref={ref} className="bg-black px-6 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div className="grid grid-cols-2 gap-4">
              {statCards.map(s => (
                <StatCard
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  sub={s.sub}
                  inView={inView}
                  isAdmin={isAdminMode}
                  onEdit={() => setEditingField({ label: s.label, fieldKey: s.fieldKey, value: statsData[s.fieldKey] })}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl border border-white/8 bg-[#0d0d0d] p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">NIFTY 50 // ORDERFLOW</div>
                  <div className="mt-1 text-2xl font-bold text-white">24,892 <span className="text-emerald-400 text-sm font-semibold">+1.24%</span></div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Live</span>
                </div>
              </div>
              <CandleChart />
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/6">
                {[
                  { label: 'Delta', value: '+18,420', color: 'text-emerald-400' },
                  { label: 'POC', value: '24,850', color: 'text-violet-400' },
                  { label: 'OI Change', value: '+12.4%', color: 'text-emerald-400' },
                ].map(item => (
                  <div key={item.label} className="text-center">
                    <div className={`text-sm font-bold font-mono ${item.color}`}>{item.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-600 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {editingField && (
        <StatEditModal
          label={editingField.label}
          fieldKey={editingField.fieldKey}
          value={editingField.value}
          onSave={handleSave}
          onClose={() => setEditingField(null)}
        />
      )}
    </>
  )
}
