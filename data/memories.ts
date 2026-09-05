export interface PastMemory {
  id: string;
  title: string;
  date: string;
  location: string;
  summary: string;
  vibe: string;
  photos: string[];
  attendees: { name: string; handle: string }[];
}

export const USER_MEMORIES: Record<string, PastMemory[]> = {
  '@nehalbaid': [
    {
      id: 'mem-hw',
      title: 'Study Sprint & Homework at a Quiet Café',
      date: 'Aug 24, 2026',
      location: 'Roastery Coffee House',
      summary: 'Deep-focus 90-minute study sprint followed by artisan cold brews and note sharing.',
      vibe: '☕ Productive & Chill',
      photos: [
        '/memories/hw/DSC03948.jpg?v=5',
        '/memories/hw/DSC03953 copy.JPG?v=5',
        '/memories/hw/DSC03956 copy.JPG?v=5',
        '/memories/hw/DSC03959 copy.JPG?v=5',
        '/memories/hw/DSC03967.jpg?v=5',
      ],
      attendees: [
        { name: 'Nehal', handle: '@nehalbaid' },
        { name: 'Divyansh', handle: '@divyansh' },
      ],
    },
    {
      id: 'mem-mysore',
      title: 'Weekend Day Trip & Heritage Walk to Mysore',
      date: 'Aug 10, 2026',
      location: 'Mysore Heritage Route & Palace Grounds',
      summary: 'Early morning drive, authentic Mysore Pak tasting, and exploring palace corridors.',
      vibe: '🏰 Heritage & Road Trip',
      photos: [
        '/memories/mysore/DSC03393.jpg?v=5',
        '/memories/mysore/DSC03427.jpg?v=5',
        '/memories/mysore/DSC03522 copy.JPG?v=5',
        '/memories/mysore/mysore-4.jpg?v=5',
        '/memories/mysore/mysore-5.jpg?v=5',
      ],
      attendees: [
        { name: 'Nehal', handle: '@nehalbaid' },
        { name: 'Divyansh', handle: '@divyansh' },
        { name: 'Ardhya', handle: '@ardhya' },
        { name: 'Hrshita', handle: '@hrshita' },
      ],
    },
  ],
};
