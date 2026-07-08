-- ============================================
-- Local Shop Registry — Database Migration
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create the shops table
CREATE TABLE IF NOT EXISTS public.shops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  shop_name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  place_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_shops_user_id ON public.shops(user_id);
CREATE INDEX IF NOT EXISTS idx_shops_category ON public.shops(category);
CREATE INDEX IF NOT EXISTS idx_shops_place_id ON public.shops(place_id);
CREATE INDEX IF NOT EXISTS idx_shops_shop_name ON public.shops USING gin(to_tsvector('english', shop_name));

-- 3. Enable Row Level Security
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Anyone (authenticated) can view all shops
CREATE POLICY "Anyone can view shops"
  ON public.shops
  FOR SELECT
  USING (true);

-- Users can only insert their own shops
CREATE POLICY "Users can insert own shops"
  ON public.shops
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own shops
CREATE POLICY "Users can update own shops"
  ON public.shops
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can only delete their own shops
CREATE POLICY "Users can delete own shops"
  ON public.shops
  FOR DELETE
  USING (auth.uid() = user_id);

-- 5. Auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER shops_updated_at
  BEFORE UPDATE ON public.shops
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
