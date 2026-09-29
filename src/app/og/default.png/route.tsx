import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';
import { BRAND_GOLD } from '@/components/ui/BrandMark';
import { LOGO_WIDTH, MARK_PATHS, WORD_PATHS } from '@/components/ui/logo-paths';

/**
 * The social card, generated in code at build time: the illustrated
 * background from public/images, with the wordmark, headline and domain drawn
 * over it so they are always crisp and exact. No logo is baked into any
 * generated image.
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
  // The illustrated background (public/images, built by `npm run images`),
  // inlined so the card renders at build time with no network fetch. The
  // wordmark and text stay in code so they are always crisp and exact.
  const background = `data:image/jpeg;base64,${readFileSync(
    join(process.cwd(), 'public/images/og-background.jpg'),
  ).toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: '#0B1726',
        fontFamily: 'sans-serif',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img only */}
      <img
        src={background}
        alt=""
        width={1200}
        height={630}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1200px',
          height: '630px',
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1200px',
          height: '630px',
          background:
            'linear-gradient(90deg, rgba(11,23,38,0.92) 0%, rgba(11,23,38,0.7) 45%, rgba(11,23,38,0) 80%)',
        }}
      />
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex' }}>
          <svg width={(LOGO_WIDTH * 76) / 100} height="76" viewBox={`0 0 ${LOGO_WIDTH} 100`}>
            <path d={MARK_PATHS.top} fill="#FFFFFF" />
            <path d={MARK_PATHS.bottom} fill="#FFFFFF" />
            <path d={MARK_PATHS.wing} fill={BRAND_GOLD} />
            {WORD_PATHS.map((p, i) => (
              <path key={i} d={p.d} transform={p.transform} fill={p.role === 'accent' ? BRAND_GOLD : '#FFFFFF'} />
            ))}
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 600,
              color: '#F4F6F9',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              maxWidth: '640px',
            }}
          >
            Private jet & helicopter charter across India
          </div>
          <div style={{ fontSize: 30, color: '#C9D4E0', maxWidth: '600px' }}>
            Aircraft options with the cost broken down, before you commit.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '120px', height: '3px', background: '#8AB4FF' }} />
          <div style={{ fontSize: 24, color: '#9DB0C0', letterSpacing: '0.08em' }}>
            {SITE.url.replace('https://', '')}
          </div>
        </div>
      </div>
    </div>,
    SIZE,
  );
}
