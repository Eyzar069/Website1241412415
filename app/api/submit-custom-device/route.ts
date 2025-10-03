import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, deviceName, deviceBrand, deviceModel, description, imageUrls } = body

    // Insert into Supabase
    const { data, error } = await supabase.from("custom_device_requests").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        device_name: deviceName,
        device_brand: deviceBrand,
        device_model: deviceModel,
        description,
        image_urls: imageUrls,
        status: "pending",
      },
    ])

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to submit device" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
