import type { Metadata } from 'next'
import SupportGate from './SupportGate'

// Private client document — kept out of search results and the sitemap.
export const metadata: Metadata = {
  title: 'Site support plans',
  description: 'Ongoing support plans for a site that is already live.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: undefined },
}

export default function SupportPage() {
  return <SupportGate />
}
