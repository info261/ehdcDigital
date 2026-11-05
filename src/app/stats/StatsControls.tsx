'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IGNORE_KEY } from '@/components/Analytics'

/** "Don't count me" toggle for this browser, plus sign-out. */
export default function StatsControls() {
  const router = useRouter()
  const [ignored, setIgnored] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      setIgnored(window.localStorage.getItem(IGNORE_KEY) === '1')
    } catch {
      setIgnored(false)
    }
  }, [])

  function toggle() {
    const next = !ignored
    try {
      if (next) window.localStorage.setItem(IGNORE_KEY, '1')
      else window.localStorage.removeItem(IGNORE_KEY)
      setIgnored(next)
    } catch {}
  }

  async function signOut() {
    await fetch('/api/stats/auth', { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      {ignored !== null && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={ignored}
          className="rounded-[14px] bg-white px-3 py-2 text-sm text-muted shadow-subtle transition-colors hover:text-foreground"
        >
          {ignored ? '✓ My visits excluded' : 'Exclude my visits'}
        </button>
      )}
      <button
        type="button"
        onClick={signOut}
        className="rounded-[14px] px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        Sign out
      </button>
    </div>
  )
}
