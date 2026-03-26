'use client'

import { motion } from 'framer-motion'

export default function Navbar() {
  // Minimal navbar - just for mobile since logo is in sidebar on desktop
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="lg:hidden fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="flex items-center justify-between">
        <a href="/" className="text-lg font-bold text-foreground tracking-tight">
          ehdcDigital
        </a>
        <a
          href="mailto:hello@ehdcdigital.com"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          Contact
        </a>
      </div>
    </motion.header>
  )
}
