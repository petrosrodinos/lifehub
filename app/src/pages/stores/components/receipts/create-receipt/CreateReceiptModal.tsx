import { useCreateExpenseReceipt } from "../../../../../features/receipts/expense-receipt/hooks/use-expense-receipt";
import type { CreateExpenseReceiptDto, ExpenseReceipt } from "../../../../../features/receipts/expense-receipt/interfaces/expense-receipt.interfaces";
import { Modal } from "../../../../../components/ui/Modal";
import { ReceiptForm } from "./ReceiptForm";
import { Routes } from "../../../../../routes/routes";
import { useNavigate } from "react-router-dom";

type CreateReceiptModalProps = {
  isOpen: boolean;
  onClose: () => void;
  storeUuid?: string;
};

export function CreateReceiptModal({ isOpen, onClose, storeUuid }: CreateReceiptModalProps) {
  const createReceipt = useCreateExpenseReceipt();
  const navigate = useNavigate();

  const handleSubmit = (data: CreateExpenseReceiptDto) => {
    createReceipt.mutate(data, {
      onSuccess: (receipt: ExpenseReceipt) => {
        onClose();
        navigate(`${Routes.receipts.prefix}?receipt=${receipt.uuid}`);
      },
    });
  };

  const handleUploadSuccess = (receipt: ExpenseReceipt) => {
    onClose();
    navigate(`${Routes.receipts.prefix}?receipt=${receipt.uuid}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Receipt">
      <ReceiptForm onSubmit={handleSubmit} onCancel={onClose} submitLabel="Create" isPending={createReceipt.isPending} initialData={storeUuid ? { store_uuid: storeUuid } : undefined} onUploadSuccess={handleUploadSuccess} />
    </Modal>
  );
}
