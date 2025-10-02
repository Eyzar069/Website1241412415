import type { PaymentMethod } from "./types"

/**
 * Payment processing utilities for the electronics buyback platform
 * Handles PayPal and Bank Transfer payouts
 */

export interface PaymentDetails {
  paypalEmail?: string
  iban?: string
  bic?: string
  accountHolder?: string
}

export interface PaymentResult {
  success: boolean
  transactionId?: string
  error?: string
  message: string
}

/**
 * Process a payout to the customer
 * In production, this would integrate with actual payment APIs
 */
export async function processPayment(
  orderId: string,
  amount: number,
  method: PaymentMethod,
  details: PaymentDetails,
): Promise<PaymentResult> {
  console.log("[v0] Processing payment:", { orderId, amount, method, details })

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    if (method === "paypal") {
      return await processPayPalPayment(orderId, amount, details.paypalEmail!)
    } else if (method === "bank-transfer") {
      return await processBankTransfer(orderId, amount, details)
    }

    return {
      success: false,
      error: "INVALID_METHOD",
      message: "Ungültige Zahlungsmethode",
    }
  } catch (error) {
    console.error("[v0] Payment processing error:", error)
    return {
      success: false,
      error: "PROCESSING_ERROR",
      message: "Fehler bei der Zahlungsabwicklung",
    }
  }
}

/**
 * Process PayPal payout
 * In production, integrate with PayPal Payouts API
 */
async function processPayPalPayment(orderId: string, amount: number, email: string): Promise<PaymentResult> {
  console.log("[v0] Processing PayPal payment:", { orderId, amount, email })

  // Validate email
  if (!email || !email.includes("@")) {
    return {
      success: false,
      error: "INVALID_EMAIL",
      message: "Ungültige PayPal E-Mail-Adresse",
    }
  }

  // Simulate PayPal API call
  // In production: Use PayPal Payouts API
  // const paypalResponse = await fetch('https://api.paypal.com/v1/payments/payouts', {...})

  const transactionId = `PAYPAL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  return {
    success: true,
    transactionId,
    message: `PayPal-Zahlung von ${amount}€ an ${email} erfolgreich`,
  }
}

/**
 * Process bank transfer (SEPA)
 * In production, integrate with banking API or manual processing
 */
async function processBankTransfer(orderId: string, amount: number, details: PaymentDetails): Promise<PaymentResult> {
  console.log("[v0] Processing bank transfer:", { orderId, amount, details })

  // Validate IBAN
  if (!details.iban || details.iban.length < 15) {
    return {
      success: false,
      error: "INVALID_IBAN",
      message: "Ungültige IBAN",
    }
  }

  if (!details.accountHolder) {
    return {
      success: false,
      error: "MISSING_ACCOUNT_HOLDER",
      message: "Kontoinhaber fehlt",
    }
  }

  // Simulate bank transfer initiation
  // In production: Use SEPA API or create manual transfer instruction
  const transactionId = `SEPA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  return {
    success: true,
    transactionId,
    message: `Banküberweisung von ${amount}€ an ${details.accountHolder} (${details.iban}) initiiert`,
  }
}

/**
 * Validate payment details before processing
 */
export function validatePaymentDetails(
  method: PaymentMethod,
  details: PaymentDetails,
): { valid: boolean; error?: string } {
  if (method === "paypal") {
    if (!details.paypalEmail) {
      return { valid: false, error: "PayPal E-Mail fehlt" }
    }
    if (!details.paypalEmail.includes("@")) {
      return { valid: false, error: "Ungültige E-Mail-Adresse" }
    }
  } else if (method === "bank-transfer") {
    if (!details.iban) {
      return { valid: false, error: "IBAN fehlt" }
    }
    if (!details.accountHolder) {
      return { valid: false, error: "Kontoinhaber fehlt" }
    }
    // Basic IBAN validation (length check)
    if (details.iban.replace(/\s/g, "").length < 15) {
      return { valid: false, error: "IBAN zu kurz" }
    }
  }

  return { valid: true }
}

/**
 * Calculate processing fee (if applicable)
 * Some payment methods may have fees
 */
export function calculatePaymentFee(amount: number, method: PaymentMethod): number {
  // PayPal typically charges a fee, bank transfers are usually free
  if (method === "paypal") {
    // Example: 2% + 0.35€ fee (typical PayPal fee structure)
    return Math.round((amount * 0.02 + 0.35) * 100) / 100
  }
  return 0
}

/**
 * Get estimated payout time
 */
export function getEstimatedPayoutTime(method: PaymentMethod): string {
  if (method === "paypal") {
    return "1-2 Werktage"
  } else if (method === "bank-transfer") {
    return "2-3 Werktage"
  }
  return "Unbekannt"
}
