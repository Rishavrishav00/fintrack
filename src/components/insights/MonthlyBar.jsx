import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useApp } from '../../context/AppContext'
import { groupByMonth, formatMonth } from '../../utils/helpers'
import EmptyState from '../ui/EmptyState'

export default function MonthlyBar() {
  const { transactions, theme } = useApp()
  const grouped = groupByMonth(transactions)
  const months = Object.keys(grouped).sort().slice(-6)
  if (!months.length) return <EmptyState message="No data" />
  const data = months.map(m => ({ month: formatMonth(m), Income: grouped[m].income, Expenses: grouped[m].expense }))
  const isDark = theme === 'dark'
  const axis = isDark ? '#64748b' : '#94a3b8'
  const grid = isDark ? '#1e293b' : '#e2e8f0'

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} barGap={4} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} />
        <XAxis dataKey="month" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${Math.round(v / 1000)}k`} />
        <Tooltip contentStyle={{ background: isDark ? '#1e293b' : '#fff', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, borderRadius: 8, fontSize: 12 }}
          formatter={v => [`₹${v.toLocaleString('en-IN')}`]} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: axis }} />
        <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}