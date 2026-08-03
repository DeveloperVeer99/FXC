import { useEffect, useState } from 'react'
import { Check, MessageSquare, ArrowUpRight, Edit2, Save, Plus, Trash2, X } from 'lucide-react'
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

interface CommunityData {
  title: string
  description: string
  discordLink: string
  perks: string[]
}

const defaultData: CommunityData = {
  title: 'Join the FXC Trading Community',
  description: 'A private, well-moderated trading community for serious traders.',
  discordLink: 'https://discord.gg/vrHwGxE3VA',
  perks: [
    'Weekly live discussions and Q&A',
    'Beginner-friendly environment',
    'Direct access to experienced traders',
    'Network with serious traders',
    'No signals, no spam, no hype',
  ],
}

type EditingField = { label: string; field: keyof Omit<CommunityData, 'perks'>; value: string; multiline?: boolean }

export default function EditableTradingCommunity() {
  const [data, setData] = useState<CommunityData>(defaultData)
  const [editingField, setEditingField] = useState<EditingField | null>(null)
  const [editingPerkIdx, setEditingPerkIdx] = useState<number | null>(null)
  const { isAdminMode, sectionSaved, triggerDataRefresh } = useAdmin()

  useEffect(() => {
    api.get('/community').then(r => {
      const d = r.data
      setData({
        title: d.title || defaultData.title,
        description: d.description || defaultData.description,
        discordLink: d.discordLink || defaultData.discordLink,
        perks: d.perks?.length ? d.perks : defaultData.perks,
      })
    }).catch(() => setData(defaultData))
  }, [sectionSaved['community']])

  const persist = async (updated: CommunityData) => {
    try { await api.put('/community', updated); setData(updated); triggerDataRefresh('community') }
    catch (e) { console.error(e) }
  }

  const handleFieldSave = async (value: string) => {
    if (!editingField) return
    await persist({ ...data, [editingField.field]: value })
    setEditingField(null)
  }

  const handlePerkSave = async (value: string) => {
    if (editingPerkIdx === null) return
    const perks = [...data.perks]
    if (editingPerkIdx === perks.length) perks.push(value)
    else perks[editingPerkIdx] = value
    await persist({ ...data, perks })
    setEditingPerkIdx(null)
  }

  const deletePerk = async (idx: number) => {
    await persist({ ...data, perks: data.perks.filter((_, i) => i !== idx) })
  }

  const EditBtn = ({ onClick }: { onClick: () => void }) => {
    if (!isAdminMode) return null
    return (
      <button type="button" onClick={onClick}
        className="inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold rounded opacity-0 group-hover:opacity-100 transition-all align-middle">
        <Edit2 size={10} />
      </button>
    )
  }

  return (
    <>
      <section id="community" className="scroll-mt-20 bg-black px-6 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="mx-auto max-w-2xl text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">Community</span>
            </div>
            <h2 className="group text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {data.title}
              <EditBtn onClick={() => setEditingField({ label: 'Title', field: 'title', value: data.title })} />
            </h2>
            <p className="group mt-4 text-base text-zinc-400">
              {data.description}
              <EditBtn onClick={() => setEditingField({ label: 'Description', field: 'description', value: data.description, multiline: true })} />
            </p>
          </div>

          {/* Full-width card */}
          <div className="rounded-xl border border-white/8 bg-[#0d0d0d] p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

              {/* Left — info */}
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded border border-violet-500/20 bg-violet-500/5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-violet-400">
                  First Month Free
                </div>
                <div className="flex items-start gap-4 mb-8">
                  <div className="h-10 w-10 shrink-0 rounded-lg border border-white/8 bg-white/5 flex items-center justify-center text-violet-400">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Live Trading Discord</h3>
                    <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                      Exclusive Discord where traders learn together and stay disciplined.
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {data.perks.map((perk, idx) => (
                    <li key={idx} className="group/perk flex items-start gap-3">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
                        <Check className="h-2.5 w-2.5 text-violet-400" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-zinc-300 flex-1">{perk}</span>
                      {isAdminMode && (
                        <span className="flex gap-1 opacity-0 group-hover/perk:opacity-100 transition-all shrink-0">
                          <button type="button" onClick={() => setEditingPerkIdx(idx)} className="p-0.5 bg-violet-600 hover:bg-violet-500 rounded text-white"><Edit2 size={10} /></button>
                          <button type="button" onClick={() => deletePerk(idx)} className="p-0.5 bg-red-600 hover:bg-red-500 rounded text-white"><Trash2 size={10} /></button>
                        </span>
                      )}
                    </li>
                  ))}
                  {isAdminMode && (
                    <li>
                      <button type="button" onClick={() => setEditingPerkIdx(data.perks.length)}
                        className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition mt-1">
                        <Plus size={12} /> Add perk
                      </button>
                    </li>
                  )}
                </ul>
              </div>

              {/* Right — CTA */}
              <div className="flex flex-col items-start lg:items-center gap-6">
                <div className="w-full rounded-xl border border-violet-500/20 bg-violet-500/5 p-8 flex flex-col items-center text-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
                    <MessageSquare size={24} className="text-violet-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">Join the Community</div>
                    <div className="mt-1 text-sm text-zinc-400">Connect with serious traders. No noise, no signals.</div>
                  </div>
                  <a
                    href={data.discordLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-8 py-3 text-sm font-bold text-white hover:bg-violet-500 transition shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                  >
                    Join on Discord <ArrowUpRight size={16} />
                  </a>
                  {isAdminMode && (
                    <button type="button"
                      onClick={() => setEditingField({ label: 'Discord Link', field: 'discordLink', value: data.discordLink })}
                      className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition">
                      <Edit2 size={11} /> Edit Discord Link
                    </button>
                  )}
                </div>

                <div className="w-full grid grid-cols-2 gap-3">
                  {[
                    { v: 'Free', l: 'First Month' },
                    { v: '0', l: 'Signals / Spam' },
                  ].map(item => (
                    <div key={item.v} className="rounded-lg border border-white/8 bg-black p-4 text-center">
                      <div className="text-xl font-bold text-white">{item.v}</div>
                      <div className="mt-1 text-[9px] font-mono uppercase tracking-widest text-zinc-500">{item.l}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {editingField && (
        <FieldModal label={editingField.label} value={editingField.value} multiline={editingField.multiline} onSave={handleFieldSave} onClose={() => setEditingField(null)} />
      )}
      {editingPerkIdx !== null && (
        <FieldModal
          label={editingPerkIdx === data.perks.length ? 'New Perk' : `Perk ${editingPerkIdx + 1}`}
          value={editingPerkIdx === data.perks.length ? '' : data.perks[editingPerkIdx]}
          onSave={handlePerkSave}
          onClose={() => setEditingPerkIdx(null)}
        />
      )}
    </>
  )
}
