"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getAllDevices() {
  const supabase = await createClient()

  console.log("[v0] Fetching all devices from database...")

  const { data: devices, error } = await supabase
    .from("devices")
    .select("*")
    .order("brand", { ascending: true })
    .order("model", { ascending: true })
    .limit(1000) // Added .limit(1000) to fetch all devices (currently 206)

  if (error) {
    console.error("[v0] Error fetching devices:", error)
    return { success: false, error: error.message }
  }

  console.log("[v0] Fetched devices count:", devices?.length || 0)
  console.log("[v0] Device brands:", devices?.map((d) => `${d.brand} ${d.model}`).join(", "))

  return { success: true, devices }
}

export async function updateDevicePrice(deviceId: string, newPrice: number, reason: string) {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Nicht authentifiziert" }
  }

  // Check if user is admin
  const { data: adminCheck } = await supabase.from("admin_emails").select("email").eq("email", user.email).maybeSingle()

  if (!adminCheck) {
    return { success: false, error: "Keine Admin-Berechtigung" }
  }

  // Get current price
  const { data: device, error: fetchError } = await supabase
    .from("devices")
    .select("base_price")
    .eq("id", deviceId)
    .single()

  if (fetchError || !device) {
    return { success: false, error: "Gerät nicht gefunden" }
  }

  const oldPrice = device.base_price

  // Update device price
  const { error: updateError } = await supabase
    .from("devices")
    .update({
      base_price: newPrice,
      updated_at: new Date().toISOString(),
    })
    .eq("id", deviceId)

  if (updateError) {
    console.error("[v0] Error updating device price:", updateError)
    return { success: false, error: updateError.message }
  }

  // Log price change to pricing_history
  const { error: historyError } = await supabase.from("pricing_history").insert({
    device_id: deviceId,
    old_price: oldPrice,
    new_price: newPrice,
    reason: reason || "Admin-Preisanpassung",
    changed_by: user.email,
  })

  if (historyError) {
    console.error("[v0] Error logging price history:", historyError)
    // Don't fail the whole operation if history logging fails
  }

  revalidatePath("/admin/geraete-preise")
  return { success: true, oldPrice, newPrice }
}

export async function getPriceHistory(deviceId: string) {
  const supabase = await createClient()

  const { data: history, error } = await supabase
    .from("pricing_history")
    .select("*")
    .eq("device_id", deviceId)
    .order("created_at", { ascending: false })
    .limit(10)

  if (error) {
    console.error("[v0] Error fetching price history:", error)
    return { success: false, error: error.message }
  }

  return { success: true, history }
}
