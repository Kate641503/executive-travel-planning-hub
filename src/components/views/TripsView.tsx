import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { TripStatus } from '../../types';
import {
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  Sparkles,
  Calendar,
  User,
  MapPin,
  Wallet,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';

export const TripsView: React.FC = () => {
  const {
    trips,
    selectedTripId,
    selectTripAndNavigate,
    setIsCreateTripModalOpen,
    deleteTrip
  } = useTravel();

  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredTrips = trips.filter(trip => {
    const matchesSearch =
      trip.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
      trip.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchFilter.toLowerCase()) ||
      trip.executiveName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      trip.purpose.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || trip.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div id="trips-management-view" className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-100 text-sky-800 border border-sky-200">
              Trip Portfolio
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Executive Support Desk</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1.5 font-heading">
            Executive Trips Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track, filter, and coordinate all active and historical executive travel engagements.
          </p>
        </div>

        <button
          id="create-new-trip-btn"
          onClick={() => setIsCreateTripModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Trip</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="trips-search-input"
            type="text"
            placeholder="Search trip code, destination, executive..."
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </span>
          {['ALL', 'Confirmed', 'Planning', 'Researching', 'Completed'].map(status => (
            <button
              key={status}
              id={`filter-${status.toLowerCase()}`}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Trips Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="trips-table">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Trip ID</th>
                <th className="py-3.5 px-4">Executive</th>
                <th className="py-3.5 px-4">Destination</th>
                <th className="py-3.5 px-4">Dates</th>
                <th className="py-3.5 px-4">Purpose</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Budget</th>
                <th className="py-3.5 px-4">Next Action</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredTrips.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-slate-400">
                    No trips match the current filter or search query.
                  </td>
                </tr>
              ) : (
                filteredTrips.map(trip => {
                  const isSelected = trip.id === selectedTripId;
                  return (
                    <tr
                      key={trip.id}
                      id={`trip-row-${trip.id}`}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isSelected ? 'bg-sky-50/30' : ''
                      }`}
                    >
                      {/* Trip ID */}
                      <td className="py-4 px-4 font-mono font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>}
                          <span>{trip.code}</span>
                        </div>
                      </td>

                      {/* Executive */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-700 shrink-0">
                            {trip.executiveName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{trip.executiveName}</p>
                            <p className="text-[10px] text-slate-400">{trip.executiveRole}</p>
                          </div>
                        </div>
                      </td>

                      {/* Destination */}
                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{trip.destination}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 ml-5">{trip.country}</span>
                      </td>

                      {/* Dates */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span className="whitespace-nowrap">{trip.dateDisplay}</span>
                        </div>
                      </td>

                      {/* Purpose */}
                      <td className="py-4 px-4">
                        <span className="font-medium text-slate-900">{trip.purpose}</span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            trip.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : trip.status === 'Planning'
                              ? 'bg-amber-100 text-amber-800'
                              : trip.status === 'Researching'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {trip.status}
                        </span>
                      </td>

                      {/* Budget */}
                      <td className="py-4 px-4 font-mono font-semibold text-slate-900">
                        ${trip.budgetTotal.toLocaleString()}
                      </td>

                      {/* Next Action */}
                      <td className="py-4 px-4 max-w-xs">
                        <span className="text-slate-600 truncate block text-[11px]">
                          {trip.nextAction}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            id={`open-workspace-${trip.id}`}
                            onClick={() => selectTripAndNavigate(trip.id, 'itineraries')}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors"
                            title="Open detailed itinerary workspace"
                          >
                            <span>Open</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => selectTripAndNavigate(trip.id, 'executive-brief')}
                            className="p-1 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50"
                            title="View Executive Travel Brief"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
