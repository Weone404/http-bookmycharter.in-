'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export const FleetCard = ({
  name,
  image,
  seatCount,
  category,
  description,
  slug,
  videoUrl,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/fleet/${slug}`}
      className="group block h-full focus:outline-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#A67C52]/20 bg-[#F3E9D0] shadow-[0_4px_14px_rgba(50,33,22,0.09)] transition-all duration-250 ease-out hover:-translate-y-1 hover:border-[#A67C52]/30 hover:shadow-[0_12px_24px_rgba(50,33,22,0.14)] focus-within:-translate-y-1 focus-within:border-[#A67C52]/30 focus-within:shadow-[0_12px_24px_rgba(50,33,22,0.14)]">
        <div className="relative overflow-hidden rounded-t-xl">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={800}
              height={448}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] group-focus-within:scale-[1.02]"
            />
          ) : (
            <div className="flex h-56 w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#D9C7B8] to-[#E6D5C1] px-4 text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A67C52]">
                {category}
              </span>
              <span className="text-xl font-bold text-[#6B4E3D]">{name}</span>
              <span className="text-[11px] text-[#A67C52]">{seatCount} seats</span>
            </div>
          )}
          {isHovered && videoUrl && (
            <iframe
              className="pointer-events-none absolute inset-0 h-full w-full scale-[1.35] object-cover"
              src={`${videoUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoUrl.split('/').pop()}&rel=0&playsinline=1`}
              title={`${name} aircraft video`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}
        </div>

        <div className="relative z-10 flex flex-1 flex-col gap-3 bg-[#F3E9D0] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-black uppercase leading-[1.15] tracking-[0.08em] text-[#6B4E3D] sm:text-[1.1rem]">
              {name}
            </h3>
            <span className="inline-flex shrink-0 items-center rounded-full border border-[#A67C52]/20 bg-[#E6D5C1] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B4E3D]">
              {seatCount} seats
            </span>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2">
            <span className="inline-flex w-fit rounded-full border border-[#A67C52]/20 bg-[#E6D5C1] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B4E3D]">
              {category}
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end bg-[#F5EDE1] p-4 opacity-0 translate-y-2 transition-all duration-250 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 sm:p-5">
          <div className="w-full rounded-[0.25rem] border border-[#A67C52]/25 bg-[#F5EDE1]/95 p-3 shadow-[0_10px_20px_rgba(38,25,20,0.12)]">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-[1.05rem] font-black uppercase leading-[1.15] tracking-[0.08em] text-[#6B4E3D]">
                {name}
              </h4>
              <span className="inline-flex items-center rounded-full border border-[#A67C52]/20 bg-[#E6D5C1] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#6B4E3D]">
                {seatCount} seats
              </span>
            </div>

            <p
              className="mt-2 text-sm leading-relaxed text-[#4D382E]"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};
