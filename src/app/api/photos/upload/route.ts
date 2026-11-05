import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { isPhotoPathname } from '@/lib/photos'
import { isUnlocked } from '@/lib/photos-auth'

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
]

/**
 * Hands the browser a short-lived upload token so the file goes straight from
 * the device to Blob storage — the photo never passes through a function, so
 * full-resolution originals upload without hitting any request body limit.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!(await isUnlocked())) throw new Error('Not authorised.')
        if (!isPhotoPathname(pathname)) throw new Error('Unexpected filename.')

        return {
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: 25 * 1024 * 1024,
          addRandomSuffix: false,
        }
      },
      // Only fires when the app is reachable from the internet, so the client
      // also pings /api/photos/revalidate — this keeps deployed uploads instant.
      onUploadCompleted: async () => {
        revalidatePath('/photos')
        revalidatePath('/photos/new')
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )
  }
}
