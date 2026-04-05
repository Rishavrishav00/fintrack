import InsightCards from '../components/insights/InsightCards'
import MonthlyBar from '../components/insights/MonthlyBar'
import CategoryBars from '../components/insights/CategoryBars'
import AIInsights from '../components/insights/AIInsights'

export default function Insights() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Insights</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Understand your financial patterns</p>
      </div>
      <InsightCards />
      <AIInsights />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">Monthly comparison</h2>
          <MonthlyBar />
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">Category breakdown</h2>
          <CategoryBars />
        </div>
      </div>
    </div>
  )
}