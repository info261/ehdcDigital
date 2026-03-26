'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
          Something went wrong
        </h2>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
