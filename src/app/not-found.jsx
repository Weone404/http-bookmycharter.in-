'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3E9D0] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-[#A67C52] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[#6B4E3D] mb-2">Page Not Found</h2>
        <p className="text-[#A67C52] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#A67C52] hover:bg-[#8B6639] text-white px-6 py-3 font-bold uppercase tracking-wider transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
