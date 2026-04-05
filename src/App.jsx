import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import BottomNav from './components/layout/BottomNav'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'
import Landing from './pages/Landing'
import { getCurrentMonthExpenses, groupByMonth } from './utils/helpers'

function AppShell() {
  const { transactions, monthlyLimit, theme } = useApp()
  const currentMonthExpense = getCurrentMonthExpenses(transactions)
  const grouped = groupByMonth(transactions)
  const latestMonth = Object.keys(grouped).sort().slice(-1)[0]
  const displayExpense = currentMonthExpense > 0 ? currentMonthExpense : (grouped[latestMonth]?.expense || 0)
  const exceeded = monthlyLimit > 0 && displayExpense > monthlyLimit

  return (
    <div
      className="flex h-screen overflow-hidden font-sans transition-colors duration-700"
      style={{
        background: exceeded
          ? theme === 'dark' ? 'rgba(127, 29, 29, 0.25)' : 'rgba(254, 226, 226, 0.8)'
          : undefined,
      }}>
      <div className={`flex h-full w-full overflow-hidden transition-colors duration-700 ${exceeded ? '' : 'bg-slate-50 dark:bg-slate-950'}`}>
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/dashboard"    element={<Dashboard />}    />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/insights"     element={<Insights />}     />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/*" element={<AppShell />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}