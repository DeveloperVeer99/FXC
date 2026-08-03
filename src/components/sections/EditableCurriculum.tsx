import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Edit2, Trash2, Save } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { curriculumAPI } from '../../services/api'

interface CurriculumModule {
  number: string;
  title: string;
  duration: string;
  topics: string[];
}

interface CurriculumData {
  modules: CurriculumModule[];
}

// Modal for editing a single module
function ModuleEditModal({ mod, onSave, onClose }: {
  mod: CurriculumModule;
  onSave: (updated: CurriculumModule) => void;
  onClose: () => void;
}) {
  const [data, setData] = useState({ ...mod })
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h3 className="text-white font-bold mb-4">Edit Module {data.number}</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Title</label>
            <input value={data.title} onChange={e => setData({ ...data, title: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500" />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Duration</label>
            <input value={data.duration} onChange={e => setData({ ...data, duration: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500" />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Topics (one per line)</label>
            <textarea
              value={data.topics.join('\n')}
              onChange={e => setData({ ...data, topics: e.target.value.split('\n').filter(t => t.trim()) })}
              rows={8}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-xs font-mono focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={() => onSave(data)} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded transition flex items-center justify-center gap-1">
            <Save size={14} /> Save
          </button>
          <button onClick={onClose} className="flex-1 border border-zinc-600 hover:bg-zinc-800 text-white text-sm font-semibold py-2 rounded transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}

// Modal for editing a single topic
function TopicEditModal({ topic, onSave, onClose }: { topic: string; onSave: (v: string) => void; onClose: () => void }) {
  const [val, setVal] = useState(topic)
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-white font-bold mb-4 text-sm">Edit Topic</h3>
        <textarea value={val} onChange={e => setVal(e.target.value)} rows={3}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500" autoFocus />
        <div className="flex gap-2 mt-4">
          <button onClick={() => onSave(val)} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded transition">Save</button>
          <button onClick={onClose} className="flex-1 border border-zinc-600 hover:bg-zinc-800 text-white text-sm font-semibold py-2 rounded transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function EditableCurriculum() {
  const [open, setOpen] = useState<number | null>(0)
  const [curriculumData, setCurriculumData] = useState<CurriculumData>({ modules: [] })
  const [loading, setLoading] = useState(true)
  const [editingModule, setEditingModule] = useState<{ index: number; mod: CurriculumModule } | null>(null)
  const [editingTopic, setEditingTopic] = useState<{ modIndex: number; topicIndex: number; value: string } | null>(null)
  const { isAdminMode, dataSaved, sectionSaved, triggerDataRefresh } = useAdmin()

  useEffect(() => {
    curriculumAPI.get().then(r => setCurriculumData(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [dataSaved, sectionSaved['curriculum']])

  const saveModules = async (modules: CurriculumModule[]) => {
    await curriculumAPI.update({ modules })
    setCurriculumData({ ...curriculumData, modules })
    triggerDataRefresh('curriculum')
  }

  const handleSaveModule = async (updated: CurriculumModule) => {
    if (!editingModule) return
    const modules = [...curriculumData.modules]
    modules[editingModule.index] = updated
    await saveModules(modules)
    setEditingModule(null)
  }

  const handleDeleteModule = async (index: number) => {
    if (!confirm('Delete this module?')) return
    const modules = curriculumData.modules.filter((_, i) => i !== index)
    await saveModules(modules)
  }

  const handleAddModule = async () => {
    const modules = [...curriculumData.modules, {
      number: String(curriculumData.modules.length + 1).padStart(2, '0'),
      title: 'New Module',
      duration: '1 lesson',
      topics: ['New topic'],
    }]
    await saveModules(modules)
  }

  const handleSaveTopic = async (value: string) => {
    if (!editingTopic) return
    const modules = curriculumData.modules.map((m, mi) => {
      if (mi !== editingTopic.modIndex) return m
      const topics = [...m.topics]
      topics[editingTopic.topicIndex] = value
      return { ...m, topics }
    })
    await saveModules(modules)
    setEditingTopic(null)
  }

  const handleDeleteTopic = async (modIndex: number, topicIndex: number) => {
    if (!confirm('Delete this topic?')) return
    const modules = curriculumData.modules.map((m, mi) => {
      if (mi !== modIndex) return m
      return { ...m, topics: m.topics.filter((_, ti) => ti !== topicIndex) }
    })
    await saveModules(modules)
  }

  const handleAddTopic = async (modIndex: number) => {
    const modules = curriculumData.modules.map((m, mi) => {
      if (mi !== modIndex) return m
      return { ...m, topics: [...m.topics, 'New topic'] }
    })
    await saveModules(modules)
  }

  const modules = curriculumData.modules || []
  const totalLessons = modules.reduce((a, m) => { const n = parseInt(m.duration); return a + (isNaN(n) ? 0 : n) }, 0)

  if (loading) return (
    <section className="bg-black px-4 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl text-center text-zinc-400">Loading curriculum...</div>
    </section>
  )

  return (
    <>
      <section className="bg-black px-4 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">What You Learn</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Course Curriculum</h2>
            <p className="mt-4 text-base text-zinc-400">{modules.length} modules &middot; {totalLessons} lessons</p>
          </motion.div>

          <div className="space-y-2">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`rounded-xl border transition-colors duration-200 group/module ${open === i ? 'border-violet-500/30 bg-[#0d0d0d]' : 'border-white/6 bg-[#0a0a0a] hover:border-white/12'}`}
              >
                <div className="flex items-center justify-between gap-3 px-4 py-5 sm:px-6">
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1 text-left"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-violet-500 shrink-0 pt-0.5 sm:pt-0">{mod.number}</span>
                    <span className="text-sm font-semibold text-white leading-snug">{mod.title}</span>
                  </button>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:block text-[10px] font-mono uppercase tracking-widest text-zinc-600">{mod.duration}</span>
                    {isAdminMode && (
                      <>
                        <button
                          type="button"
                          onClick={() => setEditingModule({ index: i, mod })}
                          className="p-1.5 bg-violet-600/80 hover:bg-violet-600 text-white rounded opacity-0 group-hover/module:opacity-100 transition-all"
                          title="Edit module"
                        >
                          <Edit2 size={11} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteModule(i)}
                          className="p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded opacity-0 group-hover/module:opacity-100 transition-all"
                          title="Delete module"
                        >
                          <Trash2 size={11} />
                        </button>
                      </>
                    )}
                    <div
                      onClick={() => setOpen(open === i ? null : i)}
                      className={`flex h-6 w-6 items-center justify-center rounded-full border shrink-0 cursor-pointer transition-colors ${open === i ? 'border-violet-500/40 bg-violet-500/10 text-violet-400' : 'border-white/10 text-zinc-500'}`}
                    >
                      {open === i ? <Minus size={12} /> : <Plus size={12} />}
                    </div>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <ul className="px-4 sm:px-6 pb-6 space-y-2 border-t border-white/6 pt-4">
                        {(mod.topics || []).map((topic, ti) => (
                          <li key={ti} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed group/topic">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-500" />
                            <span className="flex-1">{topic}</span>
                            {isAdminMode && (
                              <div className="flex gap-1 opacity-0 group-hover/topic:opacity-100 transition-all shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setEditingTopic({ modIndex: i, topicIndex: ti, value: topic })}
                                  className="p-1 bg-violet-600/80 hover:bg-violet-600 text-white rounded"
                                  title="Edit topic"
                                >
                                  <Edit2 size={10} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteTopic(i, ti)}
                                  className="p-1 bg-red-600/80 hover:bg-red-600 text-white rounded"
                                  title="Delete topic"
                                >
                                  <Trash2 size={10} />
                                </button>
                              </div>
                            )}
                          </li>
                        ))}
                        {isAdminMode && (
                          <li>
                            <button
                              type="button"
                              onClick={() => handleAddTopic(i)}
                              className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition mt-1"
                            >
                              <Plus size={12} /> Add topic
                            </button>
                          </li>
                        )}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {isAdminMode && (
            <button
              type="button"
              onClick={handleAddModule}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition"
            >
              <Plus size={14} /> Add Module
            </button>
          )}
        </div>
      </section>

      {editingModule && (
        <ModuleEditModal mod={editingModule.mod} onSave={handleSaveModule} onClose={() => setEditingModule(null)} />
      )}
      {editingTopic && (
        <TopicEditModal topic={editingTopic.value} onSave={handleSaveTopic} onClose={() => setEditingTopic(null)} />
      )}
    </>
  )
}
