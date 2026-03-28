'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { projects } from '@/data/content'
import { Logo } from '@/components/Logo'
import {
  Palette,
  Code,
  Sparkle,
  GitBranch,
  XLogo,
  X,
  Check,
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

function PricingCard({
  title,
  timeline,
  basePrice,
  addOns,
  features,
  isCustom = false,
}: {
  title: string
  timeline: string
  basePrice: number
  addOns: { name: string; price: number }[]
  features: string[]
  isCustom?: boolean
}) {
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([])

  const toggleAddOn = (index: number) => {
    setSelectedAddOns((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const totalPrice = basePrice + selectedAddOns.reduce((sum, i) => sum + addOns[i].price, 0)

  return (
    <div className="bg-[#ffffff] rounded-2xl shadow-card p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <span className="text-xs text-muted bg-background px-2 py-1 rounded-full">{timeline}</span>
      </div>

      {isCustom ? (
        <div className="mb-5">
          <span className="text-3xl font-semibold text-foreground">Let's talk</span>
        </div>
      ) : (
        <div className="mb-5">
          <span className="text-3xl font-semibold text-foreground">€{totalPrice.toLocaleString()}</span>
          <span className="text-muted ml-1">+</span>
        </div>
      )}

      {/* Add-ons */}
      {!isCustom && addOns.length > 0 && (
        <div className="space-y-2 mb-5">
          {addOns.map((addOn, i) => (
            <button
              key={i}
              onClick={() => toggleAddOn(i)}
              className={`flex items-center justify-between w-full p-3 rounded-xl text-xs font-medium transition-all duration-200 ${
                selectedAddOns.includes(i)
                  ? 'bg-foreground text-white shadow-button'
                  : 'bg-background text-foreground/70 hover:bg-foreground/5'
              }`}
            >
              <span>{addOn.name}</span>
              <span>+€{addOn.price.toLocaleString()}</span>
            </button>
          ))}
        </div>
      )}

      <ul className="space-y-2.5 mb-6 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/70">
            <Check size={16} weight="bold" className="text-foreground mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href="https://cal.com/ehdcdigital/needawebsite"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 h-11 px-4 text-sm font-medium bg-foreground text-white rounded-[13px] shadow-button hover:bg-foreground/90 hover:shadow-button-hover transition-all duration-200 w-full"
      >
        {isCustom ? 'Get in touch' : 'Get started'}
      </a>
    </div>
  )
}

function PricingSection() {
  return (
    <section className="py-20" aria-label="Pricing">
      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-3">
          Simple, transparent pricing
        </h2>
        <p className="text-muted max-w-lg mx-auto">
          Design only or full development—pick what you need. Add-ons available for each package.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="grid md:grid-cols-3 gap-4"
      >
        <PricingCard
          title="Landing Page"
          timeline="1-2 weeks"
          basePrice={1500}
          addOns={[
            { name: 'Webflow Development', price: 1000 },
            { name: 'Copywriting', price: 300 },
          ]}
          features={[
            'Single page design',
            'Desktop, tablet & mobile',
            'Figma source files',
            'SEO optimized structure',
            '2 revision rounds',
          ]}
        />
        <PricingCard
          title="Website"
          timeline="3-4 weeks"
          basePrice={3500}
          addOns={[
            { name: 'Webflow Development', price: 2500 },
            { name: 'CMS Setup', price: 500 },
            { name: 'Custom Animations', price: 800 },
          ]}
          features={[
            'Up to 7 unique pages',
            'Desktop, tablet & mobile',
            'Figma source files',
            'SEO & performance optimized',
            '3 revision rounds',
            'Style guide included',
          ]}
        />
        <PricingCard
          title="Website + Brand"
          timeline="5-6 weeks"
          basePrice={0}
          addOns={[]}
          features={[
            'Full brand identity',
            'Logo & brand guidelines',
            'Complete website design',
            'Webflow development',
            'CMS & automations setup',
            'Unlimited revisions',
            'Priority support',
          ]}
          isCustom
        />
      </motion.div>
    </section>
  )
}

export default function SplitLayout() {
  const [aboutModalOpen, setAboutModalOpen] = useState(false)

  return (
    <>
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
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
              {projects.map((project, index) => (
                <motion.li
                  key={project.title}
                  variants={staggerItem}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-card image-outline"
                  aria-label={`Project ${index + 1}: ${project.title}`}
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
                </motion.li>
              ))}
            </motion.ul>

            {/* Pricing Section */}
            <PricingSection />
          </div>
        </section>
      </div>
    </div>
    </>
  )
}
