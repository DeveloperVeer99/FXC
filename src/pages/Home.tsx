import React from 'react'
import Hero from '@/components/hero/Hero'
import TradingEcosystem from '@/components/sections/TradingEcosystem'
import Curriculum from '@/components/sections/Curriculum'
import ProMentorship from '@/components/sections/ProMentorship'
import TradingCommunity from '@/components/sections/TradingCommunity'
import Testimonials from '@/components/sections/Testimonials'
import EditableBanner from '@/components/EditableBanner'
import EditablePlansPricing from '@/components/sections/EditablePlansPricing'

export default function Home(): React.JSX.Element {
  return (
    <>
      <Hero />
      <section id="courses">
        <TradingEcosystem />
        <Curriculum />
        <ProMentorship />
      </section>
      <section id="community">
        <TradingCommunity />
        <Testimonials />
      </section>
      <section id="plans">
        <EditablePlansPricing />
      </section>
      <section id="banner">
        <EditableBanner />
      </section>
    </>
  )
}
