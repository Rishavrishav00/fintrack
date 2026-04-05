export default function EmptyState({ message = 'No data to display', sub = '' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-2">
      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl">📭</div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{message}</p>
      {sub && <p className="text-xs text-slate-400 dark:text-slate-500">{sub}</p>}
    </div>
  )
}