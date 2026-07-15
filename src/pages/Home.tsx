import React from 'react'
import Hero from '@/components/hero/Hero'
import TradingEcosystem from '@/components/sections/TradingEcosystem'
import ProMentorship from '@/components/sections/ProMentorship'
import PlansPricing from '@/components/sections/PlansPricing'
import TradingCommunity from '@/components/sections/TradingCommunity'
import LiveTradingBanner from '@/components/sections/LiveTradingBanner'

export default function Home(): React.JSX.Element {
  return (
    <>
      <Hero />
      <TradingEcosystem />
      <ProMentorship />
      <TradingCommunity />
      <PlansPricing />
      <LiveTradingBanner />
    </>
  )
}
