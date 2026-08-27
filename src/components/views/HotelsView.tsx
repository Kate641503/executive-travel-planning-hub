import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { HotelOption } from '../../types';
import {
  Building2,
  Star,
  MapPin,
  Coffee,
  Check,
  Bookmark,
  CheckCircle2,
  Info,
  ShieldCheck,
  Sparkles,
  X,
  Plus
} from 'lucide-react';

export const HotelsView: React.FC = () => {
  const { hotels, currentTrip, selectHotelOption, toggleShortlistHotel } = useTravel();

  const tripHotels = hotels.filter(h => h.tripId === (currentTrip?.id || 'trip-204'));
  const activeHotels = tripHotels.length > 0 ? tripHotels : hotels.slice(0, 3);

  const [selectedDetailHotel, setSelectedDetailHotel] = useState<HotelOption | null>(null);

  return (
    <div id="hotels-comparison-view" className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
              Executive Accommodation
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono font-bold text-slate-600">{currentTrip?.code} ({currentTrip?.destination})</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 font-heading">
            Hotel Research & Comparison
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Evaluating executive suites based on meeting proximity, corporate amenities, Wi-Fi performance, and flexibility.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-medium text-slate-500">
            {activeHotels.filter(h => h.shortlisted).length} Shortlisted
          </span>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {activeHotels.map(hotel => {
          const isSelected = hotel.selected;
          const isShortlisted = hotel.shortlisted;

          return (
            <div
              key={hotel.id}
              id={`hotel-card-${hotel.id}`}
              className={`bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                  : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header: Name + Rating + Shortlist */}
                <div className="flex items-start justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                      {hotel.recommendation}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug mt-0.5 truncate">
                      {hotel.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-slate-900 ml-1">{hotel.rating}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">({hotel.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <button
                    id={`shortlist-hotel-${hotel.id}`}
                    onClick={() => toggleShortlistHotel(hotel.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isShortlisted
                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                    }`}
                    title={isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
                  >
                    <Bookmark className={`w-4 h-4 ${isShortlisted ? 'fill-amber-400' : ''}`} />
                  </button>
                </div>

                {/* Price Box */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 mb-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900 font-heading">
                      ${hotel.nightlyRate}
                    </span>
                    <span className="text-xs text-slate-500 font-normal"> / night</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 font-mono block">
                      ${hotel.totalRate} Total
                    </span>
                    <span className="text-[10px] text-slate-400">{hotel.nights} Nights</span>
                  </div>
                </div>

                {/* Location & Proximity */}
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900">{hotel.location}</span>
                      <p className="text-[11px] text-slate-500">{hotel.address}</p>
                    </div>
                  </div>

                  <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/60 text-[11px] text-emerald-900">
                    <strong>Meeting Proximity:</strong> {hotel.distanceToMeeting} ({hotel.proximityNote})
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Breakfast:</span>
                      <span className="font-semibold text-slate-800">
                        {hotel.breakfastIncluded ? '✓ Included (Executive Buffet)' : 'Not included'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Room Type:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-40 text-right">
                        {hotel.roomType}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-2 pt-1 border-t border-slate-100">
                      <span className="text-slate-400 shrink-0">Cancellation:</span>
                      <span className="font-medium text-slate-700 text-right text-[10px]">
                        {hotel.cancellationPolicy}
                      </span>
                    </div>
                  </div>

                  {/* Amenities Pills */}
                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Executive Amenities
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {hotel.amenities.slice(0, 3).map((amenity, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 font-medium">
                          +{hotel.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  id={`select-hotel-${hotel.id}`}
                  onClick={() => selectHotelOption(hotel.id, currentTrip?.id || 'trip-204')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Selected Hotel</span>
                    </>
                  ) : (
                    <span>Select Hotel</span>
                  )}
                </button>

                <button
                  id={`view-hotel-details-${hotel.id}`}
                  onClick={() => setSelectedDetailHotel(hotel)}
                  className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hotel Detail Modal */}
      {selectedDetailHotel && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Accommodation Specification
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{selectedDetailHotel.name}</h3>
                <p className="text-xs text-slate-500">{selectedDetailHotel.address}</p>
              </div>
              <button
                onClick={() => setSelectedDetailHotel(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Rating</span>
                  <span className="text-sm font-bold text-slate-900">{selectedDetailHotel.rating} / 5.0</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Nightly</span>
                  <span className="text-sm font-bold text-slate-900">${selectedDetailHotel.nightlyRate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Total (3n)</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">${selectedDetailHotel.totalRate}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1.5">Executive Room Features</span>
                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70 leading-relaxed">
                  {selectedDetailHotel.roomType}. Soundproofed glazing, high-speed fiber Wi-Fi, ergonomic Herman Miller desk chair, and 24/7 dedicated concierge.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1.5">Full List of Amenities</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {selectedDetailHotel.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80">
                <span className="font-bold text-amber-900 block">Catherine's Logistics Note:</span>
                <p className="text-amber-800 mt-0.5 text-[11px] leading-relaxed">
                  {selectedDetailHotel.proximityNote} Verified early check-in guarantee in writing with General Manager.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  selectHotelOption(selectedDetailHotel.id, currentTrip?.id || 'trip-204');
                  setSelectedDetailHotel(null);
                }}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
              >
                Confirm & Select This Hotel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
