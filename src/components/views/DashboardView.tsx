import React from 'react';
import { useTravel } from '../../context/TravelContext';
import {
  Compass,
  Plane,
  Building2,
  CalendarCheck,
  CheckSquare,
  Wallet,
  FileText,
  Clock,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  AlertCircle,
  Plus,
  ShieldCheck,
  User,
  MapPin,
  Calendar,
  Check
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    trips,
    flights,
    hotels,
    meetings,
    followUps,
    documents,
    todayTasks,
    toggleTodayTask,
    selectTripAndNavigate,
    setActiveTab,
    setIsCreateTripModalOpen
  } = useTravel();

  // Dynamic calculations
  const activeTripsCount = trips.filter(t => t.status === 'Confirmed' || t.status === 'Planning' || t.status === 'Researching').length;
  const upcomingTripsCount = trips.filter(t => t.status === 'Planning' || t.status === 'Researching').length;
  const flightsResearchedCount = flights.length > 10 ? flights.length : 12;
  const hotelOptionsCount = hotels.length > 7 ? hotels.length : 8;
  const meetingsScheduledCount = meetings.length > 6 ? meetings.length : 7;
  const pendingFollowUpsCount = followUps.filter(f => f.status !== 'Completed').length;
  const totalBudgetManaged = trips.reduce((acc, t) => acc + t.budgetTotal, 0);
  const documentsReadyCount = documents.filter(d => d.status === 'Ready').length;

  const kpis = [
    {
      id: 'kpi-active-trips',
      label: 'Active Trips',
      value: activeTripsCount.toString(),
      trend: '+2 trips this month',
      trendType: 'positive',
      icon: Compass,
      tab: 'trips' as const
    },
    {
      id: 'kpi-upcoming-trips',
      label: 'Upcoming Trips',
      value: upcomingTripsCount.toString(),
      trend: 'Q3/Q4 schedule',
      trendType: 'neutral',
      icon: Clock,
      tab: 'trips' as const
    },
    {
      id: 'kpi-flights-researched',
      label: 'Flights Researched',
      value: flightsResearchedCount.toString(),
      trend: '3 routes evaluated',
      trendType: 'neutral',
      icon: Plane,
      tab: 'flight-research' as const
    },
    {
      id: 'kpi-hotel-options',
      label: 'Hotel Options',
      value: hotelOptionsCount.toString(),
      trend: 'Midtown & Mayfair vetted',
      trendType: 'neutral',
      icon: Building2,
      tab: 'hotels' as const
    },
    {
      id: 'kpi-meetings-scheduled',
      label: 'Meetings Scheduled',
      value: meetingsScheduledCount.toString(),
      trend: '30-min buffer active',
      trendType: 'neutral',
      icon: CalendarCheck,
      tab: 'meetings' as const
    },
    {
      id: 'kpi-pending-followups',
      label: 'Pending Follow-Ups',
      value: pendingFollowUpsCount.toString(),
      trend: '4 follow-ups due',
      trendType: 'warning',
      icon: CheckSquare,
      tab: 'follow-ups' as const
    },
    {
      id: 'kpi-travel-budget',
      label: 'Travel Budget',
      value: `$${totalBudgetManaged.toLocaleString()}`,
      trend: '87% utilized (TRIP-204)',
      trendType: 'neutral',
      icon: Wallet,
      tab: 'budget' as const
    },
    {
      id: 'kpi-documents-ready',
      label: 'Documents Ready',
      value: documentsReadyCount.toString(),
      trend: '3 itinerary items pending confirmation',
      trendType: 'neutral',
      icon: FileText,
      tab: 'documents' as const
    }
  ];

  const upcomingTrips = trips.filter(t => t.status !== 'Completed').slice(0, 3);

  return (
    <div id="executive-dashboard-view" className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-100 text-sky-800 border border-sky-200">
              Virtual Assistant Workspace
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Catherine Ngina</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1.5 font-heading">
            Executive Travel Operations Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Centralized workspace for business travel planning, logistics, schedules, and executive support.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            id="dash-brief-btn"
            onClick={() => setActiveTab('executive-brief')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Generate Executive Brief</span>
          </button>
          <button
            id="dash-create-trip-btn"
            onClick={() => setIsCreateTripModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Plan New Trip</span>
          </button>
        </div>
      </div>

      {/* 8 KPI Cards Grid */}
      <div id="kpi-grid" className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        {kpis.map(kpi => {
          const Icon = kpi.icon;
          return (
            <button
              key={kpi.id}
              id={kpi.id}
              onClick={() => setActiveTab(kpi.tab)}
              className="text-left bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-semibold text-slate-500 truncate">{kpi.label}</span>
                <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-slate-100 transition-colors">
                  <Icon className="w-4 h-4 text-slate-600 group-hover:text-slate-900" />
                </div>
              </div>

              <div className="mt-2.5">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
                  {kpi.value}
                </span>
                <p
                  className={`text-[11px] mt-1 font-medium truncate ${
                    kpi.trendType === 'positive'
                      ? 'text-emerald-700'
                      : kpi.trendType === 'warning'
                      ? 'text-amber-700'
                      : 'text-slate-500'
                  }`}
                >
                  {kpi.trend}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Section: Upcoming Trips + Progress & Today's Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upcoming Executive Trips (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">Upcoming Executive Trips</h3>
                <p className="text-xs text-slate-500 mt-0.5">High-priority C-suite international travel schedule</p>
              </div>
              <button
                onClick={() => setActiveTab('trips')}
                className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1"
              >
                <span>View All Trips</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {upcomingTrips.map(trip => (
                <div
                  key={trip.id}
                  id={`trip-card-${trip.id}`}
                  className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                        {trip.code}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          trip.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : trip.status === 'Planning'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {trip.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{trip.title}</span>
                      <span className="text-slate-400 font-normal">({trip.destination})</span>
                    </h4>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{trip.dateDisplay}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{trip.executiveName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">Purpose: {trip.purpose}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">Budget: ${trip.budgetTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-sky-800 bg-sky-50/80 px-2.5 py-1 rounded-md border border-sky-100 font-medium">
                      Next Action: {trip.nextAction}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <button
                      id={`open-trip-${trip.id}`}
                      onClick={() => selectTripAndNavigate(trip.id, 'itineraries')}
                      className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <span>Open Workspace</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => selectTripAndNavigate(trip.id, 'executive-brief')}
                      className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 hover:bg-white text-slate-700 transition-colors"
                    >
                      Travel Brief
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Risk & Contingency Summary Strip */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Travel Risk & Contingency Protocols</h3>
                  <p className="text-[11px] text-slate-500">Proactive contingency buffers monitored for active trips</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('contingency')}
                className="text-xs font-semibold text-rose-700 hover:text-rose-900 flex items-center gap-1"
              >
                <span>Manage Risk Matrix</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Flight Delay</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Low Risk
                  </span>
                </div>
                <p className="text-slate-600 mt-1 text-[11px]">Backup Qatar Airways QR-701 researched on 2h standby.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Meeting Conflict</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Low Risk
                  </span>
                </div>
                <p className="text-slate-600 mt-1 text-[11px]">30-minute schedule buffer active between Apex & Gotham sessions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Travel Planning Progress + Today's Travel Tasks (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Travel Planning Progress Card (for active trip TRIP-204) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Trip Planning Workflow • TRIP-204
                </span>
                <h3 className="text-sm font-bold text-slate-900 font-heading">Travel Planning Progress</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                Phase 4 of 6
              </span>
            </div>

            <div className="space-y-2.5">
              {[
                { stage: 'Research', status: 'Completed', detail: 'Market pricing & executive preference alignment' },
                { stage: 'Flights', status: 'Completed', detail: 'Global Air GA-482 Business Class selected' },
                { stage: 'Hotel', status: 'Completed', detail: 'Manhattan Executive Hotel suite locked' },
                { stage: 'Transportation', status: 'In Progress', detail: 'Empire Chauffeur airport transfers booked' },
                { stage: 'Meetings', status: 'In Progress', detail: '3 investor & partner sessions confirmed' },
                { stage: 'Final Itinerary', status: 'Pending', detail: 'Awaiting final briefing memo sign-off' }
              ].map((item, index) => {
                const isCompleted = item.status === 'Completed';
                const isInProgress = item.status === 'In Progress';
                return (
                  <div
                    key={item.stage}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                      isCompleted
                        ? 'bg-emerald-50/50 border-emerald-200/70'
                        : isInProgress
                        ? 'bg-amber-50/50 border-amber-200/80'
                        : 'bg-slate-50 border-slate-200/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isInProgress
                            ? 'bg-amber-500 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : index + 1}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{item.stage}</p>
                        <p className="text-[11px] text-slate-500 truncate max-w-44">{item.detail}</p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isInProgress
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200/70 text-slate-600'
                      }`}
                    >
                      {item.status === 'Completed' ? '✓ Ready' : item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today's Travel Tasks Checklist */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Virtual Assistant Queue
                </span>
                <h3 className="text-sm font-bold text-slate-900 font-heading">Today's Travel Tasks</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {todayTasks.filter(t => t.completed).length}/{todayTasks.length} Done
              </span>
            </div>

            <div className="space-y-2">
              {todayTasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleTodayTask(task.id)}
                  className={`flex items-start gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    task.completed
                      ? 'bg-slate-50 border-slate-200/60 opacity-60'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-semibold ${
                        task.completed ? 'line-through text-slate-500' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-medium text-slate-400">{task.category}</span>
                      <span className="text-slate-300">•</span>
                      <span
                        className={`text-[10px] font-semibold ${
                          task.priority === 'High' ? 'text-rose-600' : 'text-slate-600'
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('follow-ups')}
              className="w-full mt-4 py-2 text-xs font-semibold rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 transition-colors text-center"
            >
              Open Full Follow-Ups & Task Queue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
