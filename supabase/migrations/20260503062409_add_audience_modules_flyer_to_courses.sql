/*
  # Add audience, modules, and flyer_url to courses

  1. New columns on `courses`
    - `audience` (text[]) - who the course is for, replaces hard-coded list
    - `modules` (jsonb) - course module list [{title, body}], replaces hard-coded modules
    - `flyer_url` (text) - downloadable flyer URL for the "Download Flyer" button

  2. No data is removed; existing rows default to empty.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'audience') THEN
    ALTER TABLE courses ADD COLUMN audience text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'modules') THEN
    ALTER TABLE courses ADD COLUMN modules jsonb DEFAULT '[]';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'flyer_url') THEN
    ALTER TABLE courses ADD COLUMN flyer_url text DEFAULT '';
  END IF;
END $$;
