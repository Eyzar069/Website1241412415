import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Vielen Dank für Ihre Registrierung!</CardTitle>
            <CardDescription>Bitte bestätigen Sie Ihre E-Mail-Adresse</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Sie haben sich erfolgreich registriert. Bitte überprüfen Sie Ihr E-Mail-Postfach und bestätigen Sie Ihre
              E-Mail-Adresse, bevor Sie sich anmelden.
            </p>
            <Button asChild className="w-full">
              <Link href="/auth/login">Zur Anmeldung</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
