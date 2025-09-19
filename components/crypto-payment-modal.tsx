"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Loader2, Copy, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaymentModalProps {
  isOpen?: boolean
  onClose?: () => void
}

const popularCryptos = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿" },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ" },
  { symbol: "USDT", name: "Tether", icon: "₮" },
  { symbol: "BNB", name: "Binance Coin", icon: "BNB" },
  { symbol: "ADA", name: "Cardano", icon: "ADA" },
  { symbol: "DOT", name: "Polkadot", icon: "DOT" },
  { symbol: "LTC", name: "Litecoin", icon: "Ł" },
  { symbol: "DOGE", name: "Dogecoin", icon: "Ð" },
]

export function CryptoPaymentModal({ isOpen = false, onClose }: PaymentModalProps) {
  const [step, setStep] = useState<"amount" | "payment" | "success">("amount")
  const [amount, setAmount] = useState("")
  const [selectedCrypto, setSelectedCrypto] = useState("BTC")
  const [loading, setLoading] = useState(false)
  const [paymentData, setPaymentData] = useState<any>(null)
  const [estimate, setEstimate] = useState<any>(null)
  const { toast } = useToast()

  // Get price estimate when amount or crypto changes
  useEffect(() => {
    if (amount && selectedCrypto && Number.parseFloat(amount) > 0) {
      getEstimate()
    }
  }, [amount, selectedCrypto])

  const getEstimate = async () => {
    try {
      const response = await fetch(
        `/api/payments/estimate?amount=${amount}&currency_from=USD&currency_to=${selectedCrypto}`,
      )
      const data = await response.json()
      setEstimate(data)
    } catch (error) {
      console.error("Estimate error:", error)
    }
  }

  const createPayment = async () => {
    setLoading(true)
    try {
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number.parseFloat(amount),
          currency: "USD",
          paymentCurrency: selectedCrypto,
          orderId,
          description: `Gaming deposit - $${amount}`,
        }),
      })

      if (!response.ok) {
        throw new Error("Payment creation failed")
      }

      const payment = await response.json()
      setPaymentData(payment)
      setStep("payment")

      toast({
        title: "Payment Created",
        description: "Please send the exact amount to the provided address",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Address copied to clipboard",
    })
  }

  const resetModal = () => {
    setStep("amount")
    setAmount("")
    setSelectedCrypto("BTC")
    setPaymentData(null)
    setEstimate(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="gaming-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-primary neon-text">Crypto Deposit</DialogTitle>
        </DialogHeader>

        {step === "amount" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Deposit Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg font-bold"
              />
            </div>

            <div className="space-y-2">
              <Label>Select Cryptocurrency</Label>
              <div className="grid grid-cols-2 gap-2">
                {popularCryptos.map((crypto) => (
                  <Button
                    key={crypto.symbol}
                    variant={selectedCrypto === crypto.symbol ? "default" : "outline"}
                    onClick={() => setSelectedCrypto(crypto.symbol)}
                    className={`p-3 ${
                      selectedCrypto === crypto.symbol
                        ? "gaming-gradient text-black font-bold"
                        : "border-primary/50 hover:bg-primary/10"
                    }`}
                  >
                    <span className="mr-2">{crypto.icon}</span>
                    {crypto.symbol}
                  </Button>
                ))}
              </div>
            </div>

            {estimate && (
              <Card className="gaming-card p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">You will pay approximately</p>
                  <p className="text-2xl font-bold text-primary">
                    {estimate.estimated_amount} {selectedCrypto}
                  </p>
                </div>
              </Card>
            )}

            <Button
              onClick={createPayment}
              disabled={!amount || Number.parseFloat(amount) <= 0 || loading}
              className="w-full gaming-gradient text-black font-bold py-3"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Payment...
                </>
              ) : (
                "Create Payment"
              )}
            </Button>
          </div>
        )}

        {step === "payment" && paymentData && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl mb-2">{popularCryptos.find((c) => c.symbol === selectedCrypto)?.icon}</div>
              <h3 className="text-lg font-bold">Send {selectedCrypto}</h3>
              <p className="text-sm text-muted-foreground">Payment ID: {paymentData.payment_id}</p>
            </div>

            <Card className="gaming-card p-4 space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">Amount to Send</Label>
                <div className="flex items-center justify-between bg-secondary/50 p-3 rounded">
                  <span className="font-bold text-lg">
                    {paymentData.pay_amount} {selectedCrypto}
                  </span>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(paymentData.pay_amount.toString())}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Payment Address</Label>
                <div className="flex items-center justify-between bg-secondary/50 p-3 rounded">
                  <span className="font-mono text-sm truncate mr-2">{paymentData.pay_address}</span>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(paymentData.pay_address)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-yellow-500">Important:</p>
                  <p>Send the exact amount to the address above. The payment will be confirmed automatically.</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={resetModal} className="flex-1 bg-transparent">
                New Payment
              </Button>
              <Button
                onClick={() => window.open(paymentData.payment_url, "_blank")}
                className="flex-1 gaming-gradient text-black font-bold"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Wallet
              </Button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-xl font-bold text-green-500">Payment Confirmed!</h3>
              <p className="text-muted-foreground">Your deposit has been processed successfully.</p>
            </div>
            <Button onClick={resetModal} className="gaming-gradient text-black font-bold">
              Make Another Deposit
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
