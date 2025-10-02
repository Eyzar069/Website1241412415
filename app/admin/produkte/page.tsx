"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, Search, ArrowLeft, ImageIcon } from "lucide-react"
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

    const formData = new FormData(e.currentTarget)

    let result
    if (editingDevice) {
      result = await updateProduct(editingDevice.id, formData)
    } else {
      result = await createProduct(formData)
    }

    if (result.success) {
      toast({
        title: editingDevice ? "Produkt aktualisiert" : "Produkt erstellt",
        description: `${formData.get("brand")} ${formData.get("model")} wurde erfolgreich ${editingDevice ? "aktualisiert" : "erstellt"}.`,
      })
      await loadData()
      setIsCreateOpen(false)
      setEditingDevice(null)
    } else {
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
    setEditingDevice(device)
    setIsCreateOpen(true)
  }

  const handleCloseDialog = () => {
    setIsCreateOpen(false)
    setEditingDevice(null)
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Produktverwaltung</h1>
              <p className="text-lg text-muted-foreground">Produkte hinzufügen, bearbeiten und löschen</p>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingDevice(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Neues Produkt
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingDevice ? "Produkt bearbeiten" : "Neues Produkt erstellen"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brand">Marke *</Label>
                      <Select name="brand" defaultValue={editingDevice?.brand} required>
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
                    <div>
                      <Label htmlFor="category">Kategorie *</Label>
                      <Select name="category" defaultValue={editingDevice?.category} required>
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
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="model">Modell *</Label>
                    <Input
                      id="model"
                      name="model"
                      defaultValue={editingDevice?.model}
                      placeholder="z.B. iPhone 16 Pro Max"
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
        <Card className="p-6 mb-6">
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

        {/* Results */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {totalCount} {totalCount === 1 ? "Produkt gefunden" : "Produkte gefunden"}
              {totalPages > 1 && ` • Seite ${currentPage} von ${totalPages}`}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Lade Produkte...</p>
            </div>
          ) : filteredDevices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Keine Produkte gefunden</p>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bild</TableHead>
                      <TableHead>Marke</TableHead>
                      <TableHead>Modell</TableHead>
                      <TableHead>Variante</TableHead>
                      <TableHead>Kategorie</TableHead>
                      <TableHead>Preis</TableHead>
                      <TableHead>Jahr</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDevices.map((device) => (
                      <TableRow key={device.id}>
                        <TableCell>
                          {device.image_url ? (
                            <img
                              src={device.image_url || "/placeholder.svg"}
                              alt={device.model}
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                              <ImageIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{device.brand}</TableCell>
                        <TableCell>{device.model}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{device.variant || "-"}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {categories.find((c) => c.name === device.category)?.label || device.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{device.base_price}€</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{device.release_year}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(device)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(device.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
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
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
