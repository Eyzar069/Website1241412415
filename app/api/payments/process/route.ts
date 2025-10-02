import { NextResponse } from "next/server"
import { processPayment, validatePaymentDetails } from "@/lib/payment"
import type { PaymentMethod } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderId, amount, method, details } = body

    // Validate required fields
    if (!orderId || !amount || !method || !details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate payment details
    const validation = validatePaymentDetails(method as PaymentMethod, details)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Process payment
    const result = await processPayment(orderId, amount, method as PaymentMethod, details)

    if (!result.success) {
      return NextResponse.json({ error: result.error, message: result.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      transactionId: result.transactionId,
      message: result.message,
    })
  } catch (error) {
    console.error("[v0] Payment API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
