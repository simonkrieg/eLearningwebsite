import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sort_order: number;
  created_at: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  category_id: string | null;
  category?: Category;
  price: number;
  currency: string;
  duration_hours: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  image_url: string;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  meta_title: string;
  meta_description: string;
  course_code: string;
  tags: string[];
  learning_outcomes: string[];
  audience: string[];
  modules: { title: string; body: string }[];
  flyer_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar_url: string;
  is_published: boolean;
  sort_order: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  linkedin_url: string;
  sort_order: number;
  is_published: boolean;
};

export type ClientLogo = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  sort_order: number;
  is_published: boolean;
};

export type Page = {
  id: string;
  page: string;
  section: string;
  title: string;
  subtitle: string;
  body: string;
  cta_label: string;
  cta_url: string;
  image_url: string;
  sort_order: number;
  updated_at: string;
};

export const PAGE_LABELS: Record<string, string> = {
  home: 'Home',
  about: 'About',
  courses: 'Courses',
  contact: 'Contact',
};

export const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero / Banner',
  why_us: 'Why Us',
  cta: 'Call to Action',
  story: 'Our Story',
  info: 'Info Block',
};

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  organisation: string;
  interest: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'converted';
  notes: string;
  created_at: string;
};

export type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organisation: string;
  role: string;
  source: 'enquiry' | 'manual' | 'referral' | 'other';
  enquiry_id: string | null;
  notes: string;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminProfile = {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
};
