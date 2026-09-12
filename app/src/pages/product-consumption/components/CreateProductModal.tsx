import { Modal } from "../../../components/ui/Modal";
import { ProductForm } from "../../stores/components/products/ProductForm";
import { useCreateExpenseProduct } from "../../../features/receipts/expense-products/hooks/use-expense-products";
import { ProductSources, type ExpenseProduct, type CreateExpenseProductDto, type UpdateExpenseProductDto } from "../../../features/receipts/expense-products/interfaces/expense-products.interfaces";

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (product: ExpenseProduct) => void;
};

export function CreateProductModal({ isOpen, onClose, onCreated }: CreateProductModalProps) {
  const createProduct = useCreateExpenseProduct();

  const handleSubmit = (data: CreateExpenseProductDto | UpdateExpenseProductDto) => {
    createProduct.mutate(
      { ...(data as CreateExpenseProductDto), source: ProductSources.CONSUMPTION },
      {
        onSuccess: (product) => {
          onCreated(product);
          onClose();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Product" nested>
      <ProductForm onSubmit={handleSubmit} onCancel={onClose} submitLabel="Create" isPending={createProduct.isPending} />
    </Modal>
  );
}
