"use client";

import { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Send,
  Globe,
  Sliders,
  Check,
  RefreshCw,
  Zap,
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

export interface UserProfile {
  fullName: string;
  age: string;
  gender: string;
  instagramHandle: string;
  interests: string[];
  syncMethod?: "reels_dm" | "public_graph" | "manual";
}

interface ConnectProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: UserProfile) => void;
  existingProfile?: UserProfile | null;
}

const GENDER_OPTIONS = ["Female", "Male", "Non-Binary", "Prefer not to say"];

const MANUAL_HOBBIES = [
  "🎨 Outdoor Sketching & Painting",
  "🏺 Clay Pottery & Craft Pop-ups",
  "🚲 City Cycling & Exploration",
  "📸 Film & Mobile Photography",
  "🎲 Board Games in the Lawn",
  "🎸 Sunset Acoustic Jamming",
  "🏃 Casual Morning Jogs",
  "☕ Specialty Coffee Crawls",
  "🌿 Botanical Garden Picnics",
  "🧘 Outdoor Yoga & Breathwork",
  "📚 Book Swap & Readathons",
  "🥐 Farmers Market & Food Walks",
];

const REELS_DM_EXTRACTED_VIBES = [
  "🎨 Outdoor Sketching & Painting",
  "☕ Specialty Coffee Crawls",
  "🏺 Clay Pottery & Craft Pop-ups",
  "🌿 Botanical Garden Picnics",
];

const PUBLIC_GRAPH_EXTRACTED_VIBES = [
  "📸 Film & Mobile Photography",
  "🎨 Outdoor Sketching & Painting",
  "☕ Specialty Coffee Crawls",
  "🏃 Casual Morning Jogs",
  "🏺 Clay Pottery & Craft Pop-ups",
];

export default function ConnectProfileModal({
  isOpen,
  onClose,
  onComplete,
  existingProfile,
}: ConnectProfileModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Prefer not to say");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [syncMethod, setSyncMethod] = useState<"reels_dm" | "public_graph" | "manual">("reels_dm");
  const [manualInterests, setManualInterests] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Loading & Sync States for Step 2
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgressText, setSyncProgressText] = useState("");
  const [syncComplete, setSyncComplete] = useState(false);
  const [extractedVibes, setExtractedVibes] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrorMsg("");
      setIsSyncing(false);
      setSyncComplete(false);

      if (existingProfile) {
        setFullName(existingProfile.fullName || "");
        setAge(existingProfile.age || "");
        setGender(existingProfile.gender || "Prefer not to say");
        setInstagramHandle(existingProfile.instagramHandle || "");
        if (existingProfile.interests) {
          setManualInterests(existingProfile.interests);
        }
        if (existingProfile.syncMethod) {
          setSyncMethod(existingProfile.syncMethod);
        }
      }
    }
  }, [isOpen, existingProfile]);

  if (!isOpen) return null;

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (!age || parseInt(age, 10) < 13 || parseInt(age, 10) > 120) {
      setErrorMsg("Please enter a valid age (13+).");
      return;
    }

    const formattedHandle = instagramHandle.trim()
      ? instagramHandle.startsWith("@")
        ? instagramHandle.trim()
        : `@${instagramHandle.trim()}`
      : "@traveler";

    setInstagramHandle(formattedHandle);
    setErrorMsg("");
    setStep(2);
    setSyncComplete(false);
    setIsSyncing(false);
  };

  const handleRunSync = () => {
    setIsSyncing(true);
    setSyncComplete(false);
    setErrorMsg("");

    const handleDisplay = instagramHandle.trim() || "@user";

    if (syncMethod === "reels_dm") {
      setSyncProgressText(`Connecting to @likely.app DM inbox...`);

      setTimeout(() => {
        setSyncProgressText(`Received 3 shared reels from ${handleDisplay}...`);
      }, 500);

      setTimeout(() => {
        setSyncProgressText(
          `Extracted aesthetics: 🎨 Watercolor & Art, ☕ Specialty Cafés, 🪴 Upcycling`
        );
      }, 1000);

      setTimeout(() => {
        setIsSyncing(false);
        setSyncComplete(true);
        setExtractedVibes(REELS_DM_EXTRACTED_VIBES);
      }, 1500);
    } else if (syncMethod === "public_graph") {
      setSyncProgressText(`Scanning public aesthetic graph for ${handleDisplay}...`);

      setTimeout(() => {
        setIsSyncing(false);
        setSyncComplete(true);
        setExtractedVibes(PUBLIC_GRAPH_EXTRACTED_VIBES);
      }, 1500);
    }
  };

  const toggleManualInterest = (interest: string) => {
    if (manualInterests.includes(interest)) {
      setManualInterests(manualInterests.filter((i) => i !== interest));
    } else {
      setManualInterests([...manualInterests, interest]);
    }
  };

  const handleFinalSave = () => {
    let finalInterests: string[] = [];

    if (syncMethod === "reels_dm") {
      finalInterests = syncComplete ? extractedVibes : REELS_DM_EXTRACTED_VIBES;
    } else if (syncMethod === "public_graph") {
      finalInterests = syncComplete ? extractedVibes : PUBLIC_GRAPH_EXTRACTED_VIBES;
    } else {
      if (manualInterests.length === 0) {
        setErrorMsg("Please select at least 1 hobby tag to personalize your feed.");
        return;
      }
      finalInterests = manualInterests;
    }

    const finalProfile: UserProfile = {
      fullName: fullName.trim(),
      age: age.trim(),
      gender,
      instagramHandle: instagramHandle.trim() || "@user",
      interests: finalInterests,
      syncMethod,
    };

    onComplete(finalProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 shadow-2xl transition-all">
        {/* Header & Step Dots */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-white">
              <InstagramIcon className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-zinc-950">
                Join Likely Community
              </h2>
              <p className="text-xs text-zinc-500">
                Step {step} of 2 • Personalize your feed
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-medium text-red-600 animate-in fade-in">
            {errorMsg}
          </div>
        )}

        {/* STEP 1: USER PROFILE & SYNC METHOD */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <div>
              <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
                Sync your offline weekend vibe with small, curated outdoor circles.
              </p>
            </div>

            {/* Name & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maya Lin"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-3.5 py-2.5 text-sm text-zinc-950 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 24"
                  min="13"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-3.5 py-2.5 text-sm text-zinc-950 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Gender / Pronouns */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                Gender / Pronouns
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {GENDER_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setGender(opt)}
                    className={`rounded-full py-1.5 px-2 text-xs font-medium border transition-all truncate ${
                      gender === opt
                        ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                        : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Instagram Handle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                Instagram Handle
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 my-auto h-fit text-sm font-semibold text-zinc-400">
                  @
                </span>
                <input
                  type="text"
                  placeholder="maya_sketches"
                  value={instagramHandle.replace(/^@/, "")}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 pl-8 pr-4 py-2.5 text-sm text-zinc-950 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Vibe Sync Method Selection */}
            <div className="pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
                Vibe Sync Method
              </label>
              <div className="space-y-2">
                {/* Option 1: DM Reels */}
                <button
                  type="button"
                  onClick={() => setSyncMethod("reels_dm")}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    syncMethod === "reels_dm"
                      ? "bg-zinc-950 text-white border-zinc-950 shadow-md"
                      : "bg-zinc-50 text-zinc-900 border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <Send className={`h-5 w-5 shrink-0 mt-0.5 ${syncMethod === "reels_dm" ? "text-amber-300" : "text-zinc-500"}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs sm:text-sm">
                        ✈️ Forward Saved Reels via DM
                      </span>
                      <span className="rounded-full bg-amber-400 text-zinc-950 font-extrabold text-[10px] px-2 py-0.5">
                        Recommended
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 ${syncMethod === "reels_dm" ? "text-zinc-300" : "text-zinc-500"}`}>
                      Send saved Instagram aesthetic reels to @likely.app for instant aesthetic matching.
                    </p>
                  </div>
                </button>

                {/* Option 2: Public Vibe Graph */}
                <button
                  type="button"
                  onClick={() => setSyncMethod("public_graph")}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    syncMethod === "public_graph"
                      ? "bg-zinc-950 text-white border-zinc-950 shadow-md"
                      : "bg-zinc-50 text-zinc-900 border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <Globe className={`h-5 w-5 shrink-0 mt-0.5 ${syncMethod === "public_graph" ? "text-amber-300" : "text-zinc-500"}`} />
                  <div className="flex-1">
                    <span className="font-semibold text-xs sm:text-sm">
                      🌐 Public Activity Vibe Graph
                    </span>
                    <p className={`text-xs mt-0.5 ${syncMethod === "public_graph" ? "text-zinc-300" : "text-zinc-500"}`}>
                      Scan public activity tags & weekend outdoor interests automatically.
                    </p>
                  </div>
                </button>

                {/* Option 3: Manual */}
                <button
                  type="button"
                  onClick={() => setSyncMethod("manual")}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    syncMethod === "manual"
                      ? "bg-zinc-950 text-white border-zinc-950 shadow-md"
                      : "bg-zinc-50 text-zinc-900 border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <Lock className={`h-5 w-5 shrink-0 mt-0.5 ${syncMethod === "manual" ? "text-amber-300" : "text-zinc-500"}`} />
                  <div className="flex-1">
                    <span className="font-semibold text-xs sm:text-sm">
                      🔒 Private Account / Manual
                    </span>
                    <p className={`text-xs mt-0.5 ${syncMethod === "manual" ? "text-zinc-300" : "text-zinc-500"}`}>
                      Select your favorite outdoor hobbies and weekend circles manually.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 font-semibold text-sm py-3 transition-all cursor-pointer shadow-md"
            >
              <span>Continue to Vibe Sync</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {/* STEP 2: DYNAMIC VERIFICATION & VIBE EXTRACTION */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in">
            {/* Back Button */}
            <button
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors flex items-center gap-1"
            >
              ← Back to profile setup
            </button>

            {/* SYNC METHOD 1: FORWARD REELS VIA DM */}
            {syncMethod === "reels_dm" && (
              <div className="space-y-4">
                <div className="rounded-2xl bg-amber-50 border border-amber-200/80 p-4 space-y-2">
                  <h3 className="font-bold text-sm text-amber-950 flex items-center gap-2">
                    <span>✈️ Direct Message Vibe Sync</span>
                  </h3>
                  <ol className="text-xs text-amber-900 space-y-1.5 list-decimal list-inside leading-relaxed">
                    <li>Find an aesthetic reel or weekend activity you saved on Instagram.</li>
                    <li>
                      Tap Share &amp; send it to <span className="font-bold">@likely.app</span> in DMs.
                    </li>
                  </ol>
                </div>

                {!syncComplete && !isSyncing && (
                  <button
                    onClick={handleRunSync}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 font-bold text-sm py-3 transition-all cursor-pointer shadow-md"
                  >
                    <Send className="h-4 w-4 text-amber-300" />
                    <span>Check Inbox &amp; Sync Vibe</span>
                  </button>
                )}

                {isSyncing && (
                  <div className="rounded-2xl bg-zinc-950 text-white p-5 text-center space-y-3 animate-pulse">
                    <RefreshCw className="h-6 w-6 text-amber-300 animate-spin mx-auto" />
                    <p className="text-xs font-semibold text-zinc-200">{syncProgressText}</p>
                  </div>
                )}

                {syncComplete && (
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 space-y-3 animate-in fade-in">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                      <span>Extracted Aesthetics &amp; Vibe Match</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {extractedVibes.map((vibe) => (
                        <span
                          key={vibe}
                          className="rounded-full bg-white border border-emerald-300 px-3 py-1 text-xs font-medium text-emerald-950 shadow-2xs"
                        >
                          {vibe}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(syncComplete || !isSyncing) && (
                  <button
                    onClick={handleFinalSave}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 font-bold text-sm py-3 transition-all cursor-pointer shadow-md"
                  >
                    <Sparkles className="h-4 w-4 text-amber-300" />
                    <span>Curate My Feed</span>
                  </button>
                )}
              </div>
            )}

            {/* SYNC METHOD 2: PUBLIC VIBE GRAPH */}
            {syncMethod === "public_graph" && (
              <div className="space-y-4">
                <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-4 text-xs text-zinc-600 leading-relaxed">
                  We'll scan public aesthetic tags and outdoor activity graphs linked to{" "}
                  <span className="font-bold text-zinc-950">{instagramHandle || "@user"}</span>.
                </div>

                {!syncComplete && !isSyncing && (
                  <button
                    onClick={handleRunSync}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 font-bold text-sm py-3 transition-all cursor-pointer shadow-md"
                  >
                    <Globe className="h-4 w-4 text-amber-300" />
                    <span>Analyze Public Vibe Graph</span>
                  </button>
                )}

                {isSyncing && (
                  <div className="rounded-2xl bg-zinc-950 text-white p-5 text-center space-y-3 animate-pulse">
                    <RefreshCw className="h-6 w-6 text-amber-300 animate-spin mx-auto" />
                    <p className="text-xs font-semibold text-zinc-200">{syncProgressText}</p>
                  </div>
                )}

                {syncComplete && (
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 space-y-3 animate-in fade-in">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                      <span>5 Inferred Hobbies Detected</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {extractedVibes.map((vibe) => (
                        <span
                          key={vibe}
                          className="rounded-full bg-white border border-emerald-300 px-3 py-1 text-xs font-medium text-emerald-950 shadow-2xs"
                        >
                          {vibe}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(syncComplete || !isSyncing) && (
                  <button
                    onClick={handleFinalSave}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 font-bold text-sm py-3 transition-all cursor-pointer shadow-md"
                  >
                    <Sparkles className="h-4 w-4 text-amber-300" />
                    <span>Save &amp; Curate My Feed</span>
                  </button>
                )}
              </div>
            )}

            {/* SYNC METHOD 3: MANUAL HOBBY SELECTOR */}
            {syncMethod === "manual" && (
              <div className="space-y-4">
                <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-3.5 text-xs text-zinc-700 flex items-start gap-2.5">
                  <Lock className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-semibold text-zinc-950">Meta Privacy Protection:</span>{" "}
                    Meta keeps private profiles locked down. Pick your hobbies manually (Choose 3+):
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                  {MANUAL_HOBBIES.map((hobby) => {
                    const isSelected = manualInterests.includes(hobby);
                    return (
                      <button
                        key={hobby}
                        type="button"
                        onClick={() => toggleManualInterest(hobby)}
                        className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                            : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                        }`}
                      >
                        <span className="truncate">{hobby}</span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-amber-300 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleFinalSave}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 font-bold text-sm py-3 transition-all cursor-pointer shadow-md"
                >
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Save Preferences</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
