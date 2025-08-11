-- Create a table for product customizations
CREATE TABLE IF NOT EXISTS public.product_customizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users NOT NULL,
  product_id TEXT NOT NULL,
  product_type TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable row level security
ALTER TABLE public.product_customizations ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own customizations" ON public.product_customizations;
CREATE POLICY "Users can view their own customizations"
  ON public.product_customizations
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own customizations" ON public.product_customizations;
CREATE POLICY "Users can insert their own customizations"
  ON public.product_customizations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own customizations" ON public.product_customizations;
CREATE POLICY "Users can update their own customizations"
  ON public.product_customizations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Enable realtime for product_customizations table
DO $realtime$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'product_customizations'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.product_customizations;
  END IF;
END$realtime$;