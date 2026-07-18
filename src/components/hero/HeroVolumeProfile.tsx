import React, { useMemo } from 'react'

// Hardcoded realistic volume data — mimics actual NQ/ES session profile
const RAW_VOLUMES = [
  4, 6, 5, 8, 7, 9, 11, 10, 13, 15,
  18, 22, 28, 35, 42, 55, 68, 78, 88, 95,
  99, 100, 97, 91, 82, 70, 58, 48, 40, 34,
  29, 38, 45, 52, 60, 68, 72, 65, 55, 44,
  36, 28, 22, 17, 13, 10, 8, 6, 5, 4,
  6, 8, 7, 5, 4, 3, 4, 5, 4, 3,
]

export default function HeroVolumeProfile(): React.JSX.Element {
  const W = 340   // SVG width
  const H = 600   // SVG height
  const GAP = 2
  const levels = RAW_VOLUMES.length

  const maxVol = Math.max(...RAW_VOLUMES)
  const pocIdx = RAW_VOLUMES.indexOf(maxVol)  // index 21 (highest)
  const vahIdx = 14  // ~70% from bottom
  const valIdx = 28  // ~40% from bottom

  const barH = useMemo(() => (H - GAP * (levels - 1)) / levels, [levels])

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">

      {/* Violet ambient glow behind profile */}
      <div
        className="absolute top-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]"
        style={{ right: '-60px', width: '500px', height: '500px' }}
      />

      {/* SVG Volume Profile — right side */}
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{ right: '0px' }}
      >
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          style={{
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 60%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 60%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'destination-in',
          }}
        >
          {RAW_VOLUMES.map((vol, i) => {
            // i=0 is top (highest price), i=levels-1 is bottom (lowest price)
            const barWidth = (vol / maxVol) * (W - 4)
            const y = i * (barH + GAP)
            const x = W - barWidth  // bars grow from right edge leftward

            const isPOC = i === pocIdx
            const inVA  = i >= vahIdx && i <= valIdx

            let fill: string
            if (isPOC)     fill = 'rgba(192,132,252,0.95)'   // bright violet-400
            else if (inVA) fill = 'rgba(139,92,246,0.55)'    // violet-500
            else           fill = 'rgba(109,40,217,0.28)'    // violet-700 dim

            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(barH - 0.5, 1)}
                fill={fill}
                rx={1.5}
              />
            )
          })}

          {/* VAH dashed line */}
          {(() => {
            const y = vahIdx * (barH + GAP) + barH / 2
            return (
              <line
                x1={0} y1={y} x2={W} y2={y}
                stroke="rgba(139,92,246,0.3)"
                strokeWidth={1}
                strokeDasharray="4 6"
              />
            )
          })()}

          {/* VAL dashed line */}
          {(() => {
            const y = valIdx * (barH + GAP) + barH / 2
            return (
              <line
                x1={0} y1={y} x2={W} y2={y}
                stroke="rgba(139,92,246,0.3)"
                strokeWidth={1}
                strokeDasharray="4 6"
              />
            )
          })()}

          {/* POC solid line */}
          {(() => {
            const y = pocIdx * (barH + GAP) + barH / 2
            return (
              <line
                x1={0} y1={y} x2={W} y2={y}
                stroke="rgba(192,132,252,0.45)"
                strokeWidth={1}
              />
            )
          })()}
        </svg>
      </div>

      {/* Top + bottom fades */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
