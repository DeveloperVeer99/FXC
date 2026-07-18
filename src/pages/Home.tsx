import React, { lazy, Suspense } from 'react'
import Hero from '@/components/hero/Hero'

const TradingEcosystem = lazy(() => import('@/components/sections/TradingEcosystem'))
const Curriculum       = lazy(() => import('@/components/sections/Curriculum'))
const ProMentorship    = lazy(() => import('@/components/sections/ProMentorship'))
const TradingCommunity = lazy(() => import('@/components/sections/TradingCommunity'))
const Testimonials     = lazy(() => import('@/components/sections/Testimonials'))
const PlansPricing     = lazy(() => import('@/components/sections/PlansPricing'))
const LiveTradingBanner = lazy(() => import('@/components/sections/LiveTradingBanner'))

export default function Home(): React.JSX.Element {
  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <TradingEcosystem />
        <Curriculum />
        <ProMentorship />
        <TradingCommunity />
        <Testimonials />
        <PlansPricing />
        <LiveTradingBanner />
      </Suspense>
    </>
  )
}
