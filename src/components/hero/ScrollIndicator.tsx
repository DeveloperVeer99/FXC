import React from 'react'
import { motion } from 'framer-motion'

export default function ScrollIndicator(): React.JSX.Element {
  return (
    <div className="absolute inset-x-0 bottom-10 flex justify-center">
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-12 w-8 items-end justify-center"
      >
        <div className="h-10 w-px rounded-full bg-white/10" />
        <motion.span className="mt-2 block h-3 w-3 rounded-full bg-white/80" />
      </motion.div>
    </div>
  )
}
