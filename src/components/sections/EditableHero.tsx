import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, ArrowRight, BarChart2, Layers, TrendingUp, Zap, Edit2 } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import HeroBackground from '../hero/HeroBackground'
import ScrollIndicator from '../hero/ScrollIndicator'
import api from '../../services/api'

const tags = [
  { icon: BarChart2, label: 'Orderflow' },
  { icon: Layers, label: 'Auction Market Theory' },
  { icon: TrendingUp, label: 'Optionflow' },
  { icon: Zap, label: 'Live Trading Floor' },
]

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'

interface HeroData {
  headline: string;
  highlightedText: string;
  subheadline: string;
}

function useScramble(target: string, trigger: boolean) {
  const [text, setText] = useState(target)
  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const total = 18
    const interval = setInterval(() => {
      setText(target.split('').map((char, i) => {
        if (char === ' ') return ' '
        if (char === '.') return '.'
        if (frame / total > i / target.length) return char
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join(''))
      frame++
      if (frame > total) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [trigger, target])
  return text
}

// Inline edit modal for hero fields
function HeroEditModal({ field, value, onSave, onClose }: { field: string; value: string; onSave: (v: string) => void; onClose: () => void }) {
  const [val, setVal] = useState(value)
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-violet-500/30 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-white font-bold mb-4 text-sm">Edit {field}</h3>
        <textarea
          value={val}
          onChange={e => setVal(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-violet-500"
          autoFocus
        />
        <div className="flex gap-2 mt-4">
          <button onClick={() => onSave(val)} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded transition">Save</button>
          <button onClick={onClose} className="flex-1 border border-zinc-600 hover:bg-zinc-800 text-white text-sm font-semibold py-2 rounded transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function EditableHero(): React.JSX.Element {
  const [heroData, setHeroData] = useState<HeroData>({
    headline: 'Trade What The',
    highlightedText: 'Market Shows.',
    subheadline: 'FXC teaches institutional-grade orderflow, auction market theory, and optionflow — the same tools professional traders use to read real market structure and execute with edge.',
  })
  const [editingField, setEditingField] = useState<{ field: keyof HeroData; value: string } | null>(null)

  const { isAdminMode, dataSaved, sectionSaved, triggerDataRefresh } = useAdmin()

  useEffect(() => {
    api.get('/hero').then(r => setHeroData(r.data)).catch(() => {})
  }, [dataSaved, sectionSaved['hero']])

  const containerRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const [scramble, setScramble] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setScramble(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const scrambled = useScramble(heroData.highlightedText, scramble)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (rafRef.current) return
    const x = e.clientX, y = e.clientY
    rafRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) { mouseX.set(x - rect.left); mouseY.set(y - rect.top) }
      rafRef.current = null
    })
  }

  const handleSaveField = async (value: string) => {
    if (!editingField) return
    try {
      const updated = { ...heroData, [editingField.field]: value }
      await api.put('/hero', updated)
      setHeroData(updated)
      triggerDataRefresh('hero')
    } catch (e) {
      console.error(e)
    } finally {
      setEditingField(null)
    }
  }

  const EditBtn = ({ field, value }: { field: keyof HeroData; value: string }) => {
    if (!isAdminMode) return null
    return (
      <button
        type="button"
        onClick={() => setEditingField({ field, value })}
        className="inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold rounded opacity-0 group-hover:opacity-100 transition-all align-middle"
      >
        <Edit2 size={10} />
      </button>
    )
  }

  return (
    <>
      <main
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen overflow-hidden bg-[#030308] text-white"
      >
        <HeroBackground />
        <motion.div
          className="pointer-events-none absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px]"
          style={{ left: springX, top: springY, willChange: 'transform' }}
        />

        <section className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pt-24 pb-20 text-center sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="flex flex-col items-center gap-7"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Live Trading Floor Active</span>
            </motion.div>

            <h1 className="max-w-4xl text-5xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="group block">
                {heroData.headline}
                <EditBtn field="headline" value={heroData.headline} />
              </span>
              <span className="group relative block">
                <span className="relative z-10 bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent font-bold">
                  {scrambled}
                </span>
                <EditBtn field="highlightedText" value={heroData.highlightedText} />
              </span>
              <span className="block text-zinc-500">Not What You Think.</span>
            </h1>

            <p className="group relative max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              {heroData.subheadline}
              <EditBtn field="subheadline" value={heroData.subheadline} />
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {tags.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/8 px-3.5 py-1.5"
                >
                  <Icon size={12} className="text-violet-400" />
                  <span className="text-xs font-medium text-zinc-300">{label}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
              <button
                type="button"
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,0.5)] transition hover:bg-violet-500"
              >
                Explore Course <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </section>
        <ScrollIndicator />
      </main>

      {editingField && (
        <HeroEditModal
          field={editingField.field}
          value={editingField.value}
          onSave={handleSaveField}
          onClose={() => setEditingField(null)}
        />
      )}
    </>
  )
}
