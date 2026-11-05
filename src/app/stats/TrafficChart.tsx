'use client'

import { useState } from 'react'

type Point = { bucket: string; views: number; visitors: number }

const fmt = new Intl.NumberFormat('en-US')

function niceMax(n: number) {
  if (n <= 4) return 4
  const magnitude = 10 ** Math.floor(Math.log10(n))
  const step = [1, 2, 2.5, 5, 10].find((s) => s * magnitude >= n / 4)! * magnitude
  return step * 4
}

/** Single-series bar chart (visitors per day or hour) with a hover tooltip. */
export default function TrafficChart({ series, hourly }: { series: Point[]; hourly: boolean }) {
  const [active, setActive] = useState<number | null>(null)
  const max = niceMax(Math.max(...series.map((p) => p.visitors), 0))
  const ticks = [0, 1, 2, 3, 4].map((i) => (max / 4) * i)

  const label = (iso: string, long = false) => {
    const d = new Date(iso)
    if (hourly) return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Bratislava' })
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', ...(long ? { weekday: 'short' } : {}), timeZone: 'UTC' })
  }

  const labelEvery = Math.ceil(series.length / 7)
  const point = active != null ? series[active] : null

  return (
    <div>
      <div className="relative mt-6 flex h-56 gap-3">
        {/* y axis */}
        <div className="relative w-8 shrink-0 text-right text-[11px] tabular-nums text-muted" aria-hidden>
          {ticks.map((t) => (
            <span key={t} className="absolute right-0 -translate-y-1/2" style={{ bottom: `${(t / max) * 100}%` }}>
              {fmt.format(t)}
            </span>
          ))}
        </div>

        <div className="relative flex-1" onMouseLeave={() => setActive(null)}>
          {ticks.map((t) => (
            <div
              key={t}
              className={`absolute inset-x-0 h-px ${t === 0 ? 'bg-[#c3c2b7]' : 'bg-[#eef0f3]'}`}
              style={{ bottom: `${(t / max) * 100}%` }}
              aria-hidden
            />
          ))}

          <div className="absolute inset-0 flex items-end gap-[2px]" role="img" aria-label="Visitors over time">
            {series.map((p, i) => (
              <div
                key={p.bucket}
                className="relative flex h-full flex-1 cursor-default items-end"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                aria-label={`${label(p.bucket, true)}: ${p.visitors} visitors, ${p.views} views`}
              >
                <div
                  className={`w-full rounded-t-[4px] transition-colors ${active === i ? 'bg-foreground' : 'bg-slate-500'}`}
                  style={{ height: `${(p.visitors / max) * 100}%`, minHeight: p.visitors > 0 ? 2 : 0 }}
                />
              </div>
            ))}
          </div>

          {point && active != null && (
            <div
              className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 whitespace-nowrap rounded-xl bg-white px-3 py-2 text-xs shadow-card"
              style={{ left: `${Math.min(Math.max(((active + 0.5) / series.length) * 100, 10), 90)}%` }}
            >
              <p className="font-medium text-foreground">{label(point.bucket, true)}</p>
              <p className="mt-0.5 tabular-nums text-muted">
                <span className="text-foreground">{fmt.format(point.visitors)}</span> visitors ·{' '}
                <span className="text-foreground">{fmt.format(point.views)}</span> views
              </p>
            </div>
          )}
        </div>
      </div>

      {/* x axis */}
      <div className="ml-11 mt-2 flex gap-[2px] text-[11px] text-muted" aria-hidden>
        {series.map((p, i) => (
          <span key={p.bucket} className="flex flex-1 justify-center overflow-visible whitespace-nowrap">
            {/* Every other label is dropped on narrow screens so they don't collide. */}
            {i % labelEvery === 0 && (
              <span className={(i / labelEvery) % 2 === 1 ? 'hidden sm:inline' : ''}>{label(p.bucket)}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
