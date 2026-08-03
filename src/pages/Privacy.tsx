import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const sections = [
  { title: 'Information Collected', body: 'Name, email, billing details, Discord username, purchase history, device/browser data and course progress.' },
  { title: 'Purpose', body: 'Deliver services, authenticate users, process payments, provide support, improve products, comply with law and communicate service updates.' },
  { title: 'Payment Data', body: 'Payments are processed by third-party gateways. FXC does not intentionally store complete card credentials.' },
  { title: 'Sharing', body: 'Data may be shared with trusted processors only as necessary to provide services or comply with legal obligations.' },
  { title: 'Retention', body: 'Information is retained only as reasonably necessary for business, legal and tax purposes.' },
  { title: 'Security', body: 'Reasonable technical and organisational safeguards are implemented, but no system is completely secure.' },
  { title: 'Your Rights', body: 'Where applicable, you may request access, correction or deletion of personal information, subject to legal obligations.' },
  { title: 'Cookies', body: 'Cookies may be used for authentication, analytics and platform functionality.' },
]

export default function Privacy() {
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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Privacy Policy</h1>
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
        <div className="mt-14 border-t border-white/8 pt-8 text-xs text-zinc-600">© 2026 FXC. All rights reserved.</div>
      </div>
    </div>
  )
}
