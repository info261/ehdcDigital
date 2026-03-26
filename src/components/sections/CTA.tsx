'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { SplitReveal } from '@/components/ui/AnimatedText'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function CTA() {
  return (
    <section id="contact" className="relative py-32 md:py-44 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-mesh-dark" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(80, 80, 80, 0.4) 0%, transparent 60%)',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(60, 60, 60, 0.5) 0%, transparent 60%)',
        }}
      />

      <Container className="relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span
            variants={staggerItem}
            className="inline-block text-sm font-medium text-white/40 uppercase tracking-[0.2em] mb-6"
          >
            Start a Project
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] text-white tracking-tight">
            <SplitReveal className="text-white">Ready to transform</SplitReveal>
            <SplitReveal delay={0.1} className="text-white/50">your digital presence?</SplitReveal>
          </h2>

          <motion.p
            variants={staggerItem}
            className="mt-10 text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Let&apos;s discuss your project and see how we can help you achieve
            your goals. No pressure, no commitments—just a conversation.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              href="mailto:hello@ehdcdigital.com"
              size="lg"
              className="bg-white text-foreground hover:bg-white/90"
            >
              hello@ehdcdigital.com
              <motion.span
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </Button>
            <Button
              href="https://calendly.com"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-foreground"
            >
              Book a Call
            </Button>
          </motion.div>

          {/* Availability badge */}
          <motion.div
            variants={staggerItem}
            className="mt-16 inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-white/60">
              Currently accepting projects for Q2 2024
            </span>
          </motion.div>

          {/* Quick contact options */}
          <motion.div
            variants={staggerItem}
            className="mt-20 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { label: 'Email', value: 'hello@ehdcdigital.com' },
              { label: 'Location', value: 'Europe, Remote' },
              { label: 'Response Time', value: '< 24 hours' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-2">
                  {item.label}
                </p>
                <p className="text-white/70">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
