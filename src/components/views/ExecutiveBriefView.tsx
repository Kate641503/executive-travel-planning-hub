import React from 'react';
import { useTravel } from '../../context/TravelContext';
import {
  Sparkles,
  Printer,
  Download,
  Share2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Plane,
  Building2,
  Car,
  ShieldAlert,
  Sun,
  FileCheck,
  CheckCircle2,
  User,
  ExternalLink
} from 'lucide-react';

export const ExecutiveBriefView: React.FC = () => {
  const { currentTrip, showToast } = useTravel();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast(
      'Brief Exported',
      `Executive 1-page travel brief for ${currentTrip?.executiveName || 'Executive'} generated.`,
      'success'
    );
  };

  const handleShare = () => {
    showToast('Secure Link Generated', '1-Page brief link dispatched to Daniel Carter mobile.', 'info');
  };

  return (
    <div id="executive-brief-page" className="space-y-6">
      {/* Header and Print Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
              Executive Briefing Memo
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono font-bold text-slate-600">{currentTrip?.code}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 font-heading">
            Executive 1-Page Travel Brief
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Ultra-condensed operational summary prepared specifically for C-suite readability.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            id="brief-print-btn"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print 1-Pager</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>PDF Export</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Send to Phone</span>
          </button>
        </div>
      </div>

      {/* The Printable 1-Pager Executive Canvas */}
      <div
        id="printable-executive-brief"
        className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs max-w-5xl mx-auto space-y-6 text-slate-800 font-sans"
      >
        {/* Document Top Bar */}
        <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Executive Travel Intelligence
              </span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs font-semibold text-emerald-700">CONFIRMED ITINERARY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              {currentTrip?.destination}, {currentTrip?.country} • Executive Mission Brief
            </h1>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Prepared for: <strong>{currentTrip?.executiveName} ({currentTrip?.executiveRole})</strong> • Purpose: {currentTrip?.purpose}
            </p>
          </div>

          <div className="text-left sm:text-right font-mono text-xs text-slate-500">
            <span className="font-bold text-slate-900 block text-sm">{currentTrip?.code}</span>
            <span>{currentTrip?.dateDisplay}</span>
          </div>
        </div>

        {/* 2-Column Grid: Contacts & Flight/Hotel Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Key Emergency & Logistics Contacts */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Phone className="w-4 h-4 text-slate-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Key Travel Contacts & Hotlines
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900">Catherine Ngina (Lead Virtual Assistant)</span>
                  <p className="text-[11px] text-slate-500">24/7 Operations Desk</p>
                </div>
                <span className="font-mono text-xs font-semibold text-slate-800">+254 700 123 456</span>
              </div>

              <div className="flex justify-between items-center pt-1.5 border-t border-slate-200/60">
                <div>
                  <span className="font-bold text-slate-900">Marcus Vance (Dedicated NYC Chauffeur)</span>
                  <p className="text-[11px] text-slate-500">Empire Chauffeur Services</p>
                </div>
                <span className="font-mono text-xs font-semibold text-slate-800">+1 (917) 555-0149</span>
              </div>

              <div className="flex justify-between items-center pt-1.5 border-t border-slate-200/60">
                <div>
                  <span className="font-bold text-slate-900">Manhattan Executive Hotel Concierge</span>
                  <p className="text-[11px] text-slate-500">485 Lexington Ave Front Desk</p>
                </div>
                <span className="font-mono text-xs font-semibold text-slate-800">+1 (212) 555-0199</span>
              </div>

              <div className="flex justify-between items-center pt-1.5 border-t border-slate-200/60">
                <div>
                  <span className="font-bold text-slate-900">Corporate Global Travel Hotline (Amex)</span>
                  <p className="text-[11px] text-slate-500">24/7 Priority Emergency Rebooking</p>
                </div>
                <span className="font-mono text-xs font-semibold text-slate-800">+1 (800) 555-EXEC</span>
              </div>
            </div>
          </div>

          {/* Core Flight & Accommodation Highlights */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Building2 className="w-4 h-4 text-slate-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Core Travel & Accommodation Anchor
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Outbound Flight (Sep 8)</span>
                <p className="font-bold text-slate-900">
                  Global Air GA-482 • NBO (10:30 PM) → JFK (7:15 AM Sep 9)
                </p>
                <p className="text-[11px] text-slate-500">
                  Business Class • Seat 3A • PNR: <span className="font-mono font-bold text-slate-800">GA-NY204</span>
                </p>
              </div>

              <div className="pt-1.5 border-t border-slate-200/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Hotel & Residence</span>
                <p className="font-bold text-slate-900">Manhattan Executive Hotel (Executive King Suite)</p>
                <p className="text-[11px] text-slate-500">
                  Check-in: Sep 9 (Early check-in confirmed) • Check-out: Sep 12 (12:00 PM) • Conf #MEH-884920
                </p>
              </div>

              <div className="pt-1.5 border-t border-slate-200/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Return Flight (Sep 12)</span>
                <p className="font-bold text-slate-900">
                  Global Air GA-483 • JFK (8:40 PM) → NBO (6:10 PM Sep 13)
                </p>
                <p className="text-[11px] text-slate-500">Business Class • Seat 3A • Lounge: JFK T4 Flagship Lounge</p>
              </div>
            </div>
          </div>
        </div>

        {/* Master Day-by-Day Chronological Program */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Calendar className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              High-Level Daily Agenda & Critical Commitments
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              {
                day: 'DAY 1 • SEP 8-9',
                title: 'Transit & Arrival',
                items: [
                  '10:30 PM Dep NBO',
                  '7:15 AM Arr JFK',
                  '8:30 AM Chauffeur transfer to hotel',
                  '11:00 AM Hotel check-in & prep'
                ]
              },
              {
                day: 'DAY 2 • SEP 10',
                title: 'Investor Sessions',
                items: [
                  '10:00 AM Investor (375 Park Ave)',
                  '1:00 PM Transit buffer (30m)',
                  '2:00 PM Partner Summit (Midtown)',
                  '5:30 PM Dinner (Hudson)'
                ]
              },
              {
                day: 'DAY 3 • SEP 11',
                title: 'Fintech & Strategy',
                items: [
                  '11:00 AM Roundtable (Lexington)',
                  '2:00 PM Financial Review',
                  '3:30 PM Legal Counsel Review',
                  '6:30 PM Private Executive Drinks'
                ]
              },
              {
                day: 'DAY 4 • SEP 12',
                title: 'Departure & Wrap',
                items: [
                  '9:30 AM Keynote Breakfast',
                  '12:00 PM Hotel Checkout',
                  '5:30 PM Chauffeur pickup to JFK',
                  '8:40 PM GA-483 Dep to NBO'
                ]
              },
              {
                day: 'LOGISTICS INTEL',
                title: 'Destination Intel',
                items: [
                  'Weather: 22°C (72°F) Mild',
                  'Currency: USD ($)',
                  'Time: EDT (UTC-4)',
                  'Dress: Business Formal'
                ]
              }
            ].map((col, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
                  {col.day}
                </span>
                <h4 className="font-bold text-slate-900 mt-0.5 mb-2 text-xs">{col.title}</h4>
                <ul className="space-y-1 text-[11px] text-slate-600">
                  {col.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-slate-400 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contingency, Baggage, & Emergency Matrix */}
        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <h4 className="font-bold text-amber-950">Active Contingency & Travel Safety Safeguards</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px] text-slate-700">
            <div>
              <strong className="text-slate-900 block">Flight Disruption Protocol:</strong>
              In case of delay exceeding 120 mins, automatic switch authorized to Qatar Airways QR-701.
            </div>
            <div>
              <strong className="text-slate-900 block">Meeting Transit Buffers:</strong>
              30-minute buffers maintained between all midtown locations. Driver on continuous standby.
            </div>
            <div>
              <strong className="text-slate-900 block">Insurance & Health Policy:</strong>
              AXA Corporate Travel Shield Policy #AXA-884019. Medical concierge hotline active.
            </div>
          </div>
        </div>

        {/* Footer Sign-off */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>
            Prepared with precision by <strong>Catherine Ngina</strong>, Executive Virtual Assistant
          </span>
          <span className="font-mono text-[11px]">System Timestamp: 2026-08-27 • Version 3.4 Approved</span>
        </div>
      </div>
    </div>
  );
};
