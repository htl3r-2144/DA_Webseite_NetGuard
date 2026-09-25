# Ersetzungs-Checkliste — Entwurfstexte

**Rund 50 Texte** in [`data/content.js`](data/content.js) sind von mir formuliert und
warten auf deine Fassung. Alle stammen ausschließlich aus dem
Diplomarbeitsansuchen — es sind keine Ergebnisse, Zahlen oder Zitate erfunden.

**Im Browser anzeigen:** `?entwurf` an die Adresse hängen, z. B.
`architektur.html?entwurf`. Jeder noch offene Text bekommt dann eine Markierung
*Entwurf*. Auf der normalen Seite ist nichts davon sichtbar.

**Erledigt markieren:** den Block

```js
beschreibung: { text: '…', entwurf: true },
```

ersetzen durch

```js
beschreibung: 'Deine endgültige Fassung.',
```

Damit verschwindet die Markierung automatisch. Eine zweite Liste zum Abhaken
gibt es bewusst nicht — diese Datei hier ist nur die Übersicht.

---

## Navigation — Kachel-Einzeiler

Diese Sätze erscheinen **zweimal**: als Beschreibung auf der Kachel der
Startseite und als Einleitungssatz oben auf der jeweiligen Unterseite.

- [ ] **Z. 127** · Architektur
- [ ] **Z. 141** · Fortschritt
- [ ] **Z. 148** · Ergebnisse
- [ ] **Z. 155** · Team
- [ ] **Z. 162** · Kontakt
- [ ] **Z. 169** · FAQ

Der Einzeiler der Phasen-Seite ist ein Satz aus dem Antrag und kein Entwurf.

## Architektur

- [ ] **Z. 291** · `architektur.einleitung` — Einleitungssatz über dem Diagramm
- [ ] **Z. 306** · `komponenten[0].beschreibung` — **FortiGate**
- [ ] **Z. 320** · `komponenten[1].beschreibung` — **FortiManager**
- [ ] **Z. 334** · `komponenten[2].beschreibung` — **FortiAnalyzer**
- [ ] **Z. 348** · `komponenten[3].beschreibung` — **FortiSIEM**

## Fortschritt — sieben Meilensteine

- [ ] **Z. 514** · Security Fabric: Aufbau und Inbetriebnahme
- [ ] **Z. 528** · Spielwiese: simulierte Unternehmensumgebung
- [ ] **Z. 542** · Baseline-Messung
- [ ] **Z. 556** · Optimierung der Security Fabric
- [ ] **Z. 570** · Re-Messung und Evaluierungsbericht
- [ ] **Z. 584** · Konfigurations- und Betriebsdokumentation
- [ ] **Z. 598** · Abgabe

## Ergebnisse

- [ ] **Z. 625** · `ergebnisse.platzhalter` — Text im Leerzustand

## Team — vier Kurzprofile

- [ ] **Z. 698** · `bio` — David Mayerhofer
- [ ] **Z. 717** · `bio` — Michal Motola
- [ ] **Z. 735** · `bio` — Paul Bauer
- [ ] **Z. 753** · `bio` — Julian Heyderer

## Kontakt

- [ ] **Z. 786** · `kontakt.einleitung` — Text neben dem Formular

## FAQ

- [ ] **Z. 814 bis 887** · `faq.fragen[*].antwort` — neun Antworten, aus dem
      Antrag formuliert

## Rechtliches — mit Betreuung / Schulleitung abstimmen

- [ ] **Z. 919, 921** · `impressum` — Anschrift und Verantwortliche
- [ ] **Z. 952** · `impressum` — Freigabe für das Schullogo
- [ ] **Z. 975** · `datenschutz` — Verantwortlicher
- [ ] **Z. 1067** · `footer.anschrift`

---

## Bewusst NICHT als Entwurf markiert

Diese Inhalte stammen wörtlich oder unmittelbar aus dem DA-Antrag v3
(18.09.2026) und sind deshalb keine Entwürfe:

Projektname · Arbeitstitel · Aufgabenstellung · Ausgangssituation ·
Beschreibung beider Phasen · zentrale Forschungsfrage · der Vergleich ·
Verwertung · Rollen der vier Komponenten · Bausteine der Spielwiese · die acht
Angriffsszenarien · Namen, Kürzel, Rollen und Themenschwerpunkte aller sechs
Personen · Maturajahrgang · Schule und Abteilung · Generalisierungshinweis im
Footer.

**Ausnahme Zeitplan:** Der Antrag v3 nennt keine Termine. Die Zeiträume der
Meilensteine stammen aus dem früheren Zeitplan und sind den neuen
Arbeitsschritten zugeordnet. Bitte mit Jira abgleichen.

**Nicht in `content.js`, sondern im Kopf der jeweiligen `.html`-Datei:** Titel
und Beschreibung für Browser-Tab, Suchmaschinen und Link-Vorschau. Grund: Diese
Dienste führen kein JavaScript aus und lesen nur den ausgelieferten Quelltext.

---

## Noch abzulegende Dateien

- [ ] `assets/fonts/` — 3 WOFF2 + 2 Lizenzdateien
      ([Anleitung](assets/fonts/README.md))
- [ ] `assets/logo-htl.svg` — Schullogo, ersetzt den Platzhalter
- [x] `assets/da-ansuchen.pdf` — liegt im Ordner, im Footer verlinkt.
      Originalfassung inklusive der E-Mail-Adressen auf Seite 9
      (Entscheidung vom 28.07.2026). Bitte David, Paul und Julian informieren,
      bevor gepusht wird.
- [ ] Meilenstein-Status in `content.js` auf den tatsächlichen Stand setzen
      (`geplant` / `laufend` / `abgeschlossen`) — derzeit stehen alle sieben
      auf `geplant`, deshalb ist die Fortschrittslinie noch bei null

## FAQ

- [ ] `faq.fragen[*].antwort` — sieben Antworten, aus dem Ansuchen formuliert

## Rechtliches — mit Betreuung / Schulleitung abstimmen

- [ ] `impressum.abschnitte` — Anschrift, Verantwortliche, Logo-Freigabe
- [ ] `datenschutz.abschnitte` — Verantwortlicher
- [ ] `footer.anschrift`

## Nicht in content.js

- [ ] `<title>` und `<meta name="description">` je `.html` — sind gesetzt,
      aber Formulierungen prüfen (Suchergebnis-Text).
