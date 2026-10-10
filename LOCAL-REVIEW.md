# Universelle Verknüpfungen: Prüfanleitung

Stand: 10.10.2026. Lokal implementiert und geprüft; öffentliche Veröffentlichung ausdrücklich freigegeben.

## Ausprobieren

`index.html` lässt sich direkt im Browser öffnen. Für einen stabilen lokalen Demospeicher einen statischen Server verwenden, beispielsweise `python -m http.server 4173`, dann `http://localhost:4173/#/cases/vg1` aufrufen.

1. Den Vorgang **Wasserschaden · Lindenbogen 12** öffnen (auch über die neue Einstiegskarte bei Immobilien erreichbar).
2. Unter **Verknüpfungen** sind Gebäude, Einheit, Kontakt, Rechnung, Dokument und Aufgabe vorhanden. Jeder Eintrag öffnet seine Detailansicht mit derselben Komponente und der Gegenverbindung.
3. **Hinzufügen** → „Müller“ suchen → Modul **Kontakte**. Fünf unterscheidbare Kontakte, darunter zweimal Anna Müller: Mieterin am Lindenbogen und Eigentümerin am Gartenwinkel. Rolle, Objektbezug, Ort, E-Mail und ID unterscheiden die Personen.
4. Nach Immobilie und Rolle eingrenzen. „Mueller“ sowie kombinierte Begriffe wie „Müller Gartenwinkel“ ausprobieren. Namensübereinstimmungen erhalten Vorrang, anschließend der Bezug zur aktuellen Immobilie.
5. Mehrere Treffer auswählen; die Auswahl bleibt bei neuen Filtern erhalten und kann über einzelne Chips korrigiert werden. Eine gemeinsame optionale Beziehungsbeschreibung ergänzen und verknüpfen.
6. Gegenverbindung öffnen, entfernen, zur ursprünglichen Seite zurückkehren. Nur die freie Verbindung verschwindet. Bestehende Datensätze und fachliche Zuordnungen bleiben erhalten.

## Umfang

- Dieselbe Verknüpfungskomponente in allen zehn Modulen, auch für neu angelegte Datensätze.
- Freie Verbindungen zwischen beliebigen Datensatztypen und innerhalb desselben Typs; keine Selbstverknüpfung und keine doppelten Gegenrichtungen.
- Stammdatenzuordnungen bleiben getrennt. Bestehende Gebäude-, Einheiten- und Vertragszuordnungen sind als **Feste fachliche Zuordnungen** gekennzeichnet. Neue fachliche Immobilienbezüge werden in den Stammdaten gepflegt.
- Zusätzliche synthetische Daten: fünf Müller-Kontakte, vier Vorgänge, zwei Rechnungen, zwei Dokumente, zwei Aufgaben und zwei simulierte Nutzerprofile. Die sechs vorhandenen Immobilien bleiben erhalten.
- **Test-Nutzer** sind nur klickbare Demo-Datensätze. Keine Anmeldung, Kontenanlage oder Rechteverwaltung. Dokumente und Rechnungen haben keine echten Anhänge oder Zahlungsfunktionen.
- Vorhandene v2-Demodaten werden beim Laden ergänzt, nicht überschrieben. Verknüpfungen werden mit demselben lokalen Speicherstand gespeichert. „Beispieldaten zurücksetzen“ setzt auch die Erweiterung zurück.

## Durchgeführte Prüfung

Automatisierte Browserprüfung mit lokalem Playwright und installiertem Microsoft Edge im Headless-Modus, nicht über ein GUI-Werkzeug. JavaScript-Syntaxprüfung mit Node. Echte lokale Browser-Screenshots für Desktop (1440 × 1000) und Mobilansicht (390 × 844) erzeugt und visuell geprüft.

Geprüft: alle zehn Modul-Listen und Detailrouten; sechs Ausgangsverknüpfungen; Müller-/Mueller-Suche; Modul-, Immobilien- und Rollenfilter; Mehrfachauswahl über Filterwechsel hinweg; Speichern; beidseitige Anzeige und Navigation; Neuladen; Entfernen ohne Datensatzverlust; leere Trefferliste; Escape; horizontale Überläufe auf Desktop/Mobil; vorhandene Immobilienbearbeitung und Gebäudeadressübernahme; Zurücksetzen. Keine JavaScript-Seitenfehler im erfolgreichen Testlauf.

Nicht geprüft: produktive Berechtigungen, Backend, echte Dateien, Zahlungen, mehrere gleichzeitig arbeitende Browser oder Geräte. Das sind keine Funktionen dieser statischen Demo. Die oben genannten Prüfungen beziehen sich auf den lokalen Entwurf; die Veröffentlichung wird zusätzlich auf GitHub Pages geprüft.
