'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { meta, plans, type Feature, type Plan } from './content'

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 * Read top-to-bottom. Each value is ms after the cards
 * scroll into view. Restrained on purpose — this is a price
 * a client is deciding to pay every month, not a product reveal.
 *
 *    0ms   waiting for scroll into view
 *  120ms   cards rise 24px and fade in (Care & Build trails 90ms)
 *  380ms   prices settle, scale 0.92 → 1.0
 *  560ms   "Most clients" badge pops in
 *  680ms   feature rows slide up (staggered 55ms)
 * 1060ms   footnote and card actions fade in
 * ───────────────────────────────────────────────────────── */

const TIMING = {
  cards:    120,   // both cards rise and fade in
  price:    380,   // price settles from a slight scale-down
  badge:    560,   // "Most clients" badge pops
  features: 680,   // feature rows begin staggering
  footer:  1060,   // footnote and CTA fade in
}

/* Card containers */
const CARD = {
  offsetY:      24,     // px each card rises from
  initialScale: 0.985,  // barely-there settle, keeps it serious
  stagger:      0.09,   // seconds the featured card trails by
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
}

/* Price figure */
const PRICE = {
  initialScale: 0.92,
  spring: { type: 'spring' as const, stiffness: 420, damping: 26 },
}

/* "Most clients" badge */
const BADGE = {
  initialScale: 0.7,
  spring: { type: 'spring' as const, stiffness: 500, damping: 22 },
}

/* Feature rows, in both the recap and the additive list */
const FEATURE = {
  offsetY: 10,
  stagger: 0.055,  // seconds between each row
  spring: { type: 'spring' as const, stiffness: 350, damping: 28 },
}

/* Footnote and per-card action */
const FOOTER = {
  offsetY: 8,
  spring: { type: 'spring' as const, stiffness: 320, damping: 30 },
}

export default function PlanCards() {
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
    timers.push(setTimeout(() => setStage(1), TIMING.cards))
    timers.push(setTimeout(() => setStage(2), TIMING.price))
    timers.push(setTimeout(() => setStage(3), TIMING.badge))
    timers.push(setTimeout(() => setStage(4), TIMING.features))
    timers.push(setTimeout(() => setStage(5), TIMING.footer))

    return () => timers.forEach(clearTimeout)
  }, [isInView])

  // The premium card recaps what Care already covers, so the reader can
  // see it contains the cheaper tier rather than competing with it.
  const inherited = plans.find((plan) => !plan.featured)?.features ?? []

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
      {plans.map((plan, index) => (
        <PlanCard
          key={plan.name}
          plan={plan}
          index={index}
          stage={stage}
          inherited={plan.featured ? inherited : []}
        />
      ))}
    </div>
  )
}

function PlanCard({
  plan,
  index,
  stage,
  inherited,
}: {
  plan: Plan
  index: number
  stage: number
  inherited: Feature[]
}) {
  const dark = !!plan.featured

  return (
    <motion.article
      initial={{ opacity: 0, y: CARD.offsetY, scale: CARD.initialScale }}
      animate={{
        opacity: stage >= 1 ? 1 : 0,
        y:       stage >= 1 ? 0 : CARD.offsetY,
        scale:   stage >= 1 ? 1 : CARD.initialScale,
      }}
      transition={{ ...CARD.spring, delay: index * CARD.stagger }}
      className={`relative flex flex-col rounded-3xl p-8 md:p-9 h-full ${
        dark
          ? 'bg-foreground text-background shadow-elevated'
          : 'bg-white shadow-card'
      }`}
    >
      {/* header: tier name + badge */}
      <div className="flex items-center justify-between gap-3 min-h-[28px]">
        <span
          className={`text-[0.68rem] font-medium uppercase tracking-[0.16em] ${
            dark ? 'text-background/60' : 'text-muted'
          }`}
        >
          {plan.name}
        </span>
        {plan.badge && (
          <motion.span
            initial={{ opacity: 0, scale: BADGE.initialScale }}
            animate={{
              opacity: stage >= 3 ? 1 : 0,
              scale:   stage >= 3 ? 1 : BADGE.initialScale,
            }}
            transition={BADGE.spring}
            className="inline-block rounded-full bg-white px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-foreground"
          >
            {plan.badge}
          </motion.span>
        )}
      </div>

      {/* price */}
      <motion.div
        initial={{ opacity: 0, scale: PRICE.initialScale }}
        animate={{
          opacity: stage >= 2 ? 1 : 0,
          scale:   stage >= 2 ? 1 : PRICE.initialScale,
        }}
        transition={PRICE.spring}
        style={{ transformOrigin: 'left center' }}
        className="mt-6 flex items-baseline gap-2"
      >
        <span
          className={`font-heading text-5xl font-semibold tracking-tight tabular-nums ${
            dark ? 'text-background' : 'text-foreground'
          }`}
        >
          {plan.price}
        </span>
        <span className={`text-sm ${dark ? 'text-background/50' : 'text-muted'}`}>/ month</span>
      </motion.div>

      <p
        className={`mt-5 text-[0.975rem] leading-relaxed ${
          dark ? 'text-background/80' : 'text-foreground/70'
        }`}
      >
        {plan.who}
      </p>

      {/* what Care already covers, recapped inside Care & Build */}
      {inherited.length > 0 && (
        <>
          <SectionLabel dark={dark} className="mt-7 pt-5 border-t border-background/15">
            {plan.inherits}
          </SectionLabel>
          <ul className="mt-4 space-y-2.5">
            {inherited.map((feature, i) => (
              <FeatureRow
                key={feature.text}
                stage={stage}
                index={i}
                dark={dark}
                dimmed
                marker="check"
              >
                {feature.short ?? feature.text}
              </FeatureRow>
            ))}
          </ul>
        </>
      )}

      {/* the tier's own features */}
      {plan.plusLabel && (
        <SectionLabel dark={dark} className="mt-7 pt-5 border-t border-background/15">
          {plan.plusLabel}
        </SectionLabel>
      )}

      <ul className={`space-y-4 ${plan.plusLabel ? 'mt-4' : 'mt-7'}`}>
        {plan.features.map((feature, i) => (
          <FeatureRow
            key={feature.text}
            stage={stage}
            // the recap rows go first, so the additive rows continue the stagger
            index={inherited.length + i}
            dark={dark}
            marker={plan.plusLabel ? 'plus' : 'check'}
          >
            {feature.lead && (
              <strong className={`font-semibold ${dark ? 'text-background' : 'text-foreground'}`}>
                {feature.lead}{' '}
              </strong>
            )}
            {feature.text}
          </FeatureRow>
        ))}
      </ul>

      {/* Fine print reads as part of the feature list, so it sits directly
          under it rather than floating to the bottom with the button. */}
      {plan.footnote && (
        <motion.p
          initial={{ opacity: 0, y: FOOTER.offsetY }}
          animate={{
            opacity: stage >= 5 ? 1 : 0,
            y:       stage >= 5 ? 0 : FOOTER.offsetY,
          }}
          transition={FOOTER.spring}
          className="mt-7 pt-6 border-t border-border text-sm leading-relaxed text-muted text-pretty"
        >
          {plan.footnote}
        </motion.p>
      )}

      {/* cards are equal height, so the action pins to the bottom and the
          two buttons line up across both cards */}
      <motion.div
        initial={{ opacity: 0, y: FOOTER.offsetY }}
        animate={{
          opacity: stage >= 5 ? 1 : 0,
          y:       stage >= 5 ? 0 : FOOTER.offsetY,
        }}
        transition={FOOTER.spring}
        className="mt-auto pt-7"
      >
        <a
          href={`mailto:${meta.email}?subject=${encodeURIComponent(`${plan.name} plan`)}`}
          className={`inline-flex w-full items-center justify-center h-11 px-6 rounded-[14px] text-sm font-medium transition-all duration-200 ${
            dark
              ? 'bg-white text-foreground hover:bg-white/90'
              : 'bg-foreground text-white shadow-button hover:bg-foreground/90 hover:shadow-button-hover'
          }`}
        >
          {plan.cta}
        </a>
      </motion.div>
    </motion.article>
  )
}

function SectionLabel({
  children,
  dark,
  className = '',
}: {
  children: React.ReactNode
  dark: boolean
  className?: string
}) {
  return (
    <p
      className={`text-[0.68rem] font-medium uppercase tracking-[0.14em] ${
        dark ? 'text-background/60' : 'text-muted'
      } ${className}`}
    >
      {children}
    </p>
  )
}

function FeatureRow({
  children,
  stage,
  index,
  dark,
  dimmed = false,
  marker,
}: {
  children: React.ReactNode
  stage: number
  index: number
  dark: boolean
  dimmed?: boolean
  marker: 'check' | 'plus'
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: FEATURE.offsetY }}
      animate={{
        opacity: stage >= 4 ? (dimmed ? 0.62 : 1) : 0,
        y:       stage >= 4 ? 0 : FEATURE.offsetY,
      }}
      transition={{ ...FEATURE.spring, delay: index * FEATURE.stagger }}
      className={`flex items-start gap-3 leading-relaxed ${
        dimmed ? 'text-[0.875rem]' : 'text-[0.94rem]'
      } ${dark ? 'text-background/80' : 'text-foreground/75'}`}
    >
      <Marker kind={marker} dark={dark} />
      <span>{children}</span>
    </motion.li>
  )
}

/* A check means "included"; a plus means "on top of everything above".
   Using one glyph for both made the premium card read as the smaller offer. */
function Marker({ kind, dark }: { kind: 'check' | 'plus'; dark: boolean }) {
  return (
    <svg
      className={`w-[18px] h-[18px] mt-[3px] flex-shrink-0 ${
        dark ? 'text-background/70' : 'text-foreground/70'
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === 'check' ? <path d="M5 13l4 4L19 7" /> : <path d="M12 5v14M5 12h14" />}
    </svg>
  )
}
