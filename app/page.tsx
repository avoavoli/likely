"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Compass,
  PlusCircle,
  Camera,
  ArrowRight,
  Sparkles,
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
  CheckCircle2,
  Filter,
  ShieldCheck,
  Zap,
  Heart,
  Users,
} from "lucide-react";
import SignUpModal, { UserProfile } from "@/components/SignUpModal";
import HostEventModal from "@/components/HostEventModal";
import EventCard from "@/components/EventCard";
import PastMemoriesView from "@/components/PastMemoriesView";
import Navbar from "@/components/Navbar";
import { EVENTS_DATA, EventItem } from "@/data/events";

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

const PALATINO_FONT = "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; handle: string } | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "discover" | "memories">("hero");
  const [categoryFilter, setCategoryFilter] = useState<"All" | "Creative" | "Active" | "Social">("All");

  // Alternating Vignette Set state (cycles between Set A and Set B every 4.5 seconds)
  const [activeVignetteSet, setActiveVignetteSet] = useState<"A" | "B">("A");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVignetteSet((prev) => (prev === "A" ? "B" : "A"));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Shared events list state
  const [eventsList, setEventsList] = useState<EventItem[]>(EVENTS_DATA);

  // Quick Admin Approval demo toggle (defaults to true for smooth live demos)
  const [autoApprove, setAutoApprove] = useState<boolean>(true);

  // Toast notification message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Clean initialization on mount (ensures fresh visits always start logged out with no hardcoded name)
  useEffect(() => {
    try {
      localStorage.removeItem("likely_memories_store");
      localStorage.removeItem("likely_memories_v2");
      localStorage.removeItem("likely_memories_v3");
      localStorage.removeItem("likely_user_profile");
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleSignUpComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentUser({
      name: profile.fullName,
      handle: profile.instagramHandle,
    });
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
    setCurrentUser(null);
    setProfileDropdownOpen(false);
    try {
      localStorage.removeItem("likely_user_profile");
    } catch {
      // Ignore localStorage errors
    }
  };

  const handleCreateEvent = (newEvent: EventItem) => {
    setEventsList([newEvent, ...eventsList]);
    setIsHostModalOpen(false);
    setActiveTab("discover");

    // Display confirmation toast for host verification
    setToastMessage(
      "Circle submitted! To keep Likely safe, intimate, and spam-free, our community leads review every host before it goes live."
    );

    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  const handleApproveEvent = (id: string) => {
    setEventsList((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, isPending: false, isVerifiedHost: true } : e
      )
    );
    setToastMessage("✨ Event approved & published! Now live on the public feed with Verified Host status.");
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleDismissEvent = (id: string) => {
    setEventsList((prev) => prev.filter((e) => e.id !== id));
  };

  const pendingEvents = useMemo(() => {
    return eventsList.filter((e) => e.isPending);
  }, [eventsList]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Smart Matching Logic: Calculate score for each event based on user interests
  const { curatedTopEvents, exploreMoreEvents } = useMemo(() => {
    // Only include active (approved/non-pending) events on public feed
    const activeEvents = eventsList.filter((event) => !event.isPending);
    const userTags = userProfile?.interests || [];

    // Calculate match score
    const scoredEvents = activeEvents.map((event) => {
      const matchScore = event.tags.reduce((score, tag) => {
        return userTags.includes(tag) ? score + 1 : score;
      }, 0);

      return {
        ...event,
        matchScore: event.isNew ? matchScore + 10 : matchScore, // Boost newly created events to top
      };
    });

    // Sort by matchScore descending
    const sorted = [...scoredEvents].sort((a, b) => b.matchScore - a.matchScore);

    // Top 3 for curated section
    const top3 = sorted.slice(0, 3);
    const top3Ids = new Set(top3.map((e) => e.id));

    // Remaining for lower section
    let remaining = sorted.filter((e) => !top3Ids.has(e.id));

    if (categoryFilter !== "All") {
      remaining = remaining.filter((e) => e.category === categoryFilter);
    }

    return {
      curatedTopEvents: top3,
      exploreMoreEvents: remaining,
    };
  }, [eventsList, userProfile, categoryFilter]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-950">
      {/* Sign Up / Connect Instagram Modal */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onComplete={handleSignUpComplete}
        userProfile={userProfile}
      />

      {/* Host Event Modal */}
      <HostEventModal
        isOpen={isHostModalOpen}
        onClose={() => setIsHostModalOpen(false)}
        onSubmitEvent={handleCreateEvent}
        userProfile={userProfile}
        autoApprove={autoApprove}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-md rounded-2xl bg-zinc-950 text-white p-4 shadow-2xl border border-zinc-800 flex items-start justify-between gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-medium leading-snug">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {/* Top Navigation Bar Component */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHostModal={() => setIsHostModalOpen(true)}
        onOpenProfileModal={() => setIsSignUpModalOpen(true)}
        userProfile={userProfile}
        autoApprove={autoApprove}
        setAutoApprove={setAutoApprove}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* DISCOVER & JOIN FEED VIEW */}
        {activeTab === "discover" ? (
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12 animate-in fade-in">
            {/* User Match Banner */}
            {userProfile ? (
              <div className="rounded-3xl bg-zinc-950 text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-amber-300 mb-3">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Profile Active • {userProfile.interests.length} Interests Synced</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Welcome back, {userProfile.fullName.split(" ")[0]}!
                  </h2>
                  <p className="text-sm text-zinc-300 mt-1 max-w-xl">
                    Here are your top personalized small-group outdoor activities matched to your vibe.
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
              <div className="rounded-3xl bg-zinc-50 border border-zinc-200 p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-base font-bold text-zinc-950">
                    Want personalized matches?
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Sign up in 30 seconds to connect your Instagram vibe & outdoor interests!
                  </p>
                </div>
                <button
                  onClick={() => setIsSignUpModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-zinc-800 transition-all cursor-pointer shrink-0"
                >
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Personalize My Feed</span>
                </button>
              </div>
            )}

            {/* SECTION 1: TOP MATCHED EVENTS ("✨ Curated for Your Vibe") */}
            <div className="space-y-6">
              <div className="border-b border-zinc-200/80 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Personalized Match</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                  ✨ Curated for Your Vibe
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {curatedTopEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    userInterests={userProfile?.interests || []}
                    userInstagramHandle={userProfile?.instagramHandle || ""}
                    isMatched={true}
                  />
                ))}
              </div>
            </div>

            {/* SECTION 2: LOWER SECTION ("🧭 Explore More Public Meetups") */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                    🧭 Explore More Public Meetups
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                    Browse all casual small-group activities happening in public spaces around you.
                  </p>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <Filter className="h-4 w-4 text-zinc-400 mr-1 shrink-0" />
                  {(["All", "Creative", "Active", "Social"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                        categoryFilter === cat
                          ? "bg-zinc-950 text-white shadow-xs"
                          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {exploreMoreEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exploreMoreEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      userInterests={userProfile?.interests || []}
                      userInstagramHandle={userProfile?.instagramHandle || ""}
                      isMatched={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-zinc-300 p-12 text-center text-zinc-500">
                  <p className="text-sm font-medium">No events found in this category.</p>
                  <button
                    onClick={() => setCategoryFilter("All")}
                    className="mt-3 text-xs font-semibold text-zinc-900 underline"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </section>
        ) : activeTab === "memories" ? (
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12 animate-in fade-in">
            <PastMemoriesView
              userHandle={userProfile?.instagramHandle || currentUser?.handle || ""}
              userName={userProfile?.fullName || currentUser?.name || ""}
              onOpenSignUp={() => setIsSignUpModalOpen(true)}
            />
          </section>
        ) : (
          /* HERO SECTION VIEW */
          <section className="w-full px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16 animate-in fade-in">
            {/* Dedicated Hero Title & Floating Photo Container */}
            <div className="relative w-full overflow-hidden rounded-3xl py-10 sm:py-14 px-4 text-center max-h-[540px] min-h-[420px] flex items-center justify-center bg-gradient-to-b from-zinc-50/60 to-white border border-zinc-100/80 shadow-xs">
              {/* Ambient Floating Event Photo Vignettes (Alternating Sets A & B) */}
              <div className="hidden lg:block pointer-events-none select-none">
                {/* Set A: 4 balanced perimeter spots (2 left, 2 right) */}
                <div
                  className={`transition-opacity duration-1000 ease-in-out ${
                    activeVignetteSet === "A" ? "opacity-90" : "opacity-0"
                  }`}
                >
                  {/* Card 1: Top-Left */}
                  <div className="absolute top-[8%] left-[2%] -rotate-3 w-36 h-28 md:w-44 md:h-32 rounded-xl shadow-md border border-white/80 overflow-hidden bg-white p-1.5 z-0">
                    <img
                      src="/events/beach-painting.jpg"
                      alt="Beach Painting"
                      className="w-full h-20 md:h-24 object-cover rounded-lg"
                    />
                    <p className="text-[10px] font-semibold text-zinc-700 mt-1 truncate text-center">🎨 Beach Painting</p>
                  </div>

                  {/* Card 2: Bottom-Left */}
                  <div className="absolute bottom-[8%] left-[4%] rotate-2 w-36 h-28 md:w-44 md:h-32 rounded-xl shadow-md border border-white/80 overflow-hidden bg-white p-1.5 z-0">
                    <img
                      src="/events/cycling.jpg"
                      alt="City Cycling"
                      className="w-full h-20 md:h-24 object-cover rounded-lg"
                    />
                    <p className="text-[10px] font-semibold text-zinc-700 mt-1 truncate text-center">🚲 City Cycling</p>
                  </div>

                  {/* Card 3: Top-Right */}
                  <div className="absolute top-[8%] right-[2%] rotate-3 w-36 h-28 md:w-44 md:h-32 rounded-xl shadow-md border border-white/80 overflow-hidden bg-white p-1.5 z-0">
                    <img
                      src="/events/jamming.jpg"
                      alt="Acoustic Jamming"
                      className="w-full h-20 md:h-24 object-cover rounded-lg"
                    />
                    <p className="text-[10px] font-semibold text-zinc-700 mt-1 truncate text-center">🎸 Acoustic Jamming</p>
                  </div>

                  {/* Card 4: Bottom-Right */}
                  <div className="absolute bottom-[8%] right-[4%] -rotate-2 w-36 h-28 md:w-44 md:h-32 rounded-xl shadow-md border border-white/80 overflow-hidden bg-white p-1.5 z-0">
                    <img
                      src="/events/pottery-painting.jpg"
                      alt="Pottery Painting"
                      className="w-full h-20 md:h-24 object-cover rounded-lg"
                    />
                    <p className="text-[10px] font-semibold text-zinc-700 mt-1 truncate text-center">🏺 Pottery Painting</p>
                  </div>
                </div>

                {/* Set B: 4 alternate balanced spots (2 left, 2 right) */}
                <div
                  className={`transition-opacity duration-1000 ease-in-out ${
                    activeVignetteSet === "B" ? "opacity-90" : "opacity-0"
                  }`}
                >
                  {/* Card 5: Upper-Mid-Left */}
                  <div className="absolute top-[18%] left-[5%] rotate-2 w-36 h-28 md:w-44 md:h-32 rounded-xl shadow-md border border-white/80 overflow-hidden bg-white p-1.5 z-0">
                    <img
                      src="/events/card-games.jpg"
                      alt="Lawn Board Games"
                      className="w-full h-20 md:h-24 object-cover rounded-lg"
                    />
                    <p className="text-[10px] font-semibold text-zinc-700 mt-1 truncate text-center">🎲 Lawn Games</p>
                  </div>

                  {/* Card 6: Lower-Mid-Left */}
                  <div className="absolute bottom-[14%] left-[1.5%] -rotate-2 w-36 h-28 md:w-44 md:h-32 rounded-xl shadow-md border border-white/80 overflow-hidden bg-white p-1.5 z-0">
                    <img
                      src="/events/photo-walk.jpg"
                      alt="Golden Hour Photo Walk"
                      className="w-full h-20 md:h-24 object-cover rounded-lg"
                    />
                    <p className="text-[10px] font-semibold text-zinc-700 mt-1 truncate text-center">📸 Photo Walk</p>
                  </div>

                  {/* Card 7: Upper-Mid-Right */}
                  <div className="absolute top-[18%] right-[5%] -rotate-3 w-36 h-28 md:w-44 md:h-32 rounded-xl shadow-md border border-white/80 overflow-hidden bg-white p-1.5 z-0">
                    <img
                      src="/events/cup-painting.jpg"
                      alt="Cup Painting"
                      className="w-full h-20 md:h-24 object-cover rounded-lg"
                    />
                    <p className="text-[10px] font-semibold text-zinc-700 mt-1 truncate text-center">☕ Cup Painting</p>
                  </div>

                  {/* Card 8: Lower-Mid-Right */}
                  <div className="absolute bottom-[14%] right-[1.5%] rotate-2 w-36 h-28 md:w-44 md:h-32 rounded-xl shadow-md border border-white/80 overflow-hidden bg-white p-1.5 z-0">
                    <img
                      src="/events/resin-art.jpg"
                      alt="Resin Art Workshop"
                      className="w-full h-20 md:h-24 object-cover rounded-lg"
                    />
                    <p className="text-[10px] font-semibold text-zinc-700 mt-1 truncate text-center">🌸 Resin Art</p>
                  </div>
                </div>
              </div>

              {/* Central Text Container */}
              <div className="max-w-2xl mx-auto relative z-10 py-2">
                {/* Headline with Palatino Linotype font & floating sparkle accents */}
                <div className="relative inline-block my-2">
                  {/* Floating Sparkle Accents */}
                  <span className="absolute -top-4 -left-6 sm:-top-6 sm:-left-10 text-amber-400 text-2xl sm:text-4xl animate-bounce duration-1000 select-none">
                    ✨
                  </span>
                  <span className="absolute top-2 -right-8 sm:top-1 sm:-right-12 text-amber-500 text-xl sm:text-3xl animate-pulse duration-700 select-none">
                    ✦
                  </span>
                  <span className="absolute -bottom-3 left-1/4 text-amber-400 text-lg sm:text-2xl animate-pulse delay-300 select-none">
                    ✨
                  </span>
                  <span className="absolute -bottom-4 right-6 text-amber-500 text-sm sm:text-lg select-none">
                    ✦
                  </span>

                  <h1
                    className="font-bold tracking-tight text-zinc-950 text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] leading-none"
                    style={{ fontFamily: PALATINO_FONT }}
                  >
                    Likely
                  </h1>
                </div>

                {/* Subheadline */}
                <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-800">
                  Your likes. Your people. Your next adventure.
                </h2>

                {/* Description */}
                <p className="mt-3 text-base sm:text-lg leading-relaxed text-zinc-600 font-normal">
                  Skip the endless planning and small talk. Likely connects with your
                  social media to match your niche interests with casual, small-group
                  activities happening in public spaces around you.
                </p>

                {/* Primary Action Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setActiveTab("discover")}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-base px-8 py-3.5 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <span>Explore Events</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200 text-amber-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Highlights Grid (Completely separate block below hero title container) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
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
                  <ShieldCheck className="h-5 w-5 text-zinc-900" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-zinc-950 mb-2">
                  Verified Host Curation
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Community-curated hosts and verified Instagram connections ensure safe, welcoming public gatherings.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 py-8 text-center text-sm text-zinc-500 mb-16 sm:mb-0">
        <div className="mx-auto max-w-7xl px-4">
          <p>© 2026 Likely. Connect Outside • Crafted by Nehal Baid • All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Organizer Review Bar */}
      {pendingEvents.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl rounded-2xl bg-zinc-950/95 text-white p-4 shadow-2xl border border-zinc-800 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 animate-in slide-in-from-bottom-6 duration-300">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-zinc-200 overflow-hidden w-full sm:w-auto">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm">
              🛡️
            </span>
            <div className="truncate">
              <span className="font-semibold text-amber-300">
                Organizer Queue ({pendingEvents.length} Pending):
              </span>{" "}
              <span className="text-white font-medium">"{pendingEvents[0].title}"</span>{" "}
              <span className="text-zinc-400">by {pendingEvents[0].host.handle}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={() => handleApproveEvent(pendingEvents[0].id)}
              className="flex-1 sm:flex-initial rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm px-4 py-2 transition-all shadow-xs cursor-pointer"
            >
              Approve &amp; Publish ✓
            </button>
            <button
              onClick={() => handleDismissEvent(pendingEvents[0].id)}
              className="flex-1 sm:flex-initial rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-xs sm:text-sm px-3.5 py-2 transition-all cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
