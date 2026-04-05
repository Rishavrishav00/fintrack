import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { getSummary, formatCurrency } from '../../utils/helpers'

export default function SummaryCards() {
  const { transactions } = useApp()
  const { income, expense, balance, savingsRate } = getSummary(transactions)

  const cards = [
    { label: 'Total Balance',  value: formatCurrency(balance),  icon: Wallet,       color: balance >= 0 ? 'text-emerald-400' : 'text-rose-400',    bg: balance >= 0 ? 'bg-emerald-500/10' : 'bg-rose-500/10',    sub: balance >= 0 ? 'Positive balance' : 'In deficit',           subColor: balance >= 0 ? 'text-emerald-500' : 'text-rose-500' },
    { label: 'Total Income',   value: formatCurrency(income),   icon: TrendingUp,   color: 'text-emerald-400', bg: 'bg-emerald-500/10', sub: `${transactions.filter(t => t.type === 'income').length} transactions`,  subColor: 'text-slate-400' },
    { label: 'Total Expenses', value: formatCurrency(expense),  icon: TrendingDown, color: 'text-rose-400',    bg: 'bg-rose-500/10',    sub: `${transactions.filter(t => t.type === 'expense').length} transactions`, subColor: 'text-slate-400' },
    { label: 'Savings Rate',   value: `${savingsRate}%`,        icon: PiggyBank,    color: 'text-sky-400',     bg: 'bg-sky-500/10',     sub: 'of income saved',                                                       subColor: 'text-slate-400' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg, sub, subColor }) => (
        <div key={label} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</span>
            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
              <Icon size={15} className={color} />
            </div>
          </div>
          <div className="text-xl font-semibold text-slate-900 dark:text-white">{value}</div>
          <div className={`text-xs mt-1 ${subColor}`}>{sub}</div>
        </div>
      ))}
    </div>
  )
}