# klar:eins · Design-Demo

Eine klickbare Arbeitsoberfläche für Immobilienverwaltung. Dieses erste **Walking Skeleton** macht das gemeinsame Basislayout, die Navigation und einfache Arbeitsabläufe in fünf Bereichen besprechbar. Es ist eine statische Design-Demo mit vollständig erfundenen Beispieldaten.

Die Demo dient als Grundlage für gemeinsame Abstimmung und Abnahme. Sie bildet weder den gesamten gewünschten Funktionsumfang ab noch legt sie die Architektur der späteren Anwendung fest.

## Lokal starten

Im Verzeichnis der Demo:

```sh
python3 -m http.server 4173
```

Anschließend [http://localhost:4173](http://localhost:4173) öffnen. Es werden nur statische HTML-, CSS- und JavaScript-Dateien ausgeliefert; ein Build-Schritt oder ein Anwendungsserver ist nicht erforderlich.

## Fünf Einstiegsmodule

| Bereich        | Bedeutung in dieser Demo                                                                                        | Beispielhafter Arbeitsablauf                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Immobilien** | Das Gesamtobjekt mit einem oder mehreren Gebäuden. Zur Anlage wird zunächst ausschließlich die Adresse erfasst. | Bestand überblicken, Immobilie anhand ihrer Adresse öffnen, Adresse anlegen oder ändern.    |
| **Gebäude**    | Ein einzelner Baukörper einer Immobilie mit Adresse und Baujahr.                                                | Gebäude finden, Adresse der Immobilie übernehmen oder abweichend erfassen, Baujahr pflegen. |
| **Einheiten**  | Eine einzeln verwaltete Einheit innerhalb eines Gebäudes: Wohnung, Ladenlokal, Garage oder Stellplatz.          | Einheit über ihre Einheitennummer finden, Einheitenart, Etage und Lage pflegen.             |
| **Kontakte**   | Personen oder Organisationen, zu denen fachliche Kontaktdaten geführt werden.                                   | Kontakt suchen, Details öffnen, Kontakt anlegen oder ändern.                                |
| **Verträge**   | Ein einfacher Datensatz zu einer Vereinbarung mit Basisangaben wie Bezug, Laufzeit und Status.                  | Vertragsübersicht prüfen, Datensatz öffnen, Basisangaben ändern.                            |

Die Orientierung lautet **Immobilie → Gebäude → Einheit**. Kontakte und Verträge können fachlich darauf Bezug nehmen. Zuordnungen in der Demo dienen der Verständlichkeit; eine vollständige Verknüpfung und alle daraus folgenden Konsistenzregeln sind noch kein Abnahmeziel. Das unten beschriebene Folgen der Gebäudeadresse bei aktivierter Adressübernahme veranschaulicht ein konkretes Demo-Verhalten. Es legt keine globale Konsistenzregel für die spätere Anwendung fest.

### Verbindliches Basismodell für Immobilien und Gebäude

Für beide Bereiche wird derselbe wiederverwendbare **Adressblock** verwendet: **Straße, Hausnummer, PLZ, Ort und Land** als getrennte Felder.

- **Immobilie:** Bei der Anlage werden zunächst nur diese fünf Adressfelder erfasst. Es gibt keinen internen Namen und kein Baujahr an der Immobilie.
- **Gebäude:** Die Stammdaten bestehen aus demselben Adressblock und dem Baujahr. Standardmäßig wird die Adresse der zugeordneten Immobilie übernommen. Solange die Adressübernahme aktiviert ist, folgt die Gebäudeadresse in der Demo auch späteren Änderungen der Immobilienadresse. Eine separat erfasste Gebäudeadresse bleibt unabhängig.
- **Nummern:** Jede Immobilie und jedes Gebäude erhält eine eigene, vom System fortlaufend erzeugte Nummer. Diese Nummer ist nur lesbar und wird weder vom Nutzer vergeben noch als zufällige Kennung erzeugt. Ihre Anzeige dient der Anfangsphase; später entfällt die sichtbare ID.

Die Demo verwendet vorläufig getrennte Nummernkreise für Immobilien und Gebäude. Ob die echte Anwendung globale oder getrennte Nummernkreise benötigt, bleibt ausdrücklich offen.

### Festgelegte Einheitenfelder

| Feld                | Erfassung                                                                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Einheitennummer** | Bezeichnung für die Nummer einer Einheit; im Datenmodell `unitNumber`. Der Begriff „Wohnungsnummer“ wird nicht verwendet, weil die Einheit auch eine andere Art haben kann. |
| **Einheitenart**    | Dropdown mit **Wohnung, Ladenlokal, Garage, Stellplatz**.                                                                                                                   |
| **Etage**           | Numerische Eingabe; **0 bedeutet Erdgeschoss**.                                                                                                                             |
| **Lage**            | Dropdown mit **links, rechts, links Mitte, rechts Mitte, Mitte**.                                                                                                           |
| **Fläche**          | Ausschließlich ein ausdrücklich als **optionaler Vorschlag** markiertes Feld. Es ist kein Pflichtfeld und kann beim Speichern leer bleiben.                                 |

Weitere Einheitenfelder gehören nicht zu diesem Schritt. Die systemgenerierten Nummern für Immobilien und Gebäude sind von der fachlichen Einheitennummer zu unterscheiden.

**Kontakt ist nicht gleich Login-Benutzer.** Wie ein Kontakt später mit einem Benutzerkonto zusammenhängt, muss fachlich geklärt werden. Diese Demo besitzt keine Anmeldung, Benutzerverwaltung, Rollen oder Berechtigungen. Ein Vertragsdatensatz erzeugt auch keinen unterschriftsfähigen Vertrag.

## Ausprobieren und Demospeicher

- Über die Navigation zwischen den fünf Bereichen wechseln, Listen durchsuchen und Details öffnen.
- Datensätze über die Formulare anlegen und bearbeiten. Pflichtfelder geben unmittelbare Rückmeldung.
- Eine Immobilie über ihren Adressblock anlegen; beim Gebäude die Adressübernahme aktiv lassen oder eine unabhängige Adresse erfassen und das Baujahr ergänzen. Die fortlaufende Nummer wird automatisch vergeben und kann nicht bearbeitet werden.
- Einheiten über Einheitennummer, Einheitenart, numerische Etage und Lage erfassen. Die vorgeschlagene Fläche ist optional.
- Änderungen bleiben ausschließlich im lokalen Speicher des verwendeten Browsers erhalten. Ein Neuladen derselben Demo-Adresse übernimmt diesen Stand.
- **Beispieldaten zurücksetzen** stellt den Ausgangsbestand wieder her und verwirft lokale Demo-Änderungen.

Der Speicher gehört zum jeweiligen Browserprofil und zur aufgerufenen Adresse. Eine lokale Demo und die veröffentlichte GitHub-Pages-Demo haben getrennte Datenstände. Andere Geräte oder Personen erhalten die Änderungen nicht. Beim Löschen der Website-Daten können Änderungen verloren gehen.

**Bitte ausschließlich fiktive Daten verwenden.** Alle mitgelieferten Namen, Anschriften, Kontaktdaten, Beträge und Vertragsangaben sind erfunden. Die Veröffentlichung ist öffentlich und hat keinen Zugangsschutz. Es gibt kein echtes Backend, keine zentrale Datenbank, keinen Mailversand, keinen Export persönlicher Daten und keine externen Integrationen.

## Vorgeschlagene Abnahmekriterien

Diese Kriterien sind ein Vorschlag für die gemeinsame Prüfung. Die Punkte zum Adressblock, zum Baujahr, zu den Nummern und zu den festgelegten Einheitenfeldern bilden die verbindlichen Basisanforderungen ab; weitere Produktfunktionen werden daraus nicht abgeleitet:

- [ ] Alle fünf Bereiche sind erreichbar; der aktive Bereich und die jeweilige Überschrift sind eindeutig.
- [ ] Listen, Detailansichten und Formulare verwenden ein konsistentes Layout mit lesbarer Typografie und verständlichen Beschriftungen.
- [ ] Die Suche grenzt sichtbare Datensätze sinnvoll ein; ein leeres Ergebnis ist verständlich dargestellt.
- [ ] In jedem Bereich lässt sich ein fiktiver Datensatz anlegen, wieder öffnen und bearbeiten.
- [ ] Die Immobilienanlage erfasst ausschließlich Straße, Hausnummer, PLZ, Ort und Land. Interner Name und Baujahr werden an einer Immobilie weder abgefragt noch angezeigt.
- [ ] Immobilien und Gebäude verwenden denselben wiederverwendbaren Adressblock mit fünf getrennten Feldern; Gebäude führen zusätzlich ein Baujahr.
- [ ] Beim Anlegen eines Gebäudes wird standardmäßig die Adresse der zugeordneten Immobilie übernommen; eine abweichende Gebäudeadresse kann gespeichert werden.
- [ ] Bei aktivierter Adressübernahme folgt ein Gebäude in der Demo Änderungen der Immobilienadresse. Eine separat erfasste Gebäudeadresse bleibt unverändert. Dieses Verhalten ist als Demo-Veranschaulichung dokumentiert, ohne eine globale Konsistenzentscheidung vorwegzunehmen.
- [ ] Jede neue Immobilie und jedes neue Gebäude erhält automatisch die nächste fortlaufende Nummer seines vorläufig getrennten Nummernkreises. Die Nummer ist nur lesbar, bleibt nach Bearbeiten und Neuladen erhalten und ist keine zufällige Kennung.
- [ ] Die sichtbare Nummer wird als Orientierung für die Anfangsphase verstanden; ihre spätere Ausblendung und die offene Entscheidung über globale oder getrennte Nummernkreise sind dokumentiert.
- [ ] Einheiten verwenden die Beschriftung „Einheitennummer“ und das Datenfeld `unitNumber`.
- [ ] Das Dropdown „Einheitenart“ bietet genau Wohnung, Ladenlokal, Garage und Stellplatz; „Lage“ bietet genau links, rechts, links Mitte, rechts Mitte und Mitte.
- [ ] Die Etage wird numerisch erfasst; der Hinweis „0 = Erdgeschoss“ ist verständlich sichtbar.
- [ ] Die Fläche ist als optionaler Vorschlag gekennzeichnet. Eine Einheit lässt sich ohne Flächenangabe speichern; weitere Einheitenfelder werden in diesem Schritt nicht ergänzt.
- [ ] Pflichtfelder verhindern unvollständiges Speichern und zeigen verständliche Rückmeldungen. Abbrechen übernimmt keine Formularänderungen.
- [ ] Gespeicherte Änderungen bleiben nach dem Neuladen im selben Browser erhalten.
- [ ] Das Zurücksetzen stellt die mitgelieferten Beispieldaten wieder her.
- [ ] Navigation, Suche und Formulare sind am Desktop und auf einem Smartphone bedienbar; Inhalte bleiben lesbar und Aktionen erreichbar.
- [ ] Wichtige Bedienelemente lassen sich per Tastatur erreichen; Beschriftungen und Fokuszustände sind erkennbar.
- [ ] Der Demo-Charakter, die fiktiven Daten und die lokale Speicherung sind in der Oberfläche erkennbar.
- [ ] Keine Aktion erweckt den Eindruck eines echten Versands, einer rechtsverbindlichen Vertragsabwicklung oder einer Benutzer- und Rechteverwaltung.

## Übergang zur echten Implementierung

Die Demo unterstützt Entscheidungen über Struktur, Begriffe und Bedienung. Ihr lokaler Speicher und ihre Beispieldaten sind kein Produktiv-Datenmodell und kein Migrationsbestand. Für eine echte Anwendung müssen Anforderungen und Umsetzung gesondert vereinbart werden, insbesondere:

1. **Fachliche Beziehungen:** Wie wird das Gesamtobjekt mit einem oder mehreren Gebäuden durchgängig abgebildet, welche Mehrfachbezüge sind zulässig, und was passiert bei Änderungen oder Löschungen? Das Folgen der Gebäudeadresse bei aktivierter Übernahme ist in der Demo umgesetzt; die umfassenden Konsistenzregeln für die echte Anwendung bleiben gesondert festzulegen.
2. **Kontakte und Konten:** Welche Kontakte benötigen überhaupt einen Zugang, und welche Rechte sollen angemeldete Personen erhalten?
3. **Daten und Prozesse:** Prüfregeln und Vertragsabläufe der echten Anwendung sind gesondert zu vereinbaren. Ebenso bleibt offen, ob ein globaler Nummernkreis oder getrennte Nummernkreise verwendet werden und wann die anfängliche Anzeige der IDs entfällt. Der gemeinsame Adressblock, das Baujahr am Gebäude und die oben festgelegten Einheitenfelder bilden die vereinbarte Basis; die Fläche bleibt ein optionaler Vorschlag.
4. **Technischer Betrieb:** Wie werden zentrale Speicherung, Anmeldung, Berechtigungen, Datenschutz, Sicherung und Betrieb umgesetzt?

Die spätere Implementierung wird getrennt von dieser öffentlichen Demo entwickelt. Private Quelldateien, reale Geschäfts- oder Personendaten und Geheimnisse gehören nicht in dieses Repository. Zusätzliche Wünsche können nach der gemeinsamen Prüfung priorisiert werden; sie sind nicht automatisch Bestandteil dieses ersten Skeletts.
