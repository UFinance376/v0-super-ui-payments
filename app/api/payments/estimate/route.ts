import { type NextRequest, NextResponse } from "next/server"
import { nowPayments } from "@/lib/nowpayments"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const amount = searchParams.get("amount")
    const currencyFrom = searchParams.get("currency_from")
    const currencyTo = searchParams.get("currency_to")

    if (!amount || !currencyFrom || !currencyTo) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const estimate = await nowPayments.getEstimatedPrice(Number.parseFloat(amount), currencyFrom, currencyTo)

    return NextResponse.json(estimate)
  } catch (error) {
    console.error("Price estimation error:", error)
    return NextResponse.json({ error: "Failed to get price estimate" }, { status: 500 })
  }
}
