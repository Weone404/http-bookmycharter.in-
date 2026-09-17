'use client';

import React from 'react';
import { X, ChevronRight, Globe, Award, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { TurkishAirlinesLogo } from '../TurkishAirlinesLogo';

export const MenuDrawer = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  if (!isOpen) return null;

  const links = [
    { label: 'BOOK A FLIGHT', icon: Compass, action: 'destination' },
    { label: 'MILES & SMILES LOYALTY', icon: Award, action: 'miles' },
    { label: 'FLY DIFFERENT EXPERIENCE', icon: Sparkles, action: 'experience' },
    { label: 'SPECIAL OFFERS & DESTINATIONS', icon: Globe, action: 'offers' },
    { label: 'FLIGHT STATUS & SCHEDULES', icon: ChevronRight, action: 'status' },
    { label: 'ONLINE CHECK-IN', icon: ChevronRight, action: 'checkin' },
    { label: 'BAGGAGE & TRAVEL RULES', icon: ShieldCheck, action: 'baggage' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-md bg-[#101010] h-full border-l border-[#262626] flex flex-col justify-between p-6 sm:p-8 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-8 border-b border-[#222222]">
            <TurkishAirlinesLogo />
            <button
              onClick={onClose}
              className="p-2.5 bg-[#181818] hover:bg-[#252525] text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="py-8 space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    onSelectAction?.(link.action);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded hover:bg-[#1a1a1a] text-left group transition-all cursor-pointer border border-transparent hover:border-[#2a2a2a]"
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className="w-4 h-4 text-neutral-400 group-hover:text-red-500 transition-colors" />
                    <span className="text-xs font-extrabold tracking-[0.18em] text-neutral-200 group-hover:text-white uppercase">
                      {link.label}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Contact / Member Info */}
        <div className="pt-6 border-t border-[#222222] space-y-3 text-xs text-neutral-400">
          <div className="p-3 bg-[#181818] rounded border border-[#262626]">
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-1">
              Widen Your World
            </div>
            <div className="text-[11px] text-neutral-400">
              Flying to more countries than any other airline.
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-neutral-500">
            <span>Turkish Airlines Customer Service</span>
            <span className="font-mono text-neutral-400">+90 850 333 0 849</span>
          </div>
        </div>
      </div>
    </div>
  );
};
