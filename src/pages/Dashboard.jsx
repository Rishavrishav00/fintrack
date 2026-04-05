import { useApp } from '../context/AppContext'
import { getCurrentMonthExpenses, groupByMonth, formatCurrency } from '../utils/helpers'
import SummaryCards from '../components/dashboard/SummaryCards'
import BalanceTrend from '../components/dashboard/BalanceTrend'
import SpendingPie from '../components/dashboard/SpendingPie'

export default function Dashboard() {
  const { transactions, monthlyLimit, setMonthlyLimit } = useApp()

  const currentMonthExpense = getCurrentMonthExpenses(transactions)
  const grouped = groupByMonth(transactions)
  const latestMonth = Object.keys(grouped).sort().slice(-1)[0]
  const displayExpense = currentMonthExpense > 0 ? currentMonthExpense : (grouped[latestMonth]?.expense || 0)

  const limitSet = monthlyLimit > 0
  const exceeded = limitSet && displayExpense > monthlyLimit
  const usedPct = limitSet ? Math.min((displayExpense / monthlyLimit) * 100, 100) : 0
  const barColor = usedPct >= 100 ? '#ef4444' : usedPct >= 80 ? '#f59e0b' : '#10b981'

  return (
    <div className="flex flex-col gap-6">

      {exceeded && (
        <div className="rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 px-5 py-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
          <div>
            <p className="text-sm font-medium text-rose-700 dark:text-rose-400">Monthly spending limit exceeded</p>
            <p className="text-xs text-rose-500 dark:text-rose-500 mt-0.5">
              You've spent {formatCurrency(displayExpense)} against your {formatCurrency(monthlyLimit)} limit this month.
            </p>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Your financial overview at a glance</p>
      </div>

      <SummaryCards />

      {/* Monthly Spending Limit Widget */}
      <div className={`rounded-xl border p-5 transition-all duration-500 ${
        exceeded
          ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-sm font-medium text-slate-700 dark:text-slate-300">Monthly spending limit</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {limitSet
                ? `${formatCurrency(displayExpense)} spent of ${formatCurrency(monthlyLimit)} limit`
                : 'Set a limit to track your monthly budget'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">₹</span>
            <input
              type="number"
              min="0"
              placeholder="Set limit..."
              value={monthlyLimit || ''}
              onChange={e => setMonthlyLimit(Number(e.target.value))}
              className={`w-36 px-3 py-1.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-emerald-500/30 ${
                exceeded
                  ? 'border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-900'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
              } text-slate-900 dark:text-white`}
            />
          </div>
        </div>

        {limitSet && (
          <div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${usedPct}%`, background: barColor }} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-slate-400">₹0</span>
              <span className={`text-xs font-medium ${exceeded ? 'text-rose-500' : 'text-slate-500'}`}>
                {Math.round(usedPct)}% used {exceeded ? '⚠ Over limit' : ''}
              </span>
              <span className="text-xs text-slate-400">{formatCurrency(monthlyLimit)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">Balance trend (6 months)</h2>
          <BalanceTrend />
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">Spending by category</h2>
          <SpendingPie />
        </div>
      </div>
    </div>
  )
}