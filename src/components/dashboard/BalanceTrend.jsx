import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../../context/AppContext'
import { groupByMonth, formatMonth } from '../../utils/helpers'
import EmptyState from '../ui/EmptyState'

export default function BalanceTrend() {
  const { transactions, theme } = useApp()
  const grouped = groupByMonth(transactions)
  const months = Object.keys(grouped).sort().slice(-6)
  if (!months.length) return <EmptyState message="No data yet" />

  let running = 0
  const data = months.map(m => {
    running += grouped[m].income - grouped[m].expense
    return { month: formatMonth(m), balance: running }
  })

  const isDark = theme === 'dark'
  const axis = isDark ? '#64748b' : '#94a3b8'
  const grid = isDark ? '#1e293b' : '#e2e8f0'

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} />
        <XAxis dataKey="month" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${Math.round(v / 1000)}k`} />
        <Tooltip
          contentStyle={{ background: isDark ? '#1e293b' : '#fff', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, borderRadius: 8, fontSize: 12 }}
          formatter={v => [`₹${v.toLocaleString('en-IN')}`, 'Balance']}
        />
        <Line type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}