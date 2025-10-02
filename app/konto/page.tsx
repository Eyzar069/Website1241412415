import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AccountPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/konto")
  }

  // Check if user is admin
  const { data: adminCheck } = await supabase.from("admin_emails").select("email").eq("email", user.email).maybeSingle()
  const isAdmin = !!adminCheck

  // Get user's orders
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_email", user.email)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mein Konto</h1>
          <p className="text-muted-foreground">Verwalten Sie Ihre Kontoinformationen und Bestellungen</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Kontoinformationen</CardTitle>
              <CardDescription>Ihre persönlichen Daten</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>E-Mail-Adresse</Label>
                <p className="text-sm">{user.email}</p>
              </div>
              <div className="space-y-2">
                <Label>Konto erstellt</Label>
                <p className="text-sm">
                  {new Date(user.created_at).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              {isAdmin && (
                <div className="space-y-2">
                  <Label>Rolle</Label>
                  <p className="text-sm font-medium text-primary">Administrator</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schnellzugriff</CardTitle>
              <CardDescription>Häufig verwendete Funktionen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full bg-transparent" variant="outline">
                <Link href="/verkaufen">Neues Gerät verkaufen</Link>
              </Button>
              {isAdmin && (
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/admin">Admin-Dashboard</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Meine Bestellungen</CardTitle>
            <CardDescription>
              {orders && orders.length > 0
                ? `Ihre letzten ${orders.length} Bestellungen`
                : "Sie haben noch keine Bestellungen"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {orders && orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Bestellung #{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("de-DE")}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium">{order.quoted_price.toFixed(2)} €</p>
                      <p className="text-xs text-muted-foreground capitalize">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground mb-4">Sie haben noch keine Geräte verkauft</p>
                <Button asChild>
                  <Link href="/verkaufen">Jetzt verkaufen</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
