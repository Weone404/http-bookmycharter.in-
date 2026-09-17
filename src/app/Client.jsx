'use client';

import { BackgroundVideo } from '../components/BackgroundVideo';

export default function Client() {
  return (
    <>
      <BackgroundVideo
        initialVideoUrl="/aircraft-videos.mp4"
        posterUrl="/images/airplane_sunset_bg_1788159475386-optimized.webp"
      />
    </>
  );
}
