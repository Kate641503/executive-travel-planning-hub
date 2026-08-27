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

export const INITIAL_EXECUTIVES: ExecutiveProfile[] = [
  {
    id: 'exec-1',
    name: 'Daniel Carter',
    role: 'Chief Executive Officer',
    company: 'Vanguard Capital Partners',
    email: 'd.carter@vanguardcp.com',
    phone: '+1 (212) 555-0194',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    preferredCabin: 'Business Class (Aisle seat)',
    seatPreference: 'Front section, aisle, left side',
    hotelPreference: '5-Star boutique/business, quiet high floor, king bed',
    dietaryRestrictions: 'Gluten-conscious, black coffee with oat milk',
    meetingBufferMinutes: 30,
    defaultCurrency: 'USD',
    homeAirport: 'NBO (Jomo Kenyatta Int.) / JFK base',
    passportCountry: 'United States',
    passportExpiry: 'November 14, 2030',
    emergencyContact: {
      name: 'Elena Carter',
      relationship: 'Spouse',
      phone: '+1 (212) 555-0182'
    }
  },
  {
    id: 'exec-2',
    name: 'Michael Brooks',
    role: 'Chief Technology Officer',
    company: 'Vanguard Capital Partners',
    email: 'm.brooks@vanguardcp.com',
    phone: '+1 (415) 555-0133',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    preferredCabin: 'Business Class (Window seat)',
    seatPreference: 'Bulkhead window seat',
    hotelPreference: 'Modern business hotel with 24/7 fitness center & fast fiber Wi-Fi',
    dietaryRestrictions: 'Vegetarian',
    meetingBufferMinutes: 45,
    defaultCurrency: 'USD',
    homeAirport: 'SFO / LHR base',
    passportCountry: 'United States',
    passportExpiry: 'June 20, 2029',
    emergencyContact: {
      name: 'Sarah Brooks',
      relationship: 'Spouse',
      phone: '+1 (415) 555-0199'
    }
  },
  {
    id: 'exec-3',
    name: 'Olivia Bennett',
    role: 'Head of Global Partnerships',
    company: 'Vanguard Capital Partners',
    email: 'o.bennett@vanguardcp.com',
    phone: '+44 20 7946 0912',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    preferredCabin: 'Business Class (Aisle seat)',
    seatPreference: 'Direct aisle access, quiet cabin',
    hotelPreference: 'Luxury hotel within 10 mins of financial district, executive lounge access',
    dietaryRestrictions: 'Pescatarian, sparkling mineral water',
    meetingBufferMinutes: 30,
    defaultCurrency: 'USD',
    homeAirport: 'LHR / DXB base',
    passportCountry: 'United Kingdom',
    passportExpiry: 'March 18, 2031',
    emergencyContact: {
      name: 'James Bennett',
      relationship: 'Brother',
      phone: '+44 77 0090 0411'
    }
  }
];

export const INITIAL_TRIPS: Trip[] = [
  {
    id: 'trip-204',
    code: 'TRIP-204',
    title: 'New York Business Trip',
    destination: 'New York',
    country: 'United States',
    departureDate: '2026-09-08',
    returnDate: '2026-09-12',
    dateDisplay: 'September 8–12, 2026',
    executiveId: 'exec-1',
    executiveName: 'Daniel Carter',
    executiveRole: 'Chief Executive Officer',
    purpose: 'Investor Meetings',
    status: 'Confirmed',
    budgetTotal: 6800,
    currentEstimatedCost: 5940,
    nextAction: 'Finalize itinerary & prepare brief',
    progress: {
      research: 'Completed',
      flights: 'Completed',
      hotel: 'Completed',
      transportation: 'In Progress',
      meetings: 'In Progress',
      finalItinerary: 'Pending'
    },
    summaryNotes: 'High-stakes Q3 LP investor meetings and partner roadshow in Midtown & Lower Manhattan.',
    timeZone: 'EDT (UTC-4)',
    weatherForecast: '72°F / 22°C, Mild & Sunny'
  },
  {
    id: 'trip-205',
    code: 'TRIP-205',
    title: 'London Conference',
    destination: 'London',
    country: 'United Kingdom',
    departureDate: '2026-09-21',
    returnDate: '2026-09-25',
    dateDisplay: 'September 21–25, 2026',
    executiveId: 'exec-2',
    executiveName: 'Michael Brooks',
    executiveRole: 'Chief Technology Officer',
    purpose: 'Industry Conference',
    status: 'Planning',
    budgetTotal: 5400,
    currentEstimatedCost: 4850,
    nextAction: 'Review hotel options near ExCeL Center',
    progress: {
      research: 'Completed',
      flights: 'Completed',
      hotel: 'In Progress',
      transportation: 'Pending',
      meetings: 'In Progress',
      finalItinerary: 'Pending'
    },
    summaryNotes: 'Keynote panelist at Global Tech Infrastructure Summit with 4 VC breakout sessions.',
    timeZone: 'BST (UTC+1)',
    weatherForecast: '64°F / 18°C, Scattered showers'
  },
  {
    id: 'trip-206',
    code: 'TRIP-206',
    title: 'Dubai Partner Meetings',
    destination: 'Dubai',
    country: 'United Arab Emirates',
    departureDate: '2026-10-05',
    returnDate: '2026-10-09',
    dateDisplay: 'October 5–9, 2026',
    executiveId: 'exec-3',
    executiveName: 'Olivia Bennett',
    executiveRole: 'Head of Global Partnerships',
    purpose: 'Partnership Meetings',
    status: 'Researching',
    budgetTotal: 6300,
    currentEstimatedCost: 5120,
    nextAction: 'Compare direct business class flights & DIFC hotels',
    progress: {
      research: 'Completed',
      flights: 'In Progress',
      hotel: 'In Progress',
      transportation: 'Pending',
      meetings: 'Pending',
      finalItinerary: 'Not Started'
    },
    summaryNotes: 'Signing strategic co-investment framework with Middle East institutional sovereign wealth funds.',
    timeZone: 'GST (UTC+4)',
    weatherForecast: '88°F / 31°C, Clear skies'
  },
  {
    id: 'trip-201',
    code: 'TRIP-201',
    title: 'Tokyo Tech Summit',
    destination: 'Tokyo',
    country: 'Japan',
    departureDate: '2026-06-12',
    returnDate: '2026-06-17',
    dateDisplay: 'June 12–17, 2026',
    executiveId: 'exec-1',
    executiveName: 'Daniel Carter',
    executiveRole: 'Chief Executive Officer',
    purpose: 'APAC Executive Summit',
    status: 'Completed',
    budgetTotal: 7900,
    currentEstimatedCost: 7420,
    nextAction: 'Trip completed - receipts filed',
    progress: {
      research: 'Completed',
      flights: 'Completed',
      hotel: 'Completed',
      transportation: 'Completed',
      meetings: 'Completed',
      finalItinerary: 'Completed'
    },
    summaryNotes: 'Successfully concluded APAC founder roundtables and bilateral enterprise agreements.',
    timeZone: 'JST (UTC+9)'
  },
  {
    id: 'trip-202',
    code: 'TRIP-202',
    title: 'Frankfurt Roadshow',
    destination: 'Frankfurt',
    country: 'Germany',
    departureDate: '2026-07-08',
    returnDate: '2026-07-11',
    dateDisplay: 'July 8–11, 2026',
    executiveId: 'exec-2',
    executiveName: 'Michael Brooks',
    executiveRole: 'Chief Technology Officer',
    purpose: 'European Banking Roadshow',
    status: 'Completed',
    budgetTotal: 4900,
    currentEstimatedCost: 4610,
    nextAction: 'Trip completed - expenses audited',
    progress: {
      research: 'Completed',
      flights: 'Completed',
      hotel: 'Completed',
      transportation: 'Completed',
      meetings: 'Completed',
      finalItinerary: 'Completed'
    },
    summaryNotes: 'European cloud compliance reviews with central regulatory bodies.',
    timeZone: 'CEST (UTC+2)'
  },
  {
    id: 'trip-203',
    code: 'TRIP-203',
    title: 'Singapore Executive Roundtable',
    destination: 'Singapore',
    country: 'Singapore',
    departureDate: '2026-08-01',
    returnDate: '2026-08-05',
    dateDisplay: 'August 1–5, 2026',
    executiveId: 'exec-3',
    executiveName: 'Olivia Bennett',
    executiveRole: 'Head of Global Partnerships',
    purpose: 'ASEAN FinTech Alliance',
    status: 'Completed',
    budgetTotal: 6200,
    currentEstimatedCost: 5880,
    nextAction: 'Trip completed - follow-ups archived',
    progress: {
      research: 'Completed',
      flights: 'Completed',
      hotel: 'Completed',
      transportation: 'Completed',
      meetings: 'Completed',
      finalItinerary: 'Completed'
    },
    summaryNotes: 'ASEAN expansion MoU executed with regional sovereign venture partners.',
    timeZone: 'SGT (UTC+8)'
  }
];

export const INITIAL_FLIGHTS: FlightOption[] = [
  {
    id: 'fl-opt-a',
    tripId: 'trip-204',
    airline: 'Global Air',
    flightNumber: 'GA-482 / GA-110',
    route: 'NBO → JFK',
    originCode: 'NBO',
    originName: 'Jomo Kenyatta International',
    destCode: 'JFK',
    destName: 'John F. Kennedy International',
    departureTime: '10:30 PM',
    arrivalTime: '7:15 AM (+1d)',
    departureDate: 'September 8, 2026',
    arrivalDate: 'September 9, 2026',
    stops: 1,
    stopsDescription: '1 stop in Doha (DOH, 1h 45m connection)',
    duration: '19h 40m',
    price: 1480,
    cabinClass: 'Business',
    baggage: '2 Checked bags (32kg each) + 2 Carry-ons',
    cancellationPolicy: 'Fully refundable up to 24h before departure',
    changePolicy: 'Free date changes prior to flight',
    recommendation: 'Best Schedule',
    selected: true,
    notes: 'Arrives at 7:15 AM allowing full rest before 10:00 AM investor meetings. Lie-flat suites with in-flight satellite Wi-Fi.'
  },
  {
    id: 'fl-opt-b',
    tripId: 'trip-204',
    airline: 'SkyWorld',
    flightNumber: 'SW-804 / SW-912',
    route: 'NBO → JFK',
    originCode: 'NBO',
    originName: 'Jomo Kenyatta International',
    destCode: 'JFK',
    destName: 'John F. Kennedy International',
    departureTime: '8:45 PM',
    arrivalTime: '8:55 AM (+1d)',
    departureDate: 'September 8, 2026',
    arrivalDate: 'September 9, 2026',
    stops: 1,
    stopsDescription: '1 stop in Amsterdam (AMS, 2h 55m connection)',
    duration: '21h 10m',
    price: 1290,
    cabinClass: 'Business',
    baggage: '2 Checked bags (32kg each) + 1 Carry-on',
    cancellationPolicy: 'Refundable with $150 admin fee',
    changePolicy: '1 complimentary change, then $100 fee',
    recommendation: 'Best Price',
    selected: false,
    notes: 'Competitive business class fare. Layover at AMS SkyLounge with shower suites.'
  },
  {
    id: 'fl-opt-c',
    tripId: 'trip-204',
    airline: 'Atlantic Airways',
    flightNumber: 'AA-221 / AA-904',
    route: 'NBO → JFK',
    originCode: 'NBO',
    originName: 'Jomo Kenyatta International',
    destCode: 'JFK',
    destName: 'John F. Kennedy International',
    departureTime: '6:15 PM',
    arrivalTime: '11:45 AM (+1d)',
    departureDate: 'September 8, 2026',
    arrivalDate: 'September 9, 2026',
    stops: 2,
    stopsDescription: '2 stops (ADD & FRA, total layover 5h 15m)',
    duration: '24h 30m',
    price: 1150,
    cabinClass: 'Business',
    baggage: '2 Checked bags (23kg)',
    cancellationPolicy: 'Non-refundable (airline credit only)',
    changePolicy: '$250 change fee',
    recommendation: 'Not Preferred',
    selected: false,
    notes: 'Arrives too late for morning investor commitments. Extended double layovers.'
  },
  {
    id: 'fl-lon-a',
    tripId: 'trip-205',
    airline: 'British Transatlantic',
    flightNumber: 'BT-102',
    route: 'JFK → LHR',
    originCode: 'JFK',
    originName: 'New York JFK',
    destCode: 'LHR',
    destName: 'London Heathrow Terminal 5',
    departureTime: '9:00 PM',
    arrivalTime: '9:15 AM (+1d)',
    departureDate: 'September 21, 2026',
    arrivalDate: 'September 22, 2026',
    stops: 0,
    stopsDescription: 'Direct non-stop flight',
    duration: '7h 15m',
    price: 1850,
    cabinClass: 'Business Club',
    baggage: '2 Checked bags (32kg) + Cabin bag',
    cancellationPolicy: 'Fully refundable without penalty',
    changePolicy: 'Flexible anytime',
    recommendation: 'Best Schedule',
    selected: true,
    notes: 'Direct overnight flight with sleeper service and Concorde lounge access at JFK.'
  },
  {
    id: 'fl-dxb-a',
    tripId: 'trip-206',
    airline: 'Emirates Crown',
    flightNumber: 'EC-202',
    route: 'JFK → DXB',
    originCode: 'JFK',
    originName: 'New York JFK',
    destCode: 'DXB',
    destName: 'Dubai International Terminal 3',
    departureTime: '11:00 PM',
    arrivalTime: '7:45 PM (+1d)',
    departureDate: 'October 5, 2026',
    arrivalDate: 'October 6, 2026',
    stops: 0,
    stopsDescription: 'Direct non-stop flight',
    duration: '12h 45m',
    price: 2450,
    cabinClass: 'Business Class',
    baggage: '2 Checked bags (32kg) + Valet check',
    cancellationPolicy: 'Fully flexible',
    changePolicy: 'Free date modifications',
    recommendation: 'Best Schedule',
    selected: true,
    notes: 'A380 onboard lounge and chauffeur-drive service included at both origin and destination.'
  }
];

export const INITIAL_HOTELS: HotelOption[] = [
  {
    id: 'ht-manhattan',
    tripId: 'trip-204',
    name: 'Manhattan Executive Hotel',
    location: 'Midtown Manhattan, New York',
    address: '485 Lexington Avenue, New York, NY 10017',
    rating: 4.7,
    reviewsCount: 1420,
    distanceToMeeting: '0.4 miles',
    nightlyRate: 420,
    nights: 3,
    totalRate: 1260,
    roomType: 'Executive King Suite with City Skyline View',
    breakfastIncluded: true,
    cancellationPolicy: 'Flexible — Free cancellation until 4:00 PM on Sept 7',
    amenities: [
      'High-Speed Dedicated Executive Wi-Fi',
      'Executive Club Lounge Access',
      '24/7 Business Concierge & Printing',
      'Full Soundproofing & Nespresso Bar',
      'Luxury Car Valet & Chauffeur Staging',
      'State-of-the-art Fitness & Spa'
    ],
    recommendation: 'Best for Meetings',
    proximityNote: '5-minute walking distance to primary investor offices on Park Avenue. Zero transit delay risk.',
    selected: true,
    shortlisted: true,
    checkInDate: 'September 9, 2026',
    checkOutDate: 'September 12, 2026'
  },
  {
    id: 'ht-grand-central',
    tripId: 'trip-204',
    name: 'Grand Central Business Hotel',
    location: 'Grand Central / Murray Hill, New York',
    address: '109 E 42nd St, New York, NY 10017',
    rating: 4.5,
    reviewsCount: 980,
    distanceToMeeting: '0.8 miles',
    nightlyRate: 360,
    nights: 3,
    totalRate: 1080,
    roomType: 'Deluxe King Room',
    breakfastIncluded: true,
    cancellationPolicy: 'Free cancellation up to 48 hours prior to arrival',
    amenities: [
      'Complimentary Hot Breakfast',
      'High-Speed Wi-Fi',
      'Executive Boardroom Rental Available',
      'Dry Cleaning Express Service'
    ],
    recommendation: 'Best Value',
    proximityNote: 'Convenient subway access; 12-minute walk to Manhattan Office.',
    selected: false,
    shortlisted: true,
    checkInDate: 'September 9, 2026',
    checkOutDate: 'September 12, 2026'
  },
  {
    id: 'ht-city-plaza',
    tripId: 'trip-204',
    name: 'City Plaza Hotel',
    location: 'Chelsea / Flatiron, New York',
    address: '22 W 23rd St, New York, NY 10010',
    rating: 4.2,
    reviewsCount: 650,
    distanceToMeeting: '1.4 miles',
    nightlyRate: 295,
    nights: 3,
    totalRate: 885,
    roomType: 'Superior Queen Room',
    breakfastIncluded: false,
    cancellationPolicy: 'Non-refundable rate ($50 modification fee)',
    amenities: [
      'Standard Wi-Fi',
      'Fitness Room',
      'Cocktail Bar & Bistro'
    ],
    recommendation: 'Budget Alternative',
    proximityNote: 'Requires 20–25 minutes taxi commute in morning Midtown traffic.',
    selected: false,
    shortlisted: false,
    checkInDate: 'September 9, 2026',
    checkOutDate: 'September 12, 2026'
  },
  {
    id: 'ht-london-mayfair',
    tripId: 'trip-205',
    name: 'The Mayfair Executive Residences',
    location: 'Mayfair, London',
    address: 'Stratton Street, Mayfair, London W1J 8LT',
    rating: 4.8,
    reviewsCount: 1120,
    distanceToMeeting: '0.3 miles',
    nightlyRate: 460,
    nights: 4,
    totalRate: 1840,
    roomType: 'Mayfair Suite with Workstation',
    breakfastIncluded: true,
    cancellationPolicy: 'Free cancellation up to 24 hours prior to check-in',
    amenities: ['English Breakfast', 'Private Boardroom', 'Luxury Spa', 'Concierge'],
    recommendation: 'Recommended',
    proximityNote: 'Direct Elizabeth Line & Jubilee connection.',
    selected: true,
    shortlisted: true,
    checkInDate: 'September 21, 2026',
    checkOutDate: 'September 25, 2026'
  },
  {
    id: 'ht-dubai-difc',
    tripId: 'trip-206',
    name: 'Ritz DIFC Financial Executive Tower',
    location: 'DIFC, Dubai',
    address: 'Gate Village, DIFC, Dubai, UAE',
    rating: 4.9,
    reviewsCount: 1890,
    distanceToMeeting: '0.1 miles',
    nightlyRate: 520,
    nights: 4,
    totalRate: 2080,
    roomType: 'Club Executive Skyline Suite',
    breakfastIncluded: true,
    cancellationPolicy: 'Flexible cancellation until 6:00 PM day of arrival',
    amenities: ['Club Lounge access', 'Helipad staging', 'Chauffeur', '24h Butler'],
    recommendation: 'Prime Location',
    proximityNote: 'Direct climate-controlled concourse walkway to DIFC Gate Building.',
    selected: true,
    shortlisted: true,
    checkInDate: 'October 5, 2026',
    checkOutDate: 'October 9, 2026'
  }
];

export const INITIAL_TRANSPORTATION: TransportationItem[] = [
  {
    id: 'tr-1',
    tripId: 'trip-204',
    type: 'Airport Transfer',
    title: 'JFK Airport → Manhattan Executive Hotel',
    fromLocation: 'JFK International Airport (Terminal 4 Baggage Claim / Chauffeur Stand)',
    toLocation: 'Manhattan Executive Hotel (485 Lexington Ave)',
    date: 'September 9, 2026',
    time: '8:30 AM',
    vehicle: 'Executive Black Sedan (Cadillac Escalade / Mercedes S-Class)',
    driverName: 'Marcus Vance',
    driverPhone: '+1 (917) 555-0149',
    status: 'Confirmed',
    confirmationCode: 'NY-CHAUFFEUR-8821',
    cost: 180,
    notes: 'Driver will track GA-482 flight status live, holding personalized name tablet at VIP arrival gate with baggage assistance.'
  },
  {
    id: 'tr-2',
    tripId: 'trip-204',
    type: 'Car Service',
    title: 'Hotel → Investor Meeting',
    fromLocation: 'Manhattan Executive Hotel Lobby',
    toLocation: 'Manhattan Office (375 Park Avenue, 28th Fl)',
    date: 'September 10, 2026',
    time: '9:15 AM',
    vehicle: 'Executive Black Sedan',
    driverName: 'Marcus Vance',
    driverPhone: '+1 (917) 555-0149',
    status: 'Scheduled',
    confirmationCode: 'NY-CHAUFFEUR-8822',
    cost: 95,
    notes: 'Short commute with 20-min buffer. Chauffeur on 15-minute standby.'
  },
  {
    id: 'tr-3',
    tripId: 'trip-204',
    type: 'Car Service',
    title: 'Conference Venue → Hotel',
    fromLocation: 'Midtown Conference Center (6th Ave Entrance)',
    toLocation: 'Manhattan Executive Hotel',
    date: 'September 11, 2026',
    time: '6:00 PM',
    vehicle: 'Executive Sedan',
    driverName: 'David Lee',
    driverPhone: '+1 (917) 555-0177',
    status: 'Pending',
    confirmationCode: 'NY-CHAUFFEUR-8823',
    cost: 90,
    notes: 'Awaiting final speaker panel concluding time from event coordinators.'
  },
  {
    id: 'tr-4',
    tripId: 'trip-204',
    type: 'Airport Transfer',
    title: 'Hotel → JFK International Airport',
    fromLocation: 'Manhattan Executive Hotel Lobby',
    toLocation: 'JFK Terminal 4 (Departures Concourse)',
    date: 'September 12, 2026',
    time: '3:30 PM',
    vehicle: 'Executive Black SUV',
    driverName: 'Marcus Vance',
    driverPhone: '+1 (917) 555-0149',
    status: 'Confirmed',
    confirmationCode: 'NY-CHAUFFEUR-8824',
    cost: 155,
    notes: 'Accounts for Friday afternoon Van Wyck Expressway traffic. Allows 3h check-in buffer before international flight.'
  }
];

export const INITIAL_MEETINGS: MeetingItem[] = [
  {
    id: 'mtg-1',
    tripId: 'trip-204',
    title: 'Investor Meeting (Series B Recap & Q3 LP Update)',
    companyOrHost: 'Apex Global Ventures',
    date: 'September 10, 2026',
    time: '10:00 AM',
    endTime: '11:45 AM',
    durationMinutes: 105,
    location: 'Manhattan Office — Main Boardroom A',
    address: '375 Park Avenue, 28th Floor, New York, NY 10152',
    room: 'Executive Boardroom A (AV & Polycom equipped)',
    timeZone: 'EDT',
    attendeesCount: 4,
    attendees: ['Daniel Carter (CEO)', 'Arthur Pendelton (Managing Partner, Apex)', 'Rachel Zhang (VP Investments)', 'Siddharth Rao (Principal)'],
    status: 'Confirmed',
    preparationNotes: 'Print 4 copies of the Bound Confidential Investor Deck. Ensure digital pitch slides are pre-loaded on secure flash drive and shared via encrypted link. Catherine verified NDA signed on Aug 24.',
    transportationBufferMinutes: 30,
    keyDiscussionPoints: [
      'H1 2026 Portfolio revenue growth metrics (+44% YoY)',
      'Cross-border expansion into EMEA and APAC markets',
      'Follow-on syndicate allocation and term sheet covenants'
    ]
  },
  {
    id: 'mtg-2',
    tripId: 'trip-204',
    title: 'Partner Strategy Meeting (FinTech Infrastructure Integration)',
    companyOrHost: 'Gotham Financial Technologies',
    date: 'September 10, 2026',
    time: '2:00 PM',
    endTime: '3:30 PM',
    durationMinutes: 90,
    location: 'Midtown Conference Center — Suite 1400',
    address: '1133 Avenue of the Americas, New York, NY 10036',
    room: 'Strategy Suite 14B',
    timeZone: 'EDT',
    attendeesCount: 6,
    attendees: ['Daniel Carter', 'Victoria Sterling (CEO, Gotham)', 'Trevor Belmont (EVP Products)', '3 Senior Architects'],
    status: 'Confirmed',
    preparationNotes: 'Review Gotham API partnership terms & technical SLA annex prior to session. Lunch scheduled prior at 12:30 PM in private dining.',
    transportationBufferMinutes: 30,
    keyDiscussionPoints: [
      'Core payment rails redundancy and ISO20022 compliance',
      'Joint go-to-market rollout for Tier 1 asset managers',
      'Co-branded press release timeline for Q4'
    ]
  },
  {
    id: 'mtg-3',
    tripId: 'trip-204',
    title: 'Executive Dinner & LP Relationship Building',
    companyOrHost: 'Vanguard Capital / Host Table',
    date: 'September 10, 2026',
    time: '5:30 PM',
    endTime: '8:00 PM',
    durationMinutes: 150,
    location: 'Hudson Restaurant — Private Cellar Room',
    address: '428 Hudson Street, West Village, New York, NY 10014',
    room: 'Private Wine Cellar & Sommelier Table',
    timeZone: 'EDT',
    attendeesCount: 5,
    attendees: ['Daniel Carter', 'Jonathan Ross (Founding Partner)', 'Lady Evelyn Vance (Anchor LP)', 'David Sterling', 'Catherine Ngina (Coordinated remotely)'],
    status: 'Confirmed',
    preparationNotes: 'Dietary restrictions (gluten-free & pescatarian options) pre-confirmed with Executive Chef Marco on Aug 26. Table guaranteed under Daniel Carter / Vanguard Corporate Account #7712.',
    transportationBufferMinutes: 45,
    keyDiscussionPoints: [
      'Informal partnership celebration',
      'Long-term family office allocation strategy',
      'Overview of next quarter European roadshow dates'
    ]
  },
  {
    id: 'mtg-4',
    tripId: 'trip-204',
    title: 'Institutional Banker Breakfast & Escrow Architecture',
    companyOrHost: 'Morgan & Chase Trust Advisory',
    date: 'September 11, 2026',
    time: '8:30 AM',
    endTime: '10:00 AM',
    durationMinutes: 90,
    location: 'Private Dining Suite — Manhattan Executive Hotel',
    address: '485 Lexington Avenue, New York, NY 10017',
    room: 'Salon B, 4th Floor',
    timeZone: 'EDT',
    attendeesCount: 3,
    attendees: ['Daniel Carter', 'Harrison Cole (Managing Director)', 'Claire DeWitt (Senior Counsel)'],
    status: 'Confirmed',
    preparationNotes: 'Review depository rates schedule. Escrow draft doc #D-902 attached.',
    transportationBufferMinutes: 15,
    keyDiscussionPoints: ['International treasury clearing', 'Custodial fee caps']
  }
];

export const INITIAL_DAY_ITINERARIES: Record<string, DayItineraryItem[]> = {
  'trip-204': [
    {
      dayNumber: 1,
      date: 'Tuesday, Sep 8 – Wednesday, Sep 9',
      theme: 'Travel & Arrival',
      summary: 'Overnight Business flight from Nairobi (NBO) to New York (JFK), VIP airport transfer, early hotel check-in & executive briefing.',
      activities: [
        {
          time: '8:00 PM (Sep 8)',
          title: 'Arrive at Nairobi (NBO) Terminal 1A',
          type: 'flight',
          location: 'Jomo Kenyatta International Airport',
          details: 'VIP check-in at Global Air Business Desk. Fast-track security & lounge access.',
          highlight: false
        },
        {
          time: '10:30 PM (Sep 8)',
          title: 'Flight GA-482 Departure to JFK',
          type: 'flight',
          location: 'Gate 14',
          details: 'Global Air Business Suite (Seat 2A). Overnight lie-flat sleep scheduled.',
          highlight: true
        },
        {
          time: '7:15 AM (Sep 9)',
          title: 'Flight Arrival at JFK (Terminal 4)',
          type: 'flight',
          location: 'New York JFK Airport',
          details: 'Global Entry / Diplomatic fast-track passport control. Luggage collected at VIP Carousel #2.',
          highlight: false
        },
        {
          time: '8:30 AM (Sep 9)',
          title: 'Executive Chauffeur Transfer to Midtown',
          type: 'transfer',
          location: 'JFK Chauffeur Stand → 485 Lexington Ave',
          details: 'Driver Marcus Vance in Cadillac Escalade. Live GPS tracking monitored by Catherine Ngina.',
          highlight: true
        },
        {
          time: '9:30 AM (Sep 9)',
          title: 'Check-in: Manhattan Executive Hotel',
          type: 'hotel',
          location: '485 Lexington Ave, Midtown',
          details: 'Guaranteed early check-in arranged. Executive King Suite. Welcome fruit bowl & espresso ready.',
          highlight: false
        },
        {
          time: '11:00 AM (Sep 9)',
          title: 'Virtual Briefing with Catherine Ngina (VA)',
          type: 'meeting',
          location: 'Hotel Executive Lounge / Teams',
          details: 'Review itinerary adjustments, print bound briefs, reconfirm Day 2 meeting logistics.',
          highlight: false
        },
        {
          time: '6:30 PM (Sep 9)',
          title: 'Light Dinner & Acclimatization',
          type: 'meal',
          location: 'Hotel Bistro',
          details: 'Quiet dinner and rest to ensure peak performance for Thursday investor meetings.',
          highlight: false
        }
      ]
    },
    {
      dayNumber: 2,
      date: 'Thursday, September 10, 2026',
      theme: 'Investor Meetings & Keynote Sessions',
      summary: 'High-priority LP investor pitches, fintech partnership meetings, and private executive dinner.',
      activities: [
        {
          time: '7:30 AM',
          title: 'Executive Breakfast & Deck Review',
          type: 'meal',
          location: 'Club Lounge, Manhattan Executive Hotel',
          details: 'Full breakfast served. Final run-through of Series B valuation slides.',
          highlight: false
        },
        {
          time: '9:15 AM',
          title: 'Chauffeur Staging & Transfer to Park Ave',
          type: 'transfer',
          location: 'Hotel → 375 Park Ave',
          details: 'Marcus Vance on standby. 15-minute buffer built in.',
          highlight: false
        },
        {
          time: '10:00 AM',
          title: 'Investor Meeting: Apex Global Ventures',
          type: 'meeting',
          location: '375 Park Avenue, 28th Floor',
          details: 'Key Q3 LP presentation with Arthur Pendelton & investment committee.',
          highlight: true
        },
        {
          time: '12:30 PM',
          title: 'Private Luncheon with Victoria Sterling',
          type: 'meal',
          location: 'The Grill (99 E 52nd St)',
          details: 'Strategic alignment prior to afternoon technical session.',
          highlight: false
        },
        {
          time: '2:00 PM',
          title: 'Partner Strategy Meeting: Gotham Technologies',
          type: 'meeting',
          location: 'Midtown Conference Center — Suite 1400',
          details: 'Fintech rails integration & co-marketing roadmap.',
          highlight: true
        },
        {
          time: '4:00 PM',
          title: 'Debrief & Follow-up Notes with VA Catherine',
          type: 'networking',
          location: 'Hotel Executive Worksuite',
          details: 'Send audio memos; Catherine logs immediate term-sheet action items in CRM.',
          highlight: false
        },
        {
          time: '5:30 PM',
          title: 'Executive Dinner & LP Relationship Building',
          type: 'meal',
          location: 'Hudson Restaurant — Private Wine Cellar',
          details: 'Dinner with anchor LP Lady Evelyn Vance & partners.',
          highlight: true
        }
      ]
    },
    {
      dayNumber: 3,
      date: 'Friday, September 11, 2026',
      theme: 'Partner Meetings & Banking Coordination',
      summary: 'Institutional banking breakfast, legal structuring, and venture syndicate roundtables.',
      activities: [
        {
          time: '8:30 AM',
          title: 'Institutional Banker Breakfast',
          type: 'meeting',
          location: 'Manhattan Executive Hotel Private Salon B',
          details: 'Escrow facility & custodial agreements with Morgan & Chase advisory.',
          highlight: true
        },
        {
          time: '11:00 AM',
          title: 'Legal Counsel Working Session',
          type: 'meeting',
          location: 'Midtown Legal Chambers (Skadden Annex)',
          details: 'Review Delaware statutory conversion clauses.',
          highlight: false
        },
        {
          time: '1:30 PM',
          title: 'Working Lunch with Tech Founders Cohort',
          type: 'networking',
          location: 'Avra Madison Estiatorio',
          details: 'Informal networking with 6 portfolio CEOs.',
          highlight: false
        },
        {
          time: '4:00 PM',
          title: 'Closing Executive Debrief',
          type: 'meeting',
          location: 'Hotel Boardroom',
          details: 'Finalize action items and wire instructions.',
          highlight: false
        },
        {
          time: '7:00 PM',
          title: 'Broadway Cultural Event / Executive Networking',
          type: 'networking',
          location: 'Lincoln Center',
          details: 'Reserved orchestra seating (arranged by Catherine Ngina).',
          highlight: false
        }
      ]
    },
    {
      dayNumber: 4,
      date: 'Saturday, September 12, 2026',
      theme: 'Conference / Networking & Departure',
      summary: 'Morning executive breakfast, document sign-off, airport transfer, and departure.',
      activities: [
        {
          time: '9:00 AM',
          title: 'Wrap-Up Breakfast & Travel Brief Review',
          type: 'meal',
          location: 'Executive Lounge',
          details: 'Catherine delivers final expense summary & follow-up task log.',
          highlight: false
        },
        {
          time: '12:00 PM',
          title: 'Hotel Check-out & Luggage Staging',
          type: 'hotel',
          location: 'Manhattan Executive Hotel Lobby',
          details: 'Late check-out pre-confirmed. Luggage held with Chief Concierge.',
          highlight: false
        },
        {
          time: '1:00 PM',
          title: 'Informal Coffee with Venture Angel Syndicate',
          type: 'networking',
          location: 'Ralph\'s Coffee on Madison',
          details: 'Casual 45-minute wrap up with regional co-investors.',
          highlight: false
        },
        {
          time: '3:30 PM',
          title: 'Chauffeur Transfer to JFK International Airport',
          type: 'transfer',
          location: 'Hotel → JFK Terminal 4',
          details: 'Marcus Vance in Executive SUV. Flight GA-483 departure at 6:45 PM.',
          highlight: true
        },
        {
          time: '6:45 PM',
          title: 'Flight GA-483 Departure to Nairobi (NBO)',
          type: 'flight',
          location: 'JFK Terminal 4 Gate B28',
          details: 'Business Suite 2A. In-flight meal pre-selected.',
          highlight: true
        }
      ]
    },
    {
      dayNumber: 5,
      date: 'Sunday, September 13, 2026',
      theme: 'Arrival & Post-Trip Follow-Ups',
      summary: 'Arrival in Nairobi, VIP home transfer, and VA post-travel reporting.',
      activities: [
        {
          time: '3:15 PM',
          title: 'Touchdown at Nairobi (NBO)',
          type: 'flight',
          location: 'Jomo Kenyatta International',
          details: 'VIP greeting & expedited clearance.',
          highlight: false
        },
        {
          time: '4:15 PM',
          title: 'Home Chauffeur Transfer',
          type: 'transfer',
          location: 'NBO → Executive Residence (Karen/Muthaiga)',
          details: 'Pre-scheduled vehicle #NB-9901.',
          highlight: false
        },
        {
          time: '6:00 PM',
          title: 'Post-Trip Operations Handover by Catherine',
          type: 'meeting',
          location: 'Remote Operations Desk',
          details: 'Complete travel expense report, signed NDA copies, and LP thank-you letters dispatched.',
          highlight: true
        }
      ]
    }
  ]
};

export const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-1',
    tripId: 'trip-204',
    title: 'Global Air Return Business Class Flight (NBO-JFK)',
    category: 'Flights',
    amount: 2960,
    date: '2026-08-25',
    status: 'Paid',
    vendor: 'Global Air Corporate Desk',
    paymentMethod: 'Vanguard Corporate Amex ...9012',
    notes: 'Ticket #GA-7718290. Includes lie-flat seat, flex cancellation & 2 checked bags.'
  },
  {
    id: 'exp-2',
    tripId: 'trip-204',
    title: 'Manhattan Executive Hotel (3 Nights King Suite)',
    category: 'Hotel',
    amount: 1260,
    date: '2026-08-26',
    status: 'Estimated',
    vendor: 'Manhattan Executive Hotel',
    paymentMethod: 'Corporate Guarantee Card',
    notes: 'Rate $420/night + local taxes and resort fees. Includes breakfast & lounge access.'
  },
  {
    id: 'exp-3',
    tripId: 'trip-204',
    title: 'Executive Chauffeur Package (Airport Transfers & Intra-City)',
    category: 'Transportation',
    amount: 520,
    date: '2026-08-26',
    status: 'Paid',
    vendor: 'Empire Executive Chauffeurs NYC',
    paymentMethod: 'Vanguard Corporate Amex ...9012',
    notes: 'Includes JFK arrival, Park Ave transfer, Midtown pickup, and JFK return transfer.'
  },
  {
    id: 'exp-4',
    tripId: 'trip-204',
    title: 'Executive Dinner at Hudson Restaurant (5 Guests)',
    category: 'Meals',
    amount: 600,
    date: '2026-08-27',
    status: 'Estimated',
    vendor: 'Hudson Restaurant West Village',
    paymentMethod: 'Corporate Table Deposit ($200 paid, $400 estimated bal)',
    notes: 'Private Wine Cellar room for investor and LP relationship building.'
  },
  {
    id: 'exp-5',
    tripId: 'trip-204',
    title: 'Boardroom AV & Polycom Technology Rental',
    category: 'Meetings',
    amount: 300,
    date: '2026-08-26',
    status: 'Paid',
    vendor: 'Midtown Conference Services',
    paymentMethod: 'Vanguard Corporate Amex ...9012',
    notes: 'High-def video conferencing and presentation tech for Gotham meeting.'
  },
  {
    id: 'exp-6',
    tripId: 'trip-204',
    title: 'Emergency Travel Contingency Reserve',
    category: 'Contingency',
    amount: 300,
    date: '2026-08-27',
    status: 'Estimated',
    vendor: 'Contingency Allocation',
    paymentMethod: 'Pre-Authorized Reserve',
    notes: 'Dedicated buffer for weather delays, alternate car routing, or extra meeting supplies.'
  }
];

export const INITIAL_FOLLOW_UPS: FollowUpItem[] = [
  {
    id: 'fu-1',
    tripId: 'trip-204',
    tripCode: 'TRIP-204',
    title: 'Confirm airport transfer & driver pickup details',
    dueDate: '2026-08-29',
    priority: 'High',
    status: 'Pending',
    vendorOrContact: 'Empire Executive Chauffeurs (Marcus Vance)',
    contactEmail: 'dispatch@empirechauffeur.com',
    contactPhone: '+1 (917) 555-0149',
    category: 'Transportation',
    notes: 'Reconfirm flight GA-482 landing time and confirm meet-and-greet tablet spelling.'
  },
  {
    id: 'fu-2',
    tripId: 'trip-204',
    tripCode: 'TRIP-204',
    title: 'Send updated itinerary & bound deck to Daniel Carter',
    dueDate: '2026-08-30',
    priority: 'Medium',
    status: 'Pending',
    vendorOrContact: 'Daniel Carter (Executive)',
    contactEmail: 'd.carter@vanguardcp.com',
    category: 'Document',
    notes: 'Email interactive PDF brief and notify executive via WhatsApp with key timings.'
  },
  {
    id: 'fu-3',
    tripId: 'trip-204',
    tripCode: 'TRIP-204',
    title: 'Confirm investor meeting agenda with Arthur Pendelton (Apex)',
    dueDate: '2026-09-02',
    priority: 'High',
    status: 'Pending',
    vendorOrContact: 'Apex Global Ventures (EA: Sarah Jenkins)',
    contactEmail: 's.jenkins@apexventures.com',
    contactPhone: '+1 (212) 555-0120',
    category: 'Meeting',
    notes: 'Lock down boardroom access badges and ensure visitor security list is cleared.'
  },
  {
    id: 'fu-4',
    tripId: 'trip-204',
    tripCode: 'TRIP-204',
    title: 'Verify hotel cancellation & early check-in policy guarantee',
    dueDate: '2026-08-28',
    priority: 'Medium',
    status: 'Due Today',
    vendorOrContact: 'Manhattan Executive Hotel (Front Desk Manager)',
    contactEmail: 'concierge@manhattanexec.com',
    contactPhone: '+1 (212) 555-0188',
    category: 'Hotel',
    notes: 'Ensure room is blocked from 8:00 AM on Sept 9 for seamless morning rest.'
  },
  {
    id: 'fu-5',
    tripId: 'trip-205',
    tripCode: 'TRIP-205',
    title: 'Shortlist 2 secondary hotels near London ExCeL',
    dueDate: '2026-08-31',
    priority: 'Medium',
    status: 'Upcoming',
    vendorOrContact: 'London Travel Concierge',
    category: 'Hotel',
    notes: 'Check Canary Wharf vs Mayfair transit times during morning peak hours.'
  },
  {
    id: 'fu-6',
    tripId: 'trip-206',
    tripCode: 'TRIP-206',
    title: 'Verify UAE 90-day visa waiver rules for UK passport holder',
    dueDate: '2026-09-05',
    priority: 'High',
    status: 'Upcoming',
    vendorOrContact: 'UAE Embassy Consular Section',
    category: 'General',
    notes: 'Confirm Olivia Bennett passport validity has >6 months remaining.'
  },
  {
    id: 'fu-7',
    tripId: 'trip-204',
    tripCode: 'TRIP-204',
    title: 'Pre-order gluten-free dietary menu at Hudson Restaurant',
    dueDate: '2026-08-26',
    priority: 'Low',
    status: 'Completed',
    vendorOrContact: 'Hudson Restaurant (Chef Marco)',
    category: 'Meeting',
    notes: 'Chef confirmed dedicated custom tasting menu for Table Carter.',
    completedAt: '2026-08-26'
  }
];

export const INITIAL_DOCUMENTS: TravelDocument[] = [
  {
    id: 'doc-1',
    tripId: 'trip-204',
    tripCode: 'TRIP-204',
    title: 'Global Air Flight E-Ticket & Confirmation (GA-482 / GA-110)',
    type: 'Flight Confirmation',
    status: 'Ready',
    lastUpdated: 'Aug 26, 2026',
    fileSize: '1.4 MB',
    fileFormat: 'PDF',
    summaryText: 'Official electronic ticket receipt for Daniel Carter. NBO-DOH-JFK Business Class. Booking Ref: VNG-GA-9021.'
  },
  {
    id: 'doc-2',
    tripId: 'trip-204',
    tripCode: 'TRIP-204',
    title: 'Manhattan Executive Hotel Booking Voucher & Guarantee',
    type: 'Hotel Confirmation',
    status: 'Ready',
    lastUpdated: 'Aug 26, 2026',
    fileSize: '840 KB',
    fileFormat: 'PDF',
    summaryText: 'Confirmed reservation #MEH-485-992. 3 Nights in Executive King Suite with complimentary Club Lounge privileges.'
  },
  {
    id: 'doc-3',
    tripId: 'trip-204',
    tripCode: 'TRIP-204',
    title: 'Executive Master Itinerary & Daily Schedule (Sep 8–12)',
    type: 'Executive Itinerary',
    status: 'Ready',
    lastUpdated: 'Aug 27, 2026',
    fileSize: '2.1 MB',
    fileFormat: 'PDF',
    summaryText: 'Comprehensive 5-day synchronized itinerary curated by Catherine Ngina with live contact numbers and contingency maps.'
  },
  {
    id: 'doc-4',
    tripId: 'trip-204',
    tripCode: 'TRIP-204',
    title: 'Apex & Gotham Investor Meetings Confidential Agenda',
    type: 'Meeting Agenda',
    status: 'Ready',
    lastUpdated: 'Aug 25, 2026',
    fileSize: '1.8 MB',
    fileFormat: 'PDF',
    summaryText: 'Annotated agenda, attendee bios, and discussion points for 375 Park Ave and Midtown Conference meetings.'
  },
  {
    id: 'doc-5',
    tripId: 'trip-204',
    tripCode: 'TRIP-204',
    title: 'AIG Executive Global Travel & Medical Insurance Certificate',
    type: 'Travel Insurance',
    status: 'Ready',
    lastUpdated: 'Aug 24, 2026',
    fileSize: '620 KB',
    fileFormat: 'PDF',
    summaryText: 'Policy #AIG-EXEC-004928. $2,000,000 international emergency medical coverage & flight delay protection.'
  },
  {
    id: 'doc-6',
    tripId: 'trip-204',
    tripCode: 'TRIP-204',
    title: 'Empire Chauffeur Dispatch & Meet-and-Greet Voucher',
    type: 'Airport Transfer Confirmation',
    status: 'Ready',
    lastUpdated: 'Aug 26, 2026',
    fileSize: '510 KB',
    fileFormat: 'PDF',
    summaryText: 'JFK Chauffeur assignment details. Driver Marcus Vance (+1 917-555-0149). Cadillac Escalade Black.'
  },
  {
    id: 'doc-7',
    tripId: 'trip-204',
    tripCode: 'TRIP-204',
    title: 'Executive One-Page Travel Briefing Memo',
    type: 'Travel Brief',
    status: 'Needs Review',
    lastUpdated: 'Aug 27, 2026',
    fileSize: '950 KB',
    fileFormat: 'PDF',
    summaryText: 'C-Suite executive summary briefing document for Daniel Carter containing all key logistics on a single printable page.'
  },
  {
    id: 'doc-8',
    tripId: 'trip-204',
    tripCode: 'TRIP-204',
    title: 'Consolidated Expense Summary & Pre-Trip Ledger',
    type: 'Expense Summary',
    status: 'Pending',
    lastUpdated: 'Aug 27, 2026',
    fileSize: '780 KB',
    fileFormat: 'PDF',
    summaryText: 'Budget variance analysis: $6,800 allocated vs $5,940 committed. 87% budget utilization.'
  }
];

export const INITIAL_RISKS: RiskContingencyItem[] = [
  {
    id: 'risk-1',
    tripId: 'trip-204',
    category: 'Flight Delay',
    riskDescription: 'Potential connecting flight delay in Doha (DOH) due to air traffic congestion.',
    mitigationPlan: 'Backup Qatar Airways QR-701 & Emirates EK-201 identified with lie-flat business seats available on 2-hour standby.',
    statusRisk: 'Low Risk',
    backupContact: 'Global Air VIP Desk: +1 (800) 555-0199',
    actionTaken: 'Monitored on FlightAware radar with SMS push notifications enabled to Catherine.'
  },
  {
    id: 'risk-2',
    tripId: 'trip-204',
    category: 'Meeting Conflict',
    riskDescription: 'Investor meeting at 375 Park Ave running past 11:45 AM, cutting into travel time for 2:00 PM Gotham session.',
    mitigationPlan: '30-minute schedule buffer built into itinerary. Executive luncheon is walking distance (3 mins) with flexible kitchen staging.',
    statusRisk: 'Low Risk',
    backupContact: 'Sarah Jenkins (Apex EA): +1 (212) 555-0120',
    actionTaken: 'Gotham team notified of potential +/- 15 min flex window.'
  },
  {
    id: 'risk-3',
    tripId: 'trip-204',
    category: 'Airport Transfer Delay',
    riskDescription: 'Van Wyck Expressway morning construction causing delays between JFK and Manhattan.',
    mitigationPlan: 'Chauffeur instructed to monitor live Waze & Helicopter express options; Grand Central Parkway alternate route mapped.',
    statusRisk: 'Medium Risk',
    backupContact: 'Empire Dispatch: +1 (917) 555-0149',
    actionTaken: 'Driver scheduled for 8:30 AM curbside staging (45 mins before expected gate exit).'
  },
  {
    id: 'risk-4',
    tripId: 'trip-204',
    category: 'Hotel Issue',
    riskDescription: 'Early morning room unreadiness upon 9:30 AM arrival at Manhattan Executive Hotel.',
    mitigationPlan: 'Early check-in guaranteed in writing. In event of delay, executive club lounge suite and private shower pre-reserved for Daniel.',
    statusRisk: 'Low Risk',
    backupContact: 'Front Desk Lead Concierge: +1 (212) 555-0188',
    actionTaken: 'Written guarantee on file #MEH-VIP-GUARANTEE.'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Hotel Guarantee Reconfirmed',
    message: 'Manhattan Executive Hotel locked in early check-in for Daniel Carter (TRIP-204).',
    timestamp: '10 mins ago',
    read: false,
    type: 'success',
    tripCode: 'TRIP-204',
    targetNav: 'hotels'
  },
  {
    id: 'notif-2',
    title: 'Follow-Up Due Today',
    message: 'Verify hotel cancellation policy due today before 5:00 PM EST.',
    timestamp: '1 hour ago',
    read: false,
    type: 'warning',
    tripCode: 'TRIP-204',
    targetNav: 'follow-ups'
  },
  {
    id: 'notif-3',
    title: 'Driver Marcus Vance Assigned',
    message: 'Empire Chauffeur confirmed for JFK airport pickup with Cadillac Escalade.',
    timestamp: '3 hours ago',
    read: true,
    type: 'info',
    tripCode: 'TRIP-204',
    targetNav: 'transportation'
  },
  {
    id: 'notif-4',
    title: 'Dubai Trip Research Underway',
    message: 'Comparing direct Emirates flight routes for Olivia Bennett (TRIP-206).',
    timestamp: 'Yesterday',
    read: true,
    type: 'info',
    tripCode: 'TRIP-206',
    targetNav: 'flight-research'
  }
];

export const TODAY_TASKS = [
  { id: 'task-1', title: 'Confirm airport transfer with Marcus Vance', category: 'Transportation', completed: false, priority: 'High' },
  { id: 'task-2', title: 'Compare two hotel options for London Trip (TRIP-205)', category: 'Hotels', completed: false, priority: 'Medium' },
  { id: 'task-3', title: 'Add investor meeting to itinerary (Apex Global)', category: 'Meetings', completed: true, priority: 'High' },
  { id: 'task-4', title: 'Send updated executive travel brief to Daniel Carter', category: 'Documents', completed: false, priority: 'High' },
  { id: 'task-5', title: 'Verify flight connection & luggage interline in Doha', category: 'Flights', completed: true, priority: 'Medium' },
  { id: 'task-6', title: 'Prepare executive travel brief for New York trip', category: 'Brief', completed: false, priority: 'High' }
];
