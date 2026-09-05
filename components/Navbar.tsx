"use client";

import { Sparkles, Zap, ChevronDown } from "lucide-react";
import { UserProfile } from "@/components/ConnectProfileModal";

interface NavbarProps {
  activeTab: "hero" | "discover" | "memories";
  setActiveTab: (tab: "hero" | "discover" | "memories") => void;
  onOpenHostModal: () => void;
  onOpenProfileModal: () => void;
  userProfile: UserProfile | null;
  autoApprove: boolean;
  setAutoApprove: (val: boolean) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenHostModal,
  onOpenProfileModal,
  userProfile,
  autoApprove,
  setAutoApprove,
}: NavbarProps) {
  const userHandle = userProfile?.instagramHandle || "Connect Profile";

  return (
    <header className="w-full px-8 py-4 flex items-center justify-between border-b border-zinc-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      {/* Left Group */}
      <div className="flex items-center gap-6">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab("hero")}
          className="font-['Palatino_Linotype',serif] font-bold text-lg text-zinc-900 tracking-tight flex items-center gap-2 hover:opacity-90 transition cursor-pointer text-left"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950 text-white shadow-xs font-sans">
            <Sparkles className="h-4 w-4 text-amber-300" />
          </div>
          <span>Likely</span>
        </button>

        {/* Navigation Links */}
        <button
          onClick={() => setActiveTab("discover")}
          className={`text-sm font-medium transition cursor-pointer ${
            activeTab === "discover"
              ? "text-zinc-900 font-semibold"
              : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          Discover &amp; Join
        </button>

        <button
          onClick={onOpenHostModal}
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition cursor-pointer"
        >
          Host a Circle
        </button>

        <button
          onClick={() => setActiveTab("memories")}
          className={`text-sm font-medium transition cursor-pointer ${
            activeTab === "memories"
              ? "text-zinc-900 font-semibold"
              : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          Past Memories
        </button>
      </div>

      {/* Center Empty Space */}
      <div className="flex-1"></div>

      {/* Right Group */}
      <div className="flex items-center gap-4">
        {/* Demo Auto-Approve Toggle Switch */}
        <button
          onClick={() => setAutoApprove(!autoApprove)}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium border transition cursor-pointer ${
            autoApprove
              ? "bg-emerald-50 text-emerald-900 border-emerald-300"
              : "bg-zinc-100 text-zinc-600 border-zinc-200"
          }`}
          title="Toggle Instant Demo Approval"
        >
          <Zap className={`h-3.5 w-3.5 ${autoApprove ? "text-emerald-600 fill-emerald-600" : "text-zinc-400"}`} />
          <span>{autoApprove ? "Instant Approval: ON" : "Curation: ON"}</span>
        </button>

        {/* User Profile Chip */}
        <button
          onClick={onOpenProfileModal}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-900 transition cursor-pointer"
        >
          <span>{userHandle}</span>
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>
      </div>
    </header>
  );
}
