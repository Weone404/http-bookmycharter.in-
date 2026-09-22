'use client';

import { AviationCanvas } from './AviationCanvas';
import { PageHeaderScene, type HeaderForm } from './PageHeaderScene';
import { useSceneConfig } from './useSceneConfig';

/**
 * The band's WebGL layer, in its own module so the band can import it lazily.
 *
 * Nothing above this file imports Three.js, which is what keeps the library
 * out of every inner page's initial JavaScript.
 */
export default function PageHeaderCanvas({ form }: { readonly form: HeaderForm }) {
  const { config } = useSceneConfig();

  return (
    <AviationCanvas
      config={config}
      pointerSource="window"
      ariaLabel="Decorative three-dimensional aircraft. It carries no information; everything on this page is text."
    >
      {() => <PageHeaderScene config={config} form={form} />}
    </AviationCanvas>
  );
}
