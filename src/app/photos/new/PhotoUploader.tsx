'use client'

import { upload } from '@vercel/blob/client'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { ArrowLeft, ImageSquare, Trash } from '@phosphor-icons/react'
import { buildPathname, type Photo } from '@/lib/photos'

interface Upload {
  id: string
  name: string
  progress: number
  error?: string
}

/** Reads the real pixel size, which the gallery stores in the pathname. */
function measure(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve({ width: image.naturalWidth, height: image.naturalHeight })
    }
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error("This browser can't read that image (HEIC isn't supported)."))
    }
    image.src = objectUrl
  })
}

export default function PhotoUploader({ photos }: { photos: Photo[] }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploads, setUploads] = useState<Upload[]>([])
  const [dragging, setDragging] = useState(false)
  const [busy, setBusy] = useState(false)

  const patch = useCallback((id: string, changes: Partial<Upload>) => {
    setUploads((current) =>
      current.map((item) => (item.id === id ? { ...item, ...changes } : item))
    )
  }, [])

  const send = useCallback(
    async (files: File[]) => {
      const images = files.filter((file) => file.type.startsWith('image/'))
      if (images.length === 0) return

      setBusy(true)
      const queued: Upload[] = images.map((file, i) => ({
        id: `${Date.now()}-${i}-${file.name}`,
        name: file.name,
        progress: 0,
      }))
      setUploads((current) => [...queued, ...current])

      // Sequential, so a phone on a weak connection isn't racing several
      // full-resolution uploads at once.
      for (const [i, file] of images.entries()) {
        const { id } = queued[i]
        try {
          const { width, height } = await measure(file)
          await upload(buildPathname({ filename: file.name, width, height }), file, {
            access: 'public',
            handleUploadUrl: '/api/photos/upload',
            contentType: file.type,
            multipart: true,
            onUploadProgress: ({ percentage }) => patch(id, { progress: percentage }),
          })
          patch(id, { progress: 100 })
        } catch (error) {
          patch(id, { error: (error as Error).message })
        }
      }

      // onUploadCompleted doesn't fire on localhost, so refresh the gallery here.
      await fetch('/api/photos/revalidate', { method: 'POST' })
      router.refresh()
      setBusy(false)
    },
    [patch, router]
  )

  async function remove(photo: Photo) {
    await fetch('/api/photos/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pathname: photo.pathname }),
    })
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-background py-20 sm:py-24" role="main">
      <div className="mx-auto w-full max-w-2xl px-6">
        <header className="mb-10">
          <a
            href="/photos"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} weight="bold" />
            Back to photos
          </a>
          <span className="mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">
            ehdcDigital
          </span>
          <h1 className="font-heading text-2xl font-semibold text-foreground">Add photos</h1>
          <p className="mt-1 text-sm text-muted">
            Drop them in — they go live on /photos right away.
          </p>
        </header>

        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            void send(Array.from(e.dataTransfer.files))
          }}
          className={`rounded-2xl bg-[#f1f5f9] p-3 transition-shadow duration-200 ${
            dragging ? 'shadow-card' : ''
          }`}
        >
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className={`flex w-full flex-col items-center justify-center gap-3 rounded-[10px] border border-dashed px-6 py-14 text-center transition-colors duration-200 disabled:opacity-60 ${
              dragging
                ? 'border-foreground/40 bg-white'
                : 'border-foreground/15 bg-white/60 hover:bg-white'
            }`}
          >
            <ImageSquare size={24} className="text-muted" />
            <span className="text-sm font-medium text-foreground">
              {busy ? 'Uploading…' : 'Choose photos or drop them here'}
            </span>
            <span className="text-xs text-muted">JPG, PNG, WebP, AVIF or GIF · up to 25 MB each</span>
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              void send(Array.from(e.target.files ?? []))
              e.target.value = ''
            }}
          />
        </div>

        {uploads.length > 0 && (
          <ul className="mt-4 space-y-2">
            {uploads.map((item) => (
              <li key={item.id} className="rounded-[14px] bg-white p-3 shadow-subtle">
                <div className="flex items-center justify-between gap-4">
                  <span className="truncate text-xs text-foreground">{item.name}</span>
                  <span
                    className={`shrink-0 text-xs tabular-nums ${
                      item.error ? 'text-[#ef4444]' : 'text-muted'
                    }`}
                  >
                    {item.error ? 'Failed' : item.progress === 100 ? 'Done' : `${Math.round(item.progress)}%`}
                  </span>
                </div>
                {item.error ? (
                  <p className="mt-1 text-xs text-[#ef4444]">{item.error}</p>
                ) : (
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#f1f5f9]">
                    <div
                      className="h-full rounded-full bg-foreground transition-[width] duration-300 ease-out"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <section className="mt-14">
          <h2 className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">
            In the gallery · {photos.length}
          </h2>

          {photos.length === 0 ? (
            <p className="text-sm text-muted">Nothing uploaded yet.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {photos.map((photo) => (
                <li key={photo.pathname} className="group relative">
                  <div className="overflow-hidden rounded-[10px] bg-[#f1f5f9]">
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      loading="lazy"
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => void remove(photo)}
                    aria-label={`Delete ${photo.alt}`}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 shadow-subtle backdrop-blur transition-all duration-200 hover:text-[#ef4444] hover:shadow-card focus-visible:opacity-100 group-hover:opacity-100"
                  >
                    <Trash size={13} weight="bold" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
