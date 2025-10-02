import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function KontaktPage() {
  const locations = [
    { name: "Offenbach Frankfurterstraße", address: "Frankfurterstraße 1, Offenbach", phone: "015775561491" },
    { name: "Offenbach Herrnstrasse", address: "Herrnstrasse 3, Offenbach", phone: "+49 1639543609" },
    { name: "Frankfurt Kaiserstraße", address: "Kaiserstraße 68, Frankfurt", phone: "+49 6927276391" },
    { name: "Frankfurt Zeil", address: "Zeil 117, Frankfurt", phone: "+49 69 95632281" },
    { name: "Bonn", address: "Bertha von Suttner Platz 6, Bonn", phone: "+49 228 72178781" },
    { name: "Offenbach Aliceplatz", address: "Aliceplatz 3, Offenbach", phone: "+49 6985098881" },
    { name: "Augsburg", address: "Bahnhofstraße 19, Augsburg", phone: "+49 82140883533" },
    { name: "Wiesbaden", address: "Helenenstrasse 2, Wiesbaden", phone: "+49 611 3417217" },
    { name: "Mainz", address: "Steingasse 1, Mainz", phone: "+49 6131 9710830" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Kontaktieren Sie uns
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Besuchen Sie uns in einer unserer Filialen oder kontaktieren Sie uns online. Wir freuen uns darauf, Ihnen
            weiterzuhelfen!
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Unsere Filialen</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {locations.map((location, index) => (
              <Card
                key={index}
                className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold mb-2">{location.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{location.address}</p>
                      <a
                        href={`tel:${location.phone}`}
                        className="text-sm text-primary hover:underline transition-colors flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        {location.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">E-Mail</h3>
                    <a href="mailto:info@mr-phone.de" className="text-primary hover:underline transition-colors">
                      info@mr-phone.de
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Öffnungszeiten</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Montag - Freitag: 9:00 - 18:00 Uhr</p>
                      <p>Samstag: 10:00 - 14:00 Uhr</p>
                      <p>Sonntag: Geschlossen</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Nachricht senden</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Ihr Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="ihre@email.de"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Betreff
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Worum geht es?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Ihre Nachricht..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                >
                  Nachricht senden
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Häufig gestellte Fragen finden Sie in unserem FAQ-Bereich</p>
          <Button
            asChild
            variant="outline"
            className="border-primary/20 hover:bg-primary/10 hover:text-primary bg-transparent"
          >
            <Link href="/wie-es-funktioniert">Wie es funktioniert</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
