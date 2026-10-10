/* Entirely invented test identities and business examples. No real accounts. */
(() => {
  const db = window.KLAREINS_SEED;
  db.contacts.push(
    { id: 'cm1', name: 'Anna Müller', type: 'Mieter:in', email: 'anna.mueller.linden@example.invalid', city: 'Lindenhafen (fiktiv)', propertyId: '1', context: 'Lindenbogen 12 · Einheit A.01 · 1. Etage links', note: 'Fiktive Ansprechpartnerin für den Wasserschaden.' },
    { id: 'cm2', name: 'Anna Müller', type: 'Eigentümer:in', email: 'anna.mueller.garten@example.invalid', city: 'Lindenhafen (fiktiv)', propertyId: '2', context: 'Gartenwinkel 7 · Eigentümergemeinschaft', note: 'Erfundene zweite Person mit identischem Namen.' },
    { id: 'cm3', name: 'Jonas Müller', type: 'Mieter:in', email: 'jonas.mueller@example.invalid', city: 'Morgenau (fiktiv)', propertyId: '4', context: 'Wiesenpromenade 18 · Einheit H.01', note: 'Reine Testperson.' },
    { id: 'cm4', name: 'Müller Haustechnik', type: 'Dienstleister', email: 'service.mueller@example.invalid', city: 'Kieselbrück (fiktiv)', propertyId: '3', context: 'Kontorweg 4 · Sanitär & Leckortung', note: 'Fiktives Unternehmen, kein echter Dienstleister.' },
    { id: 'cm5', name: 'Leon Müller', type: 'Eigentümer:in', email: 'leon.mueller@example.invalid', city: 'Morgenau (fiktiv)', propertyId: '5', context: 'Birkenbogen 3 · Eigentümer', note: 'Reine Testperson.' }
  );
  db.cases = [
    { id: 'vg1', name: 'Wasserschaden · Lindenbogen 12', type: 'Schaden', status: 'In Bearbeitung', propertyId: '1', context: 'Einheit A.01 · gemeldet von Anna Müller', note: 'Feuchtigkeit an der Küchendecke. Leckortung abgestimmt; Trocknung vorbereiten.' },
    { id: 'vg2', name: 'Heizung prüfen · Gartenwinkel 7', type: 'Instandhaltung', status: 'Offen', propertyId: '2', context: 'Haus 7 · Rückmeldung von Anna Müller (Eigentümerin)', note: 'Fiktive Meldung: ungleichmäßige Wärmeverteilung.' },
    { id: 'vg3', name: 'Schlüsselübergabe · Wiesenpromenade 18', type: 'Übergabe', status: 'Geplant', propertyId: '4', context: 'Einheit H.01 · Jonas Müller', note: 'Fiktiven Übergabetermin vorbereiten.' },
    { id: 'vg4', name: 'Wartung · Kontorweg 4', type: 'Instandhaltung', status: 'Abgeschlossen', propertyId: '3', context: 'Müller Haustechnik · jährliche Wartung', note: 'Abgeschlossener Beispielvorgang.' }
  ];
  db.invoices = [
    { id: 're1', name: 'RE-2026-041 · Leckortung', type: 'Eingangsrechnung', status: 'Zu prüfen', propertyId: '1', context: 'Müller Haustechnik · 480,00 € · 08.10.2026', note: 'Fiktiver Rechnungsdatensatz. Kein Zahlungsauftrag.' },
    { id: 're2', name: 'RE-2026-042 · Heizungswartung', type: 'Eingangsrechnung', status: 'Freigegeben', propertyId: '2', context: 'Wärmewerk Demo · 320,00 €', note: 'Erfundener Beleg, keine echte Datei.' }
  ];
  db.documents = [
    { id: 'do1', name: 'Schadenprotokoll · Küche A.01', type: 'Protokoll', status: 'Entwurf', propertyId: '1', context: 'Lindenbogen 12 · 07.10.2026 · PDF-Beispiel', note: 'Dieser Eintrag simuliert ein Dokument. Es gibt keinen echten Anhang.' },
    { id: 'do2', name: 'Wartungsbericht · Kontorweg', type: 'Bericht', status: 'Abgelegt', propertyId: '3', context: 'Kontorweg 4 · Müller Haustechnik', note: 'Synthetische Dokumentbeschreibung.' }
  ];
  db.tasks = [
    { id: 'au1', name: 'Trocknungstermin abstimmen', type: 'Termin', status: 'Offen', propertyId: '1', context: 'Bis 14.10.2026 · zuständig: Mia Müller', note: 'Anna Müller und den fiktiven Dienstleister koordinieren.' },
    { id: 'au2', name: 'Übergabeprotokoll vorbereiten', type: 'Vorbereitung', status: 'In Bearbeitung', propertyId: '4', context: 'Bis 16.10.2026 · zuständig: Emil Sommer', note: 'Reine Demo-Aufgabe.' }
  ];
  db.users = [
    { id: 'be1', name: 'Mia Müller', type: 'Verwaltung', status: 'Demo-Profil', propertyId: '1', context: 'Team Bestand · Lindenbogen 12', email: 'mia.mueller@example.invalid', note: 'Simuliertes Nutzerprofil ohne Anmeldung, Konto oder Rechte.' },
    { id: 'be2', name: 'Emil Sommer', type: 'Objektbetreuung', status: 'Demo-Profil', propertyId: '4', context: 'Team Service · Wiesenpromenade 18', email: 'emil.sommer@example.invalid', note: 'Simuliertes Nutzerprofil ohne Anmeldung, Konto oder Rechte.' }
  ];
  db.links = [
    { a: 'cases:vg1', b: 'buildings:1', description: 'Ort des Schadens' },
    { a: 'cases:vg1', b: 'units:u1', description: 'Betroffene Einheit' },
    { a: 'cases:vg1', b: 'contacts:cm1', description: 'Kontakt zur Schadenmeldung' },
    { a: 'cases:vg1', b: 'invoices:re1', description: 'Kosten der Leckortung' },
    { a: 'cases:vg1', b: 'documents:do1', description: 'Dokumentation des Schadens' },
    { a: 'cases:vg1', b: 'tasks:au1', description: 'Nächster Schritt' }
  ];
})();
