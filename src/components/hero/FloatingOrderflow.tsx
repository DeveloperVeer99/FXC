import { motion } from 'framer-motion'

const rows = [
  { price: '24,920', bid: 1840, ask: 320, delta: '+1520', imbalance: true },
  { price: '24,910', bid: 920, ask: 1100, delta: '-180', imbalance: false },
  { price: '24,900', bid: 3200, ask: 410, delta: '+2790', imbalance: true },
  { price: '24,890', bid: 560, ask: 890, delta: '-330', imbalance: false },
  { price: '24,880', bid: 2100, ask: 300, delta: '+1800', imbalance: true },
]

export default function FloatingOrderflow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="mt-10 w-full max-w-md mx-auto rounded-xl border border-white/[0.08] bg-[#0a0a12]/90 backdrop-blur-sm overflow-hidden shadow-[0_0_60px_rgba(124,58,237,0.15)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Footprint // NIFTY 50</span>
        </div>
        <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest">Live</span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-4 px-4 py-1.5 text-[9px] font-mono uppercase tracking-widest text-zinc-600 border-b border-white/[0.04]">
        <span>Price</span>
        <span className="text-center">Bid</span>
        <span className="text-center">Ask</span>
        <span className="text-right">Delta</span>
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <motion.div
          key={row.price}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 + i * 0.08 }}
          className={`grid grid-cols-4 px-4 py-2 text-xs font-mono border-b border-white/[0.03] relative ${
            row.imbalance ? 'bg-emerald-500/5' : ''
          }`}
        >
          {/* Volume bar behind */}
          <div
            className={`absolute left-0 top-0 bottom-0 opacity-20 ${row.imbalance ? 'bg-emerald-500' : 'bg-red-500'}`}
            style={{ width: `${(row.bid / 3200) * 60}%` }}
          />
          <span className="relative text-zinc-300 font-semibold">{row.price}</span>
          <span className="relative text-center text-emerald-400">{row.bid.toLocaleString()}</span>
          <span className="relative text-center text-red-400">{row.ask.toLocaleString()}</span>
          <span className={`relative text-right font-bold ${row.imbalance ? 'text-emerald-400' : 'text-red-400'}`}>
            {row.delta}
          </span>
        </motion.div>
      ))}

      {/* Footer */}
      <div className="px-4 py-2 flex items-center justify-between">
        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">Cumulative Delta</span>
        <span className="text-[10px] font-mono font-bold text-emerald-400">+5,600</span>
      </div>
    </motion.div>
  )
}
