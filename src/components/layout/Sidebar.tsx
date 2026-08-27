import React from 'react';
import { useTravel, NavTab } from '../../context/TravelContext';
import {
  LayoutDashboard,
  Compass,
  CalendarDays,
  Plane,
  Building2,
  Car,
  CalendarCheck,
  Wallet,
  CheckSquare,
  FileText,
  BarChart3,
  Settings,
  Sparkles,
  ShieldAlert,
  RotateCcw,
  Briefcase,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { activeTab, setActiveTab, resetToDefaultData, followUps } = useTravel();

  const pendingFollowUpsCount = followUps.filter(f => f.status !== 'Completed').length;

  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'trips', label: 'Trips', icon: Compass },
    { id: 'itineraries', label: 'Itineraries', icon: CalendarDays },
    { id: 'flight-research', label: 'Flight Research', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'transportation', label: 'Transportation', icon: Car },
    { id: 'meetings', label: 'Meetings', icon: CalendarCheck },
    { id: 'budget', label: 'Travel Budget', icon: Wallet },
    { id: 'follow-ups', label: 'Follow-Ups', icon: CheckSquare, badge: pendingFollowUpsCount },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          id="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Workspace Brand Header */}
        <div className="p-5 border-b border-slate-100 flex flex-col gap-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/10">
              <Briefcase className="w-5 h-5 text-sky-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold tracking-tight text-slate-900 truncate">
                Executive Travel Operations
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-medium text-emerald-700 tracking-wide">
                  Travel Desk • Active
                </span>
              </div>
            </div>
          </div>

          {/* Virtual Assistant Profile Card */}
          <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-sky-600 text-white font-semibold flex items-center justify-center text-sm shadow-inner shrink-0 ring-2 ring-white">
              CN
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Catherine Ngina</p>
              <p className="text-[11px] font-medium text-slate-500 truncate">Virtual Assistant</p>
              <p className="text-[10px] text-slate-400 truncate">Executive Support & Travel</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <div className="px-3 pb-1 pt-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Main Operations</p>
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-sky-400 text-slate-950 font-bold'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="px-3 pb-1 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Executive Deliverables</p>
          </div>

          <button
            id="nav-executive-brief"
            onClick={() => handleNavClick('executive-brief')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
              activeTab === 'executive-brief'
                ? 'bg-slate-900 text-white shadow-sm font-semibold'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sparkles
                className={`w-4 h-4 ${
                  activeTab === 'executive-brief' ? 'text-amber-300' : 'text-amber-500'
                }`}
              />
              <span className="font-semibold">Executive Travel Brief</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200/60 font-mono">
              Ready
            </span>
          </button>

          <button
            id="nav-contingency"
            onClick={() => handleNavClick('contingency')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
              activeTab === 'contingency'
                ? 'bg-slate-900 text-white shadow-sm font-semibold'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShieldAlert
                className={`w-4 h-4 ${
                  activeTab === 'contingency' ? 'text-rose-300' : 'text-rose-500'
                }`}
              />
              <span>Risk & Contingency</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Portfolio Footer & Reset */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/70 space-y-2.5">
          <div className="rounded-xl bg-white p-3 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-800">
              <span>Portfolio Demonstration</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
              Fictional executive data curated by <strong>Catherine Ngina</strong> to showcase VA travel logistics, flight & hotel benchmarking, and contingency protocols.
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              id="reset-demo-data-btn"
              onClick={resetToDefaultData}
              className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 hover:text-slate-800 px-2 py-1 rounded hover:bg-slate-200/60 transition-colors"
              title="Reset all sample data to default state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
            <a
              href="mailto:cngina57@gmail.com"
              className="flex items-center gap-1 text-[11px] font-semibold text-sky-700 hover:text-sky-900"
            >
              <span>Contact VA</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
