/*
  # Add course_code, tags, and learning_outcomes to courses

  1. Changes
    - `course_code` (text) — e.g. "BSB50820", displayed as a pink badge on the card
    - `tags` (text[]) — feature tags shown as pill badges, e.g. "Nationally Recognised", "Government Subsidised"
    - `learning_outcomes` (text[]) — bullet points shown on the card with check icons

  2. Notes
    - All columns are nullable with sensible defaults
    - No destructive changes
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'course_code'
  ) THEN
    ALTER TABLE courses ADD COLUMN course_code text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'tags'
  ) THEN
    ALTER TABLE courses ADD COLUMN tags text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'learning_outcomes'
  ) THEN
    ALTER TABLE courses ADD COLUMN learning_outcomes text[] DEFAULT '{}';
  END IF;
END $$;
