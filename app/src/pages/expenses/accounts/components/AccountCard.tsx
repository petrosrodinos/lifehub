import { useCallback, useState } from "react";
import { Star } from "lucide-react";
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
  const defaultAccountUuid = useAuthStore((state) => state.defaultAccountUuid);
  const setDefaultAccountUuid = useAuthStore((state) => state.setDefaultAccountUuid);

  const balance = formatAccountBalance(account.balance);
  const isDefault = defaultAccountUuid === account.uuid;

  const handleOpenEdit = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);

  const handleToggleDefault = useCallback(() => {
    setDefaultAccountUuid(isDefault ? null : account.uuid);
  }, [account.uuid, isDefault, setDefaultAccountUuid]);

  return (
    <>
      <div className="relative bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800/50 hover:border-violet-500/40 rounded-lg transition-all duration-200">
        <button
          type="button"
          onClick={handleToggleDefault}
          aria-label={isDefault ? "Unset default account" : "Set as default account"}
          aria-pressed={isDefault}
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-md transition-colors ${
            isDefault
              ? "text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
              : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
          }`}
        >
          <Star className={`w-4 h-4 ${isDefault ? "fill-current" : ""}`} />
        </button>

        <button type="button" onClick={handleOpenEdit} className="w-full text-left p-3">
          <div className="flex items-center gap-3 mb-2 pr-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: account.color || "#8b5cf6" }}>
              {account.icon || "💼"}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-white truncate">{account.name}</h3>
              {isDefault && <p className="text-xs text-amber-400/90">Default</p>}
            </div>
          </div>
          {showAccountBalances ? (
            <p className={`text-lg font-semibold ${balance.isNegative ? "text-red-400" : "text-emerald-400"}`}>{balance.formatted}</p>
          ) : (
            <p className="text-lg font-semibold text-slate-500">••••••</p>
          )}
        </button>
      </div>

      <EditAccountModal isOpen={isEditModalOpen} onClose={handleCloseEdit} account={account} />
    </>
  );
}
