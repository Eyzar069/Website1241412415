"use client"

import { useState, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MOCK_DEVICES, CATEGORY_LABELS } from "@/lib/mock-data"
import type { DeviceCategory } from "@/lib/types"
import {
  Search,
  ArrowLeft,
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Camera,
  Gamepad,
  Headphones,
  HelpCircle,
} from "lucide-react"
import { CustomDeviceUpload } from "@/components/custom-device-upload"

const CATEGORY_ICONS = {
  smartphone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  smartwatch: Watch,
  camera: Camera,
  console: Gamepad,
  headphones: Headphones,
  other: HelpCircle,
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
  Fitbit: "/fitbit-logo.jpg",
  Amazfit: "/amazfit-logo.jpg",
  Fossil: "/fossil-logo.jpg",
  TicWatch: "/ticwatch-logo.jpg",
  Canon: "/canon-logo.jpg",
  Nikon: "/nikon-logo.jpg",
  Nintendo: "/nintendo-logo.jpg",
  Amazon: "/amazon-logo.jpg",
  TCL: "/tcl-logo.jpg",
  Alcatel: "/alcatel-logo.jpg",
  Razer: "/razer-logo.jpg",
  Wiko: "/wiko-logo.jpg",
  Blackberry: "/blackberry-logo.jpg",
  HTC: "/htc-logo.jpg",
  ZTE: "/zte-logo.jpg",
  Fairphone: "/fairphone-logo.jpg",
  Doogee: "/doogee-logo.jpg",
  CAT: "/cat-logo.jpg",
  Tecno: "/tecno-logo.jpg",
}

const BRAND_POPULARITY: Record<DeviceCategory, string[]> = {
  smartphone: [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Google",
    "OnePlus",
    "Huawei",
    "Sony",
    "Oppo",
    "Realme",
    "Honor",
    "Nokia",
    "Motorola",
    "Asus",
    "Nothing",
    "vivo",
    "LG",
    "HTC",
    "BlackBerry",
    "Wiko",
    "ZTE",
    "Fairphone",
    "Doogee",
    "CAT",
    "Tecno",
  ],
  tablet: [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Huawei",
    "Lenovo",
    "Microsoft",
    "Google",
    "Amazon",
    "OnePlus",
    "Realme",
    "Nokia",
    "Asus",
    "Honor",
    "TCL",
    "Alcatel",
    "Oppo",
  ],
  laptop: [
    "Apple",
    "Dell",
    "HP",
    "Lenovo",
    "Asus",
    "Acer",
    "Microsoft",
    "MSI",
    "Samsung",
    "Razer",
    "LG",
    "Huawei",
    "Xiaomi",
    "Honor",
  ],
  smartwatch: [
    "Apple",
    "Samsung",
    "Garmin",
    "Fitbit",
    "Google",
    "Huawei",
    "Xiaomi",
    "Amazfit",
    "OnePlus",
    "Fossil",
    "TicWatch",
    "Oppo",
    "Realme",
    "Honor",
    "Vivo",
  ],
  camera: ["Canon", "Nikon", "Sony", "Fujifilm", "Panasonic", "Olympus"],
  console: ["Sony", "Microsoft", "Nintendo"],
  headphones: ["Sony", "Bose", "Apple", "Sennheiser"],
  other: [],
}

export default function VerkaufenPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get("category") as DeviceCategory | null
  const brandParam = searchParams.get("brand")
  const seriesParam = searchParams.get("series")

  const [searchQuery, setSearchQuery] = useState("")

  const categories = Object.keys(CATEGORY_LABELS) as DeviceCategory[]

  const brandsInCategory = useMemo(() => {
    if (!categoryParam) return []
    const brands = new Set(MOCK_DEVICES.filter((d) => d.category === categoryParam).map((d) => d.brand))
    const brandArray = Array.from(brands)

    const popularityOrder = BRAND_POPULARITY[categoryParam] || []
    return brandArray.sort((a, b) => {
      const indexA = popularityOrder.indexOf(a)
      const indexB = popularityOrder.indexOf(b)

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB
      }
      if (indexA !== -1) return -1
      if (indexB !== -1) return 1
      return a.localeCompare(b)
    })
  }, [categoryParam])

  const seriesInBrand = useMemo(() => {
    if (!categoryParam || !brandParam) return []
    const series = new Set(
      MOCK_DEVICES.filter((d) => d.category === categoryParam && d.brand === brandParam && d.series)
        .map((d) => d.series!)
        .filter(Boolean),
    )

    const seriesArray = Array.from(series)

    // Sort by extracting numbers and sorting descending (newest first)
    return seriesArray.sort((a, b) => {
      // Extract numbers from series names
      const extractNumber = (seriesName: string): number => {
        const match = seriesName.match(/(\d+)/)
        return match ? Number.parseInt(match[1], 10) : 0
      }

      const numA = extractNumber(a)
      const numB = extractNumber(b)

      // If both have numbers, sort by number descending (higher = newer)
      if (numA > 0 && numB > 0) {
        return numB - numA
      }

      // Items with numbers come before items without numbers
      if (numA > 0) return -1
      if (numB > 0) return 1

      // If neither has numbers, sort alphabetically
      return a.localeCompare(b)
    })
  }, [categoryParam, brandParam])

  const filteredDevices = useMemo(() => {
    let devices = MOCK_DEVICES

    if (categoryParam) {
      devices = devices.filter((d) => d.category === categoryParam)
    }

    if (brandParam) {
      devices = devices.filter((d) => d.brand === brandParam)
    }

    if (seriesParam) {
      devices = devices.filter((d) => d.series === seriesParam)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      devices = devices.filter(
        (d) =>
          d.brand.toLowerCase().includes(query) ||
          d.model.toLowerCase().includes(query) ||
          d.variant?.toLowerCase().includes(query) ||
          d.series?.toLowerCase().includes(query),
      )
    }

    devices = devices.sort((a, b) => {
      // Extract numbers from model names
      const extractNumber = (model: string): number => {
        // Match patterns like "iPhone 17", "Galaxy S24", "Pixel 9", etc.
        const match = model.match(/(\d+)/)
        return match ? Number.parseInt(match[1], 10) : 0
      }

      const numA = extractNumber(a.model)
      const numB = extractNumber(b.model)

      // Sort by number descending (higher = newer)
      if (numA !== numB) {
        return numB - numA
      }

      // If numbers are the same or both 0, sort alphabetically
      return a.model.localeCompare(b.model)
    })

    return devices
  }, [categoryParam, brandParam, seriesParam, searchQuery])

  const handleBack = () => {
    if (seriesParam) {
      router.push(`/verkaufen?category=${categoryParam}&brand=${brandParam}`)
    } else if (brandParam) {
      router.push(`/verkaufen?category=${categoryParam}`)
    } else if (categoryParam) {
      router.push("/verkaufen")
    } else {
      router.push("/")
    }
  }

  const view = !categoryParam ? "categories" : !brandParam ? "brands" : !seriesParam ? "series" : "products"

  if (categoryParam === "other") {
    return <CustomDeviceUpload onBack={() => router.push("/verkaufen")} />
  }

  if (view === "categories") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Startseite
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Kategorie auswählen</h1>
            <p className="text-lg text-muted-foreground">Wählen Sie zunächst die Kategorie Ihres Geräts</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category]
              const deviceCount = MOCK_DEVICES.filter((d) => d.category === category).length
              return (
                <Link key={category} href={`/verkaufen?category=${category}`}>
                  <Card className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{CATEGORY_LABELS[category]}</h3>
                        {category !== "other" && (
                          <p className="text-sm text-muted-foreground">
                            {deviceCount} {deviceCount === 1 ? "Gerät" : "Geräte"}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
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
              Wählen Sie die Marke Ihres {CATEGORY_LABELS[categoryParam!]}
            </p>
          </div>

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
              .filter((brand) => !searchQuery || brand.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((brand) => {
                const deviceCount = MOCK_DEVICES.filter((d) => d.category === categoryParam && d.brand === brand).length
                return (
                  <Link key={brand} href={`/verkaufen?category=${categoryParam}&brand=${brand}`}>
                    <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary h-full">
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
                          {deviceCount} {deviceCount === 1 ? "Modell" : "Modelle"}
                        </p>
                      </div>
                    </Card>
                  </Link>
                )
              })}
          </div>
        </div>
      </div>
    )
  }

  if (view === "series") {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Serie auswählen</h1>
            <p className="text-lg text-muted-foreground">
              Wählen Sie die Serie Ihres {brandParam} {CATEGORY_LABELS[categoryParam!]}
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Serie suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl">
            {seriesInBrand
              .filter((series) => !searchQuery || series.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((series) => {
                const deviceCount = MOCK_DEVICES.filter(
                  (d) => d.category === categoryParam && d.brand === brandParam && d.series === series,
                ).length
                return (
                  <Link
                    key={series}
                    href={`/verkaufen?category=${categoryParam}&brand=${brandParam}&series=${encodeURIComponent(series)}`}
                  >
                    <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary h-full">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="text-lg font-semibold">{series}</div>
                        <p className="text-sm text-muted-foreground">
                          {deviceCount} {deviceCount === 1 ? "Modell" : "Modelle"}
                        </p>
                      </div>
                    </Card>
                  </Link>
                )
              })}
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
            Zurück zu Serien
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {brandParam} {seriesParam}
          </h1>
          <p className="text-lg text-muted-foreground">
            Wählen Sie Ihr Modell aus und erhalten Sie ein sofortiges Angebot
          </p>
        </div>

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

        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredDevices.length} {filteredDevices.length === 1 ? "Gerät gefunden" : "Geräte gefunden"}
          </p>
        </div>

        {filteredDevices.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Keine Geräte gefunden. Versuchen Sie eine andere Suche.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDevices.map((device) => (
              <Link key={device.id} href={`/verkaufen/${device.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary h-full">
                  <div className="aspect-square bg-muted/30 flex items-center justify-center p-6">
                    <img
                      src={device.imageUrl || "/placeholder.svg?height=300&width=300"}
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
                    <p className="text-lg font-bold text-primary">bis zu {device.basePrice}€</p>
                    <p className="text-xs text-muted-foreground mt-1">Abhängig vom Zustand</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
