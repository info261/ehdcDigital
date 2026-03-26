'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { SplitReveal } from '@/components/ui/AnimatedText'
import { team } from '@/data/content'
import { staggerContainer, staggerItem, float } from '@/lib/animations'

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-44 gradient-mesh overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        variants={float}
        animate="animate"
        className="absolute top-1/4 right-20 w-3 h-3 rounded-full bg-foreground/10 pointer-events-none"
      />
      <motion.div
        variants={float}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute bottom-1/3 left-32 w-2 h-2 rounded-full bg-foreground/15 pointer-events-none"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-sm font-medium text-muted uppercase tracking-[0.2em] mb-6"
            >
              About Us
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
              <SplitReveal>Small team.</SplitReveal>
              <SplitReveal delay={0.1} className="text-gradient">Big impact.</SplitReveal>
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 space-y-6"
            >
              <p className="text-xl text-muted leading-relaxed font-light">
                We&apos;re a boutique design studio that believes in quality over quantity.
                Every project gets our full attention, ensuring exceptional results
                that exceed expectations.
              </p>
              <p className="text-xl text-muted leading-relaxed font-light">
                No account managers, no junior designers learning on your project.
                You work directly with experienced professionals who care about
                your success as much as you do.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mt-16 space-y-6"
            >
              <motion.p
                variants={staggerItem}
                className="text-sm font-medium text-muted uppercase tracking-[0.2em]"
              >
                Our Values
              </motion.p>
              {[
                { title: 'Craft over speed', desc: 'Quality takes time. We never rush.' },
                { title: 'Honesty over promises', desc: 'We tell you what you need to hear.' },
                { title: 'Results over aesthetics', desc: 'Beautiful and functional.' },
              ].map((value, i) => (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                  className="flex items-start gap-6 group"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="w-3 h-3 rounded-full bg-foreground mt-2 group-hover:scale-150 transition-transform duration-300"
                  />
                  <div>
                    <p className="text-lg font-medium text-foreground">{value.title}</p>
                    <p className="text-muted">{value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8 lg:mt-20"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="p-10 bg-white rounded-3xl border border-border/50"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d4c8bc] to-[#e8dfd6] mb-8" />
                <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
                <p className="text-muted">{member.role}</p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '60px' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="my-6 h-px bg-border"
                />
                <p className="text-foreground/80 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}

            {/* Quick stats */}
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: '2019', label: 'Founded' },
                { value: '12', label: 'Countries served' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-8 bg-white/50 rounded-2xl border border-border/50 text-center"
                >
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
