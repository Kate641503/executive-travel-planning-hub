import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Trip,
  FlightOption,
  HotelOption,
  TransportationItem,
  MeetingItem,
  ExpenseItem,
  FollowUpItem,
  TravelDocument,
  RiskContingencyItem,
  DayItineraryItem,
  ExecutiveProfile,
  AppNotification
} from '../types';
import {
  INITIAL_TRIPS,
  INITIAL_FLIGHTS,
  INITIAL_HOTELS,
  INITIAL_TRANSPORTATION,
  INITIAL_MEETINGS,
  INITIAL_DAY_ITINERARIES,
  INITIAL_EXPENSES,
  INITIAL_FOLLOW_UPS,
  INITIAL_DOCUMENTS,
  INITIAL_RISKS,
  INITIAL_EXECUTIVES,
  INITIAL_NOTIFICATIONS,
  TODAY_TASKS
} from '../data/initialData';

export type NavTab =
  | 'dashboard'
  | 'trips'
  | 'itineraries'
  | 'flight-research'
  | 'hotels'
  | 'transportation'
  | 'meetings'
  | 'budget'
  | 'follow-ups'
  | 'documents'
  | 'reports'
  | 'settings'
  | 'executive-brief'
  | 'contingency';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface TravelContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedTripId: string;
  setSelectedTripId: (id: string) => void;
  currentTrip: Trip | undefined;
  
  // Data lists
  trips: Trip[];
  flights: FlightOption[];
  hotels: HotelOption[];
  transportation: TransportationItem[];
  meetings: MeetingItem[];
  dayItineraries: Record<string, DayItineraryItem[]>;
  expenses: ExpenseItem[];
  followUps: FollowUpItem[];
  documents: TravelDocument[];
  risks: RiskContingencyItem[];
  executives: ExecutiveProfile[];
  notifications: AppNotification[];
  todayTasks: typeof TODAY_TASKS;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Trip operations
  addTrip: (tripData: Partial<Trip>) => void;
  updateTrip: (id: string, tripData: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  selectTripAndNavigate: (tripId: string, tab?: NavTab) => void;

  // Flight operations
  selectFlightOption: (flightId: string, tripId: string) => void;
  addFlightOption: (flight: Omit<FlightOption, 'id'>) => void;

  // Hotel operations
  selectHotelOption: (hotelId: string, tripId: string) => void;
  toggleShortlistHotel: (hotelId: string) => void;
  addHotelOption: (hotel: Omit<HotelOption, 'id'>) => void;

  // Transportation operations
  addTransportation: (item: Omit<TransportationItem, 'id'>) => void;
  updateTransportation: (id: string, item: Partial<TransportationItem>) => void;
  deleteTransportation: (id: string) => void;

  // Meeting operations
  addMeeting: (meeting: Omit<MeetingItem, 'id'>) => void;
  updateMeeting: (id: string, meeting: Partial<MeetingItem>) => void;
  deleteMeeting: (id: string) => void;

  // Budget & Expense operations
  addExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  updateExpense: (id: string, expense: Partial<ExpenseItem>) => void;
  deleteExpense: (id: string) => void;

  // Follow-Up operations
  toggleFollowUpComplete: (id: string) => void;
  addFollowUp: (item: Omit<FollowUpItem, 'id'>) => void;
  updateFollowUp: (id: string, item: Partial<FollowUpItem>) => void;
  deleteFollowUp: (id: string) => void;

  // Documents operations
  addDocument: (doc: Omit<TravelDocument, 'id'>) => void;
  updateDocumentStatus: (id: string, status: TravelDocument['status']) => void;
  deleteDocument: (id: string) => void;

  // Risks & Contingency operations
  addRisk: (risk: Omit<RiskContingencyItem, 'id'>) => void;
  updateRisk: (id: string, risk: Partial<RiskContingencyItem>) => void;

  // Today tasks
  toggleTodayTask: (id: string) => void;

  // Settings & Executive Profile
  updateExecutiveProfile: (id: string, profile: Partial<ExecutiveProfile>) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;

  // Global modals
  isCreateTripModalOpen: boolean;
  setIsCreateTripModalOpen: (open: boolean) => void;
  isAddExpenseModalOpen: boolean;
  setIsAddExpenseModalOpen: (open: boolean) => void;
  isAddMeetingModalOpen: boolean;
  setIsAddMeetingModalOpen: (open: boolean) => void;
  activePreviewDoc: TravelDocument | null;
  setActivePreviewDoc: (doc: TravelDocument | null) => void;

  // Reset
  resetToDefaultData: () => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedTripId, setSelectedTripId] = useState<string>('trip-204');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isCreateTripModalOpen, setIsCreateTripModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isAddMeetingModalOpen, setIsAddMeetingModalOpen] = useState(false);
  const [activePreviewDoc, setActivePreviewDoc] = useState<TravelDocument | null>(null);

  // Core state from local storage or initial values
  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('catherine_va_trips');
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });

  const [flights, setFlights] = useState<FlightOption[]>(() => {
    const saved = localStorage.getItem('catherine_va_flights');
    return saved ? JSON.parse(saved) : INITIAL_FLIGHTS;
  });

  const [hotels, setHotels] = useState<HotelOption[]>(() => {
    const saved = localStorage.getItem('catherine_va_hotels');
    return saved ? JSON.parse(saved) : INITIAL_HOTELS;
  });

  const [transportation, setTransportation] = useState<TransportationItem[]>(() => {
    const saved = localStorage.getItem('catherine_va_transportation');
    return saved ? JSON.parse(saved) : INITIAL_TRANSPORTATION;
  });

  const [meetings, setMeetings] = useState<MeetingItem[]>(() => {
    const saved = localStorage.getItem('catherine_va_meetings');
    return saved ? JSON.parse(saved) : INITIAL_MEETINGS;
  });

  const [dayItineraries, setDayItineraries] = useState<Record<string, DayItineraryItem[]>>(() => {
    const saved = localStorage.getItem('catherine_va_itineraries');
    return saved ? JSON.parse(saved) : INITIAL_DAY_ITINERARIES;
  });

  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem('catherine_va_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [followUps, setFollowUps] = useState<FollowUpItem[]>(() => {
    const saved = localStorage.getItem('catherine_va_followups');
    return saved ? JSON.parse(saved) : INITIAL_FOLLOW_UPS;
  });

  const [documents, setDocuments] = useState<TravelDocument[]>(() => {
    const saved = localStorage.getItem('catherine_va_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [risks, setRisks] = useState<RiskContingencyItem[]>(() => {
    const saved = localStorage.getItem('catherine_va_risks');
    return saved ? JSON.parse(saved) : INITIAL_RISKS;
  });

  const [executives, setExecutives] = useState<ExecutiveProfile[]>(() => {
    const saved = localStorage.getItem('catherine_va_executives');
    return saved ? JSON.parse(saved) : INITIAL_EXECUTIVES;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('catherine_va_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [todayTasks, setTodayTasks] = useState(TODAY_TASKS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('catherine_va_trips', JSON.stringify(trips));
      localStorage.setItem('catherine_va_flights', JSON.stringify(flights));
      localStorage.setItem('catherine_va_hotels', JSON.stringify(hotels));
      localStorage.setItem('catherine_va_transportation', JSON.stringify(transportation));
      localStorage.setItem('catherine_va_meetings', JSON.stringify(meetings));
      localStorage.setItem('catherine_va_itineraries', JSON.stringify(dayItineraries));
      localStorage.setItem('catherine_va_expenses', JSON.stringify(expenses));
      localStorage.setItem('catherine_va_followups', JSON.stringify(followUps));
      localStorage.setItem('catherine_va_documents', JSON.stringify(documents));
      localStorage.setItem('catherine_va_risks', JSON.stringify(risks));
      localStorage.setItem('catherine_va_executives', JSON.stringify(executives));
      localStorage.setItem('catherine_va_notifications', JSON.stringify(notifications));
    } catch {
      // LocalStorage error ignore
    }
  }, [trips, flights, hotels, transportation, meetings, dayItineraries, expenses, followUps, documents, risks, executives, notifications]);

  const currentTrip = trips.find(t => t.id === selectedTripId) || trips[0];

  const showToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, description, type };
    setToasts(prev => [...prev.slice(-3), newToast]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const selectTripAndNavigate = (tripId: string, tab?: NavTab) => {
    setSelectedTripId(tripId);
    if (tab) {
      setActiveTab(tab);
    }
  };

  // Trip operations
  const addTrip = (tripData: Partial<Trip>) => {
    const newId = `trip-${Date.now().toString().slice(-4)}`;
    const nextCodeNumber = 200 + trips.length + 1;
    const newTrip: Trip = {
      id: newId,
      code: tripData.code || `TRIP-${nextCodeNumber}`,
      title: tripData.title || 'Executive Business Trip',
      destination: tripData.destination || 'New York',
      country: tripData.country || 'United States',
      departureDate: tripData.departureDate || '2026-10-15',
      returnDate: tripData.returnDate || '2026-10-19',
      dateDisplay: tripData.dateDisplay || 'October 15–19, 2026',
      executiveId: tripData.executiveId || 'exec-1',
      executiveName: tripData.executiveName || 'Daniel Carter',
      executiveRole: tripData.executiveRole || 'Chief Executive Officer',
      purpose: tripData.purpose || 'Executive Client Meetings',
      status: tripData.status || 'Planning',
      budgetTotal: Number(tripData.budgetTotal) || 6000,
      currentEstimatedCost: Number(tripData.currentEstimatedCost) || 0,
      nextAction: tripData.nextAction || 'Initiate flight and hotel research',
      progress: {
        research: 'Completed',
        flights: 'In Progress',
        hotel: 'Pending',
        transportation: 'Pending',
        meetings: 'Pending',
        finalItinerary: 'Not Started'
      },
      timeZone: tripData.timeZone || 'EDT (UTC-4)',
      summaryNotes: tripData.summaryNotes || 'High-priority business trip managed by Catherine Ngina.'
    };

    setTrips(prev => [newTrip, ...prev]);
    setSelectedTripId(newId);
    showToast('New Trip Created', `${newTrip.code} (${newTrip.destination}) successfully registered in workspace.`, 'success');
  };

  const updateTrip = (id: string, tripData: Partial<Trip>) => {
    setTrips(prev => prev.map(t => (t.id === id ? { ...t, ...tripData } : t)));
    showToast('Trip Updated', 'Trip details have been synchronized.', 'info');
  };

  const deleteTrip = (id: string) => {
    const tripToDelete = trips.find(t => t.id === id);
    setTrips(prev => prev.filter(t => t.id !== id));
    if (selectedTripId === id) {
      const remaining = trips.filter(t => t.id !== id);
      if (remaining.length > 0) {
        setSelectedTripId(remaining[0].id);
      }
    }
    showToast('Trip Removed', `${tripToDelete?.code || 'Trip'} deleted from records.`, 'info');
  };

  // Flight operations
  const selectFlightOption = (flightId: string, tripId: string) => {
    setFlights(prev =>
      prev.map(f => {
        if (f.tripId === tripId) {
          return { ...f, selected: f.id === flightId };
        }
        return f;
      })
    );
    const selectedFlight = flights.find(f => f.id === flightId);
    // update trip progress
    setTrips(prev =>
      prev.map(t => {
        if (t.id === tripId) {
          return {
            ...t,
            progress: { ...t.progress, flights: 'Completed' },
            nextAction: 'Confirm hotel booking'
          };
        }
        return t;
      })
    );
    showToast('Flight Option Selected', `${selectedFlight?.airline} (${selectedFlight?.route}) selected for trip.`, 'success');
  };

  const addFlightOption = (flight: Omit<FlightOption, 'id'>) => {
    const newFlight: FlightOption = {
      ...flight,
      id: `fl-${Date.now()}`
    };
    setFlights(prev => [...prev, newFlight]);
    showToast('Flight Option Added', `${newFlight.airline} added to research options.`, 'success');
  };

  // Hotel operations
  const selectHotelOption = (hotelId: string, tripId: string) => {
    setHotels(prev =>
      prev.map(h => {
        if (h.tripId === tripId) {
          return { ...h, selected: h.id === hotelId };
        }
        return h;
      })
    );
    const selectedHotel = hotels.find(h => h.id === hotelId);
    setTrips(prev =>
      prev.map(t => {
        if (t.id === tripId) {
          return {
            ...t,
            progress: { ...t.progress, hotel: 'Completed' },
            nextAction: 'Coordinate airport transfer & local transport'
          };
        }
        return t;
      })
    );
    showToast('Hotel Selected', `${selectedHotel?.name} set as primary trip accommodation.`, 'success');
  };

  const toggleShortlistHotel = (hotelId: string) => {
    setHotels(prev =>
      prev.map(h => {
        if (h.id === hotelId) {
          const nextVal = !h.shortlisted;
          showToast(nextVal ? 'Hotel Shortlisted' : 'Removed from Shortlist', h.name, 'info');
          return { ...h, shortlisted: nextVal };
        }
        return h;
      })
    );
  };

  const addHotelOption = (hotel: Omit<HotelOption, 'id'>) => {
    const newHotel: HotelOption = {
      ...hotel,
      id: `ht-${Date.now()}`
    };
    setHotels(prev => [...prev, newHotel]);
    showToast('Hotel Option Added', `${newHotel.name} added to comparison.`, 'success');
  };

  // Transportation operations
  const addTransportation = (item: Omit<TransportationItem, 'id'>) => {
    const newItem: TransportationItem = {
      ...item,
      id: `tr-${Date.now()}`
    };
    setTransportation(prev => [...prev, newItem]);
    showToast('Transportation Booked', `${newItem.title} added to logistics schedule.`, 'success');
  };

  const updateTransportation = (id: string, item: Partial<TransportationItem>) => {
    setTransportation(prev => prev.map(t => (t.id === id ? { ...t, ...item } : t)));
    showToast('Transportation Updated', 'Logistics details updated.', 'info');
  };

  const deleteTransportation = (id: string) => {
    setTransportation(prev => prev.filter(t => t.id !== id));
    showToast('Transportation Item Removed', 'Deleted from schedule.', 'info');
  };

  // Meeting operations
  const addMeeting = (meeting: Omit<MeetingItem, 'id'>) => {
    const newMeeting: MeetingItem = {
      ...meeting,
      id: `mtg-${Date.now()}`
    };
    setMeetings(prev => [...prev, newMeeting]);
    showToast('Meeting Scheduled', `${newMeeting.title} added to executive calendar.`, 'success');
  };

  const updateMeeting = (id: string, meeting: Partial<MeetingItem>) => {
    setMeetings(prev => prev.map(m => (m.id === id ? { ...m, ...meeting } : m)));
    showToast('Meeting Updated', 'Executive calendar modified.', 'info');
  };

  const deleteMeeting = (id: string) => {
    setMeetings(prev => prev.filter(m => m.id !== id));
    showToast('Meeting Removed', 'Removed from agenda.', 'info');
  };

  // Budget & Expense operations
  const addExpense = (expense: Omit<ExpenseItem, 'id'>) => {
    const newExpense: ExpenseItem = {
      ...expense,
      id: `exp-${Date.now()}`
    };
    setExpenses(prev => [newExpense, ...prev]);

    // Recalculate trip total
    const currentTripExpenses = expenses.filter(e => e.tripId === expense.tripId);
    const newTotal = currentTripExpenses.reduce((acc, curr) => acc + curr.amount, 0) + expense.amount;
    
    setTrips(prev =>
      prev.map(t => {
        if (t.id === expense.tripId) {
          return { ...t, currentEstimatedCost: newTotal };
        }
        return t;
      })
    );

    showToast('Expense Logged', `$${expense.amount.toLocaleString()} for ${expense.title} recorded.`, 'success');
  };

  const updateExpense = (id: string, expense: Partial<ExpenseItem>) => {
    setExpenses(prev => prev.map(e => (e.id === id ? { ...e, ...expense } : e)));
    showToast('Expense Updated', 'Budget ledger updated.', 'info');
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    showToast('Expense Removed', 'Ledger item removed.', 'info');
  };

  // Follow-Up operations
  const toggleFollowUpComplete = (id: string) => {
    setFollowUps(prev =>
      prev.map(f => {
        if (f.id === id) {
          const isDone = f.status === 'Completed';
          const newStatus: FollowUpItem['status'] = isDone ? 'Pending' : 'Completed';
          const completedAt = isDone ? undefined : new Date().toISOString().split('T')[0];
          showToast(
            isDone ? 'Follow-Up Reopened' : 'Follow-Up Completed!',
            f.title,
            isDone ? 'info' : 'success'
          );
          return { ...f, status: newStatus, completedAt };
        }
        return f;
      })
    );
  };

  const addFollowUp = (item: Omit<FollowUpItem, 'id'>) => {
    const newItem: FollowUpItem = {
      ...item,
      id: `fu-${Date.now()}`
    };
    setFollowUps(prev => [newItem, ...prev]);
    showToast('Follow-Up Added', newItem.title, 'success');
  };

  const updateFollowUp = (id: string, item: Partial<FollowUpItem>) => {
    setFollowUps(prev => prev.map(f => (f.id === id ? { ...f, ...item } : f)));
    showToast('Follow-Up Updated', 'Task queue updated.', 'info');
  };

  const deleteFollowUp = (id: string) => {
    setFollowUps(prev => prev.filter(f => f.id !== id));
    showToast('Follow-Up Deleted', 'Task removed from queue.', 'info');
  };

  // Documents operations
  const addDocument = (doc: Omit<TravelDocument, 'id'>) => {
    const newDoc: TravelDocument = {
      ...doc,
      id: `doc-${Date.now()}`
    };
    setDocuments(prev => [newDoc, ...prev]);
    showToast('Document Registered', `${newDoc.title} added to document center.`, 'success');
  };

  const updateDocumentStatus = (id: string, status: TravelDocument['status']) => {
    setDocuments(prev => prev.map(d => (d.id === id ? { ...d, status } : d)));
    showToast('Document Status Updated', `Status changed to ${status}.`, 'info');
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    showToast('Document Removed', 'Removed from repository.', 'info');
  };

  // Risks
  const addRisk = (risk: Omit<RiskContingencyItem, 'id'>) => {
    const newRisk: RiskContingencyItem = {
      ...risk,
      id: `risk-${Date.now()}`
    };
    setRisks(prev => [...prev, newRisk]);
    showToast('Contingency Plan Added', newRisk.category, 'success');
  };

  const updateRisk = (id: string, risk: Partial<RiskContingencyItem>) => {
    setRisks(prev => prev.map(r => (r.id === id ? { ...r, ...risk } : r)));
    showToast('Contingency Updated', 'Risk analysis refreshed.', 'info');
  };

  // Today tasks
  const toggleTodayTask = (id: string) => {
    setTodayTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextState = !t.completed;
          showToast(nextState ? 'Task Marked Done' : 'Task Reopened', t.title, 'success');
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  // Executive Profile
  const updateExecutiveProfile = (id: string, profile: Partial<ExecutiveProfile>) => {
    setExecutives(prev => prev.map(e => (e.id === id ? { ...e, ...profile } : e)));
    showToast('Executive Profile Updated', 'Travel preferences saved.', 'success');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All Notifications Read', 'Notification tray cleared.', 'info');
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setTrips(INITIAL_TRIPS);
    setFlights(INITIAL_FLIGHTS);
    setHotels(INITIAL_HOTELS);
    setTransportation(INITIAL_TRANSPORTATION);
    setMeetings(INITIAL_MEETINGS);
    setDayItineraries(INITIAL_DAY_ITINERARIES);
    setExpenses(INITIAL_EXPENSES);
    setFollowUps(INITIAL_FOLLOW_UPS);
    setDocuments(INITIAL_DOCUMENTS);
    setRisks(INITIAL_RISKS);
    setExecutives(INITIAL_EXECUTIVES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setTodayTasks(TODAY_TASKS);
    setSelectedTripId('trip-204');
    setActiveTab('dashboard');
    showToast('Demo Data Reset', 'Workspace returned to pristine initial portfolio state.', 'info');
  };

  return (
    <TravelContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedTripId,
        setSelectedTripId,
        currentTrip,
        trips,
        flights,
        hotels,
        transportation,
        meetings,
        dayItineraries,
        expenses,
        followUps,
        documents,
        risks,
        executives,
        notifications,
        todayTasks,
        searchQuery,
        setSearchQuery,
        addTrip,
        updateTrip,
        deleteTrip,
        selectTripAndNavigate,
        selectFlightOption,
        addFlightOption,
        selectHotelOption,
        toggleShortlistHotel,
        addHotelOption,
        addTransportation,
        updateTransportation,
        deleteTransportation,
        addMeeting,
        updateMeeting,
        deleteMeeting,
        addExpense,
        updateExpense,
        deleteExpense,
        toggleFollowUpComplete,
        addFollowUp,
        updateFollowUp,
        deleteFollowUp,
        addDocument,
        updateDocumentStatus,
        deleteDocument,
        addRisk,
        updateRisk,
        toggleTodayTask,
        updateExecutiveProfile,
        markNotificationRead,
        markAllNotificationsRead,
        toasts,
        showToast,
        dismissToast,
        isCreateTripModalOpen,
        setIsCreateTripModalOpen,
        isAddExpenseModalOpen,
        setIsAddExpenseModalOpen,
        isAddMeetingModalOpen,
        setIsAddMeetingModalOpen,
        activePreviewDoc,
        setActivePreviewDoc,
        resetToDefaultData
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};
