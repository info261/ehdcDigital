import { NextResponse } from 'next/server'
import { PHOTOS_COOKIE, checkPassword, isConfigured } from '@/lib/photos-auth'

export async function POST(request: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: 'Uploads are not configured yet — PHOTOS_PASSWORD is unset.' },
      { status: 503 }
    )
  }

  const { password } = (await request.json()) as { password?: unknown }
  const token = typeof password === 'string' ? checkPassword(password) : null

  if (!token) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(PHOTOS_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete(PHOTOS_COOKIE)
  return response
}
