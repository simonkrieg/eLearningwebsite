/*
  # Create enquiries and contacts tables

  ## New Tables

  ### enquiries
  Stores submissions from the public contact form.
  - id, name, email, organisation, interest, message
  - status: 'new' | 'read' | 'replied' | 'converted'
  - notes (internal admin notes)
  - created_at

  ### contacts
  CRM-style contact records. Can be created manually or converted from an enquiry.
  - id, first_name, last_name, email, phone, organisation, role
  - source (e.g. 'enquiry', 'manual', 'referral')
  - enquiry_id (optional FK to enquiries)
  - notes, tags (text array)
  - is_active
  - created_at, updated_at

  ## Security
  - enquiries: public INSERT (so the form works), admin-only SELECT/UPDATE/DELETE
  - contacts: admin-only all operations
*/

-- Enquiries
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  organisation text DEFAULT '',
  interest text DEFAULT '',
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'converted')),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enquiry"
  ON enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can update enquiries"
  ON enquiries FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete enquiries"
  ON enquiries FOR DELETE
  TO authenticated
  USING (is_admin());

-- Contacts
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text DEFAULT '',
  email text DEFAULT '',
  phone text DEFAULT '',
  organisation text DEFAULT '',
  role text DEFAULT '',
  source text DEFAULT 'manual' CHECK (source IN ('enquiry', 'manual', 'referral', 'other')),
  enquiry_id uuid REFERENCES enquiries(id) ON DELETE SET NULL,
  notes text DEFAULT '',
  tags text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can insert contacts"
  ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (is_admin());
