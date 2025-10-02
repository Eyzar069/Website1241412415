"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { put } from "@vercel/blob"

export async function createCategory(formData: FormData) {
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

  const name = formData.get("name") as string
  const label = formData.get("label") as string
  const icon = formData.get("icon") as string
  const displayOrder = Number.parseInt(formData.get("displayOrder") as string)

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name,
      label,
      icon,
      display_order: displayOrder,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating category:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/kategorien")
  revalidatePath("/admin/produkte")
  return { success: true, category: data }
}

export async function updateCategory(categoryId: string, formData: FormData) {
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

  const name = formData.get("name") as string
  const label = formData.get("label") as string
  const icon = formData.get("icon") as string
  const displayOrder = Number.parseInt(formData.get("displayOrder") as string)

  const { data, error } = await supabase
    .from("categories")
    .update({
      name,
      label,
      icon,
      display_order: displayOrder,
      updated_at: new Date().toISOString(),
    })
    .eq("id", categoryId)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error updating category:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/kategorien")
  revalidatePath("/admin/produkte")
  return { success: true, category: data }
}

export async function deleteCategory(categoryId: string) {
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

  // Check if category is in use
  const { data: devicesInCategory } = await supabase.from("devices").select("id").eq("category", categoryId).limit(1)

  if (devicesInCategory && devicesInCategory.length > 0) {
    return { success: false, error: "Kategorie wird noch von Produkten verwendet" }
  }

  const { error } = await supabase.from("categories").delete().eq("id", categoryId)

  if (error) {
    console.error("[v0] Error deleting category:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/kategorien")
  revalidatePath("/admin/produkte")
  return { success: true }
}

export async function createBrand(formData: FormData) {
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

  const name = formData.get("name") as string
  const displayOrder = Number.parseInt(formData.get("displayOrder") as string)
  const logoFile = formData.get("logo") as File | null

  let logoUrl = null

  // Upload logo if provided
  if (logoFile && logoFile.size > 0) {
    try {
      const blob = await put(logoFile.name, logoFile, {
        access: "public",
      })
      logoUrl = blob.url
    } catch (error) {
      console.error("[v0] Error uploading logo:", error)
      return { success: false, error: "Fehler beim Hochladen des Logos" }
    }
  }

  const { data, error } = await supabase
    .from("brands")
    .insert({
      name,
      logo_url: logoUrl,
      display_order: displayOrder,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating brand:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/kategorien")
  revalidatePath("/admin/produkte")
  return { success: true, brand: data }
}

export async function updateBrand(brandId: string, formData: FormData) {
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

  const name = formData.get("name") as string
  const displayOrder = Number.parseInt(formData.get("displayOrder") as string)
  const logoFile = formData.get("logo") as File | null

  let logoUrl = formData.get("currentLogoUrl") as string | null

  // Upload new logo if provided
  if (logoFile && logoFile.size > 0) {
    try {
      const blob = await put(logoFile.name, logoFile, {
        access: "public",
      })
      logoUrl = blob.url
    } catch (error) {
      console.error("[v0] Error uploading logo:", error)
      return { success: false, error: "Fehler beim Hochladen des Logos" }
    }
  }

  const { data, error } = await supabase
    .from("brands")
    .update({
      name,
      logo_url: logoUrl,
      display_order: displayOrder,
      updated_at: new Date().toISOString(),
    })
    .eq("id", brandId)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error updating brand:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/kategorien")
  revalidatePath("/admin/produkte")
  return { success: true, brand: data }
}

export async function deleteBrand(brandId: string) {
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

  // Check if brand is in use
  const { data: devicesWithBrand } = await supabase.from("devices").select("id").eq("brand", brandId).limit(1)

  if (devicesWithBrand && devicesWithBrand.length > 0) {
    return { success: false, error: "Marke wird noch von Produkten verwendet" }
  }

  const { error } = await supabase.from("brands").delete().eq("id", brandId)

  if (error) {
    console.error("[v0] Error deleting brand:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/kategorien")
  revalidatePath("/admin/produkte")
  return { success: true }
}
