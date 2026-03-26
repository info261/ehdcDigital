'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { projects } from '@/data/content'
import { Logo } from '@/components/Logo'
import {
  Palette,
  Code,
  Sparkle,
  GitBranch,
  Copy,
  Check,
  XLogo,
  LinkedinLogo,
} from '@phosphor-icons/react'

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
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Email copied to clipboard' : `Copy email address ${email}`}
      className="inline-flex items-center gap-2 h-9 px-4 text-xs font-medium bg-white text-foreground/70 shadow-button rounded-[13px] hover:bg-[#f8f8f8] hover:text-foreground hover:shadow-button-hover transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 focus:ring-offset-background"
    >
      {copied ? (
        <Check size={14} weight="bold" className="text-green-500" aria-hidden="true" />
      ) : (
        <Copy size={14} weight="duotone" aria-hidden="true" />
      )}
      <span>{copied ? 'Copied!' : email}</span>
    </button>
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
  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        {/* Left Side - Sticky Hero (20%) */}
        <aside
          className="lg:w-[28%] xl:w-[24%] lg:h-screen lg:sticky lg:top-0 bg-background grain-overlay"
          style={{ borderRight: '0.5px solid var(--border)' }}
          aria-label="About ehdcDigital"
        >

          {/* Content */}
          <div className="h-full flex flex-col px-6 lg:px-8 py-24 lg:py-8">
            {/* Logo and Socials */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-12 flex items-center justify-between"
            >
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 focus:ring-offset-background rounded-full"
                aria-label="Scroll to top - ehdcDigital"
              >
                <img
                  src="https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg"
                  alt="Erik Hudec - Founder of ehdcDigital"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-semibold text-foreground">ehdcDigital</span>
              </button>
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
                    <LinkedinLogo size={16} weight="bold" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="flex-1 flex flex-col justify-center"
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
                      className="w-7 h-7 rounded-full object-cover"
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
              className="mt-auto pt-8"
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

          </div>
        </section>
      </div>
    </div>
  )
}
