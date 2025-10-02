"use client"

import { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MOCK_DEVICES, CATEGORY_LABELS, CONDITION_LABELS } from "@/lib/mock-data"
import { calculatePrice, getConditionQuestions } from "@/lib/pricing"
import type { DeviceCondition } from "@/lib/types"
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Package } from "lucide-react"

export default function DeviceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const deviceId = params.deviceId as string

  const device = MOCK_DEVICES.find((d) => d.id === deviceId)

  const [selectedCondition, setSelectedCondition] = useState<DeviceCondition | null>(null)
  const [conditionAnswers, setConditionAnswers] = useState<Record<string, boolean>>({})
  const [currentStep, setCurrentStep] = useState<"condition" | "questions" | "quote">("condition")

  const questions = getConditionQuestions(device.category)
  const allQuestionsAnswered = questions.every((q) => q.id in conditionAnswers)

  const priceCalculation = useMemo(() => {
    if (!selectedCondition) return null
    return calculatePrice(device, selectedCondition, conditionAnswers)
  }, [device, selectedCondition, conditionAnswers])

  if (!device) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Gerät nicht gefunden</h2>
          <p className="text-muted-foreground mb-6">Das gesuchte Gerät konnte nicht gefunden werden.</p>
          <Button asChild>
            <Link href="/verkaufen">Zurück zur Auswahl</Link>
          </Button>
        </Card>
      </div>
    )
  }

  const handleConditionSelect = (condition: DeviceCondition) => {
    setSelectedCondition(condition)
    setCurrentStep("questions")
  }

  const handleAnswerChange = (questionId: string, value: boolean) => {
    setConditionAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleGetQuote = () => {
    if (allQuestionsAnswered && priceCalculation) {
      setCurrentStep("quote")
    }
  }

  const handleAcceptQuote = () => {
    // Store quote data in sessionStorage for checkout
    const quoteData = {
      device,
      condition: selectedCondition,
      conditionAnswers,
      quotedPrice: priceCalculation?.finalPrice,
    }
    sessionStorage.setItem("quote", JSON.stringify(quoteData))
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/verkaufen"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Geräteauswahl
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Device Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 p-6">
              <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center p-6 mb-4">
                <img
                  src={device.imageUrl || "/placeholder.svg?height=400&width=400"}
                  alt={`${device.brand} ${device.model}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <Badge variant="secondary" className="mb-3">
                {CATEGORY_LABELS[device.category]}
              </Badge>
              <h1 className="text-2xl font-bold mb-2">
                {device.brand} {device.model}
              </h1>
              {device.variant && <p className="text-muted-foreground mb-4">{device.variant}</p>}

              {device.specifications && Object.keys(device.specifications).length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">Spezifikationen</h3>
                    {Object.entries(device.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground capitalize">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Basispreis:</span>
                  <span className="font-bold text-lg">{device.basePrice}€</span>
                </div>
                <p className="text-xs text-muted-foreground">Abhängig vom Zustand und weiteren Faktoren</p>
              </div>
            </Card>
          </div>

          {/* Right Column - Condition Assessment */}
          <div className="lg:col-span-2">
            {/* Step 1: Condition Selection */}
            {currentStep === "condition" && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-2">Zustand auswählen</h2>
                <p className="text-muted-foreground mb-6">
                  Wählen Sie den allgemeinen Zustand Ihres Geräts. Im nächsten Schritt stellen wir detaillierte Fragen.
                </p>

                <div className="space-y-4">
                  {(Object.keys(CONDITION_LABELS) as DeviceCondition[]).map((condition) => (
                    <Card
                      key={condition}
                      className={`p-6 cursor-pointer transition-all border-2 hover:border-primary ${
                        selectedCondition === condition ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => handleConditionSelect(condition)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{CONDITION_LABELS[condition]}</h3>
                          <p className="text-sm text-muted-foreground">{getConditionDescription(condition)}</p>
                        </div>
                        <div className="ml-4">
                          <RadioGroup value={selectedCondition || ""}>
                            <RadioGroupItem value={condition} id={condition} />
                          </RadioGroup>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* Step 2: Detailed Questions */}
            {currentStep === "questions" && selectedCondition && (
              <Card className="p-8">
                <div className="mb-6">
                  <Badge variant="outline" className="mb-4">
                    Zustand: {CONDITION_LABELS[selectedCondition]}
                  </Badge>
                  <h2 className="text-2xl font-bold mb-2">Detaillierte Fragen</h2>
                  <p className="text-muted-foreground">
                    Beantworten Sie die folgenden Fragen, um ein genaues Angebot zu erhalten.
                  </p>
                </div>

                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-sm font-semibold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <Label className="text-base font-medium leading-relaxed">{question.question}</Label>
                          {question.required && <span className="text-destructive ml-1">*</span>}
                        </div>
                      </div>

                      <div className="ml-11 flex gap-3">
                        <Button
                          variant={conditionAnswers[question.id] === false ? "default" : "outline"}
                          onClick={() => handleAnswerChange(question.id, false)}
                          className="flex-1"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Nein
                        </Button>
                        <Button
                          variant={conditionAnswers[question.id] === true ? "default" : "outline"}
                          onClick={() => handleAnswerChange(question.id, true)}
                          className="flex-1"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Ja
                        </Button>
                      </div>

                      {index < questions.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>

                {/* Price Preview */}
                {priceCalculation && (
                  <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Ihr voraussichtliches Angebot</p>
                        <p className="text-3xl font-bold text-primary">{priceCalculation.finalPrice}€</p>
                      </div>
                      <Package className="h-12 w-12 text-primary/40" />
                    </div>
                  </Card>
                )}

                <div className="flex gap-4 mt-8">
                  <Button variant="outline" onClick={() => setCurrentStep("condition")} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Zurück
                  </Button>
                  <Button onClick={handleGetQuote} disabled={!allQuestionsAnswered} className="flex-1">
                    Angebot erhalten
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 3: Quote Summary */}
            {currentStep === "quote" && priceCalculation && selectedCondition && (
              <Card className="p-8">
                <div className="text-center mb-8">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Ihr Angebot</h2>
                  <p className="text-muted-foreground">Basierend auf Ihren Angaben</p>
                </div>

                <Card className="p-8 bg-primary/5 border-primary/20 mb-8">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Ankaufspreis</p>
                    <p className="text-5xl font-bold text-primary mb-4">{priceCalculation.finalPrice}€</p>
                    <Badge variant="secondary">{CONDITION_LABELS[selectedCondition]}</Badge>
                  </div>
                </Card>

                {/* Price Breakdown */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Preisberechnung</h3>
                  <div className="space-y-3">
                    {priceCalculation.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className={index === priceCalculation.breakdown.length - 1 ? "font-semibold" : ""}>
                          {item.label}
                        </span>
                        <span
                          className={`${index === priceCalculation.breakdown.length - 1 ? "font-bold text-lg" : ""} ${
                            item.value < 0 ? "text-destructive" : ""
                          }`}
                        >
                          {item.value}€
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-8" />

                {/* What's Next */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Nächste Schritte</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">
                        1
                      </div>
                      <p className="text-sm">Geben Sie Ihre Kontakt- und Versanddaten ein</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">
                        2
                      </div>
                      <p className="text-sm">Erhalten Sie ein kostenloses DHL-Versandlabel per E-Mail</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">
                        3
                      </div>
                      <p className="text-sm">Senden Sie Ihr Gerät kostenlos und versichert an uns</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">
                        4
                      </div>
                      <p className="text-sm">Nach Prüfung erhalten Sie die Auszahlung innerhalb von 2-3 Werktagen</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep("questions")} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Antworten ändern
                  </Button>
                  <Button onClick={handleAcceptQuote} size="lg" className="flex-1">
                    Angebot annehmen
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-6">
                  Das Angebot ist unverbindlich und 14 Tage gültig. Der finale Preis wird nach Prüfung des Geräts
                  bestätigt.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function getConditionDescription(condition: DeviceCondition): string {
  const descriptions: Record<DeviceCondition, string> = {
    "wie-neu": "Gerät ist neuwertig, keine sichtbaren Gebrauchsspuren, voll funktionsfähig",
    "sehr-gut": "Gerät hat minimale Gebrauchsspuren, alle Funktionen einwandfrei",
    gut: "Gerät zeigt normale Gebrauchsspuren, funktioniert einwandfrei",
    akzeptabel: "Gerät hat deutliche Gebrauchsspuren, funktioniert aber noch",
    defekt: "Gerät hat Defekte oder funktioniert nicht mehr vollständig",
  }
  return descriptions[condition]
}
