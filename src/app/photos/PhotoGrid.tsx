'use client'

import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import type { Photo } from '@/lib/photos'

/** How long the overlay takes to fade out before it is unmounted. */
const EXIT_MS = 200

function Tile({ photo, index, onOpen }: { photo: Photo; index: number; onOpen: () => void }) {
  const [loaded, setLoaded] = useState(false)

  // A cached image can finish decoding before React attaches onLoad, which would
  // otherwise leave the tile faded out for good.
  const markIfCached = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) setLoaded(true)
  }, [])

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.06 }}
      className="mb-4 break-inside-avoid sm:mb-6"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${photo.alt}`}
        className="group block w-full rounded-2xl bg-[#f1f5f9] p-3 transition-shadow duration-300 hover:shadow-card sm:p-4"
      >
        <div className="overflow-hidden rounded-[10px]">
          <img
            ref={markIfCached}
            src={photo.url}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            // Reserving the ratio up front is what keeps the masonry columns
            // from reflowing as images stream in.
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            className={`w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </button>
    </motion.figure>
  )
}

function Lightbox({
  photos,
  index,
  leaving,
  onClose,
  onStep,
}: {
  photos: Photo[]
  index: number
  leaving: boolean
  onClose: () => void
  onStep: (delta: number) => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }

    document.addEventListener('keydown', onKey)
    // Lenis keeps scrolling the page behind the overlay unless it is paused.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).__lenis
    lenis?.stop()

    return () => {
      document.removeEventListener('keydown', onKey)
      lenis?.start()
    }
  }, [onClose, onStep])

  const photo = photos[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 ${
        leaving
          ? 'animate-[photo-fade-out_200ms_ease-out_both]'
          : 'animate-[photo-fade-in_200ms_ease-out_both]'
      }`}
    >
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Keyed so stepping between photos remounts the node and replays the
          entrance animation. */}
      <img
        key={photo.url}
        src={photo.url}
        alt={photo.alt}
        className="relative max-h-full max-w-full animate-[photo-zoom-in_300ms_ease-out_both] rounded-2xl object-contain shadow-elevated"
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-foreground shadow-subtle backdrop-blur transition-all duration-200 hover:bg-white hover:shadow-card sm:right-8 sm:top-8"
      >
        <X size={16} weight="bold" />
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Previous photo"
            className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-foreground shadow-subtle backdrop-blur transition-all duration-200 hover:bg-white hover:shadow-card sm:left-8"
          >
            <CaretLeft size={16} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label="Next photo"
            className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-foreground shadow-subtle backdrop-blur transition-all duration-200 hover:bg-white hover:shadow-card sm:right-8"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </>
      )}
    </div>
  )
}

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const [leaving, setLeaving] = useState(false)
  const exitTimer = useRef<number | null>(null)

  // The overlay is mounted and unmounted here rather than by AnimatePresence,
  // which does not release its children on this React/framer-motion pairing.
  const close = useCallback(() => {
    setLeaving(true)
    if (exitTimer.current) window.clearTimeout(exitTimer.current)
    exitTimer.current = window.setTimeout(() => {
      setOpen(null)
      setLeaving(false)
      exitTimer.current = null
    }, EXIT_MS)
  }, [])

  const openAt = useCallback((index: number) => {
    if (exitTimer.current) {
      window.clearTimeout(exitTimer.current)
      exitTimer.current = null
    }
    setLeaving(false)
    setOpen(index)
  }, [])

  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null ? current : (current + delta + photos.length) % photos.length
      ),
    [photos.length]
  )

  useEffect(() => () => {
    if (exitTimer.current) window.clearTimeout(exitTimer.current)
  }, [])

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 sm:gap-6 lg:columns-3">
        {photos.map((photo, index) => (
          <Tile
            key={photo.pathname}
            photo={photo}
            index={index}
            onOpen={() => openAt(index)}
          />
        ))}
      </div>

      {open !== null && (
        <Lightbox
          photos={photos}
          index={open}
          leaving={leaving}
          onClose={close}
          onStep={step}
        />
      )}
    </>
  )
}
