import { useState } from 'react'
import type { ExpenseAccount } from '../../../../../../../features/expenses/expense-accounts/interfaces/expense-accounts.interfaces'
import { ReceiptPhotoCapture } from './ReceiptPhotoCapture'

type ReceiptUploadTabProps = {
  accounts: ExpenseAccount[]
  isUploadPending: boolean
  onSubmit: (file: File, fromAccountUuid: string) => void
  onCancel: () => void
}

export function ReceiptUploadTab({
  accounts,
  isUploadPending,
  onSubmit,
  onCancel,
}: ReceiptUploadTabProps) {
  const [fromAccountUuid, setFromAccountUuid] = useState("")
  const [uploadFile, setUploadFile] = useState<File | null>(null)

  const canSubmit = !!fromAccountUuid && !!uploadFile

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    if (!fromAccountUuid || !uploadFile) return

    onSubmit(uploadFile, fromAccountUuid)
  }

  const handleFileSelect = (file: File): void => {
    setUploadFile(file)
  }

  const handleFileClear = (): void => {
    setUploadFile(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="upload-account" className="block text-sm font-semibold text-slate-300">
          Account
        </label>

        <select
          id="upload-account"
          value={fromAccountUuid}
          onChange={(e) => setFromAccountUuid(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
          disabled={isUploadPending}
          required
        >
          <option value="">Select an expense account</option>
          {accounts.map((account) => (
            <option key={account.uuid} value={account.uuid}>
              {account.name}
            </option>
          ))}
        </select>
      </div>

      <ReceiptPhotoCapture
        onFileSelect={handleFileSelect}
        onFileClear={handleFileClear}
        disabled={isUploadPending}
      />

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isUploadPending || !canSubmit}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isUploadPending && (
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          Upload receipt
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isUploadPending}
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
