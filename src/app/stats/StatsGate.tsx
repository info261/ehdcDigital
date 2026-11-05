'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function StatsGate() {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    const response = await fetch('/api/stats/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: input }),
    })
    if (response.ok) {
      router.refresh()
      return
    }
    const body = await response.json().catch(() => ({}))
    setError(body.error ?? 'Something went wrong.')
    setPending(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-9 shadow-card">
        <div className="mb-7">
          <span className="mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">
            ehdcDigital
          </span>
          <h1 className="font-heading text-lg font-semibold text-foreground">Stats</h1>
          <p className="mt-1 text-sm text-muted">Enter the password to see the dashboard.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="stats-password" className="sr-only">
            Password
          </label>
          <input
            id="stats-password"
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setError(null)
            }}
            placeholder="Password"
            autoFocus
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'stats-password-error' : undefined}
            className={`h-11 w-full rounded-[14px] bg-background px-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted ${
              error ? 'shadow-[0_0_0_1px_#ef4444]' : 'shadow-subtle focus:shadow-card'
            }`}
          />
          {error && (
            <p id="stats-password-error" className="mt-2 text-xs text-[#ef4444]">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending || input.length === 0}
            className="mt-3 h-11 w-full rounded-[14px] bg-foreground text-sm font-medium text-white shadow-button transition-all duration-200 hover:bg-foreground/90 hover:shadow-button-hover disabled:opacity-40"
          >
            {pending ? 'Checking…' : 'Open'}
          </button>
        </form>
      </div>
    </main>
  )
}
