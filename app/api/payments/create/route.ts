import { type NextRequest, NextResponse } from "next/server"
import { nowPayments } from "@/lib/nowpayments"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { amount, currency, paymentCurrency, orderId, description } = body

    if (!amount || !currency || !paymentCurrency || !orderId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const paymentData = {
      price_amount: Number.parseFloat(amount),
      price_currency: currency,
      pay_currency: paymentCurrency,
      order_id: orderId,
      order_description: description || "Crypto Gaming Deposit",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/cancel`,
    }

    const payment = await nowPayments.createPayment(paymentData)

    return NextResponse.json(payment)
  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}
