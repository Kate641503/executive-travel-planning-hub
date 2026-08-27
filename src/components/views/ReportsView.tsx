import React from 'react';
import { useTravel } from '../../context/TravelContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  TrendingUp,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Plane,
  Award,
  Sparkles
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { trips, expenses, showToast } = useTravel();

  const tripSpendData = [
    { name: 'TRIP-204 (NYC)', budget: 6800, actual: 5940 },
    { name: 'TRIP-205 (LDN)', budget: 5400, actual: 4800 },
    { name: 'TRIP-206 (DXB)', budget: 6300, actual: 5100 },
    { name: 'TRIP-203 (SFO)', budget: 7200, actual: 6850 }
  ];

  const categoryDistribution = [
    { name: 'Flights', value: 48, color: '#0284c7' },
    { name: 'Hotels', value: 24, color: '#6366f1' },
    { name: 'Transportation', value: 10, color: '#10b981' },
    { name: 'Meals & Dining', value: 11, color: '#f59e0b' },
    { name: 'Meetings & Misc', value: 7, color: '#8b5cf6' }
  ];

  const handleExportAudit = () => {
    showToast(
      'Audit Report Exported',
      'Q3 Executive Travel & Financial Audit Report saved as .xlsx file.',
      'success'
    );
  };

  return (
    <div id="reports-analytics-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-800 border border-purple-200">
              Executive Analytics & Auditing
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Q3/Q4 Performance Analysis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 font-heading">
            Travel Reports & Performance Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Executive travel spend efficiency, policy compliance index, vendor savings, and operational metrics.
          </p>
        </div>

        <button
          id="export-report-btn"
          onClick={handleExportAudit}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Dossier (.xlsx)</span>
        </button>
      </div>

      {/* Top 4 Performance Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Corporate Savings</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <span className="text-2xl font-extrabold text-slate-900 font-heading block mt-2">
            $3,210
          </span>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            +14% saved via VA route optimization
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Policy Compliance</span>
            <span className="p-1.5 rounded-lg bg-sky-50 text-sky-700">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <span className="text-2xl font-extrabold text-slate-900 font-heading block mt-2">
            99.2%
          </span>
          <p className="text-[11px] text-sky-700 font-semibold mt-1">
            All preferred corporate channels vetted
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Executive Hours Saved</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
              <Briefcase className="w-4 h-4" />
            </span>
          </div>
          <span className="text-2xl font-extrabold text-slate-900 font-heading block mt-2">
            46.5 hrs
          </span>
          <p className="text-[11px] text-amber-800 font-semibold mt-1">
            Seamless calendar & logistics handling
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Disruption Resilience</span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <span className="text-2xl font-extrabold text-slate-900 font-heading block mt-2">
            100%
          </span>
          <p className="text-[11px] text-purple-700 font-semibold mt-1">
            Zero missed investor commitments
          </p>
        </div>
      </div>

      {/* Charts 2-Column: Budget vs Actual + Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Budget vs Actual Spend Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Trip Budget vs. Actual Expenditure
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparison across active, planned, and recently completed executive missions ($ USD)
            </p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tripSpendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                <Tooltip
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none'
                  }}
                />
                <Bar dataKey="budget" name="Allocated Budget" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual Cost" fill="#0284c7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-300"></span>
              <span className="text-slate-600">Allocated Budget</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-sky-600"></span>
              <span className="text-slate-600">Actual Cost (Under budget)</span>
            </div>
          </div>
        </div>

        {/* Spend Category Distribution Pie Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Spend Distribution by Category
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Aggregate breakdown of corporate travel ledger</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${value}%`, 'Share']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-1 text-xs">
            {categoryDistribution.map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                  <span>{cat.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
