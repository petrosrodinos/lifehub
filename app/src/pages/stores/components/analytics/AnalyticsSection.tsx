import { PriceEvolutionSection } from "./price-evolution"
import { PurchasedProductsSection } from "./purchased-products"

export function AnalyticsSection() {

  return (
    <div className="space-y-6">
      <PriceEvolutionSection/>
      <PurchasedProductsSection />
    </div>
  )
}

