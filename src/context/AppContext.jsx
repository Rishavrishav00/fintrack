import { createContext, useContext, useReducer, useEffect } from 'react'
import { MOCK_TRANSACTIONS } from '../data/mockData'

const AppContext = createContext(null)

const ACTIONS = {
  SET_ROLE: 'SET_ROLE', TOGGLE_THEME: 'TOGGLE_THEME',
  SET_FILTERS: 'SET_FILTERS', RESET_FILTERS: 'RESET_FILTERS',
  ADD_TRANSACTION: 'ADD_TRANSACTION', UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  SET_MONTHLY_LIMIT: 'SET_MONTHLY_LIMIT',
}

function loadTxns() {
  try { const s = localStorage.getItem('fintrack_txns'); return s ? JSON.parse(s) : MOCK_TRANSACTIONS }
  catch { return MOCK_TRANSACTIONS }
}
function saveTxns(t) { localStorage.setItem('fintrack_txns', JSON.stringify(t)) }

const initialFilters = { search: '', type: '', category: '', sortKey: 'date', sortDir: -1 }

const initialState = {
  transactions: loadTxns(),
  role: 'viewer',
  theme: 'dark',
  filters: initialFilters,
  monthlyLimit: Number(localStorage.getItem('fintrack_limit')) || 0,
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ROLE:
      return { ...state, role: action.payload }
    case ACTIONS.TOGGLE_THEME: {
      const theme = state.theme === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', theme === 'dark')
      return { ...state, theme }
    }
    case ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case ACTIONS.RESET_FILTERS:
      return { ...state, filters: initialFilters }
    case ACTIONS.ADD_TRANSACTION: {
      const txns = [action.payload, ...state.transactions]
      saveTxns(txns); return { ...state, transactions: txns }
    }
    case ACTIONS.UPDATE_TRANSACTION: {
      const txns = state.transactions.map(t => t.id === action.payload.id ? action.payload : t)
      saveTxns(txns); return { ...state, transactions: txns }
    }
    case ACTIONS.DELETE_TRANSACTION: {
      const txns = state.transactions.filter(t => t.id !== action.payload)
      saveTxns(txns); return { ...state, transactions: txns }
    }
    case ACTIONS.SET_MONTHLY_LIMIT: {
      localStorage.setItem('fintrack_limit', action.payload)
      return { ...state, monthlyLimit: action.payload }
    }
    default: return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark')
  }, [])

  return (
    <AppContext.Provider value={{
      ...state,
      setRole: (r) => dispatch({ type: ACTIONS.SET_ROLE, payload: r }),
      toggleTheme: () => dispatch({ type: ACTIONS.TOGGLE_THEME }),
      setFilters: (f) => dispatch({ type: ACTIONS.SET_FILTERS, payload: f }),
      resetFilters: () => dispatch({ type: ACTIONS.RESET_FILTERS }),
      addTransaction: (t) => dispatch({ type: ACTIONS.ADD_TRANSACTION, payload: { ...t, id: Date.now() } }),
      updateTransaction: (t) => dispatch({ type: ACTIONS.UPDATE_TRANSACTION, payload: t }),
      deleteTransaction: (id) => dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: id }),
      setMonthlyLimit: (l) => dispatch({ type: ACTIONS.SET_MONTHLY_LIMIT, payload: l }),
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}