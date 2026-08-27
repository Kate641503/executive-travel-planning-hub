import React, { useState, useRef, useEffect } from 'react';
import { useTravel } from '../../context/TravelContext';
import {
  Search,
  Bell,
  Calendar,
  Menu,
  Plus,
  Sparkles,
  ChevronDown,
  CheckCheck,
  Building2,
  Plane,
  FileText,
  UserCheck,
  X
} from 'lucide-react';

interface TopNavProps {
  setMobileOpen: (open: boolean) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ setMobileOpen }) => {
  const {
    currentTrip,
    trips,
    selectedTripId,
    setSelectedTripId,
    setActiveTab,
    setIsCreateTripModalOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    searchQuery,
    setSearchQuery,
    selectTripAndNavigate
  } = useTravel();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isTripDropdownOpen, setIsTripDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const tripDropdownRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter(n => !n.read);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (tripDropdownRef.current && !tripDropdownRef.current.contains(event.target as Node)) {
        setIsTripDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search results
  const searchResults = searchQuery.trim()
    ? trips.filter(
        t =>
          t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.executiveName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.purpose.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header
        id="top-navigation"
        className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between gap-4"
      >
        {/* Left section: Mobile menu + Active Trip selector */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Active Trip Quick Selector */}
          <div className="relative" ref={tripDropdownRef}>
            <button
              id="active-trip-selector-btn"
              onClick={() => setIsTripDropdownOpen(!isTripDropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/90 text-left transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-sky-500"></div>
              <div className="hidden sm:block">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block leading-none">
                  Active Workspace
                </span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  {currentTrip ? `${currentTrip.code} • ${currentTrip.destination}` : 'Select Trip'}
                  <span className="text-[10px] font-normal text-slate-500">({currentTrip?.executiveName.split(' ')[0]})</span>
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {isTripDropdownOpen && (
              <div
                id="trip-selector-dropdown"
                className="absolute left-0 top-full mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95"
              >
                <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Active Executive Trip
                  </span>
                  <button
                    onClick={() => {
                      setIsTripDropdownOpen(false);
                      setIsCreateTripModalOpen(true);
                    }}
                    className="text-[11px] text-sky-600 font-semibold hover:underline"
                  >
                    + New
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto p-1 space-y-1">
                  {trips.map(trip => (
                    <button
                      key={trip.id}
                      onClick={() => {
                        setSelectedTripId(trip.id);
                        setIsTripDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        trip.id === selectedTripId
                          ? 'bg-sky-50 text-sky-950 font-semibold border border-sky-200/80'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{trip.code}</span>
                          <span className="text-slate-400 font-normal">|</span>
                          <span>{trip.destination}</span>
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                          {trip.executiveName} • {trip.dateDisplay}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          trip.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : trip.status === 'Planning'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {trip.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-md relative hidden md:block" ref={searchRef}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search trips, executives, destinations, flights..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown preview */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div
              id="search-results-dropdown"
              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 max-h-72 overflow-y-auto"
            >
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Matching Trips ({searchResults.length})
              </div>
              {searchResults.length === 0 ? (
                <p className="px-3 py-4 text-xs text-slate-500 text-center">No matching trips or executives found.</p>
              ) : (
                searchResults.map(trip => (
                  <button
                    key={trip.id}
                    onClick={() => {
                      selectTripAndNavigate(trip.id, 'itineraries');
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-sky-600">
                        {trip.code}: {trip.title}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {trip.executiveName} ({trip.purpose}) • {trip.dateDisplay}
                      </p>
                    </div>
                    <span className="text-[11px] text-sky-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Open →
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right Section: Date, Notifications, Actions, Catherine Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Current Date Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Thursday, Aug 27, 2026</span>
          </div>

          {/* Quick Action: Executive Brief */}
          <button
            id="quick-nav-brief-btn"
            onClick={() => setActiveTab('executive-brief')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Travel Brief</span>
          </button>

          {/* Quick Action: New Trip */}
          <button
            id="top-nav-new-trip-btn"
            onClick={() => setIsCreateTripModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Trip</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              id="notifications-toggle-btn"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse"></span>
              )}
            </button>

            {isNotifOpen && (
              <div
                id="notifications-popover"
                className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95"
              >
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Notifications & Alerts</span>
                    {unreadNotifs.length > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                        {unreadNotifs.length} new
                      </span>
                    )}
                  </div>
                  {unreadNotifs.length > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-sky-600 hover:text-sky-800 font-medium flex items-center gap-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark all read</span>
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.targetNav) {
                          setActiveTab(n.targetNav as any);
                          setIsNotifOpen(false);
                        }
                      }}
                      className={`p-3.5 text-xs transition-colors cursor-pointer hover:bg-slate-50 flex items-start gap-3 ${
                        !n.read ? 'bg-sky-50/40' : ''
                      }`}
                    >
                      <div className="mt-0.5">
                        {n.type === 'success' && <Building2 className="w-4 h-4 text-emerald-600" />}
                        {n.type === 'warning' && <FileText className="w-4 h-4 text-amber-600" />}
                        {n.type === 'info' && <Plane className="w-4 h-4 text-sky-600" />}
                        {n.type === 'urgent' && <UserCheck className="w-4 h-4 text-rose-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="font-semibold text-slate-900 truncate">{n.title}</p>
                          <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{n.message}</p>
                      </div>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5"></span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Catherine Profile Trigger Button */}
          <button
            id="catherine-profile-header-btn"
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 transition-colors"
            title="View Catherine Ngina Virtual Assistant Profile"
          >
            <div className="w-6 h-6 rounded-full bg-linear-to-br from-indigo-600 to-sky-600 text-white font-bold text-[10px] flex items-center justify-center">
              CN
            </div>
            <span className="text-xs font-semibold text-slate-800 hidden md:inline">Catherine Ngina</span>
          </button>
        </div>
      </header>

      {/* Catherine VA Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-600 to-sky-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
                  CN
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Catherine Ngina</h3>
                  <p className="text-xs font-semibold text-sky-700">Virtual Assistant • Executive Support Specialist</p>
                  <p className="text-xs text-slate-500 mt-0.5">Travel Coordination, Logistics & Boardroom Support</p>
                </div>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-slate-400 hover:text-slate-750 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3.5 pt-4 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <p className="font-bold text-slate-900 mb-1">Core Professional Competencies</p>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  <li>Executive flight research & lie-flat route optimization</li>
                  <li>Luxury boutique hotel vetting & corporate rate negotiation</li>
                  <li>Chauffeur, airport transfer & VIP meet-and-greet staging</li>
                  <li>Multi-stakeholder investor agenda & buffer management</li>
                  <li>Real-time risk mitigation & backup contingency planning</li>
                  <li>Consolidated executive briefing memos & expense reporting</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-700">
                <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Workspace</span>
                  <span className="font-semibold text-slate-900">Executive Travel Operations</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Portfolio Contact</span>
                  <span className="font-semibold text-slate-900">cngina57@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
