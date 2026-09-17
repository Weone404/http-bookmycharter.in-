'use client';

import React, { useEffect, useRef, useState } from 'react';

export const BackgroundVideo = ({
  initialVideoUrl = '/aircraft-videos.mp4',
  posterUrl = '/images/airplane_sunset_bg_1788159475386-optimized.webp',
  onVideoLoaded,
}) => {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let idleCallbackId;
    let timeoutId;

    const playVideo = () => {
      video.muted = true;
      video.play().catch(() => {
        // Browsers may block autoplay until the user interacts with the page.
      });
    };

    const schedulePlayback = () => {
      if ('requestIdleCallback' in window) {
        idleCallbackId = window.requestIdleCallback(playVideo);
      } else {
        timeoutId = window.setTimeout(playVideo, 0);
      }
    };

    if (document.readyState === 'complete') {
      schedulePlayback();
    } else {
      window.addEventListener('load', schedulePlayback, { once: true });
    }

    return () => {
      window.removeEventListener('load', schedulePlayback);
      if (idleCallbackId !== undefined) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        preload="metadata"
        loop
        muted
        playsInline
        poster={posterUrl}
        onError={() => setHasError(true)}
        onLoadedData={() => {
          setHasError(false);
          onVideoLoaded?.();
        }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src={initialVideoUrl} type="video/mp4" />
      </video>

      {hasError && (
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${posterUrl})`,
            backgroundPosition: 'center 40%',
          }}
        />
      )}
    </div>
  );
};
