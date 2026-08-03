import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const sections = [
  { title: 'Digital Products', body: 'Except where required by applicable law, purchases become non-refundable once digital access has been granted.' },
  { title: 'Subscriptions', body: 'Users may cancel before the next billing cycle to avoid future charges. Previous charges are not refunded except where required by law.' },
  { title: 'Technical Issues', body: 'FXC will make reasonable efforts to restore access before considering any other remedy.' },
  { title: 'Chargebacks', body: 'Fraudulent or abusive chargebacks may result in suspension of access and lawful recovery of outstanding amounts.' },
  { title: 'Consumer Rights', body: 'Nothing in this policy excludes non-waivable rights available under applicable Indian law.' },
]

const disclaimer = [
  { title: 'Educational Use', body: 'Market analysis, GEX Levels, live trading demonstrations, examples and commentary are educational only.' },
  { title: 'No Guarantees', body: 'FXC does not guarantee profits, funded account success, income, consistency or any trading outcome.' },
]

export default function Refund() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition mb-10">
          <ArrowLeft size={15} /> Back to Home
        </Link>
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">Legal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Refund & Cancellation Policy</h1>
          <p className="mt-3 text-sm text-zinc-500">Last updated: 2026</p>
        </div>
        <div className="space-y-8">
          {sections.map(s => (
            <div key={s.title} className="border-l-2 border-violet-500/30 pl-5">
              <h2 className="text-base font-semibold text-white mb-2">{s.title}</h2>
              <p className="text-sm text-zinc-400 leading-7">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-lg font-bold text-white mb-6">Trading Disclaimer</h2>
          <div className="space-y-8">
            {disclaimer.map(s => (
              <div key={s.title} className="border-l-2 border-violet-500/30 pl-5">
                <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-7">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/8 pt-8 text-xs text-zinc-600">© 2026 FXC. All rights reserved.</div>
      </div>
    </div>
  )
}
