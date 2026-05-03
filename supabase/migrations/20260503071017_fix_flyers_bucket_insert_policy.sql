/*
  # Add insert policy for flyers bucket (service role uploads)
*/

CREATE POLICY "Service role can upload flyers"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'flyers');
