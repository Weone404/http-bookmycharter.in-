import React from 'react';
import Image from 'next/image';

export const BookMyChardhamLogo = ({
  className = '',
  showText = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 select-none cursor-pointer group ${className}`}
    >
      <Image
        src="/logo.webp"
        alt="BookMyChardham logo"
        width={80}
        height={80}
        sizes="(min-width: 768px) 80px, 64px"
        className="w-16 h-16 md:w-20 md:h-20 object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
      />

      {showText && (
        <div className="flex flex-col">
          <span className="font-black tracking-[0.2em] text-[15px] md:text-[17px] text-white uppercase font-sans leading-none flex items-center gap-1.5">
            
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] inline-block"></span>
          </span>
          <span className="text-[9px] font-bold tracking-[0.24em] text-neutral-400 uppercase leading-tight mt-0.5">
           
          </span>
        </div>
      )}
    </div>
  );
};
