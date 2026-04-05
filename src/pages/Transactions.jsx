import { useState } from 'react'
import FiltersBar from '../components/transactions/FiltersBar'
import TransactionTable from '../components/transactions/TransactionTable'
import TransactionModal from '../components/transactions/TransactionModal'

export default function Transactions() {
  const [modal, setModal] = useState({ open: false, editing: null })
  const open = (t = null) => setModal({ open: true, editing: t })
  const close = () => setModal({ open: false, editing: null })

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Transactions</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Search, filter and manage your transactions</p>
      </div>
      <FiltersBar onAdd={() => open()} />
      <TransactionTable onEdit={open} />
      <TransactionModal open={modal.open} onClose={close} editing={modal.editing} />
    </div>
  )
}