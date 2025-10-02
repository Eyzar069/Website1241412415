"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit2, Trash2, Search, ArrowLeft, ImageIcon, Smartphone, Tag, Package, DollarSign } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type Category = {
  id: string
  name: string
  label: string
  icon: string
  display_order: number
}

type Brand = {
  id: string
  name: string
  logo_url: string | null
  display_order: number
}

type Device = {
  id: string
  brand: string
  model: string
  variant: string | null
  category: string
  base_price: number
  release_year: number | null
  image_url: string | null
}

export default function ProdukteVerwaltungPage() {
  const [activeTab, setActiveTab] = useState("categories")
  const [searchQuery, setSearchQuery] = useState("")

  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)

  // Dialog states
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [isBrandDialogOpen, setIsBrandDialogOpen] = useState(false)
  const [isDeviceDialogOpen, setIsDeviceDialogOpen] = useState(false)
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false)

  // Editing states
  const [editingItem, setEditingItem] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      console.log("[v0] Fetching product data from database...")
      const supabase = createClient()

      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("categories")
          .select("*")
          .order("display_order", { ascending: true })

        if (categoriesError) {
          console.error("[v0] Error fetching categories:", categoriesError)
        } else {
          console.log("[v0] Fetched categories:", categoriesData?.length)
          setCategories(categoriesData || [])
        }

        // Fetch brands
        const { data: brandsData, error: brandsError } = await supabase
          .from("brands")
          .select("*")
          .order("display_order", { ascending: true })

        if (brandsError) {
          console.error("[v0] Error fetching brands:", brandsError)
        } else {
          console.log("[v0] Fetched brands:", brandsData?.length)
          setBrands(brandsData || [])
        }

        // Fetch devices
        const { data: devicesData, error: devicesError } = await supabase
          .from("devices")
          .select("*")
          .order("brand", { ascending: true })

        if (devicesError) {
          console.error("[v0] Error fetching devices:", devicesError)
        } else {
          console.log("[v0] Fetched devices:", devicesData?.length)
          setDevices(devicesData || [])
        }
      } catch (error) {
        console.error("[v0] Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const mockPricingRules = [
    { id: "1", name: "Zustand: Wie Neu", type: "condition", multiplier: 1.0, description: "Perfekter Zustand" },
    {
      id: "2",
      name: "Zustand: Sehr Gut",
      type: "condition",
      multiplier: 0.85,
      description: "Minimale Gebrauchsspuren",
    },
    { id: "3", name: "Speicher: 128GB", type: "storage", adjustment: 0, description: "Basis Speicher" },
    { id: "4", name: "Speicher: 256GB", type: "storage", adjustment: 100, description: "+100€" },
  ]

  const handleOpenDialog = (type: string, item: any = null) => {
    setEditingItem(item)
    switch (type) {
      case "category":
        setIsCategoryDialogOpen(true)
        break
      case "brand":
        setIsBrandDialogOpen(true)
        break
      case "device":
        setIsDeviceDialogOpen(true)
        break
      case "pricing":
        setIsPricingDialogOpen(true)
        break
    }
  }

  const handleCloseDialogs = () => {
    setIsCategoryDialogOpen(false)
    setIsBrandDialogOpen(false)
    setIsDeviceDialogOpen(false)
    setIsPricingDialogOpen(false)
    setEditingItem(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Lade Produktdaten...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Dashboard
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">Produktverwaltung</h1>
              <p className="text-lg text-muted-foreground">
                Verwalten Sie Kategorien, Marken, Geräte und Preisregeln an einem Ort
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="categories" className="gap-2">
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Kategorien</span>
            </TabsTrigger>
            <TabsTrigger value="brands" className="gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Marken</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="gap-2">
              <Smartphone className="h-4 w-4" />
              <span className="hidden sm:inline">Geräte</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Preisregeln</span>
            </TabsTrigger>
          </TabsList>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-1">Kategorien</h2>
                  <p className="text-sm text-muted-foreground">{categories.length} Kategorien verfügbar</p>
                </div>
                <Button onClick={() => handleOpenDialog("category")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Neue Kategorie
                </Button>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Kategorien durchsuchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Reihenfolge</TableHead>
                      <TableHead>Name (ID)</TableHead>
                      <TableHead>Anzeigename</TableHead>
                      <TableHead>Icon</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          Keine Kategorien gefunden
                        </TableCell>
                      </TableRow>
                    ) : (
                      categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.display_order}</TableCell>
                          <TableCell className="font-mono text-sm">{category.name}</TableCell>
                          <TableCell className="font-semibold">{category.label}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{category.icon}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="sm" onClick={() => handleOpenDialog("category", category)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Brands Tab */}
          <TabsContent value="brands" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-1">Marken</h2>
                  <p className="text-sm text-muted-foreground">{brands.length} Marken verfügbar</p>
                </div>
                <Button onClick={() => handleOpenDialog("brand")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Neue Marke
                </Button>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Marken durchsuchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Logo</TableHead>
                      <TableHead className="w-20">Reihenfolge</TableHead>
                      <TableHead>Markenname</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brands.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          Keine Marken gefunden. Bitte führen Sie das SQL-Script aus.
                        </TableCell>
                      </TableRow>
                    ) : (
                      brands.map((brand) => (
                        <TableRow key={brand.id}>
                          <TableCell>
                            {brand.logo_url ? (
                              <img
                                src={brand.logo_url || "/placeholder.svg"}
                                alt={brand.name}
                                className="w-16 h-16 object-contain"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{brand.display_order}</TableCell>
                          <TableCell className="font-semibold text-lg">{brand.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="sm" onClick={() => handleOpenDialog("brand", brand)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-1">Geräte</h2>
                  <p className="text-sm text-muted-foreground">{devices.length} Geräte verfügbar</p>
                </div>
                <Button onClick={() => handleOpenDialog("device")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Neues Gerät
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Geräte durchsuchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategorie filtern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Kategorien</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Marke filtern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Marken</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.name}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Bild</TableHead>
                      <TableHead>Marke</TableHead>
                      <TableHead>Modell</TableHead>
                      <TableHead>Variante</TableHead>
                      <TableHead>Kategorie</TableHead>
                      <TableHead>Basispreis</TableHead>
                      <TableHead>Jahr</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {devices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                          Keine Geräte gefunden
                        </TableCell>
                      </TableRow>
                    ) : (
                      devices.map((device) => (
                        <TableRow key={device.id}>
                          <TableCell>
                            {device.image_url ? (
                              <img
                                src={device.image_url || "/placeholder.svg"}
                                alt={device.model}
                                className="w-16 h-16 object-contain"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{device.brand}</TableCell>
                          <TableCell className="font-semibold">{device.model}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{device.variant || "-"}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{device.category}</Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-primary">{device.base_price}€</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{device.release_year || "-"}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="sm" onClick={() => handleOpenDialog("device", device)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Pricing Rules Tab */}
          <TabsContent value="pricing" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-1">Preisregeln</h2>
                  <p className="text-sm text-muted-foreground">{mockPricingRules.length} Regeln definiert</p>
                </div>
                <Button onClick={() => handleOpenDialog("pricing")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Neue Regel
                </Button>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Regeln durchsuchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Regelname</TableHead>
                      <TableHead>Typ</TableHead>
                      <TableHead>Multiplikator</TableHead>
                      <TableHead>Anpassung</TableHead>
                      <TableHead>Beschreibung</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPricingRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-semibold">{rule.name}</TableCell>
                        <TableCell>
                          <Badge variant={rule.type === "condition" ? "default" : "secondary"}>{rule.type}</Badge>
                        </TableCell>
                        <TableCell className="font-mono">{rule.multiplier ? `×${rule.multiplier}` : "-"}</TableCell>
                        <TableCell className="font-mono">
                          {rule.adjustment ? `${rule.adjustment > 0 ? "+" : ""}${rule.adjustment}€` : "-"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{rule.description}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="sm" onClick={() => handleOpenDialog("pricing", rule)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Category Dialog */}
        <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Kategorie bearbeiten" : "Neue Kategorie erstellen"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cat-name">Name (ID) *</Label>
                <Input
                  id="cat-name"
                  placeholder="z.B. smartphone"
                  defaultValue={editingItem?.name}
                  disabled={!!editingItem}
                />
                <p className="text-xs text-muted-foreground">Technischer Name (nur Kleinbuchstaben)</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat-label">Anzeigename *</Label>
                <Input id="cat-label" placeholder="z.B. Smartphone" defaultValue={editingItem?.label} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat-icon">Icon *</Label>
                <Select defaultValue={editingItem?.icon}>
                  <SelectTrigger>
                    <SelectValue placeholder="Icon wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smartphone">smartphone</SelectItem>
                    <SelectItem value="tablet">tablet</SelectItem>
                    <SelectItem value="laptop">laptop</SelectItem>
                    <SelectItem value="watch">watch</SelectItem>
                    <SelectItem value="camera">camera</SelectItem>
                    <SelectItem value="gamepad">gamepad</SelectItem>
                    <SelectItem value="headphones">headphones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat-order">Anzeigereihenfolge *</Label>
                <Input id="cat-order" type="number" min="0" placeholder="1" defaultValue={editingItem?.displayOrder} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialogs}>
                Abbrechen
              </Button>
              <Button onClick={handleCloseDialogs}>{editingItem ? "Aktualisieren" : "Erstellen"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Brand Dialog */}
        <Dialog open={isBrandDialogOpen} onOpenChange={setIsBrandDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Marke bearbeiten" : "Neue Marke erstellen"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="brand-name">Markenname *</Label>
                <Input id="brand-name" placeholder="z.B. Apple" defaultValue={editingItem?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand-logo">Markenlogo</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input id="brand-logo" type="file" accept="image/*" />
                  </div>
                  {editingItem?.logoUrl && (
                    <img
                      src={editingItem.logoUrl || "/placeholder.svg"}
                      alt="Current logo"
                      className="w-16 h-16 object-contain border rounded"
                    />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Empfohlen: PNG oder SVG, transparenter Hintergrund</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand-order">Anzeigereihenfolge *</Label>
                <Input
                  id="brand-order"
                  type="number"
                  min="0"
                  placeholder="1"
                  defaultValue={editingItem?.displayOrder}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialogs}>
                Abbrechen
              </Button>
              <Button onClick={handleCloseDialogs}>{editingItem ? "Aktualisieren" : "Erstellen"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Device Dialog */}
        <Dialog open={isDeviceDialogOpen} onOpenChange={setIsDeviceDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Gerät bearbeiten" : "Neues Gerät erstellen"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="device-brand">Marke *</Label>
                  <Select defaultValue={editingItem?.brand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Marke wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.name}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="device-category">Kategorie *</Label>
                  <Select defaultValue={editingItem?.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategorie wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.label}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="device-model">Modell *</Label>
                <Input id="device-model" placeholder="z.B. iPhone 16 Pro Max" defaultValue={editingItem?.model} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="device-variant">Variante</Label>
                <Input id="device-variant" placeholder="z.B. 256GB, Schwarz" defaultValue={editingItem?.variant} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="device-price">Basispreis (€) *</Label>
                  <Input
                    id="device-price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="999.99"
                    defaultValue={editingItem?.base_price}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="device-year">Erscheinungsjahr *</Label>
                  <Input
                    id="device-year"
                    type="number"
                    min="2000"
                    max="2030"
                    placeholder="2024"
                    defaultValue={editingItem?.release_year}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="device-image">Produktbild</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input id="device-image" type="file" accept="image/*" />
                  </div>
                  {editingItem?.image_url && (
                    <img
                      src={editingItem.image_url || "/placeholder.svg"}
                      alt="Current"
                      className="w-20 h-20 object-contain border rounded"
                    />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Empfohlen: Quadratisches Format, min. 500x500px</p>
              </div>
              <div className="space-y-2">
                <Label>Spezifikationen (optional)</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="Speicher" />
                  <Input placeholder="Farbe" />
                  <Input placeholder="Konnektivität" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialogs}>
                Abbrechen
              </Button>
              <Button onClick={handleCloseDialogs}>{editingItem ? "Aktualisieren" : "Erstellen"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Pricing Rule Dialog */}
        <Dialog open={isPricingDialogOpen} onOpenChange={setIsPricingDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Preisregel bearbeiten" : "Neue Preisregel erstellen"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="rule-name">Regelname *</Label>
                <Input id="rule-name" placeholder="z.B. Zustand: Wie Neu" defaultValue={editingItem?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rule-type">Regeltyp *</Label>
                <Select defaultValue={editingItem?.type}>
                  <SelectTrigger>
                    <SelectValue placeholder="Typ wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="condition">Zustand</SelectItem>
                    <SelectItem value="storage">Speicher</SelectItem>
                    <SelectItem value="color">Farbe</SelectItem>
                    <SelectItem value="connectivity">Konnektivität</SelectItem>
                    <SelectItem value="other">Sonstiges</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rule-multiplier">Multiplikator</Label>
                  <Input
                    id="rule-multiplier"
                    type="number"
                    step="0.01"
                    min="0"
                    max="2"
                    placeholder="1.0"
                    defaultValue={editingItem?.multiplier}
                  />
                  <p className="text-xs text-muted-foreground">z.B. 0.85 = 85% des Basispreises</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rule-adjustment">Anpassung (€)</Label>
                  <Input
                    id="rule-adjustment"
                    type="number"
                    step="1"
                    placeholder="0"
                    defaultValue={editingItem?.adjustment}
                  />
                  <p className="text-xs text-muted-foreground">z.B. +100 oder -50</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rule-description">Beschreibung</Label>
                <Input
                  id="rule-description"
                  placeholder="Kurze Beschreibung der Regel"
                  defaultValue={editingItem?.description}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialogs}>
                Abbrechen
              </Button>
              <Button onClick={handleCloseDialogs}>{editingItem ? "Aktualisieren" : "Erstellen"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
