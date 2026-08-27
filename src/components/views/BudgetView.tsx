import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { ExpenseItem } from '../../types';
import {
  Wallet,
  DollarSign,
  TrendingUp,
  PieChart as PieChartIcon,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Receipt,
  FileSpreadsheet,
  X,
  Sparkles
} from 'lucide-react';

export const BudgetView: React.FC = () => {
  const { expenses, currentTrip, addExpense, deleteExpense, showToast } = useTravel();

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  // Form state
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<ExpenseItem['category']>('Meals');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('2026-08-27');
  const [expenseStatus, setExpenseStatus] = useState<ExpenseItem['status']>('Paid');
  const [expenseVendor, setExpenseVendor] = useState('');
  const [expensePaymentMethod, setExpensePaymentMethod] = useState('Corporate Amex ...9012');

  const tripExpenses = expenses.filter(e => e.tripId === (currentTrip?.id || 'trip-204'));

  // Calculate totals
  const totalBudget = currentTrip?.budgetTotal || 6800;
  const currentCost = tripExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = totalBudget - currentCost;
  const usedPercentage = Math.min(100, Math.round((currentCost / totalBudget) * 100));
  const remainingPercentage = Math.max(0, 100 - usedPercentage);

  // Category sums
  const categoryTotals: Record<ExpenseItem['category'], number> = {
    Flights: 0,
    Hotel: 0,
    Transportation: 0,
    Meals: 0,
    Meetings: 0,
    Contingency: 0,
    Miscellaneous: 0
  };

  tripExpenses.forEach(e => {
    if (categoryTotals[e.category] !== undefined) {
      categoryTotals[e.category] += e.amount;
    }
  });

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseTitle.trim() || !expenseAmount) {
      showToast('Missing details', 'Please provide title and amount.', 'warning');
      return;
    }

    addExpense({
      tripId: currentTrip?.id || 'trip-204',
      title: expenseTitle,
      category: expenseCategory,
      amount: Number(expenseAmount) || 0,
      date: expenseDate,
      status: expenseStatus,
      vendor: expenseVendor || 'Executive Expense',
      paymentMethod: expensePaymentMethod
    });

    setIsAddExpenseModalOpen(false);
    setExpenseTitle('');
    setExpenseAmount('');
    setExpenseVendor('');
  };

  return (
    <div id="travel-budget-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Financial Reconciliation
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono font-bold text-slate-600">{currentTrip?.code} ({currentTrip?.destination})</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 font-heading">
            Executive Travel Budget & Expenses
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Full spend breakdown, category allocation variance, and corporate card reconciliation ledger.
          </p>
        </div>

        <button
          id="open-add-expense-btn"
          onClick={() => setIsAddExpenseModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Total Trip Budget
          </span>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              ${totalBudget.toLocaleString()}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Allocated
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Pre-authorized C-suite cap</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Current Estimated Cost
          </span>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              ${currentCost.toLocaleString()}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
              {usedPercentage}% Used
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-sky-600 rounded-full transition-all duration-500"
              style={{ width: `${usedPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Remaining Budget
          </span>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-heading">
              ${remainingBudget.toLocaleString()}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
              {remainingPercentage}% Available
            </span>
          </div>
          <p className="text-[11px] text-emerald-700 mt-1 font-medium">Under budget buffer maintained</p>
        </div>
      </div>

      {/* Category Breakdown Progress Grid */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900 font-heading mb-4">
          Spend Allocation by Category
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { cat: 'Flights', amount: categoryTotals.Flights || 2960, color: 'bg-sky-500' },
            { cat: 'Hotel', amount: categoryTotals.Hotel || 1260, color: 'bg-indigo-500' },
            { cat: 'Transportation', amount: categoryTotals.Transportation || 520, color: 'bg-emerald-500' },
            { cat: 'Meals', amount: categoryTotals.Meals || 600, color: 'bg-amber-500' },
            { cat: 'Meetings', amount: categoryTotals.Meetings || 300, color: 'bg-purple-500' },
            { cat: 'Contingency', amount: categoryTotals.Contingency || 300, color: 'bg-rose-500' }
          ].map(item => (
            <div key={item.cat} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                <span className="font-semibold text-slate-700 truncate">{item.cat}</span>
              </div>
              <span className="text-lg font-bold text-slate-900 font-mono block">
                ${item.amount.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400">
                {Math.round((item.amount / (currentCost || 1)) * 100)}% of spent
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Itemized Expenses Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Itemized Expense Ledger</h3>
            <p className="text-xs text-slate-500 mt-0.5">Audited corporate expenses and receipts log</p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
            {tripExpenses.length} Line Items
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse" id="expenses-table">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Expense Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Payment Method / Vendor</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {tripExpenses.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <p>{item.title}</p>
                    {item.notes && <p className="text-[10px] text-slate-400 font-normal">{item.notes}</p>}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    ${item.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">
                    {item.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <p className="truncate max-w-xs">{item.paymentMethod || item.vendor}</p>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => deleteExpense(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      title="Remove expense"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {isAddExpenseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Record Travel Expense</h3>
              <button onClick={() => setIsAddExpenseModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Expense Title / Item</label>
                <input
                  type="text"
                  placeholder="e.g. Executive Luncheon at The Grill"
                  value={expenseTitle}
                  onChange={e => setExpenseTitle(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={expenseCategory}
                    onChange={e => setExpenseCategory(e.target.value as any)}
                    className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
                  >
                    <option value="Flights">Flights</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Meals">Meals</option>
                    <option value="Meetings">Meetings</option>
                    <option value="Contingency">Contingency</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Amount ($ USD)</label>
                  <input
                    type="number"
                    placeholder="e.g. 250"
                    value={expenseAmount}
                    onChange={e => setExpenseAmount(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={expenseDate}
                    onChange={e => setExpenseDate(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Status</label>
                  <select
                    value={expenseStatus}
                    onChange={e => setExpenseStatus(e.target.value as any)}
                    className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
                  >
                    <option value="Paid">Paid (Reconciled)</option>
                    <option value="Estimated">Estimated</option>
                    <option value="Pending Approval">Pending Approval</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Vendor / Payee</label>
                <input
                  type="text"
                  placeholder="e.g. The Grill Restaurant NYC"
                  value={expenseVendor}
                  onChange={e => setExpenseVendor(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Payment Method</label>
                <input
                  type="text"
                  value={expensePaymentMethod}
                  onChange={e => setExpensePaymentMethod(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddExpenseModalOpen(false)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800"
                >
                  Save & Update Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
