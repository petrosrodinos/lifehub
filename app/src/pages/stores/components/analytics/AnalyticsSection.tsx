import { PriceEvolutionSection } from "./price-evolution"
import { PurchasedProductsSection } from "./purchased-products"
import { StorePurchasesSection } from "./store-purchases"

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <PriceEvolutionSection />
      <StorePurchasesSection />
      <PurchasedProductsSection />
    </div>
  )
}

