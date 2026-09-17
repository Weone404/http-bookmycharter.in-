/**
 * One JSON-LD script per page, carrying a single @graph.
 *
 * Server Component: the structured data is in the HTML the crawler receives,
 * not injected after hydration.
 */
export function JsonLd({ json }: { json: string }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built by src/lib/schema.ts from typed site data, never
      // from user input.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
