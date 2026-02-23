import { useExpenseAccounts } from "../../../../../features/expenses/expense-accounts/hooks/use-expense-accounts";

type AnalyticsFiltersProps = {
  selectedAccounts: string[];
  onAccountsChange: (accounts: string[]) => void;
  fromDate: string;
  onFromDateChange: (date: string) => void;
  toDate: string;
  onToDateChange: (date: string) => void;
};

export function AnalyticsFilters({ selectedAccounts, onAccountsChange, fromDate, onFromDateChange, toDate, onToDateChange }: AnalyticsFiltersProps) {
  const { data: accountsData } = useExpenseAccounts();
  const accounts = accountsData || [];

  const handleAccountToggle = (accountUuid: string) => {
    if (selectedAccounts.includes(accountUuid)) {
      onAccountsChange(selectedAccounts.filter((uuid) => uuid !== accountUuid));
    } else {
      onAccountsChange([...selectedAccounts, accountUuid]);
    }
  };

  const handleSelectAll = () => {
    if (selectedAccounts.length === accounts.length) {
      onAccountsChange([]);
    } else {
      onAccountsChange(accounts.map((account) => account.uuid));
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6 space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          <button type="button" onClick={handleSelectAll} className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            {selectedAccounts.length === accounts.length ? "Deselect All" : "Select All"}
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Accounts</label>
          <div className="grid grid-cols-2 gap-2">
            {accounts.map((account) => {
              const isSelected = selectedAccounts.includes(account.uuid);
              return (
                <button
                  key={account.uuid}
                  type="button"
                  onClick={() => handleAccountToggle(account.uuid)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${isSelected ? "text-white shadow-lg" : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700"}`}
                  style={
                    isSelected
                      ? {
                          backgroundColor: account.color || "#8b5cf6",
                          boxShadow: `0 10px 30px -10px ${account.color || "#8b5cf6"}50`,
                        }
                      : undefined
                  }
                >
                  <span className="mr-2">{account.icon}</span>
                  {account.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">From Date (Optional)</label>
          <input type="date" value={fromDate} onChange={(e) => onFromDateChange(e.target.value)} placeholder="All time" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">To Date (Optional)</label>
          <input type="date" value={toDate} onChange={(e) => onToDateChange(e.target.value)} placeholder="All time" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors" />
        </div>
      </div>
    </div>
  );
}
