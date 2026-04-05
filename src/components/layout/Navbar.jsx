import { Sun, Moon } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Navbar() {
  const { role, setRole, theme, toggleTheme } = useApp()

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">F</span>
        </div>
        <span className="font-semibold text-slate-900 dark:text-white text-sm">Fintrack</span>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={toggleTheme}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5">
          <div className={`w-2 h-2 rounded-full ${role === 'admin' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
          <select value={role} onChange={e => setRole(e.target.value)}
            className="bg-transparent text-xs font-medium text-slate-700 dark:text-slate-200 outline-none cursor-pointer">
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </header>
  )
}