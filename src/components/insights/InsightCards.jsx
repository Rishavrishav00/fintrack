import { Award, TrendingUp, TrendingDown, Calendar } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { getCategoryTotals, groupByMonth, formatCurrency } from '../../utils/helpers'

export default function InsightCards() {
  const { transactions } = useApp()
  const catTotals = getCategoryTotals(transactions)
  const topCat = Object.keys(catTotals).sort((a, b) => catTotals[b] - catTotals[a])[0] || 'N/A'
  const grouped = groupByMonth(transactions)
  const months = Object.keys(grouped).sort()
  const lastM = grouped[months[months.length - 1]] || { income: 0, expense: 0 }
  const prevM = grouped[months[months.length - 2]] || { income: 0, expense: 0 }
  const expDiff = lastM.expense - prevM.expense
  const savingsRate = lastM.income > 0 ? Math.round(((lastM.income - lastM.expense) / lastM.income) * 100) : 0

  const cards = [
    { label: 'Top spending category', value: topCat,                       sub: `${formatCurrency(catTotals[topCat] || 0)} total`,              icon: Award,       color: 'text-amber-400',                                   bg: 'bg-amber-500/10' },
    { label: 'Monthly savings rate',  value: `${savingsRate}%`,            sub: savingsRate >= 20 ? 'On track' : 'Below 20% target',           icon: TrendingUp,  color: savingsRate >= 20 ? 'text-emerald-400' : 'text-amber-400', bg: savingsRate >= 20 ? 'bg-emerald-500/10' : 'bg-amber-500/10' },
    { label: 'Expenses vs last month',value: formatCurrency(Math.abs(expDiff)), sub: expDiff > 0 ? '▲ Higher this month' : expDiff < 0 ? '▼ Lower this month' : 'No change', icon: expDiff > 0 ? TrendingDown : TrendingUp, color: expDiff > 0 ? 'text-rose-400' : 'text-emerald-400', bg: expDiff > 0 ? 'bg-rose-500/10' : 'bg-emerald-500/10' },
    { label: 'Months tracked',        value: months.length,                sub: `${transactions.length} total transactions`,                    icon: Calendar,    color: 'text-sky-400',                                     bg: 'bg-sky-500/10' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, sub, icon: Icon, color, bg }) => (
        <div key={label} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</span>
            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}><Icon size={15} className={color} /></div>
          </div>
          <div className="text-xl font-semibold text-slate-900 dark:text-white">{value}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sub}</div>
        </div>
      ))}
    </div>
  )
}