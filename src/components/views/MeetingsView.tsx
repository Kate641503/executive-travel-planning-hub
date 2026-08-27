import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { MeetingItem } from '../../types';
import {
  CalendarCheck,
  Clock,
  MapPin,
  Users,
  FileText,
  Shield,
  Plus,
  Send,
  Calendar,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  X,
  Sparkles
} from 'lucide-react';

export const MeetingsView: React.FC = () => {
  const { meetings, currentTrip, addMeeting, updateMeeting, deleteMeeting, showToast } = useTravel();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMeetingPrep, setSelectedMeetingPrep] = useState<MeetingItem | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formDate, setFormDate] = useState('September 10, 2026');
  const [formTime, setFormTime] = useState('11:00 AM');
  const [formDuration, setFormDuration] = useState('60');
  const [formLocation, setFormLocation] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formAttendeesCount, setFormAttendeesCount] = useState('4');
  const [formPrepNotes, setFormPrepNotes] = useState('');
  const [formBuffer, setFormBuffer] = useState('30');

  const tripMeetings = meetings.filter(m => m.tripId === (currentTrip?.id || 'trip-204'));

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formLocation.trim()) {
      showToast('Missing Info', 'Please specify meeting title and location.', 'warning');
      return;
    }

    addMeeting({
      tripId: currentTrip?.id || 'trip-204',
      title: formTitle,
      companyOrHost: formCompany || 'Executive Host',
      date: formDate,
      time: formTime,
      durationMinutes: Number(formDuration) || 60,
      location: formLocation,
      address: formAddress || formLocation,
      timeZone: 'EDT',
      attendeesCount: Number(formAttendeesCount) || 3,
      attendees: ['Daniel Carter (CEO)', 'Host Executive', 'Key Stakeholder'],
      status: 'Confirmed',
      preparationNotes: formPrepNotes || 'Executive brief and NDA confirmed by Catherine Ngina.',
      transportationBufferMinutes: Number(formBuffer) || 30
    });

    setIsAddModalOpen(false);
    setFormTitle('');
    setFormLocation('');
    setFormPrepNotes('');
  };

  const handleSendConfirmation = (meeting: MeetingItem) => {
    showToast(
      'Meeting Confirmation Dispatched',
      `Calendar invitation & encrypted brief sent to ${meeting.attendeesCount} attendees.`,
      'success'
    );
  };

  return (
    <div id="executive-meetings-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
              Executive Agenda & Calendar
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono font-bold text-slate-600">{currentTrip?.code} ({currentTrip?.destination})</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 font-heading">
            Business Meetings & Schedule
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Synchronized meeting schedules, investor agendas, room reservations, and transit buffer allocations.
          </p>
        </div>

        <button
          id="add-meeting-btn"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Meeting</span>
        </button>
      </div>

      {/* Agenda Timeline List */}
      <div className="space-y-4">
        {tripMeetings.map(meeting => (
          <div
            key={meeting.id}
            id={`meeting-card-${meeting.id}`}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-5"
          >
            {/* Left: Time badge + Title + Attendees */}
            <div className="space-y-3 flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-2.5">
                <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-white flex items-center gap-1.5 shadow-2xs">
                  <Clock className="w-3 h-3 text-sky-400" />
                  <span>{meeting.time}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({meeting.durationMinutes} min)</span>
                </span>

                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {meeting.date}
                </span>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {meeting.status}
                </span>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                  {meeting.transportationBufferMinutes}-min Buffer
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{meeting.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{meeting.companyOrHost}</p>
              </div>

              {/* Location and address */}
              <div className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">{meeting.location}</span>
                  <p className="text-[11px] text-slate-500">{meeting.address} • Zone: {meeting.timeZone}</p>
                </div>
              </div>

              {/* Attendees */}
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-semibold text-slate-900">{meeting.attendeesCount} Confirmed Attendees:</span>
                <span className="text-[11px] text-slate-500 truncate max-w-md">
                  {meeting.attendees.join(', ')}
                </span>
              </div>

              {/* Preparation Notes Preview */}
              {meeting.preparationNotes && (
                <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200/70 text-xs text-sky-950">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <FileText className="w-3.5 h-3.5 text-sky-700" />
                    <span>Executive Briefing & Preparation Notes (Catherine Ngina):</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-700">{meeting.preparationNotes}</p>
                </div>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
              <button
                id={`send-confirm-${meeting.id}`}
                onClick={() => handleSendConfirmation(meeting)}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>Send Confirmation</span>
              </button>

              <button
                onClick={() => setSelectedMeetingPrep(meeting)}
                className="px-3 py-2 rounded-xl text-xs font-medium border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
              >
                Full Prep Dossier
              </button>

              <button
                onClick={() => {
                  const newTime = prompt('Enter new meeting time (e.g. 11:30 AM):', meeting.time);
                  if (newTime) {
                    updateMeeting(meeting.id, { time: newTime });
                  }
                }}
                className="text-[11px] text-slate-500 hover:text-slate-800 underline"
              >
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Meeting Prep Dossier Modal */}
      {selectedMeetingPrep && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Executive Dossier</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{selectedMeetingPrep.title}</h3>
                <p className="text-xs text-slate-500">{selectedMeetingPrep.companyOrHost}</p>
              </div>
              <button onClick={() => setSelectedMeetingPrep(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-1">Key Agenda & Discussion Objectives</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {selectedMeetingPrep.keyDiscussionPoints ? (
                    selectedMeetingPrep.keyDiscussionPoints.map((pt, i) => <li key={i}>{pt}</li>)
                  ) : (
                    <>
                      <li>Review executive term sheet milestones</li>
                      <li>Align on Q4 capital allocation roadmap</li>
                      <li>Formalize legal signatory approvals</li>
                    </>
                  )}
                </ul>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Logistics & Buffer Strategy</span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                  Scheduled with {selectedMeetingPrep.transportationBufferMinutes} minutes buffer. Driver on standby curbside 15 minutes prior to session conclusion.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Attendee List</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMeetingPrep.attendees.map((a, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-medium">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setSelectedMeetingPrep(null)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Meeting Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add Business Meeting</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMeeting} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Meeting Title</label>
                <input
                  type="text"
                  placeholder="e.g. Series B Syndication Review"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Host Company / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Global Ventures"
                  value={formCompany}
                  onChange={e => setFormCompany(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Date</label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={e => setFormDate(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Time</label>
                  <input
                    type="text"
                    value={formTime}
                    onChange={e => setFormTime(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Duration (Min)</label>
                  <input
                    type="number"
                    value={formDuration}
                    onChange={e => setFormDuration(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Location & Room</label>
                <input
                  type="text"
                  placeholder="e.g. 375 Park Ave, 28th Fl, Boardroom A"
                  value={formLocation}
                  onChange={e => setFormLocation(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Attendees Count</label>
                  <input
                    type="number"
                    value={formAttendeesCount}
                    onChange={e => setFormAttendeesCount(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Buffer (Minutes)</label>
                  <input
                    type="number"
                    value={formBuffer}
                    onChange={e => setFormBuffer(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Preparation Notes & Brief</label>
                <textarea
                  rows={2}
                  placeholder="Notes for executive briefing, printed deck copies, NDA checks..."
                  value={formPrepNotes}
                  onChange={e => setFormPrepNotes(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800"
                >
                  Add to Executive Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
