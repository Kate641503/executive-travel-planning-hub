import React from 'react';
import { TravelProvider, useTravel } from './context/TravelContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { ToastContainer } from './components/common/ToastContainer';
import { CreateTripModal } from './components/modals/CreateTripModal';

// Views
import { DashboardView } from './components/views/DashboardView';
import { TripsView } from './components/views/TripsView';
import { ItineraryView } from './components/views/ItineraryView';
import { FlightResearchView } from './components/views/FlightResearchView';
import { HotelsView } from './components/views/HotelsView';
import { TransportationView } from './components/views/TransportationView';
import { MeetingsView } from './components/views/MeetingsView';
import { BudgetView } from './components/views/BudgetView';
import { FollowUpsView } from './components/views/FollowUpsView';
import { DocumentsView } from './components/views/DocumentsView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';
import { ExecutiveBriefView } from './components/views/ExecutiveBriefView';
import { ContingencyView } from './components/views/ContingencyView';

const MainContent: React.FC = () => {
  const { activeTab } = useTravel();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'trips':
        return <TripsView />;
      case 'itineraries':
        return <ItineraryView />;
      case 'flight-research':
        return <FlightResearchView />;
      case 'hotels':
        return <HotelsView />;
      case 'transportation':
        return <TransportationView />;
      case 'meetings':
        return <MeetingsView />;
      case 'budget':
        return <BudgetView />;
      case 'follow-ups':
        return <FollowUpsView />;
      case 'documents':
        return <DocumentsView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      case 'executive-brief':
        return <ExecutiveBriefView />;
      case 'contingency':
        return <ContingencyView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased text-slate-800">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-(--breakpoint-2xl) w-full mx-auto">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Dynamic Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          <div className="max-w-6xl mx-auto space-y-6">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Interactive Global Modals & Notifications */}
      <CreateTripModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <TravelProvider>
      <MainContent />
    </TravelProvider>
  );
}
