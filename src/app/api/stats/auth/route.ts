import { NextResponse } from 'next/server'
import { STATS_COOKIE, checkPassword, isConfigured } from '@/lib/stats-auth'

export async function POST(request: Request) {
  if (!isConfigured()) {
    return NextResponse.json({ error: 'STATS_PASSWORD is not set.' }, { status: 503 })
  }

  const { password } = (await request.json().catch(() => ({}))) as { password?: unknown }
  const token = typeof password === 'string' ? checkPassword(password) : null
  if (!token) return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })

  const response = NextResponse.json({ ok: true })
  response.cookies.set(STATS_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 90,
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete(STATS_COOKIE)
  return response
}
