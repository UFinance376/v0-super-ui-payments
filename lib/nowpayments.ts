export interface PaymentRequest {
  price_amount: number
  price_currency: string
  pay_currency: string
  order_id: string
  order_description: string
  ipn_callback_url?: string
  success_url?: string
  cancel_url?: string
}

export interface PaymentResponse {
  payment_id: string
  payment_status: string
  pay_address: string
  price_amount: number
  price_currency: string
  pay_amount: number
  pay_currency: string
  order_id: string
  order_description: string
  payment_url: string
  created_at: string
  updated_at: string
}

export interface PaymentStatus {
  payment_id: string
  payment_status: string
  pay_address: string
  price_amount: number
  price_currency: string
  pay_amount: number
  pay_currency: string
  actually_paid: number
  order_id: string
  order_description: string
  purchase_id: string
  created_at: string
  updated_at: string
}

const NOWPAYMENTS_API_KEY = "BQ9VWHR-5C7497B-JT6XWHQ-HQAD64X"
const NOWPAYMENTS_BASE_URL = "https://api.nowpayments.io/v1"

export class NowPaymentsService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = NOWPAYMENTS_API_KEY
    this.baseUrl = NOWPAYMENTS_BASE_URL
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        "x-api-key": this.apiKey,
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`NowPayments API error: ${response.status} - ${error}`)
    }

    return response.json()
  }

  async getAvailableCurrencies(): Promise<{ currencies: string[] }> {
    return this.makeRequest("/currencies")
  }

  async getEstimatedPrice(amount: number, currency_from: string, currency_to: string) {
    return this.makeRequest(`/estimate?amount=${amount}&currency_from=${currency_from}&currency_to=${currency_to}`)
  }

  async createPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    return this.makeRequest("/payment", {
      method: "POST",
      body: JSON.stringify(paymentData),
    })
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    return this.makeRequest(`/payment/${paymentId}`)
  }

  async getMinimumPaymentAmount(currency_from: string, currency_to: string) {
    return this.makeRequest(`/min-amount?currency_from=${currency_from}&currency_to=${currency_to}`)
  }
}

export const nowPayments = new NowPaymentsService()
