import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ehdcdigital.com'),
  icons: {
    icon: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg',
    apple: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg',
  },
  title: {
    default: 'ehdcDigital | High-Converting Websites for Startups & Agencies',
    template: '%s | ehdcDigital',
  },
  description: 'I design and build high-converting websites that turn visitors into customers. Webflow Certified Partner specializing in web design, development, branding, and automations for startups, agencies, and founders.',
  keywords: ['web design', 'webflow developer', 'webflow certified partner', 'website design', 'branding', 'UI/UX design', 'startup website', 'agency website', 'high-converting websites', 'automations'],
  authors: [{ name: 'Erik Hudec', url: 'https://ehdcdigital.com' }],
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
    url: 'https://ehdcdigital.com',
    siteName: 'ehdcDigital',
    title: 'ehdcDigital | High-Converting Websites for Startups & Agencies',
    description: 'I design and build high-converting websites that turn visitors into customers. Webflow Certified Partner specializing in web design, development, branding, and automations.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ehdcDigital - High-Converting Websites',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ehdcDigital | High-Converting Websites for Startups & Agencies',
    description: 'I design and build high-converting websites that turn visitors into customers. Webflow Certified Partner.',
    images: ['/og-image.png'],
    creator: '@ehdcdigital',
  },
  alternates: {
    canonical: 'https://ehdcdigital.com',
  },
  category: 'technology',
}

// JSON-LD Schema markup
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://ehdcdigital.com/#website',
      url: 'https://ehdcdigital.com',
      name: 'ehdcDigital',
      description: 'High-converting websites for startups, agencies, and founders',
      publisher: { '@id': 'https://ehdcdigital.com/#person' },
    },
    {
      '@type': 'Person',
      '@id': 'https://ehdcdigital.com/#person',
      name: 'Erik Hudec',
      url: 'https://ehdcdigital.com',
      image: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg',
      sameAs: [
        'https://contra.com/erik_hudec_tfzihkdd',
        'https://cal.com/ehdcdigital',
      ],
      jobTitle: 'Web Designer & Webflow Developer',
      worksFor: { '@id': 'https://ehdcdigital.com/#organization' },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://ehdcdigital.com/#organization',
      name: 'ehdcDigital',
      url: 'https://ehdcdigital.com',
      logo: 'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg',
      description: 'I design and build high-converting websites that turn visitors into customers.',
      founder: { '@id': 'https://ehdcdigital.com/#person' },
      email: 'info@ehdcdigital.com',
      areaServed: 'Worldwide',
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
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '5',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What services does ehdcDigital offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ehdcDigital offers web design, Webflow development, branding, and automation services for startups, agencies, and founders.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is ehdcDigital a Webflow Certified Partner?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, ehdcDigital is an official Webflow Certified Partner, ensuring high-quality Webflow development and best practices.',
          },
        },
      ],
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
      </body>
    </html>
  )
}
