import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="gaming-card max-w-md w-full p-8 text-center">
        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />

        <h1 className="text-2xl font-bold text-red-500 mb-4">Payment Cancelled</h1>

        <p className="text-muted-foreground mb-6">
          Your payment was cancelled or expired. No charges were made to your account.
        </p>

        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full gaming-gradient text-black font-bold">Try Again</Button>
          </Link>

          <Link href="/support">
            <Button variant="outline" className="w-full bg-transparent">
              Contact Support
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
