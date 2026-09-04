"use client";

import { useState } from "react";
import {
  Compass,
  PlusCircle,
  Camera,
  ArrowRight,
  Sparkles,
  User,
  Menu,
  X,
  MapPin,
  Users,
  Heart,
} from "lucide-react";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-950">
      {/* 2. Top Navigation Bar (Header) */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-zinc-200/80 transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="flex items-center gap-2.5 font-extrabold text-2xl tracking-tighter text-zinc-950 hover:opacity-90 transition-opacity"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-white shadow-xs">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <span>Likely</span>
            </a>
          </div>

          {/* Center/Right: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              href="#discover"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 transition-all"
            >
              <Compass className="h-4 w-4 text-zinc-500" />
              <span>Discover & Join</span>
            </a>
            <a
              href="#host"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 transition-all"
            >
              <PlusCircle className="h-4 w-4 text-zinc-500" />
              <span>Host an Event</span>
            </a>
            <a
              href="#instagram"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 transition-all"
            >
              <InstagramIcon className="h-4 w-4 text-zinc-500" />
              <span>Connect Instagram</span>
            </a>
            <a
              href="#memories"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 transition-all"
            >
              <Camera className="h-4 w-4 text-zinc-500" />
              <span>Past Memories</span>
            </a>
          </nav>

          {/* Far Right: Sign In / User Avatar */}
          <div className="hidden md:flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2 text-sm font-medium text-white shadow-xs hover:bg-zinc-800 active:scale-95 transition-all">
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-full p-2 text-zinc-700 hover:bg-zinc-100 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-200 bg-white/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-1.5">
              <a
                href="#discover"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <Compass className="h-5 w-5 text-zinc-500" />
                <span>Discover & Join</span>
              </a>
              <a
                href="#host"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <PlusCircle className="h-5 w-5 text-zinc-500" />
                <span>Host an Event</span>
              </a>
              <a
                href="#instagram"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <InstagramIcon className="h-5 w-5 text-zinc-500" />
                <span>Connect Instagram</span>
              </a>
              <a
                href="#memories"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <Camera className="h-5 w-5 text-zinc-500" />
                <span>Past Memories</span>
              </a>
            </nav>

            <div className="pt-2 border-t border-zinc-100">
              <button className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-base font-medium text-white shadow-xs hover:bg-zinc-800 transition-all">
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. Hero Section (Centered & Distraction-Free) */}
      <main className="flex-1">
        <section className="relative mx-auto max-w-5xl px-4 pt-20 pb-24 text-center sm:px-6 sm:pt-28 sm:pb-32 lg:px-8">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 border border-zinc-200/80 px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-700 shadow-xs mb-8 hover:bg-zinc-100/80 transition-colors">
            <span>🌏 Connect Outside • Hackathon Project</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-950 leading-none">
            Likely
          </h1>

          {/* Subheadline */}
          <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-800">
            Your likes. Your people. Your next adventure.
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-600 font-normal">
            Skip the endless planning and small talk. Likely connects with your
            social media to match your niche interests with casual, small-group
            activities happening in public spaces around you.
          </p>

          {/* Primary Action Button */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <button className="group inline-flex items-center gap-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-base px-8 py-4 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Feature Highlights Grid */}
          <div className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 hover:border-zinc-300 transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-950 shadow-2xs mb-4">
                <Heart className="h-5 w-5 text-zinc-900" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-zinc-950 mb-2">
                Niche Interest Matching
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Connect your social profiles to automatically match with activity groups aligned with your true passions.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 hover:border-zinc-300 transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-950 shadow-2xs mb-4">
                <Users className="h-5 w-5 text-zinc-900" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-zinc-950 mb-2">
                Small-Group Vibes
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Keep meetups small and intimate (4–8 people) for easy conversation and genuine connections.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 hover:border-zinc-300 transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-950 shadow-2xs mb-4">
                <MapPin className="h-5 w-5 text-zinc-900" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-zinc-950 mb-2">
                Public Spaces
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Gather safely in local parks, coffee shops, and open community hubs near you.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 py-8 text-center text-sm text-zinc-500">
        <div className="mx-auto max-w-7xl px-4">
          <p>© {new Date().getFullYear()} Likely. Connect Outside • All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
