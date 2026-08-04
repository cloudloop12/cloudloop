export type DivisionType = 'all' | 'documents' | 'it';

export interface ServiceItem {
  id: string;
  title: string;
  division: 'documents' | 'it';
  category: string;
  description: string;
  iconName: string;
  features: string[];
  popular?: boolean;
  estimatedPrice?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  division: 'documents' | 'it';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'documents' | 'it';
}

export interface CalculatorOption {
  id: string;
  name: string;
  division: 'documents' | 'it';
  category: string;
  baseCostAED: number;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeframe: string;
}

export interface StatItem {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  category: 'Business Setup' | 'Visa' | 'UAE Laws' | 'Technology' | 'Cyber Security' | 'Software' | 'SEO' | 'Cloud';
  snippet: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
  imageAlt?: string;
  tags: string[];
  isFeatured?: boolean;
  relatedSlugs?: string[];
  faqs?: { q: string; a: string }[];
}

export interface CareerOpening {
  id: string;
  title: string;
  division: 'documents' | 'it' | 'group';
  location: string;
  type: 'Full-time' | 'Contract';
  department: string;
  description: string;
  experience: string;
  requirements: string[];
  benefits: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  division: 'group' | 'documents' | 'it';
  bio: string;
  image: string;
}

export interface DetailedService {
  id: string;
  slug: string;
  title: string;
  division: 'documents' | 'it';
  category: string;
  heroHeadline: string;
  overview: string;
  benefits: string[];
  processSteps: { step: number; title: string; desc: string }[];
  requiredDocuments: string[];
  timeline: string;
  pricingStarting: string;
  faqs: { question: string; answer: string; q?: string; a?: string }[];
  technologies?: string[];
  flag?: string;
  heroImage?: string;
  requirements?: {
    passport?: string[];
    photo?: string[];
    eligibility?: string[];
    supportingDocs?: string[];
  };
  processingTimes?: {
    standard: { time: string; desc: string };
    express?: { time: string; desc: string };
  };
  pricingPackage?: {
    startingPrice: string;
    whatsIncluded: string[];
    addOns?: { name: string; price: string }[];
  };
}
