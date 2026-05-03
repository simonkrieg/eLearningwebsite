/*
  # E-Learning Creations – Content Tables

  Creates categories, courses, testimonials, team_members, client_logos, site_settings
  with full RLS policies and seed data.
*/

-- Helper function to check admin status
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view categories"
  ON categories FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can insert categories"
  ON categories FOR INSERT TO authenticated WITH CHECK (is_admin());

CREATE POLICY "Admins can update categories"
  ON categories FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can delete categories"
  ON categories FOR DELETE TO authenticated USING (is_admin());

-- Courses
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  short_description text DEFAULT '',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  price numeric(10,2) DEFAULT 0,
  currency text DEFAULT 'AUD',
  duration_hours numeric(5,1) DEFAULT 0,
  difficulty_level text DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner','intermediate','advanced')),
  image_url text DEFAULT '',
  is_published boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  meta_title text DEFAULT '',
  meta_description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published courses"
  ON courses FOR SELECT TO anon USING (is_published = true);

CREATE POLICY "Auth users can view published courses"
  ON courses FOR SELECT TO authenticated USING (is_published = true OR is_admin());

CREATE POLICY "Admins can insert courses"
  ON courses FOR INSERT TO authenticated WITH CHECK (is_admin());

CREATE POLICY "Admins can update courses"
  ON courses FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can delete courses"
  ON courses FOR DELETE TO authenticated USING (is_admin());

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text DEFAULT '',
  company text DEFAULT '',
  content text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  avatar_url text DEFAULT '',
  is_published boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published testimonials"
  ON testimonials FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Admins can insert testimonials"
  ON testimonials FOR INSERT TO authenticated WITH CHECK (is_admin());

CREATE POLICY "Admins can update testimonials"
  ON testimonials FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can delete testimonials"
  ON testimonials FOR DELETE TO authenticated USING (is_admin());

-- Team Members
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text DEFAULT '',
  bio text DEFAULT '',
  image_url text DEFAULT '',
  linkedin_url text DEFAULT '',
  sort_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published team members"
  ON team_members FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Admins can insert team members"
  ON team_members FOR INSERT TO authenticated WITH CHECK (is_admin());

CREATE POLICY "Admins can update team members"
  ON team_members FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can delete team members"
  ON team_members FOR DELETE TO authenticated USING (is_admin());

-- Client Logos
CREATE TABLE IF NOT EXISTS client_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text DEFAULT '',
  website_url text DEFAULT '',
  sort_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE client_logos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published client logos"
  ON client_logos FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Admins can insert client logos"
  ON client_logos FOR INSERT TO authenticated WITH CHECK (is_admin());

CREATE POLICY "Admins can update client logos"
  ON client_logos FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can delete client logos"
  ON client_logos FOR DELETE TO authenticated USING (is_admin());

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view site settings"
  ON site_settings FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can insert site settings"
  ON site_settings FOR INSERT TO authenticated WITH CHECK (is_admin());

CREATE POLICY "Admins can update site settings"
  ON site_settings FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Seed: site settings
INSERT INTO site_settings (key, value) VALUES
  ('site_name', 'E-Learning Creations'),
  ('site_tagline', 'A fresh and affordable approach to online learning and development'),
  ('contact_email', 'info@elearningcreations.com.au'),
  ('contact_phone', ''),
  ('address', 'Adelaide, South Australia'),
  ('about_intro', 'We are based in Adelaide, South Australia and we provide affordable solutions to online education. We specialise in developing targeted and contextualised online content and learning systems for a variety of industry settings.')
ON CONFLICT (key) DO NOTHING;

-- Seed: team members
INSERT INTO team_members (name, role, bio, image_url, sort_order) VALUES
  ('Simon Krieg', 'Managing Director', 'Simon leads E-Learning Creations with a passion for making quality online education accessible and affordable for Australian organisations of all sizes.', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400', 1)
ON CONFLICT DO NOTHING;

-- Seed: categories
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
  ('Workplace Health & Safety', 'workplace-health-safety', 'Comprehensive WHS training for Australian workplaces', 'Shield', 1),
  ('Leadership & Management', 'leadership-management', 'Build effective leadership skills at every level', 'Users', 2),
  ('Customer Service', 'customer-service', 'Deliver exceptional customer experiences', 'Star', 3),
  ('Compliance & Governance', 'compliance-governance', 'Stay compliant with Australian regulations', 'FileCheck', 4),
  ('Digital Literacy', 'digital-literacy', 'Essential digital skills for the modern workplace', 'Monitor', 5),
  ('Industry-Specific Training', 'industry-specific', 'Tailored training for your industry context', 'Briefcase', 6)
ON CONFLICT (slug) DO NOTHING;

-- Seed: testimonials
INSERT INTO testimonials (name, role, company, content, rating, sort_order) VALUES
  ('Sarah Mitchell', 'HR Manager', 'SA Tourism Commission', 'E-Learning Creations transformed our onboarding process. The contextualised content meant our staff were engaged from day one. Highly recommend their approach.', 5, 1),
  ('David Chen', 'Training Coordinator', 'HSE Australia', 'The team understood our industry requirements perfectly. Our compliance training completion rates went from 60% to 98% after switching to their platform.', 5, 2),
  ('Amanda Ross', 'CEO', 'Centre for People Development', 'Simon and the team are genuinely invested in delivering outcomes, not just content. The quality of their work speaks for itself.', 5, 3)
ON CONFLICT DO NOTHING;

-- Seed: client logos
INSERT INTO client_logos (name, sort_order) VALUES
  ('Centre for People Development', 1),
  ('SA Tourism Commission', 2),
  ('HSE Australia', 3),
  ('CPD Arts Biz', 4),
  ('PRAXIS Australia', 5),
  ('Baukraft Pty. Ltd.', 6),
  ('No Strings Attached Theatre', 7)
ON CONFLICT DO NOTHING;
