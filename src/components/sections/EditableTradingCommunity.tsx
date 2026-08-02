import { useEffect, useState } from 'react'
import { Check, MessageSquare, ArrowUpRight } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { EditableWrapper } from '../EditableWrapper'
import api from '../../services/api'

interface CommunityData {
  title: string;
  description: string;
  discordLink: string;
  referralCode: string;
}

const defaultCommunityData: CommunityData = {
  title: 'Join the FXC Trading Community',
  description: 'A private, well-moderated trading community for serious traders.',
  discordLink: 'https://discord.gg/vrHwGxE3VA',
  referralCode: 'REF-V4B5JI',
}

export default function EditableTradingCommunity() {
  const [communityData, setCommunityData] = useState<CommunityData>(defaultCommunityData)

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const response = await api.get('/community')
        setCommunityData(response.data)
      } catch (error) {
        console.error('Failed to fetch community data:', error)
        setCommunityData(defaultCommunityData)
      }
    }
    fetchCommunityData()
  }, [])

  const [copied, setCopied] = useState(false)
  const { setEditingItem } = useAdmin()

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(communityData.referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const handleEdit = (data: CommunityData) => {
    setEditingItem({
      type: 'community',
      data,
    })
  }

  return (
    <EditableWrapper
      type="community"
      data={communityData}
      onEdit={handleEdit}
    >
      <section id="community" className="scroll-mt-20 bg-black px-6 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto max-w-2xl text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">Community</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {communityData.title.split(' Trading')[0]}{' '}
              <span className="text-violet-400">Trading Community</span>
            </h2>
            <p className="mt-4 text-base text-zinc-400">
              {communityData.description}
            </p>
          </div>

          <div className="rounded-xl border border-white/8 bg-[#0d0d0d] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y divide-white/8 lg:divide-y-0 lg:divide-x lg:divide-white/8">

              {/* Left */}
              <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="mb-6 inline-flex items-center gap-2 rounded border border-violet-500/20 bg-violet-500/5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-violet-400">
                    First Month Free
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg border border-white/8 bg-white/5 flex items-center justify-center text-violet-400">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Live Trading Discord</h3>
                      <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                        Exclusive Discord where traders learn together and stay disciplined.
                      </p>
                    </div>
                  </div>

                  <ul className="mt-8 space-y-3">
                    {[
                      'Weekly live discussions and Q&A',
                      'Beginner-friendly environment',
                      'Direct access to experienced traders',
                      'Network with serious traders',
                      'No signals, no spam, no hype',
                    ].map((text) => (
                      <li key={text} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
                          <Check className="h-2.5 w-2.5 text-violet-400" strokeWidth={3} />
                        </span>
                        <span className="text-sm text-zinc-300">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 pt-6 border-t border-white/8 flex items-center justify-between gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">CL_NET // VERIFIED_GATEWAY</span>
                  <a
                    href={communityData.discordLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-violet-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-violet-500 transition"
                  >
                    Join Community <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between">
                <div className="space-y-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                    Refer & Earn Free Access
                  </span>
                  <p className="text-sm text-zinc-400">Share your referral code. Both get 15 extra days free.</p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Referral Key</span>
                    <div className="flex items-stretch gap-2">
                      <div className="flex-1 flex items-center rounded-lg border border-white/8 bg-black px-3.5 py-2.5">
                        <span className="font-mono text-sm tracking-widest text-violet-400 font-bold">{communityData.referralCode}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className={`rounded-lg px-4 py-2.5 text-xs font-mono uppercase tracking-widest transition border ${
                          copied
                            ? 'border-violet-500/30 bg-violet-500/10 text-violet-400'
                            : 'border-white/15 bg-white/5 text-white hover:bg-white/10'
                        }`}
                      >
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-white/8">
                  <div className="rounded-lg border border-white/8 bg-black p-4 text-center">
                    <div className="text-2xl font-bold text-white">+15</div>
                    <div className="mt-1 text-[9px] font-mono uppercase tracking-widest text-zinc-500">Extra Days Free</div>
                  </div>
                  <div className="rounded-lg border border-white/8 bg-black p-4 text-center">
                    <div className="text-2xl font-bold text-violet-400">∞</div>
                    <div className="mt-1 text-[9px] font-mono uppercase tracking-widest text-zinc-500">Per Referral</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </EditableWrapper>
  )
}
