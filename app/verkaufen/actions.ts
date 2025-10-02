"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getCategories() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("categories").select("*").order("display_order", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching categories:", error)
    return []
  }

  return data || []
}

export async function getBrands() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("brands").select("*").order("display_order", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching brands:", error)
    return []
  }

  return data || []
}

export async function getDevices() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("devices").select("*")

  if (error) {
    console.error("[v0] Error fetching devices:", error)
    return []
  }

  console.log("[v0] Fetched devices:", data?.length)
  return data || []
}

export async function getDeviceById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("devices").select("*").eq("id", id).single()

  if (error) {
    console.error("[v0] Error fetching device:", error)
    return null
  }

  return data
}

export async function addCategory(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get("name") as string
  const label = formData.get("label") as string
  const icon = formData.get("icon") as string

  const { error } = await supabase.from("categories").insert({
    name,
    label,
    icon,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/verkaufen")
  return { success: true }
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get("name") as string
  const label = formData.get("label") as string
  const icon = formData.get("icon") as string

  const { error } = await supabase
    .from("categories")
    .update({
      name,
      label,
      icon,
    })
    .eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/verkaufen")
  return { success: true }
}

export async function addBrand(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get("name") as string
  const logoUrl = formData.get("logoUrl") as string
  const categoryId = formData.get("categoryId") as string

  const { error } = await supabase.from("brands").insert({
    name,
    logo_url: logoUrl,
    category_id: categoryId,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/verkaufen")
  return { success: true }
}

export async function updateBrand(id: string, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get("name") as string
  const logoUrl = formData.get("logoUrl") as string

  const { error } = await supabase
    .from("brands")
    .update({
      name,
      logo_url: logoUrl,
    })
    .eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/verkaufen")
  return { success: true }
}

export async function addDevice(formData: FormData) {
  const supabase = await createClient()

  const brandId = formData.get("brandId") as string
  const model = formData.get("model") as string
  const variant = formData.get("variant") as string
  const series = formData.get("series") as string
  const basePrice = Number.parseFloat(formData.get("basePrice") as string)
  const imageUrl = formData.get("imageUrl") as string

  const { error } = await supabase.from("devices").insert({
    brand_id: brandId,
    model,
    variant: variant || null,
    series: series || null,
    base_price: basePrice,
    image_url: imageUrl,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/verkaufen")
  return { success: true }
}

export async function updateDevice(id: string, formData: FormData) {
  const supabase = await createClient()

  const model = formData.get("model") as string
  const variant = formData.get("variant") as string
  const series = formData.get("series") as string
  const basePrice = Number.parseFloat(formData.get("basePrice") as string)
  const imageUrl = formData.get("imageUrl") as string

  const { error } = await supabase
    .from("devices")
    .update({
      model,
      variant: variant || null,
      series: series || null,
      base_price: basePrice,
      image_url: imageUrl,
    })
    .eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/verkaufen")
  return { success: true }
}
