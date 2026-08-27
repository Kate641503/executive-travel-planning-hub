import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { ContingencyPlan } from '../../types';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Plane,
  Luggage,
  CalendarClock,
  CloudRain,
  HeartPulse,
  Plus,
  ArrowRight,
  Sparkles,
  Zap,
  X
} from 'lucide-react';

export const ContingencyView: React.FC = () => {
  const { contingencyPlans, currentTrip, addContingencyPlan, showToast } = useTravel();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [plans, setPlans] = useState<ContingencyPlan[]>(contingencyPlans);

  // Form state
  const [formScenario, setFormScenario] = useState('');
  const [formRiskLevel, setFormRiskLevel] = useState<ContingencyPlan['riskLevel']>('Medium');
  const [formTrigger, setFormTrigger] = useState('');
  const [formBackupAction, setFormBackupAction] = useState('');
  const [formVaResponsibility, setFormVaResponsibility] = useState('');
  const [formEmergencyContact, setFormEmergencyContact] = useState('');

  const handleSimulateAlert = (plan: ContingencyPlan) => {
    showToast(
      `Contingency Simulation: ${plan.scenario}`,
      `VA Protocol Active: ${plan.vaResponsibility}`,
      'info'
    );
  };

  const handleCreateContingency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formScenario.trim() || !formBackupAction.trim()) {
      showToast('Missing details', 'Please complete the scenario and backup action.', 'warning');
      return;
    }

    const newPlan: ContingencyPlan = {
      id: `cont-${Date.now()}`,
      tripId: currentTrip?.id || 'trip-204',
      scenario: formScenario,
      riskLevel: formRiskLevel,
      triggerCondition: formTrigger || 'Unexpected disruption occurs',
      backupAction: formBackupAction,
      vaResponsibility: formVaResponsibility || 'Proactively coordinate mitigation and update executive.',
      emergencyContact: formEmergencyContact || '+1 (800) 555-EXEC',
      status: 'Active'
    };

    addContingencyPlan(newPlan);
    setPlans(prev => [newPlan, ...prev]);
    setIsAddModalOpen(false);
    setFormScenario('');
    setFormBackupAction('');
  };

  const getScenarioIcon = (scenario: string) => {
    const s = scenario.toLowerCase();
    if (s.includes('flight') || s.includes('aviation')) return Plane;
    if (s.includes('luggage') || s.includes('baggage')) return Luggage;
    if (s.includes('meeting') || s.includes('schedule')) return CalendarClock;
    if (s.includes('weather') || s.includes('storm')) return CloudRain;
    if (s.includes('health') || s.includes('medical')) return HeartPulse;
    return AlertTriangle;
  };

  return (
    <div id="contingency-planning-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-200">
              Risk Mitigation Matrix
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono font-bold text-slate-600">{currentTrip?.code} ({currentTrip?.destination})</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 font-heading">
            Travel Contingency & Risk Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pre-engineered emergency protocols, flight disruption backups, transit buffer fail-safes, and 24/7 hotline matrix.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            id="add-contingency-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Protocol</span>
          </button>
        </div>
      </div>

      {/* 24/7 Emergency Hotlines Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h3 className="text-sm font-bold text-slate-900 font-heading">
              Dedicated Executive Escalation Channels
            </h3>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            All Channels Online
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Catherine Ngina (VA Hotline)</span>
            <span className="text-sm font-mono font-bold text-slate-900 block mt-0.5">+254 700 123 456</span>
            <p className="text-[11px] text-slate-500 mt-0.5">WhatsApp / Encrypted Signal / Direct Cell</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Amex Global VIP Rebooking</span>
            <span className="text-sm font-mono font-bold text-slate-900 block mt-0.5">+1 (800) 555-EXEC</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Instant Flight Re-routing Priority Line</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">AXA Medical & Evacuation Assistance</span>
            <span className="text-sm font-mono font-bold text-slate-900 block mt-0.5">+1 (800) 555-HELP</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Policy: #AXA-884019-EXEC</p>
          </div>
        </div>
      </div>

      {/* Contingency Protocol Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map(plan => {
          const Icon = getScenarioIcon(plan.scenario);

          return (
            <div
              key={plan.id}
              id={`contingency-card-${plan.id}`}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">{plan.scenario}</h4>
                      <span className="text-[11px] text-slate-500">Trigger: {plan.triggerCondition}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      plan.riskLevel === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : plan.riskLevel === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {plan.riskLevel} Risk
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="font-bold text-slate-900 block text-[11px] mb-0.5">
                      Pre-Engineered Backup Action:
                    </span>
                    <p className="text-slate-700 leading-relaxed text-xs">{plan.backupAction}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-sky-50/60 border border-sky-200/70">
                    <span className="font-bold text-sky-900 block text-[11px] mb-0.5">
                      Catherine's Operational Response Protocol:
                    </span>
                    <p className="text-slate-700 leading-relaxed text-xs">{plan.vaResponsibility}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Emergency Escalation: <strong>{plan.emergencyContact}</strong></span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{plan.status}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  id={`simulate-${plan.id}`}
                  onClick={() => handleSimulateAlert(plan)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Run Drill / Test Trigger</span>
                </button>

                <span className="text-[11px] text-slate-400 font-mono">Fail-safe V2.1</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Protocol Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add Contingency Protocol</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateContingency} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Disruption Scenario</label>
                <input
                  type="text"
                  placeholder="e.g. Inbound Flight Technical Cancellation"
                  value={formScenario}
                  onChange={e => setFormScenario(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Risk Level</label>
                  <select
                    value={formRiskLevel}
                    onChange={e => setFormRiskLevel(e.target.value as any)}
                    className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Trigger Condition</label>
                  <input
                    type="text"
                    placeholder="e.g. >90 min tarmac delay"
                    value={formTrigger}
                    onChange={e => setFormTrigger(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Backup Action</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Rebook on Emirates EK-201 leaving at 11:00 AM..."
                  value={formBackupAction}
                  onChange={e => setFormBackupAction(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">VA Responsibilities</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Coordinate chauffeur adjustment, notify meeting organizer..."
                  value={formVaResponsibility}
                  onChange={e => setFormVaResponsibility(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Emergency Escalation Contact</label>
                <input
                  type="text"
                  value={formEmergencyContact}
                  onChange={e => setFormEmergencyContact(e.target.value)}
                  placeholder="+1 (800) 555-EXEC"
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
                  Save Contingency Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
