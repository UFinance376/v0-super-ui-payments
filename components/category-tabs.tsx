"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

const categories = [
  { id: "casino", name: "CASINO", icon: "🎰" },
  { id: "sports", name: "SPORTS", icon: "⚽" },
  { id: "lottery", name: "LOTTERY", icon: "🎫" },
  { id: "racing", name: "RACING", icon: "🏎️" },
]

export function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState("casino")

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          size="lg"
          onClick={() => setActiveCategory(category.id)}
          className={`
            px-6 py-3 font-bold text-sm
            ${
              activeCategory === category.id
                ? "gaming-gradient text-black neon-glow"
                : "border-primary/50 text-primary hover:bg-primary/10"
            }
          `}
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </Button>
      ))}
    </div>
  )
}
