import { useState } from "react";
import type { ExpenseAccount } from "../../../../features/expenses/expense-accounts/interfaces/expense-accounts.interfaces";
import { useAuthStore } from "../../../../store/auth-store";
import { formatAccountBalance } from "../../utils/format-account-balance";
import { EditAccountModal } from "./EditAccountModal";

type AccountCardProps = {
  account: ExpenseAccount;
};

export function AccountCard({ account }: AccountCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showAccountBalances = useAuthStore((state) => state.showAccountBalances);

  const balance = formatAccountBalance(account.balance);

  return (
    <>
      <button type="button" onClick={() => setIsEditModalOpen(true)} className="w-full text-left bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800/50 hover:border-violet-500/40 rounded-lg p-3 transition-all duration-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: account.color || "#8b5cf6" }}>
            {account.icon || "💼"}
          </div>
          <h3 className="text-sm font-medium text-white truncate flex-1">{account.name}</h3>
        </div>
        {showAccountBalances ? (
          <p className={`text-lg font-semibold ${balance.isNegative ? "text-red-400" : "text-emerald-400"}`}>{balance.formatted}</p>
        ) : (
          <p className="text-lg font-semibold text-slate-500">••••••</p>
        )}
      </button>

      <EditAccountModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} account={account} />
    </>
  );
}
