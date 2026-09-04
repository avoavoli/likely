"use client";

import { useState, useEffect } from "react";
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
  LogOut,
  ChevronDown,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import SignUpModal, { UserProfile } from "@/components/SignUpModal";

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

// Sample Discover Activities matched by interests
const SAMPLE_ACTIVITIES = [
  {
    id: 1,
    title: "Specialty Coffee & Street Photography Crawl",
    host: "Maya S. (@mayacamera)",
    location: "Blue Bottle Coffee -> Central Park",
    time: "Tomorrow, 10:00 AM",
    attendees: "4 / 6 spots filled",
    tags: ["📸 Film & Mobile Photography", "☕ Specialty Coffee Crawls"],
    matched: true,
  },
  {
    id: 2,
    title: "Sunset Acoustic Jam & Lawn Picnic",
    host: "Leo K. (@leosongwriter)",
    location: "Meadow Lawn, Riverside Park",
    time: "Saturday, 5:30 PM",
    attendees: "5 / 8 spots filled",
    tags: ["🎸 Sunset Acoustic Jamming", "🌿 Botanical Garden Picnics"],
    matched: true,
  },
  {
    id: 3,
    title: "City Cycling & Bakery Food Walk",
    host: "Sam R.",
    location: "Greenway Bike Trail -> Artisan Bakery",
    time: "Sunday, 9:00 AM",
    attendees: "3 / 6 spots filled",
    tags: ["🚲 City Cycling & Exploration", "🥐 Farmers Market & Food Walks"],
    matched: false,
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "discover">("hero");

  // Load saved profile from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("likely_user_profile");
      if (saved) {
        setUserProfile(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleSignUpComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    try {
      localStorage.setItem("likely_user_profile", JSON.stringify(profile));
    } catch {
      // Ignore localStorage errors
    }
    setIsSignUpModalOpen(false);
    setActiveTab("discover");
  };

  const handleSignOut = () => {
    setUserProfile(null);
    setProfileDropdownOpen(false);
    try {
      localStorage.removeItem("likely_user_profile");
    } catch {
      // Ignore localStorage errors
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-950">
      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onComplete={handleSignUpComplete}
      />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-zinc-200/80 transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("hero")}
              className="flex items-center gap-2.5 font-extrabold text-2xl tracking-tighter text-zinc-950 hover:opacity-90 transition-opacity text-left"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-white shadow-xs">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <span>Likely</span>
            </button>
          </div>

          {/* Center/Right: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setActiveTab("discover")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "discover"
                  ? "bg-zinc-950 text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80"
              }`}
            >
              <Compass
                className={`h-4 w-4 ${
                  activeTab === "discover" ? "text-white" : "text-zinc-500"
                }`}
              />
              <span>Discover & Join</span>
            </button>

            <button
              onClick={() =>
                userProfile ? setActiveTab("discover") : setIsSignUpModalOpen(true)
              }
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 transition-all"
            >
              <PlusCircle className="h-4 w-4 text-zinc-500" />
              <span>Host an Event</span>
            </button>

            <button
              onClick={() =>
                userProfile ? setActiveTab("discover") : setIsSignUpModalOpen(true)
              }
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 transition-all"
            >
              <InstagramIcon className="h-4 w-4 text-zinc-500" />
              <span>Connect Instagram</span>
            </button>

            <button
              onClick={() => setActiveTab("discover")}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 transition-all"
            >
              <Camera className="h-4 w-4 text-zinc-500" />
              <span>Past Memories</span>
            </button>
          </nav>

          {/* Far Right: Sign In Button OR Active User Avatar Pill */}
          <div className="hidden md:flex items-center gap-3">
            {userProfile ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 p-1.5 pr-3 text-sm font-medium text-zinc-950 shadow-xs transition-all"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950 text-white font-bold text-xs">
                    {getInitials(userProfile.fullName)}
                  </div>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="font-semibold text-xs text-zinc-950">
                      {userProfile.fullName}
                    </span>
                    {userProfile.instagramHandle && (
                      <span className="text-[10px] text-zinc-500">
                        {userProfile.instagramHandle}
                      </span>
                    )}
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-zinc-200 p-2 shadow-xl animate-in fade-in z-50">
                    <div className="px-3 py-2 border-b border-zinc-100 mb-1">
                      <p className="text-xs font-semibold text-zinc-950">
                        {userProfile.fullName}
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        {userProfile.interests.length} interests selected
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab("discover");
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
                    >
                      <Compass className="h-4 w-4 text-zinc-500" />
                      <span>My Matches</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors mt-1"
                    >
                      <LogOut className="h-4 w-4 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsSignUpModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2 text-sm font-medium text-white shadow-xs hover:bg-zinc-800 active:scale-95 transition-all"
              >
                <User className="h-4 w-4" />
                <span>Sign In / Sign Up</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-full p-2 text-zinc-700 hover:bg-zinc-100 transition-colors"
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
          <div className="md:hidden border-b border-zinc-200 bg-white/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3">
            <nav className="flex flex-col gap-1.5">
              <button
                onClick={() => {
                  setActiveTab("discover");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 transition-colors text-left"
              >
                <Compass className="h-5 w-5 text-zinc-500" />
                <span>Discover & Join</span>
              </button>

              <button
                onClick={() => {
                  if (!userProfile) setIsSignUpModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 transition-colors text-left"
              >
                <PlusCircle className="h-5 w-5 text-zinc-500" />
                <span>Host an Event</span>
              </button>

              <button
                onClick={() => {
                  if (!userProfile) setIsSignUpModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 transition-colors text-left"
              >
                <InstagramIcon className="h-5 w-5 text-zinc-500" />
                <span>Connect Instagram</span>
              </button>
            </nav>

            <div className="pt-2 border-t border-zinc-100">
              {userProfile ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-zinc-50 border border-zinc-200">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-white font-bold text-sm">
                      {getInitials(userProfile.fullName)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-zinc-950">
                        {userProfile.fullName}
                      </p>
                      {userProfile.instagramHandle && (
                        <p className="text-xs text-zinc-500">
                          {userProfile.instagramHandle}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full inline-flex justify-center items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsSignUpModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-base font-medium text-white shadow-xs hover:bg-zinc-800 transition-all"
                >
                  <User className="h-5 w-5" />
                  <span>Sign In / Sign Up</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* DISCOVER & JOIN FEED VIEW */}
        {activeTab === "discover" ? (
          <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in">
            {/* User Match Banner */}
            {userProfile ? (
              <div className="mb-10 rounded-3xl bg-zinc-950 text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-amber-300 mb-3">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Profile Active • {userProfile.interests.length} Interests Synced</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Welcome back, {userProfile.fullName.split(" ")[0]}!
                  </h2>
                  <p className="text-sm text-zinc-300 mt-1 max-w-xl">
                    We found 3 small-group outdoor activities matching your interests around your area.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 max-w-xs">
                  {userProfile.interests.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/15 px-3 py-1 text-xs text-white"
                    >
                      {tag}
                    </span>
                  ))}
                  {userProfile.interests.length > 4 && (
                    <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs text-zinc-300">
                      +{userProfile.interests.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="mb-10 rounded-3xl bg-zinc-50 border border-zinc-200 p-6 text-center">
                <p className="text-sm text-zinc-600 mb-3">
                  Sign up to see custom activities matched to your Instagram vibe & outdoor interests!
                </p>
                <button
                  onClick={() => setIsSignUpModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-zinc-800 transition-all"
                >
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Personalize My Feed</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
                Discover Nearby Small-Group Meetups
              </h2>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Public Spaces
              </span>
            </div>

            {/* Activities Feed Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SAMPLE_ACTIVITIES.map((act) => (
                <div
                  key={act.id}
                  className="flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xs hover:shadow-md transition-all hover:border-zinc-300"
                >
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {act.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-zinc-950 mb-2">
                      {act.title}
                    </h3>
                    <p className="text-xs font-medium text-zinc-500 mb-4">
                      Hosted by {act.host}
                    </p>

                    <div className="space-y-2 text-xs text-zinc-600 border-t border-zinc-100 pt-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-zinc-400 shrink-0" />
                        <span>{act.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-zinc-400 shrink-0" />
                        <span>{act.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-zinc-400 shrink-0" />
                        <span className="font-semibold text-zinc-900">
                          {act.attendees}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100">
                    <button
                      onClick={() => {
                        if (!userProfile) setIsSignUpModalOpen(true);
                        else alert(`Joined ${act.title}! Host details sent.`);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-sm py-2.5 px-4 shadow-xs transition-all active:scale-95"
                    >
                      <span>Join Small Group</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* HERO SECTION VIEW */
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
              <button
                onClick={() =>
                  userProfile ? setActiveTab("discover") : setIsSignUpModalOpen(true)
                }
                className="group inline-flex items-center gap-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-base px-8 py-4 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>
                  {userProfile ? "Explore My Feed" : "Get Started"}
                </span>
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
        )}
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

