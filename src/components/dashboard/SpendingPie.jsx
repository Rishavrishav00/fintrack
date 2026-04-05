import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useApp } from '../../context/AppContext'
import { getCategoryTotals } from '../../utils/helpers'
import { CATEGORY_COLORS } from '../../data/mockData'
import EmptyState from '../ui/EmptyState'

export default function SpendingPie() {
  const { transactions, theme } = useApp()
  const totals = getCategoryTotals(transactions)
  const data = Object.entries(totals).sort(([, a], [, b]) => b - a).slice(0, 6).map(([name, value]) => ({ name, value }))
  if (!data.length) return <EmptyState message="No expense data" />
  const isDark = theme === 'dark'

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
          {data.map(entry => <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#94a3b8'} />)}
        </Pie>
        <Tooltip
          contentStyle={{ background: isDark ? '#1e293b' : '#fff', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, borderRadius: 8, fontSize: 12 }}
          formatter={v => [`₹${v.toLocaleString('en-IN')}`]}
        />
        <Legend iconType="circle" iconSize={8}
          formatter={v => <span style={{ fontSize: 11, color: isDark ? '#94a3b8' : '#64748b' }}>{v}</span>} />
      </PieChart>
    </ResponsiveContainer>
  )
}