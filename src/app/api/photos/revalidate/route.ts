import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { isUnlocked } from '@/lib/photos-auth'

export async function POST() {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })
  }

  revalidatePath('/photos')
  revalidatePath('/photos/new')
  return NextResponse.json({ ok: true })
}
