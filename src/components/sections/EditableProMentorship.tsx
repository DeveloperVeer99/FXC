import { useEffect, useState } from 'react'
import { Check, ArrowUpRight, BarChart2, Zap, Target, Edit2, Save } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import api from '../../services/api'

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

interface MentorshipData {
  title: string;
  price: string;
  description: string;
}

const defaultMentorshipData: MentorshipData = {
  title: 'Pro Mentorship',
  price: '₹14,999',
  description: 'For serious traders aiming for consistency through mathematical execution and auction theory.',
}

const perks = [
  'Everything in Base Course',
  '8 intensive 1-on-1 mentoring sessions',
  '3 Months Live Trading Floor Access',
  'Personal mentorship focused on clearing prop firm challenges',
  'Access to all future add-ons & updates (lifetime value)',
]

const features = [
  {
    icon: BarChart2,
    title: 'Auction Market Theory',
    desc: 'Use Volume Profiles to find Value Areas (VAH, VAL, POC) and identify structural balance versus directional breakouts.',
  },
  {
    icon: Zap,
    title: 'Orderflow Dynamics',
    desc: 'Read footprint charts, delta, and cumulative volume imbalances. Spot aggressive buyers or sellers trapped at extreme prices.',
  },
  {
    icon: Target,
    title: 'Optionflow & Liquidity',
    desc: 'Track resting institutional limit orders and options gamma positioning. Understand where larger players defend real interests.',
  },
]

export default function EditableProMentorship() {
  const [mentorshipData, setMentorshipData] = useState<MentorshipData>(defaultMentorshipData)

  const [editingField, setEditingField] = useState<{ label: string; field: keyof MentorshipData; value: string; multiline?: boolean } | null>(null)
  const { isAdminMode, dataSaved, sectionSaved, triggerDataRefresh } = useAdmin()

  useEffect(() => {
    api.get('/mentorship').then(r => setMentorshipData(r.data)).catch(() => setMentorshipData(defaultMentorshipData))
  }, [dataSaved, sectionSaved['mentorship']])

  const handleSave = async (value: string) => {
    if (!editingField) return
    const updated = { ...mentorshipData, [editingField.field]: value }
    try { await api.put('/mentorship', updated); setMentorshipData(updated); triggerDataRefresh('mentorship') } catch (e) { console.error(e) }
    setEditingField(null)
  }

  const EditBtn = ({ field, value, label, multiline }: { field: keyof MentorshipData; value: string; label: string; multiline?: boolean }) => {
    if (!isAdminMode) return null
    return <button type="button" onClick={() => setEditingField({ label, field, value, multiline })} className="inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold rounded opacity-0 group-hover:opacity-100 transition-all align-middle"><Edit2 size={10} /></button>
  }

  return (
    <>
      <section className="bg-black px-6 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">Pro Mentorship</span>
            </div>
            <h2 className="group text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {mentorshipData.title}<EditBtn field="title" value={mentorshipData.title} label="Title" />
              <span className="group block mt-1 text-zinc-500">— {mentorshipData.price}<EditBtn field="price" value={mentorshipData.price} label="Price" /></span>
            </h2>
            <p className="group mx-auto mt-4 max-w-xl text-base text-zinc-400 leading-7">
              {mentorshipData.description}<EditBtn field="description" value={mentorshipData.description} label="Description" multiline />
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-12">

            {/* Left */}
            <div className="lg:col-span-7 rounded-xl border border-white/8 bg-[#0d0d0d] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-8 pb-6 border-b border-white/8">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">FXC // ORDERFLOW & OPTIONFLOW</span>
                  <span className="ml-auto rounded border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-violet-400">
                    ENCRYPTED
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">Pro Mentorship Program</h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  Everything in Base Course, 8 intensive 1-on-1 mentoring sessions and 3 Months Live Trading Floor Access. Learn how institutions actually interact with liquidity.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Total Access</div>
                  <div className="text-3xl font-bold text-white mt-1">{mentorshipData.price}</div>
                </div>
                <button
                  type="button"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                >
                  Enroll Now <ArrowUpRight size={16} />
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-5 rounded-xl border border-white/8 bg-[#0d0d0d] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">What You Will Get</h4>
                <ul className="space-y-4">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
                        <Check className="h-3 w-3 text-violet-400" strokeWidth={2.5} />
                      </span>
                      <span className="text-sm text-zinc-300 leading-normal">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-8 pt-6 border-t border-white/8 text-[11px] font-mono uppercase tracking-widest text-zinc-600">
                Session schedules managed on booking calendar.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-white/8 bg-[#0d0d0d] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                  <Icon className="h-5 w-5 text-violet-400" />
                </div>
                <h5 className="text-sm font-semibold text-white">{title}</h5>
                <p className="mt-2 text-xs leading-5 text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
      {editingField && <FieldModal label={editingField.label} value={editingField.value} multiline={editingField.multiline} onSave={handleSave} onClose={() => setEditingField(null)} />}
    </>
  )
}
