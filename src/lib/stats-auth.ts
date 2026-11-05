import { createHash, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const STATS_COOKIE = 'stats_auth'

/** No fallback: with STATS_PASSWORD unset the dashboard stays locked (the repo is public). */
function password(): string | undefined {
  return process.env.STATS_PASSWORD || undefined
}

export function isConfigured(): boolean {
  return Boolean(password())
}

function sessionToken(secret: string): string {
  return createHash('sha256').update(`stats:${secret}`).digest('hex')
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

export function checkPassword(attempt: string): string | null {
  const secret = password()
  if (!secret || !safeEqual(attempt, secret)) return null
  return sessionToken(secret)
}

export async function isUnlocked(): Promise<boolean> {
  const secret = password()
  if (!secret) return false
  const cookie = (await cookies()).get(STATS_COOKIE)?.value
  return Boolean(cookie) && safeEqual(cookie as string, sessionToken(secret))
}
