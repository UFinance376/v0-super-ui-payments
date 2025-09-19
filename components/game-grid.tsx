import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const games = [
  { id: 1, name: "CRASH", color: "from-purple-500 to-pink-500", image: "🚀" },
  { id: 2, name: "PLINKO", color: "from-green-500 to-teal-500", image: "🎯" },
  { id: 3, name: "DICE", color: "from-blue-500 to-cyan-500", image: "🎲" },
  { id: 4, name: "MINES", color: "from-red-500 to-orange-500", image: "💎" },
  { id: 5, name: "KENO", color: "from-yellow-500 to-orange-500", image: "🎱" },
  { id: 6, name: "LIMBO", color: "from-indigo-500 to-purple-500", image: "🎪" },
  { id: 7, name: "WHEEL", color: "from-pink-500 to-rose-500", image: "🎡" },
  { id: 8, name: "TOWER", color: "from-emerald-500 to-green-500", image: "🏗️" },
]

export function GameGrid() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center text-primary neon-text">Live Games</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {games.map((game) => (
          <Card
            key={game.id}
            className="gaming-card p-4 text-center hover:scale-105 transition-transform cursor-pointer group"
          >
            <div className={`text-4xl mb-2 bg-gradient-to-br ${game.color} bg-clip-text text-transparent`}>
              {game.image}
            </div>
            <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
              {game.name}
            </h3>
          </Card>
        ))}
      </div>

      {/* Featured Games Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary">Featured Games</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="gaming-card overflow-hidden group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-6xl">🎮</div>
              </div>
              <div className="p-4">
                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">Game Title {i}</h4>
                <p className="text-sm text-muted-foreground mb-3">Exciting crypto game with amazing rewards</p>
                <Button size="sm" className="w-full gaming-gradient text-black font-bold">
                  PLAY NOW
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
