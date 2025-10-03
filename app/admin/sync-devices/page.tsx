"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MOCK_DEVICES } from "@/lib/mock-data"
import { createClient } from "@/lib/supabase/client"

export default function SyncDevicesPage() {
  const [syncing, setSyncing] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [result, setResult] = useState<{ success: number; errors: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const syncDevices = async () => {
    setSyncing(true)
    setError(null)
    setResult(null)

    const supabase = createClient()

    try {
      // First, delete all existing devices
      setProgress({ current: 0, total: MOCK_DEVICES.length })
      const { error: deleteError } = await supabase.from("devices").delete().neq("id", "")

      if (deleteError) {
        throw new Error(`Error deleting devices: ${deleteError.message}`)
      }

      // Insert in batches of 50
      const batchSize = 50
      let successCount = 0
      let errorCount = 0

      for (let i = 0; i < MOCK_DEVICES.length; i += batchSize) {
        const batch = MOCK_DEVICES.slice(i, i + batchSize).map((device) => ({
          id: device.id,
          category: device.category,
          brand: device.brand,
          model: device.model,
          variant: device.variant || null,
          release_year: device.releaseYear,
          base_price: device.basePrice,
          image_url: device.imageUrl || null,
          specifications: device.specifications || null,
        }))

        const { error: insertError } = await supabase.from("devices").insert(batch)

        if (insertError) {
          console.error(`Error in batch ${Math.floor(i / batchSize) + 1}:`, insertError)
          errorCount += batch.length
        } else {
          successCount += batch.length
        }

        setProgress({ current: Math.min(i + batchSize, MOCK_DEVICES.length), total: MOCK_DEVICES.length })
      }

      setResult({ success: successCount, errors: errorCount })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Sync Mock Devices to Database</h1>

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Database Sync</h2>
            <p className="text-muted-foreground">
              This will sync all {MOCK_DEVICES.length} devices from the mock data to the Supabase database.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Warning: This will delete all existing devices in the database first.
            </p>
          </div>

          <Button onClick={syncDevices} disabled={syncing} size="lg" className="w-full">
            {syncing ? "Syncing..." : "Sync All Devices"}
          </Button>

          {syncing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress:</span>
                <span>
                  {progress.current} / {progress.total}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {result && (
            <Alert>
              <AlertDescription>
                <div className="space-y-1">
                  <p className="font-semibold">Sync Complete</p>
                  <p>Successfully synced: {result.success} devices</p>
                  {result.errors > 0 && <p className="text-destructive">Errors: {result.errors} devices</p>}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </Card>
    </div>
  )
}
