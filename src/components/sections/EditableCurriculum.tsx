import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { EditableWrapper } from '../EditableWrapper'

interface CurriculumData {
  // This is handled at the section level
  note?: string;
}

const modules = [
  {
    number: '01',
    title: 'Auction Market Theory — How Price Really Moves',
    duration: '7 lessons',
    topics: [
      'The auction process: why markets move up and down to find accepted value',
      'Value Area (VA), Point of Control (POC) — where institutions have done the most business',
      'Single prints, poor highs/lows, and what they mean for future price revisits',
      'Balance vs. imbalance days — how to identify when the market is in range vs. trending',
      'Initial Balance (IB) and the 3 types of range extension',
      'Profile shapes: P-profile, b-profile, D-profile and what each signals',
      'Composite profiles — reading multi-day and multi-week structure for higher timeframe bias',
    ],
  },
  {
    number: '02',
    title: 'Volume Profile — Reading Where the Money Is',
    duration: '6 lessons',
    topics: [
      'Fixed Range vs. Session vs. Visible Range profiles — when to use each',
      'High Volume Nodes (HVN) as support/resistance — price slows here, not bounces',
      'Low Volume Nodes (LVN) as fast-move zones — price accelerates through these',
      'Volume gaps: identifying areas with no prior business that price will revisit',
      'Developing vs. developed profiles — how to read an unfinished auction',
      'Aligning volume profile levels with orderflow for high-probability entries',
    ],
  },
  {
    number: '03',
    title: 'Orderflow — Reading the Tape in Real Time',
    duration: '9 lessons',
    topics: [
      'Market orders vs. limit orders — who is aggressive and who is passive',
      'Bid/ask footprint: reading actual buying and selling at every price level',
      'Delta: the difference between buying and selling pressure at each candle',
      'Cumulative Delta (CVD) divergence — price makes new high but CVD doesn\'t (hidden weakness)',
      'Volume imbalances in the footprint: 3x rule for identifying absorption',
      'Stacked imbalances — multiple consecutive imbalances signaling directional intent',
      'Absorption: large limit orders absorbing aggressive flow — the real reversal signal',
      'Iceberg orders: detecting hidden institutional size at key levels',
      'Building a live orderflow read: combining delta, footprint, and CVD into one decision',
    ],
  },
  {
    number: '04',
    title: 'Optionflow & Gamma — The Invisible Hand',
    duration: '7 lessons',
    topics: [
      'How market makers delta-hedge options — why this creates predictable spot price movement',
      'Gamma exposure (GEX): positive gamma zones where MM buying dips/selling rips (range)',
      'Negative gamma zones: MM amplifies moves — trending, volatile conditions',
      'Key gamma strike levels: the price levels where the most options OI sits',
      'Put/Call ratio and what extreme readings signal about institutional positioning',
      'Unusual options activity (UOA): identifying large directional bets before they move spot',
      'Combining GEX levels with volume profile POC for high-confluence trade setups',
    ],
  },
  {
    number: '05',
    title: 'Trade Execution — Entry, Stop & Target Logic',
    duration: '6 lessons',
    topics: [
      'The 3-step confirmation model: structure + orderflow + trigger',
      'Entry at value: fading into HVN/POC with orderflow confirmation, not blindly',
      'Entry on breakout: waiting for retest of LVN with delta confirmation before entering',
      'Stop placement: always behind a structural level (VAH/VAL/POC), never arbitrary pips',
      'Target logic: first target at opposing HVN, second at profile edge, third at prior session extreme',
      'Scaling out vs. full exit — when to hold and when orderflow tells you to get out',
    ],
  },
  {
    number: '06',
    title: 'Risk, Prop Firms & Consistent Execution',
    duration: '5 lessons',
    topics: [
      'Position sizing for prop firm challenges: max daily loss math and how to stay within rules',
      'The consistency rule: why one big win followed by losses fails prop firm evaluations',
      'Pre-market preparation: building your levels, bias, and scenarios before the open',
      'Trade journaling with orderflow context — what to log beyond just entry/exit',
      'Post-session review: identifying if you followed process or traded on emotion',
    ],
  },
]

export default function EditableCurriculum() {
  const [open, setOpen] = useState<number | null>(0)
  const [curriculumData, setCurriculumData] = useState<CurriculumData>({})

  const totalLessons = modules.reduce((a, m) => a + parseInt(m.duration), 0)
  const { setEditingItem } = useAdmin()

  useEffect(() => {
    const saved = sessionStorage.getItem('curriculumData')
    if (saved) {
      setCurriculumData(JSON.parse(saved))
    }
  }, [])

  const handleEdit = (data: CurriculumData) => {
    setEditingItem({
      type: 'curriculum',
      data,
    })
  }

  return (
    <EditableWrapper
      type="curriculum"
      data={curriculumData}
      onEdit={handleEdit}
    >
      <section className="bg-black px-4 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">What You Learn</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Course Curriculum</h2>
            <p className="mt-4 text-base text-zinc-400">
              {modules.length} modules &middot; {totalLessons} lessons
            </p>
          </motion.div>

          <div className="space-y-2">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`rounded-xl border transition-colors duration-200 ${
                  open === i
                    ? 'border-violet-500/30 bg-[#0d0d0d]'
                    : 'border-white/6 bg-[#0a0a0a] hover:border-white/12'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-5 sm:px-6 text-left"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-violet-500 shrink-0 pt-0.5 sm:pt-0">
                      {mod.number}
                    </span>
                    <span className="text-sm font-semibold text-white leading-snug">{mod.title}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
                    <span className="hidden sm:block text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                      {mod.duration}
                    </span>
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full border shrink-0 transition-colors ${
                      open === i
                        ? 'border-violet-500/40 bg-violet-500/10 text-violet-400'
                        : 'border-white/10 text-zinc-500'
                    }`}>
                      {open === i ? <Minus size={12} /> : <Plus size={12} />}
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <ul className="px-4 sm:px-6 pb-6 space-y-2.5 border-t border-white/6 pt-4">
                        {mod.topics.map((topic) => (
                          <li key={topic} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-500" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </EditableWrapper>
  )
}
