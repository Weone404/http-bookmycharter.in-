import React from 'react';

export const HeroTitle = () => {
  return (
    <div className="select-none mb-10 md:mb-14">
      <div className="flex flex-col drop-shadow-[0_4px_24px_var(--shadow-overlay)]">
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-[0.06em] text-[var(--text-inverse)] leading-tight uppercase">
          PREMIUM
        </span>
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal tracking-[0.05em] text-[var(--text-inverse)] leading-tight mt-1 uppercase">
          AVIATION SOLUTIONS
        </span>
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[56px] max-w-4xl font-black tracking-tight text-[var(--text-inverse)] leading-tight mt-2 font-sans drop-shadow-[0_4px_24px_var(--shadow-overlay)]">
        Private Jet &amp; Helicopter Charter Services in India
      </h1>
      <p className="mt-4 max-w-2xl text-sm sm:text-base text-[var(--text-inverse)]/85 leading-relaxed drop-shadow-[0_2px_10px_var(--shadow-overlay-soft)]">
        BookMyChardham arranges private jet charter, helicopter charter, aircraft charter, and charter flight services for business travel, VIP trips, and pilgrimage journeys across India.
      </p>
    </div>
  );
};
