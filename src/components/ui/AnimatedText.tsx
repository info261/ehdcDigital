'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedTextProps {
  children: string
  className?: string
  delay?: number
  type?: 'words' | 'chars' | 'lines'
}

const charVariants = {
  initial: {
    y: '100%',
    opacity: 0,
  },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.02,
    },
  }),
}

const wordVariants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.08,
    },
  }),
}

const lineVariants = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function AnimatedHeadline({
  children,
  className = '',
  delay = 0,
}: {
  children: string
  className?: string
  delay?: number
}) {
  const words = children.split(' ')

  return (
    <motion.span
      initial="initial"
      animate="animate"
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            custom={i + delay}
            variants={wordVariants}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export function AnimatedChars({
  children,
  className = '',
  delay = 0,
}: {
  children: string
  className?: string
  delay?: number
}) {
  const chars = children.split('')

  return (
    <motion.span
      initial="initial"
      animate="animate"
      className={`inline-block ${className}`}
    >
      {chars.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            custom={i + delay * 10}
            variants={charVariants}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export function AnimatedLine({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-50px' }}
        variants={{
          initial: { y: '100%', opacity: 0 },
          animate: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function RevealText({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  const words = children.split(' ')

  return (
    <motion.p
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={{
              initial: { y: '100%', opacity: 0 },
              animate: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.03,
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  )
}

export function SplitReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: string
  className?: string
  delay?: number
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '110%', rotate: 3 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}
