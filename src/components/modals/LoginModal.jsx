'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Placeholder for actual authentication logic
      if (!email || !password) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Here you would typically make an API call to authenticate
      console.log('Login attempt:', { email, password });
      setEmail('');
      setPassword('');
      onClose();
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--brand-navy)]/55 backdrop-blur-[2px] px-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-[var(--brand-luxury)]/30 bg-[var(--text-inverse)] shadow-[0_24px_80px_var(--shadow-navy)]">
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between border-b border-[var(--brand-luxury)]/25 bg-[var(--background-subtle)] px-5 py-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.webp"
              alt="BookMyChardham Logo"
              className="h-8 w-8 object-contain rounded-full ring-1 ring-[var(--brand-luxury)]/20"
            />
            <h2 className="text-lg font-black uppercase tracking-[0.08em] text-[var(--brand-navy)]">
              Sign In
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-[var(--brand-navy)] transition-colors hover:bg-[var(--brand-luxury)]/10"
            aria-label="Close login modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Error Message */}
          {error && (
            <div className="rounded-md border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 p-3 text-sm font-medium text-[var(--brand-primary)]">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-primary)]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-primary)]" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full rounded-md border border-[var(--brand-luxury)]/35 bg-[var(--text-inverse)] py-2.5 pl-10 pr-4 text-sm text-[var(--brand-navy)] placeholder:text-[var(--text-muted)]/70 focus:border-[var(--brand-luxury-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-luxury)]/20"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-primary)]">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-primary)]" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-[var(--brand-luxury)]/35 bg-[var(--text-inverse)] py-2.5 pl-10 pr-10 text-sm text-[var(--brand-navy)] placeholder:text-[var(--text-muted)]/70 focus:border-[var(--brand-luxury-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-luxury)]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-primary)] transition-colors hover:text-[var(--brand-navy)]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between gap-3 text-xs">
            <label className="flex cursor-pointer items-center gap-2 text-[var(--text-primary)]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[var(--brand-luxury)]/40 accent-[var(--text-primary)]"
              />
              <span className="font-medium">Remember me</span>
            </label>
            <a href="#" className="font-bold uppercase tracking-[0.12em] text-[var(--text-primary)] transition-colors hover:text-[var(--brand-navy)]">
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-[var(--text-primary)] py-3 text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-inverse)] transition-all hover:bg-[var(--brand-navy)] disabled:cursor-not-allowed disabled:bg-[var(--brand-luxury)]/60 active:scale-[0.99]"
          >
            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--brand-luxury)]/25" />
            <div className="relative flex justify-center">
              <span className="bg-[var(--text-inverse)] px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-primary)]">OR</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-xs text-[var(--brand-navy)]">
            Don't have an account?{' '}
            <a href="#" className="font-bold uppercase tracking-[0.12em] text-[var(--text-primary)] transition-colors hover:text-[var(--brand-navy)]">
              Sign Up
            </a>
          </p>
        </form>

        {/* Footer Info */}
        <div className="border-t border-[var(--brand-luxury)]/25 bg-[var(--text-inverse)] px-6 py-4">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-primary)]">
            🔒 Secure Login • DGCA Certified
          </p>
        </div>
      </div>
    </div>
  );
};
