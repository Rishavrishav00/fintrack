import { useApp } from '../../context/AppContext'
import { getCategoryTotals, formatCurrency } from '../../utils/helpers'
import { CATEGORY_COLORS } from '../../data/mockData'
import EmptyState from '../ui/EmptyState'

export default function CategoryBars() {
  const { transactions } = useApp()
  const totals = getCategoryTotals(transactions)
  const entries = Object.entries(totals).sort(([, a], [, b]) => b - a)
  const max = entries[0]?.[1] || 1
  if (!entries.length) return <EmptyState message="No expense data" />

  return (
    <div className="flex flex-col gap-4">
      {entries.map(([cat, amount]) => (
        <div key={cat}>
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: CATEGORY_COLORS[cat] || '#94a3b8' }} />
              <span className="text-sm text-slate-700 dark:text-slate-300">{cat}</span>
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400 tabular-nums">{formatCurrency(amount)}</span>
          </div>
          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(amount / max) * 100}%`, background: CATEGORY_COLORS[cat] || '#94a3b8' }} />
          </div>
        </div>
      ))}
    </div>
  )
}