import { useState } from 'react'
import { Sparkles, Loader2, RefreshCw } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { getSummary, groupByMonth, getCategoryTotals } from '../../utils/helpers'

function buildPrompt(transactions) {
  const { income, expense, balance, savingsRate } = getSummary(transactions)
  const catTotals = getCategoryTotals(transactions)
  const grouped = groupByMonth(transactions)
  const months = Object.keys(grouped).sort().slice(-3)
  const monthlyStr = months
    .map(m => `${m}: Income ₹${grouped[m].income.toLocaleString()}, Expenses ₹${grouped[m].expense.toLocaleString()}`)
    .join('\n')
  const topCats = Object.entries(catTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([k, v]) => `${k}: ₹${v.toLocaleString()}`)
    .join(', ')

  return `You are a concise personal finance advisor. Analyze this data and give exactly 4 numbered insights. Each insight must be 1-2 sentences. Be specific, actionable, and direct. No preamble.

Financial summary:
- Total income: ₹${income.toLocaleString()}, expenses: ₹${expense.toLocaleString()}, balance: ₹${balance.toLocaleString()}, savings rate: ${savingsRate}%

Recent months:
${monthlyStr}

Top spending categories: ${topCats}`
}

export default function AIInsights() {
  const { transactions } = useApp()
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    setLoading(true)
    setError('')
    setInsights([])

    const apiKey = import.meta.env.VITE_GROQ_API_KEY

    if (!apiKey) {
      setError('API key not found. Make sure VITE_GROQ_API_KEY is set in your .env file and restart the dev server.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/groq/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          max_tokens: 500,
          messages: [
            {
              role: 'system',
              content: 'You are a concise personal finance advisor. Be specific, actionable, and direct.',
            },
            {
              role: 'user',
              content: buildPrompt(transactions),
            },
          ],
        }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData?.error?.message || `API error ${res.status}`)
      }

      const data = await res.json()
      const text = data.choices[0]?.message?.content || ''
      const lines = text.split('\n').filter(l => l.trim())
      setInsights(lines)
    } catch (err) {
      setError(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <Sparkles size={15} className="text-violet-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">AI Financial Insights</h3>
            <p className="text-xs text-slate-400">Powered by Llama 3.1</p>
          </div>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-violet-500 hover:bg-violet-600 disabled:opacity-50 text-white transition-colors">
          {loading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
          {loading ? 'Analyzing...' : insights.length ? 'Regenerate' : 'Analyze my finances'}
        </button>
      </div>

      {!insights.length && !loading && !error && (
        <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">
          Click "Analyze my finances" to get AI-powered insights about your spending patterns.
        </p>
      )}

      {loading && (
        <div className="flex items-center gap-3 py-6">
          <Loader2 size={16} className="text-violet-400 animate-spin" />
          <span className="text-sm text-slate-400">Analyzing your financial data...</span>
        </div>
      )}

      {error && (
        <p className="text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/30 rounded-lg px-3 py-2 whitespace-pre-wrap">
          {error}
        </p>
      )}

      {insights.length > 0 && (
        <div className="flex flex-col gap-2.5">
          {insights.map((line, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{line}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}