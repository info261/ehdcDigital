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
 *  100ms   both column headers fade in
 *  260ms   rows reveal top to bottom (staggered 80ms)
 *          within each row the answer trails the problem by 90ms,
 *          so the eye reads across: your problem, then what I do
 *  340ms   each icon pops in behind its line (staggered with the row)
 * ───────────────────────────────────────────────────────── */

const TIMING = {
  headers: 100,  // "Without a plan" / "With a plan"
  rows:    260,  // paired rows begin revealing
}

/* Column headers */
const HEADER = {
  offsetY: 8,
  spring: { type: 'spring' as const, stiffness: 320, damping: 30 },
}

/* Paired rows */
const ROW = {
  offsetX:     14,    // px each half slides in from
  stagger:     0.08,  // seconds between rows
  answerDelay: 0.09,  // seconds the answer trails its problem by
  spring: { type: 'spring' as const, stiffness: 340, damping: 30 },
}

/* The ✗ / ✓ badges */
const ICON = {
  initialScale: 0.4,
  delay: 0.08,  // seconds after its row starts
  spring: { type: 'spring' as const, stiffness: 520, damping: 24 },
}

/* Red for what goes wrong today, green for what is handled. */
const TONE = {
  bad:  { chip: '#FEE2E2', glyph: '#DC2626' },
  good: { chip: '#16A34A', glyph: '#FFFFFF' },
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
    <div
      ref={ref}
      className="rounded-3xl bg-white shadow-card overflow-hidden grid md:grid-cols-2"
    >
      {/* ---------- column headers (desktop only) ---------- */}
      <ColumnHeader stage={stage} tone="bad" className="hidden md:flex">
        {comparison.withoutLabel}
      </ColumnHeader>
      <ColumnHeader stage={stage} tone="good" className="hidden md:flex bg-[#F2FBF5]">
        {comparison.withLabel}
      </ColumnHeader>

      {/* ---------- rows ----------
          Cells sit directly in the grid so each pair shares a row height
          and the two sides stay level even when one wraps to two lines. */}
      {comparison.pairs.map((pair, i) => (
        <Row key={pair.without} pair={pair} index={i} stage={stage} />
      ))}
    </div>
  )
}

function Row({
  pair,
  index,
  stage,
}: {
  pair: { without: string; with: string }
  index: number
  stage: number
}) {
  return (
    <>
      {/* the problem they have today */}
      <motion.div
        initial={{ opacity: 0, x: -ROW.offsetX }}
        animate={{
          opacity: stage >= 2 ? 1 : 0,
          x:       stage >= 2 ? 0 : -ROW.offsetX,
        }}
        transition={{ ...ROW.spring, delay: index * ROW.stagger }}
        className="flex items-start gap-3.5 px-6 py-5 border-t border-border"
      >
        <Badge tone="bad" stage={stage} index={index} />
        <div className="min-w-0">
          <MobileLabel tone="bad">{comparison.withoutLabel}</MobileLabel>
          <p className="text-[0.94rem] leading-relaxed text-muted text-pretty">{pair.without}</p>
        </div>
      </motion.div>

      {/* what I do about it */}
      <motion.div
        initial={{ opacity: 0, x: ROW.offsetX }}
        animate={{
          opacity: stage >= 2 ? 1 : 0,
          x:       stage >= 2 ? 0 : ROW.offsetX,
        }}
        transition={{ ...ROW.spring, delay: index * ROW.stagger + ROW.answerDelay }}
        className="flex items-start gap-3.5 px-6 py-5 border-t border-border bg-[#F2FBF5]"
      >
        <Badge tone="good" stage={stage} index={index} />
        <div className="min-w-0">
          <MobileLabel tone="good">{comparison.withLabel}</MobileLabel>
          <p className="text-[0.94rem] leading-relaxed text-foreground/85 text-pretty">
            {pair.with}
          </p>
        </div>
      </motion.div>
    </>
  )
}

function ColumnHeader({
  children,
  tone,
  stage,
  className = '',
}: {
  children: React.ReactNode
  tone: 'bad' | 'good'
  stage: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: HEADER.offsetY }}
      animate={{
        opacity: stage >= 1 ? 1 : 0,
        y:       stage >= 1 ? 0 : HEADER.offsetY,
      }}
      transition={HEADER.spring}
      className={`items-center gap-2.5 px-6 py-5 ${className}`}
    >
      <Badge tone={tone} stage={stage} index={-1} />
      <span
        className={`text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${
          tone === 'good' ? 'text-foreground' : 'text-muted'
        }`}
      >
        {children}
      </span>
    </motion.div>
  )
}

function MobileLabel({ children, tone }: { children: React.ReactNode; tone: 'bad' | 'good' }) {
  return (
    <span
      className={`md:hidden block mb-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${
        tone === 'good' ? 'text-[#16A34A]' : 'text-[#DC2626]'
      }`}
    >
      {children}
    </span>
  )
}

function Badge({
  tone,
  stage,
  index,
}: {
  tone: 'bad' | 'good'
  stage: number
  index: number
}) {
  const shown = index < 0 ? stage >= 1 : stage >= 2
  const delay = index < 0 ? 0 : index * ROW.stagger + ICON.delay

  return (
    <motion.span
      initial={{ scale: ICON.initialScale }}
      animate={{ scale: shown ? 1 : ICON.initialScale }}
      transition={{ ...ICON.spring, delay }}
      className="mt-[1px] flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
      style={{ background: TONE[tone].chip }}
      aria-hidden="true"
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke={TONE[tone].glyph}
        strokeWidth={3.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {tone === 'good' ? <path d="M5 13l4 4L19 7" /> : <path d="M6 6l12 12M18 6L6 18" />}
      </svg>
    </motion.span>
  )
}
