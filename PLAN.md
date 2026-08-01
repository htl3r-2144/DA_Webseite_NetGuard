# NetGuard — Projektwebsite · Planungsdokument

**Stand:** 28.07.2026 · **Status:** umgesetzt, siehe Abschnitt 10
**Ziel-URL:** `https://htl3r-2146.github.io/NetGuard/`
**Projektordner:** `C:\Users\Michal\Claude Code\NetGuard\` *(mit dem Repo-Namen benannt, damit Ordner und Repository beim Push identisch heißen)*

---

## 0. Entscheidungen und offene Punkte

Zwei der drei Punkte sind entschieden. Offen ist nur noch 0.3.

### 0.1 Ziele-Abschnitt — erledigt, gestrichen ✅

Entschieden am 28.07.2026: **Der Abschnitt „Ziele" entfällt vollständig.** Weder Haupt- noch optionale noch NICHT-Ziele stehen auf der Seite, das Menü hat entsprechend einen Punkt weniger (sieben statt acht).

Die inhaltlich zentrale Aussage aus Ziel-H 5 — worauf der Vergleich beider Phasen hinausläuft — ist stattdessen an den Phasen-Abschnitt angehängt (`phasen.vergleich` in `content.js`). Ohne sie fehlte der Seite die Antwort auf die Frage, was am Ende herauskommen soll.

> Unabhängig davon: **Ziel-N 1 und N 2 gehören im PDF selbst korrigiert.** So wie sie dastehen, sagen sie zu, dass ihr einen dauerhaften SOC-Betrieb einrichtet und aktiv ins Schulnetz eingreift. Das ist bei einer Prüfungskommission kein Schönheitsfehler, sondern eine zugesagte Leistung.

### 0.2 Antrags-PDF — erledigt, Originalfassung ✅

Entschieden am 28.07.2026: **Das Ansuchen geht als Originalfassung online**, inklusive der vier Schul-E-Mail-Adressen auf Seite 9 (`2144@`, `2146@`, `2128@`, `2134@htl.rennweg.at`).

Die Datei liegt als `assets/da-ansuchen.pdf` im Ordner und ist im Footer verlinkt. Drei der vier Adressen gehören David, Paul und Julian — sie sollten das wissen, bevor gepusht wird.

Zum späteren Zurücknehmen reicht das Entfernen des Eintrags in `content.js` **nicht**: die Datei bliebe unter ihrer direkten URL erreichbar und müsste zusätzlich mit `git rm` gelöscht und der Löschstand gepusht werden.

### 0.3 Schullogo + Impressum (F12, F14)

- **Logo:** Ich kann die Datei nicht beschaffen (fremdes Markenzeichen, und externe Requests sind ohnehin ausgeschlossen). Du legst `./assets/logo-htl.svg` ab — ich liefere einen neutralen Platzhalter unter genau diesem Pfad, den du überschreibst. Bitte kurz mit der Betreuung abklären, dass die Logo-Nutzung freigegeben ist.
- **Medieninhaber:** Du hast „die Schule" angegeben. Eine Seite, die auf einem **privaten GitHub-Account** liegt und die HTL als Medieninhaber nennt, macht die Schule presserechtlich für Inhalte verantwortlich, die sie nicht kontrolliert. Sauberer und üblich für Schülerprojekte:

  > **Medieninhaber und Herausgeber:** HTL Wien 3 Rennweg, Rennweg 89b, 1030 Wien
  > **Für den Inhalt verantwortlich:** Projektteam NetGuard (D. Mayerhofer, M. Motola, P. Bauer, J. Heyderer)
  > Diplomarbeitsprojekt — keine offizielle Website der HTL Wien 3 Rennweg.

  Der ganze Block liegt als `entwurf: true` in `content.js`. **Die Anschrift bitte gegenprüfen**, ich habe sie nicht aus dem Antrag (dort steht keine).

---

## 1. Deine Entscheidungen — so setze ich sie um

| # | Antwort | Umsetzung |
|---|---|---|
| F1 | Variante B | Akzent Cyan, Rot/Amber/Grün bleiben für Statussemantik frei |
| F2 | Inter + JetBrains Mono | beide SIL OFL 1.1, lokal als WOFF2, Anleitung → Abschnitt 7 |
| F3 | Fonts selbst ablegen | `./assets/fonts/README.md` mit exakten Dateinamen; Seite funktioniert auch ohne die Dateien |
| F4 | Hardware nennen | „Cisco UCS" und „FortiGate als physische Appliance" werden genannt |
| F5 | VLANs weglassen | keine Segmentnamen, kein „vier VLANs" — nur „segmentierte Laborumgebung" |
| F6 | kein SPAN-Port | Phase 2 = „Analyse von realem Schulnetzwerk-Traffic", kein Spiegelpunkt, keine Klassen |
| F7 | Szenarien nennen | Port Scan, Brute Force (SMB/RDP), Lateral Movement, C2-Simulation, Policy-Verstoß |
| F8 | DSGVO-Teil raus | kein DSGVO-Statusabschnitt, kein Genehmigungs-Hinweis, kein DSGVO-Meilenstein¹ |
| F9 | PDF verlinken | siehe 0.2 |
| F10 | Namen öffentlich | volle Namen aller vier Schüler + beider Betreuer |
| F11 | „so wie es passt" | Kürzel (MAY/MOT/BAU/HEY/SDO/KUS) an den Personen, „Maturajahrgang 2027" im Footer² |
| F12 | Schule | siehe 0.3 |
| F13 | Kontaktformular | mailto-Formular, siehe Abschnitt 6.9 |
| F14 | Logo Pflicht | siehe 0.3 |
| F15 | Timeline mit Pfeil | 7 Meilensteine, 09/2026 – 05/2027, animierte Fortschrittslinie mit Pfeilspitze |
| F16 | htl3r-2146 / NetGuard | `canonical` + OG auf `https://htl3r-2146.github.io/NetGuard/` |
| F17 | ja | Ordner angelegt |
| F18 | mein Vorschlag | Forschungsfrage vollständig als Monospace-Blockzitat im Hero |
| F19 | siehe 0.1 | |

¹ **Eine Einschränkung:** Julian Heyderers Themenschwerpunkt lautet im Antrag wörtlich „FortiAnalyzer (Logging, Reports, Forensik), SPAN-Port Setup, DSGVO-Konzept und Anonymisierung". Das ist eine Rollenbeschreibung, kein Statement zum Genehmigungsstand — ich kürze es auf „FortiAnalyzer (Logging, Reports, Forensik), Datenschutzkonzept und Anonymisierung" (SPAN-Port raus wegen F6, Datenschutz bleibt, sonst wäre seine Rolle falsch dargestellt). Sag Bescheid, wenn das auch weg soll.

² **Achtung Klasse:** Im Antrag steht 4AX (Schuljahr 2025/26). Im Maturajahr 2026/27 seid ihr 5AX. Die Klasse liegt als **ein** Feld in `content.js` — eine Stelle ändern, überall aktuell. Standardmäßig zeige ich nur „Maturajahrgang 2027", weil das nicht veraltet.

---

## 2. Dateistruktur

```
NetGuard/
├── index.html                       Übersicht: Hero, Forschungsfrage, Ausgangssituation, Kacheln
├── architektur.html                 ┐
├── phasen.html                      │
├── fortschritt.html                 │ eigenständige Seiten, jede mit eigener Adresse.
├── ergebnisse.html                  │ Reine Gerüste — Inhalt kommt aus content.js.
├── team.html                        │
├── kontakt.html                     ┘
├── .nojekyll                        verhindert Jekyll-Verarbeitung auf GitHub Pages
├── PLAN.md                          dieses Dokument
├── README.md                        Kurzanleitung: Inhalte pflegen + deployen
├── ENTWURF-CHECKLISTE.md            offene Entwurfstexte
├── data/
│   └── content.js                   ★ EINZIGE Datei, die für Inhalts-Updates angefasst wird
├── css/
│   └── styles.css                   Design-Tokens + Layout, keine Inline-Styles
├── js/
│   ├── render.js                    baut Kopfzeile, Seiteninhalt und Fußzeile aus content.js
│   └── chart.js                     SVG-Balkendiagramm für die späteren Ergebnisse
└── assets/
    ├── logo-htl.svg                 ← von dir zu ersetzen (Platzhalter liegt dort)
    ├── favicon.svg
    ├── apple-touch-icon.png         180×180, generiert
    ├── og-image.svg                 Quelle des Social-Preview-Bildes
    ├── og-image.png                 1200×630, generiert  ← siehe Hinweis unten
    ├── da-ansuchen.pdf              Originalfassung, im Footer verlinkt (siehe 0.2)
    └── fonts/
        ├── README.md                Anleitung: welche Datei wohin
        ├── inter-400.woff2          ← von dir
        ├── inter-600.woff2          ← von dir
        ├── jetbrains-mono-400.woff2 ← von dir
        ├── OFL-Inter.txt            ← von dir (OFL verlangt Mitlieferung)
        └── OFL-JetBrainsMono.txt    ← von dir
```

**Zum og-image:** Dein Briefing verlangt eine generierte `og-image.svg`. Die liefere ich — aber **Facebook, LinkedIn, WhatsApp und X lesen kein SVG als `og:image`**. Damit die Vorschau tatsächlich funktioniert, generiere ich zusätzlich eine PNG-Fassung 1200×630 und verweise in den Meta-Tags darauf. Die SVG bleibt die bearbeitbare Quelle.

**Zum Modulsystem:** `content.js` definiert `window.NETGUARD_CONTENT = { … }` statt `export const`. Grund: ES-Module werden bei `file://` von jedem Browser blockiert — ein Teammitglied könnte `index.html` nicht per Doppelklick prüfen, bevor es pusht. Mit einem normalen `<script>` funktioniert lokales Öffnen und GitHub Pages identisch. Kein Build-Step, kein npm, keine Module-CORS-Falle.

---

## 3. Design-System

### 3.1 Farben — alle Kontraste gemessen, nicht geschätzt

Gestaltungsidee: **technisches Dossier.** Warmer Papierton als Grund, weiße Karten, die sich davon abheben, Haarlinien statt kräftiger Schatten, monospace Kennungen. Ein einziger Akzentton.

**Light (Default)** — Grund `#FAFAF7`, Karten `#FFFFFF`, vertieft `#F1F1EC`

| Token | Hex | auf Grund | auf Karte | vertieft |
|---|---|---|---|---|
| `--fg` Fließtext | `#16181A` | **17,0:1** | 17,8:1 | 15,7:1 |
| `--fg-2` sekundär | `#4E5459` | **7,3:1** | 7,7:1 | 6,8:1 |
| `--fg-3` Meta/Labels | `#63696E` | 5,3:1 | 5,6:1 | **4,9:1** |
| `--accent` | `#0B6E84` | **5,6:1** | 5,9:1 | 5,2:1 |
| Weiß auf Akzent (Buttons) | — | 5,9:1 | | |

**Dark (`prefers-color-scheme: dark`)** — Grund `#0C0E10`, Karten `#14171A`

| Token | Hex | auf Grund | auf Karte |
|---|---|---|---|
| `--fg` | `#E9ECEE` | **16,3:1** | 15,2:1 |
| `--fg-2` | `#A5AEB4` | **8,6:1** | 8,0:1 |
| `--fg-3` | `#828B91` | 5,6:1 | 5,2:1 |
| `--accent` | `#45C7F0` | **9,8:1** | 9,2:1 |

Der schwächste Textwert im ganzen System ist **4,91:1** — AA verlangt 4,5:1.

**Statusfarben** (Timeline, später Charts) — bewusst *nicht* der Akzent, damit „laufend" nicht mit „Link" verwechselt wird:
`geplant` = `--fg-3` (grau, Ring offen) · `laufend` = `--accent` (gefüllt, pulsierender Ring) · `abgeschlossen` = `--fg-2` (gefüllt, Häkchen). Status wird **zusätzlich als Text** ausgegeben, nie nur farbcodiert.

### 3.2 Typografie

- **Inter** — UI und Fließtext, 400/600. Zeilenlänge max. 68 Zeichen (`max-width: 68ch`).
- **JetBrains Mono** — 400, für: Zielcodes (`ZIEL-H 3`), Komponentennamen im Diagramm, Forschungsfrage, Meta-Labels, Zahlenwerte in Charts.
- Skala (`clamp()`, keine Media-Query-Sprünge): `2.75rem→4rem` Hero · `1.75rem` H2 · `1.125rem` H3 · `1rem/1.65` Body · `0.8125rem` Meta.
- Deutsche Komposita: `hyphens: auto` + `lang="de"` — sonst reißen „Authentifizierungsdaten" und „Netzwerksegmentierung" das Layout auf Mobil auf.

### 3.3 Raster und Rhythmus

8-px-Basis, Sektionsabstand `clamp(5rem, 10vw, 8rem)`. Inhaltsbreite 1120 px, Textspalten 68ch. Eine durchgehende vertikale Hairline links als optischer Anker (wie Stripe Docs) — reines CSS, kein Bild.

### 3.4 Bewegung

| Element | Verhalten |
|---|---|
| Seitenaufruf | gestaffelter Auftritt der Hauptelemente, 70 ms Versatz je Element, 520 ms — nur `opacity` und `transform`, die Elemente belegen ihren Platz von Anfang an |
| Blöcke weiter unten | Scroll-Reveal via `IntersectionObserver`, 12 px Versatz + Opacity, 420 ms |
| Architekturdiagramm | Hover/Fokus hebt Komponente hervor, Erklärung erscheint im festen Detailfeld daneben (kein Tooltip → kein Layout-Shift) |
| Timeline | Fortschrittslinie wächst bis zum aktuellen Meilenstein, **Pfeilspitze** sitzt am Ende der Linie; einmalig, 900 ms |
| Kacheln, Karten | Rahmen färbt sich zum Akzent, weicher Schatten, 2 px Anhebung, Pfeil rückt 4 px nach rechts |
| `prefers-reduced-motion` | **alles aus**: Linie sofort auf Endlänge, Auftritt und Reveals auf `opacity: 1`, keine Transitions, keine Anhebung |

Nicht enthalten: Parallax, Partikel, Cursor-Effekte, Autoplay. Wie besprochen.

---

## 4. `content.js` — Datenschema

Eine Datei, ein Objekt, kommentiert für Leute ohne Web-Erfahrung. Struktur im Überblick:

```js
window.NETGUARD_CONTENT = {

  meta:        { titel, beschreibung, url, sprache, logo, logoAlt },

  hero:        { projektname, untertitel*, forschungsfrage, kennzahlen[] },

  ausgangssituation: { titel, absaetze*[] },

  architektur: {
    einleitung*,
    komponenten: [                    // 4 Stück, Reihenfolge = Reihenfolge im Diagramm
      { id: 'fortigate', name: 'FortiGate', rolle: 'Next-Gen Firewall',
        beschreibung*: '…' }
    ],
    umgebung:  [ { name: 'Active Directory', … } ]   // die simulierte Umgebung
  },

  phasen: [                           // genau 2, werden gegenübergestellt
    { nummer: 1, kurz: 'Laborumgebung', titel, beschreibung*, punkte*[] }
  ],

  ziele: {
    gruppen: [
      { id: 'haupt',    titel: 'Hauptziele',
        eintraege: [ { code: 'ZIEL-H 1', titel, text*, offen: false } ] },
      { id: 'optional', titel: 'Optionale Ziele', eintraege: [ … ] }
      // { id: 'nicht', … }  ← liegt auskommentiert bereit, siehe 0.1
    ]
  },

  fortschritt: {
    zeitraum: { von: '2026-09', bis: '2027-05' },
    meilensteine: [
      { id, titel, zeitraum: '09/2026 – 11/2026',
        status: 'geplant',            // 'geplant' | 'laufend' | 'abgeschlossen'
        beschreibung*: '…' }
    ]
  },

  ergebnisse: {
    status: 'ausstehend',             // auf 'verfuegbar' setzen → Charts erscheinen
    hinweis: 'folgt nach Phase 1',
    charts: [ … ]                     // Schema unten, vorbereitet, noch leer
  },

  team: {
    mitglieder:  [ { name, kuerzel, rolle, schwerpunkt, ziele[], bio*, bild: null } ],
    betreuung:   [ { name, kuerzel, rolle } ]
  },

  kontakt: {
    empfaengerLokal: '2146',          // wird erst im Browser zusammengesetzt
    empfaengerDomain: 'htl.rennweg.at',
    betreffPrefix: '[NetGuard] '
  },

  footer: {
    schule, maturajahrgang, klasse,
    impressum*: { medieninhaber, anschrift, verantwortlich, hinweis },
    generalisierungshinweis,
    dokumente: []                     // siehe 0.2
  }
};
```

`*` = Feld bekommt `entwurf: true` und den Kommentar `// ENTWURF – von Michal ersetzen`.
Technisch: Entwurfstexte stehen als `{ text: '…', entwurf: true }`, reine Fakten als einfacher String. Der Renderer akzeptiert beides — du kannst ein Objekt jederzeit durch einen String ersetzen, sobald der Text final ist. **Das ist gleichzeitig die Erledigt-Markierung.**

**Chart-Schema** (vorbereitet, greift ab Phase 1):

```js
charts: [{
  id: 'erkennungsraten',
  titel: 'Erkennungsrate je Szenario',
  einheit: '%',
  achse: { max: 100, schritt: 25 },
  serien: [ { name: 'Phase 1 (Labor)', ton: 'akzent' },
            { name: 'Phase 2 (Schulnetz)', ton: 'neutral' } ],
  kategorien: [ { label: 'Port Scan', werte: [null, null] }, … ]
}]
```

`chart.js` zeichnet daraus gruppierte Balken als reines SVG — Achsen, Gitter, Werte-Labels, Legende. `null` = „noch nicht gemessen", wird als schraffierter Platzhalterbalken dargestellt, nicht als 0. Barrierefrei über `role="img"` + `<title>`/`<desc>` und eine visuell versteckte Datentabelle, damit Screenreader die Zahlen bekommen.

---

## 5. Seiten

Sieben eigenständige HTML-Dateien statt einer Scroll-Seite. Jeder Menüpunkt hat eine echte Adresse, ist direkt verlinkbar, und der Zurück-Knopf des Browsers verhält sich wie erwartet. Die HTML-Dateien sind reine Gerüste — Kopfzeile, Inhalt und Fußzeile baut `render.js` aus `content.js`; welche Seite gerendert wird, steht im `<body data-seite="…">`.

Jede Unterseite beginnt mit einem **Dossier-Kopf**: `Dokument 03 — 06` in Monospace, großer Titel, Einleitungssatz, darunter eine Metadatenzeile mit zwei aus den Inhalten **berechneten** Kennzahlen (z. B. „Meilensteine 0 von 7 erreicht"). Die veralten dadurch nicht, wenn jemand Einträge ergänzt.

| Datei | Inhalt |
|---|---|
| `index.html` | Hero mit „NetGuard", Antragstitel, Untertitel (Entwurf), Forschungsfrage als Monospace-Blockzitat in einer Karte, drei Kennzahlen (4 · 2 · 9), Ausgangssituation, sechs Inhaltskacheln |
| `architektur.html` | Inline-SVG: die vier Fortinet-Komponenten mit Datenflüssen. Generisch — keine IPs, keine Hostnamen, keine Segmentnamen. Hover/Fokus → Erklärung im festen Detailfeld |
| `phasen.html` | Phase 1 Labor / Phase 2 Schulnetz-Traffic nebeneinander, die fünf Angriffsszenarien als Chips, die Vergleichslogik aus Ziel-H 5 |
| `fortschritt.html` | 7 Meilensteine mit animierter Pfeil-Linie. Status je Meilenstein aus `content.js` |
| `ergebnisse.html` | Leerzustand „folgt nach Phase 1" + Chart-Gerüst mit Achsen und schraffierten Platzhalterbalken |
| `team.html` | 4 Mitglieder + 2 Betreuer. Initialen-Platzhalter, `bild: null` vorbereitet. Keine E-Mail im Klartext |
| `kontakt.html` | Formular (siehe unten), Adresse als kopierbarer Link |
| — | ~~Ziele~~ gestrichen, siehe 0.1 |

Am Fuß jeder Seite stehen **Blätter-Links** auf die vorige und nächste Seite, ebenfalls aus der `navigation`-Liste in `content.js`. Footer mit Schule, Maturajahrgang, Impressum, Generalisierungshinweis und PDF-Download erscheint auf allen Seiten.

**Eine Ausnahme von Regel 4:** Titel und Beschreibung für Browser-Tab, Suchmaschinen und Link-Vorschau stehen im Kopf der jeweiligen `.html`-Datei, nicht in `content.js`. Facebook, LinkedIn, WhatsApp und Crawler führen kein JavaScript aus und lesen nur den ausgelieferten Quelltext — ohne statische Meta-Tags hätte jede Unterseite dieselbe Vorschau. Die Stellen sind in jeder Datei kommentiert.

**Kontaktformular (6.9) — ehrlich zur Einschränkung:** Ein echtes Formular braucht einen Server. GitHub Pages hat keinen, und jeder Dienst wie Formspree wäre ein Third-Party-Request — genau das, was Regel 3 ausschließt (und was ihr im Projekt selbst untersucht).

Was ich baue: ein vollwertig aussehendes Formular (Name, Betreff, Nachricht) mit Validierung. Beim Absenden setzt JavaScript daraus einen `mailto:`-Link zusammen und öffnet das Mailprogramm des Besuchers mit vorausgefülltem Betreff und Text. **Es verlässt nichts den Browser, es gibt keinen Empfänger im HTML-Quelltext, keine Datenverarbeitung durch euch.** Zusätzlich darunter die Adresse als klickbarer, per JS zusammengesetzter Link plus „Adresse kopieren"-Button — für alle ohne eingerichtetes Mailprogramm.

---

## 6. Barrierefreiheit und Performance

- `<header> <nav> <main> <section aria-labelledby> <footer>`, eine `<h1>`, lückenlose Überschriftenhierarchie
- Skip-Link, sichtbarer 2-px-Fokusring mit 2-px-Offset (`:focus-visible`), aktiver Menüpunkt mit `aria-current="page"`
- Diagramm-Komponenten sind `<button>`-Elemente → Tab- und Enter-bedienbar, nicht nur Hover
- `alt`-Texte: Logo beschreibend, dekorative SVG-Teile `aria-hidden="true"`, Diagramm mit `<title>`/`<desc>`
- Alle Bilder mit `width`/`height`, `loading="lazy"` außer Logo (above the fold)
- Fonts: `preload` + `font-display: swap` + metrisch angeglichener System-Fallback (`size-adjust`, `ascent-override`) → CLS bleibt bei 0, auch wenn die WOFF2-Dateien fehlen
- Kein externer Request. Kein Tracking. Kein Cookie. Kein LocalStorage.
- Gesamtgewicht ohne Fonts: geschätzt < 60 kB.

---

## 7. Fonts einlegen — Anleitung (F3)

Beide sind **SIL Open Font License 1.1**, kostenlos, auch kommerziell nutzbar. Bedingung: die Lizenzdatei muss mitgeliefert werden — deshalb die beiden `OFL-*.txt`.

**Inter** → `github.com/rsms/inter` → Releases → neueste ZIP herunterladen → Ordner `web/`
- `Inter-Regular.woff2` → umbenennen in **`inter-400.woff2`**
- `Inter-SemiBold.woff2` → umbenennen in **`inter-600.woff2`**
- `LICENSE.txt` aus dem ZIP → **`OFL-Inter.txt`**

**JetBrains Mono** → `github.com/JetBrains/JetBrainsMono` → Releases → ZIP → Ordner `fonts/webfonts/`
- `JetBrainsMono-Regular.woff2` → umbenennen in **`jetbrains-mono-400.woff2`**
- `OFL.txt` aus dem ZIP → **`OFL-JetBrainsMono.txt`**

Alle fünf Dateien nach `assets/fonts/`. Die exakten Zieldateinamen sind wichtig — dann muss am CSS nichts geändert werden. Wenn du eine Datei nicht findest oder sie anders heißt, sag mir den tatsächlichen Namen, statt das CSS zu raten.

Bis die Dateien da sind, läuft die Seite auf `system-ui` / `ui-monospace` — sie sieht etwas generischer aus, bricht aber nicht.

---

## 8. Deployment

```bash
cd "C:\Users\Michal\Claude Code\NetGuard" && git init && git add -A && git commit -m "NetGuard Projektwebsite"
```

Danach auf GitHub das Repo `NetGuard` unter `htl3r-2146` anlegen, als Remote eintragen, pushen, und in *Settings → Pages* als Quelle `main` / `/ (root)` wählen. Die `.nojekyll` liegt bereits im Ordner.

Alle Pfade sind relativ (`./assets/…`) — die Seite läuft dadurch unter `htl3r-2146.github.io/NetGuard/` genauso wie beim lokalen Doppelklick auf `index.html`.

---

## 9. Felder mit `entwurf: true`

**31 Entwurfstexte.** Die vollständige Ersetzungs-Checkliste mit Zeilennummern steht in [ENTWURF-CHECKLISTE.md](ENTWURF-CHECKLISTE.md).

Zum Anzeigen im Browser: `index.html?entwurf` öffnen — dann bekommt jeder noch nicht finale Text eine sichtbare Markierung.

**Nicht** als Entwurf markiert, weil wörtlich oder direkt aus dem Antrag: Projektname, Antragstitel, Forschungsfrage, Komponentennamen und -rollen, Bausteine der Laborumgebung, Angriffsszenarien, Vergleichspunkte, Namen, Kürzel, Rollen, Themenschwerpunkte, Maturajahrgang, Schule, Generalisierungshinweis.

---

## 10. Umsetzungsstand

Implementiert am 28.07.2026, danach auf Multi-Page und hellen Grund umgestellt. Alle sieben Seiten einzeln geprüft:

* **Struktur:** jede Seite lädt, korrekter Titel, genau eine `<h1>`, aktiver Menüpunkt mit `aria-current="page"`, Blätter-Links zeigen auf die richtigen Nachbarseiten
* **Kontraste im laufenden DOM:** hell `#FAFAF7` bestätigt als Standard, schwächster gemessener Textwert **4,91:1** (Meta-Labels auf vertiefter Fläche), Formularlabels 5,56:1
* **Kein horizontaler Overflow** auf allen sieben Seiten bei 1440 px
* **Architektur:** vier bedienbare Knoten, Detailfeld reagiert, keine Textüberläufe im Diagramm
* **Fortschritt:** Fortschrittslinie und Pfeil landen exakt auf dem aktiven Meilenstein (Soll 231,7 px = Ist 231,7 px), Metadatenzeile zählt „0 von 7 erreicht" korrekt
* **Ergebnisse:** ein Diagramm, 10 schraffierte Platzhalterbalken, Legende, versteckte Datentabelle für Screenreader
* **Team:** vier Karten in einer Zeile, alle exakt gleich hoch (557 px), Initialen korrekt
* **Kontakt:** drei Felder, alle `label`-Zuordnungen gültig, mailto wird korrekt zusammengesetzt
* **Audit:** keine externe URL in einem ladenden Attribut (nur `rel="canonical"` und `og:*`, beides Meta), kein führender Slash, keine E-Mail-Adresse im Klartext, keine VLAN-, IP- oder Klassenangabe im Inhalt

Screenshots waren nicht möglich — der Vorschau-Bereich hat keine Frames geliefert. Die Prüfung lief deshalb über Geometrie- und Kontrastmessung im laufenden DOM statt über Bilder.
