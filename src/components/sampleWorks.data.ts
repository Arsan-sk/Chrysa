export type SampleWorkStatus = 'built' | 'sample' | 'concept' | 'prototype'

export type SampleWork = {
  id: string
  title: string
  category: string
  description: string
  image: string
  href?: string
  status: SampleWorkStatus
  accentColor?: string
  stats?: string
}

export const sampleWorks: SampleWork[] = [
  {
    id: 'resin-art',
    title: 'Zainny Resin Art',
    category: 'Art Gallery / AI Marketing',
    description: 'Bespoke resin artworks presented through high-resolution spatial gallery curation with automated AI inquiry routing.',
    image: '/work/resin-art.png',
    href: 'http://resin-art-theta.vercel.app/',
    status: 'built',
    accentColor: '#d4af37',
    stats: '100% Custom Gallery',
  },
  {
    id: 'wedding-hall',
    title: 'Wedding Hall',
    category: 'Hospitality / Portfolio',
    description: 'Luxury venue portfolio with interactive floorplans, visual tours, booking calendar synchronization, and quote generation.',
    image: '/work/wedding-hall.png',
    href: 'https://wedding-hall-venue.vercel.app/',
    status: 'built',
    accentColor: '#c99677',
    stats: 'Real-time Booking Engine',
  },
  {
    id: 'sample-dhaba',
    title: 'Sample Dhaba',
    category: 'Restaurant Experience',
    description: 'Modern dining menu system with instant digital ordering, allergen filtering, live kitchen sync, and table QR routing.',
    image: '/work/sample-dhaba.png',
    href: 'https://sampledhaba.vercel.app/',
    status: 'built',
    accentColor: '#e84d37',
    stats: 'Dynamic Table Sync',
  },
  {
    id: 'kohinoor',
    title: 'Kohinoor',
    category: 'Warehouse / Product Management',
    description: 'Inventory control and stock velocity dashboard with automated reorder triggers, dispatch tracking, and ledger feeds.',
    image: '/work/kohinoor.png',
    href: 'https://kohinoooooor.vercel.app/',
    status: 'built',
    accentColor: '#3b82f6',
    stats: 'Live Ledger & Stock Tracking',
  },
  {
    id: 'gift-shop-ai',
    title: 'AI Marketing Gift Shop',
    category: 'AI / Marketing Automation',
    description: 'Personalized gift recommendation engine driven by semantic search, visual personalization, and automated social campaigns.',
    image: '/work/gift-shop-ai.webp',
    status: 'sample',
    accentColor: '#10b981',
    stats: 'Autonomous Personalization',
  },
]
