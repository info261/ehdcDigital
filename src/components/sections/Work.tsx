'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { SplitReveal } from '@/components/ui/AnimatedText'
import { projects } from '@/data/content'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function Work() {
  return (
    <section id="work" className="relative py-32 md:py-44 bg-[#f5f3f0] overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-sm font-medium text-muted uppercase tracking-[0.2em] mb-6"
            >
              Selected Work
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
              <SplitReveal>Projects that</SplitReveal>
              <SplitReveal delay={0.1} className="text-gradient">drive results.</SplitReveal>
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted max-w-sm font-light"
          >
            A selection of recent work for clients who dared to be different.
          </motion.p>
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={staggerItem}
              className={`group ${index === 0 ? 'md:col-span-2' : ''}`}
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className={`relative overflow-hidden rounded-2xl ${
                  index === 0 ? 'aspect-[2/1]' : 'aspect-[4/3]'
                }`}
              >
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* Project number */}
                <div className="absolute bottom-6 left-6 text-white/20 text-8xl font-bold leading-none">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </motion.div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-muted transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
