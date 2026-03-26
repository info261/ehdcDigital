'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Container from '@/components/ui/Container'
import { SplitReveal, RevealText } from '@/components/ui/AnimatedText'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 gradient-mesh-dark"
        style={{ y: backgroundY }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/4 right-0 w-px h-40 bg-gradient-to-b from-transparent via-white to-transparent"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-1/4 left-20 w-px h-32 bg-gradient-to-b from-transparent via-white to-transparent"
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
        >
          <div>
            <motion.span
              variants={staggerItem}
              className="inline-block text-sm font-medium text-white/40 uppercase tracking-[0.2em] mb-6"
            >
              The Problem
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white tracking-tight">
              <SplitReveal className="text-white">Most websites are</SplitReveal>
              <SplitReveal delay={0.1} className="text-white/50">forgettable.</SplitReveal>
              <SplitReveal delay={0.2} className="text-white mt-2">Yours doesn&apos;t</SplitReveal>
              <SplitReveal delay={0.3} className="text-white">have to be.</SplitReveal>
            </h2>
          </div>

          <motion.div variants={staggerItem} className="space-y-8">
            <p className="text-xl text-white/60 leading-relaxed font-light">
              In a world of templates and quick fixes, exceptional brands
              get lost in the noise. Generic designs lead to generic results.
            </p>
            <p className="text-xl text-white/60 leading-relaxed font-light">
              We believe every brand deserves a digital presence as
              unique as they are—one that captures attention, builds trust,
              and drives measurable growth.
            </p>

            <motion.div
              variants={staggerItem}
              className="pt-8 grid grid-cols-2 gap-8"
            >
              <div className="relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -top-4 left-0 h-px bg-gradient-to-r from-white/30 to-transparent"
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-5xl font-bold text-white"
                >
                  73%
                </motion.p>
                <p className="text-white/40 text-sm mt-2 leading-snug">
                  of users judge credibility<br />by design alone
                </p>
              </div>
              <div className="relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="absolute -top-4 left-0 h-px bg-gradient-to-r from-white/30 to-transparent"
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-5xl font-bold text-white"
                >
                  0.05<span className="text-2xl">s</span>
                </motion.p>
                <p className="text-white/40 text-sm mt-2 leading-snug">
                  to form a first<br />impression
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
