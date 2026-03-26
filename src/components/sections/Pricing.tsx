'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { SplitReveal } from '@/components/ui/AnimatedText'
import { pricing } from '@/data/content'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 md:py-44 bg-[#f5f3f0] overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/4 -right-32 w-64 h-64 border border-border/30 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-1/4 -left-20 w-40 h-40 border border-border/20 rounded-full pointer-events-none"
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
            Pricing
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
            <SplitReveal>Transparent pricing,</SplitReveal>
            <SplitReveal delay={0.1} className="text-gradient">exceptional value.</SplitReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-xl text-muted font-light"
          >
            Choose the package that fits your needs.
          </motion.p>
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {pricing.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
              className={`relative ${plan.featured ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <div
                className={`h-full p-8 md:p-10 rounded-3xl transition-all duration-500 ${
                  plan.featured
                    ? 'bg-foreground text-background'
                    : 'bg-white border border-border/50 hover:border-foreground/20'
                }`}
              >
                {plan.featured && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 inline-block px-4 py-2 text-xs font-medium bg-gradient-to-r from-[#d4c8bc] to-[#e8dfd6] text-foreground rounded-full"
                  >
                    Most Popular
                  </motion.span>
                )}

                <h3 className={`text-xl font-bold ${plan.featured ? 'text-background' : 'text-foreground'}`}>
                  {plan.name}
                </h3>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className={`text-5xl md:text-6xl font-bold tracking-tight ${plan.featured ? 'text-background' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className={plan.featured ? 'text-background/50' : 'text-muted'}>
                      / project
                    </span>
                  )}
                </div>

                <p className={`mt-4 text-sm ${plan.featured ? 'text-background/60' : 'text-muted'}`}>
                  {plan.description}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className={`my-8 h-px ${plan.featured ? 'bg-background/20' : 'bg-border'}`}
                />

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-3 text-sm ${plan.featured ? 'text-background/80' : 'text-foreground/80'}`}
                    >
                      <svg
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.featured ? 'text-background' : 'text-foreground'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  href="#contact"
                  variant={plan.featured ? 'secondary' : 'primary'}
                  className="w-full justify-center"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center text-muted text-sm"
        >
          All packages include a complimentary strategy consultation.
          <br />
          Need something custom?{' '}
          <a href="#contact" className="text-foreground underline underline-offset-4 hover:no-underline">
            Let&apos;s talk.
          </a>
        </motion.p>
      </Container>
    </section>
  )
}
