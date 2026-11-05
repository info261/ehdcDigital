import { list } from '@vercel/blob'

/** Every gallery photo lives under this prefix in the Blob store. */
export const PHOTOS_PREFIX = 'photos/'

export interface Photo {
  url: string
  pathname: string
  width: number
  height: number
  alt: string
  uploadedAt: number
}

// A photo carries its own metadata in its pathname, which is what lets the
// gallery run without a database:
//   photos/<ms>-<rand>__<width>x<height>__<slug>.<ext>
// The browser measures the dimensions before uploading so the grid can reserve
// each tile's height up front and never reflow as the images stream in. The
// random suffix keeps two files picked in the same millisecond from colliding,
// since uploads are stored under an exact pathname rather than a generated one.
const PHOTO_NAME = /^(\d+)-[a-z0-9]+__(\d+)x(\d+)__(.+)\.([a-z0-9]+)$/i

export function slugify(name: string): string {
  return (
    name
      .normalize('NFKD')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase()
      .slice(0, 60) || 'photo'
  )
}

export function buildPathname(opts: {
  filename: string
  width: number
  height: number
}): string {
  const dot = opts.filename.lastIndexOf('.')
  const stem = dot > 0 ? opts.filename.slice(0, dot) : opts.filename
  const ext = dot > 0 ? opts.filename.slice(dot + 1).toLowerCase() : 'jpg'
  const safeExt = /^[a-z0-9]+$/.test(ext) ? ext : 'jpg'

  const rand = Math.random().toString(36).slice(2, 8)

  return `${PHOTOS_PREFIX}${Date.now()}-${rand}__${opts.width}x${opts.height}__${slugify(stem)}.${safeExt}`
}

/** Guards the upload endpoint: only pathnames the gallery can read back are signed. */
export function isPhotoPathname(pathname: string): boolean {
  return (
    pathname.startsWith(PHOTOS_PREFIX) &&
    PHOTO_NAME.test(pathname.slice(PHOTOS_PREFIX.length))
  )
}

function parsePhoto(blob: { url: string; pathname: string }): Photo | null {
  const name = blob.pathname.slice(PHOTOS_PREFIX.length)
  const match = PHOTO_NAME.exec(name)
  if (!match) return null

  const [, ms, width, height, slug] = match
  return {
    url: blob.url,
    pathname: blob.pathname,
    width: Number(width),
    height: Number(height),
    alt: slug.replace(/-/g, ' '),
    uploadedAt: Number(ms),
  }
}

/**
 * Reads the whole gallery straight out of Blob storage, newest first. Blobs
 * that don't match the naming scheme (anything uploaded by hand) are skipped
 * rather than rendered at an unknown aspect ratio.
 */
export async function getPhotos(): Promise<Photo[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return []

  const photos: Photo[] = []
  let cursor: string | undefined

  do {
    const page = await list({ prefix: PHOTOS_PREFIX, cursor, limit: 1000 })
    for (const blob of page.blobs) {
      const photo = parsePhoto(blob)
      if (photo) photos.push(photo)
    }
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)

  return photos.sort((a, b) => b.uploadedAt - a.uploadedAt)
}
