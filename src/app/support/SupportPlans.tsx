'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import NotionBoard from './NotionBoard'
import PlanCards from './PlanCards'
import { meta, biggerNote, howItWorks, boardNote, terms, exclusions } from './content'

const reveal = {
  initial: 'initial' as const,
  whileInView: 'animate' as const,
  viewport: { once: true, margin: '-60px' },
}

function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`block text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted ${className}`}
    >
      {children}
    </span>
  )
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div {...reveal} variants={fadeInUp} className="mb-10">
      <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
      <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance">
        {title}
      </h2>
      <div className="mt-6 h-px bg-border" />
    </motion.div>
  )
}

export default function SupportPlans() {
  return (
    <main id="main-content" role="main" className="min-h-screen bg-background pb-24">
      <Container className="max-w-4xl">
        {/* ---------- masthead ---------- */}
        <header className="pt-10 md:pt-14">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pb-6 border-b border-border">
            <span className="text-sm font-medium text-foreground">
              {meta.brand} <span className="text-muted font-normal">· {meta.person}</span>
            </span>
            <span className="text-xs text-muted">{meta.validity}</span>
          </div>

          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="pt-12 md:pt-16">
            <Eyebrow className="mb-4">{meta.eyebrow}</Eyebrow>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.05] text-foreground text-balance">
              {meta.title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg text-muted leading-relaxed text-pretty">
              {meta.lede}
            </p>
          </motion.div>
        </header>

        {/* ---------- plans ---------- */}
        <section className="pt-16 md:pt-20">
          <PlanCards />

          <motion.p
            {...reveal}
            variants={fadeInUp}
            className="mt-6 rounded-2xl bg-[#f1f5f9] px-6 py-5 text-[0.975rem] leading-relaxed text-foreground/70 text-pretty"
          >
            {biggerNote}
          </motion.p>
        </section>

        {/* ---------- how it works ---------- */}
        <section className="pt-20 md:pt-24">
          <SectionHead eyebrow="How it works" title="You get a board. That is the whole system." />

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {howItWorks.map((step) => (
              <motion.div
                key={step.title}
                variants={staggerItem}
                className="rounded-2xl bg-white shadow-subtle p-6"
              >
                <h3 className="font-heading text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-muted text-pretty">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* board mock */}
          <motion.div {...reveal} variants={fadeInUp} className="mt-6">
            <NotionBoard />

            <p className="mt-3 text-[0.82rem] text-muted">
              Drag a card between columns — this is the board itself, not a picture of one.
            </p>

            <p className="mt-5 text-[0.9rem] leading-relaxed text-muted text-pretty">
              {boardNote.map((segment, i) =>
                segment.strong ? (
                  <strong key={i} className="font-semibold text-foreground">
                    {segment.text}
                  </strong>
                ) : (
                  <span key={i}>{segment.text}</span>
                )
              )}
            </p>
          </motion.div>
        </section>

        {/* ---------- terms ---------- */}
        <section className="pt-20 md:pt-24">
          <SectionHead eyebrow="Terms" title="Four of them" />

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5"
          >
            {terms.map((term) => (
              <motion.p
                key={term.lead}
                variants={staggerItem}
                className="text-[0.975rem] leading-relaxed text-foreground/70 text-pretty"
              >
                <strong className="font-semibold text-foreground">{term.lead}</strong>
                {term.rest}
              </motion.p>
            ))}
          </motion.div>

          <motion.div {...reveal} variants={fadeInUp} className="mt-10">
            <Eyebrow className="mb-4">Quoted separately, not part of a plan</Eyebrow>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
              {exclusions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.94rem] leading-relaxed text-foreground/70"
                >
                  {/* Neutral marker — these are excluded, so a tick would misread */}
                  <span
                    className="mt-[10px] h-px w-2.5 flex-shrink-0 bg-muted"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* ---------- cta ---------- */}
        <motion.section
          {...reveal}
          variants={fadeInUp}
          className="mt-20 md:mt-24 rounded-3xl bg-white shadow-card p-8 md:p-10"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance">
            Pick the one that fits, and I&rsquo;ll set up the board.
          </h2>
          <p className="mt-3 max-w-[52ch] text-[0.975rem] leading-relaxed text-muted text-pretty">
            Reply with the plan that makes sense and the first invoice starts from next month. Not sure
            which one? A short call sorts it out.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={meta.callUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center h-11 px-6 text-sm font-medium bg-foreground text-white rounded-[14px] shadow-button hover:bg-foreground/90 hover:shadow-button-hover transition-all duration-200"
            >
              Book a call
            </a>
            <a
              href={`mailto:${meta.email}?subject=Site%20support%20plan`}
              className="inline-flex items-center h-11 px-6 text-sm font-medium bg-white text-foreground/70 shadow-button rounded-[14px] hover:bg-[#f8f8f8] hover:text-foreground hover:shadow-button-hover transition-all duration-200"
            >
              {meta.email}
            </a>
          </div>
        </motion.section>

        {/* ---------- footer ---------- */}
        <footer className="mt-16 pt-6 border-t border-border flex flex-wrap justify-between gap-x-8 gap-y-2">
          <Eyebrow>
            {meta.brand} · {meta.email}
          </Eyebrow>
          <Eyebrow>{meta.tagline}</Eyebrow>
        </footer>
      </Container>
    </main>
  )
}
