import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/mockData'

const EMPTY = { description: '', amount: '', date: new Date().toISOString().slice(0, 10), category: 'Food', type: 'expense' }

export default function TransactionModal({ open, onClose, editing }) {
  const { addTransaction, updateTransaction } = useApp()
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  useEffect(() => {
    setForm(editing ? { ...editing, amount: String(editing.amount) } : EMPTY)
    setError('')
  }, [editing, open])

  if (!open) return null
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = () => {
    if (!form.description.trim()) return setError('Description is required')
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) return setError('Enter a valid amount')
    if (!form.date) return setError('Date is required')
    const t = { ...form, amount: Number(form.amount) }
    editing ? updateTransaction(t) : addTransaction(t)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-semibold text-slate-900 dark:text-white text-sm">{editing ? 'Edit' : 'Add'} Transaction</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {error && <p className="text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/30 rounded-lg px-3 py-2">{error}</p>}
          <div className="flex gap-2">
            {['expense', 'income'].map(tp => (
              <button key={tp} onClick={() => set('type', tp)}
                className={`flex-1 py-2 text-sm rounded-lg border transition-colors capitalize ${form.type === tp
                  ? (tp === 'income' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white')
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                {tp}
              </button>
            ))}
          </div>
          {[
            { label: 'Description', key: 'description', type: 'text',   placeholder: 'e.g. Grocery shopping' },
            { label: 'Amount (₹)',  key: 'amount',      type: 'number', placeholder: '0' },
            { label: 'Date',        key: 'date',        type: 'date' },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">{label}</label>
              <input type={type} placeholder={placeholder} value={form[key]} onChange={e => set(key, e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30" />
            </div>
          ))}
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onClose} className="flex-1 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
          <button onClick={submit} className="flex-1 py-2 text-sm rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors">
            {editing ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}