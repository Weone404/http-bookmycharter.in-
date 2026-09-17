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
    <div className="fixed inset-0 z-50 flex justify-end bg-[var(--brand-navy)]/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-md bg-[var(--brand-navy)] h-full border-l border-[var(--text-primary)] flex flex-col justify-between p-6 sm:p-8 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-8 border-b border-[var(--brand-navy)]">
            <TurkishAirlinesLogo />
            <button
              onClick={onClose}
              className="p-2.5 bg-[var(--brand-navy)] hover:bg-[var(--text-primary)] text-[var(--background-subtle)] hover:text-[var(--text-inverse)] rounded-full transition-colors cursor-pointer"
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
                  className="w-full flex items-center justify-between p-3.5 rounded hover:bg-[var(--brand-navy)] text-left group transition-all cursor-pointer border border-transparent hover:border-[var(--border-strong)]"
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className="w-4 h-4 text-[var(--background-subtle)] group-hover:text-[var(--brand-primary)] transition-colors" />
                    <span className="text-xs font-extrabold tracking-[0.18em] text-[var(--background-subtle)] group-hover:text-[var(--text-inverse)] uppercase">
                      {link.label}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--brand-luxury)] group-hover:text-[var(--brand-primary)] group-hover:translate-x-1 transition-all" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Contact / Member Info */}
        <div className="pt-6 border-t border-[var(--brand-navy)] space-y-3 text-xs text-[var(--background-subtle)]">
          <div className="p-3 bg-[var(--brand-navy)] rounded border border-[var(--text-primary)]">
            <div className="text-[var(--text-inverse)] font-bold text-xs uppercase tracking-wider mb-1">
              Widen Your World
            </div>
            <div className="text-[11px] text-[var(--background-subtle)]">
              Flying to more countries than any other airline.
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[var(--background-subtle)]">
            <span>Turkish Airlines Customer Service</span>
            <span className="font-mono text-[var(--background-subtle)]">+90 850 333 0 849</span>
          </div>
        </div>
      </div>
    </div>
  );
};
