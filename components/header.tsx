"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Wallet, User, Menu } from "lucide-react"
import { useState } from "react"
import { CryptoPaymentModal } from "./crypto-payment-modal"

export function Header() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)

  return (
    <>
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-primary neon-text">CRYPTO GAMES</div>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search games..." className="pl-10 bg-secondary/50 border-border" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPaymentOpen(true)}
                className="hidden sm:flex items-center space-x-2 border-primary/50 text-primary hover:bg-primary/10 gaming-gradient hover:text-black font-bold"
              >
                <Wallet className="w-4 h-4" />
                <span>Deposit</span>
              </Button>

              <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                <User className="w-4 h-4" />
              </Button>

              <Button variant="outline" size="sm" className="md:hidden bg-transparent">
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <CryptoPaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
    </>
  )
}
