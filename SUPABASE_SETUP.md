# ⚡ AURA MEDSPA OS — 3-Minute Supabase Database Setup Guide

Welcome to **AURA MEDSPA (Boutique Aesthetics Clinic & VIP Treatment Booking OS)**.
Follow this 3-minute quickstart guide to wire your live cloud database.

---

### Step 1: Create a Free Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **"New Project"**, name it `aura-medspa-db`, and set a strong database password.
3. Select your closest hosting region and click **"Create New Project"**.

---

### Step 2: Run the Database Migrations (1-Click SQL)
1. In your Supabase dashboard, click on **"SQL Editor"** in the left sidebar.
2. Open `supabase/schema.sql` from this repository, copy all contents, paste it into the SQL Editor, and click **"Run"**.
3. Open `supabase/seed.sql`, copy all contents, paste into the SQL Editor, and click **"Run"** to load the initial treatments, providers, and patient appointment ledger.

---

### Step 3: Link Environment Variables
1. In Supabase, navigate to **Project Settings** &rarr; **API**.
2. Copy your **Project URL** and **anon public Key**.
3. Create a `.env` file in the root of your project:
```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

### Step 4: Launch Your Private Operating System
```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Or build for production
npm run build
```

---

### 🕹️ Clinical Director Admin Passcode
- **Passkey**: `medspa2026`
- **Route**: Click **"ADMIN PASS"** in the top navigation bar or navigate to `/admin` to unlock the Clinical Director Control Room, Patient Appointment Queue, and Procedure Catalog Editor.

---

### 🛡️ Need White-Glove VIP Setup?
If you purchased **Tier 3 ($3,500 White-Glove Rig)**, our engineering team configures the entire cloud stack, custom domain DNS, SMS appointment reminders, and automated patient intake emails for you. Contact support via your Gumroad receipt.
