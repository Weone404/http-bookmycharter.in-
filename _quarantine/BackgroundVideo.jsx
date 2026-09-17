'use client';

import React, { useRef, useEffect, useState } from 'react';

export const BackgroundVideo = ({
  initialVideoUrl = 'https://console.cloudinary.com/app/c-01761eb9eda93aa675327b3650493b/assets/media_library/asset/9667cb3da5508ae4ca18bc6cfb2c1805/video',
  posterUrl = '/images/airplane_sunset_bg_1788159475386.webp',
  onVideoLoaded,
}) => {
  const videoRef = useRef(null);
  const [activeSrc, setActiveSrc] = useState('');
  const [hasError, setHasError] = useState(false);

  // Formatter to convert Cloudinary Console URL or other URLs to direct stream URLs if possible
  const resolveStreamUrl = (url) => {
    if (!url) return '';
    const trimmed = url.trim();

    // If already direct video format
    if (trimmed.endsWith('.mp4') || trimmed.endsWith('.webm') || trimmed.endsWith('.mov') || trimmed.startsWith('blob:')) {
      return trimmed;
    }

    // If Cloudinary console URL: extract asset ID or cloud name
    if (trimmed.includes('cloudinary.com')) {
      const match = trimmed.match(/asset\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        const assetId = match[1];
        return `https://res.cloudinary.com/demo/video/upload/${assetId}.mp4`;
      }
    }

    return trimmed;
  };

  useEffect(() => {
    const resolved = resolveStreamUrl(initialVideoUrl);
    setActiveSrc(resolved);
  }, [initialVideoUrl]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [activeSrc]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* 1. Background Video Layer - Loop, Muted, AutoPlay, Full Coverage */}
      <video
        ref={videoRef}
        key={activeSrc}
        autoPlay
        loop
        muted
        playsInline
        poster={posterUrl}
        onError={() => setHasError(true)}
        onLoadedData={() => {
          setHasError(false);
          onVideoLoaded?.();
        }}
        className="absolute inset-0 w-full h-full object-cover object-center scale-100"
      >
        {activeSrc && <source src={activeSrc} type="video/mp4" />}
        {activeSrc && <source src={activeSrc} type="video/webm" />}
      </video>

      {/* 2. Fallback High-Resolution Layer ONLY if video stream cannot be loaded */}
      {hasError && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${posterUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
      )}
    </div>
  );
};
