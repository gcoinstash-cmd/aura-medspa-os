import React, { useState } from 'react';
import { X, Sparkles, Calendar, Clock, User, Mail, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TreatmentCategory, Appointment } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: TreatmentCategory[];
  preSelectedTreatment?: string;
  onBookingConfirmed: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  categories,
  preSelectedTreatment,
  onBookingConfirmed
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.name || '');
  const [selectedTreatment, setSelectedTreatment] = useState(preSelectedTreatment || categories[0]?.items[0]?.name || '');
  const [provider, setProvider] = useState('Dr. Elena Vance, NP (Clinical Director)');
  const [date, setDate] = useState('2026-09-25');
  const [time, setTime] = useState('11:00 AM');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentCategoryObj = categories.find(c => c.name === selectedCategory) || categories[0];
  const currentTreatmentObj = currentCategoryObj?.items.find(i => i.name === selectedTreatment) || currentCategoryObj?.items[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    const newAppt: Appointment = {
      id: `appt-${Date.now().toString().slice(-4)}`,
      clientName,
      clientEmail,
      clientPhone: clientPhone || '+1 (555) 019-2834',
      treatment: currentTreatmentObj?.name || selectedTreatment,
      category: selectedCategory,
      provider,
      date,
      time,
      price: currentTreatmentObj?.price || 450,
      status: 'confirmed',
      notes,
      createdAt: new Date().toISOString()
    };

    onBookingConfirmed(newAppt);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0D0D0C] border border-stone-800 rounded-xl overflow-hidden shadow-2xl text-stone-200">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-stone-800/80 bg-stone-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#B09E51]" />
            </div>
            <div>
              <h3 className="font-serif text-lg tracking-wide text-white">VIP Sanctuary Reservation</h3>
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone-500">Aura MedSpa • Private Clinical Intake</span>
            </div>
          </div>
          <button
            onClick={() => { setIsSuccess(false); onClose(); }}
            className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 sm:p-12 text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-2xl text-white">Sanctuary Session Reserved</h4>
              <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                Your private treatment has been confirmed with <strong className="text-stone-200">{provider}</strong> for <strong className="text-stone-200">{date} at {time}</strong>.
              </p>
            </div>
            <div className="p-4 bg-stone-950/60 border border-stone-800/80 rounded-lg max-w-md mx-auto text-left font-mono text-xs font-semibold space-y-1.5">
              <div className="flex justify-between text-stone-400">
                <span>Treatment:</span>
                <span className="text-stone-200">{selectedTreatment}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Client:</span>
                <span className="text-stone-200">{clientName}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Confirmation ID:</span>
                <span className="text-gold-400">AURA-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
            </div>
            <button
              onClick={() => { setIsSuccess(false); onClose(); }}
              className="px-6 py-2.5 bg-stone-100 text-stone-950 text-xs font-mono uppercase tracking-widest font-semibold rounded hover:bg-white transition-all cursor-pointer"
            >
              Return to Sanctuary
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* Step 1: Category & Treatment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold tracking-wider font-mono uppercase tracking-widest text-stone-400">Clinical Focus</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    const cat = categories.find(c => c.name === e.target.value);
                    if (cat && cat.items.length > 0) setSelectedTreatment(cat.items[0].name);
                  }}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-xs text-stone-200 focus:border-stone-600 outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold tracking-wider font-mono uppercase tracking-widest text-stone-400">Treatment Procedure</label>
                <select
                  value={selectedTreatment}
                  onChange={(e) => setSelectedTreatment(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-xs text-stone-200 focus:border-stone-600 outline-none"
                >
                  {currentCategoryObj.items.map((i) => (
                    <option key={i.id} value={i.name}>{i.name} ({i.duration} • ${i.price})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Provider and Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold tracking-wider font-mono uppercase tracking-widest text-stone-400">Aesthetic Provider</label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-xs text-stone-200 focus:border-stone-600 outline-none"
                >
                  <option value="Dr. Elena Vance, NP (Clinical Director)">Dr. Elena Vance, NP</option>
                  <option value="Sarah Lin, Master Aesthetician">Sarah Lin, Master RN</option>
                  <option value="Dr. Julian Hayes, MD (Cosmetic Surgeon)">Dr. Julian Hayes, MD</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold tracking-wider font-mono uppercase tracking-widest text-stone-400">Preferred Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-xs text-stone-200 focus:border-stone-600 outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold tracking-wider font-mono uppercase tracking-widest text-stone-400">Time Window</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-xs text-stone-200 focus:border-stone-600 outline-none"
                >
                  <option value="9:30 AM">9:30 AM (Morning Calm)</option>
                  <option value="11:00 AM">11:00 AM (Midday Focus)</option>
                  <option value="2:00 PM">2:00 PM (Afternoon Solitude)</option>
                  <option value="4:30 PM">4:30 PM (Late Session)</option>
                  <option value="6:30 PM">6:30 PM (VIP Evening Lounge)</option>
                </select>
              </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-900">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold tracking-wider font-mono uppercase tracking-widest text-stone-400">Client Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Sinclair"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-xs text-stone-200 focus:border-stone-600 outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold tracking-wider font-mono uppercase tracking-widest text-stone-400">Confidential Email</label>
                <input
                  type="email"
                  placeholder="eleanor@luxury.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-xs text-stone-200 focus:border-stone-600 outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold tracking-wider font-mono uppercase tracking-widest text-stone-400">Direct Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-xs text-stone-200 focus:border-stone-600 outline-none"
                />
              </div>
            </div>

            {/* Private Notes */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold tracking-wider font-mono uppercase tracking-widest text-stone-400">Custom Clinical Notes / Sensitivities</label>
              <textarea
                rows={2}
                placeholder="Topical numbing preferences, skin allergies, pre-event timeline..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-xs text-stone-200 focus:border-stone-600 outline-none"
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-900">
              <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold tracking-wider font-mono">
                <ShieldCheck size={14} className="text-stone-400" />
                <span>Strict HIPAA & VIP Confidentiality</span>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 min-h-[44px] text-base font-semibold min-h-[44px] font-mono uppercase tracking-wider text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-100 hover:bg-white text-stone-950 text-base font-semibold min-h-[44px] font-mono uppercase tracking-widest font-semibold rounded shadow-lg transition-all cursor-pointer"
                >
                  Reserve Session (${currentTreatmentObj?.price || 450})
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
