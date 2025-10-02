"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Package, Clock, CheckCircle, XCircle, TrendingUp, Users, Euro, Send } from "lucide-react"
import type { OrderStatus } from "@/lib/types"
import { PaymentStatusBadge } from "@/components/payment-status-badge"

// Mock orders data
const MOCK_ORDERS = [
  {
    id: "ORD-1735574400000",
    deviceName: "iPhone 16 Pro Max 256GB",
    customerName: "Max Mustermann",
    customerEmail: "max@example.com",
    quotedPrice: 850,
    finalPrice: 850,
    status: "in-inspection" as OrderStatus,
    paymentStatus: "pending" as "pending" | "processing" | "completed" | "failed",
    paymentMethod: "paypal" as const,
    createdAt: "2024-12-30T10:00:00Z",
    trackingNumber: "DHL123456789",
  },
  {
    id: "ORD-1735488000000",
    deviceName: "Samsung Galaxy S24 Ultra 256GB",
    customerName: "Anna Schmidt",
    customerEmail: "anna@example.com",
    quotedPrice: 720,
    finalPrice: 680,
    status: "price-adjusted" as OrderStatus,
    paymentStatus: "pending" as "pending" | "processing" | "completed" | "failed",
    paymentMethod: "bank-transfer" as const,
    createdAt: "2024-12-29T10:00:00Z",
    trackingNumber: "DHL987654321",
  },
  {
    id: "ORD-1735401600000",
    deviceName: "iPad Pro 13 M4 256GB",
    customerName: "Thomas Weber",
    customerEmail: "thomas@example.com",
    quotedPrice: 780,
    finalPrice: 780,
    status: "approved" as OrderStatus,
    paymentStatus: "processing" as "pending" | "processing" | "completed" | "failed",
    paymentMethod: "paypal" as const,
    createdAt: "2024-12-28T10:00:00Z",
    trackingNumber: "DHL456789123",
  },
  {
    id: "ORD-1735315200000",
    deviceName: "MacBook Air 15 M3 512GB",
    customerName: "Lisa Müller",
    customerEmail: "lisa@example.com",
    quotedPrice: 980,
    finalPrice: null,
    status: "awaiting-shipment" as OrderStatus,
    paymentStatus: "pending" as "pending" | "processing" | "completed" | "failed",
    paymentMethod: "bank-transfer" as const,
    createdAt: "2024-12-27T10:00:00Z",
    trackingNumber: null,
  },
  {
    id: "ORD-1735228800000",
    deviceName: "Google Pixel 9 Pro 256GB",
    customerName: "Michael Becker",
    customerEmail: "michael@example.com",
    quotedPrice: 620,
    finalPrice: 620,
    status: "payment-sent" as OrderStatus,
    paymentStatus: "completed" as "pending" | "processing" | "completed" | "failed",
    paymentMethod: "paypal" as const,
    createdAt: "2024-12-26T10:00:00Z",
    trackingNumber: "DHL789123456",
  },
]

const STATUS_LABELS: Record<OrderStatus, string> = {
  "quote-created": "Angebot erstellt",
  "awaiting-shipment": "Wartet auf Versand",
  "in-transit": "Unterwegs",
  received: "Empfangen",
  "in-inspection": "In Prüfung",
  approved: "Genehmigt",
  "price-adjusted": "Preis angepasst",
  rejected: "Abgelehnt",
  "payment-sent": "Bezahlt",
  completed: "Abgeschlossen",
  cancelled: "Storniert",
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  "quote-created": "secondary",
  "awaiting-shipment": "secondary",
  "in-transit": "default",
  received: "default",
  "in-inspection": "default",
  approved: "default",
  "price-adjusted": "default",
  rejected: "destructive",
  "payment-sent": "default",
  completed: "default",
  cancelled: "secondary",
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")
  const [selectedOrder, setSelectedOrder] = useState<(typeof MOCK_ORDERS)[0] | null>(null)

  // Filter orders
  const filteredOrders = useMemo(() => {
    let orders = MOCK_ORDERS

    if (statusFilter !== "all") {
      orders = orders.filter((o) => o.status === statusFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      orders = orders.filter(
        (o) =>
          o.id.toLowerCase().includes(query) ||
          o.deviceName.toLowerCase().includes(query) ||
          o.customerName.toLowerCase().includes(query) ||
          o.customerEmail.toLowerCase().includes(query),
      )
    }

    return orders
  }, [searchQuery, statusFilter])

  // Calculate stats
  const stats = useMemo(() => {
    const totalOrders = MOCK_ORDERS.length
    const pendingInspection = MOCK_ORDERS.filter((o) => o.status === "in-inspection").length
    const awaitingShipment = MOCK_ORDERS.filter((o) => o.status === "awaiting-shipment").length
    const totalValue = MOCK_ORDERS.reduce((sum, o) => sum + o.quotedPrice, 0)

    return { totalOrders, pendingInspection, awaitingShipment, totalValue }
  }, [])

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    console.log(`[v0] Updating order ${orderId} to status: ${newStatus}`)
    alert(`Status würde aktualisiert werden zu: ${STATUS_LABELS[newStatus]}`)
  }

  const handlePriceAdjustment = (orderId: string, newPrice: number) => {
    console.log(`[v0] Adjusting price for order ${orderId} to: ${newPrice}`)
    alert(`Preis würde angepasst werden zu: ${newPrice}€`)
  }

  const handleProcessPayment = async (order: (typeof MOCK_ORDERS)[0]) => {
    if (!order.finalPrice) {
      alert("Kein finaler Preis festgelegt")
      return
    }

    const confirmed = confirm(
      `Zahlung von ${order.finalPrice}€ an ${order.customerName} verarbeiten?\n\nMethode: ${
        order.paymentMethod === "paypal" ? "PayPal" : "Banküberweisung"
      }`,
    )

    if (!confirmed) return

    try {
      const response = await fetch("/api/payments/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          amount: order.finalPrice,
          method: order.paymentMethod,
          details:
            order.paymentMethod === "paypal"
              ? { paypalEmail: order.customerEmail }
              : {
                  iban: "DE89370400440532013000",
                  accountHolder: order.customerName,
                },
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert(`Zahlung erfolgreich!\n\nTransaktions-ID: ${result.transactionId}\n\n${result.message}`)
        handleStatusChange(order.id, "payment-sent")
      } else {
        alert(`Fehler bei der Zahlung:\n${result.message}`)
      }
    } catch (error) {
      console.error("[v0] Payment error:", error)
      alert("Fehler bei der Zahlungsverarbeitung")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">Verwalten Sie Bestellungen und Prüfungen</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Gesamt Bestellungen</p>
                <p className="text-3xl font-bold">{stats.totalOrders}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">In Prüfung</p>
                <p className="text-3xl font-bold">{stats.pendingInspection}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Wartet auf Versand</p>
                <p className="text-3xl font-bold">{stats.awaitingShipment}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Gesamtwert</p>
                <p className="text-3xl font-bold">{stats.totalValue}€</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Euro className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Alle Bestellungen</TabsTrigger>
            <TabsTrigger value="inspection">Prüfungs-Queue</TabsTrigger>
            <TabsTrigger value="pricing">Preisanpassungen</TabsTrigger>
            <TabsTrigger value="payments">Zahlungen</TabsTrigger>
          </TabsList>

          {/* All Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Suche nach Bestellnummer, Gerät, Kunde..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | "all")}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Status filtern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Status</SelectItem>
                    <SelectItem value="awaiting-shipment">Wartet auf Versand</SelectItem>
                    <SelectItem value="in-transit">Unterwegs</SelectItem>
                    <SelectItem value="received">Empfangen</SelectItem>
                    <SelectItem value="in-inspection">In Prüfung</SelectItem>
                    <SelectItem value="approved">Genehmigt</SelectItem>
                    <SelectItem value="price-adjusted">Preis angepasst</SelectItem>
                    <SelectItem value="payment-sent">Bezahlt</SelectItem>
                    <SelectItem value="completed">Abgeschlossen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bestellnummer</TableHead>
                      <TableHead>Gerät</TableHead>
                      <TableHead>Kunde</TableHead>
                      <TableHead>Preis</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                          Keine Bestellungen gefunden
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">{order.id}</TableCell>
                          <TableCell className="font-medium">{order.deviceName}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.customerName}</p>
                              <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-semibold">{order.quotedPrice}€</p>
                              {order.finalPrice && order.finalPrice !== order.quotedPrice && (
                                <p className="text-xs text-muted-foreground">Final: {order.finalPrice}€</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={STATUS_COLORS[order.status] as any}>{STATUS_LABELS[order.status]}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString("de-DE")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Inspection Queue Tab */}
          <TabsContent value="inspection" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Geräte in Prüfung</h2>
              <div className="space-y-4">
                {MOCK_ORDERS.filter((o) => o.status === "in-inspection" || o.status === "received").map((order) => (
                  <Card key={order.id} className="p-6 border-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{order.deviceName}</h3>
                        <p className="text-sm text-muted-foreground">Bestellung: {order.id}</p>
                        <p className="text-sm text-muted-foreground">Kunde: {order.customerName}</p>
                      </div>
                      <Badge variant={STATUS_COLORS[order.status] as any}>{STATUS_LABELS[order.status]}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Angebotspreis</p>
                        <p className="text-2xl font-bold">{order.quotedPrice}€</p>
                      </div>
                      {order.trackingNumber && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Tracking</p>
                          <p className="text-sm font-mono">{order.trackingNumber}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleStatusChange(order.id, "approved")}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Genehmigen
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newPrice = prompt("Neuer Preis:", order.quotedPrice.toString())
                          if (newPrice) {
                            handlePriceAdjustment(order.id, Number.parseFloat(newPrice))
                            handleStatusChange(order.id, "price-adjusted")
                          }
                        }}
                        className="flex-1"
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Preis anpassen
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleStatusChange(order.id, "rejected")}
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Ablehnen
                      </Button>
                    </div>
                  </Card>
                ))}

                {MOCK_ORDERS.filter((o) => o.status === "in-inspection" || o.status === "received").length === 0 && (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">Keine Geräte in der Prüfungs-Queue</p>
                  </Card>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Pricing Adjustments Tab */}
          <TabsContent value="pricing" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Preisanpassungen</h2>
              <div className="space-y-4">
                {MOCK_ORDERS.filter((o) => o.status === "price-adjusted").map((order) => (
                  <Card key={order.id} className="p-6 border-2 border-primary/20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{order.deviceName}</h3>
                        <p className="text-sm text-muted-foreground">Bestellung: {order.id}</p>
                        <p className="text-sm text-muted-foreground">Kunde: {order.customerEmail}</p>
                      </div>
                      <Badge variant="default">Preis angepasst</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Original</p>
                        <p className="text-xl font-bold line-through text-muted-foreground">{order.quotedPrice}€</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Angepasst</p>
                        <p className="text-xl font-bold text-primary">{order.finalPrice}€</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Differenz</p>
                        <p className="text-xl font-bold text-destructive">
                          -{order.quotedPrice - (order.finalPrice || 0)}€
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleStatusChange(order.id, "approved")}
                        className="flex-1"
                      >
                        Kunde benachrichtigen
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newPrice = prompt("Preis erneut anpassen:", order.finalPrice?.toString())
                          if (newPrice) {
                            handlePriceAdjustment(order.id, Number.parseFloat(newPrice))
                          }
                        }}
                      >
                        Erneut anpassen
                      </Button>
                    </div>
                  </Card>
                ))}

                {MOCK_ORDERS.filter((o) => o.status === "price-adjusted").length === 0 && (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">Keine Preisanpassungen ausstehend</p>
                  </Card>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Ausstehende Zahlungen</h2>
              <div className="space-y-4">
                {MOCK_ORDERS.filter((o) => o.status === "approved" && o.paymentStatus !== "completed").map((order) => (
                  <Card key={order.id} className="p-6 border-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{order.deviceName}</h3>
                        <p className="text-sm text-muted-foreground">Bestellung: {order.id}</p>
                        <p className="text-sm text-muted-foreground">Kunde: {order.customerName}</p>
                        <p className="text-sm text-muted-foreground">E-Mail: {order.customerEmail}</p>
                      </div>
                      <div className="text-right">
                        <PaymentStatusBadge status={order.paymentStatus} className="mb-2" />
                        <Badge variant="secondary">
                          {order.paymentMethod === "paypal" ? "PayPal" : "Banküberweisung"}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Auszahlungsbetrag</p>
                        <p className="text-2xl font-bold text-primary">{order.finalPrice || order.quotedPrice}€</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Zahlungsmethode</p>
                        <p className="text-sm font-medium">
                          {order.paymentMethod === "paypal" ? "PayPal" : "SEPA-Überweisung"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.paymentMethod === "paypal" ? "1-2 Werktage" : "2-3 Werktage"}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleProcessPayment(order)}
                      className="w-full"
                      disabled={order.paymentStatus === "processing"}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {order.paymentStatus === "processing" ? "Wird verarbeitet..." : "Zahlung verarbeiten"}
                    </Button>
                  </Card>
                ))}

                {MOCK_ORDERS.filter((o) => o.status === "approved" && o.paymentStatus !== "completed").length === 0 && (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">Keine ausstehenden Zahlungen</p>
                  </Card>
                )}
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">Abgeschlossene Zahlungen</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bestellung</TableHead>
                        <TableHead>Kunde</TableHead>
                        <TableHead>Betrag</TableHead>
                        <TableHead>Methode</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Datum</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {MOCK_ORDERS.filter((o) => o.paymentStatus === "completed").map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">{order.id}</TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell className="font-semibold">{order.finalPrice || order.quotedPrice}€</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{order.paymentMethod === "paypal" ? "PayPal" : "Bank"}</Badge>
                          </TableCell>
                          <TableCell>
                            <PaymentStatusBadge status={order.paymentStatus} />
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString("de-DE")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Order Detail Modal (simplified) */}
        {selectedOrder && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <Card className="max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Bestelldetails</h2>
                  <p className="text-sm text-muted-foreground font-mono">{selectedOrder.id}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                  Schließen
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Gerät</h3>
                  <p>{selectedOrder.deviceName}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Kunde</h3>
                  <p>{selectedOrder.customerName}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customerEmail}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Angebotspreis</h3>
                    <p className="text-2xl font-bold">{selectedOrder.quotedPrice}€</p>
                  </div>
                  {selectedOrder.finalPrice && (
                    <div>
                      <h3 className="font-semibold mb-2">Finaler Preis</h3>
                      <p className="text-2xl font-bold text-primary">{selectedOrder.finalPrice}€</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Status</h3>
                  <Badge variant={STATUS_COLORS[selectedOrder.status] as any}>
                    {STATUS_LABELS[selectedOrder.status]}
                  </Badge>
                </div>

                {selectedOrder.trackingNumber && (
                  <div>
                    <h3 className="font-semibold mb-2">Tracking-Nummer</h3>
                    <p className="font-mono text-sm">{selectedOrder.trackingNumber}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Erstellt am</h3>
                  <p>{new Date(selectedOrder.createdAt).toLocaleString("de-DE")}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
