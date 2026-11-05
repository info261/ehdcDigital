import { createHash } from 'crypto'
import { neon } from '@neondatabase/serverless'

/** Lazily created so builds without DATABASE_URL don't crash at import time. */
let client: ReturnType<typeof neon> | null = null
export function db() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set')
  client ??= neon(url)
  return client
}

export const EVENT_TYPES = ['pageview', 'vital', 'event'] as const
export type EventType = (typeof EVENT_TYPES)[number]

export const VITALS = ['LCP', 'INP', 'CLS', 'FCP', 'TTFB'] as const

/**
 * A visitor id that rotates every UTC day: sha256(secret + day + ip + ua).
 * Counts unique visitors per day without cookies and without storing the IP.
 * The secret comes from the environment because this repo is public.
 */
export function visitorId(ip: string, userAgent: string): string {
  const secret = process.env.ANALYTICS_SALT || process.env.DATABASE_URL || ''
  const day = new Date().toISOString().slice(0, 10)
  return createHash('sha256')
    .update(`${secret}|${day}|${ip}|${userAgent}`)
    .digest('hex')
    .slice(0, 32)
}

const BOT_PATTERN =
  /bot|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|pingdom|uptime|monitor|curl|wget|python|axios|node-fetch|go-http|java\/|facebookexternalhit|vercel-screenshot/i

export function isBot(userAgent: string): boolean {
  return !userAgent || BOT_PATTERN.test(userAgent)
}

export function parseUserAgent(ua: string) {
  const device = /iPad|Tablet/i.test(ua)
    ? 'tablet'
    : /Mobi|Android|iPhone/i.test(ua)
      ? 'mobile'
      : 'desktop'

  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /OPR\/|Opera/.test(ua)
      ? 'Opera'
      : /SamsungBrowser/.test(ua)
        ? 'Samsung Internet'
        : /Firefox\/|FxiOS/.test(ua)
          ? 'Firefox'
          : /Chrome\/|CriOS/.test(ua)
            ? 'Chrome'
            : /Safari\//.test(ua)
              ? 'Safari'
              : 'Other'

  const os = /Windows/.test(ua)
    ? 'Windows'
    : /iPhone|iPad|iPod/.test(ua)
      ? 'iOS'
      : /Mac OS X/.test(ua)
        ? 'macOS'
        : /Android/.test(ua)
          ? 'Android'
          : /Linux/.test(ua)
            ? 'Linux'
            : 'Other'

  return { device, browser, os }
}

/** Keeps just the host of an external referrer; same-site referrers are dropped. */
export function referrerHost(referrer: unknown, siteHost: string | null): string | null {
  if (typeof referrer !== 'string' || !referrer) return null
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '')
    if (siteHost && host === siteHost.replace(/^www\./, '')) return null
    return host
  } catch {
    return null
  }
}

export function clip(value: unknown, max = 300): string | null {
  return typeof value === 'string' && value.length > 0 ? value.slice(0, max) : null
}
