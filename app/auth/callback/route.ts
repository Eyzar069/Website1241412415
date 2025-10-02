import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const redirect = requestUrl.searchParams.get("redirect")

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("[v0] OAuth callback error:", error)
      // Redirect to login with error
      return NextResponse.redirect(new URL("/auth/login?error=oauth_failed", requestUrl.origin))
    }
  }

  // Redirect to the original page or home
  return NextResponse.redirect(new URL(redirect || "/", requestUrl.origin))
}
