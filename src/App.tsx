/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * AURA MEDSPA — Boutique Aesthetics Clinic & VIP Treatment Booking OS
 */

import React, { useState, useEffect } from 'react';
import { BreathingSanctuary } from './components/BreathingSanctuary';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ClientPortalModal } from './components/ClientPortalModal';
import { TreatmentCategory, Appointment } from './types';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  Calendar, 
  Clock, 
  Award, 
  ShieldCheck, 
  Check, 
  Key, 
  X, 
  Shield, 
  Stethoscope, 
  Activity, 
  CheckCircle2, 
  ChevronRight,
  UserCheck
} from 'lucide-react';

const INITIAL_CATEGORIES: TreatmentCategory[] = [
  {
    name: "Neuromodulators & Wrinkle Relaxers",
    tagline: "Precision facial muscle relaxation & micro-dosing",
    items: [
      { id: "nm-1", name: "Full Facial Neuromodulator (Botox / Dysport 50u)", category: "Neuromodulators", duration: "45 Min", price: 650, description: "Precision micro-dosing for frontalis, glabella, and crow's feet vectors.", popular: true },
      { id: "nm-2", name: "Masseter Facial Slimming & TMJ Relief", category: "Neuromodulators", duration: "30 Min", price: 550, description: "Lower facial contouring that relieves nocturnal bruxism and tension.", popular: false },
      { id: "nm-3", name: "Nefertiti Neck & Jawline Lift (Botox 30u)", category: "Neuromodulators", duration: "45 Min", price: 475, description: "Targeted platysma band micro-injections for a crisp jawline definition.", popular: false },
      { id: "nm-4", name: "Daxxify Long-Duration Peptide Relaxer", category: "Neuromodulators", duration: "45 Min", price: 780, description: "Next-generation peptide-formulated wrinkle smoothing lasting up to 6 months.", popular: true }
    ]
  },
  {
    name: "Dermal Architecture & Biostimulators",
    tagline: "Hyaluronic structural support & collagen synthesis",
    items: [
      { id: "da-1", name: "Bespoke Lip Contouring (Restylane Kysse)", category: "Fillers", duration: "60 Min", price: 750, description: "Natural volume and crisp philtrum column definition with flexible mobility.", popular: true },
      { id: "da-2", name: "Midface Structural Cheek Restoration (Juvederm Voluma)", category: "Fillers", duration: "60 Min", price: 850, description: "Deep supra-periosteal placement restoring youthful structural cheek height.", popular: true },
      { id: "da-3", name: "Sculptra Collagen Biostimulator (2 Vials)", category: "Biostimulators", duration: "75 Min", price: 1500, description: "Poly-L-lactic acid stimulating deep autologous Type I collagen synthesis.", popular: true },
      { id: "da-4", name: "Hyper-Dilute Radiesse Neck & Décolleté Polish", category: "Biostimulators", duration: "60 Min", price: 890, description: "Calcium hydroxyapatite micro-mesh firming crepey horizontal neck rings.", popular: false }
    ]
  },
  {
    name: "Laser Resurfacing & Phototherapy",
    tagline: "Broadband light photofacials & fractionated polish",
    items: [
      { id: "lr-1", name: "BBL HERO High-Definition Photofacial", category: "Laser & Light", duration: "45 Min", price: 650, description: "High-speed pulsed phototherapy banishing hyperpigmentation and vascular redness.", popular: true },
      { id: "lr-2", name: "MOXI Non-Ablative Fractionated Laser", category: "Laser & Light", duration: "60 Min", price: 750, description: "Gentle dermal polish addressing early sun damage with zero social downtime.", popular: false },
      { id: "lr-3", name: "BBL + MOXI Sciton Dual-Waveform Glow", category: "Laser & Light", duration: "90 Min", price: 1250, description: "Our signature synergy: simultaneous pigment clearance and fractionated rejuvenation.", popular: true }
    ]
  },
  {
    name: "Medical Peels & Collagen Induction",
    tagline: "Medical-grade microneedling & no-peel biorevitalization",
    items: [
      { id: "mp-1", name: "SkinPen Medical Microneedling + Exosomes", category: "Microneedling", duration: "75 Min", price: 650, description: "FDA-cleared mechanical collagen induction infused with billions of bioactive exosomes.", popular: true },
      { id: "mp-2", name: "PRX-T33 No-Peel Dermal Biorevitalizer", category: "Peels", duration: "45 Min", price: 420, description: "Patented 33% TCA formulation that stimulates dermis without surface peeling.", popular: false },
      { id: "mp-3", name: "BioRePeelCl3 Blue Mediterranean TCA 35%", category: "Peels", duration: "45 Min", price: 380, description: "Two-phase peel with amino acids and vitamins for radiant cellular turnover.", popular: false }
    ]
  },
  {
    name: "HydraFacial Deluxe & Cellular Longevity",
    tagline: "Vortex cleansing, lymphatic sculpt & coenzyme infusions",
    items: [
      { id: "hf-1", name: "Platinum HydraFacial with Lymphatic Sculpt", category: "HydraFacial", duration: "60 Min", price: 375, description: "Vortex pore evacuation, targeted peptide booster, LED light, and neck contouring.", popular: true },
      { id: "hf-2", name: "NAD+ Cellular Longevity Infusion (500mg)", category: "IV Wellness", duration: "90 Min", price: 450, description: "Direct coenzyme IV infusion accelerating mitochondrial ATP repair and brain clarity.", popular: true },
      { id: "hf-3", name: "Aura Master Antioxidant Drip (Glutathione + Vitamin C)", category: "IV Wellness", duration: "45 Min", price: 240, description: "High-dose cellular detox illuminating complexions from within.", popular: false }
    ]
  }
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "appt-101",
    clientName: "Victoria Sterling",
    clientEmail: "v.sterling@private.com",
    clientPhone: "+1 (415) 890-2134",
    treatment: "Full Facial Neuromodulator (Botox / Dysport 50u)",
    category: "Neuromodulators",
    provider: "Dr. Elena Vance, NP",
    date: "2026-09-24",
    time: "10:30 AM",
    price: 650,
    status: "confirmed",
    notes: "VIP Founding Member. Prefers topical numbing 15 mins prior.",
    createdAt: "2026-09-21T14:20:00Z"
  },
  {
    id: "appt-102",
    clientName: "Alexander Wright",
    clientEmail: "a.wright@hedgefund.com",
    clientPhone: "+1 (212) 555-0199",
    treatment: "NAD+ Cellular Longevity Infusion (500mg)",
    category: "Cellular Longevity",
    provider: "Sarah Lin, Master RN",
    date: "2026-09-23",
    time: "2:00 PM",
    price: 450,
    status: "confirmed",
    notes: "Private executive lounge requested.",
    createdAt: "2026-09-22T09:15:00Z"
  },
  {
    id: "appt-103",
    clientName: "Genevieve DuPont",
    clientEmail: "g.dupont@atelier.com",
    clientPhone: "+1 (310) 441-9872",
    treatment: "BBL HERO High-Definition Photofacial",
    category: "Laser & Light",
    provider: "Dr. Elena Vance, NP",
    date: "2026-09-25",
    time: "11:15 AM",
    price: 650,
    status: "pending",
    notes: "First time laser patient. Skin type II Fitzpatrick.",
    createdAt: "2026-09-22T11:45:00Z"
  },
  {
    id: "appt-104",
    clientName: "Marcus Vance",
    clientEmail: "mvance@investors.io",
    clientPhone: "+1 (650) 332-1188",
    treatment: "Platinum HydraFacial with Lymphatic Sculpt",
    category: "HydraFacial",
    provider: "Sarah Lin, Master RN",
    date: "2026-09-26",
    time: "3:30 PM",
    price: 375,
    status: "confirmed",
    notes: "Pre-gala facial rejuvenation.",
    createdAt: "2026-09-22T16:00:00Z"
  }
];

export default function App() {
  const [categories, setCategories] = useState<TreatmentCategory[]>(INITIAL_CATEGORIES);
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('aura_medspa_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [activeCategoryTab, setActiveCategoryTab] = useState<string>(INITIAL_CATEGORIES[0].name);
  const [activePhilosophyTab, setActivePhilosophyTab] = useState<'cellular' | 'clinical' | 'botanical'>('cellular');
  
  // Modals & Navigation
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminPassModalOpen, setIsAdminPassModalOpen] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preSelectedTreatment, setPreSelectedTreatment] = useState('');
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Check URL on boot for /admin or #admin
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (path.includes('admin') || hash.includes('admin') || search.includes('admin')) {
      setIsAdminMode(true);
      setTimeout(() => triggerToast('⚡ Managing Director Bypass: Clinical Control Room Activated'), 300);
    }
  }, []);

  const handleBookingConfirmed = (newAppt: Appointment) => {
    const updated = [newAppt, ...appointments];
    setAppointments(updated);
    localStorage.setItem('aura_medspa_appointments', JSON.stringify(updated));
    triggerToast(`✨ Treatment Reserved: ${newAppt.treatment}`);
  };

  const handleUpdateStatus = (id: string, newStatus: Appointment['status']) => {
    const updated = appointments.map(a => a.id === id ? { ...a, status: newStatus } : a);
    setAppointments(updated);
    localStorage.setItem('aura_medspa_appointments', JSON.stringify(updated));
    triggerToast(`Status revised to: ${newStatus.toUpperCase()}`);
  };

  const handleAddTreatment = (catName: string, name: string, price: number, duration: string) => {
    const newTreat: any = {
      id: `treat-${Date.now().toString().slice(-4)}`,
      name,
      category: catName,
      duration,
      price,
      description: "Custom clinician formulated treatment procedure.",
      popular: false
    };
    setCategories(prev => prev.map(c => c.name === catName ? { ...c, items: [...c.items, newTreat] } : c));
    triggerToast(`Added ${name} to ${catName}!`);
  };

  const handleAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassInput.trim() === 'medspa2026') {
      setIsAdminMode(true);
      setIsAdminPassModalOpen(false);
      setAdminPassInput('');
      triggerToast('👑 Clinical Director Access Granted (Cheat Code Verified)');
    } else {
      triggerToast('❌ Invalid Passkey. Use demo passcode: medspa2026');
    }
  };

  // If Admin Mode is active, render the Clinical Director Control Room!
  if (isAdminMode) {
    return (
      <AdminDashboard
        appointments={appointments}
        categories={categories}
        onUpdateStatus={handleUpdateStatus}
        onAddTreatment={handleAddTreatment}
        onClose={() => setIsAdminMode(false)}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-stone-200 overflow-x-hidden selection:bg-stone-800 selection:text-white transition-all font-sans">
      
      {/* Dynamic Global Toast Alert */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-[#14120F]/95 backdrop-blur-md border border-gold-500/30 text-[#E5D3B3] text-xs font-mono tracking-wider px-5 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#D4AF37] rotate-12" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. FLUID LUXURY NAVIGATION HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 lg:px-12 py-4 bg-[#0A0A0B]/85 backdrop-blur-md border-b border-stone-900/80 flex justify-between items-center transition-all">
        
        {/* Brand Title */}
        <a href="#" className="flex items-center space-x-3 group" id="medspa-brand-logo">
          <div className="w-8 h-8 rounded-full border border-gold-500/40 flex items-center justify-center bg-stone-950/60 relative overflow-hidden transition-all duration-300 group-hover:border-gold-500">
            <span className="font-serif italic text-sm font-light tracking-widest text-[#D4AF37]">A</span>
          </div>
          <div>
            <span className="font-serif text-sm tracking-[0.25em] font-medium uppercase text-stone-200 group-hover:text-white transition-colors">
              AURA <span className="text-[#D4AF37] font-semibold">MEDSPA</span>
            </span>
            <span className="block text-[7.5px] font-mono tracking-widest text-stone-500 uppercase">
              Boutique Aesthetics OS
            </span>
          </div>
        </a>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-light text-stone-400">
          <a href="#about" className="hover:text-stone-100 transition-colors">Origins</a>
          <a href="#rituals" className="hover:text-stone-100 transition-colors">Treatments</a>
          <a href="#philosophy" className="hover:text-stone-100 transition-colors">Recovery Suite</a>
          <a href="#location" className="hover:text-stone-100 transition-colors">Sanctuary</a>
        </nav>

        {/* Right Header Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Client Sovereign Portal Button */}
          <button 
            id="client-portal-btn"
            onClick={() => setIsClientPortalOpen(true)}
            className="hidden sm:inline-block text-xs font-semibold tracking-wider tracking-[0.15em] uppercase font-mono text-stone-400 hover:text-stone-100 pr-3 border-r border-stone-800/80 transition-colors cursor-pointer"
          >
            Portal Access
          </button>

          {/* 1-Click Ghost Factory Passkey Door Button */}
          <button
            onClick={() => setIsAdminPassModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#14120F] hover:bg-[#201C15] border border-gold-500/30 hover:border-gold-500/60 rounded text-xs font-semibold tracking-wider font-mono uppercase tracking-[0.15em] text-[#E5D3B3] transition-all cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.1)]"
            id="top-admin-pass-btn"
          >
            <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
            <span>ADMIN PASS</span>
          </button>
          
          {/* Main Booking CTA */}
          <button 
            onClick={() => { setPreSelectedTreatment(''); setIsBookingModalOpen(true); }}
            id="luxury-cta-booking"
            className="bg-stone-100 text-[#0A0A0B] hover:bg-white text-xs font-semibold tracking-wider sm:text-xs uppercase font-medium tracking-[0.15em] px-4 py-2 rounded-sm transition-all shadow-md font-mono cursor-pointer"
          >
            Reserve Sanctuary
          </button>
        </div>
      </header>

      {/* 2. ATMOSPHERE SECTION - FULL-SCREEN CINEMATIC HERO */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden z-10 pt-24 pb-16" id="hero-atmosphere">
        
        {/* Verified 200 OK Photography Layer with Ambient Obsidian Noir Gradients */}
        <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=85"
            alt="Aura MedSpa Sanctuary Suite"
            className="w-full h-full object-cover opacity-25 filter contrast-125 saturate-50 brightness-75 scale-105"
          />
        </div>

        {/* Soft Radial and Linear Gradient Overlays */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0A0B]/60 to-[#0A0A0B] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-[#0A0A0B]/90 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0A0B] to-transparent pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-950/80 border border-stone-800 text-xs font-semibold tracking-wider uppercase tracking-[0.25em] font-mono text-stone-400">
            <Sparkles size={11} className="text-[#D4AF37]" />
            <span>Private Aesthetic Medicine & VIP Longevity</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-[0.3em] uppercase block text-center select-none text-white leading-tight">
            AURA <span className="text-[#D4AF37] italic font-normal">MEDSPA</span>
          </h1>

          <p className="max-w-2xl mx-auto font-serif italic text-base sm:text-xl text-stone-400 leading-relaxed font-light">
            A boutique clinical sanctuary merging medical-grade facial architecture, precision neuromodulators, and cellular longevity therapies.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-4 text-xs font-semibold tracking-wider uppercase tracking-[0.25em] font-mono text-stone-500 pt-2">
            <span>● Board-Certified Injectors</span>
            <span>● Exosome Skin Science</span>
            <span>● Sciton BBL HERO</span>
            <span>● NAD+ Cellular Drips</span>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => { setPreSelectedTreatment(''); setIsBookingModalOpen(true); }}
              className="px-8 py-3.5 bg-stone-100 hover:bg-white text-stone-950 font-mono text-xs uppercase tracking-widest font-semibold rounded shadow-xl transition-all cursor-pointer"
            >
              Book Confidential Consultation
            </button>
            <a
              href="#rituals"
              className="px-6 py-3.5 bg-transparent hover:bg-stone-900/60 border border-stone-800 text-stone-400 hover:text-white font-mono text-xs uppercase tracking-widest rounded transition-all"
            >
              Explore Treatment Matrix
            </a>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 pointer-events-none select-none z-20">
          <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 font-mono">Discover Protocol</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-stone-500/50 to-transparent" />
        </div>

      </section>

      {/* 3. CLINICAL PHILOSOPHY SECTION */}
      <section className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-20 border-b border-stone-900" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <span className="font-mono text-xs font-semibold tracking-wider uppercase tracking-[0.3em] text-[#D4AF37] block">Precision Aesthetic Medicine</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
                Architectural Harmony of <span className="italic font-normal text-stone-400">The Face</span>
              </h2>
            </div>

            <div className="text-sm leading-relaxed font-light space-y-6 text-stone-400">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-2.5 first-letter:font-light font-sans text-stone-300">
                At Aura MedSpa, we reject the overfilled, unnatural aesthetic of legacy clinics. We view facial rejuvenation as a discipline of negative space, structural balance, and cellular restoration.
              </p>
              
              <p className="font-serif italic text-base border-l border-gold-500/40 text-stone-300 pl-4 py-1 leading-relaxed">
                “True beauty is undetectable. It looks like 8 hours of restorative sleep, zero systemic inflammation, and genetic perfection.”
              </p>

              <p className="font-sans text-xs text-stone-400">
                Every consultation begins with high-resolution cross-polarized 3D skin analysis to evaluate dermal thickness, vascular depth, and volume displacement.
              </p>
            </div>

            {/* Interactive Tabs */}
            <div className="pt-2">
              <div className="flex border-b border-stone-900 text-xs font-semibold tracking-wider uppercase tracking-widest font-mono text-stone-500 mb-4 gap-6">
                {(['cellular', 'clinical', 'botanical'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActivePhilosophyTab(tab)}
                    className={`pb-2.5 transition-all uppercase ${activePhilosophyTab === tab ? 'text-[#D4AF37] border-b border-[#D4AF37] font-semibold' : 'text-stone-500 hover:text-stone-300'}`}
                  >
                    {tab === 'cellular' ? 'Cellular Exosomes' : tab === 'clinical' ? 'Sciton Laser' : 'Holistic Recovery'}
                  </button>
                ))}
              </div>

              <div className="text-xs text-stone-400 font-light min-h-[48px] animate-fade-in font-sans">
                {activePhilosophyTab === 'cellular' && "Human umbilical-derived exosome serums packed with 50+ growth factors and messenger RNA to accelerate healing post-microneedling by 300%."}
                {activePhilosophyTab === 'clinical' && "Sciton BBL HERO delivering 4x the speed of standard IPL, clinically proven to change genetic expression in aged skin cells back to a younger state."}
                {activePhilosophyTab === 'botanical' && "Organic cold-pressed arnica compresses, hyper-oxygenated recovery balms, and customized post-care protocols for every patient."}
              </div>
            </div>
          </div>

          {/* Visual Grid Card */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="relative w-full max-w-xl aspect-[4/5] rounded-[3rem] rounded-tl-none overflow-hidden border border-stone-800 bg-stone-950/70 p-8 flex flex-col justify-between group">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85"
                alt="Clinical facial treatment"
                className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-700"
              />
              <div className="relative z-10 flex justify-between items-start text-xs font-mono text-stone-400 uppercase tracking-widest">
                <span>Clinical Suite 01</span>
                <span className="text-gold-400">Board Approved</span>
              </div>
              <div className="relative z-10 space-y-2 bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-stone-800/80">
                <span className="text-[9px] font-mono text-gold-400 uppercase tracking-widest">Featured Protocol</span>
                <h4 className="font-serif text-xl text-white">Dual-Waveform Cellular Glow</h4>
                <p className="text-xs text-stone-400 leading-relaxed font-light">
                  Combining BBL HERO phototherapy with SkinPen Exosome microneedling in a single comprehensive rejuvenation appointment.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THE TREATMENT MATRIX (VIP BOOKING ENGINE) */}
      <section className="relative py-28 px-6 max-w-6xl mx-auto z-20" id="rituals">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-950 border border-stone-800 text-xs font-semibold tracking-wider uppercase font-mono tracking-widest text-[#D4AF37]">
            <Sparkles size={11} />
            <span>Clinical Treatment Matrix</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-white">
            The Treatment <span className="italic font-normal text-stone-400">Curriculum</span>
          </h2>
          <p className="text-base font-semibold font-light max-w-xl mx-auto text-stone-400 leading-relaxed">
            Select a clinical department below to review our physician-formulated injectables, laser resurfacing, and cellular longevity therapies.
          </p>

          {/* Department Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategoryTab(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                  activeCategoryTab === cat.name
                    ? 'bg-stone-100 text-stone-950 border-stone-100 font-semibold shadow-md'
                    : 'bg-stone-950/60 text-stone-400 border-stone-900 hover:text-white hover:border-stone-800'
                }`}
              >
                {cat.name.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Procedures Grid for Active Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories
            .find(c => c.name === activeCategoryTab)
            ?.items.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-stone-950/60 border border-stone-900 hover:border-stone-800 rounded-xl space-y-4 transition-all hover:bg-stone-950/90 group text-left relative"
              >
                {item.popular && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest bg-gold-500/10 text-[#D4AF37] border border-gold-500/30">
                    High Demand
                  </span>
                )}
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-stone-500 block mb-1">
                    {item.category} • {item.duration}
                  </span>
                  <h3 className="font-serif text-lg text-white font-normal group-hover:text-gold-200 transition-colors">
                    {item.name}
                  </h3>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed font-light">
                  {item.description}
                </p>
                <div className="flex justify-between items-center pt-3 border-t border-stone-900/80">
                  <div className="text-base font-serif text-[#D4AF37] font-semibold">
                    ${item.price}
                  </div>
                  <button
                    onClick={() => {
                      setPreSelectedTreatment(item.name);
                      setIsBookingModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-800 hover:border-stone-700 rounded text-xs font-semibold tracking-wider font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Reserve Session</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* 5. INTERACTIVE BREATHING & RECOVERY SANCTUARY */}
      <section className="relative py-24 px-6 z-20 border-t border-b border-stone-900" id="philosophy">
        <div className="max-w-4xl mx-auto">
          <BreathingSanctuary />
        </div>
      </section>

      {/* 6. SANCTUARY LOCATION & CONCIERGE DESK */}
      <section className="relative py-28 px-6 max-w-7xl mx-auto z-20" id="location">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="font-mono text-xs font-semibold tracking-wider uppercase tracking-[0.3em] text-[#D4AF37] block">Sanctuary Address</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-normal">
              Private Clinical <span className="italic font-normal text-stone-400">Pavilion</span>
            </h2>
            <p className="text-sm font-light text-stone-400 leading-relaxed">
              Discreetly situated in Napa Valley with private subterranean parking, private elevator access directly into our surgical and injectable suites, and zero street visibility for high-profile privacy.
            </p>
            <div className="border border-stone-900 bg-stone-950/60 p-6 rounded-xl space-y-3 font-mono text-xs text-stone-400">
              <div className="text-white font-serif text-base italic">Aura MedSpa Pavilion</div>
              <div>120 Quiet Valley Road • Suite 400</div>
              <div>Saint Helena, CA 94574</div>
              <div className="pt-2 text-xs font-semibold tracking-wider text-gold-400 border-t border-stone-900">
                Direct Intake Desk: +1 (707) 555-AURA
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-stone-800 bg-stone-950 flex items-center justify-center p-8">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=85"
                alt="VIP Clinic Reception"
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />
              <div className="relative z-10 text-center space-y-3 bg-black/75 backdrop-blur-md p-6 rounded-2xl border border-stone-800">
                <ShieldCheck size={28} className="text-[#D4AF37] mx-auto" />
                <h3 className="font-serif text-lg text-white">Private Gated Access</h3>
                <p className="text-xs text-stone-400 max-w-sm font-light">
                  All arrivals are coordinated with our concierge desk to ensure 100% staggered entry and absolute anonymity.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="relative border-t border-stone-900 py-16 px-6 bg-[#070707] text-stone-400 text-xs font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <span className="font-serif text-sm tracking-widest text-[#D4AF37] uppercase font-semibold">
              AURA MEDSPA OS
            </span>
            <p className="text-xs font-semibold tracking-wider text-stone-600 mt-1 uppercase tracking-wider">
              Boutique Aesthetics Clinic &amp; VIP Treatment Booking Operating System
            </p>
          </div>
          <div className="flex gap-4 text-xs font-semibold tracking-wider text-stone-500 uppercase tracking-widest">
            <button onClick={() => setIsAdminPassModalOpen(true)} className="hover:text-stone-300">Admin Door</button>
            <span>•</span>
            <button onClick={() => setIsClientPortalOpen(true)} className="hover:text-stone-300">Client Portal</button>
            <span>•</span>
            <a href="#hero-atmosphere" className="hover:text-stone-300">Top</a>
          </div>
        </div>
      </footer>

      {/* ================= MODALS ================= */}

      {/* VIP Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        categories={categories}
        preSelectedTreatment={preSelectedTreatment}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Client Sovereign Portal Modal */}
      <ClientPortalModal
        isOpen={isClientPortalOpen}
        onClose={() => setIsClientPortalOpen(false)}
        appointments={appointments}
      />

      {/* 1-Click Ghost Factory Admin Passkey Gate Modal */}
      {isAdminPassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in font-sans">
          <div className="bg-[#0A0A0B] border border-gold-500/30 rounded-xl max-w-md w-full p-6 sm:p-8 space-y-6 text-left shadow-[0_0_50px_rgba(212,175,55,0.15)] relative">
            <button
              onClick={() => setIsAdminPassModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white"
            >
              <X size={18} />
            </button>
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest">
                <Sparkles size={11} />
                <span>Ghost Factory™ Passkey Door</span>
              </div>
              <h3 className="font-serif text-2xl font-light text-white tracking-tight">
                Aura MedSpa Control Room
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Enter the clinical director passkey to unlock the live patient queue, revenue analytics, appointment manager, and treatment catalog.
              </p>
            </div>

            <div className="p-3 bg-stone-950/80 border border-gold-500/20 rounded-lg">
              <div className="flex items-center justify-between font-mono text-xs font-semibold tracking-wider">
                <span className="uppercase text-stone-400">Demo Passcode:</span>
                <code className="font-bold text-[#D4AF37] bg-black/60 px-2 py-0.5 rounded border border-gold-500/30">medspa2026</code>
              </div>
              <button
                type="button"
                onClick={() => setAdminPassInput('medspa2026')}
                className="mt-2.5 w-full py-2 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 rounded text-xs font-semibold tracking-wider font-mono uppercase tracking-widest text-[#E5D3B3] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>⚡ Auto-Fill Demo Passcode</span>
              </button>
            </div>

            <form onSubmit={handleAdminUnlock} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold tracking-wider font-mono uppercase tracking-widest text-stone-400 mb-1.5">
                  Security Passcode
                </label>
                <input
                  type="password"
                  value={adminPassInput}
                  onChange={(e) => setAdminPassInput(e.target.value)}
                  placeholder="Enter medspa2026"
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 focus:border-[#D4AF37] rounded text-sm font-mono text-white outline-none transition-colors"
                  autoFocus
                />
              </div>

              <div className="flex gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setIsAdminPassModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 uppercase tracking-widest rounded transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-semibold uppercase tracking-widest rounded transition-all shadow-lg shadow-gold-500/20"
                >
                  Unlock OS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
