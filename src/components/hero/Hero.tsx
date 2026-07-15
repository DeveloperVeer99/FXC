import React from 'react'
import { motion } from 'framer-motion'
import HeroBackground from './HeroBackground'
import HeroBadge from './HeroBadge'
import HeroButtons from './HeroButtons'
import HeroStats from './HeroStats'
import ScrollIndicator from './ScrollIndicator'
import HeroVolumeProfile from './HeroVolumeProfile'

export default function Hero(): React.JSX.Element {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background effects */}
      <HeroBackground />
      
      {/* We use relative positioning and a higher z-index (relative z-10) 
          on the container wrapper to ensure header text and buttons sit clean 
          and fully interactive above the background volume profile.
      */}
      <section className="relative z-10 mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center px-6 pt-32 pb-12 text-center sm:pt-40 sm:pb-20 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6 sm:space-y-8"
        >
          <HeroBadge />
          <div className="space-y-6">
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[5rem]">
              Built on Analysis.
              <br />
              <span className="bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                Backed by Experience.
              </span>
            </h1>

            <h2 className="mx-auto max-w-3xl text-sm font-semibold tracking-[0.12em] uppercase text-violet-300/90 sm:text-base">
              Orderflow &amp; Optionflow
            </h2>

            <p className="mx-auto max-w-3xl text-lg leading-8 text-white/75 sm:text-xl">
              Understand value, acceptance and imbalance using Auction Market Theory and execute with professional risk discipline.
            </p>

            <p className="mx-auto max-w-2xl text-sm leading-6 text-white/50 sm:text-base mt-2">
              Learn how institutions actually interact with liquidity, auctions, volume, and options positioning.
            </p>
          </div>
          <HeroButtons />
          <HeroStats />
        </motion.div>
      </section>

      {/* Mounted bottom background profile layer (Spreads 100% width cleanly) */}
      <HeroVolumeProfile />

      <ScrollIndicator />
    </main>
  )
}