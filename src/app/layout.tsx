import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SITE } from '@/lib/site';
import { graph, organizationSchema, websiteSchema } from '@/lib/schema';
import { OG_IMAGE } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { Analytics } from '@/components/analytics/Analytics';
import { MobileActionBar } from '@/components/navigation/MobileActionBar';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Private Jet & Helicopter Charter in India`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: { telephone: true, address: false, email: false },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileActionBar />
        {/* One @graph for the whole site identity; pages add their own nodes. */}
        <JsonLd json={graph([organizationSchema(), websiteSchema()])} />
        {/* Renders nothing without NEXT_PUBLIC_GA_ID. Also installs the one
            delegated listener that reads every data-track attribute. */}
        <Analytics />
      </body>
    </html>
  );
}
