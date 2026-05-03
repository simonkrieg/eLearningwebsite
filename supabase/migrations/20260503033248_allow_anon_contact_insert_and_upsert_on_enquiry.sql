/*
  # Allow anon contact inserts and add email unique constraint

  The enquiry form runs as anon (unauthenticated). The contacts INSERT policy
  previously only allowed authenticated users, silently blocking auto-creation.

  Changes:
  - Add unique constraint on contacts.email (for upsert deduplication)
  - Add anon INSERT policy so the enquiry form can create a contact record
*/

-- Unique constraint on email so upsert-by-email works
ALTER TABLE contacts ADD CONSTRAINT contacts_email_unique UNIQUE (email);

-- Allow anon to insert contacts (needed for enquiry form auto-create)
CREATE POLICY "Anon can insert contacts from enquiry form"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);
