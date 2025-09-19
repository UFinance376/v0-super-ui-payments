import { NextResponse } from "next/server"
import { nowPayments } from "@/lib/nowpayments"

export async function GET() {
  try {
    const currencies = await nowPayments.getAvailableCurrencies()
    return NextResponse.json(currencies)
  } catch (error) {
    console.error("Currencies fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch currencies" }, { status: 500 })
  }
}
