"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"

export default function ManageAdminsPage() {
  const [email, setEmail] = useState("")
  const [admins, setAdmins] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const supabase = createClient()

  useEffect(() => {
    loadAdmins()
  }, [])

  const loadAdmins = async () => {
    const { data, error } = await supabase.from("admin_emails").select("email").order("email")

    if (error) {
      console.error("Error loading admins:", error)
      return
    }

    setAdmins(data.map((d) => d.email))
  }

  const addAdmin = async () => {
    if (!email) return

    setLoading(true)
    setMessage(null)

    const { error } = await supabase.from("admin_emails").insert({ email: email.toLowerCase() })

    if (error) {
      if (error.code === "23505") {
        setMessage({ type: "error", text: "This email is already an admin" })
      } else {
        setMessage({ type: "error", text: `Error: ${error.message}` })
      }
    } else {
      setMessage({ type: "success", text: `Successfully added ${email} as admin` })
      setEmail("")
      loadAdmins()
    }

    setLoading(false)
  }

  const removeAdmin = async (adminEmail: string) => {
    if (!confirm(`Remove ${adminEmail} from admins?`)) return

    setLoading(true)
    setMessage(null)

    const { error } = await supabase.from("admin_emails").delete().eq("email", adminEmail)

    if (error) {
      setMessage({ type: "error", text: `Error: ${error.message}` })
    } else {
      setMessage({ type: "success", text: `Successfully removed ${adminEmail}` })
      loadAdmins()
    }

    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Manage Admin Users</h1>

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Add New Admin</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Enter an email address to grant admin access
            </p>
          </div>

          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addAdmin()}
              disabled={loading}
            />
            <Button onClick={addAdmin} disabled={loading || !email}>
              {loading ? "Adding..." : "Add Admin"}
            </Button>
          </div>

          {message && (
            <Alert variant={message.type === "error" ? "destructive" : "default"}>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Current Admins ({admins.length})</h2>

        {admins.length === 0 ? (
          <p className="text-muted-foreground">No admin users found</p>
        ) : (
          <div className="space-y-2">
            {admins.map((adminEmail) => (
              <div key={adminEmail} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{adminEmail}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeAdmin(adminEmail)}
                  disabled={loading}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
