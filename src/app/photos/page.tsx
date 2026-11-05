import type { Metadata } from 'next'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import Container from '@/components/ui/Container'
import { getPhotos } from '@/lib/photos'
import PhotoGrid from './PhotoGrid'

// Uploads call /api/photos/revalidate, so this only bounds how stale the page
// can get if a photo is ever added outside the app.
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Photos',
  description: 'A personal photo journal by Erik Hudec.',
  alternates: { canonical: 'https://www.ehdcdigital.com/photos' },
}

export default async function PhotosPage() {
  const photos = await getPhotos()

  return (
    <main id="main-content" className="min-h-screen bg-background py-20 sm:py-28" role="main">
      <Container>
        <header className="mb-14 sm:mb-20">
          <a
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} weight="bold" />
            Back
          </a>
          <span className="mb-3 block text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">
            ehdcDigital
          </span>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Photos
          </h1>
          <p className="mt-4 max-w-md text-pretty text-base text-muted">
            Things I noticed on the way somewhere else.
          </p>
        </header>

        {photos.length > 0 ? (
          <PhotoGrid photos={photos} />
        ) : (
          <div className="rounded-2xl bg-[#f1f5f9] px-8 py-20 text-center">
            <p className="text-sm text-muted">
              No photos yet. Add the first one from{' '}
              <a href="/photos/new" className="text-foreground underline underline-offset-4">
                /photos/new
              </a>
              .
            </p>
          </div>
        )}
      </Container>
    </main>
  )
}
