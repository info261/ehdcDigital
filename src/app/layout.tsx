import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import Analytics from '@/components/Analytics'
import { BOOKING_URL, faqs } from '@/data/faq'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ehdcdigital.com'),
  icons: {
    icon: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg',
    apple: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg',
  },
  title: {
    default: 'ehdcDigital | High-Converting Websites for Startups & Agencies',
    template: '%s | ehdcDigital',
  },
  description: 'High-converting websites for startups, agencies and founders. Erik Hudec, a Webflow Certified Partner, designs and builds sites that turn visitors into customers.',
  keywords: ['web design', 'webflow developer', 'webflow certified partner', 'website design', 'branding', 'UI/UX design', 'startup website', 'agency website', 'high-converting websites', 'automations'],
  authors: [{ name: 'Erik Hudec', url: 'https://www.ehdcdigital.com' }],
  creator: 'Erik Hudec',
  publisher: 'ehdcDigital',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.ehdcdigital.com',
    siteName: 'ehdcDigital',
    title: 'ehdcDigital | High-Converting Websites for Startups & Agencies',
    description: 'High-converting websites for startups, agencies and founders. Webflow Certified Partner designing and building sites that turn visitors into customers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ehdcDigital | High-Converting Websites for Startups & Agencies',
    description: 'High-converting websites for startups, agencies and founders. Webflow Certified Partner designing and building sites that turn visitors into customers.',
    creator: '@HudecErik',
  },
  alternates: {
    canonical: 'https://www.ehdcdigital.com',
  },
  category: 'technology',
}

// JSON-LD Schema markup
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.ehdcdigital.com/#website',
      url: 'https://www.ehdcdigital.com',
      name: 'ehdcDigital',
      description: 'High-converting websites for startups, agencies, and founders',
      publisher: { '@id': 'https://www.ehdcdigital.com/#person' },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.ehdcdigital.com/#person',
      name: 'Erik Hudec',
      url: 'https://www.ehdcdigital.com',
      image: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg',
      sameAs: [
        'https://www.linkedin.com/in/erik-hudec-091b0612b/',
        'https://x.com/HudecErik',
        'https://contra.com/erik_hudec_tfzihkdd',
        'https://eriks-newsletter-70c132.beehiiv.com/',
      ],
      jobTitle: 'Web Designer & Webflow Developer',
      homeLocation: { '@type': 'Place', name: 'Prague, Czech Republic' },
      knowsAbout: ['Web design', 'Webflow', 'UI/UX design', 'Branding', 'Conversion rate optimization', 'Web accessibility', 'SEO', 'Automations'],
      worksFor: { '@id': 'https://www.ehdcdigital.com/#organization' },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://www.ehdcdigital.com/#organization',
      name: 'ehdcDigital',
      url: 'https://www.ehdcdigital.com',
      logo: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg',
      description: 'I design and build high-converting websites that turn visitors into customers.',
      founder: { '@id': 'https://www.ehdcdigital.com/#person' },
      email: 'info@ehdcdigital.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Prague', addressCountry: 'CZ' },
      areaServed: 'Worldwide',
      sameAs: ['https://www.linkedin.com/in/erik-hudec-091b0612b/', 'https://x.com/HudecErik'],
      potentialAction: {
        '@type': 'ReserveAction',
        name: 'Book an intro call',
        target: BOOKING_URL,
      },
      serviceType: ['Web Design', 'Webflow Development', 'Branding', 'Automations'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Web Design Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Web Design',
              description: 'Strategic UI/UX that converts visitors into paying customers.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Webflow Development',
              description: 'Fast, scalable sites you can edit yourself—no code needed.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Branding',
              description: 'Memorable identity that builds trust and stands out.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Automations',
              description: 'Smart workflows that save hours and eliminate busywork.',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.ehdcdigital.com/#faq',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=open-runde@400,600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://cdn.visitors.now/v.js"
          data-token="15eaaebd-2657-467f-9019-568141485a8d"
          data-persist
          strategy="afterInteractive"
        />
        <Script
          src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"
          strategy="beforeInteractive"
        />
        <Script
          id="usercentrics-cmp"
          src="https://web.cmp.usercentrics.eu/ui/loader.js"
          data-settings-id="5JJ_YAJAToTIr8"
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-lg"
        >
          Skip to main content
        </a>
        <LenisProvider>
          {children}
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
