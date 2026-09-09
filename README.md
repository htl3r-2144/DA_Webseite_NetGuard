# NetGuard — Projektwebsite

Website zur Diplomarbeit *„Fortinet Security Fabric in der Praxis"* der
HTL Wien 3 Rennweg, Maturajahrgang 2027.

Statische Seite ohne Build-Step, ohne Framework, ohne npm. Vanilla HTML, CSS und
JavaScript. Zur Laufzeit werden **keine** externen Ressourcen geladen: keine
Fonts von Google, kein CDN, kein Analytics, keine Cookies.

**Live:** https://htl3r-2144.github.io/DA_Webseite_NetGuard/

Gestaltungsidee: *das Gewebe*. Eine Security Fabric ist wörtlich ein Gewebe aus
Fäden (Datenflüssen) und Knoten (Komponenten). Daraus kommen das animierte
Gewebe im Hero, das kleine Gewebe-Zeichen vor Überschriften, die Statuskonsole
mit dem live berechneten Projektstand und die laufenden Datenpakete im
Architekturdiagramm. Akzentfarbe ist das Rot des Schullogos.

---

## Aufbau — zehn eigenständige Seiten

Jeder Menüpunkt ist eine echte HTML-Datei mit eigener Adresse. Man kann also
direkt auf `…/team.html` verlinken, und der Zurück-Knopf des Browsers
funktioniert wie erwartet.

```
index.html          Übersicht: Projekt, Forschungsfrage, Ausgangssituation, Inhaltskacheln
architektur.html    die vier Fortinet-Komponenten als Diagramm
phasen.html         Phase 1 und Phase 2 gegenübergestellt
fortschritt.html    Meilenstein-Timeline
ergebnisse.html     Platzhalter und vorbereitetes Diagramm
team.html           vier Mitglieder, zwei Betreuer
kontakt.html        Kontaktformular (mailto, keine Datenübertragung)
faq.html            häufige Fragen als aufklappbare Liste
impressum.html      Offenlegung, Haftung, Urheberrecht, Marken   (nur im Footer verlinkt)
datenschutz.html    Datenschutzerklärung                         (nur im Footer verlinkt)
404.html            Fehlerseite, wird von GitHub Pages automatisch ausgeliefert
```

Dazu kommen `robots.txt`, `sitemap.xml` und `site.webmanifest` im Hauptordner.

Die HTML-Dateien sind reine Gerüste — Kopfzeile, Inhalt und Fußzeile baut
`js/render.js` aus `data/content.js` auf. Welche Seite gerendert wird, steht im
`<body data-seite="…">`.

```
data/content.js     ALLE Inhalte — die einzige Datei für Updates
css/styles.css      Design-Tokens und Layout
js/render.js        baut die Seiten aus content.js auf
js/chart.js         SVG-Balkendiagramm für die Ergebnisse
assets/             Logo, Favicon, Icons, Social-Preview, Schriften
tools/og-generator.html   erzeugt og-image.png und die PNG-Icons im Browser
PLAN.md             Designentscheidungen
ENTWURF-CHECKLISTE.md   welche Texte noch zu ersetzen sind
```

Alle Pfade sind relativ (`./assets/…`), damit die Seite sowohl unter
`github.io/NetGuard/` als auch beim lokalen Doppelklick funktioniert.

---

## Inhalte ändern

**Alle Texte stehen in einer einzigen Datei: [`data/content.js`](data/content.js).**

Dort ist oben eine Anleitung. Kurzfassung:

1. `data/content.js` in einem Texteditor öffnen (Notepad genügt, besser VS Code).
2. Text zwischen den Anführungszeichen austauschen.
3. Speichern, die Seite im Browser mit `Strg`+`F5` neu laden.

An HTML, CSS oder JavaScript muss dafür **nie** etwas geändert werden. Auch neue
Meilensteine, Teammitglieder oder Messwerte sind reine Einträge in dieser Datei.

**Eine Ausnahme:** Titel und Beschreibung für Browser-Tab, Suchmaschinen und
Link-Vorschau stehen im Kopf der jeweiligen `.html`-Datei. Grund: Facebook,
LinkedIn, WhatsApp und Crawler führen kein JavaScript aus und lesen nur den
ausgelieferten Quelltext. Diese Angaben sind in jeder Datei kommentiert.

### Entwurfstexte finden

Viele Texte sind noch Entwürfe. Um sie markiert zu sehen, `?entwurf` an die
Adresse hängen:

```
architektur.html?entwurf
```

Einen Text final setzen — aus:

```js
beschreibung: { text: 'Vorläufiger Text …', entwurf: true },
```

wird:

```js
beschreibung: 'Der endgültige Text.',
```

Vollständige Liste: [ENTWURF-CHECKLISTE.md](ENTWURF-CHECKLISTE.md).

### Eine Seite hinzufügen oder entfernen

In `content.js` ganz oben steht `navigation`. Die Reihenfolge dort bestimmt Menü,
Nummerierung und die Blätter-Links am Seitenende.

* **Entfernen:** Eintrag auskommentieren (`//` davor).
* **Hinzufügen:** eine bestehende `.html` kopieren, im `<body>` das `data-seite`
  anpassen, in `navigation` eintragen und in `js/render.js` unten bei `SEITEN`
  registrieren.

---

## Launch-Checkliste — was schon erledigt ist

| Punkt | Umsetzung |
|---|---|
| Datenschutz | `datenschutz.html`, Texte in `content.js` → `datenschutz` (Entwurf, prüfen) |
| Impressum / Nutzungshinweise | `impressum.html` (§ 5 ECG, § 25 MedienG, Haftung, Urheberrecht, Marken) |
| Klarer Call-to-Action | zwei Schaltflächen im Hero, konfigurierbar in `hero.aktionen` |
| FAQ | `faq.html`, Fragen in `content.js` → `faq.fragen`, mit FAQPage-Strukturdaten |
| robots.txt / sitemap.xml | im Hauptordner, Sitemap listet alle zehn Seiten |
| 404-Seite | `404.html`, funktioniert auch in Unterpfaden |
| Alt-Texte | Logo, Avatare, Diagramme (`<title>`/`<desc>`) |
| Analytics | bewusst **aus**. Optional cookiefrei über `meta.analytik` (Umami/Plausible), sonst GitHub → Insights → Traffic |
| Meta-Titel und -Beschreibung | je Seite eindeutig, im `<head>` jeder `.html` |
| Social Share | Open Graph + Twitter Card, `assets/og-image.png` 1200×630 |
| Favicon | `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192/512.png`, Manifest |
| Canonical-URLs | zeigen auf `htl3r-2144.github.io/DA_Webseite_NetGuard/` |
| Cookie-Banner | **nicht nötig**: keine Cookies, nur ein localStorage-Wert für das Farbschema (funktional) |
| Mobile | Burger-Menü unter 900 px, alle Raster brechen um |
| Barrierefreiheit | Skip-Link, Fokusringe, `aria-current`, Formularfehler mit `role="alert"`, reduzierte Bewegung |
| Formular | Validierung mit Fehlermeldungen, mailto ohne Server |
| Links | alle internen Links werden beim Rendern aus `navigation` erzeugt — keine toten Pfade |
| Performance | keine externen Requests, Schriften lokal + preload, SVG statt Bilder |

### Schriften

Inter, JetBrains Mono und IBM Plex Sans Condensed liegen als WOFF2 in
`assets/fonts/`, jeweils mit OFL-Lizenztext. Details in
[assets/fonts/README.md](assets/fonts/README.md).

### Logo

`assets/logo-htl.svg` (Wortmarke, Kopfzeile) und `assets/logo-htl-slogan.svg`
(mit Slogan, Fußzeile) sind aus der offiziellen Logodatei erzeugt. Die Grafik
ist nachgezeichnet und braucht einen hellen Untergrund — deshalb liegt sie
immer auf einer weißen Plakette, auch im dunklen Modus.

### Social-Preview und Icons neu erzeugen

`tools/og-generator.html` im Browser über einen lokalen Server öffnen
(siehe unten), in der Konsole `await render()` ausführen und die Data-URLs aus
`OG.og` bzw. `OG.i512` … als PNG speichern. Nur nötig, wenn sich Titel, Logo
oder Farben ändern.

---

## Veröffentlichen auf GitHub Pages

Einmalig:

```bash
git init && git add -A && git commit -m "NetGuard Projektwebsite"
```

Dann auf GitHub das Repository anlegen und pushen (bereits geschehen):

```bash
git remote add origin https://github.com/htl3r-2144/DA_Webseite_NetGuard.git && git branch -M main && git push -u origin main
```

Anschließend im Repository unter **Settings → Pages** als Quelle `main` und
`/ (root)` auswählen. Die Seite ist danach erreichbar unter:

```
https://htl3r-2144.github.io/DA_Webseite_NetGuard/
```

Spätere Änderungen:

```bash
git add -A && git commit -m "Inhalte aktualisiert" && git push
```

Die Datei `.nojekyll` muss im Repository bleiben — ohne sie verarbeitet GitHub
die Seite mit Jekyll, was hier nicht gewollt ist.

### Lokal ansehen

`index.html` doppelklicken genügt. Wer lieber einen kleinen Server will:

```bash
python -m http.server 8123
```

---

## Rahmenbedingungen

* Heller Modus ist auf jeder Seite der Standard, unabhängig vom Systemschema.
  Dunkler Modus nur über den Schalter in der Kopfzeile; die Wahl wird im
  Browser gespeichert und gilt sofort auf allen Seiten und offenen Tabs.
* Kontraste durchgehend mindestens WCAG AA (schwächster Textwert 4,86:1).
* `prefers-reduced-motion: reduce` schaltet sämtliche Animationen ab.
* Alle Angaben zur Infrastruktur sind generalisiert. Keine IP-Adressen, keine
  Hostnamen, keine Netzsegmente, keine Klassenbezeichnungen.
