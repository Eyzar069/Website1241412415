import { Card, CardContent } from "@/components/ui/card"

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Impressum
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">Angaben gemäß § 5 TMG</p>
        </div>

        <Card className="max-w-4xl mx-auto border-border/50">
          <CardContent className="p-8 md:p-12 space-y-8">
            {/* Company Information */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Firmeninformationen</h2>
              <div className="space-y-2 text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground">Mr Phone GmbH</p>
                <p>Lärchenstr. 78</p>
                <p>65933 Frankfurt</p>
              </div>
            </section>

            {/* Representative */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Vertreten durch</h2>
              <p className="text-muted-foreground">Ali Shah</p>
            </section>

            {/* Registration */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Registereintrag</h2>
              <div className="space-y-2 text-muted-foreground leading-relaxed">
                <p>Eintragung im Handelsregister.</p>
                <p>Registergericht: Frankfurt am Main</p>
                <p>Registernummer: HRB 127887</p>
              </div>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-primary">Haftungsausschluss</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Haftung für Inhalte</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als
                    Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                    verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                    zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder
                    Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
                    diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
                    Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
                    Inhalte umgehend entfernen.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Haftung für Links</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss
                    haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte
                    der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
                    verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                    Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
                    inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
                    Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links
                    umgehend entfernen.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Urheberrecht</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                    deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                    außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                    bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                    Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden
                    die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                    Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                    entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
                    umgehend entfernen.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Datenschutz</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit
                    auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen)
                    erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne
                    Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Wir weisen darauf hin, dass die
                    Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen
                    kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. Der Nutzung
                    von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von
                    nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich
                    widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der
                    unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
                  </p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
