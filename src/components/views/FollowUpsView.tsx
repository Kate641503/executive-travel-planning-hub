import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { FollowUpItem } from '../../types';
import {
  CheckSquare,
  Clock,
  User,
  AlertCircle,
  Plus,
  Trash2,
  Calendar,
  CheckCircle2,
  Filter,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const FollowUpsView: React.FC = () => {
  const {
    followUps,
    currentTrip,
    toggleFollowUpStatus,
    addFollowUp,
    deleteFollowUp,
    showToast
  } = useTravel();

  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formAssignee, setFormAssignee] = useState('Catherine Ngina (VA)');
  const [formDueDate, setFormDueDate] = useState('September 16, 2026');
  const [formPriority, setFormPriority] = useState<FollowUpItem['priority']>('High');
  const [formCategory, setFormCategory] = useState('Executive Correspondence');
  const [formNotes, setFormNotes] = useState('');

  const tripFollowUps = followUps.filter(f => f.tripId === (currentTrip?.id || 'trip-204'));

  const filteredItems = tripFollowUps.filter(item => {
    if (filterStatus === 'ALL') return true;
    return item.status === filterStatus;
  });

  const handleAddFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast('Missing Title', 'Please enter task description.', 'warning');
      return;
    }

    addFollowUp({
      tripId: currentTrip?.id || 'trip-204',
      title: formTitle,
      assignedTo: formAssignee,
      dueDate: formDueDate,
      status: 'Pending',
      priority: formPriority,
      category: formCategory,
      notes: formNotes
    });

    setIsAddModalOpen(false);
    setFormTitle('');
    setFormNotes('');
  };

  return (
    <div id="follow-ups-action-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-200">
              Post-Travel Execution
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono font-bold text-slate-600">{currentTrip?.code} ({currentTrip?.destination})</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 font-heading">
            Post-Travel Follow-Up & Action Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Closing the executive loop: investor thank-yous, expense reconciliation, NDA archiving, and CRM sync.
          </p>
        </div>

        <button
          id="add-follow-up-btn"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Follow-Up Task</span>
        </button>
      </div>

      {/* Filter Tabs & Stats Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {['ALL', 'Pending', 'In Progress', 'Completed'].map(status => (
            <button
              key={status}
              id={`filter-followup-${status.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterStatus === status
                  ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 w-full sm:w-auto justify-end">
          <span>
            Pending: <strong className="text-slate-900">{tripFollowUps.filter(f => f.status === 'Pending').length}</strong>
          </span>
          <span>
            In Progress: <strong className="text-amber-700">{tripFollowUps.filter(f => f.status === 'In Progress').length}</strong>
          </span>
          <span>
            Completed: <strong className="text-emerald-700">{tripFollowUps.filter(f => f.status === 'Completed').length}</strong>
          </span>
        </div>
      </div>

      {/* Follow Up Tasks List */}
      <div className="space-y-3">
        {filteredItems.map(item => {
          const isCompleted = item.status === 'Completed';
          const isInProgress = item.status === 'In Progress';

          return (
            <div
              key={item.id}
              id={`follow-up-${item.id}`}
              className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isCompleted
                  ? 'border-slate-200 bg-slate-50/50 opacity-70'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <button
                  id={`toggle-task-${item.id}`}
                  onClick={() => toggleFollowUpStatus(item.id)}
                  className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : isInProgress
                      ? 'border-amber-400 bg-amber-50 text-amber-600'
                      : 'border-slate-300 hover:border-slate-500 bg-white'
                  }`}
                  title="Click to advance task status"
                >
                  {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                  {isInProgress && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                </button>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2">
                    <span
                      className={`text-sm font-bold ${
                        isCompleted ? 'line-through text-slate-500' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.priority === 'High'
                          ? 'bg-rose-100 text-rose-800'
                          : item.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.priority} Priority
                    </span>

                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Due: <strong>{item.dueDate}</strong></span>
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Assigned to: {item.assignedTo}</span>
                    </span>
                  </div>

                  {item.notes && (
                    <p className="text-[11px] text-slate-600 mt-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      {item.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <button
                  onClick={() => toggleFollowUpStatus(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                    isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : isInProgress
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Status: {item.status}
                </button>

                <button
                  onClick={() => deleteFollowUp(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors"
                  title="Remove follow-up"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Follow-Up Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add Post-Travel Action Item</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFollowUp} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Action Title</label>
                <input
                  type="text"
                  placeholder="e.g. Dispatch signed Term Sheet copies to General Counsel"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Due Date</label>
                  <input
                    type="text"
                    value={formDueDate}
                    onChange={e => setFormDueDate(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={formPriority}
                    onChange={e => setFormPriority(e.target.value as any)}
                    className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Category</label>
                <input
                  type="text"
                  value={formCategory}
                  onChange={e => setFormCategory(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Assigned Executive / VA</label>
                <input
                  type="text"
                  value={formAssignee}
                  onChange={e => setFormAssignee(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Action Notes & Brief</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={e => setFormNotes(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                  placeholder="Additional context or links..."
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
                  Schedule Follow-Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
