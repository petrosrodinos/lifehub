import { useState, useEffect } from "react";
import { X, Bookmark } from "lucide-react";
import {
  useExpenseEntryPresets,
  useUpdateExpenseEntryPreset,
  useDeleteExpenseEntryPreset,
} from "../../../../features/expenses/expense-entry-presets/hooks/use-expense-entry-presets";
import type { ExpenseEntryPreset } from "../../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces";
import type { CreateExpenseEntryPresetDto } from "../../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces";
import { ConfirmationModal } from "../../../../components/ui/ConfirmationModal";
import { CreatePresetTransactionModal } from "./CreatePresetTransactionModal";
import { PresetTransactionItem } from "./PresetTransactionItem";
import { PresetTransactionsEmptyState } from "./PresetTransactionsEmptyState";

type PresetTransactionsMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function PresetTransactionsMenu({ isOpen, onClose }: PresetTransactionsMenuProps) {
  const { data: presets = [], isLoading } = useExpenseEntryPresets();
  const updatePreset = useUpdateExpenseEntryPreset();
  const deletePreset = useDeleteExpenseEntryPreset();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUuid, setEditingUuid] = useState<string | null>(null);
  const [deletingPreset, setDeletingPreset] = useState<ExpenseEntryPreset | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setIsCreateModalOpen(false);
      setEditingUuid(null);
    }
  }, [isOpen]);

  const handleUpdate = (uuid: string, data: CreateExpenseEntryPresetDto) => {
    updatePreset.mutate(
      { uuid, data },
      {
        onSuccess: () => {
          setEditingUuid(null);
        },
      },
    );
  };

  const handleDeleteConfirm = () => {
    if (deletingPreset) {
      deletePreset.mutate(deletingPreset.uuid, {
        onSuccess: () => {
          setDeletingPreset(null);
        },
      });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[90]" onClick={onClose} />
      <aside className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-slate-900 border-l border-slate-700 z-[91] flex flex-col shadow-xl" role="dialog" aria-label="Preset transactions menu">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-violet-400" />
            Preset Transactions
          </h2>
          <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:text-violet-400 hover:border-violet-500/50 transition-colors font-medium"
          >
            + Add preset transaction
          </button>

          {isLoading ? (
            <div className="text-center py-8 text-slate-400">Loading presets...</div>
          ) : presets.length === 0 ? (
            <PresetTransactionsEmptyState />
          ) : (
            <div className="space-y-3">
              {presets.map((preset) => (
                <PresetTransactionItem
                  key={preset.uuid}
                  preset={preset}
                  isEditing={editingUuid === preset.uuid}
                  onStartEdit={() => setEditingUuid(preset.uuid)}
                  onCancelEdit={() => setEditingUuid(null)}
                  onEdit={(data) => handleUpdate(preset.uuid, data)}
                  onDelete={() => setDeletingPreset(preset)}
                  isUpdatePending={updatePreset.isPending}
                />
              ))}
            </div>
          )}
        </div>
      </aside>

      <CreatePresetTransactionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <ConfirmationModal
        isOpen={!!deletingPreset}
        onClose={() => setDeletingPreset(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Preset"
        description={`Are you sure you want to delete "${deletingPreset?.title}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isPending={deletePreset.isPending}
      />
    </>
  );
}
