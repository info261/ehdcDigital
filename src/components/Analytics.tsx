'use client'

import { usePathname } from 'next/navigation'
import { useReportWebVitals } from 'next/web-vitals'
import { useEffect, useRef } from 'react'

/** Set on a browser from /stats so the owner's own visits aren't counted. */
export const IGNORE_KEY = 'ehdc_analytics_ignore'

const SITE_HOST = 'ehdcdigital.com'
const SKIP_PATHS = ['/stats', '/photos/new', '/api']

function enabled(): boolean {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname.replace(/^www\./, '')
  if (host !== SITE_HOST && !window.location.search.includes('analytics_debug')) return false
  if (SKIP_PATHS.some((p) => window.location.pathname.startsWith(p))) return false
  try {
    if (window.localStorage.getItem(IGNORE_KEY) === '1') return false
  } catch {}
  return true
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function send(payload: Record<string, unknown>) {
  if (!enabled()) return
  const body = JSON.stringify({ path: window.location.pathname, ...payload })
  if (navigator.sendBeacon?.('/api/collect', body)) return
  fetch('/api/collect', { method: 'POST', body, keepalive: true }).catch(() => {})
}

/**
 * First-party, cookieless analytics: pageviews, Core Web Vitals, outbound clicks
 * and anything marked with data-track="name" (extra data-track-* attributes become props).
 */
export default function Analytics() {
  const pathname = usePathname()
  const firstView = useRef(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    send({
      type: 'pageview',
      // document.referrer is stale after client-side navigation, so only the landing view sends it.
      referrer: firstView.current ? document.referrer : null,
      utm: {
        source: params.get('utm_source') ?? params.get('ref'),
        medium: params.get('utm_medium'),
        campaign: params.get('utm_campaign'),
      },
    })
    firstView.current = false
  }, [pathname])

  useReportWebVitals((metric) => {
    send({
      type: 'vital',
      name: metric.name,
      value: metric.name === 'CLS' ? metric.value : Math.round(metric.value),
      rating: metric.rating,
    })
  })

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null
      const tracked = target?.closest<HTMLElement>('[data-track]')
      if (tracked) {
        const props: Record<string, string> = {}
        for (const [key, val] of Object.entries(tracked.dataset)) {
          if (key.startsWith('track') && key !== 'track' && val) {
            props[key.slice(5).toLowerCase()] = val
          }
        }
        send({ type: 'event', name: tracked.dataset.track, props })
        return
      }

      const link = target?.closest<HTMLAnchorElement>('a[href]')
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      if (href.startsWith('mailto:')) return send({ type: 'event', name: 'email', props: { to: safeDecode(href.slice(7)) } })
      if (href.startsWith('tel:')) return send({ type: 'event', name: 'phone' })
      try {
        const url = new URL(link.href)
        if (url.hostname !== window.location.hostname && url.protocol.startsWith('http')) {
          send({
            type: 'event',
            name: 'outbound',
            props: { url: `${url.hostname.replace(/^www\./, '')}${url.pathname}`.replace(/\/$/, '') },
          })
        }
      } catch {}
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
