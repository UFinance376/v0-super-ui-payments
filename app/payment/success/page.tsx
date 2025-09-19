import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="gaming-card max-w-md w-full p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />

        <h1 className="text-2xl font-bold text-green-500 mb-4 neon-text">Payment Successful!</h1>

        <p className="text-muted-foreground mb-6">
          Your crypto deposit has been confirmed and added to your account balance.
        </p>

        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full gaming-gradient text-black font-bold">Start Playing</Button>
          </Link>

          <Link href="/account">
            <Button variant="outline" className="w-full bg-transparent">
              View Account
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
