import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import {
  User,
  Shield,
  Award,
  CheckCircle2,
  Mail,
  Phone,
  Plane,
  Building2,
  Sliders,
  Bell,
  Sparkles,
  Save,
  Briefcase
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { showToast } = useTravel();

  const [vaName, setVaName] = useState('Catherine Ngina');
  const [vaRole, setVaRole] = useState('Executive Virtual Assistant | Travel Operations & Logistics Specialist');
  const [vaEmail, setVaEmail] = useState('catherine.ngina@execsupport.com');
  const [vaPhone, setVaPhone] = useState('+254 700 123 456');

  // Policy Settings
  const [businessClassThreshold, setBusinessClassThreshold] = useState('6+ Hours');
  const [hotelNightlyCap, setHotelNightlyCap] = useState('$500');
  const [autoBufferMinutes, setAutoBufferMinutes] = useState('30');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      'Preferences Saved',
      'Virtual Assistant profile & executive travel policies updated successfully.',
      'success'
    );
  };

  return (
    <div id="settings-portfolio-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Operations Configuration
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Virtual Assistant Portfolio</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 font-heading">
            Executive Assistant Profile & Travel Governance
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Operational standards, C-suite preference profiles, corporate travel policy guidelines, and VA credentials.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Catherine Ngina VA Portfolio Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white font-bold text-lg flex items-center justify-center border-2 border-slate-200 shrink-0 shadow-xs">
                CN
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-sky-700 block tracking-wider">
                  Lead Virtual Assistant
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading">Catherine Ngina</h3>
                <p className="text-xs text-slate-500">Executive Support & Travel Operations</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
              <strong>Professional Portfolio Summary:</strong> Specialized in end-to-end executive travel architecture, multi-leg international itineraries, C-suite calendar alignment, corporate risk mitigation, and seamless post-travel expense reconciliation.
            </div>

            {/* Core Competencies */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">Core VA Travel Capabilities</span>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  'Complex multi-destination flight routing & comparison',
                  'Executive hotel vetting (meeting proximity & corporate rates)',
                  'Chauffeur coordination & ground transit fail-safes',
                  'High-stakes meeting scheduling with automated buffer math',
                  'Travel contingency matrix & 24/7 hotline management',
                  '1-Page printable C-suite briefing generation',
                  'Post-trip expense ledger & executive follow-up tracking'
                ].map((skill, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Info */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono text-slate-800 font-medium">catherine.ngina@execsupport.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono text-slate-800 font-medium">+254 700 123 456 (24/7 Desk)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Corporate Travel Policy & Preferences (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Corporate Policy Controls */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Corporate Executive Travel Governance Rules
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Preset parameters applied automatically when researching flights and accommodations.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Flight Cabin Class Threshold
                  </label>
                  <select
                    value={businessClassThreshold}
                    onChange={e => setBusinessClassThreshold(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  >
                    <option value="6+ Hours">Business Class for flights &gt; 6 hrs</option>
                    <option value="All International">Business Class for all international flights</option>
                    <option value="All Flights">Business Class for all corporate travel</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Hotel Nightly Cap (Standard Cities)
                  </label>
                  <input
                    type="text"
                    value={hotelNightlyCap}
                    onChange={e => setHotelNightlyCap(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Default Meeting Transportation Buffer (Minutes)
                </label>
                <input
                  type="number"
                  value={autoBufferMinutes}
                  onChange={e => setAutoBufferMinutes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Automatically added between consecutive offsite meetings to protect executive punctuality.
                </span>
              </div>
            </div>
          </div>

          {/* Executive Traveler Loyalty & Preference Profiles */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Executive Profile: Daniel Carter (CEO)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Stored executive preferences & loyalty credentials</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Flight Preferences</span>
                <p className="font-bold text-slate-900 mt-1">Aisle / Front Cabin • Seat 3A</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Global Air Club #GA-9948201 (Diamond VIP)</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Hotel Preferences</span>
                <p className="font-bold text-slate-900 mt-1">High Floor • Quiet Room • King Suite</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Marriott Bonvoy Titanium #MB-4482019</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Ground Transit</span>
                <p className="font-bold text-slate-900 mt-1">Dedicated Chauffeur • Black SUV/Sedan</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Empire Chauffeur Corporate Account #EMP-902</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Dietary & Health</span>
                <p className="font-bold text-slate-900 mt-1">Gluten-Sensitive • Sparkling Water</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Special meal pre-ordered on all flights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
