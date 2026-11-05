import { NextResponse } from 'next/server'
import {
  EVENT_TYPES,
  VITALS,
  clip,
  db,
  isBot,
  parseUserAgent,
  referrerHost,
  visitorId,
  type EventType,
} from '@/lib/analytics'

type Payload = {
  type?: unknown
  path?: unknown
  name?: unknown
  value?: unknown
  rating?: unknown
  props?: unknown
  referrer?: unknown
  utm?: { source?: unknown; medium?: unknown; campaign?: unknown }
}

const RATINGS = new Set(['good', 'needs-improvement', 'poor'])

/**
 * Receives beacons from <Analytics />. sendBeacon posts text/plain, so the body
 * is parsed by hand. Always answers 204 so a bad payload never surfaces to visitors.
 */
export async function POST(request: Request) {
  const done = new NextResponse(null, { status: 204 })
  if (!process.env.DATABASE_URL) return done

  const ua = request.headers.get('user-agent') ?? ''
  if (isBot(ua)) return done

  let body: Payload
  try {
    body = JSON.parse(await request.text())
  } catch {
    return done
  }

  const type = body.type as EventType
  const path = clip(body.path, 300)
  if (!EVENT_TYPES.includes(type) || !path || !path.startsWith('/')) return done

  let name = clip(body.name, 80)
  let value = typeof body.value === 'number' && Number.isFinite(body.value) ? body.value : null
  const rating = typeof body.rating === 'string' && RATINGS.has(body.rating) ? body.rating : null

  if (type === 'vital' && (!name || !(VITALS as readonly string[]).includes(name) || value === null)) {
    return done
  }
  if (type === 'event' && !name) return done
  if (type === 'pageview') {
    name = null
    value = null
  }

  const props =
    body.props && typeof body.props === 'object' && JSON.stringify(body.props).length <= 1000
      ? JSON.stringify(body.props)
      : null

  const headers = request.headers
  const ip = headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? headers.get('x-real-ip') ?? ''
  const city = headers.get('x-vercel-ip-city')
  const { device, browser, os } = parseUserAgent(ua)

  try {
    await db()`
      INSERT INTO analytics_events
        (type, path, name, value, rating, props, referrer,
         utm_source, utm_medium, utm_campaign, country, city, device, browser, os, visitor)
      VALUES
        (${type}, ${path}, ${name}, ${value}, ${rating}, ${props}::jsonb,
         ${type === 'pageview' ? referrerHost(body.referrer, headers.get('host')) : null},
         ${clip(body.utm?.source, 100)}, ${clip(body.utm?.medium, 100)}, ${clip(body.utm?.campaign, 100)},
         ${headers.get('x-vercel-ip-country')}, ${city ? decodeURIComponent(city) : null},
         ${device}, ${browser}, ${os}, ${visitorId(ip, ua)})
    `
  } catch (error) {
    console.error('[analytics] insert failed', error)
  }

  return done
}
