'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-subtle)] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-[var(--brand-luxury)] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Page Not Found</h2>
        <p className="text-[var(--brand-luxury)] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[var(--brand-luxury)] hover:bg-[var(--brand-luxury-hover)] text-[var(--text-inverse)] px-6 py-3 font-bold uppercase tracking-wider transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
