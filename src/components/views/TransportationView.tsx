import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { TransportationItem } from '../../types';
import {
  Car,
  Plane,
  Train,
  MapPin,
  Clock,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  X
} from 'lucide-react';

export const TransportationView: React.FC = () => {
  const {
    transportation,
    currentTrip,
    addTransportation,
    updateTransportation,
    deleteTransportation,
    showToast
  } = useTravel();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDriverModal, setSelectedDriverModal] = useState<TransportationItem | null>(null);

  // Form state for adding new transport
  const [formType, setFormType] = useState<TransportationItem['type']>('Car Service');
  const [formTitle, setFormTitle] = useState('');
  const [formFrom, setFormFrom] = useState('');
  const [formTo, setFormTo] = useState('');
  const [formDate, setFormDate] = useState('September 10, 2026');
  const [formTime, setFormTime] = useState('1:00 PM');
  const [formVehicle, setFormVehicle] = useState('Executive Black Sedan');
  const [formDriver, setFormDriver] = useState('Marcus Vance');
  const [formDriverPhone, setFormDriverPhone] = useState('+1 (917) 555-0149');
  const [formCost, setFormCost] = useState('110');

  const tripTransport = transportation.filter(t => t.tripId === (currentTrip?.id || 'trip-204'));

  const filteredItems = tripTransport.filter(item => {
    if (activeCategory === 'ALL') return true;
    return item.type === activeCategory;
  });

  const handleCreateTransport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formFrom.trim() || !formTo.trim()) {
      showToast('Missing Fields', 'Please complete route and title.', 'warning');
      return;
    }

    addTransportation({
      tripId: currentTrip?.id || 'trip-204',
      type: formType,
      title: formTitle,
      fromLocation: formFrom,
      toLocation: formTo,
      date: formDate,
      time: formTime,
      vehicle: formVehicle,
      driverName: formDriver,
      driverPhone: formDriverPhone,
      status: 'Confirmed',
      confirmationCode: `CHAUFFEUR-${Math.floor(1000 + Math.random() * 9000)}`,
      cost: Number(formCost) || 95,
      notes: 'Arranged via Executive Travel Desk.'
    });

    setIsAddModalOpen(false);
    // Reset fields
    setFormTitle('');
    setFormFrom('');
    setFormTo('');
  };

  return (
    <div id="transportation-coordination-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Ground & Airport Logistics
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono font-bold text-slate-600">{currentTrip?.code} ({currentTrip?.destination})</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 font-heading">
            Executive Transportation Coordination
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Dedicated chauffeur dispatch, flight-tracking meet-and-greet services, and intra-city transfer schedules.
          </p>
        </div>

        <button
          id="book-transport-btn"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Car Booking</span>
        </button>
      </div>

      {/* Categories Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'ALL', label: 'All Transfers', icon: Car },
          { id: 'Airport Transfer', label: 'Airport Transfers', icon: Plane },
          { id: 'Car Service', label: 'Car Services', icon: Car },
          { id: 'Rail', label: 'Rail', icon: Train },
          { id: 'Local Transportation', label: 'Local Transportation', icon: MapPin }
        ].map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              id={`cat-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Transportation Cards / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            id={`transport-item-${item.id}`}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                      {item.type}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h4>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    item.status === 'Confirmed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'Scheduled'
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Route & Times */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Date & Time</span>
                    <span className="font-bold text-slate-900">{item.date}</span>
                    <span className="block text-[11px] text-slate-500 font-mono">{item.time}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Confirmation</span>
                    <span className="font-mono font-bold text-slate-900 text-[11px]">
                      {item.confirmationCode}
                    </span>
                    <span className="block text-[10px] text-slate-500">${item.cost} Pre-paid</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Pickup Location</span>
                      <p className="font-semibold text-slate-800 leading-tight">{item.fromLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Drop-off Destination</span>
                      <p className="font-semibold text-slate-800 leading-tight">{item.toLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Chauffeur and Vehicle Details */}
                <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between mt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Assigned Chauffeur</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.driverName || 'Dedicated Chauffeur'}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 block">{item.vehicle}</span>
                  </div>
                  {item.driverPhone && (
                    <button
                      onClick={() => setSelectedDriverModal(item)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1 shadow-2xs"
                    >
                      <Phone className="w-3 h-3 text-emerald-600" />
                      <span>Contact</span>
                    </button>
                  )}
                </div>

                {item.notes && (
                  <p className="text-[11px] text-slate-500 italic mt-1">{item.notes}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const nextStatus = item.status === 'Confirmed' ? 'Scheduled' : 'Confirmed';
                    updateTransportation(item.id, { status: nextStatus });
                  }}
                  className="text-[11px] text-sky-700 font-semibold hover:underline"
                >
                  Toggle Status ({item.status === 'Confirmed' ? 'Mark Scheduled' : 'Mark Confirmed'})
                </button>
              </div>

              <button
                onClick={() => deleteTransportation(item.id)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                title="Remove transportation booking"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Driver Contact Modal */}
      {selectedDriverModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto mb-3">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{selectedDriverModal.driverName}</h3>
              <p className="text-xs text-slate-500">Executive Chauffeur • Empire Services NYC</p>
              <div className="my-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Direct Mobile Hotline</span>
                <span className="font-mono text-base font-bold text-slate-900 block mt-0.5">
                  {selectedDriverModal.driverPhone}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                  ✓ Flight Tracking Active (GPS Monitored)
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedDriverModal(null)}
              className="w-full py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* Add Car Booking Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Book Executive Transportation</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTransport} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Transfer Type</label>
                <select
                  value={formType}
                  onChange={e => setFormType(e.target.value as any)}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
                >
                  <option value="Airport Transfer">Airport Transfer</option>
                  <option value="Car Service">Car Service</option>
                  <option value="Rail">Rail</option>
                  <option value="Local Transportation">Local Transportation</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Booking Title / Segment</label>
                <input
                  type="text"
                  placeholder="e.g. Hotel → Investor Dinner Transfer"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Pickup Location</label>
                  <input
                    type="text"
                    placeholder="e.g. 485 Lexington Ave"
                    value={formFrom}
                    onChange={e => setFormFrom(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Drop-off Destination</label>
                  <input
                    type="text"
                    placeholder="e.g. Hudson Restaurant"
                    value={formTo}
                    onChange={e => setFormTo(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Date</label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={e => setFormDate(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Time</label>
                  <input
                    type="text"
                    value={formTime}
                    onChange={e => setFormTime(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Vehicle</label>
                  <input
                    type="text"
                    value={formVehicle}
                    onChange={e => setFormVehicle(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Driver</label>
                  <input
                    type="text"
                    value={formDriver}
                    onChange={e => setFormDriver(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Cost ($)</label>
                  <input
                    type="number"
                    value={formCost}
                    onChange={e => setFormCost(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800"
                >
                  Confirm Transportation Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
