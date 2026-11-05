import type { Metadata } from 'next'

// Private page (the page itself is a client component, so its metadata lives here).
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
