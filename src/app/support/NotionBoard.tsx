'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { initialColumns, type BoardColumn, type BoardColumnColor, type BoardTag } from './content'

/* ---------- Notion's light-theme palette ---------- */

const N = {
  text: '#37352F',
  textMuted: '#787774',
  textFaint: 'rgba(55, 53, 47, 0.45)',
  border: 'rgba(55, 53, 47, 0.09)',
  hover: 'rgba(55, 53, 47, 0.06)',
  cardShadow: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px',
  liftShadow: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 12px 32px',
  blue: '#2383E2',
} as const

const COLUMN_PILL: Record<BoardColumnColor, { bg: string; color: string }> = {
  gray: { bg: '#E3E2E0', color: '#32302C' },
  blue: { bg: '#D3E5EF', color: '#183347' },
  yellow: { bg: '#FDECC8', color: '#402C1B' },
  green: { bg: '#DBEDDB', color: '#1C3829' },
}

const TAG_PILL: Record<BoardTag, { bg: string; color: string; label: string }> = {
  small: { bg: '#E3E2E0', color: '#32302C', label: 'Small' },
  build: { bg: '#E8DEEE', color: '#412454', label: 'Bigger thing' },
  urgent: { bg: '#FFE2DD', color: '#5D1715', label: 'Urgent' },
}

/* ---------- drag state ---------- */

type Pending = {
  cardId: string
  fromColumn: string
  startX: number
  startY: number
  offsetX: number
  offsetY: number
  width: number
  height: number
  touch: boolean
  armed: boolean
}

type Drag = {
  cardId: string
  offsetX: number
  offsetY: number
  width: number
  height: number
  x: number
  y: number
  overColumn: string
  overIndex: number
}

const MOUSE_THRESHOLD = 4
const TOUCH_CANCEL_THRESHOLD = 10
const LONG_PRESS_MS = 200

export default function NotionBoard() {
  const [columns, setColumns] = useState<BoardColumn[]>(initialColumns)
  const [drag, setDrag] = useState<Drag | null>(null)

  const pending = useRef<Pending | null>(null)
  const dragRef = useRef<Drag | null>(null)
  const longPress = useRef<ReturnType<typeof setTimeout> | null>(null)
  const columnRefs = useRef(new Map<string, HTMLDivElement>())
  const cardRefs = useRef(new Map<string, HTMLDivElement>())
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const autoScroll = useRef<number | null>(null)
  const edge = useRef(0)

  /* `drag` drives rendering; `dragRef` is the synchronous truth the pointer
     handlers read and write, since events can fire between React renders. */
  const setDragState = useCallback((next: Drag | null) => {
    dragRef.current = next
    setDrag(next)
  }, [])

  /* The dragged card is lifted out of the flow; this is the board as rendered,
     with a gap held open at the drop position. */
  const view = columns.map((column) => ({
    ...column,
    cards: column.cards.filter((card) => card.id !== drag?.cardId),
  }))

  const dragged = drag
    ? columns.flatMap((c) => c.cards).find((card) => card.id === drag.cardId) ?? null
    : null

  /* ---------- where would it land? ---------- */

  const resolveTarget = useCallback((x: number, y: number, cardId: string) => {
    let overColumn: string | null = null

    for (const [id, el] of columnRefs.current) {
      const rect = el.getBoundingClientRect()
      if (x >= rect.left && x <= rect.right) {
        overColumn = id
        break
      }
    }
    // Outside every column horizontally — snap to the nearest one.
    if (!overColumn) {
      let best = Infinity
      for (const [id, el] of columnRefs.current) {
        const rect = el.getBoundingClientRect()
        const distance = x < rect.left ? rect.left - x : x - rect.right
        if (distance < best) {
          best = distance
          overColumn = id
        }
      }
    }
    if (!overColumn) return null

    const column = columns.find((c) => c.id === overColumn)
    if (!column) return null

    // Index = how many settled cards sit above the pointer.
    const siblings = column.cards.filter((card) => card.id !== cardId)
    let overIndex = siblings.length
    for (let i = 0; i < siblings.length; i++) {
      const el = cardRefs.current.get(siblings[i].id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (y < rect.top + rect.height / 2) {
        overIndex = i
        break
      }
    }

    return { overColumn, overIndex }
  }, [columns])

  /* ---------- commit ---------- */

  const commit = useCallback((current: Drag) => {
    setColumns((previous) => {
      const card = previous.flatMap((c) => c.cards).find((c) => c.id === current.cardId)
      if (!card) return previous

      return previous.map((column) => {
        const without = column.cards.filter((c) => c.id !== current.cardId)
        if (column.id !== current.overColumn) return { ...column, cards: without }

        const next = [...without]
        next.splice(Math.min(current.overIndex, next.length), 0, card)
        return { ...column, cards: next }
      })
    })
  }, [])

  /* ---------- pointer plumbing ---------- */

  useEffect(() => {
    function stopLenis(stop: boolean) {
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } })
        .__lenis
      if (!lenis) return
      if (stop) lenis.stop()
      else lenis.start()
    }

    // A drag that travels outside the board would otherwise start selecting
    // the surrounding page text.
    function lockSelection(lock: boolean) {
      document.body.style.userSelect = lock ? 'none' : ''
    }

    function begin(p: Pending, x: number, y: number) {
      p.armed = true
      stopLenis(true)
      lockSelection(true)
      const target = resolveTarget(x, y, p.cardId)
      setDragState({
        cardId: p.cardId,
        offsetX: p.offsetX,
        offsetY: p.offsetY,
        width: p.width,
        height: p.height,
        x,
        y,
        overColumn: target?.overColumn ?? p.fromColumn,
        overIndex: target?.overIndex ?? 0,
      })
    }

    function onMove(e: PointerEvent) {
      const p = pending.current
      if (!p) return

      const dx = e.clientX - p.startX
      const dy = e.clientY - p.startY

      if (!p.armed) {
        if (p.touch) {
          // A touch that travels before the hold completes is a scroll, not a drag.
          if (Math.hypot(dx, dy) > TOUCH_CANCEL_THRESHOLD) {
            if (longPress.current) clearTimeout(longPress.current)
            pending.current = null
          }
          return
        }
        if (Math.hypot(dx, dy) < MOUSE_THRESHOLD) return
        begin(p, e.clientX, e.clientY)
        return
      }

      const previous = dragRef.current
      if (!previous) return
      const target = resolveTarget(e.clientX, e.clientY, p.cardId)
      setDragState({
        ...previous,
        x: e.clientX,
        y: e.clientY,
        overColumn: target?.overColumn ?? previous.overColumn,
        overIndex: target?.overIndex ?? previous.overIndex,
      })

      // Nudge the board sideways when dragging against its edge.
      const scroller = scrollerRef.current
      if (scroller) {
        const rect = scroller.getBoundingClientRect()
        const zone = 56
        if (e.clientX < rect.left + zone) edge.current = -1
        else if (e.clientX > rect.right - zone) edge.current = 1
        else edge.current = 0
      }
    }

    function onUp() {
      const p = pending.current
      if (longPress.current) clearTimeout(longPress.current)
      if (p?.armed) {
        const current = dragRef.current
        if (current) commit(current)
        stopLenis(false)
        lockSelection(false)
      }
      // Cleared unconditionally so a drag can never be left stuck on screen.
      setDragState(null)
      pending.current = null
      edge.current = 0
    }

    // Non-passive so an armed touch drag can suppress the page scroll.
    function onTouchMove(e: TouchEvent) {
      if (pending.current?.armed) e.preventDefault()
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      window.removeEventListener('touchmove', onTouchMove)
      if (longPress.current) clearTimeout(longPress.current)
    }
  }, [resolveTarget, commit, setDragState])

  /* Edge auto-scroll runs off its own frame loop while a drag is live. */
  useEffect(() => {
    if (!drag) return
    function step() {
      if (edge.current !== 0 && scrollerRef.current) {
        scrollerRef.current.scrollLeft += edge.current * 10
      }
      autoScroll.current = requestAnimationFrame(step)
    }
    autoScroll.current = requestAnimationFrame(step)
    return () => {
      if (autoScroll.current) cancelAnimationFrame(autoScroll.current)
    }
  }, [drag])

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>, cardId: string, columnId: string) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const p: Pending = {
      cardId,
      fromColumn: columnId,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
      touch: e.pointerType !== 'mouse',
      armed: false,
    }
    pending.current = p

    if (p.touch) {
      const { clientX, clientY } = e
      longPress.current = setTimeout(() => {
        if (pending.current !== p) return
        p.armed = true
        const lenis = (window as unknown as { __lenis?: { stop: () => void } }).__lenis
        lenis?.stop()
        document.body.style.userSelect = 'none'
        const target = resolveTarget(clientX, clientY, p.cardId)
        setDragState({
          cardId: p.cardId,
          offsetX: p.offsetX,
          offsetY: p.offsetY,
          width: p.width,
          height: p.height,
          x: clientX,
          y: clientY,
          overColumn: target?.overColumn ?? p.fromColumn,
          overIndex: target?.overIndex ?? 0,
        })
      }, LONG_PRESS_MS)
    }
  }

  return (
    <div
      className="rounded-xl overflow-hidden bg-white select-none"
      style={{ border: `1px solid ${N.border}`, boxShadow: '0 4px 20px rgba(15,15,15,0.06)' }}
    >
      {/* ---------- window top bar ---------- */}
      <div
        className="flex items-center justify-between px-3 h-9"
        style={{ borderBottom: `1px solid ${N.border}` }}
      >
        <div className="flex items-center gap-1.5 text-[12px]" style={{ color: N.textMuted }}>
          <span>🗂️</span>
          <span>Clients</span>
          <span style={{ color: N.textFaint }}>/</span>
          <span style={{ color: N.text }}>Website board</span>
        </div>
        <div className="flex items-center gap-3 text-[12px]" style={{ color: N.textMuted }}>
          <span className="hidden sm:inline">Share</span>
          <Glyph d="M12 5v14M5 12h14" />
          <Glyph d="M5 12h.01M12 12h.01M19 12h.01" />
        </div>
      </div>

      {/* ---------- page header ---------- */}
      <div className="px-4 sm:px-8 pt-6">
        <div className="flex items-center gap-2">
          <span className="text-[22px] leading-none">🗂️</span>
          <h3 className="text-[24px] font-bold tracking-tight" style={{ color: N.text }}>
            Website board
          </h3>
        </div>

        <div
          className="mt-4 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${N.border}` }}
        >
          <div className="flex items-center gap-1 text-[13px]">
            <span
              className="px-1.5 pb-2 font-medium"
              style={{ color: N.text, boxShadow: `inset 0 -2px 0 ${N.text}` }}
            >
              Board
            </span>
            <span className="px-1.5 pb-2" style={{ color: N.textMuted }}>
              Table
            </span>
          </div>
          <div className="flex items-center gap-3 pb-2" style={{ color: N.textMuted }}>
            <Glyph d="M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.2-4.2" />
            <Glyph d="M4 6h16M7 12h10M10 18h4" />
            <span
              className="hidden sm:inline-flex items-center rounded px-2 py-1 text-[12px] font-medium text-white"
              style={{ background: N.blue }}
            >
              New
            </span>
          </div>
        </div>
      </div>

      {/* ---------- board ---------- */}
      <div ref={scrollerRef} className="overflow-x-auto scrollbar-hide px-4 sm:px-8 pt-4 pb-8">
        <div className="flex gap-2 min-w-max">
          {view.map((column) => {
            const isTarget = drag?.overColumn === column.id
            // The lifted card is filtered out of `view`, so it still counts
            // against whichever column it is currently hovering.
            const count = column.cards.length + (isTarget ? 1 : 0)

            return (
              <div
                key={column.id}
                ref={(el) => {
                  if (el) columnRefs.current.set(column.id, el)
                  else columnRefs.current.delete(column.id)
                }}
                className="w-[248px] flex-shrink-0 rounded-md transition-colors"
                style={{ background: isTarget ? N.hover : 'transparent' }}
              >
                <div className="flex items-center justify-between gap-2 px-2 py-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="inline-block rounded-[3px] px-1.5 py-0.5 text-[12px] font-medium truncate"
                      style={COLUMN_PILL[column.color]}
                    >
                      {column.title}
                    </span>
                    <span className="text-[12px] tabular-nums" style={{ color: N.textFaint }}>
                      {count}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5" style={{ color: N.textFaint }}>
                    <Glyph d="M5 12h.01M12 12h.01M19 12h.01" size={14} />
                    <Glyph d="M12 5v14M5 12h14" size={14} />
                  </div>
                </div>

                <div className="px-1 pb-1 space-y-1.5 min-h-[80px]">
                  {column.cards.map((card, index) => (
                    <div key={card.id}>
                      {isTarget && drag.overIndex === index && (
                        <Placeholder height={drag.height} />
                      )}
                      <div
                        ref={(el) => {
                          if (el) cardRefs.current.set(card.id, el)
                          else cardRefs.current.delete(card.id)
                        }}
                        onPointerDown={(e) => onPointerDown(e, card.id, column.id)}
                        className="rounded-[5px] bg-white px-2.5 py-2 cursor-grab active:cursor-grabbing"
                        style={{ boxShadow: N.cardShadow }}
                      >
                        <p className="text-[14px] leading-[1.35]" style={{ color: N.text }}>
                          {card.title}
                        </p>
                        <Tag tag={card.tag} />
                      </div>
                    </div>
                  ))}

                  {isTarget && drag.overIndex >= column.cards.length && (
                    <Placeholder height={drag.height} />
                  )}
                </div>

                <button
                  type="button"
                  className="w-full text-left px-2.5 py-1.5 text-[13px] rounded-[5px]"
                  style={{ color: N.textFaint }}
                >
                  + New
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* ---------- the card under the pointer ---------- */}
      {drag && dragged && (
        <div
          className="fixed z-50 rounded-[5px] bg-white px-2.5 py-2 pointer-events-none"
          style={{
            left: drag.x - drag.offsetX,
            top: drag.y - drag.offsetY,
            width: drag.width,
            boxShadow: N.liftShadow,
          }}
        >
          <p className="text-[14px] leading-[1.35]" style={{ color: N.text }}>
            {dragged.title}
          </p>
          <Tag tag={dragged.tag} />
        </div>
      )}
    </div>
  )
}

function Tag({ tag }: { tag: BoardTag }) {
  const style = TAG_PILL[tag]
  return (
    <div className="mt-1.5">
      <span
        className="inline-block rounded-[3px] px-1.5 py-0.5 text-[12px]"
        style={{ background: style.bg, color: style.color }}
      >
        {style.label}
      </span>
    </div>
  )
}

function Placeholder({ height }: { height: number }) {
  return (
    <div
      className="rounded-[5px] mb-1.5"
      style={{ height, background: 'rgba(55, 53, 47, 0.08)' }}
    />
  )
}

function Glyph({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}
