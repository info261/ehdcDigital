import { createHash, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const PHOTOS_COOKIE = 'photos_auth'

/**
 * The gate password. This repo is public, so it deliberately has no fallback —
 * with PHOTOS_PASSWORD unset the upload page stays locked for everyone.
 */
function password(): string | undefined {
  return process.env.PHOTOS_PASSWORD || undefined
}

export function isConfigured(): boolean {
  return Boolean(password())
}

/** What we store in the cookie: a hash, so the password itself never leaves the server. */
export function sessionToken(secret: string): string {
  return createHash('sha256').update(`photos:${secret}`).digest('hex')
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

export function checkPassword(attempt: string): string | null {
  const secret = password()
  if (!secret || !safeEqual(attempt, secret)) return null
  return sessionToken(secret)
}

export async function isUnlocked(): Promise<boolean> {
  const secret = password()
  if (!secret) return false

  const cookie = (await cookies()).get(PHOTOS_COOKIE)?.value
  return Boolean(cookie) && safeEqual(cookie as string, sessionToken(secret))
}
