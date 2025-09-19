"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, RefreshCw } from "lucide-react"

interface PaymentStatusCheckerProps {
  paymentId: string
  onStatusChange?: (status: string) => void
}

export function PaymentStatusChecker({ paymentId, onStatusChange }: PaymentStatusCheckerProps) {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/payments/status/${paymentId}`)
      const data = await response.json()
      setStatus(data)
      onStatusChange?.(data.payment_status)
    } catch (error) {
      console.error("Status check error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (paymentId) {
      checkStatus()
      // Check status every 30 seconds
      const interval = setInterval(checkStatus, 30000)
      return () => clearInterval(interval)
    }
  }, [paymentId])

  if (!status) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "finished":
        return "text-green-500"
      case "partially_paid":
        return "text-yellow-500"
      case "failed":
        return "text-red-500"
      case "expired":
        return "text-red-500"
      default:
        return "text-blue-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "waiting":
        return "Waiting for payment"
      case "confirming":
        return "Confirming transaction"
      case "confirmed":
        return "Payment confirmed"
      case "finished":
        return "Payment completed"
      case "partially_paid":
        return "Partially paid"
      case "failed":
        return "Payment failed"
      case "expired":
        return "Payment expired"
      default:
        return status
    }
  }

  return (
    <Card className="gaming-card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Payment Status</p>
          <p className={`font-bold ${getStatusColor(status.payment_status)}`}>{getStatusText(status.payment_status)}</p>
        </div>

        <Button size="sm" variant="outline" onClick={checkStatus} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </div>

      {status.actually_paid > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Received: {status.actually_paid} {status.pay_currency}
          </p>
        </div>
      )}
    </Card>
  )
}
