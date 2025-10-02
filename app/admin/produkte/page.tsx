"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, Search, ArrowLeft, ImageIcon, X, Check } from "lucide-react"
import { getDevicesPaginated } from "./actions"
import { createProduct, updateProduct, deleteProduct, getAllCategories, getAllBrands } from "./actions"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Device {
  id: string
  brand: string
  model: string
  variant: string | null
  category: string
  base_price: number
  release_year: number
  image_url: string | null
  specifications: any
}

interface Category {
  id: string
  name: string
  label: string
  icon: string
}

interface Brand {
  id: string
  name: string
  logo_url: string | null
}

export default function ProduktePage() {
  const [devices, setDevices] = useState<Device[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [brandFilter, setBrandFilter] = useState<string>("all")
  const [yearFilter, setYearFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const pageSize = 20
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingDevice, setEditingDevice] = useState<Device | null>(null)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const [formBrand, setFormBrand] = useState<string>("")
  const [formCategory, setFormCategory] = useState<string>("")

  const [editingRowId, setEditingRowId] = useState<string | null>(null)
  const [editingRowData, setEditingRowData] = useState<Partial<Device>>({})

  useEffect(() => {
    loadData()
  }, [currentPage, searchQuery, categoryFilter, brandFilter, yearFilter])

  const loadData = async () => {
    setLoading(true)
    const [devicesResult, categoriesResult, brandsResult] = await Promise.all([
      getDevicesPaginated({
        page: currentPage,
        pageSize,
        search: searchQuery || undefined,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
        brand: brandFilter !== "all" ? brandFilter : undefined,
        year: yearFilter !== "all" ? Number.parseInt(yearFilter) : undefined,
      }),
      getAllCategories(),
      getAllBrands(),
    ])

    if (devicesResult.success && devicesResult.devices) {
      setDevices(devicesResult.devices)
      setTotalCount(devicesResult.total || 0)
      setTotalPages(Math.ceil((devicesResult.total || 0) / pageSize))
    }
    if (categoriesResult.success && categoriesResult.categories) {
      setCategories(categoriesResult.categories)
    }
    if (brandsResult.success && brandsResult.brands) {
      setBrands(brandsResult.brands)
    }
    setLoading(false)
  }

  const filteredDevices = devices

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)

    console.log("[v0] Form submission started")
    console.log("[v0] Editing device:", editingDevice)

    const formData = new FormData(e.currentTarget)

    console.log("[v0] Form data entries:")
    for (const [key, value] of formData.entries()) {
      console.log(`[v0]   ${key}:`, value)
    }

    let result
    if (editingDevice) {
      console.log("[v0] Calling updateProduct with ID:", editingDevice.id)
      result = await updateProduct(editingDevice.id, formData)
      console.log("[v0] Update result:", result)
    } else {
      console.log("[v0] Calling createProduct")
      result = await createProduct(formData)
      console.log("[v0] Create result:", result)
    }

    if (result.success) {
      toast({
        title: editingDevice ? "Produkt aktualisiert" : "Produkt erstellt",
        description: `${formData.get("brand")} ${formData.get("model")} wurde erfolgreich ${editingDevice ? "aktualisiert" : "erstellt"}.`,
      })
      console.log("[v0] Reloading data after successful operation")
      await loadData()
      setIsCreateOpen(false)
      setEditingDevice(null)
      setFormBrand("")
      setFormCategory("")
    } else {
      console.error("[v0] Operation failed:", result.error)
      toast({
        title: "Fehler",
        description: result.error,
        variant: "destructive",
      })
    }

    setSaving(false)
  }

  const handleDelete = async (deviceId: string) => {
    if (!confirm("Möchten Sie dieses Produkt wirklich löschen?")) return

    const result = await deleteProduct(deviceId)
    if (result.success) {
      toast({
        title: "Produkt gelöscht",
        description: "Das Produkt wurde erfolgreich gelöscht.",
      })
      await loadData()
    } else {
      toast({
        title: "Fehler",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (device: Device) => {
    console.log("[v0] Edit button clicked for device:", device)
    setEditingDevice(device)
    setFormBrand(device.brand)
    setFormCategory(device.category)
    setIsCreateOpen(true)
  }

  const handleCloseDialog = () => {
    setIsCreateOpen(false)
    setEditingDevice(null)
    setFormBrand("")
    setFormCategory("")
  }

  const handleInlineEdit = (device: Device) => {
    console.log("[v0] Starting inline edit for device:", device)
    setEditingRowId(device.id)
    setEditingRowData({
      brand: device.brand,
      model: device.model,
      variant: device.variant,
      category: device.category,
      base_price: device.base_price,
      release_year: device.release_year,
    })
  }

  const handleCancelInlineEdit = () => {
    console.log("[v0] Canceling inline edit")
    setEditingRowId(null)
    setEditingRowData({})
  }

  const handleSaveInlineEdit = async (deviceId: string) => {
    console.log("[v0] Saving inline edit for device:", deviceId)
    console.log("[v0] Edited data:", editingRowData)

    setSaving(true)

    const formData = new FormData()
    formData.append("brand", editingRowData.brand || "")
    formData.append("model", editingRowData.model || "")
    formData.append("variant", editingRowData.variant || "")
    formData.append("category", editingRowData.category || "")
    formData.append("basePrice", editingRowData.base_price?.toString() || "0")
    formData.append("releaseYear", editingRowData.release_year?.toString() || "2024")

    // Keep current image
    const device = devices.find((d) => d.id === deviceId)
    if (device?.image_url) {
      formData.append("currentImageUrl", device.image_url)
    }

    console.log("[v0] Calling updateProduct with FormData")
    const result = await updateProduct(deviceId, formData)
    console.log("[v0] Update result:", result)

    if (result.success) {
      toast({
        title: "Produkt aktualisiert",
        description: "Die Änderungen wurden erfolgreich in der Datenbank gespeichert.",
      })
      console.log("[v0] Reloading data from database...")
      await loadData()
      setEditingRowId(null)
      setEditingRowData({})
    } else {
      toast({
        title: "Fehler beim Speichern",
        description: result.error || "Die Änderungen konnten nicht gespeichert werden.",
        variant: "destructive",
      })
    }

    setSaving(false)
  }

  const getAvailableYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let year = currentYear; year >= 2015; year--) {
      years.push(year)
    }
    return years
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                Produktverwaltung
              </h1>
              <p className="text-lg text-muted-foreground">Verwalten Sie Ihre Produkte direkt in der Datenbank</p>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => {
                    setEditingDevice(null)
                    setFormBrand("")
                    setFormCategory("")
                  }}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Neues Produkt
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingDevice ? "Produkt bearbeiten" : "Neues Produkt erstellen"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4" key={editingDevice?.id || "new"}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brand">Marke *</Label>
                      <Select
                        value={formBrand}
                        onValueChange={(value) => {
                          console.log("[v0] Brand changed to:", value)
                          setFormBrand(value)
                        }}
                        required
                      >
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
                      <input type="hidden" name="brand" value={formBrand} />
                    </div>
                    <div>
                      <Label htmlFor="category">Kategorie *</Label>
                      <Select
                        value={formCategory}
                        onValueChange={(value) => {
                          console.log("[v0] Category changed to:", value)
                          setFormCategory(value)
                        }}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Kategorie wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.name}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="category" value={formCategory} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="model">Modell *</Label>
                    <Input
                      id="model"
                      name="model"
                      defaultValue={editingDevice?.model}
                      placeholder="z.B. iPhone 16 Pro Max"
                      onChange={(e) => console.log("[v0] Model changed to:", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="variant">Variante</Label>
                    <Input
                      id="variant"
                      name="variant"
                      defaultValue={editingDevice?.variant || ""}
                      placeholder="z.B. 256GB, Schwarz"
                      onChange={(e) => console.log("[v0] Variant changed to:", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="basePrice">Basispreis (€) *</Label>
                      <Input
                        id="basePrice"
                        name="basePrice"
                        type="number"
                        step="0.01"
                        min="0"
                        defaultValue={editingDevice?.base_price}
                        placeholder="999.99"
                        onChange={(e) => console.log("[v0] Base price changed to:", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="releaseYear">Erscheinungsjahr *</Label>
                      <Input
                        id="releaseYear"
                        name="releaseYear"
                        type="number"
                        min="2000"
                        max="2030"
                        defaultValue={editingDevice?.release_year}
                        placeholder="2024"
                        onChange={(e) => console.log("[v0] Release year changed to:", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="storage">Speicher</Label>
                      <Input
                        id="storage"
                        name="storage"
                        defaultValue={editingDevice?.specifications?.storage || ""}
                        placeholder="256GB"
                      />
                    </div>
                    <div>
                      <Label htmlFor="color">Farbe</Label>
                      <Input
                        id="color"
                        name="color"
                        defaultValue={editingDevice?.specifications?.color || ""}
                        placeholder="Schwarz"
                      />
                    </div>
                    <div>
                      <Label htmlFor="connectivity">Konnektivität</Label>
                      <Input
                        id="connectivity"
                        name="connectivity"
                        defaultValue={editingDevice?.specifications?.connectivity || ""}
                        placeholder="5G"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Produktbild</Label>
                    <Input id="image" name="image" type="file" accept="image/*" />
                    {editingDevice?.image_url && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground mb-2">Aktuelles Bild:</p>
                        <img
                          src={editingDevice.image_url || "/placeholder.svg"}
                          alt="Current"
                          className="w-32 h-32 object-contain border rounded"
                        />
                        <input type="hidden" name="currentImageUrl" value={editingDevice.image_url} />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" disabled={saving} className="flex-1">
                      {saving ? "Wird gespeichert..." : editingDevice ? "Aktualisieren" : "Erstellen"}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCloseDialog} disabled={saving}>
                      Abbrechen
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6 shadow-lg border-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Suche nach Marke, Modell..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10"
              />
            </div>
            <Select
              value={categoryFilter}
              onValueChange={(value) => {
                setCategoryFilter(value)
                setCurrentPage(1)
              }}
            >
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
            <Select
              value={brandFilter}
              onValueChange={(value) => {
                setBrandFilter(value)
                setCurrentPage(1)
              }}
            >
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
            <Select
              value={yearFilter}
              onValueChange={(value) => {
                setYearFilter(value)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Jahr filtern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Jahre</SelectItem>
                {getAvailableYears().map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Card className="shadow-xl border-2">
          <div className="p-6 border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Produktliste</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {totalCount} {totalCount === 1 ? "Produkt" : "Produkte"}
                  {totalPages > 1 && ` • Seite ${currentPage} von ${totalPages}`}
                </p>
              </div>
              {loading && (
                <Badge variant="secondary" className="animate-pulse">
                  Lädt...
                </Badge>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent mb-4" />
              <p className="text-muted-foreground">Lade Produkte aus der Datenbank...</p>
            </div>
          ) : filteredDevices.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Keine Produkte gefunden</p>
              <p className="text-sm text-muted-foreground">
                Versuchen Sie, Ihre Suchfilter anzupassen oder ein neues Produkt zu erstellen.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[100px]">Bild</TableHead>
                    <TableHead>Marke</TableHead>
                    <TableHead>Modell</TableHead>
                    <TableHead>Kategorie</TableHead>
                    <TableHead className="text-right">Preis</TableHead>
                    <TableHead className="text-center">Jahr</TableHead>
                    <TableHead>Variante</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDevices.map((device) => {
                    const isEditing = editingRowId === device.id

                    return (
                      <TableRow
                        key={device.id}
                        className={`transition-colors ${isEditing ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-muted/50"}`}
                      >
                        {/* Image */}
                        <TableCell>
                          <div className="flex justify-center">
                            {device.image_url ? (
                              <img
                                src={device.image_url || "/placeholder.svg"}
                                alt={device.model}
                                className="w-16 h-16 object-contain rounded-lg border-2"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center border-2">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        </TableCell>

                        {/* Brand */}
                        <TableCell>
                          {isEditing ? (
                            <Select
                              value={editingRowData.brand}
                              onValueChange={(value) => {
                                console.log("[v0] Inline edit - brand changed to:", value)
                                setEditingRowData({ ...editingRowData, brand: value })
                              }}
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {brands.map((brand) => (
                                  <SelectItem key={brand.id} value={brand.name}>
                                    {brand.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="font-semibold">{device.brand}</div>
                          )}
                        </TableCell>

                        {/* Model */}
                        <TableCell>
                          {isEditing ? (
                            <Input
                              value={editingRowData.model}
                              onChange={(e) => {
                                console.log("[v0] Inline edit - model changed to:", e.target.value)
                                setEditingRowData({ ...editingRowData, model: e.target.value })
                              }}
                              className="h-9"
                            />
                          ) : (
                            <div className="font-medium">{device.model}</div>
                          )}
                        </TableCell>

                        {/* Category */}
                        <TableCell>
                          {isEditing ? (
                            <Select
                              value={editingRowData.category}
                              onValueChange={(value) => {
                                console.log("[v0] Inline edit - category changed to:", value)
                                setEditingRowData({ ...editingRowData, category: value })
                              }}
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((cat) => (
                                  <SelectItem key={cat.id} value={cat.name}>
                                    {cat.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge variant="secondary" className="font-medium">
                              {categories.find((c) => c.name === device.category)?.label || device.category}
                            </Badge>
                          )}
                        </TableCell>

                        {/* Price */}
                        <TableCell className="text-right">
                          {isEditing ? (
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              value={editingRowData.base_price}
                              onChange={(e) => {
                                const newPrice = Number.parseFloat(e.target.value)
                                console.log("[v0] Inline edit - price changed to:", newPrice)
                                setEditingRowData({ ...editingRowData, base_price: newPrice })
                              }}
                              className="h-9 text-right"
                            />
                          ) : (
                            <div className="font-bold text-lg text-primary">{device.base_price.toFixed(2)}€</div>
                          )}
                        </TableCell>

                        {/* Year */}
                        <TableCell className="text-center">
                          {isEditing ? (
                            <Input
                              type="number"
                              min="2000"
                              max="2030"
                              value={editingRowData.release_year}
                              onChange={(e) => {
                                const newYear = Number.parseInt(e.target.value)
                                console.log("[v0] Inline edit - year changed to:", newYear)
                                setEditingRowData({ ...editingRowData, release_year: newYear })
                              }}
                              className="h-9 text-center"
                            />
                          ) : (
                            <Badge variant="outline">{device.release_year}</Badge>
                          )}
                        </TableCell>

                        {/* Variant */}
                        <TableCell>
                          {isEditing ? (
                            <Input
                              value={editingRowData.variant || ""}
                              onChange={(e) => {
                                console.log("[v0] Inline edit - variant changed to:", e.target.value)
                                setEditingRowData({ ...editingRowData, variant: e.target.value })
                              }}
                              className="h-9"
                              placeholder="-"
                            />
                          ) : (
                            <div className="text-sm text-muted-foreground">{device.variant || "-"}</div>
                          )}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right">
                          {isEditing ? (
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleSaveInlineEdit(device.id)}
                                disabled={saving}
                                className="shadow-md"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Speichern
                              </Button>
                              <Button variant="outline" size="sm" onClick={handleCancelInlineEdit} disabled={saving}>
                                <X className="h-4 w-4 mr-1" />
                                Abbrechen
                              </Button>
                            </div>
                          ) : (
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleInlineEdit(device)}
                                title="Bearbeiten"
                                className="hover:bg-primary/10"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(device.id)}
                                title="Löschen"
                                className="hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-6 border-t bg-muted/30">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
