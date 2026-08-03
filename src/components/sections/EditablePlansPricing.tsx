import { useRef, useState, useEffect, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight, Plus, Trash2, Edit2, Save, X } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { coursesAPI, paymentAPI } from '../../services/api'

interface Course {
  _id: string
  title: string
  label?: string
  price: number
  description: string
  cta: string
  highlights?: string[]
  accent?: boolean
  isActive: boolean
}

function CourseEditModal({ course, onSave, onClose }: { course: Partial<Course>; onSave: (d: Partial<Course>) => Promise<void>; onClose: () => void }) {
  const [data, setData] = useState({ ...course })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const inp = 'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500'

  const handleSave = async () => {
    if (!data.title?.trim()) { setError('Title is required'); return }
    if (!data.description?.trim()) { setError('Description is required'); return }
    setSaving(true)
    setError('')
    try {
      await onSave(data)
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || 'Failed to save. Check you are logged in as admin.')
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h3 className="text-white font-bold mb-4">{data._id ? 'Edit Course' : 'Add Course'}</h3>
        <div className="space-y-3">
          <div><label className="text-xs text-zinc-400 mb-1 block">Title</label>
            <input value={data.title || ''} onChange={e => setData({ ...data, title: e.target.value })} className={inp} /></div>
          <div><label className="text-xs text-zinc-400 mb-1 block">Description</label>
            <textarea value={data.description || ''} onChange={e => setData({ ...data, description: e.target.value })} rows={2} className={inp} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-zinc-400 mb-1 block">Price (₹)</label>
              <input type="number" value={data.price ?? 0} onChange={e => setData({ ...data, price: parseFloat(e.target.value) || 0 })} className={inp} /></div>
            <div><label className="text-xs text-zinc-400 mb-1 block">Label</label>
              <input value={data.label || ''} onChange={e => setData({ ...data, label: e.target.value })} className={inp} placeholder="e.g. Popular" /></div>
          </div>
          <div><label className="text-xs text-zinc-400 mb-1 block">CTA Button</label>
            <input value={data.cta || ''} onChange={e => setData({ ...data, cta: e.target.value })} className={inp} /></div>
          <div><label className="text-xs text-zinc-400 mb-1 block">Highlights (one per line)</label>
            <textarea value={(data.highlights || []).join('\n')} onChange={e => setData({ ...data, highlights: e.target.value.split('\n').filter(h => h.trim()) })} rows={4} className={`${inp} font-mono text-xs`} /></div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="accent" checked={data.accent || false} onChange={e => setData({ ...data, accent: e.target.checked })} className="w-4 h-4" />
            <label htmlFor="accent" className="text-sm text-zinc-400 cursor-pointer">Featured Course</label>
          </div>
        </div>
        {error && <div className="mt-3 px-3 py-2 bg-red-500/15 border border-red-500/30 rounded text-red-400 text-xs">{error}</div>}
        <div className="flex gap-2 mt-4">
          <button onClick={handleSave} disabled={saving} className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 text-white text-sm font-semibold py-2 rounded transition flex items-center justify-center gap-1">
            {saving ? <><span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Saving...</> : <><Save size={14} /> Save</>}
          </button>
          <button onClick={onClose} className="flex-1 border border-zinc-600 hover:bg-zinc-800 text-white text-sm font-semibold py-2 rounded transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}

const TERMS = [
  { title: '1. Definitions', body: "'FXC', 'Services', 'Platform', 'Courses', 'Mentorship', 'Trading Floor', 'PRIMO', 'User', and 'Content' refer to the products and services operated by FXC." },
  { title: '2. Acceptance', body: 'By purchasing or using any FXC service you agree to these Terms. If you disagree, do not use the Services.' },
  { title: '3. Eligibility', body: 'Users must be at least 18 years old or have guardian consent.' },
  { title: '4. Educational Services', body: 'FXC provides educational content only. Nothing is investment advice, research advice, portfolio management, or a recommendation to buy or sell any security, derivative, forex pair or commodity.' },
  { title: '5. Risk Disclosure', body: 'Trading involves substantial risk, including total loss of capital. Past performance does not guarantee future results.' },
  { title: '6. Accounts', body: 'Accounts are personal, non-transferable and may not be shared.' },
  { title: '7. Intellectual Property', body: 'All videos, PDFs, live sessions, GEX levels, Discord posts, graphics, logos and educational material are protected by copyright and other IP laws. Recording, redistribution, resale or commercial use without written permission is prohibited.' },
  { title: '8. Lifetime Access', body: 'Lifetime access means for the commercial lifetime of the specific product on the FXC platform and is subject to maintenance, updates and discontinuation.' },
  { title: '9. Subscriptions', body: 'Subscription plans renew until cancelled. Cancellation prevents future renewals only.' },
  { title: '10. Conduct', body: 'No abuse, harassment, spam, piracy, cheating, impersonation or unlawful conduct.' },
  { title: '11. Suspension', body: 'FXC may suspend access for piracy, chargeback abuse, account sharing or serious misconduct.' },
  { title: '12. Third Parties', body: 'FXC is not responsible for brokers, exchanges, Discord, Shopify, payment gateways or data providers.' },
  { title: '13. Limitation of Liability', body: 'To the maximum extent permitted by law, FXC is not liable for trading losses, lost profits, indirect or consequential damages, downtime or third-party failures.' },
  { title: '14. Indemnity', body: 'Users agree to indemnify FXC against claims arising from misuse of the Services or breach of these Terms.' },
  { title: '15. Force Majeure', body: 'FXC is not liable for delays caused by events beyond reasonable control.' },
  { title: '16. Governing Law', body: 'Governed by the laws of India. Subject to mandatory consumer rights, disputes shall be subject to courts in Delhi.' },
]

function BuyModal({ course, onClose }: { course: Course; onClose: () => void }) {
  const [step, setStep] = useState<'terms' | 'details' | 'success'>('terms')
  const [accepted, setAccepted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inp = 'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500'

  const handlePay = async () => {
    if (!form.name.trim()) { setError('Name is required'); return }
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) { setError('Valid email is required'); return }
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone)) { setError('Valid 10-digit mobile number is required'); return }
    setError('')
    setLoading(true)
    try {
      const { data } = await paymentAPI.createOrder({ amount: course.price, courseId: course._id, courseName: course.title })
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'FourXClub',
        description: course.title,
        order_id: data.orderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#7c3aed' },
        handler: async (response: any) => {
          try {
            await paymentAPI.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              name: form.name,
              email: form.email,
              phone: form.phone,
              courseName: course.title,
            })
            setStep('success')
          } catch {
            setError('Payment received but verification failed. Please contact support.')
          }
          setLoading(false)
        },
        modal: { ondismiss: () => setLoading(false) },
      }
      const rzp = new (window as any).Razorpay(options)
      rzp.on('payment.failed', () => { setError('Payment failed. Please try again.'); setLoading(false) })
      rzp.open()
    } catch {
      setError('Could not initiate payment. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-end sm:items-center justify-center sm:p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-t-2xl sm:rounded-xl w-full sm:max-w-md max-h-[92vh] flex flex-col" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8 shrink-0">
          <div>
            <h3 className="text-white font-bold text-lg">{course.title}</h3>
            <p className="text-violet-400 font-semibold text-sm mt-0.5">₹{course.price} — one-time payment</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition"><X size={18} /></button>
        </div>

        {/* Step indicators */}
        {step !== 'success' && (
          <div className="flex items-center gap-2 px-6 py-3 shrink-0">
            {(['terms', 'details'] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s ? 'bg-violet-600 text-white' : step === 'details' && s === 'terms' ? 'bg-violet-600/40 text-violet-300' : 'bg-zinc-800 text-zinc-500'
                }`}>{i + 1}</div>
                <span className={`text-xs font-medium ${ step === s ? 'text-white' : 'text-zinc-500'}`}>
                  {s === 'terms' ? 'Terms' : 'Details'}
                </span>
                {i === 0 && <div className="w-6 h-px bg-zinc-700 mx-1" />}
              </div>
            ))}
          </div>
        )}

        {/* Step 1 — Terms */}
        {step === 'terms' && (
          <>
            <div className="overflow-y-auto px-6 py-2 flex-1 space-y-4">
              {TERMS.map(t => (
                <div key={t.title} className="border-l-2 border-violet-500/30 pl-3">
                  <p className="text-xs font-semibold text-white mb-1">{t.title}</p>
                  <p className="text-xs text-zinc-400 leading-5">{t.body}</p>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-white/8 shrink-0 space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="mt-0.5 w-4 h-4 accent-violet-600 shrink-0" />
                <span className="text-xs text-zinc-400 leading-5">I have read and agree to the Terms & Conditions</span>
              </label>
              <button onClick={() => accepted && setStep('details')} disabled={!accepted}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition">
                Continue
              </button>
            </div>
          </>
        )}

        {/* Step 2 — Details */}
        {step === 'details' && (
          <div className="px-6 py-5 space-y-3 flex-1">
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Full Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inp} placeholder="Your full name" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inp} placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Mobile Number</label>
              <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inp} placeholder="10-digit mobile number" maxLength={10} />
            </div>
            {error && <p className="text-red-400 text-xs px-1">{error}</p>}
            <button onClick={handlePay} disabled={loading} className="w-full mt-1 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 text-white text-sm font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2">
              {loading ? <><span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Processing...</> : <>Pay ₹{course.price} <ArrowUpRight size={15} /></>}
            </button>
            <p className="text-xs text-zinc-500 text-center">Secured by Razorpay</p>
          </div>
        )}

        {/* Step 3 — Success */}
        {step === 'success' && (
          <div className="text-center px-6 py-10">
            <div className="w-14 h-14 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center mx-auto mb-4">
              <Check className="text-violet-400" size={28} strokeWidth={2.5} />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">Payment Successful!</h4>
            <p className="text-zinc-400 text-sm mb-6">Check your email <span className="text-white font-medium">{form.email}</span> for next steps to get your course access.</p>
            <button onClick={onClose} className="w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2.5 rounded-lg transition">Done</button>
          </div>
        )}

      </div>
    </div>
  )
}

function HighlightEditModal({ value, onSave, onClose }: { value: string; onSave: (v: string) => void; onClose: () => void }) {
  const [val, setVal] = useState(value)
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-lg p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <h3 className="text-white font-bold mb-4 text-sm">Edit Highlight</h3>
        <input value={val} onChange={e => setVal(e.target.value)} autoFocus className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500" />
        <div className="flex gap-2 mt-4">
          <button onClick={() => onSave(val)} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded transition">Save</button>
          <button onClick={onClose} className="flex-1 border border-zinc-600 hover:bg-zinc-800 text-white text-sm font-semibold py-2 rounded transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}

function SpotlightCard({ course, isAdminMode, onEdit, onDelete, onEditHighlight, onDeleteHighlight, onAddHighlight, onBuy }: {
  course: Course; isAdminMode: boolean
  onEdit: () => void; onDelete: () => void
  onEditHighlight: (idx: number, val: string) => void
  onDeleteHighlight: (idx: number) => void
  onAddHighlight: () => void
  onBuy: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }
  return (
    <motion.div ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      className={`relative rounded-xl border p-8 overflow-hidden group/card ${course.accent ? 'border-violet-500/40 bg-[#0d0d0d]' : 'border-white/[0.08] bg-[#0d0d0d]'}`}
    >
      {course.accent && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />}
      {isAdminMode && (
        <div className="absolute top-3 right-3 flex gap-1.5 z-20 opacity-0 group-hover/card:opacity-100 transition-all">
          <button onClick={onEdit} className="flex items-center gap-1 px-2 py-1 bg-violet-600/90 hover:bg-violet-600 text-white text-xs font-semibold rounded"><Edit2 size={11} /> Edit</button>
          <button onClick={onDelete} className="flex items-center gap-1 px-2 py-1 bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold rounded"><Trash2 size={11} /> Delete</button>
        </div>
      )}
      {hovered && <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(124,58,237,0.12), transparent 70%)` }} />}
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-white">{course.title}</p>
            <p className="mt-2 text-sm text-zinc-400">{course.description}</p>
          </div>
          {course.label && <span className="flex-shrink-0 rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">{course.label}</span>}
        </div>
        <div className="mt-8">
          <div className="text-4xl font-bold text-white">₹{course.price}</div>
          <p className="mt-1 text-xs text-zinc-500 uppercase tracking-widest">one-time payment</p>
        </div>
        {course.highlights && course.highlights.length > 0 && (
          <ul className="mt-8 space-y-3">
            {course.highlights.map((h, hi) => (
              <li key={hi} className="flex items-start gap-3 text-sm text-zinc-300 group/hl">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
                  <Check className="h-3 w-3 text-violet-400" strokeWidth={2.5} />
                </span>
                <span className="flex-1">{h}</span>
                {isAdminMode && (
                  <div className="flex gap-1 opacity-0 group-hover/hl:opacity-100 transition-all shrink-0">
                    <button onClick={() => onEditHighlight(hi, h)} className="p-1 bg-violet-600/80 hover:bg-violet-600 text-white rounded"><Edit2 size={10} /></button>
                    <button onClick={() => onDeleteHighlight(hi)} className="p-1 bg-red-600/80 hover:bg-red-600 text-white rounded"><Trash2 size={10} /></button>
                  </div>
                )}
              </li>
            ))}
            {isAdminMode && (
              <li><button onClick={onAddHighlight} className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition mt-1"><Plus size={12} /> Add highlight</button></li>
            )}
          </ul>
        )}
        <button onClick={onBuy} className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition ${course.accent ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_30px_rgba(124,58,237,0.3)]' : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'}`}>
          {course.cta} <ArrowUpRight size={15} />
        </button>
      </div>
    </motion.div>
  )
}

export default function EditablePlansPricing() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null)
  const [editingHighlight, setEditingHighlight] = useState<{ courseId: string; idx: number; value: string } | null>(null)
  const [buyingCourse, setBuyingCourse] = useState<Course | null>(null)
  const { isAdminMode, dataSaved, sectionSaved, triggerDataRefresh } = useAdmin()

  useEffect(() => {
    coursesAPI.getAll().then(r => setCourses(r.data || [])).catch(() => {}).finally(() => setLoading(false))
  }, [dataSaved, sectionSaved['courses']])

  const handleSaveCourse = async (data: Partial<Course>): Promise<void> => {
    if (data._id) {
      await coursesAPI.update(data._id, data)
    } else {
      await coursesAPI.create(data)
    }
    triggerDataRefresh('courses')
    setEditingCourse(null)
  }

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Delete this course?')) return
    try { await coursesAPI.delete(id); setCourses(courses.filter(c => c._id !== id)) } catch (e) { console.error(e) }
  }

  const handleSaveHighlight = async (value: string) => {
    if (!editingHighlight) return
    const course = courses.find(c => c._id === editingHighlight.courseId)
    if (!course) return
    const highlights = [...(course.highlights || [])]
    highlights[editingHighlight.idx] = value
    try { await coursesAPI.update(editingHighlight.courseId, { ...course, highlights }); triggerDataRefresh('courses') } catch (e) { console.error(e) }
    setEditingHighlight(null)
  }

  const handleDeleteHighlight = async (courseId: string, idx: number) => {
    if (!confirm('Delete this highlight?')) return
    const course = courses.find(c => c._id === courseId)
    if (!course) return
    const highlights = (course.highlights || []).filter((_, i) => i !== idx)
    try { await coursesAPI.update(courseId, { ...course, highlights }); triggerDataRefresh('courses') } catch (e) { console.error(e) }
  }

  const handleAddHighlight = async (courseId: string) => {
    const course = courses.find(c => c._id === courseId)
    if (!course) return
    const highlights = [...(course.highlights || []), 'New highlight']
    try { await coursesAPI.update(courseId, { ...course, highlights }); triggerDataRefresh('courses') } catch (e) { console.error(e) }
  }

  return (
    <>
      <section id="pricing" className="scroll-mt-20 bg-black px-6 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">Choose Your Path</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Plans & Pricing</h2>
            <p className="mt-4 text-base text-zinc-400">Pick the plan that matches your trading goals.</p>
            {isAdminMode && (
              <button onClick={() => setEditingCourse({ title: '', price: 0, description: '', cta: 'Get Started', label: '', highlights: [], accent: false, isActive: true })}
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition">
                <Plus size={16} /> Add Course
              </button>
            )}
          </motion.div>
          {loading ? <div className="text-center text-zinc-400">Loading courses...</div>
            : courses.length === 0 ? <div className="text-center text-zinc-400">No courses available</div>
            : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map(course => (
                  <SpotlightCard key={course._id} course={course} isAdminMode={isAdminMode}
                    onEdit={() => setEditingCourse(course)}
                    onDelete={() => handleDeleteCourse(course._id)}
                    onEditHighlight={(idx, val) => setEditingHighlight({ courseId: course._id, idx, value: val })}
                    onDeleteHighlight={idx => handleDeleteHighlight(course._id, idx)}
                    onAddHighlight={() => handleAddHighlight(course._id)}
                    onBuy={() => !isAdminMode && setBuyingCourse(course)}
                  />
                ))}
              </div>
            )}
        </div>
      </section>
      {editingCourse && <CourseEditModal course={editingCourse} onSave={handleSaveCourse} onClose={() => setEditingCourse(null)} />}
      {editingHighlight && <HighlightEditModal value={editingHighlight.value} onSave={handleSaveHighlight} onClose={() => setEditingHighlight(null)} />}
      {buyingCourse && <BuyModal course={buyingCourse} onClose={() => setBuyingCourse(null)} />}
    </>
  )
}
