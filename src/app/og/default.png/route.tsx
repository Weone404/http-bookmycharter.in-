import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

/**
 * The social card, generated in code.
 *
 * Every page's `og:image` pointed at `/og/default.png`, which did not exist —
 * so every share would have rendered without a card. Rather than ship a
 * photograph we have no licence for, this draws a typographic card at build
 * time: no asset, no licensing exposure, and it cannot drift from the brand
 * tokens.
 *
 * `force-static` bakes it into the build output instead of rendering per
 * request.
 */
export const dynamic = 'force-static';

/**
 * `size` and `contentType` are exports of the `opengraph-image` file
 * convention, not of a Route Handler — Next.js rejects them here. The
 * dimensions are passed to ImageResponse directly instead.
 */
const SIZE = { width: 1200, height: 630 } as const;

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0B1726',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path d="M2 13.6l20-9.1-4.4 9.1 4.4 9.1-20-9.1z" fill="#F4F6F9" opacity="0.9" />
          </svg>
          <div style={{ display: 'flex', gap: '10px', fontSize: 40, fontWeight: 600, color: '#F4F6F9' }}>
            <span>Book My</span>
            <span style={{ color: '#8AB4FF' }}>Charter</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 600,
              color: '#F4F6F9',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              maxWidth: '900px',
            }}
          >
            Private aviation, planned around you.
          </div>
          <div style={{ fontSize: 30, color: '#9DB0C0', maxWidth: '860px' }}>
            Private jets, helicopters and aircraft charter across India.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '120px', height: '3px', background: '#8AB4FF' }} />
          <div style={{ fontSize: 24, color: '#9DB0C0', letterSpacing: '0.08em' }}>
            {SITE.url.replace('https://', '')}
          </div>
        </div>
      </div>
    ),
    SIZE,
  );
}
