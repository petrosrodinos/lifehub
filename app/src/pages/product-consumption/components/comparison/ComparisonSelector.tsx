import { useExpenseProducts } from "../../../../features/receipts/expense-products/hooks/use-expense-products";
import { ProductSources } from "../../../../features/receipts/expense-products/interfaces/expense-products.interfaces";

type ComparisonSelectorProps = {
  selected: string[];
  onChange: (uuids: string[]) => void;
};

export function ComparisonSelector({ selected, onChange }: ComparisonSelectorProps) {
  const { data: products = [] } = useExpenseProducts(ProductSources.CONSUMPTION);

  const toggle = (uuid: string) => {
    if (selected.includes(uuid)) {
      onChange(selected.filter((u) => u !== uuid));
    } else {
      onChange([...selected, uuid]);
    }
  };

  if (products.length === 0) {
    return <p className="text-sm text-slate-500">No products yet.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {products.map((p) => {
        const isSelected = selected.includes(p.uuid);

        return (
          <button
            key={p.uuid}
            type="button"
            onClick={() => toggle(p.uuid)}
            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
              isSelected ? "bg-violet-600 border-violet-500 text-white" : "bg-slate-900/40 border-slate-800/50 text-slate-300 hover:border-violet-500/40"
            }`}
          >
            {p.name}
          </button>
        );
      })}
    </div>
  );
}
