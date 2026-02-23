import { useState } from "react"
import { Plus, Pencil, Trash2, Package, Search } from "lucide-react"
import type { ExpenseProduct, CreateExpenseProductDto, UpdateExpenseProductDto } from "../../../../../features/receipts/expense-products/interfaces/expense-products.interfaces"
import {
  useExpenseProducts,
  useCreateExpenseProduct,
  useUpdateExpenseProduct,
  useDeleteExpenseProduct,
} from "../../../../../features/receipts/expense-products/hooks/use-expense-products"
import { Modal } from "../../../../../components/ui/Modal"
import { ConfirmationModal } from "../../../../../components/ui/ConfirmationModal"
import { ProductForm } from "./ProductForm"

type ProductsModalProps = {
  isOpen: boolean
  onClose: () => void
}

type ModalView = "list" | "create" | "edit"

export function ProductsModal({ isOpen, onClose }: ProductsModalProps) {
  const [view, setView] = useState<ModalView>("list")
  const [editingProduct, setEditingProduct] = useState<ExpenseProduct | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<ExpenseProduct | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const { data: products = [], isLoading } = useExpenseProducts()
  const createProduct = useCreateExpenseProduct()
  const updateProduct = useUpdateExpenseProduct()
  const deleteProduct = useDeleteExpenseProduct()

  const filteredProducts = searchQuery
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products

  const handleCreate = (data: CreateExpenseProductDto | UpdateExpenseProductDto) => {
    createProduct.mutate(data as CreateExpenseProductDto, {
      onSuccess: () => setView("list"),
    })
  }

  const handleUpdate = (data: CreateExpenseProductDto | UpdateExpenseProductDto) => {
    if (!editingProduct) return

    updateProduct.mutate(
      { uuid: editingProduct.uuid, data: data as UpdateExpenseProductDto },
      {
        onSuccess: () => {
          setView("list")
          setEditingProduct(null)
        },
      },
    )
  }

  const handleDelete = () => {
    if (!deletingProduct) return

    deleteProduct.mutate(deletingProduct.uuid, {
      onSuccess: () => setDeletingProduct(null),
    })
  }

  const handleEditClick = (product: ExpenseProduct) => {
    setEditingProduct(product)
    setView("edit")
  }

  const handleClose = () => {
    setView("list")
    setEditingProduct(null)
    setSearchQuery("")
    onClose()
  }

  const parseSize = (value: string | number | undefined): number | undefined => {
    if (value === undefined || value === null) return undefined

    return typeof value === "string" ? parseFloat(value) : value
  }

  const formatProductSize = (product: ExpenseProduct): string => {
    const parts: string[] = []

    if (product.size) {
      const sizeVal = typeof product.size === "string" ? parseFloat(product.size) : product.size

      parts.push(sizeVal.toString())
    }

    if (product.unit) {
      parts.push(product.unit)
    }

    return parts.join(" ")
  }

  const modalTitle = view === "create" ? "New Product" : view === "edit" ? "Edit Product" : "Products"

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} title={modalTitle} size="lg" scrollable>
        {view === "list" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="button"
                onClick={() => setView("create")}
                className="flex items-center gap-1.5 px-3 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>

            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={`product-skeleton-${i}`} className="h-16 bg-slate-800/30 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-10">
                <div className="flex items-center justify-center w-12 h-12 bg-slate-800/50 rounded-full mx-auto mb-3">
                  <Package className="w-6 h-6 text-slate-500" />
                </div>
                <p className="text-sm text-slate-500">
                  {searchQuery ? "No products match your search." : "No products yet."}
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {filteredProducts.map((product) => (
                  <div
                    key={product.uuid}
                    className="flex items-center gap-2 sm:gap-3 py-2.5 px-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors group"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-violet-500/10 rounded-lg shrink-0">
                      <Package className="w-4 h-4 text-violet-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-white truncate">{product.name}</p>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-slate-400 mt-0.5">
                        {product.brand && <span className="truncate max-w-[80px] sm:max-w-none">{product.brand}</span>}
                        {product.brand && (product.size || product.unit || product.category) && <span>•</span>}
                        {formatProductSize(product) && <span>{formatProductSize(product)}</span>}
                        {formatProductSize(product) && product.category && <span>•</span>}
                        {product.category && (
                          <span className="truncate max-w-[80px] sm:max-w-none">
                            {product.category.icon ? `${product.category.icon} ` : ""}{product.category.name}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEditClick(product)}
                        className="p-1.5 text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingProduct(product)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "create" && (
          <ProductForm
            onSubmit={handleCreate}
            onCancel={() => setView("list")}
            submitLabel="Create"
            isPending={createProduct.isPending}
          />
        )}

        {view === "edit" && editingProduct && (
          <ProductForm
            onSubmit={handleUpdate}
            onCancel={() => {
              setView("list")
              setEditingProduct(null)
            }}
            submitLabel="Save"
            isPending={updateProduct.isPending}
            initialData={{
              name: editingProduct.name,
              brand: editingProduct.brand || "",
              unit: editingProduct.unit || "",
              size: parseSize(editingProduct.size),
              category_uuid: editingProduct.category_uuid || "",
              subcategory_uuid: editingProduct.subcategory_uuid || "",
            }}
          />
        )}
      </Modal>

      <ConfirmationModal
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        description={`Are you sure you want to delete "${deletingProduct?.name}"? This will not affect existing receipt items.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isPending={deleteProduct.isPending}
      />
    </>
  )
}
