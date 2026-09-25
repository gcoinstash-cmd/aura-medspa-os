/**
 * AURA MEDSPA — Core Type Definitions
 */

export interface TreatmentItem {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: number;
  description: string;
  popular?: boolean;
}

export interface TreatmentCategory {
  name: string;
  tagline: string;
  items: TreatmentItem[];
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  treatment: string;
  category: string;
  provider: string;
  date: string;
  time: string;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface ClinicalMetrics {
  monthlyRevenue: number;
  activeMemberships: number;
  todaySessions: number;
  vipWaitlist: number;
}
