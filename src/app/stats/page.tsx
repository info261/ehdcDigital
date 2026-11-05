import type { Metadata } from 'next'
import { isConfigured, isUnlocked } from '@/lib/stats-auth'
import { RANGES, getStats, type Range } from '@/lib/stats-queries'
import StatsGate from './StatsGate'
import Dashboard from './Dashboard'

export const metadata: Metadata = {
  title: 'Stats',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-9 shadow-card">
        <h1 className="font-heading text-lg font-semibold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted">{children}</p>
      </div>
    </main>
  )
}

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  if (!isConfigured()) {
    return (
      <Notice title="Stats aren't configured">
        Set the <code className="text-foreground">STATS_PASSWORD</code> environment variable to unlock this page.
      </Notice>
    )
  }
  if (!(await isUnlocked())) return <StatsGate />

  const { range: rawRange } = await searchParams
  const range: Range = rawRange && rawRange in RANGES ? (rawRange as Range) : '30d'

  try {
    return <Dashboard range={range} stats={await getStats(range)} />
  } catch (error) {
    console.error('[stats] query failed', error)
    return <Notice title="Couldn't load stats">The database query failed. Check DATABASE_URL and the server logs.</Notice>
  }
}
