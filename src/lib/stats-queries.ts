import { db } from '@/lib/analytics'

export const TZ = 'Europe/Bratislava'
export const RANGES = { '24h': 1, '7d': 7, '30d': 30, '90d': 90 } as const
export type Range = keyof typeof RANGES

type Row = Record<string, unknown>
const num = (v: unknown) => Number(v ?? 0)

export type Breakdown = { label: string; views: number; visitors: number }[]

/** Core Web Vitals thresholds (p75), per web.dev. */
export const VITAL_THRESHOLDS: Record<string, { good: number; poor: number; unit: string }> = {
  LCP: { good: 2500, poor: 4000, unit: 'ms' },
  INP: { good: 200, poor: 500, unit: 'ms' },
  CLS: { good: 0.1, poor: 0.25, unit: '' },
  FCP: { good: 1800, poor: 3000, unit: 'ms' },
  TTFB: { good: 800, poor: 1800, unit: 'ms' },
}

export async function getStats(range: Range) {
  const days = RANGES[range]
  const sql = db()
  const since = new Date(Date.now() - days * 86_400_000).toISOString()
  const prevSince = new Date(Date.now() - 2 * days * 86_400_000).toISOString()

  const breakdown = async (column: 'path' | 'referrer' | 'utm_source' | 'utm_campaign' | 'country' | 'device' | 'browser' | 'os', fallback: string, limit = 10): Promise<Breakdown> => {
    // Column names can't be bound as parameters; `column` is a closed union above.
    const rows = (await sql.query(
      `SELECT COALESCE(${column}, $2) AS label, COUNT(*) AS views, COUNT(DISTINCT visitor) AS visitors
         FROM analytics_events
        WHERE type = 'pageview' AND ts >= $1
        GROUP BY 1 ORDER BY visitors DESC, views DESC LIMIT ${limit}`,
      [since, fallback],
    )) as Row[]
    return rows.map((r) => ({ label: String(r.label), views: num(r.views), visitors: num(r.visitors) }))
  }

  const [totals, series, live, pages, referrers, sources, campaigns, countries, devices, browsers, vitals, vitalsByPage, events] =
    await Promise.all([
      sql`
        SELECT
          COUNT(*) FILTER (WHERE ts >= ${since}) AS views,
          COUNT(DISTINCT visitor) FILTER (WHERE ts >= ${since}) AS visitors,
          COUNT(*) FILTER (WHERE ts < ${since}) AS prev_views,
          COUNT(DISTINCT visitor) FILTER (WHERE ts < ${since}) AS prev_visitors
        FROM analytics_events
        WHERE type = 'pageview' AND ts >= ${prevSince}` as Promise<Row[]>,

      days === 1
        ? (sql`
            WITH buckets AS (
              SELECT generate_series(date_trunc('hour', now()) - interval '23 hours', date_trunc('hour', now()), interval '1 hour') AS bucket
            )
            SELECT b.bucket, COUNT(e.id) AS views, COUNT(DISTINCT e.visitor) AS visitors
              FROM buckets b
              LEFT JOIN analytics_events e ON e.type = 'pageview' AND date_trunc('hour', e.ts) = b.bucket
             GROUP BY b.bucket ORDER BY b.bucket` as Promise<Row[]>)
        : (sql`
            WITH buckets AS (
              SELECT generate_series(
                (now() AT TIME ZONE ${TZ})::date - (${days}::int - 1),
                (now() AT TIME ZONE ${TZ})::date, interval '1 day')::date AS bucket
            )
            SELECT to_char(b.bucket, 'YYYY-MM-DD') || 'T00:00:00Z' AS bucket, COUNT(e.id) AS views, COUNT(DISTINCT e.visitor) AS visitors
              FROM buckets b
              LEFT JOIN analytics_events e ON e.type = 'pageview' AND (e.ts AT TIME ZONE ${TZ})::date = b.bucket
             GROUP BY b.bucket ORDER BY b.bucket` as Promise<Row[]>),

      sql`SELECT COUNT(DISTINCT visitor) AS n FROM analytics_events WHERE ts >= now() - interval '5 minutes'` as Promise<Row[]>,

      breakdown('path', '/'),
      breakdown('referrer', 'Direct / none'),
      breakdown('utm_source', '—'),
      breakdown('utm_campaign', '—'),
      breakdown('country', 'Unknown'),
      breakdown('device', 'Unknown', 5),
      breakdown('browser', 'Unknown', 6),

      sql`
        SELECT name,
               percentile_cont(0.75) WITHIN GROUP (ORDER BY value) AS p75,
               COUNT(*) AS samples,
               COUNT(*) FILTER (WHERE rating = 'good') AS good,
               COUNT(*) FILTER (WHERE rating = 'needs-improvement') AS ni,
               COUNT(*) FILTER (WHERE rating = 'poor') AS poor
          FROM analytics_events
         WHERE type = 'vital' AND ts >= ${since}
         GROUP BY name` as Promise<Row[]>,

      sql`
        SELECT path,
               percentile_cont(0.75) WITHIN GROUP (ORDER BY value) FILTER (WHERE name = 'LCP') AS lcp,
               percentile_cont(0.75) WITHIN GROUP (ORDER BY value) FILTER (WHERE name = 'INP') AS inp,
               percentile_cont(0.75) WITHIN GROUP (ORDER BY value) FILTER (WHERE name = 'CLS') AS cls,
               percentile_cont(0.75) WITHIN GROUP (ORDER BY value) FILTER (WHERE name = 'TTFB') AS ttfb,
               COUNT(*) FILTER (WHERE name = 'LCP') AS samples
          FROM analytics_events
         WHERE type = 'vital' AND ts >= ${since}
         GROUP BY path ORDER BY samples DESC LIMIT 10` as Promise<Row[]>,

      sql`
        SELECT name,
               COALESCE(props->>'url', props->>'label', props->>'plan', props->>'to', '') AS detail,
               COUNT(*) AS count, COUNT(DISTINCT visitor) AS visitors
          FROM analytics_events
         WHERE type = 'event' AND ts >= ${since}
         GROUP BY 1, 2 ORDER BY count DESC LIMIT 15` as Promise<Row[]>,
    ])

  const t = totals[0] ?? {}
  return {
    days,
    live: num(live[0]?.n),
    totals: {
      views: num(t.views),
      visitors: num(t.visitors),
      prevViews: num(t.prev_views),
      prevVisitors: num(t.prev_visitors),
    },
    series: series.map((r) => ({
      bucket: new Date(r.bucket as string).toISOString(),
      views: num(r.views),
      visitors: num(r.visitors),
    })),
    pages,
    referrers,
    sources: sources.filter((s) => s.label !== '—'),
    campaigns: campaigns.filter((s) => s.label !== '—'),
    countries,
    devices,
    browsers,
    vitals: Object.fromEntries(
      vitals.map((r) => [
        String(r.name),
        { p75: num(r.p75), samples: num(r.samples), good: num(r.good), ni: num(r.ni), poor: num(r.poor) },
      ]),
    ) as Record<string, { p75: number; samples: number; good: number; ni: number; poor: number }>,
    vitalsByPage: vitalsByPage.map((r) => ({
      path: String(r.path),
      lcp: r.lcp == null ? null : num(r.lcp),
      inp: r.inp == null ? null : num(r.inp),
      cls: r.cls == null ? null : num(r.cls),
      ttfb: r.ttfb == null ? null : num(r.ttfb),
      samples: num(r.samples),
    })),
    events: events.map((r) => ({
      name: String(r.name),
      detail: String(r.detail),
      count: num(r.count),
      visitors: num(r.visitors),
    })),
  }
}

export type Stats = Awaited<ReturnType<typeof getStats>>
