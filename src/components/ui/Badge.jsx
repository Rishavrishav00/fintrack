export default function Badge({ type }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      type === 'income'
        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
        : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
    }`}>
      {type}
    </span>
  )
}