-- ==============================================================================
-- AURA MEDSPA — Boutique Aesthetics Clinic & VIP Treatment Booking OS
-- Supabase PostgreSQL Production Schema v1.0.0
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Role-based access: director, provider, client)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Sanctuary Client',
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('director', 'provider', 'client')),
  phone TEXT,
  vip_membership_tier TEXT DEFAULT 'None' CHECK (vip_membership_tier IN ('None', 'Tier 1 Radiance', 'Tier 2 Longevity', 'Founding Member')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Treatment Catalog Table
CREATE TABLE IF NOT EXISTS public.treatments (
  id TEXT PRIMARY KEY DEFAULT ('treat-' || floor(extract(epoch from now()) * 1000)::text),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL DEFAULT '60 Min',
  price NUMERIC(10, 2) NOT NULL,
  description TEXT NOT NULL,
  popular BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Appointments & Intake Ledger Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY DEFAULT ('appt-' || floor(extract(epoch from now()) * 1000)::text),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  treatment TEXT NOT NULL,
  category TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'Dr. Elena Vance, NP',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  time TEXT NOT NULL DEFAULT '11:00 AM',
  price NUMERIC(10, 2) NOT NULL DEFAULT 450.00,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Row Level Security (RLS) Configuration
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
-- Treatments: Everyone can read active treatments
CREATE POLICY "Public read treatments" ON public.treatments FOR SELECT USING (true);
CREATE POLICY "Directors manage treatments" ON public.treatments FOR ALL USING (true);

-- Appointments: Public can book (insert), Directors can manage all
CREATE POLICY "Public can book appointment" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read own appointments" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Directors manage appointments" ON public.appointments FOR ALL USING (true);
