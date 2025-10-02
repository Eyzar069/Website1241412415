import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <img
                src="/mr-phone-logo.png"
                alt="Mr Phone"
                className="h-20 w-20 rounded-full border-2 border-primary object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ihr vertrauenswürdiger Partner für den Ankauf gebrauchter Elektronik.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Verkaufen</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/verkaufen?category=smartphone"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Smartphones
                </Link>
              </li>
              <li>
                <Link
                  href="/verkaufen?category=tablet"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Tablets
                </Link>
              </li>
              <li>
                <Link
                  href="/verkaufen?category=laptop"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  href="/verkaufen?category=smartwatch"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Smartwatches
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Informationen</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/wie-es-funktioniert"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Wie es funktioniert
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Rechtliches</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/agb" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  AGB
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/impressum"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/widerruf"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Widerrufsrecht
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MR. Phone. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground">Sicher & vertrauenswürdig</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
