import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const terms = [
  {
    title: '1. Definitions',
    body: "'FXC', 'Services', 'Platform', 'Courses', 'Mentorship', 'Trading Floor', 'PRIMO', 'User', and 'Content' refer to the products and services operated by FXC.",
  },
  {
    title: '2. Acceptance',
    body: 'By purchasing or using any FXC service you agree to these Terms. If you disagree, do not use the Services.',
  },
  {
    title: '3. Eligibility',
    body: 'Users must be at least 18 years old or have guardian consent.',
  },
  {
    title: '4. Educational Services',
    body: 'FXC provides educational content only. Nothing is investment advice, research advice, portfolio management, or a recommendation to buy or sell any security, derivative, forex pair or commodity.',
  },
  {
    title: '5. Risk Disclosure',
    body: 'Trading involves substantial risk, including total loss of capital. Past performance does not guarantee future results.',
  },
  {
    title: '6. Accounts',
    body: 'Accounts are personal, non-transferable and may not be shared.',
  },
  {
    title: '7. Intellectual Property',
    body: 'All videos, PDFs, live sessions, GEX levels, Discord posts, graphics, logos and educational material are protected by copyright and other IP laws. Recording, redistribution, resale or commercial use without written permission is prohibited.',
  },
  {
    title: '8. Lifetime Access',
    body: 'Lifetime access means for the commercial lifetime of the specific product on the FXC platform and is subject to maintenance, updates and discontinuation.',
  },
  {
    title: '9. Subscriptions',
    body: 'Subscription plans renew until cancelled. Cancellation prevents future renewals only.',
  },
  {
    title: '10. Conduct',
    body: 'No abuse, harassment, spam, piracy, cheating, impersonation or unlawful conduct.',
  },
  {
    title: '11. Suspension',
    body: 'FXC may suspend access for piracy, chargeback abuse, account sharing or serious misconduct.',
  },
  {
    title: '12. Third Parties',
    body: 'FXC is not responsible for brokers, exchanges, Discord, Shopify, payment gateways or data providers.',
  },
  {
    title: '13. Limitation of Liability',
    body: 'To the maximum extent permitted by law, FXC is not liable for trading losses, lost profits, indirect or consequential damages, downtime or third-party failures.',
  },
  {
    title: '14. Indemnity',
    body: 'Users agree to indemnify FXC against claims arising from misuse of the Services or breach of these Terms.',
  },
  {
    title: '15. Force Majeure',
    body: 'FXC is not liable for delays caused by events beyond reasonable control.',
  },
  {
    title: '16. Governing Law',
    body: 'Governed by the laws of India. Subject to mandatory consumer rights, disputes shall be subject to courts in Delhi.',
  },
]

export default function Terms() {
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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Terms & Conditions</h1>
          <p className="mt-3 text-sm text-zinc-500">Last updated: 2026</p>
        </div>

        <div className="space-y-8">
          {terms.map((item) => (
            <div key={item.title} className="border-l-2 border-violet-500/30 pl-5">
              <h2 className="text-base font-semibold text-white mb-2">{item.title}</h2>
              <p className="text-sm text-zinc-400 leading-7">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/8 pt-8 text-xs text-zinc-600">
          © 2026 FXC. All rights reserved.
        </div>
      </div>
    </div>
  )
}
