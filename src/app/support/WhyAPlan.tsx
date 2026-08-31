'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { comparison } from './content'

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 * Read top-to-bottom. Each value is ms after the section
 * scrolls into view.
 *
 *    0ms   waiting for scroll into view
 *  100ms   the two column headers fade in
 *  260ms   rows reveal top to bottom (staggered 80ms)
 *          within each row the remedy trails the pain by 90ms,
 *          so the eye reads across: problem, then answer
 * ───────────────────────────────────────────────────────── */

const TIMING = {
  headers: 100,  // "Without a plan" / "With a plan" labels
  rows:    260,  // paired rows begin revealing
}

/* Column headers */
const HEADER = {
  offsetY: 8,
  spring: { type: 'spring' as const, stiffness: 320, damping: 30 },
}

/* Paired rows */
const ROW = {
  offsetX: 14,    // px each half slides in from, toward the centre
  stagger: 0.08,  // seconds between rows
  answerDelay: 0.09,  // seconds the remedy trails its pain by
  spring: { type: 'spring' as const, stiffness: 340, damping: 30 },
}

export default function WhyAPlan() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!isInView) {
      setStage(0)
      return
    }

    setStage(0)
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setStage(1), TIMING.headers))
    timers.push(setTimeout(() => setStage(2), TIMING.rows))

    return () => timers.forEach(clearTimeout)
  }, [isInView])

  return (
    <div ref={ref} className="rounded-3xl bg-white shadow-card overflow-hidden">
      {/* column headers — hidden on mobile, where each pair is labelled inline */}
      <motion.div
        initial={{ opacity: 0, y: HEADER.offsetY }}
        animate={{
          opacity: stage >= 1 ? 1 : 0,
          y:       stage >= 1 ? 0 : HEADER.offsetY,
        }}
        transition={HEADER.spring}
        className="hidden md:grid md:grid-cols-2"
      >
        <div className="px-6 py-4 bg-[#f8fafc]">
          <Label muted>{comparison.withoutLabel}</Label>
        </div>
        <div className="px-6 py-4">
          <Label>{comparison.withLabel}</Label>
        </div>
      </motion.div>

      {comparison.pairs.map((pair, i) => (
        <div key={pair.without} className="grid md:grid-cols-2 border-t border-border">
          {/* the pain */}
          <motion.div
            initial={{ opacity: 0, x: -ROW.offsetX }}
            animate={{
              opacity: stage >= 2 ? 1 : 0,
              x:       stage >= 2 ? 0 : -ROW.offsetX,
            }}
            transition={{ ...ROW.spring, delay: i * ROW.stagger }}
            className="flex items-start gap-3 px-6 py-5 bg-[#f8fafc]"
          >
            <Dash />
            <div>
              <Label muted className="md:hidden mb-1.5">
                {comparison.withoutLabel}
              </Label>
              <p className="text-[0.94rem] leading-relaxed text-muted text-pretty">
                {pair.without}
              </p>
            </div>
          </motion.div>

          {/* what replaces it */}
          <motion.div
            initial={{ opacity: 0, x: ROW.offsetX }}
            animate={{
              opacity: stage >= 2 ? 1 : 0,
              x:       stage >= 2 ? 0 : ROW.offsetX,
            }}
            transition={{ ...ROW.spring, delay: i * ROW.stagger + ROW.answerDelay }}
            className="flex items-start gap-3 px-6 py-5 border-t border-border md:border-t-0"
          >
            <Check />
            <div>
              <Label className="md:hidden mb-1.5">{comparison.withLabel}</Label>
              <p className="text-[0.94rem] leading-relaxed text-foreground/80 text-pretty">
                {pair.with}
              </p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

function Label({
  children,
  muted = false,
  className = '',
}: {
  children: React.ReactNode
  muted?: boolean
  className?: string
}) {
  return (
    <span
      className={`block text-[0.68rem] font-medium uppercase tracking-[0.16em] ${
        muted ? 'text-muted' : 'text-foreground'
      } ${className}`}
    >
      {children}
    </span>
  )
}

/* A dash, not a cross: these are things going unhandled, not failures. */
function Dash() {
  return (
    <span className="mt-[11px] h-px w-3 flex-shrink-0 bg-muted/60" aria-hidden="true" />
  )
}

function Check() {
  return (
    <svg
      className="w-[18px] h-[18px] mt-[3px] flex-shrink-0 text-foreground/70"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}
