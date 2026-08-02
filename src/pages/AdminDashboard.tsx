import { useState, useEffect } from 'react'
import { LogOut, Plus, Edit2, Trash2, X } from 'lucide-react'
import { bannerAPI, footerAPI, coursesAPI, curriculumAPI } from '@/services/api'

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('banner')
  const [banner, setBanner] = useState<any>(null)
  const [footer, setFooter] = useState<any>(null)
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'banner') {
        const res = await bannerAPI.get()
        setBanner(res.data)
      } else if (activeTab === 'footer') {
        const res = await footerAPI.get()
        setFooter(res.data)
      } else if (activeTab === 'courses' || activeTab === 'curriculum') {
        const res = await coursesAPI.getAll()
        setCourses(res.data)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'banner', label: 'Banner', icon: '📢' },
    { id: 'footer', label: 'Footer', icon: '📄' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'curriculum', label: 'Curriculum', icon: '📖' },
  ]

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Gradient background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                FXC Admin Control
              </h1>
              <p className="text-sm text-zinc-400">Manage your trading platform</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Tab navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-600/50'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content card */}
          <div className="relative group">
            {/* Card with gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#0d0d0d] to-[#0a0a0f] border border-white/10 rounded-2xl p-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-violet-600/30 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-zinc-400">Loading data...</p>
                </div>
              ) : (
                <>
                  {activeTab === 'banner' && banner && (
                    <BannerEditor banner={banner} onUpdate={loadData} />
                  )}

                  {activeTab === 'footer' && footer && (
                    <FooterEditor footer={footer} onUpdate={loadData} />
                  )}

                  {activeTab === 'courses' && (
                    <CoursesManager courses={courses} onUpdate={loadData} />
                  )}

                  {activeTab === 'curriculum' && (
                    <CurriculumManager courses={courses} onUpdate={loadData} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BannerEditor({ banner, onUpdate }: any) {
  const [formData, setFormData] = useState(banner)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await bannerAPI.update(formData)
      alert('✅ Banner updated successfully!')
      onUpdate()
    } catch (error) {
      alert('❌ Failed to update banner')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-300">Banner Text</label>
          <input
            type="text"
            value={formData.text || ''}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
            placeholder="e.g., Limited Seats Available"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-300">Banner Message</label>
          <input
            type="text"
            value={formData.message || ''}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
            placeholder="e.g., Only a few spots left this batch"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
        <input
          id="banner-active"
          type="checkbox"
          checked={formData.isActive || false}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          className="w-4 h-4 accent-violet-600"
        />
        <label htmlFor="banner-active" className="text-sm font-medium text-zinc-300">
          Active - Show banner on website
        </label>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-8 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-violet-600/50 disabled:opacity-50 transition-all duration-300"
      >
        {saving ? '💾 Saving...' : '✔️ Save Changes'}
      </button>
    </div>
  )
}

function FooterEditor({ footer, onUpdate }: any) {
  const [formData, setFormData] = useState(footer)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await footerAPI.update(formData)
      alert('Footer updated successfully!')
      onUpdate()
    } catch (error) {
      alert('Failed to update footer')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Company Name</label>
        <input
          type="text"
          value={formData.company?.name || ''}
          onChange={(e) => setFormData({
            ...formData,
            company: { ...(formData.company || {}), name: e.target.value }
          })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
        <input
          type="email"
          value={formData.contact?.email || ''}
          onChange={(e) => setFormData({
            ...formData,
            contact: { ...(formData.contact || {}), email: e.target.value }
          })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Phone</label>
        <input
          type="text"
          value={formData.contact?.phone || ''}
          onChange={(e) => setFormData({
            ...formData,
            contact: { ...(formData.contact || {}), phone: e.target.value }
          })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Copyright Text</label>
        <input
          type="text"
          value={formData.copyright || ''}
          onChange={(e) => setFormData({ ...formData, copyright: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}

function CoursesManager({ courses, onUpdate }: any) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<any>(null)

  const resetForm = () => {
    setFormData(null)
    setIsAdding(false)
    setEditingId(null)
  }

  const handleAdd = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      label: '',
      accent: false,
      highlights: [],
      cta: 'Enroll Now',
    })
    setIsAdding(true)
  }

  const handleEdit = (course: any) => {
    setFormData(course)
    setEditingId(course._id)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return
    try {
      await coursesAPI.delete(id)
      alert('Course deleted')
      onUpdate()
    } catch (error) {
      alert('Failed to delete course')
    }
  }

  const handleSave = async () => {
    try {
      if (editingId) {
        await coursesAPI.update(editingId, formData)
        alert('Course updated')
      } else {
        await coursesAPI.create(formData)
        alert('Course created')
      }
      resetForm()
      onUpdate()
    } catch (error) {
      alert('Failed to save course')
    }
  }

  if (isAdding || editingId) {
    return (
      <CourseForm
        initialData={formData}
        onSave={handleSave}
        onCancel={resetForm}
      />
    )
  }

  return (
    <div>
      <button
        onClick={handleAdd}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-600/50 font-semibold transition-all duration-300 mb-8"
      >
        <Plus size={20} />
        Add New Course
      </button>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-400 mb-4">No courses yet. Create your first one!</p>
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Create Course
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course: any) => (
            <div
              key={course._id}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-violet-500/50 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 to-blue-600/0 group-hover:from-violet-600/10 group-hover:to-blue-600/10 rounded-xl transition-all duration-300"></div>

              <div className="relative space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">{course.title}</h3>
                  <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{course.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text">
                      ₹{course.price}
                    </p>
                    {course.label && (
                      <p className="text-xs text-violet-400 font-semibold mt-1">{course.label}</p>
                    )}
                  </div>
                  {course.accent && (
                    <span className="px-3 py-1 bg-violet-600/30 border border-violet-500/50 rounded-full text-xs text-violet-300 font-medium">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <div className="pt-4 flex gap-2 border-t border-white/10">
                  <button
                    onClick={() => handleEdit(course)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg transition-all font-medium"
                    title="Edit course"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-all font-medium"
                    title="Delete course"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


function CourseForm({ initialData, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(initialData)
  const [highlightInput, setHighlightInput] = useState('')

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({
        ...formData,
        highlights: [...(formData.highlights || []), highlightInput],
      })
      setHighlightInput('')
    }
  }

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_: any, i: number) => i !== index),
    })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-zinc-300">Course Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
          placeholder="e.g., FXC Pro Advanced Trading"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-zinc-300">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all h-24"
          placeholder="Describe what students will learn..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-300">Price (₹)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-300">Label</label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
            placeholder="e.g., Most Popular"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-zinc-300">CTA Button Text</label>
        <input
          type="text"
          value={formData.cta}
          onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
        />
      </div>

      <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
        <input
          id="course-accent"
          type="checkbox"
          checked={formData.accent}
          onChange={(e) => setFormData({ ...formData, accent: e.target.checked })}
          className="w-4 h-4 accent-violet-600"
        />
        <label htmlFor="course-accent" className="text-sm font-medium text-zinc-300">
          Mark as Featured Course (⭐)
        </label>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-zinc-300">Highlights</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={highlightInput}
            onChange={(e) => setHighlightInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addHighlight()}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
            placeholder="Add a highlight and press Enter"
          />
          <button
            onClick={addHighlight}
            className="px-4 py-3 bg-violet-600/20 hover:bg-violet-600/40 text-violet-400 rounded-lg transition-all font-semibold"
          >
            Add
          </button>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {formData.highlights?.map((highlight: string, index: number) => (
            <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-sm text-zinc-300">✓ {highlight}</span>
              <button
                onClick={() => removeHighlight(index)}
                className="text-red-400 hover:text-red-300"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-white/10">
        <button
          onClick={onSave}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-600/50 transition-all"
        >
          ✔️ Save Course
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all"
        >
          ❌ Cancel
        </button>
      </div>
    </div>
  )
}

function CurriculumManager({ courses }: any) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [curriculum, setCurriculum] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const loadCurriculum = async (courseId: string) => {
    setLoading(true)
    try {
      const res = await curriculumAPI.get(courseId)
      setCurriculum(res.data)
    } catch (error) {
      setCurriculum(null)
    } finally {
      setLoading(false)
    }
  }

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId)
    loadCurriculum(courseId)
  }

  if (!selectedCourse) {
    return (
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-4">Select a Course</label>
        <div className="grid grid-cols-1 gap-2">
          {courses.map((course: any) => (
            <button
              key={course._id}
              onClick={() => handleCourseSelect(course._id)}
              className="text-left p-3 border border-white/10 rounded-lg hover:bg-white/5 text-white"
            >
              {course.title}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => setSelectedCourse(null)}
        className="mb-4 px-3 py-1 bg-zinc-700 text-sm text-white rounded hover:bg-zinc-600"
      >
        ← Back to Courses
      </button>

      {loading ? (
        <div className="text-zinc-400">Loading curriculum...</div>
      ) : curriculum ? (
        <CurriculumEditor curriculum={curriculum} courseId={selectedCourse!} onUpdate={() => loadCurriculum(selectedCourse!)} />
      ) : (
        <div className="text-zinc-400">No curriculum yet. Create one below.</div>
      )}
    </div>
  )
}

function CurriculumEditor({ curriculum, courseId, onUpdate }: any) {
  const [chapters, setChapters] = useState(curriculum?.chapters || [])
  const [saving, setSaving] = useState(false)

  const addChapter = () => {
    setChapters([...chapters, {
      chapterNumber: chapters.length + 1,
      title: '',
      description: '',
      duration: '',
      modules: [],
    }])
  }

  const removeChapter = (index: number) => {
    setChapters(chapters.filter((_: any, i: number) => i !== index))
  }

  const updateChapter = (index: number, field: string, value: any) => {
    const updated = [...chapters]
    updated[index][field] = value
    setChapters(updated)
  }

  const addModule = (chapterIndex: number) => {
    const updated = [...chapters]
    updated[chapterIndex].modules.push({
      moduleNumber: (updated[chapterIndex].modules?.length || 0) + 1,
      title: '',
      description: '',
    })
    setChapters(updated)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await curriculumAPI.update(courseId, { chapters })
      alert('Curriculum updated!')
      onUpdate()
    } catch (error) {
      alert('Failed to update curriculum')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {chapters.map((chapter: any, chapterIndex: number) => (
        <div key={chapterIndex} className="p-4 border border-white/10 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Chapter {chapter.chapterNumber}</h3>
            <button
              onClick={() => removeChapter(chapterIndex)}
              title="Delete chapter"
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <input
            id={`chapter-title-${chapterIndex}`}
            type="text"
            value={chapter.title}
            onChange={(e) => updateChapter(chapterIndex, 'title', e.target.value)}
            placeholder="Chapter title"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
          />

          <textarea
            id={`chapter-desc-${chapterIndex}`}
            value={chapter.description}
            onChange={(e) => updateChapter(chapterIndex, 'description', e.target.value)}
            placeholder="Chapter description"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm h-16"
          />

          <input
            id={`chapter-duration-${chapterIndex}`}
            type="text"
            value={chapter.duration}
            onChange={(e) => updateChapter(chapterIndex, 'duration', e.target.value)}
            placeholder="Duration (e.g., 2 hours)"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
          />

          <div className="pl-4 space-y-2 border-l border-white/10">
            <div className="text-sm text-zinc-400">Modules</div>
            {chapter.modules?.map((module: any, moduleIndex: number) => (
              <div key={moduleIndex} className="space-y-1">
                <input
                  type="text"
                  value={module.title}
                  onChange={(e) => {
                    const updated = [...chapters]
                    updated[chapterIndex].modules[moduleIndex].title = e.target.value
                    setChapters(updated)
                  }}
                  placeholder={`Module ${module.moduleNumber} title`}
                  className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs"
                />
              </div>
            ))}
            <button
              onClick={() => addModule(chapterIndex)}
              className="text-xs px-2 py-1 bg-violet-600/50 text-violet-300 rounded hover:bg-violet-600/70"
            >
              + Add Module
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addChapter}
        className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500"
      >
        <Plus size={20} />
        Add Chapter
      </button>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Curriculum'}
      </button>
    </div>
  )
}