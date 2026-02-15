import { useState } from "react";
import { useExpensesBySubcategory, useTransactionTrend } from "../../../../../features/expense-entries/hooks/use-expense-entries";
import { useExpenseCategories } from "../../../../../features/expense-categories/hooks/use-expense-categories";
import { useExpenseSubcategories } from "../../../../../features/expense-subcategories/hooks/use-expense-subcategories";
import { ExpenseEntryTypes, type ExpenseEntryType } from "../../../../../features/expense-entries/interfaces/expense-entries.interfaces";
import { BreakdownChart } from "./BreakdownChart";
import { BreakdownTable } from "./BreakdownTable";
import { TransactionTrendChart } from "./TransactionTrendChart";
import { ChartSkeleton } from "../ChartSkeleton";

export function CategoryBreakdown() {
  const [selectedType, setSelectedType] = useState<ExpenseEntryType>(ExpenseEntryTypes.EXPENSE);
  const [groupBy, setGroupBy] = useState<"category" | "subcategory">("subcategory");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  
  const [trendCategoryUuid, setTrendCategoryUuid] = useState("");
  const [trendSubcategoryUuid, setTrendSubcategoryUuid] = useState("");
  const [trendFromDate, setTrendFromDate] = useState("");
  const [trendToDate, setTrendToDate] = useState("");

  const { data: categories = [] } = useExpenseCategories();
  const { data: subcategories = [] } = useExpenseSubcategories();

  const categoryParams = {
    type: selectedType,
    group_by: groupBy,
    from_date: fromDate,
    to_date: toDate,
  };

  const { data: breakdownData = [], isLoading: isLoadingBreakdown } = useExpensesBySubcategory(categoryParams);

  const trendParams = {
    type: selectedType,
    category_uuid: trendCategoryUuid,
    subcategory_uuid: trendSubcategoryUuid || undefined,
    from_date: trendFromDate,
    to_date: trendToDate,
  };

  const { data: transactionTrend = [], isLoading: isLoadingTrend } = useTransactionTrend(trendParams);

  const filteredSubcategories = trendCategoryUuid
    ? subcategories.filter((sub) => sub.category_uuid === trendCategoryUuid)
    : [];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
        <div className="max-w-xs">
          <label className="block text-sm font-medium text-slate-300 mb-2">Transaction Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as ExpenseEntryType)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors"
          >
            <option value={ExpenseEntryTypes.EXPENSE}>Expenses</option>
            <option value={ExpenseEntryTypes.INCOME}>Income</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Breakdown by {groupBy === "category" ? "Category" : "Subcategory"}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Group By</label>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value as "category" | "subcategory")}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors"
              >
                <option value="category">Category</option>
                <option value="subcategory">Subcategory</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">From Date (Optional)</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">To Date (Optional)</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {isLoadingBreakdown ? (
          <ChartSkeleton />
        ) : (
          <BreakdownChart data={breakdownData} groupBy={groupBy} />
        )}

        {isLoadingBreakdown ? (
          <ChartSkeleton />
        ) : (
          <BreakdownTable data={breakdownData} groupBy={groupBy} />
        )}
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            {selectedType === ExpenseEntryTypes.INCOME ? "Income" : "Expense"} Trend
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category *</label>
              <select
                value={trendCategoryUuid}
                onChange={(e) => {
                  setTrendCategoryUuid(e.target.value);
                  setTrendSubcategoryUuid("");
                }}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.uuid} value={category.uuid}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Subcategory (Optional)</label>
              <select
                value={trendSubcategoryUuid}
                onChange={(e) => setTrendSubcategoryUuid(e.target.value)}
                disabled={!trendCategoryUuid}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">All subcategories</option>
                {filteredSubcategories.map((subcategory) => (
                  <option key={subcategory.uuid} value={subcategory.uuid}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">From Date (Optional)</label>
              <input
                type="date"
                value={trendFromDate}
                onChange={(e) => setTrendFromDate(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">To Date (Optional)</label>
              <input
                type="date"
                value={trendToDate}
                onChange={(e) => setTrendToDate(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {isLoadingTrend ? (
          <ChartSkeleton />
        ) : (
          <TransactionTrendChart 
            data={transactionTrend} 
            type={selectedType === ExpenseEntryTypes.INCOME ? "INCOME" : "EXPENSE"} 
          />
        )}
      </div>
    </div>
  );
}
