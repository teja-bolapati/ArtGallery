export interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  year: number;
  medium: string;
  dimensions: string;
  price: number;
  image: string;
  description: string;
  culturalHistory: string;
  period: string;
  origin: string;
  significance: string;
  status: 'available' | 'sold' | 'reserved';
  views: number;
  likes: number;
  exhibition?: string;
}

export const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Celestial Dreams',
    artist: 'Maya Chen',
    artistId: 'artist1',
    year: 2024,
    medium: 'Oil on Canvas',
    dimensions: '120 x 90 cm',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1681235014294-588fea095706?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc2NDE3MzAyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A mesmerizing exploration of cosmic wonder through vibrant colors and ethereal forms.',
    culturalHistory: 'This piece draws inspiration from ancient Chinese astronomical charts and modern space exploration imagery, bridging millennia of human curiosity about the cosmos.',
    period: 'Contemporary',
    origin: 'Beijing, China',
    significance: 'Represents the intersection of traditional Eastern philosophy and contemporary scientific understanding of the universe.',
    status: 'available',
    views: 1247,
    likes: 342,
    exhibition: 'Modern Masters 2024'
  },
  {
    id: '2',
    title: 'Urban Rhythms',
    artist: 'Marcus Johnson',
    artistId: 'artist2',
    year: 2023,
    medium: 'Acrylic on Canvas',
    dimensions: '150 x 100 cm',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1762291495547-718905bf2c70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzY3VscHR1cmUlMjBhcnR8ZW58MXx8fHwxNzY0MDg1MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A dynamic representation of city life through bold geometric patterns and vibrant color blocks.',
    culturalHistory: 'Influenced by the Harlem Renaissance and Jazz Age aesthetics, this work captures the pulse of urban African American culture and its enduring impact on modern art.',
    period: 'Contemporary',
    origin: 'New York, USA',
    significance: 'Celebrates the cultural vitality of urban communities and the artistic legacy of the African American experience.',
    status: 'available',
    views: 2156,
    likes: 589,
    exhibition: 'Urban Visions'
  },
  {
    id: '3',
    title: 'Sahara Sunset',
    artist: 'Amara Diallo',
    artistId: 'artist3',
    year: 2024,
    medium: 'Mixed Media',
    dimensions: '100 x 100 cm',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1758426637758-d332a20c495d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBwb3J0cmFpdCUyMHBhaW50aW5nfGVufDF8fHx8MTc2NDA4MDg0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A stunning portrayal of the Sahara landscape at dusk, using traditional pigments and contemporary techniques.',
    culturalHistory: 'Created using natural pigments sourced from Saharan earth, following techniques passed down through generations of West African artists. The work embodies the connection between land and artistic expression.',
    period: 'Contemporary',
    origin: 'Dakar, Senegal',
    significance: 'Preserves traditional African art-making techniques while addressing contemporary themes of climate and cultural heritage.',
    status: 'sold',
    views: 3421,
    likes: 892,
    exhibition: 'African Heritage Today'
  },
  {
    id: '4',
    title: 'Digital Lotus',
    artist: 'Yuki Tanaka',
    artistId: 'artist4',
    year: 2024,
    medium: 'Digital Print on Aluminum',
    dimensions: '80 x 120 cm',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1703869311033-9cb56c1bc7ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGNhbnZhcyUyMGFydHxlbnwxfHx8fDE3NjQxNzMwMjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A fusion of traditional Japanese aesthetics with cutting-edge digital art technology.',
    culturalHistory: 'The lotus flower has been a central symbol in Asian art for over 2000 years, representing purity and enlightenment. This digital interpretation maintains those values while exploring new media.',
    period: 'Contemporary',
    origin: 'Tokyo, Japan',
    significance: 'Demonstrates how ancient cultural symbols can be reinterpreted through modern technology while maintaining their spiritual essence.',
    status: 'available',
    views: 1876,
    likes: 445,
    exhibition: 'East Meets Digital'
  },
  {
    id: '5',
    title: 'Mediterranean Memory',
    artist: 'Sofia Rodriguez',
    artistId: 'artist5',
    year: 2023,
    medium: 'Watercolor on Paper',
    dimensions: '70 x 50 cm',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1618411624931-e2a2fba5a826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcnR3b3JrJTIwZGlzcGxheXxlbnwxfHx8fDE3NjQxNzMwMjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Delicate watercolor capturing the essence of coastal Mediterranean life and architecture.',
    culturalHistory: 'Inspired by the rich tradition of Spanish watercolor painting and the architectural heritage of Andalusian villages, this piece reflects centuries of cultural exchange along the Mediterranean.',
    period: 'Contemporary',
    origin: 'Barcelona, Spain',
    significance: 'Preserves the visual language of Mediterranean culture while bringing a fresh contemporary perspective.',
    status: 'available',
    views: 1543,
    likes: 367,
    exhibition: 'Coastal Reflections'
  },
  {
    id: '6',
    title: 'Northern Lights',
    artist: 'Lars Andersen',
    artistId: 'artist6',
    year: 2024,
    medium: 'Oil on Canvas',
    dimensions: '140 x 100 cm',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1573560354513-d68d229fdd34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwYXJ0JTIwcGFpbnRpbmd8ZW58MXx8fHwxNzY0MTczMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A spectacular rendering of the Aurora Borealis over the Nordic landscape.',
    culturalHistory: 'The Northern Lights have been central to Sami and Nordic mythology for thousands of years. This work incorporates traditional Norse artistic elements with modern impressionistic techniques.',
    period: 'Contemporary',
    origin: 'Oslo, Norway',
    significance: 'Connects ancient Nordic spiritual traditions with contemporary environmental consciousness.',
    status: 'reserved',
    views: 2987,
    likes: 756,
    exhibition: 'Nordic Nature'
  },
  {
    id: '7',
    title: 'Indigenous Patterns',
    artist: 'Kai Māori',
    artistId: 'artist7',
    year: 2024,
    medium: 'Acrylic and Natural Fibers',
    dimensions: '110 x 110 cm',
    price: 19500,
    image: 'https://images.unsplash.com/photo-1740902299602-9b6a1be54586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMG11cmFsJTIwd2FsbHxlbnwxfHx8fDE3NjQxNzMwMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Traditional Māori patterns reimagined through contemporary abstract composition.',
    culturalHistory: 'Māori patterns (kōwhaiwhai) have been used for centuries to tell stories and represent genealogy. This work maintains those storytelling traditions while exploring new artistic expressions.',
    period: 'Contemporary',
    origin: 'Auckland, New Zealand',
    significance: 'Vital contribution to the preservation and evolution of indigenous Pacific art forms.',
    status: 'available',
    views: 2234,
    likes: 612,
    exhibition: 'Pacific Voices'
  },
  {
    id: '8',
    title: 'Silk Road Journey',
    artist: 'Amir Hassan',
    artistId: 'artist8',
    year: 2023,
    medium: 'Mixed Media with Gold Leaf',
    dimensions: '130 x 95 cm',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1695154207190-64df5b9c1e6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBhcnR8ZW58MXx8fHwxNzY0MTY3NzczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'An opulent piece celebrating the historical trade routes connecting East and West.',
    culturalHistory: 'Incorporates traditional Persian miniature painting techniques with contemporary materials. The use of gold leaf references the Islamic Golden Age and the wealth of knowledge exchanged along the Silk Road.',
    period: 'Contemporary',
    origin: 'Istanbul, Turkey',
    significance: 'Represents cultural exchange and the enduring legacy of cross-cultural dialogue.',
    status: 'available',
    views: 3156,
    likes: 823,
    exhibition: 'Cultural Crossroads'
  },
  {
    id: '9',
    title: 'Eternal Bloom',
    artist: 'Maya Chen',
    artistId: 'artist1',
    year: 2024,
    medium: 'Oil on Canvas',
    dimensions: '100 x 80 cm',
    price: 14500,
    image: 'https://images.unsplash.com/photo-1719935115623-4857df23f3c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxsZXJ5JTIwZXhoaWJpdGlvbiUyMGFydHxlbnwxfHx8fDE3NjQxNzMwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A celebration of nature\'s resilience through intricate floral patterns and rich textures.',
    culturalHistory: 'Drawing from centuries of Chinese botanical illustration, this work merges traditional flower painting with contemporary environmental themes.',
    period: 'Contemporary',
    origin: 'Beijing, China',
    significance: 'Addresses the relationship between humanity and nature in the age of climate change.',
    status: 'available',
    views: 1892,
    likes: 478,
    exhibition: 'Modern Masters 2024'
  },
  {
    id: '10',
    title: 'Abstract Thoughts',
    artist: 'Marcus Johnson',
    artistId: 'artist2',
    year: 2024,
    medium: 'Acrylic on Canvas',
    dimensions: '130 x 100 cm',
    price: 19000,
    image: 'https://images.unsplash.com/photo-1644109097896-15e89806c340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwZGlzcGxheXxlbnwxfHx8fDE3NjQxMDc5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'An exploration of consciousness and perception through abstract forms and bold color choices.',
    culturalHistory: 'Influenced by the abstract expressionist movement and African American spiritual traditions, blending inner experience with visual expression.',
    period: 'Contemporary',
    origin: 'New York, USA',
    significance: 'Continues the legacy of abstract art while incorporating diverse cultural perspectives.',
    status: 'available',
    views: 2543,
    likes: 634,
    exhibition: 'Urban Visions'
  }
];