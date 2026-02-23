import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowDownLeft, ArrowRightLeft, Receipt } from "lucide-react";
import type { ExpenseEntry } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { ExpenseEntryTypes } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { EditTransactionModal } from "./EditTransactionModal";
import { formatAmount, formatDate } from "../../utils/transaction";
import { Routes } from "../../../../routes/routes";

type TransactionCardProps = {
  transaction: ExpenseEntry;
};

export function TransactionCard({ transaction }: TransactionCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

  const formattedDate = formatDate(transaction.entry_date);
  const formattedAmount = formatAmount(transaction.amount);

  const hasReceipt = !!transaction.expense_receipt;

  const handleReceiptClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      const receipt = transaction.expense_receipt;

      if (!receipt?.store_uuid) {
        return;
      }

      navigate(`${Routes.receipts.prefix}?receipt=${receipt.uuid}`);
    },
    [transaction.expense_receipt, navigate],
  );

  const getTypeIcon = () => {
    switch (transaction.type) {
      case ExpenseEntryTypes.INCOME:
        return <ArrowDownLeft className="w-4 h-4 text-emerald-400" />;
      case ExpenseEntryTypes.EXPENSE:
        return <ArrowUpRight className="w-4 h-4 text-red-400" />;
      case ExpenseEntryTypes.TRANSFER:
        return <ArrowRightLeft className="w-4 h-4 text-blue-400" />;
      default:
        return null;
    }
  };

  const getTypeColor = () => {
    switch (transaction.type) {
      case ExpenseEntryTypes.INCOME:
        return "text-emerald-400";
      case ExpenseEntryTypes.EXPENSE:
        return "text-red-400";
      case ExpenseEntryTypes.TRANSFER:
        return "text-blue-400";
      default:
        return "text-slate-400";
    }
  };

  const getAmountDisplay = () => {
    switch (transaction.type) {
      case ExpenseEntryTypes.INCOME:
        return `+${formattedAmount}`;
      case ExpenseEntryTypes.EXPENSE:
        return `-${formattedAmount}`;
      case ExpenseEntryTypes.TRANSFER:
        return formattedAmount;
      default:
        return formattedAmount;
    }
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsEditModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsEditModalOpen(true);
          }
        }}
        className="w-full text-left bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800/50 hover:border-violet-500/40 rounded-lg p-3 sm:p-4 transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-slate-800/50 rounded-lg shrink-0">{getTypeIcon()}</div>

          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <p className="text-xs sm:text-sm font-medium text-white truncate">{transaction.subcategory?.name || transaction.category?.name || "Transaction"}</p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-slate-400">
              <span className="truncate">{transaction.from_account?.name || "Account"}</span>
              {transaction.type === ExpenseEntryTypes.TRANSFER && transaction.to_account && (
                <>
                  <span className="hidden sm:inline">→</span>
                  <span className="hidden sm:inline truncate">{transaction.to_account.name}</span>
                </>
              )}
              <span>•</span>
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasReceipt && (
              <button type="button" onClick={handleReceiptClick} className="p-1.5 text-violet-400 hover:text-violet-300 hover:bg-violet-500/15 rounded-md transition-colors">
                <Receipt className="w-4 h-4" />
              </button>
            )}

            <span className={`text-sm sm:text-base font-semibold ${getTypeColor()}`}>{getAmountDisplay()}</span>
          </div>
        </div>
      </div>

      <EditTransactionModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} transaction={transaction} />
    </>
  );
}
