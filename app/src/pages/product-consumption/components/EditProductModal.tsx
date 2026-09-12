import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "../../../components/ui/Modal";
import { ProductForm } from "../../stores/components/products/ProductForm";
import { useUpdateExpenseProduct } from "../../../features/receipts/expense-products/hooks/use-expense-products";
import type { ExpenseProduct, CreateExpenseProductDto, UpdateExpenseProductDto } from "../../../features/receipts/expense-products/interfaces/expense-products.interfaces";

type EditProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: ExpenseProduct;
};

const parseSize = (value?: string | number): number | undefined => {
  if (value === undefined || value === null || value === "") return undefined;

  return typeof value === "string" ? parseFloat(value) : value;
};

export function EditProductModal({ isOpen, onClose, product }: EditProductModalProps) {
  const updateProduct = useUpdateExpenseProduct();
  const queryClient = useQueryClient();

  const handleSubmit = (data: CreateExpenseProductDto | UpdateExpenseProductDto) => {
    updateProduct.mutate(
      { uuid: product.uuid, data: data as UpdateExpenseProductDto },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["product-purchases"] });
          onClose();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Product" size="lg" scrollable>
      <ProductForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Save"
        isPending={updateProduct.isPending}
        initialData={{
          name: product.name,
          brand: product.brand || "",
          unit: product.unit || "",
          size: parseSize(product.size),
          category_uuid: product.category_uuid || "",
          subcategory_uuid: product.subcategory_uuid || "",
        }}
      />
    </Modal>
  );
}
