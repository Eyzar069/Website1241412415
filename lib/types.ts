// Core data types for the electronics buyback platform

export type DeviceCategory =
  | "smartphone"
  | "tablet"
  | "laptop"
  | "smartwatch"
  | "camera"
  | "console"
  | "headphones"
  | "other"

export type DeviceCondition = "wie-neu" | "sehr-gut" | "gut" | "akzeptabel" | "defekt"

export type OrderStatus =
  | "quote-created"
  | "awaiting-shipment"
  | "in-transit"
  | "received"
  | "in-inspection"
  | "approved"
  | "price-adjusted"
  | "rejected"
  | "payment-sent"
  | "completed"
  | "cancelled"

export type PaymentMethod = "paypal" | "bank-transfer"

export interface Device {
  id: string
  category: DeviceCategory
  brand: string
  series?: string
  model: string
  variant?: string
  releaseYear: number
  basePrice: number
  imageUrl?: string
  specifications?: {
    storage?: string
    color?: string
    connectivity?: string
  }
}

export interface ConditionQuestion {
  id: string
  question: string
  type: "boolean" | "select" | "multiselect"
  options?: string[]
  priceImpact: number // Multiplier or fixed amount
  required: boolean
}

export interface PriceCalculation {
  basePrice: number
  conditionMultiplier: number
  ageDecayMultiplier: number
  marketIndexMultiplier: number
  finalPrice: number
  breakdown: {
    label: string
    value: number
  }[]
}

export interface Order {
  id: string
  deviceId: string
  device: Device
  condition: DeviceCondition
  conditionAnswers: Record<string, any>
  quotedPrice: number
  finalPrice?: number
  status: OrderStatus
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: {
      street: string
      houseNumber: string
      postalCode: string
      city: string
      country: string
    }
  }
  paymentMethod: PaymentMethod
  paymentDetails?: {
    paypalEmail?: string
    iban?: string
    bic?: string
    accountHolder?: string
  }
  trackingNumber?: string
  inspectionNotes?: string
  createdAt: Date
  updatedAt: Date
}
