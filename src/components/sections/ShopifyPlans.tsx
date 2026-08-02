import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight } from 'lucide-react'
import { executeQuery } from '@/services/shopifyClient'
import styles from './ShopifyPlans.module.css'

interface ProductVariant {
  id: string
  title: string
  priceV2: {
    amount: string
    currencyCode: string
  }
  available: boolean
}

interface ProductImage {
  url: string
  altText: string
}

interface ShopifyProduct {
  id: string
  title: string
  description: string
  handle: string
  priceRange: {
    minVariantPrice: {
      amount: string
    }
  }
  images: {
    edges: Array<{
      node: ProductImage
    }>
  }
  variants: {
    edges: Array<{
      node: ProductVariant
    }>
  }
  metafields: {
    edges: Array<{
      node: {
        key: string
        value: string
      }
    }>
  }
}

interface Plan {
  product: ShopifyProduct
  highlights: string[]
  label?: string
  accent?: boolean
}

const PRODUCTS_QUERY = `
  query GetPlans($first: Int!) {
    products(first: $first, query: "tag:plan") {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                available
              }
            }
          }
          metafields(identifiers: [{namespace: "plan", key: "highlights"}, {namespace: "plan", key: "label"}, {namespace: "plan", key: "accent"}]) {
            edges {
              node {
                key
                value
              }
            }
          }
        }
      }
    }
  }
`

function SpotlightCard({ plan }: { plan: Plan }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const variant = plan.product.variants.edges[0]?.node

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleCheckout = () => {
    if (variant?.id) {
      window.location.href = `/cart/${variant.id}`
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-xl border p-8 overflow-hidden cursor-default ${
        plan.accent ? 'border-violet-500/40 bg-[#0d0d0d]' : 'border-white/8 bg-[#0d0d0d]'
      }`}
    >
      {plan.accent && <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-500 to-transparent" />}

      {/* Spotlight */}
      {hovered && (
        <div
          className={styles.spotlight}
          style={{
            background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(124,58,237,0.12), transparent 70%)`,
          }}
        />
      )}

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-white">{plan.product.title}</p>
            <p className="mt-2 text-sm text-zinc-400">{plan.product.description}</p>
          </div>
          {plan.label && (
            <span className="shrink-0 rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              {plan.label}
            </span>
          )}
        </div>

        <div className="mt-8">
          <div className="text-4xl font-bold text-white">₹{variant?.priceV2.amount}</div>
          <p className="mt-1 text-xs text-zinc-500 uppercase tracking-widest">one-time payment</p>
        </div>

        {plan.highlights.length > 0 && (
          <ul className="mt-8 space-y-3">
            {plan.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
                  <Check className="h-3 w-3 text-violet-400" strokeWidth={2.5} />
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleCheckout}
          disabled={!variant?.available}
          className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition ${
            plan.accent
              ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_30px_rgba(124,58,237,0.3)] disabled:opacity-50 disabled:cursor-not-allowed'
              : 'border border-white/15 bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {variant?.available ? 'Get Started' : 'Unavailable'} <ArrowUpRight size={15} />
        </button>
      </div>
    </motion.div>
  )
}

export default function ShopifyPlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await executeQuery<{
          products: {
            edges: Array<{
              node: ShopifyProduct
            }>
          }
        }>(PRODUCTS_QUERY, { first: 10 })

        const loadedPlans: Plan[] = response.products.edges.map((edge, index) => {
          const metafields = edge.node.metafields?.edges || []
          const highlightsField = metafields.find((m) => m.node.key === 'highlights')
          const labelField = metafields.find((m) => m.node.key === 'label')
          const accentField = metafields.find((m) => m.node.key === 'accent')

          return {
            product: edge.node,
            highlights: highlightsField ? JSON.parse(highlightsField.node.value) : [],
            label: labelField?.node.value,
            accent: accentField?.node.value === 'true' || index === 1,
          }
        })

        setPlans(loadedPlans)
      } catch (err) {
        console.error('Failed to fetch plans:', err)
        setError('Failed to load plans')
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  if (loading) {
    return (
      <section className="scroll-mt-20 bg-black px-6 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Plans & Pricing</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="border border-white/8 bg-[#0d0d0d] rounded-xl p-8 animate-pulse">
                <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-white/10 rounded w-2/3 mb-8"></div>
                <div className="h-8 bg-white/10 rounded w-1/4 mb-8"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-4 bg-white/10 rounded w-full"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || plans.length === 0) {
    return (
      <section className="scroll-mt-20 bg-black px-6 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Plans & Pricing</h2>
            <p className="mt-4 text-base text-zinc-400">Check back soon for available plans</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="pricing" className="scroll-mt-20 bg-black px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">Choose Your Path</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Plans & Pricing</h2>
          <p className="mt-4 text-base text-zinc-400">Pick the plan that matches your trading goals.</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <SpotlightCard key={plan.product.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}
