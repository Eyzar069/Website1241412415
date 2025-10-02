import type { Device, DeviceCondition, PriceCalculation } from "./types"
import { CONDITION_MULTIPLIERS } from "./mock-data"

/**
 * Calculate the final buyback price for a device
 * Based on: base price, condition, age decay, and market index
 */
export function calculatePrice(
  device: Device,
  condition: DeviceCondition,
  conditionAnswers: Record<string, any> = {},
): PriceCalculation {
  const currentYear = new Date().getFullYear()
  const deviceAge = currentYear - device.releaseYear

  // Base price from device catalog
  const basePrice = device.basePrice

  // Condition multiplier
  const conditionMultiplier = CONDITION_MULTIPLIERS[condition]

  // Age decay: 15% reduction per year, minimum 0.3
  const ageDecayMultiplier = Math.max(0.3, 1 - deviceAge * 0.15)

  // Market index (simulated - would be dynamic in production)
  const marketIndexMultiplier = 0.95 // 5% market adjustment

  // Additional deductions based on condition answers
  let additionalDeductions = 0
  if (conditionAnswers.hasScreenDamage) additionalDeductions += 50
  if (conditionAnswers.hasBatteryIssues) additionalDeductions += 30
  if (conditionAnswers.hasWaterDamage) additionalDeductions += 100

  // Calculate final price
  const priceBeforeDeductions = basePrice * conditionMultiplier * ageDecayMultiplier * marketIndexMultiplier

  const finalPrice = Math.max(0, Math.round(priceBeforeDeductions - additionalDeductions))

  return {
    basePrice,
    conditionMultiplier,
    ageDecayMultiplier,
    marketIndexMultiplier,
    finalPrice,
    breakdown: [
      { label: "Basispreis", value: basePrice },
      { label: "Zustand", value: Math.round(basePrice * conditionMultiplier) },
      { label: "Alter", value: Math.round(basePrice * conditionMultiplier * ageDecayMultiplier) },
      { label: "Marktanpassung", value: Math.round(priceBeforeDeductions) },
      { label: "Abzüge", value: -additionalDeductions },
      { label: "Endpreis", value: finalPrice },
    ],
  }
}

/**
 * Get condition questions for a device category
 */
export function getConditionQuestions(category: string) {
  const baseQuestions = [
    {
      id: "hasScreenDamage",
      question: "Hat das Display Kratzer, Risse oder andere Schäden?",
      type: "boolean" as const,
      priceImpact: -50,
      required: true,
    },
    {
      id: "functionalityWorking",
      question: "Funktionieren alle Tasten und Anschlüsse einwandfrei?",
      type: "boolean" as const,
      priceImpact: 0,
      required: true,
    },
    {
      id: "hasWaterDamage",
      question: "Gab es Kontakt mit Flüssigkeiten oder Wasserschäden?",
      type: "boolean" as const,
      priceImpact: -100,
      required: true,
    },
    {
      id: "hasOriginalPackaging",
      question: "Ist die Originalverpackung vorhanden?",
      type: "boolean" as const,
      priceImpact: 10,
      required: false,
    },
  ]

  // Add category-specific questions
  if (category === "smartphone" || category === "tablet") {
    baseQuestions.push({
      id: "hasBatteryIssues",
      question: "Gibt es Probleme mit der Akkulaufzeit?",
      type: "boolean" as const,
      priceImpact: -30,
      required: true,
    })
  }

  if (category === "laptop") {
    baseQuestions.push({
      id: "hasKeyboardIssues",
      question: "Funktioniert die Tastatur einwandfrei?",
      type: "boolean" as const,
      priceImpact: -40,
      required: true,
    })
  }

  return baseQuestions
}
