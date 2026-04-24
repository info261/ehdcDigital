'use client'

import { useState } from 'react'
import { teslaCpHtml } from './content'

export default function TeslaCpPage() {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('tesla-cp-auth') === '1'
    }
    return false
  })
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input === 'teslaholding2026') {
      sessionStorage.setItem('tesla-cp-auth', '1')
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (unlocked) {
    return (
      <iframe
        srcDoc={teslaCpHtml}
        style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
        title="Tesla Energy Holding — Cenová ponuka"
      />
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f7f7f6',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        border: '0.5px solid #e2e8f0',
        borderRadius: 16,
        padding: '40px 36px',
        width: '100%',
        maxWidth: 360,
        boxShadow: '0 4px 16px rgba(15,23,42,0.08)',
      }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 6 }}>
            ehdcDigital
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
            Prístup chránený heslom
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 4 }}>
            Zadajte heslo pre zobrazenie dokumentu.
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false) }}
            placeholder="Heslo"
            autoFocus
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 10,
              border: error ? '1px solid #ef4444' : '0.5px solid #e2e8f0',
              fontSize: '0.875rem',
              outline: 'none',
              marginBottom: 10,
              boxSizing: 'border-box',
              background: '#f7f7f6',
              color: '#0f172a',
            }}
          />
          {error && (
            <div style={{ fontSize: '0.75rem', color: '#ef4444', marginBottom: 10 }}>
              Nesprávne heslo.
            </div>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 10,
              border: 'none',
              background: '#0f172a',
              color: '#fff',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Otvoriť
          </button>
        </form>
      </div>
    </div>
  )
}
