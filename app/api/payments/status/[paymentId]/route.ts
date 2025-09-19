import { type NextRequest, NextResponse } from "next/server"
import { nowPayments } from "@/lib/nowpayments"

export async function GET(request: NextRequest, { params }: { params: { paymentId: string } }) {
  try {
    const { paymentId } = params

    if (!paymentId) {
      return NextResponse.json({ error: "Payment ID is required" }, { status: 400 })
    }

    const status = await nowPayments.getPaymentStatus(paymentId)

    return NextResponse.json(status)
  } catch (error) {
    console.error("Payment status error:", error)
    return NextResponse.json({ error: "Failed to get payment status" }, { status: 500 })
  }
}
