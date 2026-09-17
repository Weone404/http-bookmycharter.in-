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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A120F]/55 backdrop-blur-[2px] px-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-[#B18C67]/30 bg-[#F5EDE1] shadow-[0_24px_80px_rgba(42,25,18,0.35)]">
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between border-b border-[#A67C52]/25 bg-[#F0E4D2] px-5 py-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.webp"
              alt="BookMyChardham Logo"
              className="h-8 w-8 object-contain rounded-full ring-1 ring-[#A67C52]/20"
            />
            <h2 className="text-lg font-black uppercase tracking-[0.08em] text-[#4A2F23]">
              Sign In
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-[#4A2F23] transition-colors hover:bg-[#A67C52]/10"
            aria-label="Close login modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Error Message */}
          {error && (
            <div className="rounded-md border border-red-300 bg-red-100 p-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B4337]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B4337]" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full rounded-md border border-[#A67C52]/35 bg-white py-2.5 pl-10 pr-4 text-sm text-[#2D1E1A] placeholder:text-[#715A4D]/70 focus:border-[#8B6639] focus:outline-none focus:ring-2 focus:ring-[#A67C52]/20"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B4337]">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B4337]" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-[#A67C52]/35 bg-white py-2.5 pl-10 pr-10 text-sm text-[#2D1E1A] placeholder:text-[#715A4D]/70 focus:border-[#8B6639] focus:outline-none focus:ring-2 focus:ring-[#A67C52]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B4337] transition-colors hover:text-[#2D1E1A]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between gap-3 text-xs">
            <label className="flex cursor-pointer items-center gap-2 text-[#5B4337]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[#A67C52]/40 accent-[#6B4E3D]"
              />
              <span className="font-medium">Remember me</span>
            </label>
            <a href="#" className="font-bold uppercase tracking-[0.12em] text-[#6B4E3D] transition-colors hover:text-[#3F2C23]">
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-[#6B4E3D] py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-[#533D33] disabled:cursor-not-allowed disabled:bg-[#A67C52]/60 active:scale-[0.99]"
          >
            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-x-0 top-1/2 h-px bg-[#A67C52]/25" />
            <div className="relative flex justify-center">
              <span className="bg-[#F5EDE1] px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#5B4337]">OR</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-xs text-[#4A2F23]">
            Don't have an account?{' '}
            <a href="#" className="font-bold uppercase tracking-[0.12em] text-[#6B4E3D] transition-colors hover:text-[#3F2C23]">
              Sign Up
            </a>
          </p>
        </form>

        {/* Footer Info */}
        <div className="border-t border-[#A67C52]/25 bg-[#E8D9C6] px-6 py-4">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#5B4337]">
            🔒 Secure Login • DGCA Certified
          </p>
        </div>
      </div>
    </div>
  );
};
