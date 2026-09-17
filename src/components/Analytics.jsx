import Script from 'next/script';

/**
 * GA4 + Microsoft Clarity. Both no-op unless their env var is set, so a
 * missing ID never ships a broken or fabricated tag.
 *
 * Set in Vercel > Project > Environment Variables:
 *   NEXT_PUBLIC_GA_ID       e.g. G-XXXXXXXXXX
 *   NEXT_PUBLIC_CLARITY_ID  e.g. abcdefghij
 */
export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const clarity = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {ga ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      ) : null}

      {clarity ? (
        <Script id="ms-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`}
        </Script>
      ) : null}
    </>
  );
}
