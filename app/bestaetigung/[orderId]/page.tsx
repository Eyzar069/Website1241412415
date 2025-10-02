"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Download, Mail, Package, Printer } from "lucide-react"

export default function ConfirmationPage() {
  const params = useParams()
  const orderId = params.orderId as string
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    // Load order data from sessionStorage
    const storedOrder = sessionStorage.getItem("order")
    if (storedOrder) {
      const order = JSON.parse(storedOrder)
      if (order.id === orderId) {
        setOrderData(order)
      }
    }
  }, [orderId])

  const handleDownloadLabel = () => {
    // Simulate shipping label download
    alert("Versandlabel wird heruntergeladen... (Demo-Funktion)")
  }

  const handlePrintLabel = () => {
    // Simulate printing
    window.print()
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Bestellung wird geladen...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <Card className="p-8 text-center mb-8 bg-primary/5 border-primary/20">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Bestellung erfolgreich!</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Vielen Dank für Ihre Bestellung. Wir haben Ihre Anfrage erhalten.
            </p>
            <Badge variant="secondary" className="text-base px-4 py-1">
              Bestellnummer: {orderId}
            </Badge>
          </Card>

          {/* Order Details */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Bestelldetails</h2>

            <div className="flex gap-4 mb-6">
              <div className="h-24 w-24 rounded-lg bg-muted/30 flex items-center justify-center flex-shrink-0">
                <img
                  src={orderData.device.imageUrl || "/placeholder.svg"}
                  alt={orderData.device.model}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg">
                  {orderData.device.brand} {orderData.device.model}
                </p>
                {orderData.device.variant && <p className="text-muted-foreground">{orderData.device.variant}</p>}
                <Badge variant="secondary" className="mt-2">
                  {orderData.condition}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Ankaufspreis</p>
                <p className="text-2xl font-bold text-primary">{orderData.quotedPrice}€</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Kontaktdaten</h3>
                <div className="text-sm space-y-1">
                  <p>
                    {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
                  </p>
                  <p className="text-muted-foreground">{orderData.customerInfo.email}</p>
                  <p className="text-muted-foreground">{orderData.customerInfo.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Versandadresse</h3>
                <div className="text-sm space-y-1">
                  <p>
                    {orderData.customerInfo.address.street} {orderData.customerInfo.address.houseNumber}
                  </p>
                  <p>
                    {orderData.customerInfo.address.postalCode} {orderData.customerInfo.address.city}
                  </p>
                  <p className="text-muted-foreground">{orderData.customerInfo.address.country}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Shipping Label */}
          <Card className="p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">Versandlabel</h2>
                <p className="text-muted-foreground mb-4">
                  Ihr kostenloses DHL-Versandlabel wurde per E-Mail an{" "}
                  <span className="font-medium text-foreground">{orderData.customerInfo.email}</span> gesendet.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleDownloadLabel} variant="default">
                    <Download className="h-4 w-4 mr-2" />
                    Label herunterladen
                  </Button>
                  <Button onClick={handlePrintLabel} variant="outline">
                    <Printer className="h-4 w-4 mr-2" />
                    Label drucken
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Nächste Schritte</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium mb-1">Gerät vorbereiten</p>
                  <p className="text-sm text-muted-foreground">
                    Setzen Sie Ihr Gerät auf Werkseinstellungen zurück und entfernen Sie alle persönlichen Daten.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium mb-1">Gerät verpacken</p>
                  <p className="text-sm text-muted-foreground">
                    Verpacken Sie Ihr Gerät sicher. Fügen Sie nach Möglichkeit Originalverpackung und Zubehör hinzu.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium mb-1">Versandlabel anbringen</p>
                  <p className="text-sm text-muted-foreground">
                    Drucken Sie das Versandlabel aus und bringen Sie es gut sichtbar auf dem Paket an.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium mb-1">Paket versenden</p>
                  <p className="text-sm text-muted-foreground">
                    Geben Sie das Paket bei einer DHL-Filiale oder einem Paketshop ab. Sie erhalten eine
                    Sendungsverfolgungsnummer.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  5
                </div>
                <div>
                  <p className="font-medium mb-1">Auszahlung erhalten</p>
                  <p className="text-sm text-muted-foreground">
                    Nach Prüfung Ihres Geräts (1-2 Werktage) erfolgt die Auszahlung per{" "}
                    {orderData.paymentMethod === "paypal" ? "PayPal" : "Banküberweisung"}.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Email Confirmation */}
          <Card className="p-6 bg-muted/30">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">
                  Eine Bestätigungs-E-Mail mit allen Details wurde an{" "}
                  <span className="font-medium">{orderData.customerInfo.email}</span> gesendet.
                </p>
              </div>
            </div>
          </Card>

          <div className="flex gap-4 mt-8">
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <Link href="/">Zur Startseite</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/verkaufen">Weiteres Gerät verkaufen</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
