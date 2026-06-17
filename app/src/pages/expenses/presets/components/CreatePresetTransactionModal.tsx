import { useCallback } from 'react'
import { useCreateExpenseEntryPreset } from '../../../../features/expenses/expense-entry-presets/hooks/use-expense-entry-presets'
import type { CreateExpenseEntryPresetDto } from '../../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces'
import { Modal } from '../../../../components/ui/Modal'
import { PresetTransactionForm } from './PresetTransactionForm'

type CreatePresetTransactionModalProps = {
  isOpen: boolean
  onClose: () => void
  initialData?: Partial<CreateExpenseEntryPresetDto>
  formKey?: string
}

export function CreatePresetTransactionModal({
  isOpen,
  onClose,
  initialData,
  formKey = 'new',
}: CreatePresetTransactionModalProps) {
  const createPreset = useCreateExpenseEntryPreset()

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handleSubmit = (data: CreateExpenseEntryPresetDto) => {
    createPreset.mutate(data, {
      onSuccess: () => {
        handleClose()
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Preset Transaction" scrollable>
      <PresetTransactionForm
        key={formKey}
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleClose}
        submitLabel="Create"
        isPending={createPreset.isPending}
      />
    </Modal>
  )
}
