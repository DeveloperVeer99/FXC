import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, ArrowRight, BarChart2, Layers, TrendingUp, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroBackground from './HeroBackground'
import ScrollIndicator from './ScrollIndicator'

const tags = [
  { icon: BarChart2,  label: 'Orderflow' },
  { icon: Layers,     label: 'Auction Market Theory' },
  { icon: TrendingUp, label: 'Optionflow' },
  { icon: Zap,        label: 'Live Trading Floor' },
]

const stats = [
  { value: '500+', label: 'Active Learners' },
  { value: '4.9★', label: 'Avg Rating' },
]

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'
const TARGET = 'Market Shows.'

function useScramble(target: string, trigger: boolean) {
  const [text, setText] = useState(target)
  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const total = 18
    const interval = setInterval(() => {
      setText(
        target.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (char === '.') return '.'
          if (frame / total > i / target.length) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      frame++
      if (frame > total) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [trigger, target])
  return text
}

export default function Hero(): React.JSX.Element {
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

  const scrambled = useScramble(TARGET, scramble)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (rafRef.current) return
    const x = e.clientX, y = e.clientY
    rafRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) { mouseX.set(x - rect.left); mouseY.set(y - rect.top) }
      rafRef.current = null
    })
  }

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#030308] text-white"
    >
      <HeroBackground />

      {/* Mouse-tracked glow */}
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
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Live Trading Floor Active
            </span>
          </motion.div>

          {/* Main headline */}
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block">Trade What The</span>
            <span className="relative block">
              <span className="relative z-10 bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent font-bold">
                {scrambled}
              </span>
            </span>
            <span className="block text-zinc-500">Not What You Think.</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            FXC teaches institutional-grade orderflow, auction market theory, and optionflow —
            the same tools professional traders use to read real market structure and execute with edge.
          </p>

          {/* Feature tags */}
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

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,0.5)] transition hover:bg-violet-500 hover:shadow-[0_0_55px_rgba(124,58,237,0.65)]"
            >
              Get Access <ArrowUpRight size={16} />
            </Link>
            <Link
              to="/course"
              className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Course <ArrowRight size={16} />
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-10 border-t border-white/[0.07] pt-8 w-full max-w-lg">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-zinc-500">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <ScrollIndicator />
    </main>
  )
}
