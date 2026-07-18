import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

const INDICES = [
  { symbol: '^GSPC',  label: 'S&P 500' },
  { symbol: '^IXIC',  label: 'NASDAQ' },
  { symbol: '^DJI',   label: 'DOW JONES' },
  { symbol: '^GDAXI', label: 'DAX' },
  { symbol: '^FTSE',  label: 'FTSE 100' },
  { symbol: '^N225',  label: 'NIKKEI 225' },
  { symbol: '^HSI',   label: 'HANG SENG' },
  { symbol: '^STOXX50E', label: 'EURO STOXX 50' },
]

type TickerItem = {
  label: string
  price: string
  change: string
  up: boolean
}

async function fetchIndex(symbol: string, label: string): Promise<TickerItem> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`
  const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
  const res = await fetch(proxy)
  const outer = await res.json()
  const data = JSON.parse(outer.contents)
  const meta = data?.chart?.result?.[0]?.meta
  const price: number = meta?.regularMarketPrice ?? 0
  const prev: number = meta?.chartPreviousClose ?? price
  const pct = prev ? ((price - prev) / prev) * 100 : 0
  return {
    label,
    price: price.toLocaleString('en-US', { maximumFractionDigits: 2 }),
    change: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
    up: pct >= 0,
  }
}

async function fetchAll(): Promise<TickerItem[]> {
  const results = await Promise.allSettled(
    INDICES.map(({ symbol, label }) => fetchIndex(symbol, label))
  )
  return results
    .filter((r): r is PromiseFulfilledResult<TickerItem> => r.status === 'fulfilled')
    .map((r) => r.value)
}

export default function MarqueeStrip() {
  const [items, setItems] = useState<TickerItem[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    fetchAll().then(setItems).catch(() => {})
    intervalRef.current = setInterval(() => {
      fetchAll().then(setItems).catch(() => {})
    }, 60_000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  if (!items.length) return (
    <div className="border-y border-white/[0.06] bg-[#07070f] py-3 text-center text-[10px] font-mono uppercase tracking-widest text-zinc-600">
      Loading market data...
    </div>
  )

  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-[#07070f] py-3">
      <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#07070f] to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#07070f] to-transparent" />
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="inline-flex items-center gap-2 text-xs">
            <span className="font-mono text-zinc-500 tracking-widest uppercase">{item.label}</span>
            <span className="font-mono text-zinc-300">{item.price}</span>
            <span className={`font-mono font-bold flex items-center gap-0.5 ${item.up ? 'text-emerald-400' : 'text-red-400'}`}>
              {item.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {item.change}
            </span>
            <span className="text-white/10">|</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
