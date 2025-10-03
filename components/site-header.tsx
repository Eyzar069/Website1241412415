"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

export function SiteHeader() {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)

      if (user) {
        const { data: adminCheck } = await supabase
          .from("admin_emails")
          .select("email")
          .eq("email", user.email)
          .maybeSingle()
        setIsAdmin(!!adminCheck)
      }

      setLoading(false)
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        supabase
          .from("admin_emails")
          .select("email")
          .eq("email", session.user.email)
          .maybeSingle()
          .then(({ data }) => {
            setIsAdmin(!!data)
          })
      } else {
        setIsAdmin(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/mr-phone-logo.png"
            alt="Mr Phone"
            className="h-20 w-20 rounded-full border-2 border-primary object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/verkaufen"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
          >
            Verkaufen
          </Link>
          <Link
            href="/wie-es-funktioniert"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
          >
            Wie es funktioniert
          </Link>
          <Link
            href="/kontakt"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
          >
            Kontakt
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {!loading && isAdmin && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden md:inline-flex border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary bg-transparent"
            >
              <Link href="/admin">Admin</Link>
            </Button>
          )}

          {!loading && user ? (
            <UserNav user={user} />
          ) : !loading ? (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex hover:text-primary">
                <Link href="/auth/login">Anmelden</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
              >
                <Link href="/verkaufen">Jetzt verkaufen</Link>
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  )
}
