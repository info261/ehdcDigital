'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { SplitReveal } from '@/components/ui/AnimatedText'
import { services } from '@/data/content'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function Services() {
  return (
    <section id="services" className="relative py-32 md:py-44 gradient-mesh overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-border to-transparent" />

      <Container>
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-medium text-muted uppercase tracking-[0.2em] mb-6"
          >
            Services
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
            <SplitReveal>Everything you need</SplitReveal>
            <SplitReveal delay={0.1}>to stand out online.</SplitReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-xl text-muted leading-relaxed font-light"
          >
            From strategy to execution, we handle every aspect of your
            digital presence with precision and care.
          </motion.p>
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
              className="group relative p-10 md:p-12 bg-white/50 backdrop-blur-sm rounded-3xl border border-border/50 hover:border-foreground/20 hover:bg-white/80 transition-all duration-500"
            >
              {/* Gradient accent on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 0% 0%, rgba(212, 200, 188, 0.2) 0%, transparent 50%)',
                }}
              />

              <div className="relative">
                <span className="text-6xl md:text-7xl font-bold text-border/70 group-hover:text-foreground/10 transition-colors duration-500">
                  {service.icon}
                </span>
                <h3 className="mt-8 text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-4 text-muted leading-relaxed">
                  {service.description}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '40px' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className="mt-8 h-px bg-foreground/30"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
