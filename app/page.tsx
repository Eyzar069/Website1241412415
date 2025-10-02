import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Camera,
  Gamepad2,
  ArrowRight,
  Euro,
  Truck,
  Shield,
  Zap,
  Clock,
  Award,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Zap className="h-4 w-4" />
              Schnell, fair & sicher
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6 animate-fade-in">
              Verkaufen Sie Ihre <span className="text-primary">Elektronik</span>
              <br />
              zum fairen Preis
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Sofortiges Preisangebot, kostenloser Versand und schnelle Auszahlung. Verkaufen Sie Smartphones, Tablets,
              Laptops und mehr in nur wenigen Minuten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button
                asChild
                size="lg"
                className="text-base h-12 px-8 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-200"
              >
                <Link href="/verkaufen">
                  Jetzt verkaufen <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base h-12 px-8 border-2 hover:border-primary hover:text-primary transition-all duration-200 bg-transparent"
              >
                <Link href="/wie-es-funktioniert">Wie es funktioniert</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Euro className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Faire Preise</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Transparente Bewertung basierend auf Zustand und aktuellem Marktwert
                </p>
              </div>
            </Card>

            <Card className="p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Truck className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Kostenloser Versand</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Versandlabel per E-Mail, versicherte DHL-Lieferung inklusive
                </p>
              </div>
            </Card>

            <Card className="p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Sichere Abwicklung</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Datenlöschung nach DSGVO, schnelle und sichere Auszahlung
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Was möchten Sie verkaufen?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Wählen Sie eine Kategorie und erhalten Sie sofort ein unverbindliches Angebot
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            <Link href="/verkaufen?category=smartphone" className="group">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary hover:-translate-y-1">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Smartphone className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <span className="font-semibold group-hover:text-primary transition-colors duration-300">
                    Smartphones
                  </span>
                </div>
              </Card>
            </Link>

            <Link href="/verkaufen?category=tablet" className="group">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary hover:-translate-y-1">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Tablet className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <span className="font-semibold group-hover:text-primary transition-colors duration-300">Tablets</span>
                </div>
              </Card>
            </Link>

            <Link href="/verkaufen?category=laptop" className="group">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary hover:-translate-y-1">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Laptop className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <span className="font-semibold group-hover:text-primary transition-colors duration-300">Laptops</span>
                </div>
              </Card>
            </Link>

            <Link href="/verkaufen?category=smartwatch" className="group">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary hover:-translate-y-1">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Watch className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <span className="font-semibold group-hover:text-primary transition-colors duration-300">
                    Smartwatches
                  </span>
                </div>
              </Card>
            </Link>

            <Link href="/verkaufen?category=camera" className="group">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary hover:-translate-y-1">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Camera className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <span className="font-semibold group-hover:text-primary transition-colors duration-300">Kameras</span>
                </div>
              </Card>
            </Link>

            <Link href="/verkaufen?category=console" className="group">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary hover:-translate-y-1">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Gamepad2 className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <span className="font-semibold group-hover:text-primary transition-colors duration-300">
                    Konsolen
                  </span>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-muted/30 to-background border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">So einfach funktioniert's</h2>
            <p className="text-lg text-muted-foreground">In nur 4 Schritten zu Ihrem Geld</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center gap-5 group">
              <div className="relative">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-3xl font-bold shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300 group-hover:scale-110">
                  1
                </div>
                <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary/20 animate-pulse" />
              </div>
              <h3 className="font-semibold text-lg">Gerät auswählen</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wählen Sie Ihr Gerät und beantworten Sie Fragen zum Zustand
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-5 group">
              <div className="relative">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-3xl font-bold shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300 group-hover:scale-110">
                  2
                </div>
                <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary/20 animate-pulse" />
              </div>
              <h3 className="font-semibold text-lg">Angebot erhalten</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Erhalten Sie sofort ein faires Preisangebot
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-5 group">
              <div className="relative">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-3xl font-bold shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300 group-hover:scale-110">
                  3
                </div>
                <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary/20 animate-pulse" />
              </div>
              <h3 className="font-semibold text-lg">Kostenlos versenden</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Versandlabel ausdrucken und per DHL versenden
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-5 group">
              <div className="relative">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-3xl font-bold shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300 group-hover:scale-110">
                  4
                </div>
                <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary/20 animate-pulse" />
              </div>
              <h3 className="font-semibold text-lg">Geld erhalten</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Auszahlung per PayPal oder Banküberweisung
              </p>
            </div>
          </div>

          <div className="text-center mt-14">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-200"
            >
              <Link href="/verkaufen">
                Jetzt starten <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Beliebte Geräte</h2>
            <p className="text-lg text-muted-foreground">Häufig verkaufte Modelle mit Top-Preisen</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <PopularDeviceCard
              name="iPhone 16 Pro Max"
              variant="256GB"
              price="bis zu 850€"
              image="/iphone-16-pro-max.png"
              href="/verkaufen/iphone-16-pro-max-256gb"
            />
            <PopularDeviceCard
              name="Samsung S24 Ultra"
              variant="256GB"
              price="bis zu 720€"
              image="/samsung-galaxy-s24-ultra.png"
              href="/verkaufen/samsung-s24-ultra-256gb"
            />
            <PopularDeviceCard
              name="iPad Pro 13"
              variant="256GB WiFi"
              price="bis zu 780€"
              image="/ipad-pro-13-inch-m4.jpg"
              href="/verkaufen/ipad-pro-13-m4-256gb"
            />
            <PopularDeviceCard
              name="MacBook Air 15"
              variant="M3, 512GB"
              price="bis zu 980€"
              image="/macbook-air-15-inch-m3.jpg"
              href="/verkaufen/macbook-air-15-m3-512gb"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">24-48h</div>
              <p className="text-sm text-muted-foreground">Schnelle Auszahlung nach Prüfung</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-sm text-muted-foreground">Kundenzufriedenheit</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Sichere Datenvernichtung</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PopularDeviceCard({
  name,
  variant,
  price,
  image,
  href,
}: {
  name: string
  variant: string
  price: string
  image: string
  href: string
}) {
  return (
    <Link href={href} className="group">
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary hover:-translate-y-2">
        <div className="aspect-square bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center p-8 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-5">
          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300">{name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{variant}</p>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-primary">{price}</p>
            <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </Card>
    </Link>
  )
}
