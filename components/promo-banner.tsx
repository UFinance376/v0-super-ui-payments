import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function PromoBanner() {
  return (
    <Card className="gaming-card p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 gaming-gradient opacity-10"></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 neon-text text-primary">Stay Untamed</h1>
        <p className="text-xl mb-6 text-muted-foreground">UP TO $10,000.00</p>
        <p className="text-lg mb-8 text-foreground/80">Welcome Bonus</p>
        <Button size="lg" className="gaming-gradient text-black font-bold px-8 py-3 neon-glow">
          CLAIM NOW
        </Button>
      </div>
    </Card>
  )
}
