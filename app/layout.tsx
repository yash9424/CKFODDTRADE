import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingActions } from '@/components/layout/FloatingActions'
import { addressLines, site } from '@/lib/site'
import { images } from '@/lib/images'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

// Variable font — weight axis comes along automatically, so no `weight` list.
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'CK Foodstuff Trading LLC | International Food Trading Dubai',
    template: '%s | CK Foodstuff Trading LLC',
  },
  description: site.description,
  keywords: [
    'food trading Dubai',
    'rice supplier Dubai',
    'spice exporter Dubai',
    'foodstuff trading LLC',
    'global food sourcing',
    'fresh fruit supplier UAE',
    'milk powder trading Dubai',
    'container food supply GCC',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: site.name,
    title: 'CK Foodstuff Trading LLC | International Food Trading Dubai',
    description: site.description,
    url: site.url,
    images: [{ url: images.homeHero, width: 1280, height: 695, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CK Foodstuff Trading LLC | International Food Trading Dubai',
    description: site.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#03180F',
  width: 'device-width',
  initialScale: 1,
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  alternateName: 'CK Foodstuff',
  url: site.url,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Office B01, Al Abbas 2 Building, Bank Street, Bur Dubai',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  areaServed: ['AE', 'GCC', 'Asia', 'Africa', 'Europe'],
  knowsAbout: [
    'Food trading',
    'Global sourcing',
    'Rice export',
    'Spice trading',
    'Fresh produce logistics',
    'Milk powder sourcing',
  ],
  location: addressLines.join(', '),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        {/* Without JS the scroll-reveal class would leave content hidden. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  )
}
