import { Header } from "@/components/header"
import { GameGrid } from "@/components/game-grid"
import { PromoBanner } from "@/components/promo-banner"
import { CategoryTabs } from "@/components/category-tabs"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-8">
        <PromoBanner />
        <CategoryTabs />
        <GameGrid />
      </main>
    </div>
  )
}
