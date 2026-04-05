import { Search, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/mockData'

export default function FiltersBar({ onAdd }) {
  const { filters, setFilters, resetFilters, role } = useApp()
  const hasFilters = filters.search || filters.type || filters.category

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-48">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Search transactions..."
          value={filters.search} onChange={e => setFilters({ search: e.target.value })}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500/30" />
      </div>
      <select value={filters.type} onChange={e => setFilters({ type: e.target.value })}
        className="py-2 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 outline-none">
        <option value="">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select value={filters.category} onChange={e => setFilters({ category: e.target.value })}
        className="py-2 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 outline-none">
        <option value="">All categories</option>
        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
      </select>
      {hasFilters && (
        <button onClick={resetFilters} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
          <X size={12} />Clear
        </button>
      )}
      {role === 'admin' && (
        <button onClick={onAdd}
          className="ml-auto px-4 py-2 text-sm font-medium rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors">
          + Add transaction
        </button>
      )}
    </div>
  )
}