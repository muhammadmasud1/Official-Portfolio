
import { NavLink, Course, Book, Article, Testimonial } from './types';

export const COLORS = {
  primary: '#C1121F',
  secondary: '#000000',
  white: '#FFFFFF',
  accent: '#D4AF37',
};

export const PAYMENT_INFO = {
  bKash: '01788060657',
  Nagad: '01788060657',
  Rocket: '017880606578',
};

export const NAV_LINKS: NavLink[] = [
  { path: '/', label: { EN: 'Home', BN: 'হোম' } },
  { path: '/about', label: { EN: 'About', BN: 'সম্পর্কে' } },
  { path: '/courses', label: { EN: 'Courses', BN: 'কোর্সসমূহ' } },
  { path: '/learn', label: { EN: 'Learn', BN: 'শিখুন' } },
  { path: '/store', label: { EN: 'Books', BN: 'বইসমূহ' } },
  { path: '/interpreter', label: { EN: 'Interpretation', BN: 'অনুবাদ সেবা' } },
  { path: '/blog', label: { EN: 'Blog', BN: 'ব্লগ' } },
  { path: '/contact', label: { EN: 'Contact', BN: 'যোগাযোগ' } },
];

export const COURSES: Course[] = [
  {
    id: 'hsk-1',
    title: { EN: 'HSK 1: Standard Course', BN: 'HSK ১: স্ট্যান্ডার্ড কোর্স' },
    level: 'Beginner',
    duration: '2 Months',
    price: '৳ 1,500',
    description: { 
      EN: 'The perfect start for beginners. Learn 150 core words and basic sentence structures.', 
      BN: 'নতুনদের জন্য আদর্শ শুরু। ১৫০টি মূল শব্দ এবং মৌলিক বাক্য গঠন শিখুন।' 
    },
    image: 'https://i.ibb.co.com/8D0rSH2P/hsk1-dfa.png',
    status: 'published'
  },
  {
    id: 'hsk-2',
    title: { EN: 'HSK 2: Standard Course', BN: 'HSK ২: স্ট্যান্ডার্ড কোর্স' },
    level: 'Elementary',
    duration: '2.5 Months',
    price: '৳ 1,500',
    description: { 
      EN: 'Expand your reach. Master 300 words and handle simple daily life conversations.', 
      BN: 'আপনার দক্ষতা বাড়ান। ৩০০ শব্দ আয়ত্ত করুন এবং দৈনন্দিন কথোপকথন শিখুন।' 
    },
    image: 'https://i.ibb.co.com/C31zcwj6/Untitled-design-1.png',
    status: 'published'
  },
  {
    id: 'hsk-3',
    title: { EN: 'HSK 3: Standard Course', BN: 'HSK ৩: স্ট্যান্ডার্ড কোর্স' },
    level: 'Intermediate',
    duration: '3 Months',
    price: '৳ 2,000',
    description: { 
      EN: 'Achieve fluency. Master 600 words and communicate on a wide range of topics.', 
      BN: 'সাবলীলতা অর্জন করুন। ৬০০ শব্দ আয়ত্ত করুন এবং বিভিন্ন বিষয়ে কথা বলা শিখুন।' 
    },
    image: 'https://i.ibb.co.com/jPh31741/HSK-3-Master-Course-2026.png',
    status: 'published'
  },
  {
    id: 'hsk-4',
    title: { EN: 'HSK 4: Standard Course', BN: 'HSK ৪: স্ট্যান্ডার্ড কোর্স' },
    level: 'Upper-Intermediate',
    duration: '4 Months',
    price: '৳ 3,000',
    description: { 
      EN: 'Professional proficiency. Master 1200 words and discuss complex themes fluently.', 
      BN: 'পেশাদার দক্ষতা। ১২০০ শব্দ আয়ত্ত করুন এবং জটিল বিষয়ে সাবলীলভাবে আলোচনা করুন।' 
    },
    image: 'https://i.ibb.co.com/60LtmvcD/HSK-3-Master-Course-2026380x215.png',
    status: 'published'
  },
  {
    id: 'hsk-full-bundle',
    title: { EN: 'Complete Mastery: HSK 1-4 Bundle', BN: 'ফুল কোর্স: HSK ১ থেকে ৪ বান্ডেল' },
    level: 'Beginner to Advanced',
    duration: '10-12 Months',
    price: '৳ 6,000',
    description: { 
      EN: 'The ultimate path to fluency. Full access to HSK 1, 2, 3, and 4 at a discounted rate.', 
      BN: 'সাবলীল চাইনিজ শেখার সেরা পথ। ডিসকাউন্ট মূল্যে HSK ১, ২, ৩ এবং ৪ এর পূর্ণ এক্সেস।' 
    },
    image: 'https://i.ibb.co.com/MkHS5zCC/rsz-1chatgpt-image-feb-8-2026-12-37-12-am.png',
    status: 'published'
  },
  {
    id: 'spoken-cn',
    title: { EN: 'Intensive Spoken Chinese', BN: 'নিবিড় কথোপকথন চাইনিজ' },
    level: 'All Levels',
    duration: '2 Months',
    price: '৳ 5,000',
    description: { EN: 'Focus purely on fluency and pronunciation for business.', BN: 'ব্যবসা এবং যোগাযোগের জন্য সাবলীল উচ্চারণ শিখুন।' },
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800',
    status: 'published'
  },
];

export const BOOKS: Book[] = [
  {
    id: 'book-1',
    title: { EN: 'Bengali to Chinese Master Guide', BN: 'বাংলা থেকে চাইনিজ মাস্টার গাইড' },
    price: '৳ 450',
    image: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?auto=format&fit=crop&q=80&w=800',
    description: { EN: 'The ultimate guide for Bengali speakers to learn Chinese grammar.', BN: 'বাঙালিদের জন্য চাইনিজ গ্রামার শিখার শ্রেষ্ঠ গাইড।' },
  },
  {
    id: 'book-2',
    title: { EN: 'HSK 1-4 Vocabulary Flashcards', BN: 'HSK ১-৪ ভোকাবুলারি ফ্ল্যাশকার্ডস' },
    price: '৳ 350',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80&w=800',
    description: { EN: 'Comprehensive vocabulary cards with Pinyin and Bengali.', BN: 'পিনইন এবং বাংলাসহ বিস্তারিত শব্দভাণ্ডার কার্ড।' },
  },
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: { EN: 'Why Learning Chinese is Crucial for Bangladeshis', BN: 'বাংলাদেশিদের জন্য চাইনিজ শেখা কেন জরুরি' },
    excerpt: { EN: 'With growing trade, knowing Chinese opens global doors.', BN: 'ক্রমবর্ধমান বাণিজ্যের সাথে, চাইনিজ জানা বিশ্বব্যাপী সুযোগ খুলে দেয়।' },
    content: { EN: 'Detailed article about trade relations...', BN: 'বাংলাদেশ ও চীনের বাণিজ্যিক সম্পর্ক নিয়ে বিস্তারিত আলোচনা...' },
    date: 'Oct 12, 2023',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1528610624838-51846c4f9f6e?auto=format&fit=crop&q=80&w=800',
    type: 'article',
    status: 'published'
  },
  {
    id: 'art-2',
    title: { EN: 'Visual Guide to Hanzi Strokes', BN: 'হ্যানজি স্ট্রোকের ভিজ্যুয়াল গাইড' },
    excerpt: { EN: 'A beautiful visual representation of basic Chinese strokes.', BN: 'বেসিক চাইনিজ স্ট্রোকের একটি সুন্দর ভিজ্যুয়াল উপস্থাপনা।' },
    date: 'Nov 05, 2023',
    category: 'Learning Tips',
    image: 'https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?auto=format&fit=crop&q=80&w=800',
    type: 'image',
    status: 'published'
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Rahat Islam',
    role: 'Business Consultant',
    content: { EN: 'His interpretation skills helped our company close a major deal in Shenzhen.', BN: 'তার অনুবাদ দক্ষতা আমাদের কোম্পানিকে শেনজেনে একটি বড় চুক্তি সম্পন্ন করতে সাহায্য করেছে।' },
    avatar: 'https://i.pravatar.cc/150?u=rahat',
  },
  {
    name: 'Sumaiya Akhter',
    role: 'HSK 3 Student',
    content: { EN: 'The best Chinese teacher in Bangladesh. The lessons are so intuitive!', BN: 'বাংলাদেশের সেরা চাইনিজ শিক্ষক। তার পাঠদান অত্যন্ত সহজবোধ্য!' },
    avatar: 'https://i.pravatar.cc/150?u=sumaiya',
  },
];