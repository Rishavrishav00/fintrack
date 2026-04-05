import { ArrowUpDown } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { getFilteredSorted, formatDate, formatCurrency } from '../../utils/helpers'
import Badge from '../ui/Badge'
import EmptyState from '../ui/EmptyState'

const COLS = [
  { key: 'date', label: 'Date' }, { key: 'description', label: 'Description' },
  { key: 'category', label: 'Category' }, { key: 'type', label: 'Type' }, { key: 'amount', label: 'Amount' },
]

export default function TransactionTable({ onEdit }) {
  const { transactions, filters, setFilters, role, deleteTransaction } = useApp()
  const rows = getFilteredSorted(transactions, filters)

  const sort = key => setFilters({
    sortKey: key,
    sortDir: filters.sortKey === key ? -filters.sortDir : -1,
  })

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {!rows.length ? (
        <EmptyState message="No transactions found" sub="Try adjusting your filters" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                {COLS.map(({ key, label }) => (
                  <th key={key} onClick={() => sort(key)}
                    className="text-left px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-white select-none whitespace-nowrap">
                    <span className="flex items-center gap-1">{label}<ArrowUpDown size={10} className="opacity-40" /></span>
                  </th>
                ))}
                {role === 'admin' && <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map(t => (
                <tr key={t.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">{formatDate(t.date)}</td>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{t.description}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{t.category}</td>
                  <td className="px-4 py-3"><Badge type={t.type} /></td>
                  <td className={`px-4 py-3 font-semibold tabular-nums ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                  </td>
                  {role === 'admin' && (
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => onEdit(t)} className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">Edit</button>
                      <button onClick={() => deleteTransaction(t.id)} className="text-xs text-rose-400 hover:text-rose-600 transition-colors">Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2 text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800">
            {rows.length} transaction{rows.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  )
}