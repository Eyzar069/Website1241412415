"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react"
import { put } from "@vercel/blob"

interface CustomDeviceUploadProps {
  onBack: () => void
}

export function CustomDeviceUpload({ onBack }: CustomDeviceUploadProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    deviceName: "",
    deviceBrand: "",
    deviceModel: "",
    description: "",
  })
  const [images, setImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Upload images to Vercel Blob
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const blob = await put(image.name, image, {
            access: "public",
          })
          return blob.url
        }),
      )

      // Submit form data to API
      const response = await fetch("/api/submit-custom-device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageUrls,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Es gab einen Fehler beim Absenden. Bitte versuchen Sie es erneut.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Vielen Dank!</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unsere Mitarbeiter schauen sich Ihr Gerät an und geben Ihnen rechtzeitig Bescheid!
            </p>
            <Button onClick={onBack} size="lg">
              Zurück zur Startseite
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zu Kategorien
        </button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Gerät hochladen</h1>
          <p className="text-lg text-muted-foreground">
            Füllen Sie das Formular aus und laden Sie Bilder Ihres Geräts hoch
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">Vorname *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nachname *</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Geräteinformationen</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="deviceName">Gerätename *</Label>
                  <Input
                    id="deviceName"
                    name="deviceName"
                    placeholder="z.B. iPhone 15 Pro"
                    value={formData.deviceName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="deviceBrand">Marke</Label>
                    <Input
                      id="deviceBrand"
                      name="deviceBrand"
                      placeholder="z.B. Apple"
                      value={formData.deviceBrand}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deviceModel">Modellnummer</Label>
                    <Input
                      id="deviceModel"
                      name="deviceModel"
                      placeholder="z.B. A2848"
                      value={formData.deviceModel}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Beschreibung</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Beschreiben Sie den Zustand und besondere Merkmale Ihres Geräts..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Bilder hochladen *</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      required
                    />
                    <Label htmlFor="images" className="cursor-pointer">
                      <span className="text-primary font-semibold">Klicken Sie hier</span> oder ziehen Sie Bilder
                      hierher
                    </Label>
                    {images.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {images.length} {images.length === 1 ? "Bild" : "Bilder"} ausgewählt
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={onBack}>
                Abbrechen
              </Button>
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? "Wird hochgeladen..." : "Gerät einreichen"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
