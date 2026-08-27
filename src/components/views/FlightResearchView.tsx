import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import {
  Plane,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Luggage,
  RefreshCw,
  Info,
  ChevronRight,
  Plus
} from 'lucide-react';

export const FlightResearchView: React.FC = () => {
  const { flights, selectedTripId, currentTrip, selectFlightOption } = useTravel();

  const tripFlights = flights.filter(f => f.tripId === (currentTrip?.id || 'trip-204'));
  const currentFlights = tripFlights.length > 0 ? tripFlights : flights.slice(0, 3);

  const [compareModalOpen, setCompareModalOpen] = useState(false);

  return (
    <div id="flight-research-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-100 text-sky-800 border border-sky-200">
              Aviation Logistics
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono font-bold text-slate-600">{currentTrip?.code} ({currentTrip?.destination})</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 font-heading">
            Flight Research & Comparison
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Benchmarking business-class routing, layover ergonomics, lie-flat sleep feasibility, and corporate fare flexibilities.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            id="flight-matrix-compare-btn"
            onClick={() => setCompareModalOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
          >
            Full Comparison Matrix
          </button>
        </div>
      </div>

      {/* Flight Option Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {currentFlights.map((flight, idx) => {
          const optionLetter = ['A', 'B', 'C'][idx] || String.fromCharCode(65 + idx);
          const isSelected = flight.selected;

          let badgeColor = 'bg-slate-100 text-slate-800 border-slate-200';
          if (flight.recommendation === 'Best Schedule') badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
          if (flight.recommendation === 'Best Price') badgeColor = 'bg-sky-100 text-sky-800 border-sky-300';
          if (flight.recommendation === 'Not Preferred') badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';

          return (
            <div
              key={flight.id}
              id={`flight-option-${optionLetter.toLowerCase()}`}
              className={`bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 ${
                isSelected
                  ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md'
                  : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div>
                {/* Option Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center font-mono">
                      {optionLetter}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{flight.airline}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{flight.flightNumber}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                    {flight.recommendation}
                  </span>
                </div>

                {/* Price & Class */}
                <div className="mb-4 flex items-baseline justify-between bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900 font-heading">
                      ${flight.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 font-normal"> / passenger</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                    {flight.cabinClass}
                  </span>
                </div>

                {/* Flight Route & Timings */}
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between font-semibold">
                    <div className="text-left">
                      <span className="text-[10px] text-slate-400 block font-normal">Origin</span>
                      <span className="text-sm font-bold text-slate-900">{flight.originCode}</span>
                      <span className="block text-[11px] text-slate-500">{flight.departureTime}</span>
                    </div>

                    <div className="flex-1 px-3 flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{flight.duration}</span>
                      </span>
                      <div className="w-full flex items-center my-1">
                        <div className="h-0.5 flex-1 bg-slate-200"></div>
                        <Plane className="w-3.5 h-3.5 text-slate-400 mx-1 transform rotate-90" />
                        <div className="h-0.5 flex-1 bg-slate-200"></div>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-600">
                        {flight.stops === 0 ? 'Direct Non-Stop' : `${flight.stops} Stop`}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-normal">Destination</span>
                      <span className="text-sm font-bold text-slate-900">{flight.destCode}</span>
                      <span className="block text-[11px] text-slate-500">{flight.arrivalTime}</span>
                    </div>
                  </div>

                  {flight.stopsDescription && (
                    <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      {flight.stopsDescription}
                    </p>
                  )}

                  {/* Policy and Baggage Details */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px]">
                    <div className="flex items-start gap-1.5 text-slate-600">
                      <Luggage className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{flight.baggage}</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-slate-600">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{flight.cancellationPolicy}</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-slate-600">
                      <RefreshCw className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{flight.changePolicy}</span>
                    </div>
                  </div>

                  {flight.notes && (
                    <p className="text-[11px] text-slate-600 bg-amber-50/60 p-2 rounded-lg border border-amber-200/60 leading-relaxed mt-2">
                      <strong className="text-amber-900 font-semibold">VA Assessment:</strong> {flight.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Select Flight Button */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  id={`select-flight-${flight.id}`}
                  onClick={() => selectFlightOption(flight.id, currentTrip?.id || 'trip-204')}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Selected for Trip</span>
                    </>
                  ) : (
                    <span>Select Option {optionLetter}</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-Side Comparison Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Comprehensive Route Comparison Matrix
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Key evaluation fields reviewed by Catherine Ngina before presenting to executive leadership.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse" id="flight-comparison-table">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 font-bold text-slate-600">
                <th className="py-3 px-4 w-40">Comparison Metric</th>
                {currentFlights.map((f, i) => (
                  <th key={f.id} className="py-3 px-4 font-bold text-slate-900">
                    Option {['A', 'B', 'C'][i] || i + 1}: {f.airline}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/40">Price</td>
                {currentFlights.map(f => (
                  <td key={f.id} className="py-3 px-4 font-mono font-bold text-slate-900">
                    ${f.price.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/40">Duration</td>
                {currentFlights.map(f => (
                  <td key={f.id} className="py-3 px-4 font-medium">
                    {f.duration}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/40">Stops & Routing</td>
                {currentFlights.map(f => (
                  <td key={f.id} className="py-3 px-4">
                    {f.stops === 0 ? 'Direct non-stop' : `${f.stops} stop (${f.stopsDescription})`}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/40">Departure Time</td>
                {currentFlights.map(f => (
                  <td key={f.id} className="py-3 px-4 font-medium">
                    {f.departureTime}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/40">Arrival Time</td>
                {currentFlights.map(f => (
                  <td key={f.id} className="py-3 px-4 font-medium">
                    {f.arrivalTime}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/40">Baggage Allowance</td>
                {currentFlights.map(f => (
                  <td key={f.id} className="py-3 px-4">
                    {f.baggage}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/40">Cancellation Policy</td>
                {currentFlights.map(f => (
                  <td key={f.id} className="py-3 px-4">
                    {f.cancellationPolicy}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/40">Change Policy</td>
                {currentFlights.map(f => (
                  <td key={f.id} className="py-3 px-4">
                    {f.changePolicy}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/40">Recommendation</td>
                {currentFlights.map(f => (
                  <td key={f.id} className="py-3 px-4 font-bold text-sky-700">
                    {f.recommendation}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
