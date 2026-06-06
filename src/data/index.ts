import type { Service, Testimonial, BlogPost, GalleryItem, FAQItem } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'home-automation',
    title: 'Home Automation',
    description: 'Transform your home into an intelligent living space with complete automation of lights, AC, fans, curtains, and more — controlled via voice or app.',
    icon: '🏠',
    features: ['Voice Control', 'App Control', 'Scene Automation', 'Energy Monitoring'],
    price: 'Starting ₹45,000',
  },
  {
    id: 'cctv',
    title: 'CCTV Systems',
    description: 'Advanced 4K surveillance systems with AI-powered detection, night vision, remote monitoring, and cloud storage for complete home security.',
    icon: '📹',
    features: ['4K Resolution', 'AI Detection', 'Night Vision', 'Remote Access'],
    price: 'Starting ₹12,000',
  },
  {
    id: 'home-theater',
    title: 'Home Theater',
    description: 'Cinema-grade home theater systems with Dolby Atmos surround sound, 4K projectors, and premium seating for the ultimate entertainment experience.',
    icon: '🎬',
    features: ['Dolby Atmos', '4K Projectors', 'Custom Acoustics', 'Smart Integration'],
    price: 'Starting ₹85,000',
  },
  {
    id: 'smart-lighting',
    title: 'Smart Lighting',
    description: 'Intelligent lighting solutions with tunable white, RGB color, automated schedules, and energy-saving features that adapt to your lifestyle.',
    icon: '💡',
    features: ['RGB Tunable', 'Auto Schedules', 'Energy Saving', 'Mood Scenes'],
    price: 'Starting ₹8,000',
  },
  {
    id: 'smart-security',
    title: 'Smart Security',
    description: 'Comprehensive security with smart door locks, video door phones, solar fencing, and remote gates for ultimate peace of mind.',
    icon: '🔐',
    features: ['Smart Locks', 'Video Doorbell', 'Remote Gates', 'Solar Fencing'],
    price: 'Starting ₹15,000',
  },
  {
    id: 'audio-solutions',
    title: 'Audio Solutions',
    description: 'Premium multi-room audio systems with wireless speakers, outdoor audio, and professional-grade sound for every room in your home.',
    icon: '🎵',
    features: ['Multi-Room Audio', 'Wireless Speakers', 'Outdoor Audio', 'Hi-Fi Quality'],
    price: 'Starting ₹25,000',
  },
  {
    id: 'projectors',
    title: 'Projectors',
    description: 'Ultra-short throw and laser projectors with 4K resolution, HDR support, and seamless smart home integration for business and home.',
    icon: '📽️',
    features: ['4K Laser', 'Ultra Short Throw', 'HDR Support', 'Smart Control'],
    price: 'Starting ₹35,000',
  },
  {
    id: 'solar-fencing',
    title: 'Solar Fencing',
    description: 'Eco-friendly solar-powered electric fencing systems for perimeter security with alarm integration and remote monitoring capabilities.',
    icon: '⚡',
    features: ['Solar Powered', 'Perimeter Alert', 'Remote Monitor', 'Alarm Integration'],
    price: 'Starting ₹20,000',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    location: 'Guntur, AP',
    rating: 5,
    text: 'ABHEE transformed our home completely. The smart automation is seamless — lights, AC, and security all work perfectly together. The installation team was professional and the after-sales support is excellent.',
    service: 'Home Automation',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Vijayawada, AP',
    rating: 5,
    text: 'The home theater system ABHEE installed is beyond amazing. It literally feels like being in a cinema hall. The surround sound and 4K projection quality is absolutely stunning. Worth every rupee!',
    service: 'Home Theater',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  },
  {
    id: '3',
    name: 'Venkat Reddy',
    location: 'Guntur, AP',
    rating: 5,
    text: 'Highly professional team. The CCTV installation covers every angle of my property. The remote access app works flawlessly and the AI detection has already caught a suspicious incident.',
    service: 'CCTV Systems',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Venkat',
  },
  {
    id: '4',
    name: 'Lakshmi Devi',
    location: 'Tenali, AP',
    rating: 5,
    text: 'The smart lighting system has made such a difference in our home\'s ambiance. The automated scenes for morning, evening, and night are perfect. Our energy bill has reduced by 35%!',
    service: 'Smart Lighting',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshmi',
  },
  {
    id: '5',
    name: 'Srinivas Rao',
    location: 'Narasaraopet, AP',
    rating: 5,
    text: 'Excellent service from start to finish. The video door phone and smart lock integration is fantastic. I can see and control my door from anywhere in the world. Truly smart security!',
    service: 'Smart Security',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Srinivas',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Complete Guide to Smart Home Automation in Guntur',
    excerpt: 'Everything you need to know about setting up a fully automated home in Andhra Pradesh, from basic lighting control to advanced AI-powered systems.',
    category: 'Automation',
    date: 'March 15, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    id: '2',
    title: 'Top 5 CCTV Cameras for Home Security in 2024',
    excerpt: 'We review the best 4K security cameras with AI features, comparing performance, price, and ease of installation for Indian homes.',
    category: 'Security',
    date: 'March 10, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
  },
  {
    id: '3',
    title: 'Build the Perfect Home Theater Under ₹2 Lakhs',
    excerpt: 'Step-by-step guide to creating a stunning home theater experience with projectors, Dolby sound, and smart controls on a budget.',
    category: 'Home Theater',
    date: 'March 5, 2024',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Modern Villa Automation',
    category: 'Home Automation',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: '4BHK luxury villa with complete automation',
  },
  {
    id: '2',
    title: 'Premium Home Theater',
    category: 'Home Theater',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
    description: '12-seater Dolby Atmos home cinema',
  },
  {
    id: '3',
    title: 'Commercial CCTV Setup',
    category: 'CCTV',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
    description: '64-camera 4K surveillance system',
  },
  {
    id: '4',
    title: 'Ambient Smart Lighting',
    category: 'Smart Lighting',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80',
    description: 'RGB mood lighting for living spaces',
  },
  {
    id: '5',
    title: 'Smart Security System',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    description: 'Video door phone with smart lock',
  },
  {
    id: '6',
    title: 'Multi-Room Audio',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
    description: 'Whole-home wireless audio system',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How long does a smart home installation take?',
    answer: 'A typical smart home installation takes 3-7 days depending on the scope. Basic lighting automation can be done in 1 day, while a complete home automation system with CCTV, theater, and security may take up to 2 weeks.',
  },
  {
    question: 'Do you provide warranty on your installations?',
    answer: 'Yes, we provide a comprehensive 1-year warranty on all installations. Premium brands like Crestron and Control4 come with extended manufacturer warranties of up to 3 years. We also offer Annual Maintenance Contracts (AMC).',
  },
  {
    question: 'Can I control my smart home when I\'m away?',
    answer: 'Absolutely! All our smart home systems come with cloud connectivity, allowing you to control lights, security cameras, locks, and more from anywhere in the world using your smartphone.',
  },
  {
    question: 'What areas in Andhra Pradesh do you service?',
    answer: 'We primarily serve Guntur, Vijayawada, Tenali, Narasaraopet, and the surrounding areas of Andhra Pradesh. We also take projects across AP and Telangana for larger installations.',
  },
  {
    question: 'What is the minimum budget for home automation?',
    answer: 'We have packages starting from ₹45,000 for basic automation (lights + fan control). A mid-range complete automation system with security costs ₹1.5-3 lakhs. Premium whole-home systems range from ₹5-25 lakhs.',
  },
  {
    question: 'Do you work with existing homes or only new constructions?',
    answer: 'We work with both! For existing homes, we use wireless and retrofit solutions that require minimal civil work. New constructions can benefit from integrated wired systems for better performance and aesthetics.',
  },
];

export const BRANDS = [
  'Philips Hue',
  'Schneider',
  'Lutron',
  'Honeywell',
  'Hikvision',
  'Dahua',
  'Samsung',
  'LG',
  'Sony',
  'Bose',
  'Legrand',
  'ABB',
];

export const WHY_CHOOSE_US = [
  {
    icon: '🏆',
    title: '10+ Years Experience',
    description: 'A decade of expertise in smart home technology across Andhra Pradesh',
  },
  {
    icon: '👨‍🔧',
    title: 'Expert Installation',
    description: 'Certified technicians with factory training from premium brands',
  },
  {
    icon: '🛡️',
    title: '1-Year Warranty',
    description: 'Comprehensive warranty with free service visits during warranty period',
  },
  {
    icon: '⭐',
    title: 'Premium Brands',
    description: 'Authorised dealer for top global smart home technology brands',
  },
  {
    icon: '⚡',
    title: '24/7 Support',
    description: 'Round-the-clock technical support and emergency service',
  },
  {
    icon: '💰',
    title: 'Best Value',
    description: 'Competitive pricing with flexible EMI options and transparent quotes',
  },
];
