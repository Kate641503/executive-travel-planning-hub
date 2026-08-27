export type TripStatus = 'Confirmed' | 'Planning' | 'Researching' | 'Completed';

export type PlanningProgressStatus = 'Completed' | 'In Progress' | 'Pending' | 'Not Started';

export interface PlanningProgress {
  research: PlanningProgressStatus;
  flights: PlanningProgressStatus;
  hotel: PlanningProgressStatus;
  transportation: PlanningProgressStatus;
  meetings: PlanningProgressStatus;
  finalItinerary: PlanningProgressStatus;
}

export interface FlightOption {
  id: string;
  tripId: string;
  airline: string;
  flightNumber: string;
  route: string;
  originCode: string;
  originName: string;
  destCode: string;
  destName: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  arrivalDate: string;
  stops: number;
  stopsDescription?: string;
  duration: string;
  price: number;
  cabinClass: string;
  baggage: string;
  cancellationPolicy: string;
  changePolicy: string;
  recommendation: 'Best Schedule' | 'Best Price' | 'Not Preferred' | 'Fastest Connection';
  selected: boolean;
  notes?: string;
}

export interface HotelOption {
  id: string;
  tripId: string;
  name: string;
  location: string;
  address: string;
  rating: number;
  reviewsCount: number;
  distanceToMeeting: string;
  nightlyRate: number;
  nights: number;
  totalRate: number;
  roomType: string;
  breakfastIncluded: boolean;
  cancellationPolicy: string;
  amenities: string[];
  recommendation: string;
  proximityNote: string;
  selected: boolean;
  shortlisted: boolean;
  checkInDate: string;
  checkOutDate: string;
}

export interface TransportationItem {
  id: string;
  tripId: string;
  type: 'Airport Transfer' | 'Car Service' | 'Rail' | 'Local Transportation';
  title: string;
  fromLocation: string;
  toLocation: string;
  date: string;
  time: string;
  vehicle: string;
  driverName?: string;
  driverPhone?: string;
  status: 'Confirmed' | 'Scheduled' | 'Pending' | 'Completed';
  confirmationCode: string;
  cost: number;
  notes?: string;
}

export interface MeetingItem {
  id: string;
  tripId: string;
  title: string;
  companyOrHost: string;
  date: string;
  time: string;
  endTime?: string;
  durationMinutes: number;
  location: string;
  room?: string;
  address: string;
  timeZone: string;
  attendeesCount: number;
  attendees: string[];
  status: 'Confirmed' | 'Scheduled' | 'Tentative';
  preparationNotes: string;
  transportationBufferMinutes: number;
  keyDiscussionPoints?: string[];
}

export interface ExpenseItem {
  id: string;
  tripId: string;
  title: string;
  category: 'Flights' | 'Hotel' | 'Transportation' | 'Meals' | 'Meetings' | 'Contingency' | 'Miscellaneous';
  amount: number;
  date: string;
  status: 'Paid' | 'Estimated' | 'Pending Approval' | 'Receipt Attached';
  vendor?: string;
  paymentMethod?: string;
  notes?: string;
}

export type FollowUpPriority = 'High' | 'Medium' | 'Low';
export type FollowUpStatus = 'Pending' | 'Due Today' | 'Upcoming' | 'Overdue' | 'Completed';

export interface FollowUpItem {
  id: string;
  tripId?: string;
  tripCode?: string;
  title: string;
  dueDate: string;
  priority: FollowUpPriority;
  status: FollowUpStatus;
  vendorOrContact?: string;
  contactEmail?: string;
  contactPhone?: string;
  category: 'Flight' | 'Hotel' | 'Transportation' | 'Meeting' | 'Document' | 'General';
  notes?: string;
  completedAt?: string;
}

export type DocumentType =
  | 'Flight Confirmation'
  | 'Hotel Confirmation'
  | 'Executive Itinerary'
  | 'Meeting Agenda'
  | 'Travel Insurance'
  | 'Airport Transfer Confirmation'
  | 'Travel Brief'
  | 'Expense Summary'
  | 'E-Ticket'
  | 'Boarding Pass'
  | 'Visa'
  | 'Passport Copy'
  | 'Hotel Voucher'
  | 'Insurance'
  | 'NDA'
  | 'Receipt';

export type DocumentStatus = 'Ready' | 'Pending' | 'Needs Review';

export interface TravelDocument {
  id: string;
  tripId: string;
  tripCode: string;
  title: string;
  type: DocumentType;
  status: DocumentStatus;
  lastUpdated: string;
  fileSize: string;
  fileFormat: string;
  summaryText: string;
}

export interface DocumentItem {
  id: string;
  tripId: string;
  title: string;
  type: DocumentType;
  category: 'Flights' | 'Hotels' | 'Visa & Passports' | 'Insurance' | 'Agreements' | 'Expenses' | 'General';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: 'Ready' | 'Pending' | 'Needs Review';
  notes?: string;
}

export interface ContingencyPlan {
  id: string;
  tripId: string;
  scenario: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  triggerCondition: string;
  backupAction: string;
  vaResponsibility: string;
  emergencyContact: string;
  status: 'Active' | 'Resolved' | 'Monitoring';
}

export interface RiskContingencyItem {
  id: string;
  tripId: string;
  category: 'Flight Delay' | 'Meeting Conflict' | 'Airport Transfer Delay' | 'Hotel Issue' | 'Weather & Health' | 'Passport / Visa';
  riskDescription: string;
  mitigationPlan: string;
  statusRisk: 'Low Risk' | 'Medium Risk' | 'High Risk';
  backupContact?: string;
  actionTaken?: string;
}

export interface DayItineraryItem {
  dayNumber: number;
  date: string;
  theme: string;
  summary: string;
  activities: {
    time: string;
    title: string;
    type: 'flight' | 'hotel' | 'transfer' | 'meeting' | 'meal' | 'networking' | 'rest';
    location: string;
    details?: string;
    highlight?: boolean;
  }[];
}

export interface ExecutiveProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  avatar: string;
  preferredCabin: string;
  seatPreference: string;
  hotelPreference: string;
  dietaryRestrictions: string;
  meetingBufferMinutes: number;
  defaultCurrency: string;
  homeAirport: string;
  passportCountry: string;
  passportExpiry: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface Trip {
  id: string;
  code: string;
  title: string;
  destination: string;
  country: string;
  departureDate: string;
  returnDate: string;
  dateDisplay: string;
  executiveId: string;
  executiveName: string;
  executiveRole: string;
  purpose: string;
  status: TripStatus;
  budgetTotal: number;
  currentEstimatedCost: number;
  nextAction: string;
  progress: PlanningProgress;
  summaryNotes?: string;
  timeZone: string;
  weatherForecast?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'urgent' | 'info' | 'success' | 'warning';
  tripCode?: string;
  targetNav?: string;
}
