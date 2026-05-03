/*
  # Create course-flyers storage bucket

  Creates a public storage bucket for course PDF flyers.

  1. New Bucket
    - `course-flyers` - public bucket, PDF files only, 10MB limit

  2. Security
    - Public SELECT: anyone can read/download flyers
    - Authenticated INSERT: admins can upload flyers
    - Authenticated UPDATE: admins can replace flyers
    - Authenticated DELETE: admins can remove flyers
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-flyers',
  'course-flyers',
  true,
  10485760,
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can download course flyers"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'course-flyers');

CREATE POLICY "Authenticated users can upload course flyers"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'course-flyers');

CREATE POLICY "Authenticated users can replace course flyers"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'course-flyers')
  WITH CHECK (bucket_id = 'course-flyers');

CREATE POLICY "Authenticated users can delete course flyers"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'course-flyers');
