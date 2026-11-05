import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { PHOTOS_PREFIX } from '@/lib/photos'
import { isUnlocked } from '@/lib/photos-auth'

export async function POST(request: Request) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })
  }

  const { pathname } = (await request.json()) as { pathname?: unknown }
  // Scope deletes to the gallery prefix so this endpoint can never be used to
  // empty the rest of the Blob store.
  if (typeof pathname !== 'string' || !pathname.startsWith(PHOTOS_PREFIX)) {
    return NextResponse.json({ error: 'Unknown photo.' }, { status: 400 })
  }

  await del(pathname)
  revalidatePath('/photos')
  revalidatePath('/photos/new')
  return NextResponse.json({ ok: true })
}
