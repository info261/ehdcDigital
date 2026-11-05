import Link from 'next/link'
import { RANGES, VITAL_THRESHOLDS, type Breakdown, type Range, type Stats } from '@/lib/stats-queries'
import TrafficChart from './TrafficChart'
import StatsControls from './StatsControls'

// Status palette (reserved for good / needs work / poor; always paired with a label).
const STATUS = {
  good: { color: '#0ca30c', label: 'Good' },
  ni: { color: '#fab219', label: 'Needs work' },
  poor: { color: '#d03b3b', label: 'Poor' },
} as const

const RANGE_LABELS: Record<Range, string> = { '24h': '24 hours', '7d': '7 days', '30d': '30 days', '90d': '90 days' }

const fmt = new Intl.NumberFormat('en-US')

function statusOf(name: string, value: number): keyof typeof STATUS {
  const t = VITAL_THRESHOLDS[name]
  if (value <= t.good) return 'good'
  if (value <= t.poor) return 'ni'
  return 'poor'
}

function formatVital(name: string, value: number | null): string {
  if (value == null) return '—'
  if (name === 'CLS') return value.toFixed(2)
  return value >= 1000 ? `${(value / 1000).toFixed(2)} s` : `${Math.round(value)} ms`
}

function delta(current: number, previous: number) {
  if (previous === 0) return null
  return Math.round(((current - previous) / previous) * 100)
}

function flag(code: string) {
  if (!/^[A-Z]{2}$/.test(code)) return ''
  return String.fromCodePoint(...[...code].map((c) => 0x1f1a5 + c.charCodeAt(0)))
}

function Card({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl bg-white p-6 shadow-card ${className}`}>
      <h2 className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-muted">{title}</h2>
      {children}
    </section>
  )
}

function Kpi({ label, value, change }: { label: string; value: string; change?: number | null }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-heading text-3xl font-semibold tabular-nums text-foreground">{value}</p>
      {change != null && (
        <p className={`mt-1 text-xs font-medium tabular-nums ${change >= 0 ? 'text-[#006300]' : 'text-[#b42318]'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% <span className="font-normal text-muted">vs previous period</span>
        </p>
      )}
    </div>
  )
}

function BarList({ rows, empty = 'No data yet', render }: { rows: Breakdown; empty?: string; render?: (label: string) => React.ReactNode }) {
  if (rows.length === 0) return <p className="py-6 text-center text-sm text-muted">{empty}</p>
  const max = Math.max(...rows.map((r) => r.visitors), 1)
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-xs text-muted">
          <th className="pb-1 text-left font-medium"><span className="sr-only">Item</span></th>
          <th className="pb-1 text-right font-medium">Visitors</th>
          <th className="pb-1 pl-3 text-right font-medium">Views</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} className="group" title={`${fmt.format(r.visitors)} visitors · ${fmt.format(r.views)} views`}>
            <td className="relative py-[3px] pr-3">
              <div
                className="absolute inset-y-[3px] left-0 rounded-[4px] bg-slate-100 transition-colors group-hover:bg-slate-200"
                style={{ width: `${(r.visitors / max) * 100}%` }}
                aria-hidden
              />
              <span className="relative block truncate px-2 py-1 text-foreground">{render ? render(r.label) : r.label}</span>
            </td>
            <td className="w-14 text-right tabular-nums text-foreground">{fmt.format(r.visitors)}</td>
            <td className="w-14 pl-3 text-right tabular-nums text-muted">{fmt.format(r.views)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function VitalCard({ name, data }: { name: string; data?: Stats['vitals'][string] }) {
  const descriptions: Record<string, string> = {
    LCP: 'Largest Contentful Paint: when the main content shows up',
    INP: 'Interaction to Next Paint: how fast the page reacts to taps and clicks',
    CLS: 'Cumulative Layout Shift: how much the layout jumps around',
    FCP: 'First Contentful Paint: when anything first appears',
    TTFB: 'Time to First Byte: server response time',
  }
  if (!data) {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-card" title={descriptions[name]}>
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="mt-2 font-heading text-2xl font-semibold text-muted">—</p>
        <p className="mt-1 text-xs text-muted">No samples yet</p>
      </div>
    )
  }
  const status = STATUS[statusOf(name, data.p75)]
  const parts = [
    { key: 'good', n: data.good },
    { key: 'ni', n: data.ni },
    { key: 'poor', n: data.poor },
  ] as const
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card" title={descriptions[name]}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <span className="h-2 w-2 rounded-full" style={{ background: status.color }} aria-hidden />
          {status.label}
        </span>
      </div>
      <p className="mt-2 font-heading text-2xl font-semibold tabular-nums text-foreground">{formatVital(name, data.p75)}</p>
      <p className="mt-0.5 text-xs text-muted">p75 · {fmt.format(data.samples)} samples</p>
      <div className="mt-4 flex h-2 gap-[2px] overflow-hidden rounded-full" role="img"
        aria-label={parts.map((p) => `${STATUS[p.key].label} ${Math.round((p.n / data.samples) * 100)}%`).join(', ')}>
        {parts.filter((p) => p.n > 0).map((p) => (
          <div
            key={p.key}
            style={{ flexGrow: p.n, background: STATUS[p.key].color }}
            title={`${STATUS[p.key].label}: ${Math.round((p.n / data.samples) * 100)}%`}
          />
        ))}
      </div>
    </div>
  )
}

function VitalCell({ name, value }: { name: string; value: number | null }) {
  if (value == null) return <td className="px-2 py-2 text-right text-muted">—</td>
  const status = STATUS[statusOf(name, value)]
  return (
    <td className="px-2 py-2 text-right tabular-nums text-foreground" title={status.label}>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: status.color }} aria-hidden />
        {formatVital(name, value)}
        <span className="sr-only">({status.label})</span>
      </span>
    </td>
  )
}

const EVENT_LABELS: Record<string, string> = {
  outbound: 'Outbound link',
  email: 'Email click',
  phone: 'Phone click',
}

export default function Dashboard({ range, stats }: { range: Range; stats: Stats }) {
  const { totals } = stats
  const perVisitor = totals.visitors ? totals.views / totals.visitors : 0
  const prevPerVisitor = totals.prevVisitors ? totals.prevViews / totals.prevVisitors : 0

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-1 block text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">ehdcDigital</span>
            <h1 className="font-heading text-2xl font-semibold text-foreground">Stats</h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted">
              <span className="relative flex h-2 w-2" aria-hidden>
                {stats.live > 0 && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0ca30c] opacity-60" />}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${stats.live > 0 ? 'bg-[#0ca30c]' : 'bg-slate-300'}`} />
              </span>
              {stats.live} {stats.live === 1 ? 'visitor' : 'visitors'} in the last 5 minutes
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <nav className="flex rounded-[14px] bg-white p-1 shadow-subtle" aria-label="Date range">
              {(Object.keys(RANGES) as Range[]).map((r) => (
                <Link
                  key={r}
                  href={`/stats?range=${r}`}
                  aria-current={r === range ? 'page' : undefined}
                  className={`rounded-[10px] px-3 py-1.5 text-sm transition-colors ${
                    r === range ? 'bg-foreground text-white' : 'text-muted hover:text-foreground'
                  }`}
                >
                  {r}
                </Link>
              ))}
            </nav>
            <StatsControls />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Kpi label="Visitors" value={fmt.format(totals.visitors)} change={delta(totals.visitors, totals.prevVisitors)} />
          <Kpi label="Pageviews" value={fmt.format(totals.views)} change={delta(totals.views, totals.prevViews)} />
          <Kpi
            label="Pages per visitor"
            value={perVisitor.toFixed(1)}
            change={prevPerVisitor ? delta(perVisitor, prevPerVisitor) : null}
          />
        </div>

        <Card title={`Visitors · last ${RANGE_LABELS[range]}`} className="mt-4">
          <TrafficChart series={stats.series} hourly={stats.days === 1} />
        </Card>

        <h2 className="mb-3 mt-10 font-heading text-lg font-semibold text-foreground">Performance</h2>
        <p className="-mt-2 mb-4 text-sm text-muted">Core Web Vitals from real visitors (75th percentile, as Google scores it).</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {['LCP', 'INP', 'CLS', 'FCP', 'TTFB'].map((name) => (
            <VitalCard key={name} name={name} data={stats.vitals[name]} />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted">
          {Object.values(STATUS).map((s) => (
            <span key={s.label} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: s.color }} aria-hidden /> {s.label}
            </span>
          ))}
        </div>

        <Card title="Performance by page" className="mt-4">
          {stats.vitalsByPage.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">No samples yet</p>
          ) : (
            <div className="-mx-2 overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted">
                    <th className="px-2 pb-2 font-medium">Page</th>
                    <th className="px-2 pb-2 text-right font-medium">LCP</th>
                    <th className="px-2 pb-2 text-right font-medium">INP</th>
                    <th className="px-2 pb-2 text-right font-medium">CLS</th>
                    <th className="px-2 pb-2 text-right font-medium">TTFB</th>
                    <th className="px-2 pb-2 text-right font-medium">Samples</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {stats.vitalsByPage.map((p) => (
                    <tr key={p.path}>
                      <td className="max-w-[220px] truncate px-2 py-2 text-foreground">{p.path}</td>
                      <VitalCell name="LCP" value={p.lcp} />
                      <VitalCell name="INP" value={p.inp} />
                      <VitalCell name="CLS" value={p.cls} />
                      <VitalCell name="TTFB" value={p.ttfb} />
                      <td className="px-2 py-2 text-right tabular-nums text-muted">{fmt.format(p.samples)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <h2 className="mb-4 mt-10 font-heading text-lg font-semibold text-foreground">Traffic</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card title="Top pages"><BarList rows={stats.pages} /></Card>
          <Card title="Referrers"><BarList rows={stats.referrers} /></Card>
          <Card title="UTM sources"><BarList rows={stats.sources} empty="No tagged links yet: add ?utm_source=… to links you share" /></Card>
          <Card title="UTM campaigns"><BarList rows={stats.campaigns} empty="No campaigns yet" /></Card>
          <Card title="Countries">
            <BarList rows={stats.countries} render={(c) => <>{flag(c)} {c}</>} />
          </Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card title="Devices"><BarList rows={stats.devices} render={(d) => d[0].toUpperCase() + d.slice(1)} /></Card>
            <Card title="Browsers"><BarList rows={stats.browsers} /></Card>
          </div>
        </div>

        <h2 className="mb-4 mt-10 font-heading text-lg font-semibold text-foreground">Clicks &amp; events</h2>
        <Card title="What people clicked">
          {stats.events.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">
              No events yet. Outbound links, email links and anything with <code className="text-foreground">data-track=&quot;name&quot;</code> show up here.
            </p>
          ) : (
            <div className="-mx-2 overflow-x-auto">
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted">
                    <th className="px-2 pb-2 font-medium">Event</th>
                    <th className="px-2 pb-2 font-medium">Detail</th>
                    <th className="px-2 pb-2 text-right font-medium">Clicks</th>
                    <th className="px-2 pb-2 text-right font-medium">Visitors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {stats.events.map((e) => (
                    <tr key={`${e.name}|${e.detail}`}>
                      <td className="px-2 py-2 text-foreground">{EVENT_LABELS[e.name] ?? e.name}</td>
                      <td className="max-w-[280px] truncate px-2 py-2 text-muted">{e.detail || '—'}</td>
                      <td className="px-2 py-2 text-right tabular-nums text-foreground">{fmt.format(e.count)}</td>
                      <td className="px-2 py-2 text-right tabular-nums text-muted">{fmt.format(e.visitors)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <p className="mt-10 text-center text-xs text-muted">
          Cookieless, first-party analytics. Visitors are counted with a hash that rotates daily; no IPs are stored.
        </p>
      </div>
    </main>
  )
}
