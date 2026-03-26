'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { SplitReveal } from '@/components/ui/AnimatedText'
import { testimonials } from '@/data/content'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function Testimonials() {
  return (
    <section className="relative py-32 md:py-44 gradient-mesh overflow-hidden">
      {/* Decorative gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232, 223, 214, 0.5) 0%, transparent 60%)',
        }}
      />

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-medium text-muted uppercase tracking-[0.2em] mb-6"
          >
            Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
            <SplitReveal>Trusted by</SplitReveal>
            <SplitReveal delay={0.1} className="text-gradient">ambitious brands.</SplitReveal>
          </h2>
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
              className={`group relative ${index === 1 ? 'md:-mt-8' : ''}`}
            >
              <div className="p-8 md:p-10 bg-white rounded-3xl border border-border/50 hover:border-foreground/20 transition-all duration-500 h-full flex flex-col">
                {/* Metric highlight */}
                <div className="mb-8">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    className="h-px bg-gradient-to-r from-foreground/30 to-transparent mb-6"
                  />
                  <p className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
                    {testimonial.metric}
                  </p>
                  <p className="text-sm text-muted mt-2">
                    {testimonial.metricLabel}
                  </p>
                </div>

                <blockquote className="text-foreground/80 leading-relaxed flex-grow text-lg font-light">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-8 pt-6 border-t border-border/50 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4c8bc] to-[#e8dfd6]" />
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-muted/60 uppercase tracking-[0.2em] mb-8">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-40">
            {['Stripe', 'Notion', 'Linear', 'Vercel', 'Figma'].map((brand) => (
              <span key={brand} className="text-xl font-bold text-foreground">
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
