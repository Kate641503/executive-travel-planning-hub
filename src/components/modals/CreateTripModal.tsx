import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { TripStatus } from '../../types';
import { X, Plane, Calendar, User, MapPin, DollarSign, Sparkles } from 'lucide-react';

export const CreateTripModal: React.FC = () => {
  const { isCreateTripModalOpen, setIsCreateTripModalOpen, addTrip, showToast } = useTravel();

  const [code, setCode] = useState(`TRIP-${Math.floor(207 + Math.random() * 50)}`);
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [country, setCountry] = useState('');
  const [executiveName, setExecutiveName] = useState('Daniel Carter');
  const [executiveRole, setExecutiveRole] = useState('Chief Executive Officer');
  const [purpose, setPurpose] = useState('Investor Meetings');
  const [startDate, setStartDate] = useState('2026-10-15');
  const [endDate, setEndDate] = useState('2026-10-19');
  const [dateDisplay, setDateDisplay] = useState('October 15–19, 2026');
  const [budgetTotal, setBudgetTotal] = useState('6500');
  const [nextAction, setNextAction] = useState('Initiate flight & hotel research');
  const [status, setStatus] = useState<TripStatus>('Planning');

  if (!isCreateTripModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !destination.trim()) {
      showToast('Missing Fields', 'Please specify trip title and destination.', 'warning');
      return;
    }

    const newTripId = `trip-${Date.now()}`;

    addTrip({
      id: newTripId,
      code,
      title,
      destination,
      country: country || 'United States',
      executiveName,
      executiveRole,
      purpose,
      startDate,
      endDate,
      dateDisplay: dateDisplay || `${startDate} to ${endDate}`,
      status,
      budgetTotal: Number(budgetTotal) || 6000,
      budgetSpent: 0,
      nextAction: nextAction || 'Research initial flight options',
      timeZone: 'EDT',
      primaryHotel: 'Pending Selection',
      primaryFlight: 'Pending Selection',
      contingencyStatus: 'Standard Buffer Active'
    });

    setIsCreateTripModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Trip Initiation Wizard
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Plan New Executive Trip</h3>
          </div>
          <button
            onClick={() => setIsCreateTripModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Trip Reference Code</label>
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Initial Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as TripStatus)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="Researching">Researching</option>
                <option value="Planning">Planning</option>
                <option value="Confirmed">Confirmed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Trip Title</label>
            <input
              type="text"
              placeholder="e.g. San Francisco Venture Summit"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Destination City</label>
              <input
                type="text"
                placeholder="e.g. San Francisco"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Country</label>
              <input
                type="text"
                placeholder="e.g. USA"
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Executive Traveler</label>
              <input
                type="text"
                value={executiveName}
                onChange={e => setExecutiveName(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Purpose of Travel</label>
              <select
                value={purpose}
                onChange={e => setPurpose(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
              >
                <option value="Investor Meetings">Investor Meetings</option>
                <option value="Industry Conference">Industry Conference</option>
                <option value="Partnership Meetings">Partnership Meetings</option>
                <option value="Board Retreat">Board Retreat</option>
                <option value="Site Inspection">Site Inspection</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Dates Display</label>
              <input
                type="text"
                value={dateDisplay}
                onChange={e => setDateDisplay(e.target.value)}
                placeholder="e.g. October 15–19, 2026"
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Approved Budget ($ USD)</label>
              <input
                type="number"
                value={budgetTotal}
                onChange={e => setBudgetTotal(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Next Action Required</label>
            <input
              type="text"
              value={nextAction}
              onChange={e => setNextAction(e.target.value)}
              placeholder="e.g. Shortlist 3 business class flight routes"
              className="w-full p-2 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="mt-6 flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateTripModalOpen(false)}
              className="px-3.5 py-2 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-xs"
            >
              Create Trip Workspace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
