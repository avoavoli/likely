"use client";

import { useState, useEffect } from "react";
import { Camera, Calendar, MapPin, Sparkles, Users, X, ChevronLeft, ChevronRight, Image as ImageIcon, UserPlus } from "lucide-react";
import { USER_MEMORIES, PastMemory } from "@/data/memories";

interface PastMemoriesViewProps {
  userHandle?: string;
  userName?: string;
  onOpenSignUp?: () => void;
}

export default function PastMemoriesView({
  userHandle = "",
  userName = "",
  onOpenSignUp,
}: PastMemoriesViewProps) {
  // Clear legacy cached memories from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("likely_memories_store");
        localStorage.removeItem("likely_memories_v2");
        localStorage.removeItem("likely_memories_v3");
      } catch {
        // Ignore localStorage errors
      }
    }
  }, []);

  const memories: PastMemory[] = (userHandle && USER_MEMORIES[userHandle]) ? USER_MEMORIES[userHandle] : [];

  // Lightbox State
  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    title: string;
    index: number;
    total: number;
    photosList: string[];
  } | null>(null);

  const openLightbox = (photos: string[], index: number, title: string) => {
    setSelectedPhoto({
      url: photos[index],
      title,
      index,
      total: photos.length,
      photosList: photos,
    });
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const nextIdx = (selectedPhoto.index + 1) % selectedPhoto.total;
    setSelectedPhoto({
      ...selectedPhoto,
      index: nextIdx,
      url: selectedPhoto.photosList[nextIdx],
    });
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const prevIdx = (selectedPhoto.index - 1 + selectedPhoto.total) % selectedPhoto.total;
    setSelectedPhoto({
      ...selectedPhoto,
      index: prevIdx,
      url: selectedPhoto.photosList[prevIdx],
    });
  };

  const displayName = userName || (userHandle ? userHandle : "Guest Member");
  const displayHandle = userHandle || "New Sign Up";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "GM";

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl bg-zinc-950 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
            <Camera className="h-3.5 w-3.5" />
            <span>Past Circle Journal {userHandle ? `• ${userHandle}` : "• Guest Mode"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Past Memories
          </h1>
          <p className="text-sm text-zinc-300 max-w-xl leading-relaxed">
            Captured moments from small-group outdoor meetups, café study sprints, and heritage walks with verified community hosts.
          </p>
        </div>

        <div className="z-10 shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-zinc-950 font-bold text-sm">
            {initials}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{displayName}</p>
            <p className="text-xs text-amber-300 font-medium">{displayHandle} {userHandle ? "🟢" : "⚪"}</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">{memories.length} Completed Outdoor Circles</p>
          </div>
        </div>

        {/* Decorative background blur circle */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Content Area: Memories Timeline or Empty/Guest State */}
      {memories.length > 0 ? (
        <div className="space-y-12">
          {memories.map((memory) => (
            <article
              key={memory.id}
              className="rounded-3xl bg-white border border-zinc-200/80 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-200 space-y-6"
            >
              {/* Memory Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="rounded-full bg-amber-100 text-amber-950 font-bold text-xs px-3 py-1 border border-amber-300/80">
                      {memory.vibe}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-zinc-500 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{memory.date}</span>
                    </div>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950">
                    {memory.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 bg-zinc-50 border border-zinc-200 px-3.5 py-2 rounded-2xl w-fit">
                  <MapPin className="h-4 w-4 text-zinc-500 shrink-0" />
                  <span>{memory.location}</span>
                </div>
              </div>

              {/* Memory Description & Summary */}
              <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                {memory.summary}
              </p>

              {/* Photos Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    <ImageIcon className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Photo Album ({memory.photos.length} Captured Shots)</span>
                  </h3>
                  <span className="text-[11px] text-zinc-400 font-medium">Click photo to expand</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {memory.photos.map((photoUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => openLightbox(memory.photos, idx, memory.title)}
                      className="group relative h-40 sm:h-44 w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/80 cursor-pointer shadow-2xs hover:shadow-md transition-all duration-200"
                    >
                      <img
                        src={encodeURI(photoUrl)}
                        alt={`${memory.title} photo ${idx + 1}`}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          console.error("Failed loading memory image:", photoUrl);
                        }}
                      />
                      <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="rounded-full bg-white/90 backdrop-blur-xs text-zinc-950 text-[11px] font-bold px-2.5 py-1 shadow-xs">
                          View 🔍
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attendees Footer */}
              <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                  <Users className="h-4 w-4 text-zinc-400" />
                  <span>Circle Members:</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {memory.attendees.map((attendee) => (
                    <div
                      key={attendee.handle}
                      className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-800"
                    >
                      <span className="font-semibold text-zinc-950">{attendee.name}</span>
                      <span className="text-zinc-500 text-[11px]">{attendee.handle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : !userHandle ? (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50/50 p-8 sm:p-12 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-xs">
            <UserPlus className="h-6 w-6 text-amber-300" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-zinc-950">
              Welcome! Sign up to view your past memories
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Likely defaults to new sign up for all visits. Create your profile to match with outdoor circles and build your memory journal!
            </p>
          </div>
          {onOpenSignUp && (
            <button
              onClick={onOpenSignUp}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 hover:bg-zinc-800 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Connect Profile &amp; Sign Up</span>
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50/50 p-8 sm:p-12 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-xs">
            <Camera className="h-6 w-6 text-amber-300" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-zinc-950">
              No circle memories yet
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              You haven't completed any outdoor circles yet. Join an activity on the Discover tab to start capturing memories!
            </p>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between text-white mb-4 px-2">
              <div>
                <p className="font-bold text-sm sm:text-base">{selectedPhoto.title}</p>
                <p className="text-xs text-zinc-400">
                  Photo {selectedPhoto.index + 1} of {selectedPhoto.total}
                </p>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="rounded-full p-2 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close photo"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Image View */}
            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black border border-zinc-800">
              <img
                src={encodeURI(selectedPhoto.url)}
                alt={selectedPhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 p-2.5 rounded-full bg-zinc-950/60 hover:bg-zinc-950 text-white border border-white/20 transition-all cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 p-2.5 rounded-full bg-zinc-950/60 hover:bg-zinc-950 text-white border border-white/20 transition-all cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
