"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { Device, PaymentMethod } from "@/lib/types"
import { ArrowLeft, Package, CreditCard, Building2 } from "lucide-react"

interface QuoteData {
  device: Device
  condition: string
  conditionAnswers: Record<string, any>
  quotedPrice: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    country: "Deutschland",
    paymentMethod: "paypal" as PaymentMethod,
    paypalEmail: "",
    iban: "",
    bic: "",
    accountHolder: "",
    acceptTerms: false,
    acceptPrivacy: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Load quote data from sessionStorage
    const storedQuote = sessionStorage.getItem("quote")
    if (storedQuote) {
      setQuoteData(JSON.parse(storedQuote))
    } else {
      // Redirect back if no quote data
      router.push("/verkaufen")
    }
  }, [router])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = "Vorname ist erforderlich"
    if (!formData.lastName.trim()) newErrors.lastName = "Nachname ist erforderlich"
    if (!formData.email.trim()) newErrors.email = "E-Mail ist erforderlich"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Ungültige E-Mail-Adresse"
    if (!formData.phone.trim()) newErrors.phone = "Telefonnummer ist erforderlich"
    if (!formData.street.trim()) newErrors.street = "Straße ist erforderlich"
    if (!formData.houseNumber.trim()) newErrors.houseNumber = "Hausnummer ist erforderlich"
    if (!formData.postalCode.trim()) newErrors.postalCode = "PLZ ist erforderlich"
    if (!formData.city.trim()) newErrors.city = "Stadt ist erforderlich"

    // Payment method specific validation
    if (formData.paymentMethod === "paypal") {
      if (!formData.paypalEmail.trim()) newErrors.paypalEmail = "PayPal E-Mail ist erforderlich"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.paypalEmail))
        newErrors.paypalEmail = "Ungültige E-Mail-Adresse"
    } else if (formData.paymentMethod === "bank-transfer") {
      if (!formData.iban.trim()) newErrors.iban = "IBAN ist erforderlich"
      if (!formData.accountHolder.trim()) newErrors.accountHolder = "Kontoinhaber ist erforderlich"
    }

    // Terms acceptance
    if (!formData.acceptTerms) newErrors.acceptTerms = "Sie müssen die AGB akzeptieren"
    if (!formData.acceptPrivacy) newErrors.acceptPrivacy = "Sie müssen die Datenschutzerklärung akzeptieren"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !quoteData) return

    setIsSubmitting(true)

    try {
      // Simulate order creation
      const orderId = `ORD-${Date.now()}`

      // Store order data
      const orderData = {
        id: orderId,
        ...quoteData,
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.street,
            houseNumber: formData.houseNumber,
            postalCode: formData.postalCode,
            city: formData.city,
            country: formData.country,
          },
        },
        paymentMethod: formData.paymentMethod,
        paymentDetails:
          formData.paymentMethod === "paypal"
            ? { paypalEmail: formData.paypalEmail }
            : {
                iban: formData.iban,
                bic: formData.bic,
                accountHolder: formData.accountHolder,
              },
        status: "quote-created",
        createdAt: new Date().toISOString(),
      }

      sessionStorage.setItem("order", JSON.stringify(orderData))
      sessionStorage.removeItem("quote")

      // Redirect to confirmation
      router.push(`/bestaetigung/${orderId}`)
    } catch (error) {
      console.error("[v0] Order submission error:", error)
      alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!quoteData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Laden...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href={`/verkaufen/${quoteData.device.id}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Angebot
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Bestellung abschließen</h1>
          <p className="text-lg text-muted-foreground">Geben Sie Ihre Daten ein, um fortzufahren</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Persönliche Daten</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">
                      Vorname <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                    {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">
                      Nachname <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                    {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">
                      E-Mail <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      Telefon <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </Card>

              {/* Shipping Address */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Versandadresse</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="street">
                        Straße <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="street"
                        value={formData.street}
                        onChange={(e) => handleInputChange("street", e.target.value)}
                        className={errors.street ? "border-destructive" : ""}
                      />
                      {errors.street && <p className="text-xs text-destructive mt-1">{errors.street}</p>}
                    </div>
                    <div>
                      <Label htmlFor="houseNumber">
                        Nr. <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="houseNumber"
                        value={formData.houseNumber}
                        onChange={(e) => handleInputChange("houseNumber", e.target.value)}
                        className={errors.houseNumber ? "border-destructive" : ""}
                      />
                      {errors.houseNumber && <p className="text-xs text-destructive mt-1">{errors.houseNumber}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="postalCode">
                        PLZ <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        className={errors.postalCode ? "border-destructive" : ""}
                      />
                      {errors.postalCode && <p className="text-xs text-destructive mt-1">{errors.postalCode}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="city">
                        Stadt <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className={errors.city ? "border-destructive" : ""}
                      />
                      {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country">Land</Label>
                    <Input id="country" value={formData.country} disabled />
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Auszahlungsmethode</h2>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  className="space-y-4"
                >
                  <Card
                    className={`p-4 cursor-pointer border-2 ${
                      formData.paymentMethod === "paypal" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleInputChange("paymentMethod", "paypal")}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5" />
                        <span className="font-semibold">PayPal</span>
                      </Label>
                    </div>
                    {formData.paymentMethod === "paypal" && (
                      <div className="mt-4 ml-7">
                        <Label htmlFor="paypalEmail">
                          PayPal E-Mail <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="paypalEmail"
                          type="email"
                          value={formData.paypalEmail}
                          onChange={(e) => handleInputChange("paypalEmail", e.target.value)}
                          className={errors.paypalEmail ? "border-destructive" : ""}
                          placeholder="ihre@email.de"
                        />
                        {errors.paypalEmail && <p className="text-xs text-destructive mt-1">{errors.paypalEmail}</p>}
                      </div>
                    )}
                  </Card>

                  <Card
                    className={`p-4 cursor-pointer border-2 ${
                      formData.paymentMethod === "bank-transfer" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleInputChange("paymentMethod", "bank-transfer")}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                      <Label htmlFor="bank-transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Building2 className="h-5 w-5" />
                        <span className="font-semibold">Banküberweisung</span>
                      </Label>
                    </div>
                    {formData.paymentMethod === "bank-transfer" && (
                      <div className="mt-4 ml-7 space-y-3">
                        <div>
                          <Label htmlFor="iban">
                            IBAN <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="iban"
                            value={formData.iban}
                            onChange={(e) => handleInputChange("iban", e.target.value)}
                            className={errors.iban ? "border-destructive" : ""}
                            placeholder="DE89 3704 0044 0532 0130 00"
                          />
                          {errors.iban && <p className="text-xs text-destructive mt-1">{errors.iban}</p>}
                        </div>
                        <div>
                          <Label htmlFor="bic">BIC (optional)</Label>
                          <Input
                            id="bic"
                            value={formData.bic}
                            onChange={(e) => handleInputChange("bic", e.target.value)}
                            placeholder="COBADEFFXXX"
                          />
                        </div>
                        <div>
                          <Label htmlFor="accountHolder">
                            Kontoinhaber <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="accountHolder"
                            value={formData.accountHolder}
                            onChange={(e) => handleInputChange("accountHolder", e.target.value)}
                            className={errors.accountHolder ? "border-destructive" : ""}
                          />
                          {errors.accountHolder && (
                            <p className="text-xs text-destructive mt-1">{errors.accountHolder}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                </RadioGroup>
              </Card>

              {/* Terms and Conditions */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                      className={errors.acceptTerms ? "border-destructive" : ""}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm leading-relaxed cursor-pointer">
                      Ich akzeptiere die{" "}
                      <Link href="/agb" className="text-primary hover:underline" target="_blank">
                        Allgemeinen Geschäftsbedingungen
                      </Link>{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  {errors.acceptTerms && <p className="text-xs text-destructive ml-7">{errors.acceptTerms}</p>}

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="acceptPrivacy"
                      checked={formData.acceptPrivacy}
                      onCheckedChange={(checked) => handleInputChange("acceptPrivacy", checked as boolean)}
                      className={errors.acceptPrivacy ? "border-destructive" : ""}
                    />
                    <Label htmlFor="acceptPrivacy" className="text-sm leading-relaxed cursor-pointer">
                      Ich habe die{" "}
                      <Link href="/datenschutz" className="text-primary hover:underline" target="_blank">
                        Datenschutzerklärung
                      </Link>{" "}
                      zur Kenntnis genommen <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  {errors.acceptPrivacy && <p className="text-xs text-destructive ml-7">{errors.acceptPrivacy}</p>}
                </div>
              </Card>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Wird verarbeitet..." : "Bestellung abschließen"}
              </Button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Zusammenfassung</h2>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-20 w-20 rounded-lg bg-muted/30 flex items-center justify-center flex-shrink-0">
                    <img
                      src={quoteData.device.imageUrl || "/placeholder.svg"}
                      alt={quoteData.device.model}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">
                      {quoteData.device.brand} {quoteData.device.model}
                    </p>
                    {quoteData.device.variant && (
                      <p className="text-sm text-muted-foreground">{quoteData.device.variant}</p>
                    )}
                    <Badge variant="secondary" className="mt-1">
                      {quoteData.condition}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ankaufspreis</span>
                    <span className="font-semibold">{quoteData.quotedPrice}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Versandkosten</span>
                    <span className="font-semibold text-primary">Kostenlos</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="font-semibold">Auszahlung</span>
                  <span className="text-2xl font-bold text-primary">{quoteData.quotedPrice}€</span>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <Package className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Kostenloser Versand</p>
                      <p className="text-xs text-muted-foreground">DHL-Versandlabel per E-Mail</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
