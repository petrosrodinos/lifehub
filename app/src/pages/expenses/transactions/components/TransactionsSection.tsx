import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { ExpenseEntryType } from '../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces'
import { useTransactionsPage } from '../hooks/use-transactions-page'
import { AccountFilters } from '../../analytics/components/account-overview/AccountFilters'
import { expenseEntryToCreateDto } from '../../utils/transaction'
import { CreateTransactionModal } from './CreateTransactionModal'
import { CreatePresetTransactionModal } from '../../presets/components/CreatePresetTransactionModal'
import { mapEntryToPresetFormData } from '../../presets/utils/preset-form-data.helper'
import { TransactionsListSection } from './TransactionsListSection'

export function TransactionsSection() {
  const {
    isCreateModalOpen,
    isPresetModalOpen,
    duplicateFrom,
    presetFrom,
    openCreateModal,
    openDuplicateModal,
    openPresetModal,
    closeCreateModal,
    closePresetModal,
    currentPage,
    setCurrentPage,
  } = useTransactionsPage()

  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [type, setType] = useState<ExpenseEntryType | ''>('')
  const [categoryUuid, setCategoryUuid] = useState('')
  const [subcategoryUuid, setSubcategoryUuid] = useState('')

  const handleFilterChange = (setter: (v: any) => void) => (v: any) => {
    setter(v)
    setCurrentPage(1)
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
          <button
            type="button"
            onClick={openCreateModal}
            className="flex items-center gap-2 sm:px-4 px-2 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Transaction</span>
          </button>
        </div>

        <AccountFilters
          selectedAccounts={selectedAccounts}
          onAccountsChange={handleFilterChange(setSelectedAccounts)}
          fromDate={fromDate}
          onFromDateChange={handleFilterChange(setFromDate)}
          toDate={toDate}
          onToDateChange={handleFilterChange(setToDate)}
          type={type}
          onTypeChange={handleFilterChange(setType)}
          categoryUuid={categoryUuid}
          onCategoryChange={handleFilterChange(setCategoryUuid)}
          subcategoryUuid={subcategoryUuid}
          onSubcategoryChange={handleFilterChange(setSubcategoryUuid)}
        />

        <TransactionsListSection
          selectedAccounts={selectedAccounts}
          fromDate={fromDate}
          toDate={toDate}
          type={type}
          categoryUuid={categoryUuid}
          subcategoryUuid={subcategoryUuid}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onDuplicate={openDuplicateModal}
          onCreatePreset={openPresetModal}
        />
      </div>

      <CreateTransactionModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        initialData={duplicateFrom ? expenseEntryToCreateDto(duplicateFrom) : undefined}
        formKey={duplicateFrom?.uuid ?? 'new'}
      />

      <CreatePresetTransactionModal
        isOpen={isPresetModalOpen}
        onClose={closePresetModal}
        initialData={presetFrom ? mapEntryToPresetFormData(presetFrom) : undefined}
        formKey={presetFrom?.uuid ?? 'new'}
      />
    </>
  )
}
