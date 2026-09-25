import React, { useState } from 'react';
import { X, Sparkles, Shield, Calendar, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { Appointment } from '../types';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  appointments
}) => {
  const [accessEmail, setAccessEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const clientAppointments = appointments.filter(a => 
    accessEmail ? a.clientEmail.toLowerCase() === accessEmail.toLowerCase() : true
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-xl bg-[#0D0D0C] border border-stone-800 rounded-xl overflow-hidden shadow-2xl text-stone-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-stone-800/80 bg-stone-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-[#B09E51]" />
            </div>
            <div>
              <h3 className="font-serif text-lg tracking-wide text-white">Client Sovereign Sanctuary Portal</h3>
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone-500">Confidential Post-Care & Appointment Ledger</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {!isLoggedIn ? (
            <div className="space-y-4">
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Enter your confidential client email to unlock your upcoming treatment times, custom provider post-care protocols, and personal skin medicine ledger.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="v.sterling@private.com"
                  value={accessEmail}
                  onChange={(e) => setAccessEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded text-xs text-stone-200 focus:border-stone-600 outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full py-2.5 bg-stone-100 hover:bg-white text-stone-950 text-xs font-mono uppercase tracking-widest font-semibold rounded transition-all cursor-pointer"
                >
                  Access Confidential Records
                </button>
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => { setAccessEmail('v.sterling@private.com'); setIsLoggedIn(true); }}
                    className="text-xs font-semibold tracking-wider font-mono text-gold-400 hover:text-gold-300 underline cursor-pointer"
                  >
                    Quick Demo: View VIP Client Record (Victoria Sterling)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5 animate-fade-in font-mono text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-stone-800">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-stone-500 uppercase">Authenticated Patient:</span>
                  <div className="text-sm font-sans font-medium text-white">{accessEmail || 'VIP Guest'}</div>
                </div>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-xs font-semibold tracking-wider text-stone-500 hover:text-stone-300 uppercase"
                >
                  Sign Out
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif text-sm font-normal text-stone-300">Upcoming Sanctuary Bookings</h4>
                {clientAppointments.length === 0 ? (
                  <p className="text-stone-500 text-xs py-2">No active bookings under this email.</p>
                ) : (
                  clientAppointments.map(a => (
                    <div key={a.id} className="p-3.5 bg-stone-950/70 border border-stone-800/80 rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-sans font-medium text-stone-200 text-sm">{a.treatment}</div>
                          <div className="text-xs font-semibold tracking-wider text-stone-400">{a.provider}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {a.status}
                        </span>
                      </div>
                      <div className="flex gap-4 text-stone-400 text-xs font-semibold pt-1 border-t border-stone-900">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {a.date}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {a.time}</span>
                        <span className="text-gold-400">${a.price}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Post Care Protocol */}
              <div className="p-4 bg-stone-950/40 border border-stone-800/60 rounded-lg space-y-2 text-stone-400">
                <div className="flex items-center gap-2 text-stone-300 text-xs font-sans font-medium">
                  <FileText size={14} className="text-gold-400" />
                  <span>Clinical Post-Care Covenant</span>
                </div>
                <ul className="text-xs font-semibold tracking-wider space-y-1 list-disc list-inside text-stone-400">
                  <li>Avoid strenuous cardiovascular activity or dry sauna for 24 hours post-neuromodulator.</li>
                  <li>Maintain upright posture for 4 hours; avoid massaging treated facial vectors.</li>
                  <li>Complimentary 14-day touch-up review included in your membership tier.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
