import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with conditional logic
 * @param  {...string} inputs - Class names to merge
 * @returns {string} - Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @returns {string} - Formatted price with currency symbol
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(price);
}

export const products = [
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

export const categories = [
  { id: 1, name: "Streaming", slug: "streaming", icon: "PiTelevisionSimpleBold" },
  { id: 2, name: "Design", slug: "design", icon: "PiPaintBrushBold" },
  { id: 3, name: "AI Tools", slug: "ai", icon: "PiRobotBold" },
];

export const testimonials = [
  {
    id: 1,
    name: "Andi Pratama",
    avatar: "https://placehold.co/100/F4ABC4/333456?text=AP",
    text: "Akun Netflix-nya lancar jaya! Sudah 3 bulan pakai dan nggak ada masalah sama sekali.",
    rating: 5,
    product: "Netflix Private"
  },
  {
    id: 2,
    name: "Budi Santoso",
    avatar: "https://placehold.co/100/595B83/F4ABC4?text=BS",
    text: "Awalnya ragu beli Canva Premium, tapi ternyata worth it banget. Harga murah dan responsive admin-nya.",
    rating: 5,
    product: "Canva Private"
  },
  {
    id: 3,
    name: "Citra Dewi",
    avatar: "https://placehold.co/100/333456/F4ABC4?text=CD",
    text: "ChatGPT Plus membantu banget buat skripsi, cepat prosesnya dan admin ramah.",
    rating: 4,
    product: "ChatGPT Sharing"
  },
];

export const faqs = [
  {
    id: 1,
    question: "Apakah akun yang dijual legal?",
    answer: "Ya, semua akun yang kami jual adalah akun yang dibeli secara resmi dan legal. Kami hanya menjual akun dengan model sharing atau invite untuk menghemat biaya bagi pelanggan."
  },
  {
    id: 2,
    question: "Berapa lama proses pengiriman akun setelah pembayaran?",
    answer: "Proses pengiriman akun biasanya dilakukan dalam waktu 5-30 menit setelah pembayaran berhasil dikonfirmasi, tergantung antrian dan jam operasional kami (09.00 - 21.00 WIB)."
  },
  {
    id: 3,
    question: "Apa yang dimaksud dengan akun 1p2u, 1p1u, dan Private?",
    answer: "1p2u artinya 1 profile 2 user (shared), 1p1u artinya 1 profile 1 user, sedangkan Private artinya akun yang sepenuhnya menjadi milik Anda tanpa sharing dengan pengguna lain."
  },
  {
    id: 4,
    question: "Bagaimana jika akun bermasalah selama masa berlaku?",
    answer: "Kami memberikan garansi full replace untuk semua akun selama masa berlaku. Jika terjadi masalah, silakan hubungi admin kami melalui WhatsApp untuk mendapatkan penggantian."
  },
  {
    id: 5,
    question: "Apakah bisa perpanjang akun yang sudah dibeli?",
    answer: "Tentu saja bisa. Kami menyediakan layanan perpanjangan untuk semua jenis akun dengan harga yang sama seperti pembelian awal."
  },
];

export const carouselItems = [
  {
    id: 1,
    title: "Premium Apps, Affordable Price",
    description: "Get access to premium applications at a fraction of the original price",
    image: "https://placehold.co/1200x500/595B83/F4ABC4?text=Premium+Apps",
    buttonText: "Explore Now",
    buttonLink: "#products"
  },
  {
    id: 2,
    title: "Netflix, Canva, and AI Tools",
    description: "All your favorite premium applications in one place",
    image: "https://placehold.co/1200x500/333456/F4ABC4?text=Popular+Apps",
    buttonText: "See Collections",
    buttonLink: "#categories"
  },
  {
    id: 3,
    title: "Lifetime Support & Guarantee",
    description: "Full replacement guarantee for all accounts during validity period",
    image: "https://placehold.co/1200x500/060930/F4ABC4?text=Support+%26+Guarantee",
    buttonText: "Learn More",
    buttonLink: "#faq"
  }
];

/**
 * Truncate text to a specific length
 * @param {string} text - The text to truncate
 * @param {number} length - The maximum length
 * @returns {string} - Truncated text with ellipsis if needed
 */
export const truncateText = (text, length = 100) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

/**
 * Format date to a readable string
 * @param {string|Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Generate a random ID
 * @param {number} length - The length of the ID
 * @returns {string} - Random ID
 */
export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, length + 2);
};

/**
 * Delay execution for a specific time
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} - Promise that resolves after the delay
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); 