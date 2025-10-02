import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Search, ClipboardCheck, Package, CheckCircle, Euro } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Wie es funktioniert</h1>
            <p className="text-xl text-muted-foreground">In nur 5 einfachen Schritten zu Ihrem Geld</p>
          </div>

          <div className="space-y-12">
            <StepCard
              number={1}
              icon={Search}
              title="Gerät auswählen"
              description="Wählen Sie Ihr Gerät aus unserem umfangreichen Katalog mit über 100 Modellen von Apple, Samsung, Google und vielen weiteren Marken."
            />

            <StepCard
              number={2}
              icon={ClipboardCheck}
              title="Zustand bewerten"
              description="Beantworten Sie einige Fragen zum Zustand Ihres Geräts. Unsere intelligente Preisberechnung berücksichtigt Alter, Zustand und aktuelle Marktwerte."
            />

            <StepCard
              number={3}
              icon={Euro}
              title="Sofortiges Angebot erhalten"
              description="Erhalten Sie ein transparentes, faires Angebot basierend auf Ihren Angaben. Das Angebot ist 14 Tage gültig und unverbindlich."
            />

            <StepCard
              number={4}
              icon={Package}
              title="Kostenlos versenden"
              description="Laden Sie Ihr kostenloses, versichertes DHL-Versandlabel herunter. Verpacken Sie Ihr Gerät sicher und geben Sie es bei einer DHL-Filiale ab."
            />

            <StepCard
              number={5}
              icon={CheckCircle}
              title="Geld erhalten"
              description="Nach Prüfung Ihres Geräts (1-2 Werktage) erfolgt die Auszahlung per PayPal (1-2 Werktage) oder Banküberweisung (2-3 Werktage)."
            />
          </div>

          <Card className="p-8 mt-16 bg-primary/5 border-primary/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Bereit zu starten?</h2>
              <p className="text-muted-foreground mb-6">
                Verkaufen Sie Ihr Gerät jetzt und erhalten Sie innerhalb weniger Tage Ihr Geld
              </p>
              <Button asChild size="lg">
                <Link href="/verkaufen">
                  Jetzt verkaufen <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StepCard({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: number
  icon: any
  title: string
  description: string
}) {
  return (
    <Card className="p-8 border-2">
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
            {number}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Icon className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">{title}</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  )
}
