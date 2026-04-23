'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { projects, caseStudies } from '@/data/content'
import { Logo } from '@/components/Logo'
import {
  Palette,
  Code,
  Sparkle,
  GitBranch,
  XLogo,
  X,
  CaretLeft,
  CaretRight,
  ArrowUp,
  ArrowDown,
  Command,
  MagnifyingGlass,
} from '@phosphor-icons/react'

function AboutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Close on escape key and disable scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const preventScroll = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Use capture phase to intercept before Lenis
      document.addEventListener('wheel', preventScroll, { passive: false, capture: true })
      document.addEventListener('touchmove', preventScroll, { passive: false, capture: true })
      document.addEventListener('scroll', preventScroll, { passive: false, capture: true })
      // Stop Lenis smooth scroll
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis
      if (lenis) {
        lenis.stop()
      }
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('wheel', preventScroll, { capture: true })
      document.removeEventListener('touchmove', preventScroll, { capture: true })
      document.removeEventListener('scroll', preventScroll, { capture: true })
      // Resume Lenis smooth scroll
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis
      if (lenis) {
        lenis.start()
      }
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative bg-background rounded-2xl shadow-elevated max-w-md w-full p-6 grain-overlay"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/50 shadow-subtle text-foreground/50 hover:text-foreground hover:bg-white hover:shadow-card transition-all duration-200"
              aria-label="Close modal"
            >
              <X size={16} weight="bold" />
            </button>

            {/* Content */}
            <div className="flex items-start gap-4 mb-4">
              <img
                src="https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg"
                alt="Erik Hudec"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 id="about-modal-title" className="text-lg font-semibold text-foreground">
                  Erik Hudec
                </h2>
                <p className="text-sm text-muted">28 · Banská Bystrica 🇸🇰 → Prague 🇨🇿</p>
              </div>
            </div>

            <div className="text-sm text-foreground/70 leading-relaxed mb-6 space-y-3">
              <p>
                I've spent the last 5 years building Webflow sites and automations that save my clients hours of work and thousands of dollars. I'm obsessed with accessibility, UX, and SEO—I spend countless hours optimizing every detail because a website should feel effortless and actually get found.
              </p>
              <p>
                I'm always excited to learn new things. It helps me grow as a person and as a business owner who can deliver better results for my clients.
              </p>
              <p>
                Beyond client work, I love sharing what I've learned: freelancing tips, business ideas, my mistakes (and how to avoid them), resources, and inspiration. I post on X and LinkedIn, but the real gems go straight to my newsletter.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="https://cal.com/ehdcdigital/needawebsite"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-9 px-4 text-xs font-medium bg-foreground text-white rounded-[13px] shadow-button hover:bg-foreground/90 hover:shadow-button-hover transition-all duration-200"
              >
                Book a call
              </a>
              <a
                href="https://eriks-newsletter-70c132.beehiiv.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-9 px-4 text-xs font-medium bg-white text-foreground/70 shadow-button rounded-[13px] hover:bg-[#f8f8f8] hover:text-foreground hover:shadow-button-hover transition-all duration-200"
              >
                Become a better freelancer
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function CaseStudyModal({
  isOpen,
  onClose,
  caseStudyId,
  onNavigate,
  onOpenSearch,
}: {
  isOpen: boolean
  onClose: () => void
  caseStudyId: number | null
  onNavigate: (direction: 'prev' | 'next') => void
  onOpenSearch: () => void
}) {
  const caseStudy = caseStudyId !== null ? caseStudies[caseStudyId] : null
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const leftArrowRef = useRef<HTMLButtonElement>(null)
  const rightArrowRef = useRef<HTMLButtonElement>(null)

  const imagesRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      // Store ref for keyboard scrolling
      (window as unknown as { __caseStudyImagesRef?: HTMLDivElement }).__caseStudyImagesRef = node
    }
  }, [])

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()

      if (e.key === 'ArrowLeft') {
        setPressedKey('left')
        onNavigate('prev')
      }
      if (e.key === 'ArrowRight') {
        setPressedKey('right')
        onNavigate('next')
      }

      // CMD+K or CTRL+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onOpenSearch()
      }

      // Arrow up/down to scroll images
      const imagesContainer = (window as unknown as { __caseStudyImagesRef?: HTMLDivElement }).__caseStudyImagesRef
      if (imagesContainer) {
        // Use instant scroll when key is held (repeat), smooth for single press
        const scrollBehavior = e.repeat ? 'auto' : 'smooth'
        const scrollAmount = e.repeat ? 80 : 150

        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setPressedKey('up')
          imagesContainer.scrollBy({ top: -scrollAmount, behavior: scrollBehavior })
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setPressedKey('down')
          imagesContainer.scrollBy({ top: scrollAmount, behavior: scrollBehavior })
        }
      }
    }

    const handleKeyup = () => {
      setPressedKey(null)
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeydown)
      document.addEventListener('keyup', handleKeyup)
      // Stop Lenis and lock body scroll
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis
      if (lenis) lenis.stop()
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('keyup', handleKeyup)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis
      if (lenis) lenis.start()
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, onNavigate, onOpenSearch])

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  if (!caseStudy) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal wrapper - allows arrows to overflow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-[105]"
          >
            {/* Navigation arrows - positioned at modal edges */}
            <button
              ref={leftArrowRef}
              onClick={(e) => { e.stopPropagation(); onNavigate('prev') }}
              className={`absolute -left-14 top-1/2 -translate-y-1/2 z-[110] w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-button text-foreground/70 hover:text-foreground hover:bg-[#f8f8f8] hover:shadow-button-hover active:scale-[0.92] transition-all duration-150 ${
                pressedKey === 'left' ? 'scale-[0.92]' : ''
              }`}
              aria-label="Previous case study"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              ref={rightArrowRef}
              onClick={(e) => { e.stopPropagation(); onNavigate('next') }}
              className={`absolute -right-14 top-1/2 -translate-y-1/2 z-[110] w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-button text-foreground/70 hover:text-foreground hover:bg-[#f8f8f8] hover:shadow-button-hover active:scale-[0.92] transition-all duration-150 ${
                pressedKey === 'right' ? 'scale-[0.92]' : ''
              }`}
              aria-label="Next case study"
            >
              <CaretRight size={16} weight="bold" />
            </button>

            {/* Modal content */}
            <div className="relative flex flex-col w-[70vw] max-h-[85vh] bg-background rounded-2xl shadow-elevated overflow-hidden">
              {/* Close button - top right */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/80 shadow-subtle text-foreground/50 hover:text-foreground hover:bg-white hover:shadow-card transition-all duration-200 z-20"
                aria-label="Close modal"
              >
                <X size={16} weight="bold" />
              </button>

              {/* Main content row */}
              <div className="flex flex-1 min-h-0">
                {/* Left side - Content (35%) */}
                <div
                  className="w-[35%] p-8 pb-20 overflow-y-auto border-r border-border/50 scrollbar-hide"
                  data-lenis-prevent
                >
              <motion.div
                key={`content-${caseStudyId}`}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={staggerItem} className="mb-6">
                  <span className="text-xs text-muted uppercase tracking-wider">{caseStudy.year}</span>
                  <h2 id="case-study-title" className="text-2xl font-heading font-semibold text-foreground mt-1">
                    {caseStudy.title}
                  </h2>
                  <p className="text-muted">{caseStudy.subtitle}</p>
                </motion.div>

                <motion.div variants={staggerItem} className="flex flex-wrap gap-2 mb-8">
                  {caseStudy.services.map((service, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-foreground/5 text-foreground/70 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </motion.div>

                <motion.div variants={staggerItem} className="mb-6">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted mb-2">Overview</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{caseStudy.overview}</p>
                </motion.div>

                <motion.div variants={staggerItem} className="mb-6">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted mb-2">Challenge</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{caseStudy.challenge}</p>
                </motion.div>

                <motion.div variants={staggerItem} className="mb-6">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted mb-2">Solution</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{caseStudy.solution}</p>
                </motion.div>

                <motion.div variants={staggerItem} className="mb-8">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted mb-3">Results</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {caseStudy.results.map((result, i) => (
                      <div key={i} className="text-center p-3 bg-foreground/5 rounded-xl">
                        <div className="text-xl font-semibold text-foreground">{result.metric}</div>
                        <div className="text-xs text-muted">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {caseStudy.testimonial && (
                  <motion.div variants={staggerItem} className="p-4 bg-foreground/5 rounded-xl">
                    <p className="text-sm text-foreground/70 italic mb-3">"{caseStudy.testimonial.quote}"</p>
                    <div className="text-xs">
                      <span className="font-medium text-foreground">{caseStudy.testimonial.author}</span>
                      <span className="text-muted"> · {caseStudy.testimonial.role}</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Right side - Images (65%) */}
            <div
              ref={imagesRef}
              className="w-[65%] pt-14 px-6 pb-6 overflow-y-auto bg-foreground/[0.02] scrollbar-hide"
              data-lenis-prevent
            >
              <div className="space-y-4">
                {caseStudy.images.map((image, i) => (
                  <motion.div
                    key={`${caseStudyId}-${i}`}
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="rounded-xl overflow-hidden shadow-card"
                  >
                    <img
                      src={image}
                      alt={`${caseStudy.title} - Image ${i + 1}`}
                      className="w-full h-auto"
                    />
                  </motion.div>
                ))}
              </div>
              </div>
              </div>

              {/* Keyboard legend bar - full width at bottom */}
              <div className="flex items-center justify-between px-6 py-3 bg-background border-t border-border/50">
                {/* Left - viewing count */}
                <span className="text-xs text-muted">
                  Viewing <span className="text-foreground font-medium">{(caseStudyId ?? 0) + 1}</span> of <span className="text-foreground font-medium">{caseStudies.length}</span> case studies
                </span>

                {/* Right - keyboard shortcuts */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onNavigate('prev')}
                    className="flex items-center gap-1.5 hover:opacity-70 transition-opacity duration-200"
                  >
                    <div className={`w-7 h-7 flex items-center justify-center rounded-lg bg-white/50 shadow-subtle transition-all duration-150 active:scale-[0.92] ${pressedKey === 'left' ? 'scale-[0.92] bg-white' : ''}`}>
                      <CaretLeft size={14} weight="bold" className="text-foreground/50" />
                    </div>
                    <span className="text-[10px] text-muted">Previous</span>
                  </button>

                  <button
                    onClick={() => onNavigate('next')}
                    className="flex items-center gap-1.5 hover:opacity-70 transition-opacity duration-200"
                  >
                    <div className={`w-7 h-7 flex items-center justify-center rounded-lg bg-white/50 shadow-subtle transition-all duration-150 active:scale-[0.92] ${pressedKey === 'right' ? 'scale-[0.92] bg-white' : ''}`}>
                      <CaretRight size={14} weight="bold" className="text-foreground/50" />
                    </div>
                    <span className="text-[10px] text-muted">Next</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        const container = (window as unknown as { __caseStudyImagesRef?: HTMLDivElement }).__caseStudyImagesRef
                        if (container) container.scrollBy({ top: -150, behavior: 'smooth' })
                      }}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg bg-white/50 shadow-subtle transition-all duration-150 hover:bg-white active:scale-[0.92] ${pressedKey === 'up' ? 'scale-[0.92] bg-white' : ''}`}
                    >
                      <ArrowUp size={14} weight="bold" className="text-foreground/50" />
                    </button>
                    <button
                      onClick={() => {
                        const container = (window as unknown as { __caseStudyImagesRef?: HTMLDivElement }).__caseStudyImagesRef
                        if (container) container.scrollBy({ top: 150, behavior: 'smooth' })
                      }}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg bg-white/50 shadow-subtle transition-all duration-150 hover:bg-white active:scale-[0.92] ${pressedKey === 'down' ? 'scale-[0.92] bg-white' : ''}`}
                    >
                      <ArrowDown size={14} weight="bold" className="text-foreground/50" />
                    </button>
                    <span className="text-[10px] text-muted">Scroll</span>
                  </div>

                  <button
                    onClick={onOpenSearch}
                    className="flex items-center gap-1.5 hover:opacity-70 transition-opacity duration-200"
                  >
                    <div className="h-7 flex items-center gap-1 px-2 rounded-lg bg-white/50 shadow-subtle">
                      <Command size={14} weight="bold" className="text-foreground/50" />
                      <span className="text-xs font-medium text-foreground/50">K</span>
                    </div>
                    <span className="text-[10px] text-muted">Search</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function SearchModal({
  isOpen,
  onClose,
  onSelectCaseStudy,
}: {
  isOpen: boolean
  onClose: () => void
  onSelectCaseStudy: (id: number) => void
}) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredCaseStudies = caseStudies.filter(
    (cs) =>
      cs.title.toLowerCase().includes(query.toLowerCase()) ||
      cs.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      cs.services.some((s) => s.toLowerCase().includes(query.toLowerCase()))
  )

  const categories = [...new Set(caseStudies.flatMap((cs) => cs.services))]
  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(query.toLowerCase())
  )

  // Total selectable items
  const totalItems = filteredCaseStudies.length + (query ? filteredCategories.length : 0)

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    if (!isOpen) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        onClose()
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        e.stopImmediatePropagation()
        setSelectedIndex((prev) => (prev + 1) % Math.max(totalItems, 1))
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        e.stopImmediatePropagation()
        setSelectedIndex((prev) => (prev - 1 + Math.max(totalItems, 1)) % Math.max(totalItems, 1))
      }

      if (e.key === 'Enter' && totalItems > 0) {
        e.preventDefault()
        e.stopImmediatePropagation()
        // If selected is a case study
        if (selectedIndex < filteredCaseStudies.length) {
          handleSelectCaseStudy(filteredCaseStudies[selectedIndex].id)
        } else {
          // It's a category - set as query
          const categoryIndex = selectedIndex - filteredCaseStudies.length
          setQuery(filteredCategories[categoryIndex])
        }
      }
    }

    if (isOpen) {
      // Use capture phase to intercept before other handlers
      document.addEventListener('keydown', handleKeydown, { capture: true })
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown, { capture: true })
    }
  }, [isOpen, onClose, totalItems, selectedIndex, filteredCaseStudies, filteredCategories])

  const handleSelectCaseStudy = (id: number) => {
    onSelectCaseStudy(id)
    onClose()
    setQuery('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search case studies"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Search modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-full max-w-lg bg-background rounded-2xl shadow-elevated overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
              <MagnifyingGlass size={20} weight="bold" className="text-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search case studies, categories..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted outline-none text-sm"
              />
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-foreground/5">
                <span className="text-xs text-muted">ESC</span>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {/* Case Studies */}
              {filteredCaseStudies.length > 0 && (
                <div className="mb-2">
                  <div className="px-2 py-1 text-xs font-medium text-muted uppercase tracking-wider">
                    Case Studies
                  </div>
                  {filteredCaseStudies.map((cs, index) => (
                    <button
                      key={cs.id}
                      onClick={() => handleSelectCaseStudy(cs.id)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 text-left ${
                        selectedIndex === index ? 'bg-foreground/5' : 'hover:bg-foreground/5'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={cs.images[0]}
                          alt={cs.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{cs.title}</div>
                        <div className="text-xs text-muted truncate">{cs.subtitle}</div>
                      </div>
                      <CaretRight size={14} className="text-muted" />
                    </button>
                  ))}
                </div>
              )}

              {/* Categories */}
              {filteredCategories.length > 0 && query && (
                <div>
                  <div className="px-2 py-1 text-xs font-medium text-muted uppercase tracking-wider">
                    Categories
                  </div>
                  {filteredCategories.map((cat, index) => {
                    const itemIndex = filteredCaseStudies.length + index
                    return (
                      <button
                        key={cat}
                        onClick={() => setQuery(cat)}
                        onMouseEnter={() => setSelectedIndex(itemIndex)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 text-left ${
                          selectedIndex === itemIndex ? 'bg-foreground/5' : 'hover:bg-foreground/5'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center flex-shrink-0">
                          <Sparkle size={14} className="text-foreground/50" />
                        </div>
                        <span className="text-sm text-foreground">{cat}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* No results */}
              {query && filteredCaseStudies.length === 0 && filteredCategories.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-muted">
                  No results found for "{query}"
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

const rotatingWords = ['Startups', 'Agencies', 'Founders']

function RotatingText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className="inline-block relative h-[1.2em] overflow-hidden align-bottom"
      role="text"
      aria-label={`For ${rotatingWords.join(', ')}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-gradient-apple"
          aria-hidden="true"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const email = 'info@ehdcdigital.com'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative">
      {/* Tooltip */}
      <div
        className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-medium text-white bg-foreground rounded-md whitespace-nowrap transition-all duration-300 ease-out pointer-events-none ${
          copied
            ? 'opacity-100 scale-100 blur-0 translate-y-0'
            : 'opacity-0 scale-[0.85] blur-[4px] translate-y-1'
        }`}
      >
        Copied to clipboard
      </div>
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Email copied to clipboard' : `Copy email address ${email}`}
        className="inline-flex items-center gap-2 h-9 px-4 text-xs font-medium bg-white text-foreground/70 shadow-button rounded-[13px] hover:bg-[#f8f8f8] hover:text-foreground hover:shadow-button-hover transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="relative w-[14px] h-[14px]" aria-hidden="true">
        {/* Check icon - appears when copied */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-[opacity,filter,transform] duration-300 ease-in-out will-change-[opacity,filter,transform] ${
            copied
              ? 'scale-100 opacity-100 blur-0'
              : 'scale-[0.25] opacity-0 blur-[4px]'
          }`}
        >
          <svg
            className="w-[14px] h-[14px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.774 10.1333C16.1237 9.70582 16.0607 9.0758 15.6332 8.72607C15.2058 8.37635 14.5758 8.43935 14.226 8.86679L10.4258 13.5116L9.20711 12.2929C8.81658 11.9024 8.18342 11.9024 7.79289 12.2929C7.40237 12.6834 7.40237 13.3166 7.79289 13.7071L9.79289 15.7071C9.99267 15.9069 10.2676 16.0129 10.5498 15.9988C10.832 15.9847 11.095 15.8519 11.274 15.6333L15.774 10.1333Z"
              fill="currentColor"
            />
          </svg>
        </div>
        {/* Copy icon - default state */}
        <div
          className={`transition-[opacity,filter,transform] duration-300 ease-in-out will-change-[opacity,filter,transform] ${
            copied
              ? 'scale-[0.25] opacity-0 blur-[4px]'
              : 'scale-100 opacity-100 blur-0'
          }`}
        >
          <svg
            className="w-[14px] h-[14px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 5.25C22 3.45507 20.5449 2 18.75 2H11.25C9.45508 2 8 3.45507 8 5.25V8H5.25C3.45508 8 2 9.45507 2 11.25V18.75C2 20.5449 3.45507 22 5.25 22H12.75C14.5449 22 16 20.5449 16 18.75V16H18.75C20.5449 16 22 14.5449 22 12.75V5.25ZM16 14H18.75C19.4404 14 20 13.4404 20 12.75V5.25C20 4.55964 19.4404 4 18.75 4H11.25C10.5596 4 10 4.55964 10 5.25V8H12.75C14.5449 8 16 9.45507 16 11.25V14Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
        <span>{email}</span>
      </button>
    </div>
  )
}

const services = [
  {
    name: 'Web Design',
    description: 'Strategic UI/UX that converts visitors into paying customers.',
    icon: Palette,
  },
  {
    name: 'Webflow Development',
    description: 'Fast, scalable sites you can edit yourself—no code needed.',
    icon: Code,
  },
  {
    name: 'Branding',
    description: 'Memorable identity that builds trust and stands out.',
    icon: Sparkle,
  },
  {
    name: 'Automations',
    description: 'Smart workflows that save hours and eliminate busywork.',
    icon: GitBranch,
  },
]

const testimonials = [
  {
    quote: "We've done multiple projects together and Erik always nails it. Great communication, fast turnaround, and the quality is consistently solid.",
    author: 'David Stolarik',
    company: 'Webyst',
    avatar: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/68078611e211472f5bc30172_davidstol.jpeg',
  },
  {
    quote: "We've been working with Erik for 4 months now, and he is truly a professional. The phrase 'it can't be done' doesn't exist for him.",
    author: 'Filip Langštein',
    company: 'Birdline',
    avatar: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/679beb4e69fe590599b7f9cd_filipl.jpeg',
  },
  {
    quote: "Creativity, and high-level consulting. A young, extremely talented guy built our website exceptionally well and really quickly.",
    author: 'Daniel Celiga',
    company: 'detaility',
    avatar: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/679bebf134a49f821975b1e5_danielc.jpeg',
  },
  {
    quote: "I've worked with Erik on multiple Webflow projects seamlessly. Great communication, clean work, always delivers beyond expectations.",
    author: 'Vlad Marchyuk',
    company: 'Work For All',
    avatar: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/679beb00124275a24f0a3d1c_vlad.jpg',
  },
  {
    quote: "A highly professional approach with skills beyond our expectations. Fresh ideas helped our company present itself positively.",
    author: 'Adam Slobodník',
    company: 'JustADS',
    avatar: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/68089747a24fdd87d3af9d74_WhatsApp%20Image%202025-04-22%20at%2019.13.45%20vel%CC%8Ckej%20vel%CC%8Ckosti.jpeg',
  },
  {
    quote: "Erik helped out with a small section of our site, and did an awesome job. Quick, clean work and super easy to collaborate with.",
    author: 'Jozef Šimko',
    company: 'Readmio',
    avatar: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/679beadc1ced67da396a0e0b_simkojozef.jpeg',
  },
  {
    quote: "A highly professional approach with skills beyond our expectations. Erik perfectly took on the project assignment, bringing in fresh ideas.",
    author: 'Roman Kuklica',
    company: 'Work For All',
    avatar: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/679beb2b18beef5060e1dc27_romank.jpg',
  },
  {
    quote: "Working with Erik has been a breeze. Great communication, deep understanding of our needs, and a holistic approach that led to smart solutions.",
    author: 'Filip Papranec',
    company: 'Digitaliko',
    avatar: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680781cfe3866088c037435a_filippapranec.png',
  },
  {
    quote: "I recently had the pleasure of working with Erik on a web development project, and I can confidently say that he is an exceptional developer.",
    author: 'Omar Houchaimi',
    company: 'Arachnadia',
    avatar: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/67260d1fd542430bf246b31e_Oct%2030%20Screenshot%20from%20TinyJPG.png',
  },
]

// Improved animation variants with blur (from jakub.kr article)
const fadeInBlur = {
  initial: {
    opacity: 0,
    y: 24,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const staggerItem = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// Subtle exit animation (from article)
const testimonialVariants = {
  enter: {
    opacity: 0,
    y: 16,
    filter: 'blur(8px)',
  },
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -12, // Subtle exit - smaller movement than enter
    filter: 'blur(4px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const intervalDuration = 5000

  useEffect(() => {
    setProgress(0)
    const startTime = Date.now()

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / intervalDuration) * 100, 100)
      setProgress(newProgress)
    }, 50)

    const slideInterval = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, intervalDuration)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(slideInterval)
    }
  }, [current])

  const handleDotClick = (index: number) => {
    setCurrent(index)
  }

  return (
    <div className="relative" role="region" aria-label="Client testimonials carousel">
      <div className="overflow-hidden min-h-[140px]" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          <motion.figure
            key={current}
            variants={testimonialVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <blockquote className="text-sm text-foreground/70 leading-relaxed text-pretty">
              "{testimonials[current].quote}"
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <img
                src={testimonials[current].avatar}
                alt={testimonials[current].author}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <cite className="text-sm font-medium text-foreground not-italic">
                  {testimonials[current].author}
                </cite>
                <p className="text-xs text-muted">
                  {testimonials[current].company}
                </p>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Progress dots with fill animation */}
      <div className="flex gap-1.5 mt-6" role="tablist" aria-label="Testimonial navigation">
        {testimonials.map((testimonial, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`View testimonial from ${testimonial.author}`}
            className={`relative h-1 rounded-full overflow-hidden transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-1 ${
              i === current ? 'w-6 bg-foreground/20' : 'w-1.5 bg-foreground/20 hover:bg-foreground/40'
            }`}
          >
            {i === current && (
              <span
                className="absolute top-0 left-0 h-full bg-foreground rounded-full transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function SplitLayout() {
  const [aboutModalOpen, setAboutModalOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [caseStudyModal, setCaseStudyModal] = useState<{ isOpen: boolean; id: number | null }>({
    isOpen: false,
    id: null,
  })

  const openCaseStudy = (id: number) => {
    setCaseStudyModal({ isOpen: true, id })
  }

  const closeCaseStudy = () => {
    setCaseStudyModal({ isOpen: false, id: null })
  }

  const navigateCaseStudy = (direction: 'prev' | 'next') => {
    if (caseStudyModal.id === null) return
    const newId = direction === 'prev'
      ? (caseStudyModal.id - 1 + caseStudies.length) % caseStudies.length
      : (caseStudyModal.id + 1) % caseStudies.length
    setCaseStudyModal({ isOpen: true, id: newId })
  }

  return (
    <>
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
      <CaseStudyModal
        isOpen={caseStudyModal.isOpen}
        onClose={closeCaseStudy}
        caseStudyId={caseStudyModal.id}
        onNavigate={navigateCaseStudy}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectCaseStudy={openCaseStudy}
      />
    <div className="relative">
      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        {/* Left Side - Sticky Hero (20%) */}
        <aside
          className="lg:w-[28%] xl:w-[24%] lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto bg-background grain-overlay scrollbar-hide"
          style={{ borderRight: '0.5px solid var(--border)' }}
          aria-label="About ehdcDigital"
          data-lenis-prevent
        >

          {/* Content */}
          <div className="flex flex-col px-6 lg:px-8 py-8 lg:h-full">
            {/* Logo and Socials */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-12 flex items-center justify-between relative z-[60]"
            >
              <div className="relative group z-[60]">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
                  aria-label="Scroll to top - ehdcDigital"
                >
                  <img
                    src="https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg"
                    alt="Erik Hudec - Founder of ehdcDigital"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-foreground">ehdcDigital</span>
                </button>

                {/* Hover card */}
                <div className="absolute top-full left-0 pt-2 z-[60] opacity-0 scale-95 blur-[4px] translate-y-[-4px] pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:blur-0 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out">
                  <div className="bg-[#ffffff] rounded-xl shadow-card p-3 whitespace-nowrap">
                    <span className="text-xs text-foreground/70">Hey, I'm Erik. </span>
                    <button
                      onClick={() => setAboutModalOpen(true)}
                      className="text-xs text-foreground font-medium underline underline-offset-2 hover:text-foreground/70 transition-colors duration-200"
                    >
                      Get to know me
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Follow me</span>
                <div className="flex items-center gap-1">
                  <a
                    href="https://x.com/HudecErik"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow on X (Twitter)"
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/50 shadow-subtle text-foreground/50 hover:text-foreground hover:bg-white hover:shadow-card transition-all duration-200"
                  >
                    <XLogo size={16} weight="bold" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/erik-hudec-091b0612b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Connect on LinkedIn"
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/50 shadow-subtle text-foreground/50 hover:text-foreground hover:bg-white hover:shadow-card transition-all duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.94 5C6.94 5.53043 6.72893 6.03914 6.35386 6.41421C5.97879 6.78929 5.47008 7 4.94 7C4.40957 7 3.90086 6.78929 3.52579 6.41421C3.15071 6.03914 2.94 5.53043 2.94 5C2.94 4.46957 3.15071 3.96086 3.52579 3.58579C3.90086 3.21071 4.40957 3 4.94 3C5.47008 3 5.97879 3.21071 6.35386 3.58579C6.72893 3.96086 6.94 4.46957 6.94 5ZM7 8.48H3V21H7V8.48ZM13.32 8.48H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 6.9 14.94 7.13 13.28 10.16L13.32 8.48Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="flex flex-col lg:flex-1"
            >
              <motion.div
                variants={staggerItem}
                className="flex items-center gap-2 mb-4"
              >
                <img
                  src="https://dhygzobemt712.cloudfront.net/Mark/Mark_Logo_Blue.svg"
                  alt="Webflow"
                  width="16"
                  height="16"
                />
                <span className="text-xs font-medium text-muted">
                  Webflow Certified Partner
                </span>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="text-2xl lg:text-3xl xl:text-3xl font-heading font-semibold text-foreground tracking-tight leading-[1.2]"
              >
                High-converting websites
                <br />
                <span className="text-muted">For </span><RotatingText />
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="mt-4 text-sm text-muted leading-relaxed"
              >
                I design and build websites that turn visitors into customers—so you can grow faster, sell more, and stop losing leads to outdated design.
              </motion.p>

              {/* CTAs - Pill style */}
              <motion.div
                variants={staggerItem}
                className="mt-5 flex flex-wrap gap-2"
              >
                <a
                  href="https://cal.com/ehdcdigital/needawebsite"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book a call with Erik Hudec (opens in new tab)"
                  className="group relative inline-flex items-center h-9 px-4 text-xs font-medium bg-[#0f172a] text-white shadow-button rounded-[13px] hover:bg-[#1e293b] hover:shadow-button-hover focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200"
                >
                  {/* Image - hidden by default, appears on hover */}
                  <div className="relative z-10 w-0 opacity-0 group-hover:w-7 group-hover:opacity-100 group-hover:mr-2 transition-all duration-300 ease-out overflow-hidden" aria-hidden="true">
                    <img
                      src="https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg"
                      alt=""
                      className="w-7 h-7 rounded-[4px] object-cover"
                    />
                  </div>
                  <span className="relative z-10">Book a call</span>
                  {/* Availability dot */}
                  <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-2" aria-label="Available" role="status" />
                </a>
                <CopyEmailButton />
              </motion.div>

              {/* Services list */}
              <motion.nav variants={staggerContainer} className="mt-8" aria-label="Services offered">
                <motion.h2
                  variants={staggerItem}
                  className="text-xs font-medium tracking-[0.15em] text-muted uppercase mb-4"
                >
                  Services
                </motion.h2>
                <ul className="space-y-4" role="list">
                  {services.map((service) => (
                    <motion.li
                      key={service.name}
                      variants={staggerItem}
                      className="group"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-lg bg-white/50 shadow-subtle flex items-center justify-center text-foreground/50 group-hover:bg-white group-hover:shadow-card group-hover:text-foreground transition-all duration-200 flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        >
                          <service.icon size={16} weight="bold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-foreground group-hover:text-foreground/80 transition-colors duration-300">
                            {service.name}
                          </h3>
                          <p className="text-xs text-muted leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>

              {/* Testimonial Slider */}
              <motion.section
                variants={fadeInBlur}
                className="mt-10 pt-8 border-t border-border/50"
                aria-label="Client testimonials"
              >
                <h2 className="text-xs font-medium tracking-[0.15em] text-muted uppercase mb-4">
                  What clients say
                </h2>
                <TestimonialSlider />
              </motion.section>
            </motion.div>

            {/* Partner Logos */}
            <motion.section
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-10 pt-8 lg:mt-auto"
              aria-label="Trusted clients"
            >
              <h2 className="text-xs font-medium tracking-[0.15em] text-muted uppercase mb-4">
                Trusted by
              </h2>
              <ul className="flex flex-wrap items-center gap-4" role="list">
                {[
                  { name: 'Webyst', logo: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/67260b22b2f66d9909c9d445_webyst.svg' },
                  { name: 'Birdline', logo: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/67260c1857a3cb20b408ff6e_birdline.svg' },
                  { name: 'Readmio', logo: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/67260c8faca8c9d3704b1789_readmio.png' },
                  { name: 'Autovea', logo: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/67260de538fb9808659d1b47_Black%20logo%20-%20no%20background%20(1).svg' },
                  { name: 'JustADS', logo: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/67228e7d0da8c33e7925b157_JustADS.svg', scale: 1.5 },
                  { name: 'Donivo', logo: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/6726496a6ebda18a3e5a3936_donivostk.svg' },
                  { name: 'Arachnadia', logo: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/67264a0f38fb980865c89b34_Logo_Black.svg' },
                ].map((company) => (
                  <li key={company.name} className="w-16 h-6 flex items-center justify-center">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-w-full max-h-full object-contain opacity-40 grayscale hover:opacity-60 transition-opacity duration-200"
                      style={company.scale ? { transform: `scale(${company.scale})` } : undefined}
                    />
                  </li>
                ))}
              </ul>
            </motion.section>

          </div>
        </aside>

        {/* Right Side - Scrollable Projects (80%) */}
        <section className="lg:w-[72%] xl:w-[76%] bg-background relative" aria-label="Portfolio">
          {/* Progressive blur at bottom - stacked layers */}
          <div className="fixed bottom-0 right-0 lg:w-[72%] xl:w-[76%] h-24 pointer-events-none z-50">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)', opacity: 0.8 }} />
            <div
              className="absolute inset-x-0 bottom-0 h-[30%]"
              style={{ backdropFilter: 'blur(0.5px)', WebkitBackdropFilter: 'blur(0.5px)' }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-[60%]"
              style={{ backdropFilter: 'blur(1px)', WebkitBackdropFilter: 'blur(1px)' }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-full"
              style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)', maskImage: 'linear-gradient(to top, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)' }}
            />
          </div>
          <div className="p-6 lg:p-8">
            <motion.ul
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="space-y-6"
              role="list"
              aria-label="Project portfolio"
            >
              {projects.map((project, index) => {
                // TODO: Set to true to enable case studies feature
                const CASE_STUDIES_ENABLED = false
                const hasCaseStudy = CASE_STUDIES_ENABLED && project.caseStudyId !== undefined

                const handleClick = () => {
                  if (hasCaseStudy) {
                    openCaseStudy(project.caseStudyId!)
                  }
                }

                return (
                  <motion.li
                    key={project.title}
                    variants={staggerItem}
                    className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-card image-outline group"
                    aria-label={`Project ${index + 1}: ${project.title}`}
                  >
                    {hasCaseStudy ? (
                      <button
                        onClick={handleClick}
                        className="absolute inset-0 w-full h-full cursor-pointer z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-inset"
                        aria-label={`View ${project.title} case study`}
                      >
                        <span className="sr-only">View case study</span>
                      </button>
                    ) : null}
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
                    {/* Hover overlay for case study items */}
                    {hasCaseStudy && (
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 inline-flex items-center gap-2 h-9 px-4 text-xs font-medium bg-white text-foreground/70 shadow-button rounded-[13px]">
                          View Case Study
                        </span>
                      </div>
                    )}
                  </motion.li>
                )
              })}
            </motion.ul>

          </div>
        </section>
      </div>
    </div>
    </>
  )
}
