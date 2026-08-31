'use client'

import { useEffect, useState } from 'react'
import SupportPlans from './SupportPlans'

// Change this to rotate the link's password.
const PASSWORD = 'ehdcsupport2026'
const STORAGE_KEY = 'support-plans-auth'

export default function SupportGate() {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)
  // The page is prerendered, so sessionStorage can only be read after mount —
  // reading it during render would make the first client render disagree with
  // the server HTML. `ready` holds a blank frame until we know which to show.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(STORAGE_KEY) === '1')
    setReady(true)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (!ready) {
    return <div className="min-h-screen bg-background" />
  }

  if (unlocked) {
    return <SupportPlans />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-card p-9">
        <div className="mb-7">
          <span className="block text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted mb-2">
            ehdcDigital
          </span>
          <h1 className="font-heading text-lg font-semibold text-foreground">
            Password protected
          </h1>
          <p className="mt-1 text-sm text-muted">Enter the password to view this document.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="support-password" className="sr-only">
            Password
          </label>
          <input
            id="support-password"
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setError(false)
            }}
            placeholder="Password"
            autoFocus
            aria-invalid={error}
            aria-describedby={error ? 'support-password-error' : undefined}
            className={`w-full h-11 px-4 rounded-[14px] bg-background text-sm text-foreground placeholder:text-muted outline-none transition-shadow ${
              error
                ? 'shadow-[0_0_0_1px_#ef4444]'
                : 'shadow-subtle focus:shadow-card'
            }`}
          />
          {error && (
            <p id="support-password-error" className="mt-2 text-xs text-[#ef4444]">
              Incorrect password.
            </p>
          )}
          <button
            type="submit"
            className="mt-3 w-full h-11 rounded-[14px] bg-foreground text-white text-sm font-medium shadow-button hover:bg-foreground/90 hover:shadow-button-hover transition-all duration-200"
          >
            Open
          </button>
        </form>
      </div>
    </div>
  )
}
