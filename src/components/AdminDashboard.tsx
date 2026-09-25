import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  Plus, 
  LogOut, 
  ShieldCheck,
  Stethoscope,
  Building2
} from 'lucide-react';
import { Appointment, TreatmentCategory } from '../types';

interface AdminDashboardProps {
  appointments: Appointment[];
  categories: TreatmentCategory[];
  onUpdateStatus: (id: string, newStatus: Appointment['status']) => void;
  onAddTreatment: (categoryName: string, name: string, price: number, duration: string) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  appointments,
  categories,
  onUpdateStatus,
  onAddTreatment,
  onClose
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');
  const [search, setSearch] = useState('');
  const [isAddingTreatment, setIsAddingTreatment] = useState(false);
  const [newTreatCategory, setNewTreatCategory] = useState(categories[0]?.name || '');
  const [newTreatName, setNewTreatName] = useState('');
  const [newTreatPrice, setNewTreatPrice] = useState(450);
  const [newTreatDuration, setNewTreatDuration] = useState('60 Min');

  // Filtered Appointments
  const filteredAppointments = appointments.filter(a => {
    const matchFilter = filter === 'all' ? true : a.status === filter;
    const matchSearch = search.trim() === '' ? true : 
      a.clientName.toLowerCase().includes(search.toLowerCase()) ||
      a.treatment.toLowerCase().includes(search.toLowerCase()) ||
      a.clientEmail.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalRevenue = appointments.reduce((sum, a) => sum + (a.status !== 'cancelled' ? a.price : 0), 84200);

  const handleCreateTreatment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTreatName) return;
    onAddTreatment(newTreatCategory, newTreatName, Number(newTreatPrice), newTreatDuration);
    setNewTreatName('');
    setIsAddingTreatment(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-stone-200 p-4 sm:p-8 animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-stone-900">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest">
                Managing Director Bypass (medspa2026)
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider font-mono text-emerald-400">Live Operating Room</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-wide mt-1.5">
              AURA MEDSPA <span className="text-stone-500 italic font-normal text-xl sm:text-2xl">Clinical Operations Room</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddingTreatment(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded text-xs font-mono uppercase tracking-wider text-stone-300 hover:text-white transition-all cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Procedure</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-5 py-3 min-h-[44px] bg-stone-100 hover:bg-white text-stone-950 font-semibold rounded text-base font-semibold min-h-[44px] font-mono uppercase tracking-wider transition-all cursor-pointer"
            >
              <LogOut size={14} />
              <span>Exit to Patient View</span>
            </button>
          </div>
        </div>

        {/* Clinical KPI Metric Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-stone-950/80 border border-stone-900 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-stone-500 text-xs font-mono uppercase tracking-wider">
              <span>Monthly Gross Revenue</span>
              <DollarSign size={14} className="text-[#D4AF37]" />
            </div>
            <div className="text-2xl font-serif text-white font-light mt-1">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold tracking-wider font-mono text-emerald-400">
              <TrendingUp size={11} />
              <span>+18.4% vs previous clinical cohort</span>
            </div>
          </div>

          <div className="p-5 bg-stone-950/80 border border-stone-900 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-stone-500 text-xs font-mono uppercase tracking-wider">
              <span>Active VIP Memberships</span>
              <Users size={14} className="text-stone-400" />
            </div>
            <div className="text-2xl font-serif text-white font-light mt-1">
              142 Clients
            </div>
            <div className="text-xs font-semibold tracking-wider font-mono text-stone-500">
              Tier 1 Radiance & Tier 2 Longevity
            </div>
          </div>

          <div className="p-5 bg-stone-950/80 border border-stone-900 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-stone-500 text-xs font-mono uppercase tracking-wider">
              <span>Appointments in Queue</span>
              <Calendar size={14} className="text-stone-400" />
            </div>
            <div className="text-2xl font-serif text-white font-light mt-1">
              {appointments.length} Total
            </div>
            <div className="text-xs font-semibold tracking-wider font-mono text-gold-400">
              {appointments.filter(a => a.status === 'confirmed').length} Confirmed • {appointments.filter(a => a.status === 'pending').length} Pending Review
            </div>
          </div>

          <div className="p-5 bg-stone-950/80 border border-stone-900 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-stone-500 text-xs font-mono uppercase tracking-wider">
              <span>Avg Patient Ticket</span>
              <Stethoscope size={14} className="text-stone-400" />
            </div>
            <div className="text-2xl font-serif text-white font-light mt-1">
              $640.00
            </div>
            <div className="text-xs font-semibold tracking-wider font-mono text-stone-500">
              High-intent aesthetic neuromodulators
            </div>
          </div>
        </div>

        {/* Appointment Management Table & Controls */}
        <div className="bg-stone-950/90 border border-stone-900 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="font-serif text-xl font-light text-white">Patient Intake & Treatment Queue</h2>
              <p className="text-xs text-stone-500 font-mono mt-0.5">Live database sync active • Supabase PostgreSQL</p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search client, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-stone-900/80 border border-stone-800 rounded text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-stone-700"
                />
              </div>

              <div className="flex border border-stone-800 rounded p-0.5 bg-stone-900/40 text-xs font-semibold tracking-wider font-mono">
                {(['all', 'confirmed', 'pending', 'completed'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`px-2.5 py-1 rounded uppercase tracking-wider transition-colors ${filter === t ? 'bg-stone-800 text-white font-semibold' : 'text-stone-500 hover:text-stone-300'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-stone-900 text-xs font-semibold tracking-wider text-stone-500 uppercase tracking-widest">
                  <th className="pb-3 font-normal">Patient Name</th>
                  <th className="pb-3 font-normal">Treatment Procedure</th>
                  <th className="pb-3 font-normal">Provider</th>
                  <th className="pb-3 font-normal">Date & Time</th>
                  <th className="pb-3 font-normal">Rate</th>
                  <th className="pb-3 font-normal">Status</th>
                  <th className="pb-3 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-900/60">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-stone-600 font-mono text-xs">
                      No appointments matching current filters.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map(appt => (
                    <tr key={appt.id} className="hover:bg-stone-900/30 transition-colors">
                      <td className="py-3.5 pr-4">
                        <div className="font-sans font-medium text-stone-200">{appt.clientName}</div>
                        <div className="text-xs font-semibold tracking-wider text-stone-500">{appt.clientEmail} • {appt.clientPhone}</div>
                        {appt.notes && (
                          <div className="text-[9px] text-[#D4AF37]/80 italic mt-0.5 max-w-xs truncate">
                            Note: {appt.notes}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 pr-4">
                        <div className="text-stone-300 font-sans">{appt.treatment}</div>
                        <div className="text-[9px] text-stone-600 uppercase">{appt.category}</div>
                      </td>
                      <td className="py-3.5 pr-4 text-stone-400 font-sans text-xs">
                        {appt.provider}
                      </td>
                      <td className="py-3.5 pr-4 text-stone-300">
                        <div>{appt.date}</div>
                        <div className="text-xs font-semibold tracking-wider text-stone-500">{appt.time}</div>
                      </td>
                      <td className="py-3.5 pr-4 font-semibold text-stone-200">
                        ${appt.price}
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold ${
                          appt.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                          appt.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                          appt.status === 'completed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right space-x-1">
                        {appt.status === 'pending' && (
                          <button
                            onClick={() => onUpdateStatus(appt.id, 'confirmed')}
                            className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded text-[9px] uppercase tracking-wider transition-all"
                            title="Confirm Appointment"
                          >
                            Confirm
                          </button>
                        )}
                        {appt.status === 'confirmed' && (
                          <button
                            onClick={() => onUpdateStatus(appt.id, 'completed')}
                            className="px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 rounded text-[9px] uppercase tracking-wider transition-all"
                            title="Mark Completed"
                          >
                            Complete
                          </button>
                        )}
                        {appt.status !== 'cancelled' && (
                          <button
                            onClick={() => onUpdateStatus(appt.id, 'cancelled')}
                            className="px-2 py-1 bg-stone-900 hover:bg-rose-950 text-stone-500 hover:text-rose-400 border border-stone-800 rounded text-[9px] uppercase tracking-wider transition-all"
                            title="Cancel Session"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Add New Treatment Procedure */}
        {isAddingTreatment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#0D0D0C] border border-stone-800 rounded-xl max-w-md w-full p-6 space-y-5 text-stone-200">
              <div className="flex justify-between items-center border-b border-stone-800 pb-3">
                <h3 className="font-serif text-lg text-white">Add Clinical Treatment</h3>
                <button onClick={() => setIsAddingTreatment(false)} className="text-stone-500 hover:text-white">
                  <XCircle size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateTreatment} className="space-y-4 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-stone-400 uppercase tracking-widest text-[9px]">Department</label>
                  <select
                    value={newTreatCategory}
                    onChange={(e) => setNewTreatCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-stone-200"
                  >
                    {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 uppercase tracking-widest text-[9px]">Procedure Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sculptra Biostimulator 2 Vials"
                    value={newTreatName}
                    onChange={(e) => setNewTreatName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-stone-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-stone-400 uppercase tracking-widest text-[9px]">Fee ($ USD)</label>
                    <input
                      type="number"
                      value={newTreatPrice}
                      onChange={(e) => setNewTreatPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-stone-200"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-stone-400 uppercase tracking-widest text-[9px]">Session Duration</label>
                    <input
                      type="text"
                      value={newTreatDuration}
                      onChange={(e) => setNewTreatDuration(e.target.value)}
                      placeholder="e.g. 75 Min"
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded text-stone-200"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingTreatment(false)}
                    className="flex-1 py-2 bg-stone-900 border border-stone-800 rounded text-stone-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-stone-100 hover:bg-white text-stone-950 font-semibold rounded"
                  >
                    Save Procedure
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
