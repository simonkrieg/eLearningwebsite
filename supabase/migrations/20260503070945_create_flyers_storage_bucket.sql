/*
  # Create flyers storage bucket

  Creates a public storage bucket for HTML flyer files with proper content-type support.
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('flyers', 'flyers', true, 5242880, ARRAY['text/html'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for flyers"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'flyers');
