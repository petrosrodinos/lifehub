import { useState } from "react";
import { AccountsHeader } from "./accounts/components/AccountsHeader";
import { AccountsList } from "./accounts/components/AccountsList";
import { CreateAccountModal } from "./accounts/components/CreateAccountModal";
import { TransactionsSection } from "./transactions/components/TransactionsSection";
import { useAccountsPage } from "./accounts/hooks/use-accounts-page";
import { CategoriesMenu } from "./categories/components/CategoriesMenu";

export function ExpenseAccountsPage() {
  const { isCreateModalOpen, openCreateModal, closeCreateModal } = useAccountsPage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      <CategoriesMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwIDYuNjI3LTUuMzczIDEyLTEyIDEycy0xMi01LjM3My0xMi0xMiA1LjM3My0xMiAxMi0xMiAxMiA1LjM3MyAxMiAxMnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvZz48L3N2Zz4=')] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-8">
        <AccountsHeader onCreateClick={openCreateModal} onCategoriesClick={() => setMenuOpen(true)} />

        <AccountsList />

        <TransactionsSection />
      </div>

      <CreateAccountModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
    </div>
  );
}
