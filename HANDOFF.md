# Project Handoff: Likely - Outdoor Small-Group Meetup Platform

## Executive Summary
**Likely** is a modern, intimate outdoor activity matching platform designed for small-group meetups (4–8 people max). It connects users based on social media vibes, interest matching, verified community host curation, and past circle memory journals.

---

## 🛠️ Technical Stack
- **Framework**: Next.js 16.2.11 (App Router, Webpack build)
- **Library**: React 19, TypeScript
- **Styling**: Tailwind CSS, Palatino Linotype serif typography stack
- **Icons**: Lucide React (`lucide-react`)
- **State Management**: React `useState` / `useMemo` with client-side `localStorage` persistence

---

## 📁 Key File Structure & Responsibilities

```text
├── app/
│   ├── layout.tsx                # Root layout & font configuration
│   └── page.tsx                  # Main entry page, tab state, hero section, feeds & curation bar
├── components/
│   ├── Navbar.tsx                # Sticky top navigation (Logo, Discover, Host, Memories, Profile chip)
│   ├── ConnectProfileModal.tsx   # 2-Step Instagram onboarding & vibe extraction modal
│   ├── SignUpModal.tsx           # Wrapper for ConnectProfileModal
│   ├── HostEventModal.tsx        # Event creation modal (4–8 capacity, category selector, bring list)
│   ├── EventCard.tsx             # Interactive event card (Match badge, capacity meter, verified host)
│   └── PastMemoriesView.tsx      # Past circle memory gallery journal & photo lightbox modal
├── data/
│   ├── events.ts                 # 14 default active public events + EventItem interface
│   └── memories.ts               # Typed memory records for @nehalbaid (mem-hw, mem-mysore)
└── public/
    ├── events/                   # Event cover thumbnails
    └── memories/
        ├── hw/                   # Café homework study sprint photos (DSC03948.jpg – DSC03967.jpg)
        └── mysore/               # Mysore day trip photos (DSC03393.jpg – DSC03557.jpg)
```

---

## 🔑 Session & Routing Rules

1. **Clean Guest Landing Page by Default**:
   - `activeTab` is initialized to `"hero"` in `app/page.tsx`.
   - Opening `http://localhost:3000` **always** opens the clean Likely hero landing page first (Palatino title header, floating polaroid vignettes, and feature cards).

2. **Unauthenticated Session State**:
   - `currentUser` and `userProfile` initialize strictly to `null`.
   - When unauthenticated, the top navigation displays **`Connect Profile`** (no hardcoded user name anywhere).
   - Past memories banner displays guest headers without hardcoded fallbacks to Nehal.

3. **Onboarding & Profile Sync**:
   - Clicking **Connect Profile** opens the 2-step Instagram vibe modal.
   - Upon completion (`handleSignUpComplete`), `userProfile` is stored in `localStorage` under key `"likely_user_profile"` and the navbar updates to display `@handle`.

---

## 📸 Image Assets & Memory Configuration

- **Spaceless Filenames**: All memory photo files use clean, web-safe filenames without spaces (`DSC03948.jpg`, `hw-1.jpg`, `DSC03393.jpg`, `mysore-1.jpg`).
- **Cache-Busting Query Strings**: `data/memories.ts` appends `?v=3` cache-busting parameters to all photo URLs to prevent stale browser HTTP caching.
- **Hero Vignettes Integration**: The 8 floating polaroid cards flanking the hero title on `app/page.tsx` showcase actual photos from `/public/memories/hw/` and `/public/memories/mysore/`.

---

## 🚀 Dev & Build Commands

```bash
# Start local development server (localhost:3000)
npm run dev

# Production build verification
npm run build
```

---

## 📋 Open Tasks & Future Roadmap
1. Connect backend API / Database (PostgreSQL/Supabase) for persistent event submission.
2. Enable real-time Instagram Graph API OAuth integration.
3. Add DM/RSVP confirmation flow for host-attendee chat groups.
