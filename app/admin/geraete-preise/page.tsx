"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Edit2,
  Save,
  X,
  History,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Camera,
  Gamepad,
  Headphones,
  MoreHorizontal,
} from "lucide-react"
import { getAllDevices, updateDevicePrice, getPriceHistory } from "../actions"
import type { DeviceCategory } from "@/lib/types"

const CATEGORY_ICONS = {
  smartphone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  smartwatch: Watch,
  camera: Camera,
  console: Gamepad,
  headphones: Headphones,
  other: MoreHorizontal,
} as const

const BRAND_LOGOS: Record<string, string> = {
  Apple: "/apple-logo-black.jpg",
  Samsung: "/samsung-logo.png",
  Xiaomi: "/xiaomi-logo.png",
  Google: "/google-logo.png",
  OnePlus: "/oneplus-logo.jpg",
  Huawei: "/huawei-logo.png",
  Sony: "/sony-logo-black.jpg",
  Oppo: "/oppo-logo.jpg",
  Realme: "/realme-logo.jpg",
  Honor: "/honor-logo.jpg",
  Nokia: "/nokia-logo.jpg",
  Motorola: "/motorola-logo.jpg",
  Asus: "/asus-logo.jpg",
  Nothing: "/nothing-logo.jpg",
  Vivo: "/vivo-logo.jpg",
  LG: "/lg-logo.jpg",
  Dell: "/dell-logo.jpg",
  HP: "/hp-logo.jpg",
  Lenovo: "/lenovo-logo.jpg",
  Acer: "/acer-logo.jpg",
  MSI: "/msi-logo.jpg",
  Microsoft: "/microsoft-logo.jpg",
  Garmin: "/garmin-logo.jpg",
}

interface Device {
  id: string
  brand: string
  model: string
  variant: string | null
  category: DeviceCategory
  base_price: number
  release_year: number
  image_url: string | null
}

interface PriceHistory {
  id: string
  device_id: string
  old_price: number
  new_price: number
  reason: string
  changed_by: string
  created_at: string
}

const CATEGORY_LABELS: Record<DeviceCategory, string> = {
  smartphone: "Smartphone",
  tablet: "Tablet",
  laptop: "Laptop",
  smartwatch: "Smartwatch",
  camera: "Kamera",
  console: "Konsole",
  headphones: "Kopfhörer",
  other: "Sonstiges",
}

export default function GeraetePreisePage() {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategory | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editPrice, setEditPrice] = useState("")
  const [editReason, setEditReason] = useState("")
  const [saving, setSaving] = useState(false)
  const [selectedDeviceHistory, setSelectedDeviceHistory] = useState<{
    device: Device
    history: PriceHistory[]
  } | null>(null)

  useEffect(() => {
    loadDevices()
  }, [])

  const loadDevices = async () => {
    setLoading(true)
    const result = await getAllDevices()
    if (result.success && result.devices) {
      setDevices(result.devices)
    }
    setLoading(false)
  }

  const view = !selectedCategory ? "categories" : !selectedBrand ? "brands" : "products"

  const categories = useMemo(() => {
    const categoryMap = new Map<DeviceCategory, number>()
    devices.forEach((device) => {
      categoryMap.set(device.category, (categoryMap.get(device.category) || 0) + 1)
    })
    return Array.from(categoryMap.entries()).map(([category, count]) => ({ category, count }))
  }, [devices])

  const brandsInCategory = useMemo(() => {
    if (!selectedCategory) return []
    const brandMap = new Map<string, number>()
    devices
      .filter((d) => d.category === selectedCategory)
      .forEach((device) => {
        brandMap.set(device.brand, (brandMap.get(device.brand) || 0) + 1)
      })
    return Array.from(brandMap.entries())
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => a.brand.localeCompare(b.brand))
  }, [devices, selectedCategory])

  const filteredDevices = useMemo(() => {
    let filtered = devices

    if (selectedCategory) {
      filtered = filtered.filter((d) => d.category === selectedCategory)
    }

    if (selectedBrand) {
      filtered = filtered.filter((d) => d.brand === selectedBrand)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (d) =>
          d.brand.toLowerCase().includes(query) ||
          d.model.toLowerCase().includes(query) ||
          (d.variant && d.variant.toLowerCase().includes(query)),
      )
    }

    return filtered
  }, [devices, selectedCategory, selectedBrand, searchQuery])

  const handleEdit = (device: Device) => {
    setEditingId(device.id)
    setEditPrice(device.base_price.toString())
    setEditReason("")
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditPrice("")
    setEditReason("")
  }

  const handleSave = async (deviceId: string) => {
    const newPrice = Number.parseFloat(editPrice)

    if (isNaN(newPrice) || newPrice < 0) {
      alert("Bitte geben Sie einen gültigen Preis ein")
      return
    }

    if (!editReason.trim()) {
      alert("Bitte geben Sie einen Grund für die Preisänderung an")
      return
    }

    setSaving(true)
    const result = await updateDevicePrice(deviceId, newPrice, editReason)

    if (result.success) {
      setDevices((prev) => prev.map((d) => (d.id === deviceId ? { ...d, base_price: newPrice } : d)))
      handleCancel()
    } else {
      alert(`Fehler beim Speichern: ${result.error}`)
    }

    setSaving(false)
  }

  const handleShowHistory = async (device: Device) => {
    const result = await getPriceHistory(device.id)
    if (result.success && result.history) {
      setSelectedDeviceHistory({ device, history: result.history })
    }
  }

  const handleBack = () => {
    if (selectedBrand) {
      setSelectedBrand(null)
      setSearchQuery("")
    } else if (selectedCategory) {
      setSelectedCategory(null)
      setSearchQuery("")
    }
  }

  const stats = useMemo(() => {
    const totalDevices = devices.length
    const avgPrice = devices.length > 0 ? devices.reduce((sum, d) => sum + d.base_price, 0) / devices.length : 0
    const highestPrice = devices.length > 0 ? Math.max(...devices.map((d) => d.base_price)) : 0
    const lowestPrice = devices.length > 0 ? Math.min(...devices.map((d) => d.base_price)) : 0

    return { totalDevices, avgPrice, highestPrice, lowestPrice }
  }, [devices])

  if (view === "categories") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Gerätepreise verwalten</h1>
            <p className="text-lg text-muted-foreground">Wählen Sie eine Kategorie aus</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Gesamt Geräte</p>
              <p className="text-3xl font-bold">{stats.totalDevices}</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Durchschnittspreis</p>
              <p className="text-3xl font-bold">{stats.avgPrice.toFixed(0)}€</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Höchster Preis</p>
              <p className="text-3xl font-bold text-primary">{stats.highestPrice}€</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Niedrigster Preis</p>
              <p className="text-3xl font-bold text-muted-foreground">{stats.lowestPrice}€</p>
            </Card>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Lade Geräte...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
              {categories.map(({ category, count }) => {
                const Icon = CATEGORY_ICONS[category]
                return (
                  <Card
                    key={category}
                    className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary h-full"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{CATEGORY_LABELS[category]}</h3>
                        <p className="text-sm text-muted-foreground">
                          {count} {count === 1 ? "Gerät" : "Geräte"}
                        </p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (view === "brands") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zu Kategorien
            </button>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Marke auswählen</h1>
            <p className="text-lg text-muted-foreground">
              Wählen Sie die Marke in {CATEGORY_LABELS[selectedCategory!]}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Marke suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl">
            {brandsInCategory
              .filter(({ brand }) => !searchQuery || brand.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(({ brand, count }) => (
                <Card
                  key={brand}
                  className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary h-full"
                  onClick={() => setSelectedBrand(brand)}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    {BRAND_LOGOS[brand] ? (
                      <>
                        <div className="w-20 h-20 flex items-center justify-center">
                          <img
                            src={BRAND_LOGOS[brand] || "/placeholder.svg"}
                            alt={`${brand} logo`}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="text-lg font-semibold">{brand}</div>
                      </>
                    ) : (
                      <div className="text-2xl font-bold">{brand}</div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {count} {count === 1 ? "Modell" : "Modelle"}
                    </p>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zu Marken
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {selectedBrand} {CATEGORY_LABELS[selectedCategory!]}
          </h1>
          <p className="text-lg text-muted-foreground">Preise bearbeiten und Verlauf anzeigen</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Modell suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredDevices.length} {filteredDevices.length === 1 ? "Gerät gefunden" : "Geräte gefunden"}
          </p>
        </div>

        {/* Device Grid */}
        {filteredDevices.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Keine Geräte gefunden. Versuchen Sie eine andere Suche.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDevices.map((device) => (
              <Card
                key={device.id}
                className="overflow-hidden hover:shadow-lg transition-shadow border-2 hover:border-primary h-full"
              >
                <div className="aspect-square bg-muted/30 flex items-center justify-center p-6">
                  <img
                    src={device.image_url || "/placeholder.svg?height=300&width=300"}
                    alt={`${device.brand} ${device.model}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <Badge variant="secondary" className="mb-2">
                    {CATEGORY_LABELS[device.category]}
                  </Badge>
                  <h3 className="font-semibold mb-1">{device.model}</h3>
                  {device.variant && <p className="text-sm text-muted-foreground mb-3">{device.variant}</p>}

                  {editingId === device.id ? (
                    <div className="space-y-3 mt-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Neuer Preis</label>
                        <Input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-full"
                          placeholder="Neuer Preis"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Grund für Änderung</label>
                        <Input
                          type="text"
                          value={editReason}
                          onChange={(e) => setEditReason(e.target.value)}
                          className="w-full"
                          placeholder="z.B. Marktanpassung"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleSave(device.id)}
                          disabled={saving}
                          className="flex-1"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Speichern
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancel} disabled={saving}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-primary mb-4">{device.base_price}€</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(device)} className="flex-1">
                          <Edit2 className="h-4 w-4 mr-1" />
                          Bearbeiten
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleShowHistory(device)}>
                          <History className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Price History Modal */}
      {selectedDeviceHistory && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDeviceHistory(null)}
        >
          <Card className="max-w-3xl w-full p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Preisverlauf</h2>
                <p className="text-muted-foreground">
                  {selectedDeviceHistory.device.brand} {selectedDeviceHistory.device.model}{" "}
                  {selectedDeviceHistory.device.variant}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedDeviceHistory(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {selectedDeviceHistory.history.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Keine Preisänderungen vorhanden</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDeviceHistory.history.map((entry) => {
                  const priceDiff = entry.new_price - entry.old_price
                  const isIncrease = priceDiff > 0

                  return (
                    <Card key={entry.id} className="p-4 border-2">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {isIncrease ? (
                            <TrendingUp className="h-5 w-5 text-green-600" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-red-600" />
                          )}
                          <div>
                            <p className="font-semibold">
                              {entry.old_price}€ → {entry.new_price}€
                            </p>
                            <p className={`text-sm ${isIncrease ? "text-green-600" : "text-red-600"}`}>
                              {isIncrease ? "+" : ""}
                              {priceDiff.toFixed(2)}€ ({((priceDiff / entry.old_price) * 100).toFixed(1)}%)
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {new Date(entry.created_at).toLocaleDateString("de-DE")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(entry.created_at).toLocaleTimeString("de-DE")}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Grund:</span> {entry.reason}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Geändert von: {entry.changed_by}</p>
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
