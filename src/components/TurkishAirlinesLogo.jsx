import React from 'react';

export const TurkishAirlinesLogo = ({
  className = '',
  showText = true,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none cursor-pointer ${className}`}>
      {/* Red round badge with the white Turkish Airlines flying bird */}
      <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#c8102e] flex items-center justify-center shadow-sm shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="w-5 h-5 md:w-6 md:h-6 text-white fill-current transform rotate-[-8deg]"
        >
          {/* Turkish Airlines Iconic Wild Goose / Bird silhouette */}
          <path d="M 82 28 C 76 29, 68 34, 60 41 C 52 48, 44 57, 36 67 C 32 72, 28 77, 22 80 C 18 82, 14 82, 12 79 C 10 76, 11 71, 15 67 C 22 60, 31 54, 42 49 C 48 46, 55 43, 62 41 C 49 41, 35 44, 24 50 C 16 54, 11 58, 9 55 C 7 52, 9 47, 14 43 C 23 35, 36 29, 52 25 C 62 23, 73 23, 82 28 Z" />
          <path d="M 83 26 C 85 24, 87 23, 88 23 C 89 23, 89 25, 87 27 C 84 31, 79 37, 73 43 C 65 51, 56 61, 46 72 C 40 79, 34 85, 27 88 C 23 90, 19 89, 17 86 C 15 82, 17 76, 22 71 C 30 63, 41 57, 54 52 C 64 48, 74 46, 83 26 Z" />
        </svg>
      </div>

      {showText && (
        <span className="font-extrabold tracking-[0.18em] text-[15px] md:text-[17px] text-white uppercase font-sans">
          TURKISH AIRLINES
        </span>
      )}
    </div>
  );
};
