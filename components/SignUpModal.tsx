"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, Check, Sparkles, Lock, User, Heart } from "lucide-react";

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

export interface UserProfile {
  fullName: string;
  age: string;
  gender: string;
  instagramHandle: string;
  interests: string[];
}

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: UserProfile) => void;
}

export const HOBBIES_LIST = [
  "📸 Film & Mobile Photography",
  "☕ Specialty Coffee Crawls",
  "🌿 Botanical Garden Picnics",
  "🎨 Outdoor Sketching & Painting",
  "🎸 Sunset Acoustic Jamming",
  "📚 Book Swap & Readathons",
  "🏃 Casual Morning Jogs",
  "🚲 City Cycling & Exploration",
  "🧘 Outdoor Yoga & Breathwork",
  "🐕 Dog Walking & Pet Playdates",
  "🛹 Skateboarding & Longboarding",
  "🏸 Badminton in the Park",
  "🥐 Farmers Market & Food Walks",
  "🔭 Stargazing & Night Walks",
  "🎲 Board Games in the Lawn",
  "🧗 Bouldering & Outdoor Climbing",
  "🥾 Day Hiking & Nature Trails",
  "🐦 Bird Watching & Biodiversity",
  "🏺 Clay Pottery & Craft Pop-ups",
  "✍️ Creative Writing & Journaling",
];

const GENDER_OPTIONS = ["Female", "Male", "Non-Binary", "Prefer not to say"];

export default function SignUpModal({
  isOpen,
  onClose,
  onComplete,
}: SignUpModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Prefer not to say");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrorMsg("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!age || parseInt(age, 10) < 13 || parseInt(age, 10) > 120) {
      setErrorMsg("Please enter a valid age (13+).");
      return;
    }
    setErrorMsg("");
    setStep(2);
  };

  const handleStep2Next = (skipped = false) => {
    setErrorMsg("");
    if (skipped) {
      setInstagramHandle("");
    } else if (instagramHandle && !instagramHandle.startsWith("@")) {
      setInstagramHandle(`@${instagramHandle.trim()}`);
    }
    setStep(3);
  };

  const toggleInterest = (hobby: string) => {
    if (selectedInterests.includes(hobby)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== hobby));
    } else {
      setSelectedInterests([...selectedInterests, hobby]);
    }
  };

  const handleComplete = () => {
    if (selectedInterests.length < 3) {
      setErrorMsg("Please select at least 3 interests to continue.");
      return;
    }

    const finalProfile: UserProfile = {
      fullName: fullName.trim(),
      age: age.trim(),
      gender,
      instagramHandle: instagramHandle.trim()
        ? instagramHandle.startsWith("@")
          ? instagramHandle.trim()
          : `@${instagramHandle.trim()}`
        : "",
      interests: selectedInterests,
    };

    onComplete(finalProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 shadow-2xl transition-all">
        {/* Header with Close Button and Progress Indicator */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  step >= 1 ? "w-6 bg-zinc-950" : "w-2.5 bg-zinc-200"
                }`}
              />
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  step >= 2 ? "w-6 bg-zinc-950" : "w-2.5 bg-zinc-200"
                }`}
              />
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  step >= 3 ? "w-6 bg-zinc-950" : "w-2.5 bg-zinc-200"
                }`}
              />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 ml-2">
              Step {step} of 3
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-medium text-red-600 animate-in fade-in">
            {errorMsg}
          </div>
        )}

        {/* STEP 1: Basic Profile Details */}
        {step === 1 && (
          <form onSubmit={handleStep1Next} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 mb-2">
                <User className="h-3.5 w-3.5" />
                <span>Basic Profile</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
                Welcome to Likely
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Tell us a little bit about yourself to get started.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-sm text-zinc-950 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="24"
                    min="13"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-sm text-zinc-950 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-sm text-zinc-950 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
                  >
                    {GENDER_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-sm py-3 px-6 shadow-md transition-all active:scale-95"
              >
                <span>Next: Connect Socials</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Connect Instagram */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200/60 px-3 py-1 text-xs font-semibold mb-2">
                <InstagramIcon className="h-3.5 w-3.5" />
                <span>Social Integration</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
                Sync your vibe
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Enter your Instagram handle to help us match you with compatible outdoor adventures and communities.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700">
                Instagram Handle
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400 font-semibold text-sm">
                  @
                </span>
                <input
                  type="text"
                  placeholder="yourname"
                  value={
                    instagramHandle.startsWith("@")
                      ? instagramHandle.slice(1)
                      : instagramHandle
                  }
                  onChange={(e) => setInstagramHandle(e.target.value)}
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 pl-8 pr-4 py-2.5 text-sm text-zinc-950 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs text-zinc-500 pt-1">
                <Lock className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                <span>🔒 We only analyze public lifestyle & visual interest tags.</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => handleStep2Next(true)}
                className="flex-1 rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-100 font-medium text-sm py-2.5 px-4 transition-colors text-center"
              >
                Skip for now
              </button>
              <button
                type="button"
                onClick={() => handleStep2Next(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-sm py-2.5 px-5 shadow-xs transition-all active:scale-95"
              >
                <span>Next: Interests</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Choose Hobbies & Interests */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 px-3 py-1 text-xs font-semibold mb-1.5">
                <Heart className="h-3.5 w-3.5" />
                <span>Personalize Feed</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
                What do you love doing outside?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Pick at least 3 to personalize your local recommendations. ({selectedInterests.length} selected)
              </p>
            </div>

            {/* Interactive Toggle Chips Grid */}
            <div className="max-h-60 sm:max-h-64 overflow-y-auto pr-1 space-y-2 rounded-2xl border border-zinc-100 p-2.5 bg-zinc-50/50 scrollbar-thin">
              <div className="flex flex-wrap gap-2">
                {HOBBIES_LIST.map((hobby) => {
                  const isSelected = selectedInterests.includes(hobby);
                  return (
                    <button
                      key={hobby}
                      type="button"
                      onClick={() => toggleInterest(hobby)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-zinc-950 text-white shadow-xs scale-102"
                          : "bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100"
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                      <span>{hobby}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleComplete}
                disabled={selectedInterests.length < 3}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm py-3 px-6 shadow-md transition-all active:scale-95 ${
                  selectedInterests.length >= 3
                    ? "bg-zinc-950 hover:bg-zinc-800 text-white cursor-pointer"
                    : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                }`}
              >
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span>
                  {selectedInterests.length >= 3
                    ? "Complete Sign Up & Explore 🎉"
                    : `Select ${3 - selectedInterests.length} more interest${
                        3 - selectedInterests.length > 1 ? "s" : ""
                      }`}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
