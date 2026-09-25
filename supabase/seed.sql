-- ==============================================================================
-- AURA MEDSPA — Production Seed Data
-- ==============================================================================

-- Seed Treatments
INSERT INTO public.treatments (id, name, category, duration, price, description, popular)
VALUES
(
  'treat-001',
  'Neuromodulator Full Facial Relaxation (Botox / Dysport 50u)',
  'Neuromodulators & Wrinkle Relaxers',
  '45 Min',
  650.00,
  'Precision micro-dosing across frontalis, glabella, and crow feet for natural, refined smoothing.',
  true
),
(
  'treat-002',
  'Dermal Architecture & Lip Contouring (Restylane Kysse)',
  'Fillers & Biostimulators',
  '60 Min',
  750.00,
  'Hydrating hyaluronic filler delivering subtle vertical height and natural philtrum column definition.',
  true
),
(
  'treat-003',
  'BBL HERO Photofacial & Pigment Clear',
  'Laser & Phototherapy',
  '60 Min',
  650.00,
  'High-speed pulsed phototherapy targeting sun damage, broken capillaries, and collagen stimulation.',
  false
),
(
  'treat-004',
  'SkinPen Microneedling with Exosome Bio-Serum',
  'Medical Peels & Microneedling',
  '75 Min',
  550.00,
  'FDA-cleared medical microneedling combined with concentrated exosome growth factors for rapid dermal healing.',
  true
),
(
  'treat-005',
  'Platinum HydraFacial Deluxe & Lymphatic Sculpt',
  'HydraFacial & Skin Health',
  '60 Min',
  375.00,
  'Vortex suction extraction with targeted peptide boosters, blue/red LED therapy, and neck lymphatic drain.',
  true
),
(
  'treat-006',
  'NAD+ Cellular Longevity Infusion (500mg)',
  'Cellular Longevity & IV Drips',
  '90 Min',
  450.00,
  'High-purity coenzyme IV therapy accelerating mitochondrial ATP synthesis and cognitive clarity.',
  false
)
ON CONFLICT (id) DO NOTHING;

-- Seed Appointments
INSERT INTO public.appointments (id, client_name, client_email, client_phone, treatment, category, provider, date, time, price, status, notes)
VALUES
(
  'appt-001',
  'Victoria Sterling',
  'v.sterling@private.com',
  '+1 (415) 890-2134',
  'Neuromodulator Full Facial Relaxation (Botox / Dysport 50u)',
  'Neuromodulators & Wrinkle Relaxers',
  'Dr. Elena Vance, NP',
  CURRENT_DATE + INTERVAL '1 day',
  '10:30 AM',
  650.00,
  'confirmed',
  'VIP Founding Member. Prefers topical numbing 15 mins prior.'
),
(
  'appt-002',
  'Alexander Wright',
  'a.wright@hedgefund.com',
  '+1 (212) 555-0199',
  'NAD+ Cellular Longevity Infusion (500mg)',
  'Cellular Longevity & IV Drips',
  'Sarah Lin, Master RN',
  CURRENT_DATE,
  '2:00 PM',
  450.00,
  'confirmed',
  'Executive private lounge requested.'
),
(
  'appt-003',
  'Genevieve DuPont',
  'g.dupont@atelier.com',
  '+1 (310) 441-9872',
  'BBL HERO Photofacial & Pigment Clear',
  'Laser & Phototherapy',
  'Dr. Elena Vance, NP',
  CURRENT_DATE + INTERVAL '2 days',
  '11:15 AM',
  650.00,
  'pending',
  'First time laser patient. Skin type II Fitzpatrick.'
),
(
  'appt-004',
  'Marcus Vance',
  'mvance@investors.io',
  '+1 (650) 332-1188',
  'Platinum HydraFacial Deluxe & Lymphatic Sculpt',
  'HydraFacial & Skin Health',
  'Sarah Lin, Master RN',
  CURRENT_DATE + INTERVAL '3 days',
  '3:30 PM',
  375.00,
  'confirmed',
  'Pre-event facial rejuvenation.'
)
ON CONFLICT (id) DO NOTHING;
