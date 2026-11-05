import type { Metadata } from 'next'
import { getPhotos } from '@/lib/photos'
import { isConfigured, isUnlocked } from '@/lib/photos-auth'
import PhotoGate from './PhotoGate'
import PhotoUploader from './PhotoUploader'

export const metadata: Metadata = {
  title: 'Add photos',
  robots: { index: false, follow: false },
}

export default async function NewPhotoPage() {
  if (!isConfigured()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6" role="main">
        <div className="w-full max-w-sm rounded-2xl bg-white p-9 shadow-card">
          <h1 className="font-heading text-lg font-semibold text-foreground">
            Uploads aren&apos;t configured
          </h1>
          <p className="mt-1 text-sm text-muted">
            Set the <code className="text-foreground">PHOTOS_PASSWORD</code> environment variable
            to unlock this page.
          </p>
        </div>
      </main>
    )
  }

  if (!(await isUnlocked())) return <PhotoGate />

  return <PhotoUploader photos={await getPhotos()} />
}
