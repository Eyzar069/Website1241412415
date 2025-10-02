"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Lock, AlertCircle } from "lucide-react"

export function PasswordProtection({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if password was already entered in this session
    const unlocked = sessionStorage.getItem("site_unlocked")
    if (unlocked === "true") {
      setIsUnlocked(true)
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Check password against environment variable or default
    const correctPassword = process.env.NEXT_PUBLIC_SITE_PASSWORD || "Schintali@FFM!123#"

    if (password === correctPassword) {
      sessionStorage.setItem("site_unlocked", "true")
      setIsUnlocked(true)
    } else {
      setError("Falsches Passwort")
      setPassword("")
    }
  }

  // Show loading state briefly to prevent flash
  if (isLoading) {
    return null
  }

  // If unlocked, show the actual content
  if (isUnlocked) {
    return <>{children}</>
  }

  // Show password prompt
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

      <Card className="relative w-full max-w-md mx-4 p-8 shadow-2xl border-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-3">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Passwortgeschützt</h1>
            <p className="text-sm text-muted-foreground">Bitte geben Sie das Passwort ein, um fortzufahren</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Passwort eingeben"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                className="h-12 text-lg"
                autoFocus
              />
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-base" size="lg">
              Entsperren
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
