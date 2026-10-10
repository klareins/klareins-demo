(() => {
  "use strict";
  const KEY = "klareins.design-demo.v2";
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (v) =>
    String(v ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const num = (v) =>
    new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 }).format(
      Number(v) || 0,
    );
  const euro = (v) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Number(v) || 0);
  const date = (v) =>
    v
      ? new Intl.DateTimeFormat("de-DE").format(new Date(v + "T12:00:00"))
      : "Unbefristet";
  const clone = (v) => JSON.parse(JSON.stringify(v));
  const paths = {
    properties:
      "M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M8 10h1m6 0h1M8 13h1m6 0h1",
    buildings:
      "M4 21V3h12v18M16 9h4v12M8 7h1m3 0h1M8 11h1m3 0h1M8 15h1m3 0h1M3 21h18",
    units: "M4 4h16v16H4zM4 11h9V4m0 7v9m0-5h7",
    contacts:
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M13 3.13a4 4 0 0 1 0 7.75",
    contracts:
      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8m-8 4h5",
    search: "m21 21-4.4-4.4M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0",
    plus: "M12 5v14M5 12h14",
    arrow: "m9 5 7 7-7 7",
    back: "m15 5-7 7 7 7",
    down: "m6 9 6 6 6-6",
    edit: "m16 3 5 5M4 20l4-1L21 6a2 2 0 0 0-3-3L5 16z",
    close: "m6 6 12 12M6 18 18 6",
    menu: "M4 6h16M4 12h16M4 18h16",
    reset: "M3 11a9 9 0 1 1 2.5 7M3 4v7h7",
    check: "m5 12 4 4L19 6",
    info: "M12 11v6m0-10h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
    list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    filter: "M4 7h16M7 12h10M10 17h4",
    area: "M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5",
    money: "M12 3v18m5-14H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H6",
    leaf: "M20 4c-9-2-16 1-16 8a7 7 0 0 0 7 7c7 0 9-8 9-15ZM6 18 15 9",
    lock: "M6 11V7a6 6 0 0 1 12 0v4M4 11h16v11H4z",
    clock: "M12 7v5l3 3M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
    save: "M4 4h14l2 2v14H4zM8 4v6h8V4M8 20v-6h8v6",
  };
  function icon(name, extra = "") {
    return `<svg class="icon ${extra}" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name] || paths.properties}"/>${name === "contacts" ? '<circle cx="9" cy="7" r="4"/>' : ""}</svg>`;
  }
  function art(accent = "sage", compact = false) {
    const palette = {
      sage: ["#edf1e6", "#dce5d1", "#bccbaa", "#789270", "#4e6b53"],
      sand: ["#f2eee3", "#e9dfcc", "#d2c1a4", "#ab9473", "#87795e"],
      clay: ["#f2eae3", "#e9d7cb", "#c8ae99", "#a3826c", "#77664e"],
    }[accent] || ["#edf1e6", "#dce5d1", "#bccbaa", "#789270", "#4e6b53"];
    return `<svg class="architecture" viewBox="0 0 320 210" role="img" aria-label="Illustration eines fiktiven Gebäudes"><rect width="320" height="210" fill="${palette[0]}"/><circle cx="254" cy="43" r="24" fill="${palette[1]}"/><path d="M0 170 Q100 153 200 168T320 160v50H0" fill="${palette[1]}"/><path d="m66 79 73-22 57 33-76 22z" fill="${palette[2]}"/><path d="M66 79v98l54 20v-85z" fill="${palette[2]}"/><path d="m120 112 76-22v86l-76 21z" fill="#faf9f2"/><path d="m120 106 79-23v9l-79 24-57-23v-9z" fill="${palette[4]}"/><path d="m170 49 45-14 40 24-47 14z" fill="${palette[3]}"/><path d="M170 49v103l38 22V73z" fill="${palette[2]}"/><path d="m208 73 47-14v101l-47 14z" fill="#fffdf7"/><path d="m208 69 50-15v8l-50 15-40-22v-8z" fill="${palette[4]}"/>${[0, 1, 2].map((y) => [0, 1].map((x) => `<path d="m${133 + x * 31} ${124 + y * 21 - x * 9} 13-4v12l-13 4z" fill="${palette[3]}"/><path d="m${218 + x * 20} ${86 + y * 23 - x * 6} 10-3v12l-10 3z" fill="${palette[3]}"/>`).join("")).join("")}<path d="M80 107v14l13 5v-14zm0 24v14l13 5v-14z" fill="${palette[3]}"/><path d="m155 168 15-4v20l-15 5z" fill="${palette[4]}"/><path d="m205 181 55-18 60 27v20h-31z" fill="#f7f7ef"/><path d="M41 186v-49m235 42v-53" stroke="${palette[4]}" stroke-width="3"/><ellipse cx="41" cy="132" rx="19" ry="29" fill="${palette[3]}"/><ellipse cx="276" cy="122" rx="20" ry="32" fill="${palette[2]}"/><ellipse cx="38" cy="120" rx="14" ry="23" fill="${palette[2]}"/><path d="m21 191 48 9m194-14 39 8" stroke="${palette[2]}" stroke-width="4" stroke-linecap="round"/></svg>`;
  }
  const cfg = {
    properties: {
      label: "Immobilien",
      singular: "Immobilie",
      description: "Ihr Bestand. Klar geordnet, gut im Blick.",
      tabs: ["Alle"],
      filters: ["Alle Orte"],
      columns: ["Immobilie", "Ort", "Gebäude", "Einheiten"],
    },
    buildings: {
      label: "Gebäude",
      singular: "Gebäude",
      description: "Die Häuser im Bestand – bis ins Detail.",
      tabs: ["Alle"],
      filters: ["Alle Immobilien"],
      columns: ["Gebäude", "Immobilie", "Einheiten", "Baujahr"],
    },
    units: {
      label: "Einheiten",
      singular: "Einheit",
      description: "Jede Fläche hat ihren Platz.",
      tabs: ["Alle", "Vermietet", "Verfügbar"],
      filters: [
        "Alle Nutzungen",
        "Wohnung",
        "Ladenlokal",
        "Garage",
        "Stellplatz",
      ],
      columns: ["Einheit", "Gebäude", "Fläche", "Status"],
    },
    contacts: {
      label: "Kontakte",
      singular: "Kontakt",
      description: "Menschen und Unternehmen rund um Ihren Bestand.",
      tabs: ["Alle", "Mieter:in", "Eigentümer:in"],
      filters: [
        "Alle Kontaktarten",
        "Mieter:in",
        "Eigentümer:in",
        "Dienstleister",
      ],
      columns: ["Kontakt", "E-Mail", "Ort", "Kontaktart"],
    },
    contracts: {
      label: "Verträge",
      singular: "Vertrag",
      description: "Vereinbarungen und Laufzeiten auf einen Blick.",
      tabs: ["Alle", "Aktiv", "Entwurf"],
      filters: ["Alle Vertragsarten", "Wohnraum", "Gewerbe", "Stellplatz"],
      columns: ["Vertrag", "Kontakt", "Miete / Monat", "Status"],
    },
  };
  const extraModules = {
    cases: ['Vorgänge','Vorgang','Schäden, Übergaben und Anliegen gemeinsam bearbeiten.'],
    invoices: ['Rechnungen','Rechnung','Fiktive Belege im fachlichen Zusammenhang.'],
    documents: ['Dokumente','Dokument','Protokolle und Unterlagen an einem Ort.'],
    tasks: ['Aufgaben','Aufgabe','Die nächsten Schritte im Blick.'],
    users: ['Test-Nutzer','Test-Nutzer','Simulierte Profile ohne Anmeldung oder Zugriffsrechte.']
  };
  for (const [k,[label,singular,description]] of Object.entries(extraModules)) {
    cfg[k] = {label,singular,description,tabs:['Alle'],filters:['Alle Arten',...new Set(window.KLAREINS_SEED[k].map(r=>r.type))],columns:[singular,'Kontext','Art','Status']};
    paths[k] = paths[{cases:'list',invoices:'money',documents:'contracts',tasks:'check',users:'contacts'}[k]];
  }
  let db,
    storageWarning = "",
    active = "properties",
    tab = "Alle",
    filter = "",
    view = "list",
    query = "",
    menuOpen = false;
  function validData(data) {
    return (
      data &&
      Object.keys(cfg).every(
        (k) =>
          Array.isArray(data[k]) &&
          data[k].every(
            (r) =>
              r &&
              typeof r.id === "string" &&
              (["properties", "buildings"].includes(k)
                ? /^\d+$/.test(r.id) &&
                  r.address &&
                  [
                    "street",
                    "houseNumber",
                    "postalCode",
                    "city",
                    "country",
                  ].every((f) => typeof r.address[f] === "string")
                : k === "units"
                  ? typeof r.unitNumber === "string"
                  : typeof r.name === "string"),
          ),
      )
    );
  }
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Add this demo extension without overwriting existing v2 records or edits.
      for (const k of Object.keys(extraModules)) if (!Array.isArray(parsed[k])) parsed[k] = clone(window.KLAREINS_SEED[k]);
      for (const r of window.KLAREINS_SEED.contacts.filter(r=>r.id.startsWith('cm'))) if (!parsed.contacts?.some(c=>c.id===r.id)) parsed.contacts?.push(clone(r));
      if (!Array.isArray(parsed.links)) parsed.links = clone(window.KLAREINS_SEED.links);
      if (!validData(parsed)) throw Error("invalid");
      db = parsed;
    } else db = clone(window.KLAREINS_SEED);
  } catch {
    db = clone(window.KLAREINS_SEED);
    storageWarning =
      "Der lokale Speicher konnte nicht geladen werden. Sie sehen die Beispieldaten; neue Änderungen können möglicherweise nur bis zum Neuladen erhalten bleiben.";
  }
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(db));
      storageWarning = "";
      return true;
    } catch {
      storageWarning =
        "Ihr Browser erlaubt derzeit keine lokale Speicherung. Änderungen bleiben nur bis zum Neuladen erhalten.";
      return false;
    }
  }
  const find = (kind, id) => db[kind].find((r) => r.id === id);
  const relatedBuildings = (id) =>
    db.buildings.filter((r) => r.propertyId === id);
  const relatedUnits = (id) =>
    db.units.filter((r) =>
      relatedBuildings(id).some((b) => b.id === r.buildingId),
    );
  const addressOf = (kind, r) =>
    kind === "buildings" &&
    r.addressMode === "inherit" &&
    find("properties", r.propertyId)
      ? find("properties", r.propertyId).address
      : r.address || {};
  const recordName = (kind, r) =>
    ["properties", "buildings"].includes(kind)
      ? [addressOf(kind, r).street, addressOf(kind, r).houseNumber]
          .filter(Boolean)
          .join(" ")
      : kind === "units"
        ? `Einheit ${r.unitNumber}`
        : r.name;
  const label = (kind, id) =>
    find(kind, id) ? recordName(kind, find(kind, id)) : "Noch nicht zugeordnet";
  const nextId = (kind) =>
    String(Math.max(0, ...db[kind].map((r) => Number(r.id) || 0)) + 1);
  const cleanCity = (v) =>
    String(v || "")
      .replace(" (fiktiv)", "")
      .replace(/^\d+ /, "");
  const badge = (v) =>
    `<span class="badge ${["In Vorbereitung", "Entwurf", "Verfügbar"].includes(v) ? "amber" : v === "Beendet" ? "grey" : ""}">${esc(v)}</span>`;
  function thumbnail(kind, r) {
    return kind === "contacts"
      ? `<span class="thumb contact">${esc(
          r.name
            .split(" ")
            .slice(0, 2)
            .map((w) => w[0])
            .join(""),
        )}</span>`
      : kind === "properties"
        ? `<span class="thumb">${art(r.accent, true)}</span>`
        : `<span class="thumb">${icon(kind)}</span>`;
  }
  function recordSub(kind, r) {
    if (extraModules[kind]) return [r.id, r.type, r.status].filter(Boolean).join(' · ');
    return ["properties", "buildings"].includes(kind)
      ? `${addressOf(kind, r).postalCode} ${cleanCity(addressOf(kind, r).city)} · ID ${r.id}`
      : kind === "units"
        ? `${r.type} · ${Number(r.floor) === 0 ? "EG" : r.floor + ". Etage"} · ${r.position}`
        : kind === "contacts"
          ? [r.type, r.context, r.email].filter(Boolean).join(" · ")
          : `${date(r.start)} · ${r.type}`;
  }
  function shell() {
    $("#app").innerHTML =
      `<div class="mobile-overlay ${menuOpen ? "open" : ""}" data-action="close-menu"></div><aside class="sidebar ${menuOpen ? "open" : ""}" aria-label="Hauptnavigation"><a class="brand" href="#/properties" aria-label="klar:eins Startseite"><span class="brand-mark">k</span><span>klar:eins</span></a><div class="workspace-label">Verwaltung</div><nav class="nav">${Object.entries(
        cfg,
      )
        .map(
          ([k, c]) =>
            `<a href="#/${k}" class="${active === k ? "active" : ""}" ${active === k ? 'aria-current="page"' : ""}>${icon(k)}<span>${c.label}</span><span class="nav-count">${db[k].length}</span></a>`,
        )
        .join(
          "",
        )}</nav><div class="side-bottom"><div class="demo-box"><strong><span class="pulse"></span>Ein Raum zum Ausprobieren</strong><p>Fiktive Daten. Ihre Änderungen bleiben lokal in diesem Browser.</p></div><button class="side-action" data-action="reset">${icon("reset")}<span>Beispieldaten zurücksetzen</span></button><div class="side-sign">klar:eins · Design-Demo · v0.1</div></div></aside><div class="content"><header class="topbar"><button class="mobile-menu" aria-label="Navigation öffnen" aria-expanded="${menuOpen}" data-action="menu">${icon("menu")}</button><div class="crumb"><span class="home-crumb">Arbeitsbereich</span><span class="crumb-divider">/</span><strong>${cfg[active].label}</strong></div><div class="top-right"><form class="global-search" role="search" id="search-form">${icon("search")}<input id="global-search" type="search" aria-label="Alle Bereiche durchsuchen" placeholder="Alles durchsuchen …" value="${esc(query)}" autocomplete="off"><span class="search-shortcut">↵</span></form><div class="top-divider"></div><span class="demo-pill">DEMO</span></div></header><main id="main" class="main" tabindex="-1"></main></div>`;
  }
  function stats() {
    const rented = db.units.filter((u) => u.status === "Vermietet").length,
      available = db.units.filter((u) => u.status === "Verfügbar").length;
    const totalArea = db.units.reduce((n, u) => n + Number(u.area || 0), 0);
    const rents = db.contracts
      .filter((c) => c.status === "Aktiv")
      .reduce((n, c) => n + Number(c.rent || 0), 0);
    const count = (key) => db[key].length;
    const values = {
      properties: [
        [
          "Immobilien im Bestand",
          count("properties"),
          "properties",
          "Alle Standorte an einem Ort",
        ],
        [
          "Gebäude",
          count("buildings"),
          "buildings",
          "Den Immobilien zugeordnet",
        ],
        [
          "Einheiten",
          count("units"),
          "units",
          `${rented} vermietet · ${available} verfügbar`,
        ],
        [
          "Vermietungsstand",
          `${Math.round((rented / (count("units") || 1)) * 100)} <small>%</small>`,
          "leaf",
          `${rented} von ${count("units")} Einheiten`,
        ],
      ],
      buildings: [
        [
          "Gebäude im Bestand",
          count("buildings"),
          "buildings",
          "Baukörper im Überblick",
        ],
        [
          "Immobilien",
          count("properties"),
          "properties",
          "Ihr übergeordneter Bestand",
        ],
        ["Einheiten", count("units"), "units", "Wohnen, Ladenlokal & Parken"],
        [
          "Gesamtfläche",
          `${num(totalArea)} <small>m²</small>`,
          "area",
          "Summe erfasster Einheiten",
        ],
      ],
      units: [
        [
          "Einheiten gesamt",
          count("units"),
          "units",
          "Alle erfassten Nutzungsarten",
        ],
        ["Vermietet", rented, "check", "Laut Einheitenstatus"],
        ["Verfügbar", available, "leaf", "Raum für Neues"],
        [
          "Gesamtfläche",
          `${num(totalArea)} <small>m²</small>`,
          "area",
          "Summe erfasster Einheiten",
        ],
      ],
      contacts: [
        [
          "Kontakte gesamt",
          count("contacts"),
          "contacts",
          "Personen & Unternehmen",
        ],
        [
          "Mieter:innen",
          db.contacts.filter((c) => c.type === "Mieter:in").length,
          "units",
          "Fachliche Kontaktart",
        ],
        [
          "Eigentümer:innen",
          db.contacts.filter((c) => c.type === "Eigentümer:in").length,
          "properties",
          "Fachliche Kontaktart",
        ],
        [
          "Dienstleister",
          db.contacts.filter((c) => c.type === "Dienstleister").length,
          "buildings",
          "Partner rund um den Bestand",
        ],
      ],
      contracts: [
        [
          "Verträge gesamt",
          count("contracts"),
          "contracts",
          "Alle erfassten Vereinbarungen",
        ],
        [
          "Aktiv",
          db.contracts.filter((c) => c.status === "Aktiv").length,
          "check",
          "Laut Vertragsstatus",
        ],
        [
          "Entwürfe",
          db.contracts.filter((c) => c.status === "Entwurf").length,
          "edit",
          "In Vorbereitung",
        ],
        [
          "Nettomiete / Monat",
          euro(rents),
          "money",
          "Summe aktiver Beispielverträge",
        ],
      ],
    };
    if (extraModules[active]) return '';
    return `<section class="stats" aria-label="Bestandskennzahlen">${values[active].map(([title, val, ico, note]) => `<div class="stat"><div class="stat-label">${title}${icon(ico)}</div><div class="stat-value">${val}</div><div class="stat-note ${ico === "leaf" || ico === "check" ? "good" : ""}">${note}</div></div>`).join("")}</section>`;
  }
  function row(kind, r) {
    let second, third, fourth;
    if (kind === "properties") {
      second = cleanCity(r.address.city);
      third = `${relatedBuildings(r.id).length} Gebäude`;
      fourth = `<span class="badge">${relatedUnits(r.id).length} Einheiten</span>`;
    }
    if (kind === "buildings") {
      second = label("properties", r.propertyId);
      third = `${db.units.filter((u) => u.buildingId === r.id).length} Einheiten`;
      fourth = esc(r.year || "—");
    }
    if (kind === "units") {
      second = label("buildings", r.buildingId);
      third = r.area ? `${num(r.area)} m²` : "Fläche offen";
      fourth = badge(r.status);
    }
    if (kind === "contacts") {
      second = r.email || "Keine E-Mail";
      third = cleanCity(r.city) || "—";
      fourth = badge(r.type);
    }
    if (kind === "contracts") {
      second = label("contacts", r.contactId);
      third = euro(r.rent);
      fourth = badge(r.status);
    }
    if (extraModules[kind]) { second = r.context || 'Fiktiver Eintrag'; third = r.type || '—'; fourth = badge(r.status || 'Demo'); }
    return `<a class="list-row" href="#/${kind}/${encodeURIComponent(r.id)}" aria-label="${esc(recordName(kind, r))} öffnen"><span class="cell-primary">${thumbnail(kind, r)}<span><span class="record-name">${esc(recordName(kind, r))}</span><span class="record-sub" style="display:block">${esc(recordSub(kind, r))}</span></span></span><span class="cell-muted">${esc(second)}</span><span class="cell-muted">${esc(third)}</span><span class="status-cell">${fourth}</span>${icon("arrow", "row-arrow")}</a>`;
  }
  function focusCard() {
    const p = db.properties[0];
    if (!p) return "";
    const units = relatedUnits(p.id),
      rented = units.filter((u) => u.status === "Vermietet").length,
      percent = Math.round((rented / (units.length || 1)) * 100);
    return `<aside class="focus-aside"><section class="panel focus-panel"><div class="panel-head"><h2>Im Fokus</h2><span class="pulse"></span></div><div class="focus-image"><span class="image-label">Fiktives Wohnensemble</span>${art(p.accent)}</div><div class="focus-content"><h3>${esc(recordName("properties", p))}</h3><p>${esc(p.address.postalCode)} ${esc(cleanCity(p.address.city))}<br>${esc(p.address.country)}</p><dl class="focus-meta"><div><dt>Gebäude</dt><dd>${relatedBuildings(p.id).length}</dd></div><div><dt>Einheiten</dt><dd>${units.length}</dd></div><div><dt>Gesamtfläche</dt><dd>${num(units.reduce((n, u) => n + Number(u.area || 0), 0))} m²</dd></div><div><dt>Immobilien-ID</dt><dd>${esc(p.id)}</dd></div></dl><div class="occupancy"><div class="occupancy-label"><span>Vermietungsstand</span><strong>${percent} %</strong></div><div class="progress-bar"><span style="width:${percent}%"></span></div><p>${rented} von ${units.length} Einheiten vermietet</p></div><a class="button" href="#/properties/${encodeURIComponent(p.id)}">Immobilie ansehen ${icon("arrow")}</a></div></section><div class="aside-note">${icon("info")}<p>Alles hier ist ein Beispiel.<br>Entdecken, ergänzen und ausprobieren.</p></div></aside>`;
  }
  const bottomNote = () =>
    `<footer class="bottom-note"><span>${icon("save")}Demospeicher · nur in diesem Browser</span><span>Alle Namen und Angaben sind frei erfunden.</span></footer>`;
  function renderList() {
    const c = cfg[active];
    let records = db[active].filter(
      (r) =>
        (tab === "Alle" ||
          (active === "contacts" ? r.type : r.status) === tab) &&
        (!filter ||
          (active === "buildings"
            ? r.propertyId
            : active === "properties"
              ? r.address.city
              : r.type) === filter),
    );
    const choices =
      active === "buildings"
        ? [
            ["", "Alle Immobilien"],
            ...db.properties.map((r) => [r.id, recordName("properties", r)]),
          ]
        : active === "properties"
          ? [
              ["", "Alle Orte"],
              ...[...new Set(db.properties.map((r) => r.address.city))].map(
                (v) => [v, cleanCity(v)],
              ),
            ]
          : c.filters.map((v, i) => [i ? v : "", v]);
    $("#main").className = "main";
    $("#main").innerHTML =
      `${storageWarning ? `<div class="storage-alert" role="alert">${esc(storageWarning)}</div>` : ""}<div class="heading"><div><div class="eyebrow">Ihr Bestand</div><div class="title-line"><h1>${c.label}</h1><span class="count-badge">${db[active].length}</span></div><p class="subtitle">${c.description}</p></div><button class="button primary" data-action="create">${icon("plus")}${c.singular} anlegen</button></div>${stats()}${active === "properties" || active === "cases" ? `<a class="demo-entry" href="#/cases/vg1"><span><span class="eyebrow">Neu zum Ausprobieren</span><strong>Ein Wasserschaden. Alle Zusammenhänge.</strong><span>Gebäude, Kontakt, Rechnung und mehr verbinden.</span></span>${icon("arrow")}</a>` : ""}<div class="${active === "properties" ? "workspace-grid" : "full-list"}"><section class="panel"><div class="panel-head"><h2>${active === "properties" ? "Alle Immobilien" : c.label + " im Überblick"}</h2><small>${active === "contacts" ? "Fachliche Kontakte · keine Benutzerkonten" : "Ein guter Überblick beginnt hier."}</small><div class="view-switch" aria-label="Ansicht"><button class="${view === "list" ? "active" : ""}" data-action="view" data-value="list" aria-label="Listenansicht" aria-pressed="${view === "list"}">${icon("list")}</button><button class="${view === "cards" ? "active" : ""}" data-action="view" data-value="cards" aria-label="Kartenansicht" aria-pressed="${view === "cards"}">${icon("grid")}</button></div></div><div class="toolbar"><div class="tabs" aria-label="Statusfilter">${c.tabs.map((t) => `<button class="tab ${tab === t ? "active" : ""}" data-action="tab" data-value="${esc(t)}" aria-pressed="${tab === t}">${esc(t)}</button>`).join("")}</div><label class="filter">${icon("filter")}<select id="filter" aria-label="${active === "buildings" ? "Nach Immobilie filtern" : active === "properties" ? "Nach Ort filtern" : "Nach Art filtern"}">${choices.map(([v, l]) => `<option value="${esc(v)}" ${filter === v ? "selected" : ""}>${esc(l)}</option>`).join("")}</select></label></div>${view === "list" ? `<div class="list-row table-head" aria-hidden="true">${c.columns.map((t) => `<span>${t}</span>`).join("")}<span></span></div>` : ""}<div class="${view === "cards" ? "cards-view" : ""}">${records.length ? records.map((r) => row(active, r)).join("") : `<div class="empty">${icon("search")}<h3>Hier ist noch Platz.</h3><p>Zu dieser Auswahl gibt es keine Einträge.</p><button class="button" data-action="clear-filter">Filter zurücksetzen</button></div>`}</div><div class="list-footer"><span>${records.length} von ${db[active].length} ${c.label}</span><span class="page-number">1</span></div></section>${active === "properties" ? focusCard() : ""}</div>${bottomNote()}`;
  }
  function fieldsFor(k) {
    const text = (key, title, required = false, wide = false) => ({
      key,
      title,
      required,
      wide,
      type: "text",
    });
    const select = (key, title, options, required = true) => ({
      key,
      title,
      required,
      type: "select",
      options: options.map((v) => (typeof v === "string" ? [v, v] : v)),
    });
    const number = (key, title, min = 0, max = 10000000, step = "0.01") => ({
      key,
      title,
      type: "number",
      required: true,
      min,
      max,
      step,
    });
    const reference = (key, title, target) =>
      select(
        key,
        title,
        [
          ["", "Noch nicht zugeordnet"],
          ...db[target].map((r) => [r.id, recordName(target, r)]),
        ],
        false,
      );
    let f = ["properties", "buildings", "units"].includes(k)
      ? []
      : [
          text(
            "name",
            k === "contacts" ? "Name / Unternehmen" : "Bezeichnung",
            true,
            true,
          ),
        ];
    if (k === "buildings")
      f.push(
        reference("propertyId", "Übergeordnete Immobilie", "properties"),
        number("year", "Baujahr", 1000, 2100, "1"),
      );
    if (k === "units")
      f.push(
        text("unitNumber", "Einheitennummer", true),
        reference("buildingId", "Gebäude", "buildings"),
        select("type", "Einheitenart", [
          "Wohnung",
          "Ladenlokal",
          "Garage",
          "Stellplatz",
        ]),
        number("floor", "Etage · 0 = Erdgeschoss", -20, 200, "1"),
        select("position", "Lage innerhalb der Etage", [
          "links",
          "rechts",
          "links Mitte",
          "rechts Mitte",
          "Mitte",
        ]),
        {
          ...number("area", "Fläche in m² · optionaler Vorschlag", 0.1, 100000),
          required: false,
        },
        select("status", "Status (Demo)", [
          "Verfügbar",
          "Vermietet",
          "In Vorbereitung",
        ]),
      );
    if (k === "contacts")
      f.push(
        select("type", "Kontaktart", [
          "Mieter:in",
          "Eigentümer:in",
          "Dienstleister",
        ]),
        { key: "email", title: "E-Mail (fiktiv)", type: "email" },
        text("phone", "Telefon (optional, fiktiv)"),
        text("city", "Ort (fiktiv)"),
        text("context", "Kontext zur Unterscheidung", false, true),
        reference("propertyId", "Immobilie (fachlicher Bezug)", "properties"),
      );
    if (k === "contracts")
      f.push(
        reference("unitId", "Einheit", "units"),
        reference("contactId", "Kontakt", "contacts"),
        select("type", "Vertragsart", ["Wohnraum", "Gewerbe", "Stellplatz"]),
        select("status", "Status", ["Entwurf", "Aktiv", "Beendet"]),
        { key: "start", title: "Vertragsbeginn", type: "date", required: true },
        { key: "end", title: "Vertragsende (optional)", type: "date" },
        number("rent", "Nettomiete / Monat in €"),
        number("deposit", "Kaution in €"),
      );
    if (extraModules[k]) f.push(text('type','Art',true),text('status','Status'),text('context','Kontext',false,true),reference('propertyId','Immobilie (fachlicher Bezug)','properties'));
    if (k === 'users') f.push({key:'email', title:'E-Mail (fiktiv)', type:'email'});
    if (!["properties", "buildings"].includes(k))
      f.push({ key: "note", title: "Notiz", type: "textarea", wide: true });
    return f;
  }
  function detailFacts(k, r) {
    const address = ["properties", "buildings"].includes(k)
      ? `<div><dt>${k === "properties" ? "Immobilien" : "Gebäude"}-ID · vorläufig sichtbar</dt><dd>${esc(r.id)}</dd></div>${Object.entries(
          {
            street: "Straße",
            houseNumber: "Hausnummer",
            postalCode: "Postleitzahl",
            city: "Ort",
            country: "Land",
          },
        )
          .map(
            ([key, title]) =>
              `<div><dt>${title}</dt><dd>${esc(addressOf(k, r)[key])}</dd></div>`,
          )
          .join(
            "",
          )}${k === "buildings" ? `<div><dt>Adressquelle</dt><dd>${r.addressMode === "inherit" ? "Von der Immobilie übernommen" : "Abweichende Gebäudeadresse"}</dd></div>` : ""}`
      : "";
    return (
      address +
      fieldsFor(k)
        .filter((f) => f.key !== "name" && f.key !== "note")
        .map((f) => {
          let val = r[f.key];
          if (f.type === "select")
            val =
              f.options.find((o) => o[0] === val)?.[1] ||
              "Noch nicht zugeordnet";
          if (f.type === "date") val = date(val);
          if (f.type === "number")
            val =
              val === null || val === undefined
                ? "—"
                : ["rent", "deposit"].includes(f.key)
                  ? euro(val)
                  : num(val);
          return `<div><dt>${esc(f.title.replace(" (fiktiv)", "").replace(" (optional)", "").replace(" in €", "").replace(" in m²", ""))}</dt><dd>${esc(val || "—")}${f.key === "area" && r.area ? " m²" : ""}</dd></div>`;
        })
        .join("")
    );
  }
  function relatedSection(title, kind, records) {
    return `<section class="panel related"><div class="panel-head"><h2>${title}</h2><small>${records.length} Einträge</small></div>${records.length ? records.map((r) => `<a class="related-row" href="#/${kind}/${encodeURIComponent(r.id)}"><span>${esc(recordName(kind, r))}<span class="record-sub" style="display:block">${esc(recordSub(kind, r))}</span></span>${icon("arrow")}</a>`).join("") : '<div class="detail-note"><p>Noch keine Zuordnung vorhanden.</p></div>'}</section>`;
  }
  function renderDetail(id) {
    const r = find(active, id),
      c = cfg[active];
    if (!r) {
      $("#main").innerHTML =
        `<div class="empty">${icon("search")}<h1>Eintrag nicht gefunden</h1><p>Der Eintrag ist in diesem Demospeicher nicht vorhanden.</p><a class="button" href="#/${active}">Zur Übersicht</a></div>`;
      return;
    }
    let related = "";
    if (active === "properties")
      related = relatedSection(
        "Gebäude dieser Immobilie",
        "buildings",
        relatedBuildings(id),
      );
    if (active === "buildings")
      related = relatedSection(
        "Einheiten in diesem Gebäude",
        "units",
        db.units.filter((u) => u.buildingId === id),
      );
    if (active === "units")
      related = relatedSection(
        "Verträge dieser Einheit",
        "contracts",
        db.contracts.filter((c) => c.unitId === id),
      );
    if (active === "contacts")
      related = relatedSection(
        "Verträge mit diesem Kontakt",
        "contracts",
        db.contracts.filter((c) => c.contactId === id),
      );
    if (active === "contracts") {
      related = relatedSection(
        "Zugeordnete Einheit",
        "units",
        db.units.filter((u) => u.id === r.unitId),
      );
      related += relatedSection(
        "Zugeordneter Kontakt",
        "contacts",
        db.contacts.filter((c) => c.id === r.contactId),
      );
    }
    document.title = `${recordName(active, r)} · klar:eins Demo`;
    $("#main").className = "main detail";
    $("#main").innerHTML =
      `${storageWarning ? `<div class="storage-alert" role="alert">${esc(storageWarning)}</div>` : ""}<a class="back" href="#/${active}">${icon("back")}Zurück zu ${c.label}</a><div class="heading"><div><div class="eyebrow">${c.singular} · Stammdaten</div><div class="title-line"><h1>${esc(recordName(active, r))}</h1></div><p class="subtitle">${esc(recordSub(active, r))}</p></div><button class="button primary" data-action="edit" data-id="${esc(id)}">${icon("edit")}Bearbeiten</button></div><div class="detail-layout"><div><section class="panel"><div class="panel-head"><h2>Auf einen Blick</h2>${r.status ? badge(r.status) : "<small>Fiktiver Beispieldatensatz</small>"}</div><dl class="detail-facts">${detailFacts(active, r)}</dl>${!["properties", "buildings"].includes(active) ? `<div class="detail-note"><h3>Notiz</h3><p>${esc(r.note || "Noch keine Notiz hinterlegt.")}</p></div>` : `<div class="detail-note"><p>${active === "properties" ? "Eine Immobilie umfasst ein oder mehrere Gebäude. Das Baujahr wird am Gebäude gepflegt." : "Die Gebäudeadresse kann von der Immobilie übernommen oder separat hinterlegt werden."}</p></div>`}</section>${linkSection(active,id)}${related ? `<div class="assignment-label"><h2>Feste fachliche Zuordnungen</h2><p>Diese Beziehungen werden über die Stammdaten gepflegt. Freie Verknüpfungen ändern sie nicht.</p></div>${related}` : ""}</div><aside class="detail-side"><div class="detail-art">${art(r.accent || "sage")}</div><div class="detail-side-box"><h3>Raum für gute Verwaltung.</h3><p>${active === "contacts" ? "Dieser Kontakt ist ein fachlicher Datensatz. Er besitzt kein Login und keine Zugriffsrechte." : active === "contracts" ? "Diese Angaben sind fiktive Vertragsstammdaten. Es wird kein Vertrag erstellt, versendet oder unterzeichnet." : "Probieren Sie die Stammdatenpflege aus. Änderungen werden ausschließlich in diesem Browser gespeichert."}</p></div><div class="aside-note">${icon("info")}<p>Zuordnungen dienen der Orientierung. Status und Beträge werden unabhängig gepflegt.</p></div></aside></div>${bottomNote()}`;
  }
  const LM = window.KLAREINS_LINKS;
  const ref = (kind, id) => LM.key(kind, id);
  function resolveRef(value) {
    const split = value.indexOf(':');
    const kind = value.slice(0, split), id = value.slice(split + 1);
    const record = db[kind]?.find(r => r.id === id);
    return record ? { kind, record, key: value } : null;
  }
  function propertyFor(kind, r) {
    if (kind === 'properties') return r.id;
    if (kind === 'units') return find('buildings', r.buildingId)?.propertyId || '';
    if (kind === 'contracts') { const unit = find('units', r.unitId); return unit ? propertyFor('units', unit) : ''; }
    return r.propertyId || '';
  }
  function contextFor(kind, r) {
    const property = propertyFor(kind, r);
    const location = property ? label('properties', property) : '';
    return [...new Set([r.context, r.email, r.city, location && !r.context?.includes(location) ? location : '', kind === 'units' ? label('buildings', r.buildingId) : ''].filter(Boolean))].join(' · ');
  }
  function linkSection(kind, id) {
    const source = ref(kind, id);
    const links = db.links.filter(l => l.a === source || l.b === source);
    const rows = links.map(l => {
      const target = resolveRef(l.a === source ? l.b : l.a);
      if (!target) return '';
      const { kind: k, record: r, key } = target;
      return `<li class="connection-row"><a class="connection-open" href="#/${k}/${encodeURIComponent(r.id)}">${thumbnail(k,r)}<span><span class="connection-type">${cfg[k].singular}</span><strong>${esc(recordName(k,r))}</strong><span class="connection-context">${esc(contextFor(k,r) || recordSub(k,r))}</span>${l.description ? `<span class="connection-description">${esc(l.description)}</span>` : ''}</span>${icon('arrow')}</a><button class="icon-button" data-action="unlink" data-source="${esc(source)}" data-target="${esc(key)}" aria-label="Verknüpfung mit ${esc(recordName(k,r))} entfernen" title="Nur Verbindung entfernen">${icon('close')}</button></li>`;
    }).join('');
    return `<section class="panel connections" aria-labelledby="connections-title"><div class="panel-head"><div><h2 id="connections-title">Verknüpfungen <span class="count-badge">${links.length}</span></h2><p>Passende Informationen aus allen Bereichen.</p></div><button class="button" data-action="link-add" data-source="${esc(source)}">${icon('plus')}Hinzufügen</button></div>${rows ? `<ul class="connection-list">${rows}</ul>` : '<div class="connection-empty">Noch keine Verknüpfungen. Ergänzen Sie Kontakte, Dokumente oder beliebige andere Einträge.</div>'}<div class="connection-help">In beide Richtungen sichtbar. Entfernen löst nur die Verbindung – die Datensätze bleiben erhalten.</div></section>`;
  }
  let picker = null;
  function openLinkPicker(source) {
    picker = { source, selected: new Set(), query: '', kind: '', property: '', role: '', description: '' };
    const origin = resolveRef(source);
    openDialog(`<div class="dialog-head"><div><div class="eyebrow">Bereiche verbinden</div><h2 id="dialog-title">Verknüpfungen hinzufügen</h2><p>Zu ${esc(recordName(origin.kind,origin.record))}</p></div><button class="icon-button" data-action="close-dialog" aria-label="Schließen">${icon('close')}</button></div><div class="link-picker"><label class="field"><span>Modulübergreifend suchen</span><input id="link-query" type="search" placeholder="Zum Beispiel Müller, Leckortung oder Lindenbogen" autocomplete="off" aria-describedby="search-hint"></label><p id="search-hint" class="picker-hint">Namen, E-Mail, Objekt oder Nummer kombinieren. „Mueller“ findet auch „Müller“.</p><div class="picker-filters"><label class="field">Typ / Modul<select id="link-kind"><option value="">Alle Bereiche</option>${Object.entries(cfg).map(([k,c])=>`<option value="${k}">${c.label}</option>`).join('')}</select></label><label class="field">Immobilie<select id="link-property"><option value="">Alle Immobilien</option>${db.properties.map(r=>`<option value="${r.id}">${esc(recordName('properties',r))} · ${esc(cleanCity(r.address.city))}</option>`).join('')}</select></label><label class="field">Rolle / Art<select id="link-role"><option value="">Alle Rollen und Arten</option>${[...new Set(Object.keys(cfg).flatMap(k=>db[k].map(r=>r.type)).filter(Boolean))].sort().map(t=>`<option>${esc(t)}</option>`).join('')}</select></label></div><div class="picker-result-head"><p id="link-count" role="status" aria-live="polite"></p><button class="text-button" data-action="link-clear">Filter zurücksetzen</button></div><div id="link-results" class="picker-results"></div><div id="link-selection" class="selection-summary" aria-live="polite"></div><label class="field relationship-field">Beziehungsbeschreibung <span class="picker-hint">Optional · gilt für die aktuelle Auswahl</span><input id="link-description" maxlength="160" placeholder="Zum Beispiel: Abstimmung zur Reparatur"></label></div><div class="dialog-foot"><div class="actions"><button class="button" data-action="close-dialog">Abbrechen</button><button class="button primary" id="link-save" data-action="link-save" disabled>Verknüpfen</button></div></div>`);
    $('#editor').classList.add('link-dialog');
    renderLinkResults();
    $('#link-query').focus();
  }
  function searchRecords(q, kind = '', property = '', role = '', source = '') {
    const origin = resolveRef(source);
    const originProperty = origin ? propertyFor(origin.kind, origin.record) : '';
    return Object.keys(cfg).filter(k=>!kind || k===kind).flatMap(k=>db[k].map(r=>({kind:k,record:r,key:ref(k,r.id)})))
      .filter(x=>x.key!==source && (!property || propertyFor(x.kind,x.record)===property) && (!role || x.record.type===role))
      .map(x=>({...x, score:LM.score([recordName(x.kind,x.record), cfg[x.kind].label, cfg[x.kind].singular, x.record.id, x.record.type, x.record.status, contextFor(x.kind,x.record), recordSub(x.kind,x.record)].join(' '), recordName(x.kind,x.record),q), sameProperty:!!originProperty && propertyFor(x.kind,x.record)===originProperty}))
      .filter(x=>x.score>=0).sort((a,b)=>b.score-a.score || Number(b.sameProperty)-Number(a.sameProperty) || recordName(a.kind,a.record).localeCompare(recordName(b.kind,b.record),'de') || a.key.localeCompare(b.key));
  }
  function renderLinkResults() {
    const results = searchRecords(picker.query,picker.kind,picker.property,picker.role,picker.source);
    $('#link-count').textContent = `${results.length} Treffer · Name zuerst, dann Objektbezug`;
    $('#link-results').innerHTML = results.map(({kind:k,record:r,key,sameProperty})=> {
      const exists = LM.has(db.links,picker.source,key);
      return `<label class="picker-result ${exists ? 'already-linked' : ''}"><input type="checkbox" data-link-key="${esc(key)}" ${exists ? 'disabled checked' : picker.selected.has(key) ? 'checked' : ''}><span class="result-body"><span class="result-top"><span class="connection-type">${cfg[k].singular} · ${esc(r.id)}</span><span class="result-state">${exists ? 'Bereits verknüpft' : sameProperty ? 'Gleiche Immobilie' : esc(r.status || '')}</span></span><strong>${esc(recordName(k,r))}</strong><span class="result-role">${esc(r.type || recordSub(k,r))}</span><span class="connection-context">${esc(contextFor(k,r) || recordSub(k,r))}</span></span></label>`;
    }).join('') || '<div class="connection-empty"><strong>Keine passenden Treffer</strong><p>Weniger Suchbegriffe verwenden oder einen Filter zurücksetzen.</p></div>';
    updateLinkSelection();
  }
  function updateLinkSelection() {
    $('#link-save').disabled = !picker.selected.size;
    $('#link-save').textContent = picker.selected.size ? `${picker.selected.size} verknüpfen` : 'Verknüpfen';
    $('#link-selection').innerHTML = picker.selected.size ? `<strong>${picker.selected.size} ausgewählt</strong> <span>Auswahl bleibt beim Filtern erhalten.</span><div class="selection-chips">${[...picker.selected].map(key=>{ const x=resolveRef(key); return `<button class="selection-chip" data-action="link-deselect" data-key="${esc(key)}">${esc(recordName(x.kind,x.record))} · ${esc(x.record.id)} <span aria-hidden="true">×</span><span class="sr-only"> Auswahl entfernen</span></button>`; }).join('')}</div>` : '<span>Mehrere Einträge auswählen und gemeinsam verknüpfen.</span>';
  }
  document.addEventListener('input', e=> {
    if(e.target.id==='link-query') { picker.query=e.target.value; renderLinkResults(); }
    if(e.target.id==='link-description') picker.description=e.target.value;
  });
  document.addEventListener('change', e=> {
    const fields = {'link-kind':'kind','link-property':'property','link-role':'role'};
    if(fields[e.target.id]) {picker[fields[e.target.id]]=e.target.value; renderLinkResults();}
    if(e.target.dataset.linkKey) {const key=e.target.dataset.linkKey; e.target.checked ? picker.selected.add(key) : picker.selected.delete(key); updateLinkSelection();}
  });
  document.addEventListener('click', e=> {
    const b=e.target.closest('[data-action]'); if(!b) return;
    const action=b.dataset.action;
    if(action==='link-add') openLinkPicker(b.dataset.source);
    if(action==='link-deselect') {picker.selected.delete(b.dataset.key); renderLinkResults();}
    if(action==='link-clear') {for(const [id,key] of Object.entries({'link-query':'query','link-kind':'kind','link-property':'property','link-role':'role'})) {picker[key]='';$('#'+id).value='';} renderLinkResults();}
    if(action==='link-save' && picker?.selected.size) {
      let count=0;
      for(const target of picker.selected) if(resolveRef(target) && LM.add(db.links,picker.source,target,picker.description)) count++;
      const saved=persist(); closeDialog(); route(); $('[data-action="link-add"]')?.focus(); toast(`${count} Verknüpfungen hinzugefügt. ${saved ? 'Lokal gespeichert.' : 'Nur für diese Sitzung.'}`);
    }
    if(action==='unlink') {
      const origin=b.dataset.source, target=b.dataset.target;
      const x=resolveRef(target);
      openDialog(`<div class="dialog-head"><h2 id="dialog-title">Verknüpfung entfernen?</h2><button class="icon-button" data-action="close-dialog" aria-label="Schließen">${icon('close')}</button></div><div class="confirm-body">Die Verbindung mit <strong>${esc(recordName(x.kind,x.record))}</strong> wird auf beiden Seiten entfernt. Beide Datensätze und feste fachliche Zuordnungen bleiben erhalten.</div><div class="dialog-foot"><div class="actions"><button class="button" data-action="close-dialog">Abbrechen</button><button class="button primary" data-action="unlink-confirm" data-source="${esc(origin)}" data-target="${esc(target)}">Nur Verbindung entfernen</button></div></div>`);
    }
    if(action==='unlink-confirm') {db.links=LM.remove(db.links,b.dataset.source,b.dataset.target); const saved=persist();closeDialog();route();$('[data-action="link-add"]')?.focus();toast(`Verbindung auf beiden Seiten entfernt. ${saved ? 'Lokal gespeichert.' : 'Nur für diese Sitzung.'}`);}
  });

  function searchText(k, r) {
    return [
      JSON.stringify(r),
      k === "units" ? label("buildings", r.buildingId) : "",
      k === "buildings" ? label("properties", r.propertyId) : "",
      k === "contracts" ? label("contacts", r.contactId) : "",
    ]
      .join(" ")
      .toLocaleLowerCase("de");
  }
  function renderSearch() {
    const q = query.trim().toLocaleLowerCase("de");
    let total = 0;
    const groups = Object.entries(cfg)
      .map(([k, c]) => {
        const results = searchRecords(q,k).map(x=>x.record);
        total += results.length;
        return results.length
          ? `<section><div class="search-results-title">${c.label} · ${results.length}</div>${results.map((r) => `<a class="search-hit" href="#/${k}/${encodeURIComponent(r.id)}">${thumbnail(k, r)}<span><span class="record-name">${esc(recordName(k, r))}</span><span class="record-sub" style="display:block">${esc(recordSub(k, r))}</span></span>${icon("arrow", "row-arrow")}</a>`).join("")}</section>`
          : "";
      })
      .join("");
    $("#main").className = "main";
    $("#main").innerHTML =
      `<a class="back" href="#/${active}">${icon("back")}Zur Übersicht</a><div class="heading"><div><div class="eyebrow">Alle Bereiche</div><h1>Suchergebnisse</h1><p class="subtitle">${total} Treffer für „${esc(query)}“</p></div></div><div class="panel">${groups || `<div class="empty">${icon("search")}<h3>Keine passenden Einträge.</h3><p>Versuchen Sie einen Namen, Ort oder eine Bezeichnung.</p></div>`}</div>${bottomNote()}`;
  }
  function route() {
    const parts = location.hash.slice(2).split("/");
    const next = cfg[parts[0]] ? parts[0] : "properties";
    if (next !== active) {
      tab = "Alle";
      filter = "";
      view = "list";
    }
    active = next;
    menuOpen = false;
    const search = new URLSearchParams(location.hash.split("?")[1] || "");
    query = parts[0] === "search" ? search.get("q") || "" : "";
    shell();
    document.title = `${cfg[active].label} · klar:eins Demo`;
    if (parts[0] === "search") renderSearch();
    else if (parts[1]) renderDetail(decodeURIComponent(parts[1]));
    else renderList();
    window.scrollTo({ top: 0 });
  }
  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("visible");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("visible"), 4500);
  }
  let returnFocus = null;
  function openDialog(html) {
    returnFocus = document.activeElement;
    const d = $("#editor");
    d.classList.remove("link-dialog");
    d.innerHTML = html;
    d.showModal();
  }
  function closeDialog() {
    $("#editor").close();
    $("#editor").classList.remove("link-dialog");
    if (returnFocus?.isConnected) returnFocus.focus();
  }
  const addressFields = [
    ["street", "Straße", "address-line1"],
    ["houseNumber", "Hausnummer", "off"],
    ["postalCode", "Postleitzahl", "postal-code"],
    ["city", "Ort", "address-level2"],
    ["country", "Land", "country-name"],
  ];
  function renderAddressBlock(address = {}, disabled = false) {
    return `<fieldset class="address-block"><legend>Adresse</legend><div class="address-fields">${addressFields.map(([key, title, autocomplete]) => `<label class="field ${key === "country" ? "wide" : ""}" for="a-${key}"><span>${title} <span class="required">*</span></span><input id="a-${key}" name="address.${key}" value="${esc(address[key] || "")}" required maxlength="120" autocomplete="${autocomplete}" ${disabled ? "readonly" : ""}></label>`).join("")}</div></fieldset>`;
  }
  function openEditor(id) {
    const k = active,
      c = cfg[k],
      existing = id ? find(k, id) : null,
      r = existing || {};
    const numbered = ["properties", "buildings"].includes(k),
      propertyId =
        (existing
          ? r.propertyId
          : k === "buildings"
            ? db.properties[0]?.id
            : "") || "";
    const inherited =
      k === "buildings" &&
      (existing ? r.addressMode === "inherit" : Boolean(propertyId));
    const initialAddress = inherited
      ? find("properties", propertyId)?.address || {}
      : r.address || { country: "Deutschland" };
    const fieldHtml = fieldsFor(k)
      .map((f) => {
        let input;
        const value = f.key === "propertyId" ? propertyId : (r[f.key] ?? ""),
          attrs = `id="f-${f.key}" name="${f.key}" ${f.required ? "required" : ""}`;
        if (f.type === "select")
          input = `<select ${attrs}>${f.options.map(([v, l]) => `<option value="${esc(v)}" ${value === v ? "selected" : ""}>${esc(l)}</option>`).join("")}</select>`;
        else if (f.type === "textarea")
          input = `<textarea ${attrs} maxlength="2000" rows="3">${esc(value)}</textarea>`;
        else
          input = `<input ${attrs} type="${f.type}" value="${esc(value)}" ${f.type === "number" ? `min="${f.min}" max="${f.max}" step="${f.step}"` : 'maxlength="180"'} ${f.type === "date" ? 'min="1900-01-01" max="2200-12-31"' : ""}>`;
        return `<label class="field ${f.wide ? "wide" : ""}" for="f-${f.key}"><span>${esc(f.title)}${f.required ? ' <span class="required" aria-label="Pflichtfeld">*</span>' : ""}</span>${input}</label>`;
      })
      .join("");
    openDialog(
      `<form id="record-form"><div class="dialog-head"><div><h2 id="dialog-title">${c.singular} ${existing ? "bearbeiten" : "anlegen"}</h2><p>Nur fiktive Angaben verwenden. Lokal im Browser gespeichert.</p></div><button type="button" class="icon-button" data-action="close-dialog" aria-label="Schließen">${icon("close")}</button></div><div class="form-body">${numbered ? `<div class="system-id"><span>${k === "properties" ? "Immobilien" : "Gebäude"}-ID</span><output aria-label="Automatisch vergebene ID">${esc(existing?.id || nextId(k))}</output><small>Automatisch · nur lesbar · vorläufig sichtbar</small></div>` : ""}${fieldHtml}${k === "buildings" ? `<label class="inherit-control"><input type="checkbox" id="inherit-address" ${inherited ? "checked" : ""} ${!propertyId ? "disabled" : ""}><span>Adresse von der Immobilie übernehmen<small>Gleiche Adresse verwenden. Für eine abweichende Adresse abwählen.</small></span></label>` : ""}${numbered ? renderAddressBlock(initialAddress, inherited) : ""}<div id="form-error" class="form-error" role="alert" hidden></div><div class="form-hint">* Pflichtfeld${["units", "contracts"].includes(k) ? " · Zuordnungen sind optional. Status und Beträge werden unabhängig gepflegt." : ""}</div></div><div class="dialog-foot"><div class="actions"><button type="button" class="button" data-action="close-dialog">Abbrechen</button><button type="submit" class="button primary">${icon("check")}Speichern</button></div></div></form>`,
    );
    if (k === "buildings") {
      const syncAddress = () => {
        const parent = find("properties", $("#f-propertyId").value),
          check = $("#inherit-address");
        check.disabled = !parent;
        if (!parent) check.checked = false;
        for (const [key] of addressFields) {
          const input = $(`#a-${key}`);
          input.readOnly = check.checked;
          if (check.checked) input.value = parent.address[key];
        }
      };
      $("#inherit-address").addEventListener("change", syncAddress);
      $("#f-propertyId").addEventListener("change", syncAddress);
    }
    $("#record-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.currentTarget,
        values = new FormData(form),
        next = {
          ...(existing || {}),
          id:
            existing?.id ||
            (numbered
              ? nextId(k)
              : `${k[0]}-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`),
        };
      for (const f of fieldsFor(k)) {
        let value = String(values.get(f.key) || "").trim();
        if (f.required && !value) {
          const field = $(`[name="${f.key}"]`, form);
          field.setCustomValidity("Bitte dieses Pflichtfeld ausfüllen.");
          field.reportValidity();
          field.addEventListener("input", () => field.setCustomValidity(""), {
            once: true,
          });
          return;
        }
        next[f.key] =
          f.type === "number" ? (value === "" ? null : Number(value)) : value;
      }
      if (numbered) {
        next.address = {};
        for (const [key] of addressFields) {
          const value = String(values.get(`address.${key}`) || "").trim();
          if (!value) {
            const field = $(`#a-${key}`);
            field.setCustomValidity("Bitte diese Adressangabe ausfüllen.");
            field.reportValidity();
            field.addEventListener("input", () => field.setCustomValidity(""), {
              once: true,
            });
            return;
          }
          next.address[key] = value;
        }
      }
      if (k === "buildings")
        next.addressMode = $("#inherit-address").checked ? "inherit" : "custom";
      if (k === "contracts" && next.end && next.end < next.start) {
        const error = $("#form-error");
        error.textContent =
          "Das Vertragsende muss am oder nach dem Vertragsbeginn liegen.";
        error.hidden = false;
        $("#f-end").focus();
        return;
      }
      if (k === "properties" && !next.accent)
        next.accent = ["sage", "sand", "clay"][db.properties.length % 3];
      if (existing) db[k] = db[k].map((x) => (x.id === id ? next : x));
      else db[k].push(next);
      if (k === "properties")
        db.buildings.forEach((b) => {
          if (b.propertyId === next.id && b.addressMode === "inherit")
            b.address = clone(next.address);
        });
      const saved = persist();
      closeDialog();
      location.hash = `#/${k}/${encodeURIComponent(next.id)}`;
      route();
      toast(
        saved
          ? `${c.singular} ${existing ? "aktualisiert" : "angelegt"} · lokal gespeichert`
          : "Änderung nur für diese Sitzung gespeichert.",
      );
    });
  }
  function confirmReset() {
    openDialog(
      `<div class="dialog-head"><div><h2 id="dialog-title">Beispieldaten zurücksetzen?</h2><p>Für einen frischen Blick auf die Demo.</p></div><button class="icon-button" data-action="close-dialog" aria-label="Schließen">${icon("close")}</button></div><div class="confirm-body">Alle Änderungen in diesem Browser werden durch die ursprünglichen, fiktiven Beispieldaten ersetzt. Dies lässt sich nicht rückgängig machen.</div><div class="dialog-foot"><div class="actions"><button class="button" data-action="close-dialog">Abbrechen</button><button class="button primary" data-action="confirm-reset">Zurücksetzen</button></div></div>`,
    );
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest(".skip-link")) {
      e.preventDefault();
      $("#main").focus();
      return;
    }
    const button = e.target.closest("[data-action]");
    if (!button) return;
    const a = button.dataset.action;
    if (a === "create") openEditor();
    if (a === "edit") openEditor(button.dataset.id);
    if (a === "close-dialog") closeDialog();
    if (a === "reset") confirmReset();
    if (a === "confirm-reset") {
      db = clone(window.KLAREINS_SEED);
      const saved = persist();
      closeDialog();
      tab = "Alle";
      filter = "";
      query = "";
      location.hash = `#/${active}`;
      route();
      toast(
        saved
          ? "Beispieldaten wiederhergestellt."
          : "Beispieldaten für diese Sitzung wiederhergestellt.",
      );
    }
    if (a === "tab") {
      tab = button.dataset.value;
      renderList();
    }
    if (a === "view") {
      view = button.dataset.value;
      renderList();
    }
    if (a === "clear-filter") {
      tab = "Alle";
      filter = "";
      renderList();
    }
    if (a === "menu" || a === "close-menu") {
      menuOpen = a === "menu";
      $(".sidebar").classList.toggle("open", menuOpen);
      $(".mobile-overlay").classList.toggle("open", menuOpen);
      $(".mobile-menu").setAttribute("aria-expanded", String(menuOpen));
      if (menuOpen) $(".nav a").focus();
    }
  });
  document.addEventListener("change", (e) => {
    if (e.target.id === "filter") {
      filter = e.target.value;
      renderList();
    }
  });
  document.addEventListener("submit", (e) => {
    if (e.target.id === "search-form") {
      e.preventDefault();
      const q = $("#global-search").value.trim();
      if (q) {
        query = q;
        location.hash = `#/search/?q=${encodeURIComponent(q)}`;
      } else location.hash = `#/${active}`;
    }
  });
  document.addEventListener("input", (e) => {
    if (
      e.target.id === "global-search" &&
      !e.target.value &&
      location.hash.startsWith("#/search")
    )
      location.hash = `#/${active}`;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $("#editor").open) { e.preventDefault(); closeDialog(); return; }
    if (e.key === "Escape" && menuOpen) {
      menuOpen = false;
      $(".sidebar").classList.remove("open");
      $(".mobile-overlay").classList.remove("open");
      $(".mobile-menu").setAttribute("aria-expanded", "false");
      $(".mobile-menu").focus();
    }
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      $("#global-search").focus();
    }
  });
  $("#editor").addEventListener("click", (e) => {
    if (e.target === $("#editor")) {
      const r = e.target.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        closeDialog();
    }
  });
  window.addEventListener("hashchange", route);
  route();
})();
