import { useState } from "react"
import { useExpenseStores } from "../../../../../../../features/receipts/expense-store/hooks/use-expense-store"
import { useExpenseEntries } from "../../../../../../../features/expenses/expense-entries/hooks/use-expense-entries"
import { useExpenseAccounts } from "../../../../../../../features/expenses/expense-accounts/hooks/use-expense-accounts"
import { useUploadReceipt } from "../../../../../../../features/receipts/expense-receipt/hooks/use-expense-receipt"
import type { CreateExpenseReceiptDto } from "../../../../../../../features/receipts/expense-receipt/interfaces/expense-receipt.interfaces"
import { ReceiptManualTab } from "./ReceiptManualTab"
import { ReceiptUploadTab } from "./ReceiptUploadTab"
import { ReceiptTabSwitcher } from "./ReceiptTabSwitcher"

const RECEIPT_TABS = {
  MANUAL: "manual",
  UPLOAD: "upload",
} as const

type ReceiptTab = (typeof RECEIPT_TABS)[keyof typeof RECEIPT_TABS]

type ReceiptFormProps = {
  onSubmit: (data: CreateExpenseReceiptDto) => void
  onCancel: () => void
  submitLabel: string
  isPending?: boolean
  initialData?: {
    expense_entry_uuid?: string
    store_uuid?: string
    receipt_date?: string
    total_amount?: number
  }
  onUploadSuccess?: () => void
}

export function ReceiptForm({
  onSubmit,
  onCancel,
  submitLabel,
  isPending = false,
  initialData,
  onUploadSuccess,
}: ReceiptFormProps) {
  const [activeTab, setActiveTab] = useState<ReceiptTab>(RECEIPT_TABS.MANUAL)
  const [expenseEntryUuid, setExpenseEntryUuid] = useState(initialData?.expense_entry_uuid || "")
  const [storeUuid, setStoreUuid] = useState(initialData?.store_uuid || "")
  const [receiptDate, setReceiptDate] = useState(initialData?.receipt_date?.slice(0, 10) || new Date().toISOString().slice(0, 10))
  const [totalAmount, setTotalAmount] = useState(initialData?.total_amount?.toString() || "")

  const { data: stores = [] } = useExpenseStores()
  const { data: entriesData } = useExpenseEntries({ limit: 50 })
  const { data: accounts = [] } = useExpenseAccounts()
  const uploadReceipt = useUploadReceipt()

  const entries = entriesData?.data || []

  const handleManualSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    if (!expenseEntryUuid || !totalAmount) return

    const payload: CreateExpenseReceiptDto = {
      expense_entry_uuid: expenseEntryUuid,
      total_amount: parseFloat(totalAmount),
      receipt_date: new Date(receiptDate).toISOString(),
    }

    if (storeUuid) {
      payload.store_uuid = storeUuid
    }

    onSubmit(payload)
  }

  const handleUploadSubmit = (file: File, fromAccountUuid: string): void => {
    uploadReceipt.mutate(
      { file, from_account_uuid: fromAccountUuid },
      { onSuccess: onUploadSuccess }
    )
  }

  return (
    <div className="space-y-5">
      <ReceiptTabSwitcher
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === RECEIPT_TABS.MANUAL && (
        <ReceiptManualTab
          expenseEntryUuid={expenseEntryUuid}
          storeUuid={storeUuid}
          receiptDate={receiptDate}
          totalAmount={totalAmount}
          entries={entries}
          stores={stores}
          isPending={isPending}
          isEntryDisabled={!!initialData?.expense_entry_uuid}
          submitLabel={submitLabel}
          onExpenseEntryChange={setExpenseEntryUuid}
          onStoreChange={setStoreUuid}
          onDateChange={setReceiptDate}
          onAmountChange={setTotalAmount}
          onSubmit={handleManualSubmit}
          onCancel={onCancel}
        />
      )}

      {activeTab === RECEIPT_TABS.UPLOAD && (
        <ReceiptUploadTab
          accounts={accounts}
          isUploadPending={uploadReceipt.isPending}
          onSubmit={handleUploadSubmit}
          onCancel={onCancel}
        />
      )}
    </div>
  )
}
