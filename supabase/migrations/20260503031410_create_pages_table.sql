/*
  # Create pages table

  Stores editable content blocks for public-facing pages (Home, About, Contact, Courses).
  Each page can have multiple named sections (e.g. hero, intro, cta).

  ## New Table: pages
  - id, page (slug key like 'home', 'about'), section (e.g. 'hero'), title, subtitle, body, cta_label, cta_url, image_url, sort_order, updated_at

  ## Security
  - Public read access (anon + authenticated)
  - Admin write access via is_admin()
*/

CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  section text NOT NULL,
  title text DEFAULT '',
  subtitle text DEFAULT '',
  body text DEFAULT '',
  cta_label text DEFAULT '',
  cta_url text DEFAULT '',
  image_url text DEFAULT '',
  sort_order integer DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page, section)
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read pages"
  ON pages FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert pages"
  ON pages FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update pages"
  ON pages FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete pages"
  ON pages FOR DELETE
  TO authenticated
  USING (is_admin());

-- Seed default page content
INSERT INTO pages (page, section, title, subtitle, body, cta_label, cta_url, sort_order) VALUES
  ('home', 'hero',
    'Online Learning That Actually Works for Your Organisation',
    'Based in Adelaide, South Australia',
    'A fresh and affordable approach to online learning and development. We build contextualised eLearning content and learning management systems tailored to your industry, your people, and your outcomes.',
    'Browse Courses', '/courses', 1),

  ('home', 'why_us',
    'The smarter way to train your team',
    'Why E-Learning Creations',
    'We combine instructional design expertise with deep industry knowledge to deliver training that sticks.',
    '', '', 2),

  ('home', 'cta',
    'Ready to transform your training?',
    '',
    'Whether you need a single course or a complete learning system, we''ll build something that fits your organisation perfectly.',
    'Start a conversation', '/contact', 3),

  ('about', 'hero',
    'Adelaide''s eLearning specialists',
    'About Us',
    'We are based in Adelaide, South Australia and we provide affordable solutions to online education. We specialise in developing targeted and contextualised online content and learning systems for a variety of industry settings.',
    '', '', 1),

  ('about', 'story',
    'Built on a belief that good training changes organisations',
    'Our Story',
    'E-Learning Creations was founded on a simple premise: Australian organisations deserve access to high-quality, contextualised online learning that doesn''t cost a fortune.

We noticed that most eLearning providers offered generic, one-size-fits-all content that failed to resonate with learners. Completion rates were low. Knowledge transfer was poor. Training dollars were wasted.

We set out to do things differently — working closely with each client to understand their industry, their culture, and their specific learning objectives before a single line of content is written.',
    'Work with us', '/contact', 2),

  ('about', 'cta',
    'Let''s build something great together',
    '',
    'Ready to transform how your organisation learns? We''d love to hear about your project.',
    'Get in touch', '/contact', 3),

  ('courses', 'hero',
    'Find the right course for your team',
    'Course Catalogue',
    'Browse our catalogue of professionally developed eLearning courses. All designed for the Australian workplace context.',
    '', '', 1),

  ('contact', 'hero',
    'Let''s start a conversation',
    'Contact Us',
    'Tell us about your training needs and we''ll tailor a solution that works for your organisation.',
    '', '', 1),

  ('contact', 'info',
    'Get in touch',
    '',
    'We offer a free 30-minute discovery call to understand your needs before proposing any solution.',
    '', '', 2)

ON CONFLICT (page, section) DO NOTHING;
