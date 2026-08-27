import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import {
  Download,
  Share2,
  Printer,
  Edit,
  Plane,
  Building2,
  Car,
  CalendarCheck,
  MapPin,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  Coffee,
  Briefcase
} from 'lucide-react';

export const ItineraryView: React.FC = () => {
  const {
    currentTrip,
    flights,
    hotels,
    transportation,
    meetings,
    dayItineraries,
    selectedTripId,
    setActiveTab,
    showToast
  } = useTravel();

  const [activeDay, setActiveDay] = useState<number>(1);

  if (!currentTrip) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-500 text-sm">No trip selected. Please select a trip from the dashboard.</p>
      </div>
    );
  }

  const tripFlights = flights.filter(f => f.tripId === currentTrip.id && f.selected);
  const selectedFlight = tripFlights.length > 0 ? tripFlights[0] : flights.find(f => f.tripId === currentTrip.id) || flights[0];

  const tripHotels = hotels.filter(h => h.tripId === currentTrip.id && h.selected);
  const selectedHotel = tripHotels.length > 0 ? tripHotels[0] : hotels.find(h => h.tripId === currentTrip.id) || hotels[0];

  const tripTransport = transportation.filter(t => t.tripId === currentTrip.id);
  const tripMeetings = meetings.filter(m => m.tripId === currentTrip.id);
  const days = dayItineraries[currentTrip.id] || dayItineraries['trip-204'] || [];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    showToast(
      'Itinerary Exported',
      `Full executive itinerary for ${currentTrip.code} generated in PDF format.`,
      'success'
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Brief Link Copied', 'Encrypted executive access link copied to clipboard.', 'info');
    } else {
      showToast('Itinerary Ready to Dispatch', 'Sharing link prepared for Daniel Carter.', 'info');
    }
  };

  return (
    <div id="executive-itinerary-page" className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Trip Status: {currentTrip.status}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono font-bold text-slate-600">{currentTrip.code}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 font-heading">
            Executive Business Itinerary
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Prepared & synchronized by Catherine Ngina • Live Travel Operations
          </p>
        </div>

        {/* Action buttons: Download, Edit, Share, Print */}
        <div className="flex items-center flex-wrap gap-2 shrink-0 no-print">
          <button
            id="itinerary-download-btn"
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>

          <button
            id="itinerary-share-btn"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share Brief</span>
          </button>

          <button
            id="itinerary-print-btn"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print</span>
          </button>

          <button
            id="itinerary-view-brief-btn"
            onClick={() => setActiveTab('executive-brief')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>1-Page Brief</span>
          </button>
        </div>
      </div>

      {/* Trip Meta Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 text-xs">
          <div className="pr-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Executive</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{currentTrip.executiveName}</p>
            <p className="text-[11px] text-slate-500">{currentTrip.executiveRole}</p>
          </div>

          <div className="pt-2 md:pt-0 md:px-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Destination</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{currentTrip.destination}, {currentTrip.country}</p>
            <p className="text-[11px] text-slate-500">Zone: {currentTrip.timeZone}</p>
          </div>

          <div className="pt-2 md:pt-0 md:px-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Dates</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{currentTrip.dateDisplay}</p>
            <p className="text-[11px] text-slate-500">Duration: 5 Days / 4 Nights</p>
          </div>

          <div className="pt-2 md:pt-0 md:pl-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Trip Purpose</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{currentTrip.purpose}</p>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3" />
              <span>Logistics Confirmed</span>
            </p>
          </div>
        </div>
      </div>

      {/* 4 Overview Pillar Blocks: Flight, Hotel, Transportation, Meetings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* FLIGHT BLOCK */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-50 text-sky-700">
                  <Plane className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Flight</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Selected
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Departure:</span>
                <span className="font-semibold text-slate-900">Nairobi (NBO)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Arrival:</span>
                <span className="font-semibold text-slate-900">New York (JFK)</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span className="text-slate-400">Depart:</span>
                <span className="font-semibold text-slate-800">Sep 8 • 10:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Arrive:</span>
                <span className="font-semibold text-slate-800">Sep 9 • 7:15 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Connection:</span>
                <span className="font-medium text-slate-700">1 stop (DOH)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('flight-research')}
            className="mt-3 w-full py-1.5 text-center text-[11px] font-semibold text-sky-700 hover:text-sky-900 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
          >
            Review Flight Comparison →
          </button>
        </div>

        {/* HOTEL BLOCK */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Hotel</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Shortlisted / Selected
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Hotel:</span>
                <span className="font-semibold text-slate-900 truncate max-w-32 text-right">
                  Manhattan Executive Hotel
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Check-in:</span>
                <span className="font-semibold text-slate-800">September 9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Check-out:</span>
                <span className="font-semibold text-slate-800">September 12</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span className="text-slate-400">Room:</span>
                <span className="font-semibold text-slate-800">Executive King Suite</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Proximity:</span>
                <span className="font-medium text-emerald-700">0.4 mi to meetings</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('hotels')}
            className="mt-3 w-full py-1.5 text-center text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            View Hotel Options →
          </button>
        </div>

        {/* TRANSPORTATION BLOCK */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                  <Car className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Transportation</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Confirmed
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Airport Transfer:</span>
                <span className="font-semibold text-slate-900">JFK Airport → Hotel</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Time:</span>
                <span className="font-semibold text-slate-800">Sep 9 • 8:30 AM</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span className="text-slate-400">Chauffeur:</span>
                <span className="font-semibold text-slate-800">Marcus Vance</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vehicle:</span>
                <span className="font-medium text-slate-700">Black Sedan / Escalade</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('transportation')}
            className="mt-3 w-full py-1.5 text-center text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            All Car Schedules →
          </button>
        </div>

        {/* KEY MEETINGS BLOCK */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Key Meetings</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                3 Sessions
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="p-1.5 rounded bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">10:00 AM • Investor Meeting</span>
                <span className="text-[11px] text-slate-500">Manhattan Office (375 Park Ave)</span>
              </div>
              <div className="p-1.5 rounded bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">2:00 PM • Partner Strategy</span>
                <span className="text-[11px] text-slate-500">Midtown Conference Center</span>
              </div>
              <div className="p-1.5 rounded bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">5:30 PM • Executive Dinner</span>
                <span className="text-[11px] text-slate-500">Hudson Restaurant (Private Cellar)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('meetings')}
            className="mt-3 w-full py-1.5 text-center text-[11px] font-semibold text-amber-800 hover:text-amber-950 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
          >
            Executive Calendar →
          </button>
        </div>
      </div>

      {/* Visual Day-by-Day Itinerary */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Chronological Program
            </span>
            <h3 className="text-base font-bold text-slate-900 font-heading">Day-by-Day Master Schedule</h3>
          </div>

          {/* Day Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {days.map(d => (
              <button
                key={d.dayNumber}
                id={`itinerary-day-tab-${d.dayNumber}`}
                onClick={() => setActiveDay(d.dayNumber)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeDay === d.dayNumber
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                DAY {d.dayNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Active Day Content Timeline */}
        {days
          .filter(d => d.dayNumber === activeDay)
          .map(d => (
            <div key={d.dayNumber} className="p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                    DAY {d.dayNumber} • {d.date}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">{d.theme}</h4>
                </div>
                <p className="text-xs text-slate-600 max-w-md sm:text-right">{d.summary}</p>
              </div>

              {/* Timeline Items */}
              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                {d.activities.map((act, index) => (
                  <div key={index} className="relative group">
                    {/* Timeline bullet dot */}
                    <div
                      className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full ring-4 ring-white ${
                        act.highlight
                          ? 'bg-sky-600 ring-sky-100'
                          : 'bg-slate-400'
                      }`}
                    ></div>

                    <div
                      className={`p-4 rounded-xl border text-xs transition-all ${
                        act.highlight
                          ? 'bg-sky-50/40 border-sky-200 shadow-2xs'
                          : 'bg-white hover:bg-slate-50/60 border-slate-200/80'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 text-xs px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                            {act.time}
                          </span>
                          <span className="font-bold text-slate-900 text-sm">{act.title}</span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{act.location}</span>
                        </span>
                      </div>

                      {act.details && (
                        <p className="mt-2 text-slate-600 text-xs leading-relaxed border-t border-slate-100 pt-2">
                          {act.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
