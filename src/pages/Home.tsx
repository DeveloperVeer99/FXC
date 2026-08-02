import React from 'react'
import EditableHero from '@/components/sections/EditableHero'
import EditableTradingEcosystem from '@/components/sections/EditableTradingEcosystem'
import EditableCurriculum from '@/components/sections/EditableCurriculum'
import EditableProMentorship from '@/components/sections/EditableProMentorship'
import EditableTradingCommunity from '@/components/sections/EditableTradingCommunity'
import EditableTestimonials from '@/components/sections/EditableTestimonials'
import EditableBanner from '@/components/EditableBanner'
import EditablePlansPricing from '@/components/sections/EditablePlansPricing'

export default function Home(): React.JSX.Element {
  return (
    <>
      <EditableHero />
      <section id="courses">
        <EditableTradingEcosystem />
        <EditableCurriculum />
        <EditableProMentorship />
      </section>
      <section id="community">
        <EditableTradingCommunity />
        <EditableTestimonials />
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
