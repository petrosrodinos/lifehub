import { useState, useEffect } from "react";
import { Tag } from "lucide-react";
import { useExpenseTags, useCreateExpenseTag, useUpdateExpenseTag, useDeleteExpenseTag } from "../../../../features/expenses/expense-tags/hooks/use-expense-tags";
import type { ExpenseTag } from "../../../../features/expenses/expense-tags/interfaces/expense-tags.interfaces";
import { ConfirmationModal } from "../../../../components/ui/ConfirmationModal";
import { Drawer } from "../../../../components/ui/Drawer";
import { TagForm } from "./TagForm";
import { TagItem, TAG_DEFAULT_COLOR } from "./TagItem";

type TagsMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function TagsMenu({ isOpen, onClose }: TagsMenuProps) {
  const { data: tags = [], isLoading } = useExpenseTags();
  const createTag = useCreateExpenseTag();
  const updateTag = useUpdateExpenseTag();
  const deleteTag = useDeleteExpenseTag();

  const [isAddingTag, setIsAddingTag] = useState(false);
  const [editingTagUuid, setEditingTagUuid] = useState<string | null>(null);
  const [deletingTag, setDeletingTag] = useState<ExpenseTag | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsAddingTag(false);
      setEditingTagUuid(null);
    }
  }, [isOpen]);

  const handleAddTag = (title: string, color: string) => {
    createTag.mutate(
      { title, color },
      {
        onSuccess: () => {
          setIsAddingTag(false);
        },
      },
    );
  };

  const handleUpdateTag = (uuid: string, title: string, color: string) => {
    updateTag.mutate(
      { uuid, data: { title, color } },
      {
        onSuccess: () => {
          setEditingTagUuid(null);
        },
      },
    );
  };

  const handleDeleteTagConfirm = () => {
    if (deletingTag) {
      deleteTag.mutate(deletingTag.uuid, {
        onSuccess: () => {
          setDeletingTag(null);
        },
      });
    }
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title={
          <span className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-violet-400" />
            Transaction Tags
          </span>
        }
      >
        {isAddingTag ? (
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <h3 className="text-sm font-medium text-slate-300 mb-3">Add tag</h3>
            <TagForm initialTitle="" initialColor={TAG_DEFAULT_COLOR} onSubmit={handleAddTag} onCancel={() => setIsAddingTag(false)} submitLabel="Add" isPending={createTag.isPending} />
          </div>
        ) : (
          <button type="button" onClick={() => setIsAddingTag(true)} className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:text-violet-400 hover:border-violet-500/50 transition-colors font-medium">
            + Add tag
          </button>
        )}

        <div className="space-y-2 mt-4">
          {isLoading ? (
            <div className="text-center py-8 text-slate-400">Loading tags...</div>
          ) : tags.length === 0 ? (
            <div className="text-center py-8">
              <Tag className="w-12 h-12 mx-auto text-slate-600 mb-3" />
              <p className="text-slate-400">No tags yet</p>
              <p className="text-sm text-slate-500 mt-1">Create tags to organize your transactions</p>
            </div>
          ) : (
            tags.map((tag) => (
              <TagItem
                key={tag.uuid}
                tag={tag}
                isEditing={editingTagUuid === tag.uuid}
                onStartEdit={() => setEditingTagUuid(tag.uuid)}
                onCancelEdit={() => setEditingTagUuid(null)}
                onEdit={(title, color) => handleUpdateTag(tag.uuid, title, color)}
                onDelete={() => setDeletingTag(tag)}
                isUpdatePending={updateTag.isPending}
              />
            ))
          )}
        </div>
      </Drawer>

      <ConfirmationModal
        isOpen={!!deletingTag}
        onClose={() => setDeletingTag(null)}
        onConfirm={handleDeleteTagConfirm}
        title="Delete Tag"
        description={`Are you sure you want to delete "${deletingTag?.title}"? It will be removed from all transactions.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isPending={deleteTag.isPending}
      />
    </>
  );
}
