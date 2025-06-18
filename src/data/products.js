const products = [
  {
    id: 1,
    name: "Netflix",
    description: "Streaming platform for movies and TV series",
    image: "https://placehold.co/600x400/F4ABC4/333456?text=Netflix",
    category: "streaming",
    variants: [
      { id: 1, name: "1p2u", duration: "1 bulan", price: 20000, stock: 15 },
      { id: 2, name: "1p1u", duration: "1 bulan", price: 25000, stock: 10 },
      { id: 3, name: "Private", duration: "1 bulan", price: 110000, stock: 5 },
    ]
  },
  {
    id: 2,
    name: "Canva",
    description: "Design platform for graphics, presentations, and more",
    image: "https://placehold.co/600x400/595B83/F4ABC4?text=Canva",
    category: "design",
    variants: [
      { id: 4, name: "Invite", duration: "1 bulan", price: 5000, stock: 20 },
      { id: 5, name: "Private", duration: "1 bulan", price: 10000, stock: 15 },
    ]
  },
  {
    id: 3,
    name: "ChatGPT",
    description: "AI-powered chatbot and content generation tool",
    image: "https://placehold.co/600x400/333456/F4ABC4?text=ChatGPT",
    category: "ai",
    variants: [
      { id: 6, name: "Sharing", duration: "1 bulan", price: 50000, stock: 8 },
    ]
  },
  {
    id: 4,
    name: "Spotify",
    description: "Music streaming service",
    image: "https://placehold.co/600x400/060930/F4ABC4?text=Spotify",
    category: "streaming",
    variants: [
      { id: 7, name: "Family", duration: "1 bulan", price: 15000, stock: 12 },
      { id: 8, name: "Individual", duration: "1 bulan", price: 25000, stock: 8 },
    ]
  },
  {
    id: 5,
    name: "Adobe Creative Cloud",
    description: "Suite of design applications",
    image: "https://placehold.co/600x400/F4ABC4/060930?text=Adobe",
    category: "design",
    variants: [
      { id: 9, name: "Photography", duration: "1 bulan", price: 30000, stock: 6 },
      { id: 10, name: "Complete", duration: "1 bulan", price: 75000, stock: 4 },
    ]
  },
  {
    id: 6,
    name: "Midjourney",
    description: "AI image generation tool",
    image: "https://placehold.co/600x400/595B83/F4ABC4?text=Midjourney",
    category: "ai",
    variants: [
      { id: 11, name: "Basic", duration: "1 bulan", price: 45000, stock: 10 },
      { id: 12, name: "Standard", duration: "1 bulan", price: 65000, stock: 7 },
    ]
  },
];

export default products; 