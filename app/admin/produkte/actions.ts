"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { put } from "@vercel/blob"

export async function getDevicesPaginated(params: {
  page: number
  pageSize: number
  search?: string
  category?: string
  brand?: string
  year?: number
}) {
  const supabase = await createClient()
  const { page, pageSize, search, category, brand, year } = params

  // Build query
  let query = supabase.from("devices").select("*", { count: "exact" })

  // Apply filters
  if (search) {
    query = query.or(`brand.ilike.%${search}%,model.ilike.%${search}%,variant.ilike.%${search}%`)
  }
  if (category) {
    query = query.eq("category", category)
  }
  if (brand) {
    query = query.eq("brand", brand)
  }
  if (year) {
    query = query.eq("release_year", year)
  }

  // Apply pagination
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data: devices, error, count } = await query.range(from, to).order("brand").order("model")

  if (error) {
    console.error("[v0] Error fetching devices:", error)
    return { success: false, error: error.message }
  }

  return { success: true, devices, total: count || 0 }
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  // Check admin auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Nicht authentifiziert" }
  }

  const { data: adminCheck } = await supabase.from("admin_emails").select("email").eq("email", user.email).maybeSingle()

  if (!adminCheck) {
    return { success: false, error: "Keine Admin-Berechtigung" }
  }

  // Extract form data
  const brand = formData.get("brand") as string
  const model = formData.get("model") as string
  const variant = formData.get("variant") as string | null
  const category = formData.get("category") as string
  const basePrice = Number.parseFloat(formData.get("basePrice") as string)
  const releaseYear = Number.parseInt(formData.get("releaseYear") as string)
  const storage = formData.get("storage") as string | null
  const color = formData.get("color") as string | null
  const connectivity = formData.get("connectivity") as string | null
  const imageFile = formData.get("image") as File | null

  let imageUrl = null

  // Upload image if provided
  if (imageFile && imageFile.size > 0) {
    try {
      const blob = await put(imageFile.name, imageFile, {
        access: "public",
      })
      imageUrl = blob.url
    } catch (error) {
      console.error("[v0] Error uploading image:", error)
      return { success: false, error: "Fehler beim Hochladen des Bildes" }
    }
  }

  // Create specifications object
  const specifications: any = {}
  if (storage) specifications.storage = storage
  if (color) specifications.color = color
  if (connectivity) specifications.connectivity = connectivity

  // Insert product
  const { data, error } = await supabase
    .from("devices")
    .insert({
      brand,
      model,
      variant,
      category,
      base_price: basePrice,
      release_year: releaseYear,
      image_url: imageUrl,
      specifications: Object.keys(specifications).length > 0 ? specifications : null,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating product:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/produkte")
  revalidatePath("/admin/geraete-preise")
  return { success: true, product: data }
}

export async function updateProduct(productId: string, formData: FormData) {
  const supabase = await createClient()

  // Check admin auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Nicht authentifiziert" }
  }

  const { data: adminCheck } = await supabase.from("admin_emails").select("email").eq("email", user.email).maybeSingle()

  if (!adminCheck) {
    return { success: false, error: "Keine Admin-Berechtigung" }
  }

  // Extract form data
  const brand = formData.get("brand") as string
  const model = formData.get("model") as string
  const variant = formData.get("variant") as string | null
  const category = formData.get("category") as string
  const basePrice = Number.parseFloat(formData.get("basePrice") as string)
  const releaseYear = Number.parseInt(formData.get("releaseYear") as string)
  const storage = formData.get("storage") as string | null
  const color = formData.get("color") as string | null
  const connectivity = formData.get("connectivity") as string | null
  const imageFile = formData.get("image") as File | null

  let imageUrl = formData.get("currentImageUrl") as string | null

  // Upload new image if provided
  if (imageFile && imageFile.size > 0) {
    try {
      const blob = await put(imageFile.name, imageFile, {
        access: "public",
      })
      imageUrl = blob.url
    } catch (error) {
      console.error("[v0] Error uploading image:", error)
      return { success: false, error: "Fehler beim Hochladen des Bildes" }
    }
  }

  // Create specifications object
  const specifications: any = {}
  if (storage) specifications.storage = storage
  if (color) specifications.color = color
  if (connectivity) specifications.connectivity = connectivity

  // Update product
  const { data, error } = await supabase
    .from("devices")
    .update({
      brand,
      model,
      variant,
      category,
      base_price: basePrice,
      release_year: releaseYear,
      image_url: imageUrl,
      specifications: Object.keys(specifications).length > 0 ? specifications : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error updating product:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/produkte")
  revalidatePath("/admin/geraete-preise")
  return { success: true, product: data }
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient()

  // Check admin auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Nicht authentifiziert" }
  }

  const { data: adminCheck } = await supabase.from("admin_emails").select("email").eq("email", user.email).maybeSingle()

  if (!adminCheck) {
    return { success: false, error: "Keine Admin-Berechtigung" }
  }

  const { error } = await supabase.from("devices").delete().eq("id", productId)

  if (error) {
    console.error("[v0] Error deleting product:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/produkte")
  revalidatePath("/admin/geraete-preise")
  return { success: true }
}

export async function getAllCategories() {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching categories:", error)
    return { success: false, error: error.message }
  }

  return { success: true, categories }
}

export async function getAllBrands() {
  const supabase = await createClient()

  const { data: brands, error } = await supabase.from("brands").select("*").order("display_order", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching brands:", error)
    return { success: false, error: error.message }
  }

  return { success: true, brands }
}
