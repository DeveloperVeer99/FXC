import { useRef, useState, useEffect, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight, Plus, Trash2 } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { coursesAPI } from '../../services/api'

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

function SpotlightCard({ 
  course, 
  isAdminMode, 
  onEdit, 
  onDelete 
}: { 
  course: Course
  isAdminMode: boolean
  onEdit: (course: Course) => void
  onDelete: (id: string) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Delete this course?')) {
      onDelete(course._id)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-xl border p-8 overflow-hidden cursor-default group ${
        course.accent ? 'border-violet-500/40 bg-[#0d0d0d]' : 'border-white/[0.08] bg-[#0d0d0d]'
      }`}
    >
      {course.accent && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />}

      {/* Admin Controls */}
      {isAdminMode && (
        <div className="absolute top-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(course)}
            className="inline-flex items-center gap-1 rounded-md bg-violet-600/80 hover:bg-violet-600 px-2.5 py-1.5 text-xs font-semibold text-white"
            title="Edit course"
          >
            ✎ Edit
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1 rounded-md bg-red-600/80 hover:bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white"
            title="Delete course"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}

      {/* Spotlight */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(124,58,237,0.12), transparent 70%)`,
          }}
        />
      )}

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-white">{course.title}</p>
            <p className="mt-2 text-sm text-zinc-400">{course.description}</p>
          </div>
          {course.label && (
            <span className="flex-shrink-0 rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              {course.label}
            </span>
          )}
        </div>

        <div className="mt-8">
          <div className="text-4xl font-bold text-white">₹{course.price}</div>
          <p className="mt-1 text-xs text-zinc-500 uppercase tracking-widest">one-time payment</p>
        </div>

        {course.highlights && course.highlights.length > 0 && (
          <ul className="mt-8 space-y-3">
            {course.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
                  <Check className="h-3 w-3 text-violet-400" strokeWidth={2.5} />
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <button
          className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition ${
            course.accent
              ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_30px_rgba(124,58,237,0.3)]'
              : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
          }`}
        >
          {course.cta} <ArrowUpRight size={15} />
        </button>
      </div>
    </motion.div>
  )
}

export default function EditablePlansPricing() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const { isAdminMode, setEditingItem } = useAdmin()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await coursesAPI.getAll()
      setCourses(response.data || [])
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (course: Course) => {
    setEditingItem({
      type: 'course',
      id: course._id,
      data: course,
    })
  }

  const handleDelete = async (id: string) => {
    try {
      await coursesAPI.delete(id)
      setCourses(courses.filter((c) => c._id !== id))
    } catch (error) {
      console.error('Failed to delete course:', error)
    }
  }

  const handleAddNew = () => {
    setEditingItem({
      type: 'course',
      data: {
        title: '',
        price: 0,
        description: '',
        cta: 'Get Started',
        label: '',
        highlights: [],
        accent: false,
        isActive: true,
      },
    })
  }

  return (
    <section id="pricing" className="scroll-mt-20 bg-black px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">
              Choose Your Path
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Plans & Pricing
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Pick the plan that matches your trading goals.
          </p>

          {isAdminMode && (
            <button
              onClick={handleAddNew}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition"
            >
              <Plus size={16} /> Add Course
            </button>
          )}
        </motion.div>

        {loading ? (
          <div className="text-center text-zinc-400">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-center text-zinc-400">No courses available</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <SpotlightCard
                key={course._id}
                course={course}
                isAdminMode={isAdminMode}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
