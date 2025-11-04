-- Catpainting Database Schema
-- Run this SQL in your Supabase SQL editor

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
  ('Abstractions', 'abstractions', 'Abstract paintings exploring form and color'),
  ('Architecture', 'architecture', 'Architectural studies and urban landscapes'),
  ('Eaux', 'eaux', 'Water scenes and aquatic environments'),
  ('Escaliers', 'escaliers', 'Staircase compositions and vertical perspectives'),
  ('Intérieurs', 'interieurs', 'Interior spaces and domestic scenes'),
  ('Paysages', 'paysages', 'Natural landscapes and outdoor scenes'),
  ('Saisons', 'saisons', 'Seasonal depictions and temporal changes'),
  ('Villes', 'villes', 'Urban scenes and city life'),
  ('Voyages', 'voyages', 'Travel-inspired works and distant places')
ON CONFLICT (slug) DO NOTHING;

-- Artworks table
CREATE TABLE IF NOT EXISTS artworks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(255) NOT NULL REFERENCES categories(slug),
  image_url TEXT NOT NULL,
  price_eur DECIMAL(10,2) NOT NULL,
  price_nft DECIMAL(10,2),
  nft_status VARCHAR(20) CHECK (nft_status IN ('available', 'minted', 'sold')) DEFAULT 'available',
  width INTEGER,
  height INTEGER,
  medium VARCHAR(255),
  year INTEGER,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  wallet_address VARCHAR(255),
  is_admin BOOLEAN DEFAULT FALSE,
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
  payment_id VARCHAR(255),
  payment_status VARCHAR(20) CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  includes_nft BOOLEAN DEFAULT FALSE,
  nft_minted BOOLEAN DEFAULT FALSE,
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NFT Metadata table
CREATE TABLE IF NOT EXISTS nft_metadata (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
  token_id VARCHAR(255),
  blockchain_url TEXT,
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  transaction_hash VARCHAR(255),
  metadata_uri TEXT,
  minted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_artworks_category ON artworks(category);
CREATE INDEX IF NOT EXISTS idx_artworks_available ON artworks(is_available) WHERE is_available = TRUE;
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_nft_metadata_artwork_id ON nft_metadata(artwork_id);
CREATE INDEX IF NOT EXISTS idx_nft_metadata_owner_id ON nft_metadata(owner_id);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_artworks_updated_at BEFORE UPDATE ON artworks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security Policies

-- Artworks: Public read, admin write
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available artworks" ON artworks
  FOR SELECT USING (is_available = TRUE);

CREATE POLICY "Admins can manage artworks" ON artworks
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = TRUE
    )
  );

-- Categories: Public read, admin write
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (TRUE);

CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = TRUE
    )
  );

-- Profiles: Users can read/update own profile, admins can see all
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = TRUE
    )
  );

-- Orders: Users can see own orders, admins can see all
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = TRUE
    )
  );

CREATE POLICY "Admins can update all orders" ON orders
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = TRUE
    )
  );

-- NFT Metadata: Users can see own NFTs, admins can see all
ALTER TABLE nft_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own NFTs" ON nft_metadata
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Admins can view all NFTs" ON nft_metadata
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = TRUE
    )
  );

CREATE POLICY "System can create NFTs" ON nft_metadata
  FOR INSERT WITH CHECK (TRUE);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Storage for artwork images
INSERT INTO storage.buckets (id, name, public) VALUES ('artworks', 'artworks', TRUE);

-- Storage policies
CREATE POLICY "Anyone can view artwork images" ON storage.objects
  FOR SELECT USING (bucket_id = 'artworks');

CREATE POLICY "Admins can upload artwork images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'artworks' AND
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = TRUE
    )
  );

CREATE POLICY "Admins can update artwork images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'artworks' AND
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = TRUE
    )
  );

CREATE POLICY "Admins can delete artwork images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'artworks' AND
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = TRUE
    )
  );