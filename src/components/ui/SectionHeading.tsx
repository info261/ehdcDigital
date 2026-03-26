'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  centered?: boolean
}

export default function SectionHeading({
  label,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
      className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}
    >
      {label && (
        <span className="text-sm font-medium text-muted uppercase tracking-wider">
          {label}
        </span>
      )}
      <h2 className="mt-2 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}
