import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, ShoppingCart } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin")
  }

  // Check if user is admin
  const { data: adminCheck } = await supabase.from("admin_emails").select("email").eq("email", user.email).maybeSingle()

  if (!adminCheck) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Admin Dashboard</h2>
              <p className="text-sm text-muted-foreground">Angemeldet als: {user.email}</p>
            </div>
          </div>
          <nav className="flex gap-2">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Bestellungen
              </Button>
            </Link>
            <Link href="/admin/produkte-verwaltung">
              <Button variant="ghost" size="sm" className="gap-2">
                <Package className="h-4 w-4" />
                Produkte verwalten
              </Button>
            </Link>
          </nav>
        </div>
      </div>
      {children}
    </div>
  )
}
