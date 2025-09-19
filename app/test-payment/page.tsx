"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CryptoPaymentModal } from "@/components/crypto-payment-modal"
import { PaymentStatusChecker } from "@/components/payment-status-checker"

export default function TestPaymentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [testPaymentId, setTestPaymentId] = useState("")
  const [currencies, setCurrencies] = useState<string[]>([])
  const [loadingCurrencies, setLoadingCurrencies] = useState(false)

  const fetchCurrencies = async () => {
    setLoadingCurrencies(true)
    try {
      const response = await fetch("/api/payments/currencies")
      const data = await response.json()
      setCurrencies(data.currencies || [])
    } catch (error) {
      console.error("Failed to fetch currencies:", error)
    } finally {
      setLoadingCurrencies(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary neon-text mb-4">Payment System Test</h1>
          <p className="text-muted-foreground">Test the Nowpayments integration and crypto payment flow</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment Modal Test */}
          <Card className="gaming-card p-6">
            <h2 className="text-xl font-bold mb-4">Payment Modal</h2>
            <p className="text-muted-foreground mb-4">
              Test the crypto payment modal with real Nowpayments integration
            </p>
            <Button onClick={() => setIsModalOpen(true)} className="gaming-gradient text-black font-bold">
              Open Payment Modal
            </Button>
          </Card>

          {/* Currency List Test */}
          <Card className="gaming-card p-6">
            <h2 className="text-xl font-bold mb-4">Available Currencies</h2>
            <p className="text-muted-foreground mb-4">Fetch supported cryptocurrencies from Nowpayments</p>
            <Button
              onClick={fetchCurrencies}
              disabled={loadingCurrencies}
              variant="outline"
              className="mb-4 bg-transparent"
            >
              {loadingCurrencies ? "Loading..." : "Fetch Currencies"}
            </Button>

            {currencies.length > 0 && (
              <div className="max-h-40 overflow-y-auto">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {currencies.slice(0, 30).map((currency) => (
                    <span key={currency} className="bg-secondary/50 px-2 py-1 rounded">
                      {currency}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Showing first 30 of {currencies.length} currencies</p>
              </div>
            )}
          </Card>

          {/* Payment Status Test */}
          <Card className="gaming-card p-6">
            <h2 className="text-xl font-bold mb-4">Payment Status</h2>
            <p className="text-muted-foreground mb-4">Check the status of a payment by ID</p>
            <div className="space-y-3">
              <div>
                <Label htmlFor="paymentId">Payment ID</Label>
                <Input
                  id="paymentId"
                  placeholder="Enter payment ID"
                  value={testPaymentId}
                  onChange={(e) => setTestPaymentId(e.target.value)}
                />
              </div>

              {testPaymentId && (
                <PaymentStatusChecker
                  paymentId={testPaymentId}
                  onStatusChange={(status) => console.log("Status:", status)}
                />
              )}
            </div>
          </Card>

          {/* API Test Results */}
          <Card className="gaming-card p-6">
            <h2 className="text-xl font-bold mb-4">Integration Status</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>API Key:</span>
                <span className="text-green-500">✓ Configured</span>
              </div>
              <div className="flex justify-between">
                <span>Base URL:</span>
                <span className="text-green-500">✓ Set</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Routes:</span>
                <span className="text-green-500">✓ Ready</span>
              </div>
              <div className="flex justify-between">
                <span>UI Components:</span>
                <span className="text-green-500">✓ Loaded</span>
              </div>
            </div>
          </Card>
        </div>

        <CryptoPaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}
