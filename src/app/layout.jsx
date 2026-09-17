import './globals.css';
import { Plus_Jakarta_Sans, Noto_Sans_Devanagari } from 'next/font/google';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Analytics } from '../components/Analytics';
import { ConversionTracking } from '../components/ConversionTracking';
import { SITE } from '../lib/site';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-devanagari',
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Private Jet & Helicopter Charter Services in India | BookMyChardham',
    template: '%s | BookMyChardham',
  },
  description:
    'BookMyChardham provides private jet charter, helicopter charter, and aircraft charter services across India for business, leisure, and pilgrimage travel.',
  applicationName: SITE.name,
  manifest: '/site.webmanifest',
  openGraph: {
    siteName: SITE.name,
    locale: SITE.locale,
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  verification: {
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION } }
      : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport = {
  themeColor: '#6B4E3D',
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`dark ${jakarta.variable} ${devanagari.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-[#F3E9D0] text-[#6B4E3D] antialiased min-h-screen flex flex-col justify-between selection:bg-[#A67C52] selection:text-[#F3E9D0] font-sans">
        <Navbar />
        <main className="flex-1 w-full relative z-10">{children}</main>
        <Footer />
        <Analytics />
        <ConversionTracking />
      </body>
    </html>
  );
}
