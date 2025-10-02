import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DatenschutzPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>

      <Card className="mb-6">
        <CardContent className="prose prose-sm max-w-none pt-6">
          <p className="mb-4">
            Personenbezogene Daten (nachfolgend zumeist nur „Daten" genannt) werden von uns nur im Rahmen der
            Erforderlichkeit sowie zum Zwecke der Bereitstellung eines funktionsfähigen und nutzerfreundlichen
            Internetauftritts, inklusive seiner Inhalte und der dort angebotenen Leistungen, verarbeitet.
          </p>

          <p className="mb-4">
            Gemäß Art. 4 Ziffer 1. der Verordnung (EU) 2016/679, also der Datenschutz-Grundverordnung (nachfolgend nur
            „DSGVO" genannt), gilt als „Verarbeitung" jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführter
            Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten, wie das Erheben, das
            Erfassen, die Organisation, das Ordnen, die Speicherung, die Anpassung oder Veränderung, das Auslesen, das
            Abfragen, die Verwendung, die Offenlegung durch Übermittlung, Verbreitung oder eine andere Form der
            Bereitstellung, den Abgleich oder die Verknüpfung, die Einschränkung, das Löschen oder die Vernichtung.
          </p>

          <p className="mb-4">
            Mit der nachfolgenden Datenschutzerklärung informieren wir Sie insbesondere über Art, Umfang, Zweck, Dauer
            und Rechtsgrundlage der Verarbeitung personenbezogener Daten, soweit wir entweder allein oder gemeinsam mit
            anderen über die Zwecke und Mittel der Verarbeitung entscheiden. Zudem informieren wir Sie nachfolgend über
            die von uns zu Optimierungszwecken sowie zur Steigerung der Nutzungsqualität eingesetzten Fremdkomponenten,
            soweit hierdurch Dritte Daten in wiederum eigener Verantwortung verarbeiten.
          </p>

          <p className="mb-6">Unsere Datenschutzerklärung ist wie folgt gegliedert:</p>

          <ul className="list-disc pl-6 mb-6">
            <li>I. Informationen über uns als Verantwortliche</li>
            <li>II. Rechte der Nutzer und Betroffenen</li>
            <li>III. Informationen zur Datenverarbeitung</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>I. Informationen über uns als Verantwortliche</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            <strong>Mr Phone GmbH</strong>
          </p>
          <p className="mb-2">Lärchenstr. 78</p>
          <p className="mb-4">65933 Frankfurt</p>
          <p className="mb-2">
            <strong>Vertreten durch:</strong>
          </p>
          <p>Ali Shah</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>II. Rechte der Nutzer und Betroffenen</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p className="mb-4">
            Mit Blick auf die nachfolgend noch näher beschriebene Datenverarbeitung haben die Nutzer und Betroffenen das
            Recht
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              auf Bestätigung, ob sie betreffende Daten verarbeitet werden, auf Auskunft über die verarbeiteten Daten,
              auf weitere Informationen über die Datenverarbeitung sowie auf Kopien der Daten (vgl. auch Art. 15 DSGVO);
            </li>
            <li>
              auf Berichtigung oder Vervollständigung unrichtiger bzw. unvollständiger Daten (vgl. auch Art. 16 DSGVO);
            </li>
            <li>
              auf unverzügliche Löschung der sie betreffenden Daten (vgl. auch Art. 17 DSGVO), oder, alternativ, soweit
              eine weitere Verarbeitung gemäß Art. 17 Abs. 3 DSGVO erforderlich ist, auf Einschränkung der Verarbeitung
              nach Maßgabe von Art. 18 DSGVO;
            </li>
            <li>
              auf Erhalt der sie betreffenden und von ihnen bereitgestellten Daten und auf Übermittlung dieser Daten an
              andere Anbieter/Verantwortliche (vgl. auch Art. 20 DSGVO);
            </li>
            <li>
              auf Beschwerde gegenüber der Aufsichtsbehörde, sofern sie der Ansicht sind, dass die sie betreffenden
              Daten durch den Anbieter unter Verstoß gegen datenschutzrechtliche Bestimmungen verarbeitet werden (vgl.
              auch Art. 77 DSGVO).
            </li>
          </ul>

          <p className="mb-4">
            Darüber hinaus ist der Anbieter dazu verpflichtet, alle Empfänger, denen gegenüber Daten durch den Anbieter
            offengelegt worden sind, über jedwede Berichtigung oder Löschung von Daten oder die Einschränkung der
            Verarbeitung, die aufgrund der Artikel 16, 17 Abs. 1, 18 DSGVO erfolgt, zu unterrichten. Diese Verpflichtung
            besteht jedoch nicht, soweit diese Mitteilung unmöglich oder mit einem unverhältnismäßigen Aufwand verbunden
            ist. Unbeschadet dessen hat der Nutzer ein Recht auf Auskunft über diese Empfänger.
          </p>

          <p>
            Ebenfalls haben die Nutzer und Betroffenen nach Art. 21 DSGVO das Recht auf Widerspruch gegen die künftige
            Verarbeitung der sie betreffenden Daten, sofern die Daten durch den Anbieter nach Maßgabe von Art. 6 Abs. 1
            lit. f) DSGVO verarbeitet werden. Insbesondere ist ein Widerspruch gegen die Datenverarbeitung zum Zwecke
            der Direktwerbung statthaft.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>III. Informationen zur Datenverarbeitung</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none space-y-6">
          <p>
            Ihre bei Nutzung unseres Internetauftritts verarbeiteten Daten werden gelöscht oder gesperrt, sobald der
            Zweck der Speicherung entfällt, der Löschung der Daten keine gesetzlichen Aufbewahrungspflichten
            entgegenstehen und nachfolgend keine anderslautenden Angaben zu einzelnen Verarbeitungsverfahren gemacht
            werden.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-3">Cookies</h3>

            <h4 className="font-semibold mb-2">a) Sitzungs-Cookies/Session-Cookies</h4>
            <p className="mb-3">
              Wir verwenden mit unserem Internetauftritt sog. Cookies. Cookies sind kleine Textdateien oder andere
              Speichertechnologien, die durch den von Ihnen eingesetzten Internet-Browser auf Ihrem Endgerät ablegt und
              gespeichert werden. Durch diese Cookies werden im individuellen Umfang bestimmte Informationen von Ihnen,
              wie beispielsweise Ihre Browser- oder Standortdaten oder Ihre IP-Adresse, verarbeitet.
            </p>
            <p className="mb-3">
              Durch diese Verarbeitung wird unser Internetauftritt benutzerfreundlicher, effektiver und sicherer, da die
              Verarbeitung bspw. die Wiedergabe unseres Internetauftritts in unterschiedlichen Sprachen oder das Angebot
              einer Warenkorbfunktion ermöglicht.
            </p>
            <p className="mb-3">
              Rechtsgrundlage dieser Verarbeitung ist Art. 6 Abs. 1 lit b.) DSGVO, sofern diese Cookies Daten zur
              Vertragsanbahnung oder Vertragsabwicklung verarbeitet werden.
            </p>
            <p className="mb-3">
              Falls die Verarbeitung nicht der Vertragsanbahnung oder Vertragsabwicklung dient, liegt unser berechtigtes
              Interesse in der Verbesserung der Funktionalität unseres Internetauftritts. Rechtsgrundlage ist in dann
              Art. 6 Abs. 1 lit. f) DSGVO.
            </p>
            <p className="mb-4">Mit Schließen Ihres Internet-Browsers werden diese Session-Cookies gelöscht.</p>

            <h4 className="font-semibold mb-2">b) Drittanbieter-Cookies</h4>
            <p className="mb-3">
              Gegebenenfalls werden mit unserem Internetauftritt auch Cookies von Partnerunternehmen, mit denen wir zum
              Zwecke der Werbung, der Analyse oder der Funktionalitäten unseres Internetauftritts zusammenarbeiten,
              verwendet.
            </p>
            <p className="mb-4">
              Die Einzelheiten hierzu, insbesondere zu den Zwecken und den Rechtsgrundlagen der Verarbeitung solcher
              Drittanbieter-Cookies, entnehmen Sie bitte den nachfolgenden Informationen.
            </p>

            <h4 className="font-semibold mb-2">c) Beseitigungsmöglichkeit</h4>
            <p className="mb-3">
              Sie können die Installation der Cookies durch eine Einstellung Ihres Internet-Browsers verhindern oder
              einschränken. Ebenfalls können Sie bereits gespeicherte Cookies jederzeit löschen. Die hierfür
              erforderlichen Schritte und Maßnahmen hängen jedoch von Ihrem konkret genutzten Internet-Browser ab. Bei
              Fragen benutzen Sie daher bitte die Hilfefunktion oder Dokumentation Ihres Internet-Browsers oder wenden
              sich an dessen Hersteller bzw. Support. Bei sog. Flash-Cookies kann die Verarbeitung allerdings nicht über
              die Einstellungen des Browsers unterbunden werden. Stattdessen müssen Sie insoweit die Einstellung Ihres
              Flash-Players ändern. Auch die hierfür erforderlichen Schritte und Maßnahmen hängen von Ihrem konkret
              genutzten Flash-Player ab. Bei Fragen benutzen Sie daher bitte ebenso die Hilfefunktion oder Dokumentation
              Ihres Flash-Players oder wenden sich an den Hersteller bzw. Benutzer-Support.
            </p>
            <p>
              Sollten Sie die Installation der Cookies verhindern oder einschränken, kann dies allerdings dazu führen,
              dass nicht sämtliche Funktionen unseres Internetauftritts vollumfänglich nutzbar sind.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Kontaktanfragen / Kontaktmöglichkeit</h3>
            <p className="mb-3">
              Sofern Sie per Kontaktformular oder E-Mail mit uns in Kontakt treten, werden die dabei von Ihnen
              angegebenen Daten zur Bearbeitung Ihrer Anfrage genutzt. Die Angabe der Daten ist zur Bearbeitung und
              Beantwortung Ihre Anfrage erforderlich – ohne deren Bereitstellung können wir Ihre Anfrage nicht oder
              allenfalls eingeschränkt beantworten.
            </p>
            <p className="mb-3">Rechtsgrundlage für diese Verarbeitung ist Art. 6 Abs. 1 lit. b) DSGVO.</p>
            <p>
              Ihre Daten werden gelöscht, sofern Ihre Anfrage abschließend beantwortet worden ist und der Löschung keine
              gesetzlichen Aufbewahrungspflichten entgegenstehen, wie bspw. bei einer sich etwaig anschließenden
              Vertragsabwicklung.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
            <p className="mb-3">
              Falls Sie sich für unseren kostenlosen Newsletter anmelden, werden die von Ihnen hierzu abgefragten Daten,
              also Ihre E-Mail-Adresse sowie – optional – Ihr Name und Ihre Anschrift, an uns übermittelt. Gleichzeitig
              speichern wir die IP-Adresse des Internetanschlusses von dem aus Sie auf unseren Internetauftritt
              zugreifen sowie Datum und Uhrzeit Ihrer Anmeldung. Im Rahmen des weiteren Anmeldevorgangs werden wir Ihre
              Einwilligung in die Übersendung des Newsletters einholen, den Inhalt konkret beschreiben und auf diese
              Datenschutzerklärung verwiesen. Die dabei erhobenen Daten verwenden wir ausschließlich für den
              Newsletter-Versand – sie werden deshalb insbesondere auch nicht an Dritte weitergegeben.
            </p>
            <p className="mb-3">Rechtsgrundlage hierbei ist Art. 6 Abs. 1 lit. a) DSGVO.</p>
            <p>
              Die Einwilligung in den Newsletter-Versand können Sie gemäß Art. 7 Abs. 3 DSGVO jederzeit mit Wirkung für
              die Zukunft widerrufen. Hierzu müssen Sie uns lediglich über Ihren Widerruf in Kenntnis setzen oder den in
              jedem Newsletter enthaltenen Abmeldelink betätigen.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Facebook</h3>
            <p className="mb-3">
              Zur Bewerbung unserer Produkte und Leistungen sowie zur Kommunikation mit Interessenten oder Kunden
              betreiben wir eine Firmenpräsenz auf der Plattform Facebook.
            </p>
            <p className="mb-3">
              Auf dieser Social-Media-Plattform sind wir gemeinsam mit der Meta Platforms Ireland Limited, 4 Grand Canal
              Square, Dublin 2, Irland, verantwortlich.
            </p>
            <p className="mb-3">
              Der Datenschutzbeauftragte von Facebook kann über ein Kontaktformular erreicht werden:
              <br />
              <a
                href="https://www.facebook.com/help/contact/540977946302970"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.facebook.com/help/contact/540977946302970
              </a>
            </p>
            <p className="mb-3">
              Die gemeinsame Verantwortlichkeit haben wir in einer Vereinbarung bezüglich der jeweiligen Verpflichtungen
              im Sinne der DSGVO geregelt. Diese Vereinbarung, aus der sich die gegenseitigen Verpflichtungen ergeben,
              ist unter dem folgenden Link abrufbar:
              <br />
              <a
                href="https://www.facebook.com/legal/terms/page_controller_addendum"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.facebook.com/legal/terms/page_controller_addendum
              </a>
            </p>
            <p className="mb-3">
              Rechtsgrundlage für die dadurch erfolgende und nachfolgend wiedergegebene Verarbeitung von
              personenbezogenen Daten ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht an der
              Analyse, der Kommunikation sowie dem Absatz und der Bewerbung unserer Produkte und Leistungen.
            </p>
            <p className="mb-3">
              Rechtsgrundlage kann auch eine Einwilligung des Nutzers gemäß Art. 6 Abs. 1 lit. a DSGVO gegenüber dem
              Plattformbetreiber sein. Die Einwilligung hierzu kann der Nutzer nach Art. 7 Abs. 3 DSGVO jederzeit durch
              eine Mitteilung an den Plattformbetreiber für die Zukunft widerrufen.
            </p>
            <p className="mb-3">
              Bei dem Aufruf unseres Onlineauftritts auf der Plattform Facebook werden von der Facebook Ireland Ltd. als
              Betreiberin der Plattform in der EU Daten des Nutzers (z.B. persönliche Informationen, IP-Adresse etc.)
              verarbeitet.
            </p>
            <p className="mb-3">
              Diese Daten des Nutzers dienen zu statistischen Informationen über die Inanspruchnahme unserer
              Firmenpräsenz auf Facebook. Die Facebook Ireland Ltd. nutzt diese Daten zu Marktforschungs- und
              Werbezwecken sowie zur Erstellung von Profilen der Nutzer. Anhand dieser Profile ist es der Facebook
              Ireland Ltd. beispielsweise möglich, die Nutzer innerhalb und außerhalb von Facebook interessenbezogen zu
              bewerben. Ist der Nutzer zum Zeitpunkt des Aufrufes in seinem Account auf Facebook eingeloggt, kann die
              Facebook Ireland Ltd. zudem die Daten mit dem jeweiligen Nutzerkonto verknüpfen.
            </p>
            <p className="mb-3">
              Im Falle einer Kontaktaufnahme des Nutzers über Facebook werden die bei dieser Gelegenheit eingegebenen
              personenbezogenen Daten des Nutzers zur Bearbeitung der Anfrage genutzt. Die Daten des Nutzers werden bei
              uns gelöscht, sofern die Anfrage des Nutzers abschließend beantwortet wurde und keine gesetzlichen
              Aufbewahrungspflichten, wie z.B. bei einer anschließenden Vertragsabwicklung, entgegenstehen.
            </p>
            <p className="mb-3">
              Zur Verarbeitung der Daten werden von der Facebook Ireland Ltd. ggf. auch Cookies gesetzt.
            </p>
            <p className="mb-3">
              Sollte der Nutzer mit dieser Verarbeitung nicht einverstanden sein, so besteht die Möglichkeit, die
              Installation der Cookies durch eine entsprechende Einstellung des Browsers zu verhindern. Bereits
              gespeicherte Cookies können ebenfalls jederzeit gelöscht werden. Die Einstellungen hierzu sind vom
              jeweiligen Browser abhängig. Bei Flash-Cookies lässt sich die Verarbeitung nicht über die Einstellungen
              des Browsers unterbinden, sondern durch die entsprechende Einstellung des Flash-Players. Sollte der Nutzer
              die Installation der Cookies verhindern oder einschränken, kann dies dazu führen, dass nicht sämtliche
              Funktionen von Facebook vollumfänglich nutzbar sind.
            </p>
            <p className="mb-3">
              Näheres zu den Verarbeitungstätigkeiten, deren Unterbindung und zur Löschung der von Facebook
              verarbeiteten Daten finden sich in der Datenrichtlinie von Facebook:
              <br />
              <a
                href="https://www.facebook.com/privacy/explanation"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.facebook.com/privacy/explanation
              </a>
            </p>
            <p>
              Es ist nicht ausgeschlossen, dass die Verarbeitung durch die Meta Platforms Ireland Limited auch über die
              Meta Platforms, Inc., 1601 Willow Road, Menlo Park, California 94025 in den USA erfolgt.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Instagram</h3>
            <p className="mb-3">
              Zur Bewerbung unserer Produkte und Leistungen sowie zur Kommunikation mit Interessenten oder Kunden
              betreiben wir eine Firmenpräsenz auf der Plattform Instagram.
            </p>
            <p className="mb-3">
              Auf dieser Social-Media-Plattform sind wir gemeinsam mit der Meta Platforms Ireland Limited, 4 Grand Canal
              Square, Dublin 2, Irland, verantwortlich.
            </p>
            <p className="mb-3">
              Der Datenschutzbeauftragte von Instagram kann über ein Kontaktformular erreicht werden:
              <br />
              <a
                href="https://www.facebook.com/help/contact/540977946302970"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.facebook.com/help/contact/540977946302970
              </a>
            </p>
            <p className="mb-3">
              Die gemeinsame Verantwortlichkeit haben wir in einer Vereinbarung bezüglich der jeweiligen Verpflichtungen
              im Sinne der DSGVO geregelt. Diese Vereinbarung, aus der sich die gegenseitigen Verpflichtungen ergeben,
              ist unter dem folgenden Link abrufbar:
              <br />
              <a
                href="https://www.facebook.com/legal/terms/page_controller_addendum"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.facebook.com/legal/terms/page_controller_addendum
              </a>
            </p>
            <p className="mb-3">
              Rechtsgrundlage für die dadurch erfolgende und nachfolgend wiedergegebene Verarbeitung von
              personenbezogenen Daten ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht an der
              Analyse, der Kommunikation sowie dem Absatz und der Bewerbung unserer Produkte und Leistungen.
            </p>
            <p className="mb-3">
              Rechtsgrundlage kann auch eine Einwilligung des Nutzers gemäß Art. 6 Abs. 1 lit. a DSGVO gegenüber dem
              Plattformbetreiber sein. Die Einwilligung hierzu kann der Nutzer nach Art. 7 Abs. 3 DSGVO jederzeit durch
              eine Mitteilung an den Plattformbetreiber für die Zukunft widerrufen.
            </p>
            <p className="mb-3">
              Bei dem Aufruf unseres Onlineauftritts auf der Plattform Instagram werden von der Facebook Ireland Ltd.
              als Betreiberin der Plattform in der EU Daten des Nutzers (z.B. persönliche Informationen, IP-Adresse
              etc.) verarbeitet.
            </p>
            <p className="mb-3">
              Diese Daten des Nutzers dienen zu statistischen Informationen über die Inanspruchnahme unserer
              Firmenpräsenz auf Instagram. Die Facebook Ireland Ltd. nutzt diese Daten zu Marktforschungs- und
              Werbezwecken sowie zur Erstellung von Profilen der Nutzer. Anhand dieser Profile ist es der Facebook
              Ireland Ltd. beispielsweise möglich, die Nutzer innerhalb und außerhalb von Instagram interessenbezogen zu
              bewerben. Ist der Nutzer zum Zeitpunkt des Aufrufes in seinem Account auf Instagram eingeloggt, kann die
              Facebook Ireland Ltd. zudem die Daten mit dem jeweiligen Nutzerkonto verknüpfen.
            </p>
            <p className="mb-3">
              Im Falle einer Kontaktaufnahme des Nutzers über Instagram werden die bei dieser Gelegenheit eingegebenen
              personenbezogenen Daten des Nutzers zur Bearbeitung der Anfrage genutzt. Die Daten des Nutzers werden bei
              uns gelöscht, sofern die Anfrage des Nutzers abschließend beantwortet wurde und keine gesetzlichen
              Aufbewahrungspflichten, wie z.B. bei einer anschließenden Vertragsabwicklung, entgegenstehen.
            </p>
            <p className="mb-3">
              Zur Verarbeitung der Daten werden von der Facebook Ireland Ltd. ggf. auch Cookies gesetzt.
            </p>
            <p className="mb-3">
              Sollte der Nutzer mit dieser Verarbeitung nicht einverstanden sein, so besteht die Möglichkeit, die
              Installation der Cookies durch eine entsprechende Einstellung des Browsers zu verhindern. Bereits
              gespeicherte Cookies können ebenfalls jederzeit gelöscht werden. Die Einstellungen hierzu sind vom
              jeweiligen Browser abhängig. Bei Flash-Cookies lässt sich die Verarbeitung nicht über die Einstellungen
              des Browsers unterbinden, sondern durch die entsprechende Einstellung des Flash-Players. Sollte der Nutzer
              die Installation der Cookies verhindern oder einschränken, kann dies dazu führen, dass nicht sämtliche
              Funktionen von Facebook vollumfänglich nutzbar sind.
            </p>
            <p className="mb-3">
              Näheres zu den Verarbeitungstätigkeiten, deren Unterbindung und zur Löschung der von Instagram
              verarbeiteten Daten finden sich in der Datenrichtlinie von Instagram:
              <br />
              <a
                href="https://help.instagram.com/519522125107875"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://help.instagram.com/519522125107875
              </a>
            </p>
            <p>
              Es ist nicht ausgeschlossen, dass die Verarbeitung durch die Facebook Ireland Ltd. auch über die Meta
              Platforms, Inc., 1601 Willow Road, Menlo Park, California 94025 in den USA erfolgt.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Social Media Links</h3>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">facebook</h4>
              <p className="mb-1">Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland.</p>
              <p>
                Datenschutzerklärung:{" "}
                <a
                  href="https://www.facebook.com/policy.php"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.facebook.com/policy.php
                </a>
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Instagram</h4>
              <p className="mb-1">Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland.</p>
              <p>
                Datenschutzerklärung:{" "}
                <a
                  href="https://help.instagram.com/519522125107875"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://help.instagram.com/519522125107875
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Google reCAPTCHA</h3>
            <p className="mb-3">
              In unserem Internetauftritt setzen wir Google reCAPTCHA zur Überprüfung und Vermeidung von Interaktionen
              auf unserer Internetseite durch automatisierte Zugriffe, bspw. durch sog. Bots, ein. Es handelt sich
              hierbei um einen Dienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland,
              nachfolgend nur „Google" genannt.
            </p>
            <p className="mb-3">
              Durch diesen Dienst kann Google ermitteln, von welcher Webseite eine Anfrage gesendet wird sowie von
              welcher IP-Adresse aus Sie die sog. reCAPTCHA-Eingabebox verwenden. Neben Ihrer IP-Adresse werden
              womöglich noch weitere Informationen durch Google erfasst, die für das Angebot und die Gewährleistung
              dieses Dienstes notwendig sind.
            </p>
            <p className="mb-3">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f) DSGVO. Unser berechtigtes Interesse liegt in der Sicherheit
              unseres Internetauftritts sowie in der Abwehr unerwünschter, automatisierter Zugriffe in Form von Spam
              o.ä..
            </p>
            <p>
              Google bietet unter{" "}
              <a
                href="https://policies.google.com/privacy"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>{" "}
              weitergehende Informationen zu dem allgemeinen Umgang mit Ihren Nutzerdaten an.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Google-Maps</h3>
            <p className="mb-3">
              In unserem Internetauftritt setzen wir Google Maps zur Darstellung unseres Standorts sowie zur Erstellung
              einer Anfahrtsbeschreibung ein. Es handelt sich hierbei um einen Dienst der Google Ireland Limited, Gordon
              House, Barrow Street, Dublin 4, Irland, nachfolgend nur „Google" genannt.
            </p>
            <p className="mb-3">
              Um die Darstellung bestimmter Schriften in unserem Internetauftritt zu ermöglichen, wird bei Aufruf
              unseres Internetauftritts eine Verbindung zu dem Google-Server in den USA aufgebaut.
            </p>
            <p className="mb-3">
              Sofern Sie die in unseren Internetauftritt eingebundene Komponente Google Maps aufrufen, speichert Google
              über Ihren Internet-Browser ein Cookie auf Ihrem Endgerät. Um unseren Standort anzuzeigen und eine
              Anfahrtsbeschreibung zu erstellen, werden Ihre Nutzereinstellungen und -daten verarbeitet. Hierbei können
              wir nicht ausschließen, dass Google Server in den USA einsetzt.
            </p>
            <p className="mb-3">
              Im Falle einer von Ihnen erteilten Einwilligung für diese Verarbeitung ist Rechtsgrundlage Art. 6 Abs. 1
              lit. a DSGVO. Rechtsgrundlage kann auch Art. 6 Abs. 1 lit. f DSGVO sein. Unser berechtigtes Interesse
              liegt in der Optimierung der Funktionalität unseres Internetauftritts.
            </p>
            <p className="mb-3">
              Durch die so hergestellte Verbindung zu Google kann Google ermitteln, von welcher Website Ihre Anfrage
              gesendet worden ist und an welche IP-Adresse die Anfahrtsbeschreibung zu übermitteln ist.
            </p>
            <p className="mb-3">
              Sofern Sie mit dieser Verarbeitung nicht einverstanden sind, haben Sie die Möglichkeit, die Installation
              der Cookies durch die entsprechenden Einstellungen in Ihrem Internet-Browser zu verhindern. Einzelheiten
              hierzu finden Sie vorstehend unter dem Punkt „Cookies".
            </p>
            <p className="mb-3">
              Zudem erfolgt die Nutzung von Google Maps sowie der über Google Maps erlangten Informationen nach den
              Google-Nutzungsbedingungen{" "}
              <a
                href="https://policies.google.com/terms?gl=DE&hl=de"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/terms?gl=DE&hl=de
              </a>{" "}
              und den Geschäftsbedingungen für Google Maps{" "}
              <a
                href="https://www.google.com/intl/de_de/help/terms_maps.html"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.google.com/intl/de_de/help/terms_maps.html
              </a>
              .
            </p>
            <p>
              Überdies bietet Google unter{" "}
              <a
                href="https://adssettings.google.com/authenticated"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://adssettings.google.com/authenticated
              </a>{" "}
              und{" "}
              <a
                href="https://policies.google.com/privacy"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>{" "}
              weitergehende Informationen an.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">WhatsApp Kontaktaufnahme</h3>
            <p className="mb-3">
              Zur Kontaktaufnahme ermöglicht der Anbieter dem Kunden unter anderem die Kontaktmöglichkeit über den
              Messenger-Dienst WhatsApp. WhatsApp ist ein Dienst der WhatsApp Ireland Limited, 4 Grand Canal Square,
              Grand Canal Harbour, Dublin 2, Irland, nachfolgend WhatsApp, eine Tochtergesellschaft von Facebook.
            </p>
            <p className="mb-3">
              Durch die Kommunikation des Nutzers mit dem Anbieter über WhatsApp erhält sowohl der Anbieter, als auch
              WhatsApp die Mobilrufnummer des Nutzers und die Information, dass der Nutzer den Anbieter kontaktiert hat.
            </p>
            <p className="mb-3">
              Die vorgenannten Daten werden von WhatsApp auch an Server von Facebook in den USA weitergeleitet und von
              WhatsApp und Facebook entsprechend der WhatsApp-Datenschutzrichtlinie verarbeitet, was auch die
              Verarbeitung zu deren eigenen Zwecken, wie der Verbesserung des WhatsApp-Dienstes, beinhaltet.
            </p>
            <p className="mb-3">
              Die USA verfügen gegenwärtig nach Ansicht der Datenschutzaufsichtsbehörden allerdings nicht über ein
              angemessenes Datenschutzniveau. Es bestehen allerdings sogenannte Standardvertragsklauseln:
              <br />
              <a
                href="https://faq.whatsapp.com/general/about-standard-contractual-clauses"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://faq.whatsapp.com/general/about-standard-contractual-clauses
              </a>
            </p>
            <p className="mb-3">
              Jedoch sind dies privatrechtliche Vereinbarungen und haben daher keine direkte Auswirkung auf die
              Zugriffsmöglichkeiten der Behörden in den USA.
            </p>
            <p className="mb-3">
              Näheres zum Zweck und Umfang der Datenerhebung und der weiteren Verarbeitung dieser Daten durch WhatsApp
              und Facebook sowie diesbezügliche Rechte und Einstellungsmöglichkeiten zum Schutz der Privatsphäre sind in
              der Datenschutzrichtlinie von WhatsApp enthalten:
              <br />
              <a
                href="https://www.whatsapp.com/legal/#privacy-policy"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.whatsapp.com/legal/#privacy-policy
              </a>
            </p>
            <p>
              Rechtsgrundlage dieser Verarbeitungen und der Übermittlung an WhatsApp ist Art. 6 Abs. 1 S. 1 b. DSGVO,
              soweit die Kontaktaufnahme eine bestehende Vertragsbeziehung betrifft oder der Anbahnung einer solchen
              Vertragsbeziehung dient. Sollte die Kontaktaufnahme nicht aufgrund der vorstehenden Zwecke erfolgen, ist
              Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse des Anbieters besteht an der
              Verbesserung der Servicequalität.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
