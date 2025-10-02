"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit2, Trash2, ArrowLeft, ImageIcon } from "lucide-react"
import { getAllCategories, getAllBrands } from "../produkte/actions"
import { createCategory, updateCategory, deleteCategory, createBrand, updateBrand, deleteBrand } from "./actions"
import Link from "next/link"

interface Category {
  id: string
  name: string
  label: string
  icon: string
  display_order: number
}

interface Brand {
  id: string
  name: string
  logo_url: string | null
  display_order: number
}

const ICON_OPTIONS = ["smartphone", "tablet", "laptop", "watch", "camera", "gamepad", "headphones", "more-horizontal"]

export default function KategorienPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [isBrandDialogOpen, setIsBrandDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const [categoriesResult, brandsResult] = await Promise.all([getAllCategories(), getAllBrands()])

    if (categoriesResult.success && categoriesResult.categories) {
      setCategories(categoriesResult.categories)
    }
    if (brandsResult.success && brandsResult.brands) {
      setBrands(brandsResult.brands)
    }
    setLoading(false)
  }

  const handleCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)

    const formData = new FormData(e.currentTarget)

    let result
    if (editingCategory) {
      result = await updateCategory(editingCategory.id, formData)
    } else {
      result = await createCategory(formData)
    }

    if (result.success) {
      await loadData()
      setIsCategoryDialogOpen(false)
      setEditingCategory(null)
    } else {
      alert(`Fehler: ${result.error}`)
    }

    setSaving(false)
  }

  const handleBrandSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)

    const formData = new FormData(e.currentTarget)

    let result
    if (editingBrand) {
      result = await updateBrand(editingBrand.id, formData)
    } else {
      result = await createBrand(formData)
    }

    if (result.success) {
      await loadData()
      setIsBrandDialogOpen(false)
      setEditingBrand(null)
    } else {
      alert(`Fehler: ${result.error}`)
    }

    setSaving(false)
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Möchten Sie diese Kategorie wirklich löschen?")) return

    const result = await deleteCategory(categoryId)
    if (result.success) {
      await loadData()
    } else {
      alert(`Fehler: ${result.error}`)
    }
  }

  const handleDeleteBrand = async (brandId: string) => {
    if (!confirm("Möchten Sie diese Marke wirklich löschen?")) return

    const result = await deleteBrand(brandId)
    if (result.success) {
      await loadData()
    } else {
      alert(`Fehler: ${result.error}`)
    }
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setIsCategoryDialogOpen(true)
  }

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand)
    setIsBrandDialogOpen(true)
  }

  const handleCloseCategoryDialog = () => {
    setIsCategoryDialogOpen(false)
    setEditingCategory(null)
  }

  const handleCloseBrandDialog = () => {
    setIsBrandDialogOpen(false)
    setEditingBrand(null)
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Kategorien & Marken</h1>
          <p className="text-lg text-muted-foreground">Kategorien und Markenlogos verwalten</p>
        </div>

        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList>
            <TabsTrigger value="categories">Kategorien</TabsTrigger>
            <TabsTrigger value="brands">Marken</TabsTrigger>
          </TabsList>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {categories.length} {categories.length === 1 ? "Kategorie" : "Kategorien"}
              </p>
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingCategory(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Neue Kategorie
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? "Kategorie bearbeiten" : "Neue Kategorie erstellen"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name (ID) *</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={editingCategory?.name}
                        placeholder="z.B. smartphone"
                        required
                        disabled={!!editingCategory}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Technischer Name (nur Kleinbuchstaben, keine Leerzeichen)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="label">Anzeigename *</Label>
                      <Input
                        id="label"
                        name="label"
                        defaultValue={editingCategory?.label}
                        placeholder="z.B. Smartphone"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="icon">Icon *</Label>
                      <select
                        id="icon"
                        name="icon"
                        defaultValue={editingCategory?.icon}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {ICON_OPTIONS.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="displayOrder">Anzeigereihenfolge *</Label>
                      <Input
                        id="displayOrder"
                        name="displayOrder"
                        type="number"
                        min="0"
                        defaultValue={editingCategory?.display_order ?? categories.length + 1}
                        required
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="submit" disabled={saving} className="flex-1">
                        {saving ? "Wird gespeichert..." : editingCategory ? "Aktualisieren" : "Erstellen"}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleCloseCategoryDialog} disabled={saving}>
                        Abbrechen
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="p-6">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Lade Kategorien...</p>
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Keine Kategorien vorhanden</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reihenfolge</TableHead>
                        <TableHead>Name (ID)</TableHead>
                        <TableHead>Anzeigename</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead className="text-right">Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.display_order}</TableCell>
                          <TableCell className="font-mono text-sm">{category.name}</TableCell>
                          <TableCell>{category.label}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{category.icon}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Brands Tab */}
          <TabsContent value="brands" className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {brands.length} {brands.length === 1 ? "Marke" : "Marken"}
              </p>
              <Dialog open={isBrandDialogOpen} onOpenChange={setIsBrandDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingBrand(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Neue Marke
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingBrand ? "Marke bearbeiten" : "Neue Marke erstellen"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleBrandSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Markenname *</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={editingBrand?.name}
                        placeholder="z.B. Apple"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="logo">Markenlogo</Label>
                      <Input id="logo" name="logo" type="file" accept="image/*" />
                      {editingBrand?.logo_url && (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground mb-2">Aktuelles Logo:</p>
                          <img
                            src={editingBrand.logo_url || "/placeholder.svg"}
                            alt="Current logo"
                            className="w-32 h-32 object-contain border rounded"
                          />
                          <input type="hidden" name="currentLogoUrl" value={editingBrand.logo_url} />
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="displayOrder">Anzeigereihenfolge *</Label>
                      <Input
                        id="displayOrder"
                        name="displayOrder"
                        type="number"
                        min="0"
                        defaultValue={editingBrand?.display_order ?? brands.length + 1}
                        required
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="submit" disabled={saving} className="flex-1">
                        {saving ? "Wird gespeichert..." : editingBrand ? "Aktualisieren" : "Erstellen"}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleCloseBrandDialog} disabled={saving}>
                        Abbrechen
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="p-6">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Lade Marken...</p>
                </div>
              ) : brands.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Keine Marken vorhanden</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Reihenfolge</TableHead>
                        <TableHead>Markenname</TableHead>
                        <TableHead className="text-right">Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {brands.map((brand) => (
                        <TableRow key={brand.id}>
                          <TableCell>
                            {brand.logo_url ? (
                              <img
                                src={brand.logo_url || "/placeholder.svg"}
                                alt={brand.name}
                                className="w-16 h-16 object-contain"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{brand.display_order}</TableCell>
                          <TableCell className="font-semibold">{brand.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="sm" onClick={() => handleEditBrand(brand)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteBrand(brand.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
