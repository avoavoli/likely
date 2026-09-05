"use client";

import { useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Check,
  MessageCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from "lucide-react";
import { EventItem } from "@/data/events";

interface EventCardProps {
  event: EventItem;
  userInterests?: string[];
  userInstagramHandle?: string;
  isMatched?: boolean;
  onJoinToggle?: (eventId: string, joined: boolean) => void;
}

export default function EventCard({
  event,
  userInterests = [],
  userInstagramHandle = "",
  isMatched = false,
  onJoinToggle,
}: EventCardProps) {
  const [isJoined, setIsJoined] = useState(false);
  const [spotsCount, setSpotsCount] = useState(event.currentSpots);
  const [showAttendees, setShowAttendees] = useState(false);

  const handleJoinClick = () => {
    const nextJoinedState = !isJoined;
    setIsJoined(nextJoinedState);
    setSpotsCount((prev) => (nextJoinedState ? prev + 1 : prev - 1));
    if (onJoinToggle) {
      onJoinToggle(event.id, nextJoinedState);
    }
  };

  const categoryColors = {
    Creative: "bg-purple-50 text-purple-700 border-purple-200",
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Social: "bg-blue-50 text-blue-700 border-blue-200",
  };

  const attendeesList = isJoined
    ? [
        userInstagramHandle || "@you",
        ...event.attendees.filter((h) => h !== userInstagramHandle),
      ]
    : event.attendees;

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-xs hover:shadow-md transition-all duration-200 group">
      {/* Image Thumbnail Header */}
      <div className="relative w-full h-48 overflow-hidden bg-zinc-100 rounded-t-3xl">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-3xl bg-zinc-100 group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            console.error("Failed to load image at:", event.image);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-black/20" />

        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold border backdrop-blur-md shadow-xs ${
              categoryColors[event.category]
            }`}
          >
            {event.category}
          </span>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {event.isNew && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 text-white px-2.5 py-0.5 text-xs font-bold shadow-md">
                <span>✨ New Circle</span>
              </span>
            )}

            {event.isVerifiedHost && (
              <span className="inline-flex items-center gap-1 rounded-full bg-zinc-950/85 text-white backdrop-blur-md px-2.5 py-0.5 text-xs font-medium border border-white/20 shadow-xs">
                <span>🛡️ Verified Host</span>
              </span>
            )}

            {isMatched && !event.isNew && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 text-zinc-950 px-2.5 py-0.5 text-xs font-bold shadow-md border border-amber-300">
                <Sparkles className="h-3 w-3 fill-zinc-950" />
                <span>Matched</span>
              </span>
            )}
          </div>
        </div>

        {/* Title overlay on bottom of image */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg font-extrabold tracking-tight text-white leading-snug drop-shadow-md">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
        <div className="space-y-3">
          {/* Host Info */}
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>
              Hosted by <strong className="text-zinc-800">{event.host.name}</strong> ({event.host.handle})
            </span>
          </div>

          {/* Location & Time */}
          <div className="space-y-1.5 text-xs text-zinc-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-zinc-400 shrink-0" />
              <span className="font-medium text-zinc-800">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-zinc-400 shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-zinc-400 shrink-0" />
              <span className="font-semibold text-zinc-900">
                {spotsCount} / {event.maxSpots} spots filled
              </span>
            </div>
          </div>

          {/* Optional What to bring */}
          {event.whatToBring && (
            <div className="rounded-2xl bg-zinc-50 border border-zinc-200/80 p-2.5 text-xs text-zinc-700">
              <strong className="font-semibold text-zinc-900">🎒 What to bring: </strong>
              <span>{event.whatToBring}</span>
            </div>
          )}

          {/* Tags Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {event.tags.map((tag) => {
              const isUserHobby = userInterests.includes(tag);
              return (
                <span
                  key={tag}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
                    isUserHobby
                      ? "bg-zinc-950 text-white font-semibold shadow-2xs"
                      : "bg-zinc-100 text-zinc-600 border border-zinc-200/60"
                  }`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Action Button & Expandable Tray */}
        <div className="pt-3 border-t border-zinc-100 space-y-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleJoinClick}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm py-2.5 px-5 transition-all duration-200 shadow-xs active:scale-95 cursor-pointer ${
                isJoined
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-zinc-950 hover:bg-zinc-800 text-white"
              }`}
            >
              {isJoined ? (
                <>
                  <Check className="h-4 w-4 stroke-[3]" />
                  <span>Joined! ✓</span>
                </>
              ) : (
                <span>Join Small Group</span>
              )}
            </button>

            <button
              onClick={() => setShowAttendees(!showAttendees)}
              className="rounded-full border border-zinc-200 p-2.5 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
              title="Toggle Attendee Chat Handles"
            >
              {showAttendees || isJoined ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Expandable Connect Tray (Shows if Joined or Toggled) */}
          {(isJoined || showAttendees) && (
            <div className="rounded-2xl bg-zinc-950 text-white p-4 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <MessageCircle className="h-4 w-4" />
                <span>💬 Connect before meeting</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Say hi on Instagram to coordinate what to bring!
              </p>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
                  Group Handles ({attendeesList.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {attendeesList.map((handle, idx) => (
                    <span
                      key={idx}
                      className={`rounded-full px-2.5 py-1 text-xs font-mono font-medium ${
                        handle === (userInstagramHandle || "@you")
                          ? "bg-amber-400 text-zinc-950 font-bold"
                          : "bg-white/15 text-zinc-200"
                      }`}
                    >
                      {handle}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
