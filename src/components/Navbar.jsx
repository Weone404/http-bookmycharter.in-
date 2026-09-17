'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Phone, Calendar, Menu, X, Shield, ArrowRight } from 'lucide-react';
import { BookMyChardhamLogo } from './BookMyChardhamLogo';

export const Navbar = ({ currentPage: propCurrentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const getPageIdFromPath = (path) => {
    if (!path || path === '/') return 'home';
    const clean = path.replace('/', '');
    return clean;
  };

  const activePage = propCurrentPage || getPageIdFromPath(pathname);

  const navItems = [
    { id: 'home', label: 'HOME', href: '/' },
    { id: 'private-jet-charter', label: 'PRIVATE JET', href: '/private-jet-charter' },
    { id: 'helicopter-charter-services', label: 'HELICOPTER CHARTER', href: '/helicopter-charter-services' },
    { id: 'fleet', label: 'FLEET', href: '/fleet' },
    { id: 'char-dham-yatra-by-helicopter', label: 'CHARDHAM & KEDARNATH', href: '/char-dham-yatra-by-helicopter' },
    { id: 'about', label: 'ABOUT US', href: '/about' },
    { id: 'contact', label: 'CONTACT', href: '/contact' },
  ];

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(item.id);
    } else {
      router.push(item.href);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--brand-luxury)]/20 bg-[var(--brand-navy)]/85 backdrop-blur-md shadow-[0_2px_10px_var(--shadow-navy)] select-none transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:h-20 sm:gap-4 sm:px-6 md:px-10 lg:px-12">
        {/* Brand Logo */}
        <div className="min-w-0 flex-shrink-0">
          <BookMyChardhamLogo onClick={() => handleNavClick(navItems[0])} />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item)}
                className={`relative cursor-pointer py-1 text-[11.5px] font-bold uppercase tracking-[0.14em] transition-all duration-200 xl:text-[12.5px] ${
                  isActive
                    ? 'text-[var(--brand-luxury)]'
                    : 'text-[var(--text-inverse)] hover:text-[var(--brand-luxury)]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[var(--brand-luxury)] transition-all duration-200 ${
                    isActive ? 'right-0 opacity-100' : 'right-full opacity-0 group-hover:right-0 group-hover:opacity-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right Section: Phone, Book Now CTA & Mobile Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Phone Dispatch Link (Desktop) */}
          <a
            href="tel:+919355611996"
            className="hidden items-center gap-2 rounded-xs border border-[var(--brand-luxury)]/30 bg-[var(--brand-luxury)]/10 px-3 py-1.5 text-[var(--brand-luxury)] transition-colors hover:bg-[var(--brand-luxury)]/20 hover:text-[var(--text-primary)] xl:flex"
          >
            <div className="h-2 w-2 rounded-full bg-[var(--brand-luxury)] animate-pulse" />
            <Phone className="h-3.5 w-3.5 text-[var(--background-subtle)]" />
            <span className="text-[12px] font-bold tracking-wider">+91 93556 11996</span>
          </a>

          {/* Primary Book Now CTA Button */}
          <button
            id="header-book-now-btn"
            onClick={() => handleNavClick({ id: 'booking', href: '/booking' })}
            className="flex items-center gap-2 rounded-xs border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-inverse)] shadow-md transition-all hover:bg-[var(--brand-primary)] active:scale-95 sm:px-5 sm:text-[11.5px]"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>BOOK NOW</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="cursor-pointer rounded-xs border border-[var(--brand-luxury)]/20 bg-[var(--brand-luxury)]/10 p-2 text-[var(--text-inverse)] transition-colors hover:bg-[var(--brand-navy-hover)] lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[var(--text-inverse)]/15 bg-[var(--brand-navy)]/95 p-4 shadow-2xl backdrop-blur-xl animate-fadeIn sm:top-20 sm:p-6 lg:hidden">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center justify-between p-3 rounded-xs text-left text-xs font-bold tracking-[0.16em] uppercase transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[var(--brand-navy)] text-[var(--text-inverse)] border-l-2 border-[var(--brand-luxury)]'
                      : 'text-[var(--text-inverse)] hover:bg-[var(--brand-navy-hover)] hover:text-[var(--brand-luxury)]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--background-subtle)]" />
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[var(--text-inverse)]/10 flex flex-col gap-3">
              <a
                href="tel:+919355611996"
                className="flex items-center justify-center gap-2 p-3 bg-[var(--text-inverse)]/5 rounded-xs text-xs font-bold tracking-wider text-[var(--background-subtle)]"
              >
                <Phone className="w-4 h-4 text-[var(--brand-luxury)]" />
                <span>Call 24/7 Operations: +91 93556 11996</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--background-subtle)] uppercase tracking-widest pt-2">
                <Shield className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                <span>DGCA NSOP Certified Aviation</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
