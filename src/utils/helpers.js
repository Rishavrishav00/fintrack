export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export function formatMonth(monthStr) {
  const [year, month] = monthStr.split('-')
  return new Date(year, month - 1).toLocaleString('default', { month: 'short', year: '2-digit' })
}

export function groupByMonth(transactions) {
  const groups = {}
  transactions.forEach(t => {
    const month = t.date.slice(0, 7)
    if (!groups[month]) groups[month] = { income: 0, expense: 0 }
    groups[month][t.type] += t.amount
  })
  return groups
}

export function getSummary(transactions) {
  const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance = income - expense
  return { income, expense, balance, savingsRate: income > 0 ? Math.round((balance / income) * 100) : 0 }
}

export function getCategoryTotals(transactions) {
  const totals = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    totals[t.category] = (totals[t.category] || 0) + t.amount
  })
  return totals
}

export function getFilteredSorted(transactions, filters) {
  const { search, type, category, sortKey, sortDir } = filters
  let result = transactions.filter(t => {
    if (type && t.type !== type) return false
    if (category && t.category !== category) return false
    if (search) {
      const q = search.toLowerCase()
      return t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    }
    return true
  })
  result.sort((a, b) => {
    let av = a[sortKey], bv = b[sortKey]
    if (sortKey === 'amount') { av = Number(av); bv = Number(bv) }
    if (av < bv) return sortDir
    if (av > bv) return -sortDir
    return 0
  })
  return result
}

export function getCurrentMonthExpenses(transactions) {
  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  return transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
    .reduce((s, t) => s + t.amount, 0)
}