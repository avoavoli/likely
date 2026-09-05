export interface EventItem {
  id: string;
  title: string;
  category: "Creative" | "Active" | "Social";
  image: string;
  location: string;
  date: string;
  maxSpots: number;
  currentSpots: number;
  tags: string[];
  host: {
    name: string;
    handle: string;
  };
  attendees: string[];
  isNew?: boolean;
  isVerifiedHost?: boolean;
  whatToBring?: string;
  isPending?: boolean;
}

export const EVENTS_DATA: EventItem[] = [
  {
    id: "beach-painting",
    title: "Sunset Beach Canvas & Watercolor Painting",
    category: "Creative",
    image: "/events/beach-painting.jpg",
    location: "South Beach Shoreline Park",
    date: "Tomorrow, 5:30 PM",
    maxSpots: 6,
    currentSpots: 4,
    tags: ["🎨 Outdoor Sketching & Painting", "🌿 Botanical Garden Picnics"],
    host: {
      name: "Elena V.",
      handle: "@elena.paints",
    },
    attendees: ["@maya.lens", "@arjun_visuals", "@chloe_creates"],
    isVerifiedHost: true,
  },
  {
    id: "card-games",
    title: "Lawn Board Games & Strategy Card Clash",
    category: "Social",
    image: "/events/card-games.jpg",
    location: "Washington Square Park Gazebo",
    date: "Saturday, 2:00 PM",
    maxSpots: 8,
    currentSpots: 5,
    tags: ["🎲 Board Games in the Lawn", "☕ Specialty Coffee Crawls"],
    host: {
      name: "Marcus T.",
      handle: "@marcus.plays",
    },
    attendees: ["@alex.cards", "@sam_boardgames", "@deck_master"],
    isVerifiedHost: true,
  },
  {
    id: "casual-chalk-art",
    title: "Sidewalk Chalk Art & Street Doodle Festival",
    category: "Creative",
    image: "/events/casual-chalk-art.jpg",
    location: "Riverfront Promenade Walkway",
    date: "Sunday, 11:00 AM",
    maxSpots: 8,
    currentSpots: 3,
    tags: ["🎨 Outdoor Sketching & Painting", "🏺 Clay Pottery & Craft Pop-ups"],
    host: {
      name: "Nia K.",
      handle: "@nia_streetart",
    },
    attendees: ["@doodle_dan", "@art_by_priya"],
  },
  {
    id: "cup-painting",
    title: "Ceramic Cup Painting & Outdoor Cold Brews",
    category: "Creative",
    image: "/events/cup-painting.jpg",
    location: "High Line Park Pergola",
    date: "Saturday, 3:30 PM",
    maxSpots: 6,
    currentSpots: 4,
    tags: ["🏺 Clay Pottery & Craft Pop-ups", "☕ Specialty Coffee Crawls"],
    host: {
      name: "Zoe M.",
      handle: "@zoe_pottery",
    },
    attendees: ["@crafty_leo", "@coffeelover_katie", "@mug_magic"],
    isVerifiedHost: true,
  },
  {
    id: "cute-bedazzling",
    title: "Tote Bag Bedazzling & DIY Gem Crafting",
    category: "Creative",
    image: "/events/cute-bedazzling.jpg",
    location: "Bryant Park Reading Room Lawn",
    date: "Friday, 4:00 PM",
    maxSpots: 6,
    currentSpots: 3,
    tags: ["🏺 Clay Pottery & Craft Pop-ups", "✍️ Creative Writing & Journaling"],
    host: {
      name: "Chloe S.",
      handle: "@chloe_glitter",
    },
    attendees: ["@glam_sam", "@sparkle_jess"],
  },
  {
    id: "cycling",
    title: "Golden Hour City Cycling & Riverside Ride",
    category: "Active",
    image: "/events/cycling.jpg",
    location: "Hudson River Bike Trail",
    date: "Tomorrow, 6:00 PM",
    maxSpots: 10,
    currentSpots: 7,
    tags: ["🚲 City Cycling & Exploration", "🏃 Casual Morning Jogs"],
    host: {
      name: "Rohan P.",
      handle: "@rohan_pedals",
    },
    attendees: ["@biker_ben", "@fast_sarah", "@wheels_mike", "@cycle_pat"],
    isVerifiedHost: true,
  },
  {
    id: "ice-cream-date",
    title: "Artisanal Ice Cream Crawl & Park Hangout",
    category: "Social",
    image: "/events/ice-cream-date.jpg",
    location: "Morningside Park Fountain",
    date: "Saturday, 4:00 PM",
    maxSpots: 8,
    currentSpots: 5,
    tags: ["🥐 Farmers Market & Food Walks", "☕ Specialty Coffee Crawls"],
    host: {
      name: "Hannah B.",
      handle: "@hannah_eats",
    },
    attendees: ["@scoop_master", "@sweet_tooth_todd", "@gelato_guru"],
  },
  {
    id: "jamming",
    title: "Sunset Acoustic Jamming & Vocal Circle",
    category: "Creative",
    image: "/events/jamming.jpg",
    location: "Prospect Park Concert Meadow",
    date: "Sunday, 5:00 PM",
    maxSpots: 8,
    currentSpots: 6,
    tags: ["🎸 Sunset Acoustic Jamming", "🌿 Botanical Garden Picnics"],
    host: {
      name: "Leo K.",
      handle: "@leosongwriter",
    },
    attendees: ["@acoustic_dave", "@guitar_guru", "@vibes_lisa", "@harmonica_hall"],
    isVerifiedHost: true,
  },
  {
    id: "monster-can-art",
    title: "Upcycled Can Sculptures & Pop Art Workshop",
    category: "Creative",
    image: "/events/monster-can-art.jpg",
    location: "East River Park Amphitheater",
    date: "Saturday, 1:00 PM",
    maxSpots: 6,
    currentSpots: 2,
    tags: ["🎨 Outdoor Sketching & Painting", "🏺 Clay Pottery & Craft Pop-ups"],
    host: {
      name: "Jax R.",
      handle: "@jax_junkart",
    },
    attendees: ["@recycle_retro"],
  },
  {
    id: "photo-walk",
    title: "35mm Film & Mobile Golden Hour Photo Walk",
    category: "Creative",
    image: "/events/photo-walk.jpg",
    location: "DUMBO Waterfront & Cobblestone Streets",
    date: "Tomorrow, 5:00 PM",
    maxSpots: 6,
    currentSpots: 4,
    tags: ["📸 Film & Mobile Photography", "🚲 City Cycling & Exploration"],
    host: {
      name: "Maya S.",
      handle: "@mayacamera",
    },
    attendees: ["@shutter_steve", "@analog_alice", "@lens_lucas"],
    isVerifiedHost: true,
  },
  {
    id: "pottery-painting",
    title: "Clay Pottery Painting & Garden Picnic",
    category: "Creative",
    image: "/events/pottery-painting.jpg",
    location: "Brooklyn Botanical Garden Lawn",
    date: "Sunday, 2:30 PM",
    maxSpots: 6,
    currentSpots: 3,
    tags: ["🏺 Clay Pottery & Craft Pop-ups", "🌿 Botanical Garden Picnics"],
    host: {
      name: "Zoe M.",
      handle: "@zoe_pottery",
    },
    attendees: ["@pottery_patty", "@clay_master"],
  },
  {
    id: "resin-art",
    title: "Pressed Flower Resin Coasters Workshop",
    category: "Creative",
    image: "/events/resin-art.jpg",
    location: "Madison Square Park Tree Grove",
    date: "Saturday, 11:30 AM",
    maxSpots: 6,
    currentSpots: 4,
    tags: ["🏺 Clay Pottery & Craft Pop-ups", "🌿 Botanical Garden Picnics"],
    host: {
      name: "Flora T.",
      handle: "@flora_designs",
    },
    attendees: ["@resin_remy", "@botanical_bea", "@flower_fanatic"],
  },
  {
    id: "science-homework",
    title: "Outdoor Science Study & Book Swap Readathon",
    category: "Social",
    image: "/events/science-homework.jpg",
    location: "Columbia Campus Low Steps Lawn",
    date: "Friday, 3:00 PM",
    maxSpots: 8,
    currentSpots: 4,
    tags: ["📚 Book Swap & Readathons", "✍️ Creative Writing & Journaling"],
    host: {
      name: "David L.",
      handle: "@david_reads",
    },
    attendees: ["@nerd_nate", "@study_steph", "@sci_guy_greg"],
  },
  {
    id: "volleyball",
    title: "Casual Beach Volleyball & Sunset Chill",
    category: "Active",
    image: "/events/volleyball.jpg",
    location: "Pier 25 Beach Volleyball Courts",
    date: "Saturday, 4:30 PM",
    maxSpots: 8,
    currentSpots: 5,
    tags: ["🏸 Badminton in the Park", "🏃 Casual Morning Jogs"],
    host: {
      name: "Alex M.",
      handle: "@alex_spikes",
    },
    attendees: ["@spike_sam", "@beach_vibe_jon", "@setter_sara"],
  },
];
