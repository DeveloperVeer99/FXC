import React from 'react'

export default function HeroBackground(): React.JSX.Element {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#030308]" />

      {/* Primary violet glow — CSS animation, GPU composited */}
      <div
        className="absolute left-1/2 -top-32 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[160px]"
        style={{ willChange: 'opacity', animation: 'pulse-glow 8s ease-in-out infinite' }}
      />

      {/* Secondary glow */}
      <div className="absolute right-[-10%] bottom-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Scan line — CSS keyframe, transform only (no layout) */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/35 to-transparent"
        style={{ willChange: 'transform', animation: 'scan-line 8s linear infinite' }}
      />

      {/* Vertical grid lines */}
      {[20, 40, 60, 80].map((pct) => (
        <div
          key={pct}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-500/8 to-transparent"
          style={{ left: `${pct}%` }}
        />
      ))}

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #030308 100%)' }}
      />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030308] to-transparent" />

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.35; }
        }
        @keyframes scan-line {
          0% { transform: translateY(0); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
