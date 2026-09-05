"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, PlusCircle, ShieldCheck, MapPin, Calendar, Users, Image as ImageIcon } from "lucide-react";
import { EventItem } from "@/data/events";
import { UserProfile } from "@/components/SignUpModal";

interface HostEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitEvent: (newEvent: EventItem) => void;
  userProfile: UserProfile | null;
  autoApprove: boolean;
}

const PRESET_IMAGES = [
  { label: "Beach Painting", url: "/events/beach-painting.jpg", tag: "🎨 Outdoor Sketching & Painting" },
  { label: "Board Games", url: "/events/card-games.jpg", tag: "🎲 Board Games in the Lawn" },
  { label: "Chalk Art", url: "/events/casual-chalk-art.jpg", tag: "🎨 Outdoor Sketching & Painting" },
  { label: "Cup Painting", url: "/events/cup-painting.jpg", tag: "🏺 Clay Pottery & Craft Pop-ups" },
  { label: "Bedazzling", url: "/events/cute-bedazzling.jpg", tag: "🏺 Clay Pottery & Craft Pop-ups" },
  { label: "City Cycling", url: "/events/cycling.jpg", tag: "🚲 City Cycling & Exploration" },
  { label: "Ice Cream Crawl", url: "/events/ice-cream-date.jpg", tag: "🥐 Farmers Market & Food Walks" },
  { label: "Acoustic Jamming", url: "/events/jamming.jpg", tag: "🎸 Sunset Acoustic Jamming" },
  { label: "Can Sculptures", url: "/events/monster-can-art.jpg", tag: "🎨 Outdoor Sketching & Painting" },
  { label: "Photo Walk", url: "/events/photo-walk.jpg", tag: "📸 Film & Mobile Photography" },
  { label: "Pottery Painting", url: "/events/pottery-painting.jpg", tag: "🏺 Clay Pottery & Craft Pop-ups" },
  { label: "Resin Coasters", url: "/events/resin-art.jpg", tag: "🏺 Clay Pottery & Craft Pop-ups" },
  { label: "Science Study", url: "/events/science-homework.jpg", tag: "📚 Book Swap & Readathons" },
  { label: "Volleyball", url: "/events/volleyball.jpg", tag: "🏃 Casual Morning Jogs" },
];

export default function HostEventModal({
  isOpen,
  onClose,
  onSubmitEvent,
  userProfile,
  autoApprove,
}: HostEventModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Creative" | "Active" | "Social">("Creative");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [maxSpots, setMaxSpots] = useState(6);
  const [hostName, setHostName] = useState("");
  const [hostHandle, setHostHandle] = useState("");
  const [whatToBring, setWhatToBring] = useState("");
  const [selectedImage, setSelectedImage] = useState("/events/beach-painting.jpg");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setErrorMsg("");
      if (userProfile) {
        setHostName(userProfile.fullName);
        setHostHandle(userProfile.instagramHandle || "");
      }
    }
  }, [isOpen, userProfile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMsg("Please enter an event title.");
      return;
    }
    if (!location.trim()) {
      setErrorMsg("Please enter an outdoor location.");
      return;
    }
    if (!date.trim()) {
      setErrorMsg("Please specify a date and time.");
      return;
    }
    if (!hostName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    const formattedHandle = hostHandle.trim()
      ? hostHandle.startsWith("@")
        ? hostHandle.trim()
        : `@${hostHandle.trim()}`
      : "@host";

    const selectedPreset = PRESET_IMAGES.find((p) => p.url === selectedImage);
    const tag = selectedPreset ? selectedPreset.tag : "🌿 Outdoor Group";

    const newEvent: EventItem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      image: selectedImage,
      location: location.trim(),
      date: date.trim(),
      maxSpots: Number(maxSpots),
      currentSpots: 1, // Host is spot 1
      tags: [tag, category === "Creative" ? "🎨 Creative Circle" : category === "Active" ? "🏃 Active Vibe" : "☕ Social Meetup"],
      host: {
        name: hostName.trim(),
        handle: formattedHandle,
      },
      attendees: [formattedHandle],
      isNew: true,
      isVerifiedHost: false,
      isPending: true,
      whatToBring: whatToBring.trim() || undefined,
    };

    onSubmitEvent(newEvent);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 shadow-2xl transition-all">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-white">
              <PlusCircle className="h-4.5 w-4.5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
                Host a Small Circle
              </h2>
              <p className="text-xs text-zinc-500">
                Keep it intimate (4–8 people). Outdoor, hobby-first, zero-pressure.
              </p>
            </div>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Cubbon Park Sunset Sketching & Coffee"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-sm text-zinc-950 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
              Category
            </label>
            <div className="flex gap-2">
              {(["Creative", "Active", "Social"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`flex-1 rounded-full py-2 px-3 text-xs font-medium border transition-all ${
                    category === cat
                      ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                      : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Location & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                Outdoor Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute inset-y-0 left-3 my-auto h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="e.g. Cubbon Park Bamboo Grove"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 pl-9 pr-4 py-2.5 text-sm text-zinc-950 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                Date & Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute inset-y-0 left-3 my-auto h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="e.g. Sunday, 4:30 PM"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 pl-9 pr-4 py-2.5 text-sm text-zinc-950 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Max Capacity & What to bring */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                Max Capacity
              </label>
              <div className="relative">
                <Users className="absolute inset-y-0 left-3 my-auto h-4 w-4 text-zinc-400" />
                <input
                  type="number"
                  min="2"
                  max="8"
                  value={maxSpots}
                  onChange={(e) => setMaxSpots(Number(e.target.value))}
                  className="w-full rounded-xl bg-zinc-50 border border-zinc-200 pl-9 pr-3 py-2.5 text-sm text-zinc-950 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                What to Bring
              </label>
              <input
                type="text"
                placeholder="e.g. A sketchbook and your favorite pen"
                value={whatToBring}
                onChange={(e) => setWhatToBring(e.target.value)}
                className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-sm text-zinc-950 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Host Name & Instagram Handle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                Host Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Maya"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-sm text-zinc-950 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                Host Instagram Handle
              </label>
              <input
                type="text"
                placeholder="@maya_sketches"
                value={hostHandle}
                onChange={(e) => setHostHandle(e.target.value)}
                className="w-full rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-2.5 text-sm text-zinc-950 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Cover Image Selector */}
          <div>
            <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
              <span>Cover Image Theme</span>
              <span className="text-[10px] text-zinc-400 lowercase">select thumbnail</span>
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-h-36 overflow-y-auto p-1.5 rounded-2xl border border-zinc-100 bg-zinc-50/50">
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => setSelectedImage(preset.url)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === preset.url
                      ? "border-zinc-950 shadow-md scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  title={preset.label}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Curation info banner */}
          <div className="rounded-2xl bg-amber-50 border border-amber-200/70 p-3 text-xs text-amber-900 flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Community Curation: </span>
              <span>
                {autoApprove
                  ? "⚡ Demo Quick-Approval active: Your circle will be published instantly!"
                  : "Our community team verifies every host to keep gatherings safe & intimate."}
              </span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm py-3 px-6 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Publish Circle 🎉</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
