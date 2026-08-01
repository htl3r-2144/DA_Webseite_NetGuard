# Ersetzungs-Checkliste — Entwurfstexte

**31 Texte** in [`data/content.js`](data/content.js) sind von mir formuliert und
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

## Navigation — die sechs Kachel-Einzeiler

Diese Sätze erscheinen **zweimal**: als Beschreibung auf der Kachel der
Startseite und als Einleitungssatz oben auf der jeweiligen Unterseite. Ein Feld,
zwei Auftritte — entsprechend kurz und aussagekräftig halten.

- [ ] **Z. 102** · Architektur
- [ ] **Z. 109** · Phasen
- [ ] **Z. 116** · Fortschritt
- [ ] **Z. 123** · Ergebnisse
- [ ] **Z. 130** · Team
- [ ] **Z. 137** · Kontakt

## Startseite

- [ ] **Z. 158** · `hero.untertitel` — Absatz unter dem Projekttitel
- [ ] **Z. 183** · `ausgangssituation.absaetze` — drei Absätze in einem Feld
      (Angriffsfläche moderner Netze · warum integrierte Korrelation ·
      Hardwarebasis an der Schule)

## Architektur

- [ ] **Z. 221** · `architektur.einleitung` — Einleitungssatz über dem Diagramm
- [ ] **Z. 234** · `komponenten[0].beschreibung` — **FortiGate**
- [ ] **Z. 247** · `komponenten[1].beschreibung` — **FortiManager**
- [ ] **Z. 259** · `komponenten[2].beschreibung` — **FortiAnalyzer**
- [ ] **Z. 272** · `komponenten[3].beschreibung` — **FortiSIEM**

## Phasen

- [ ] **Z. 328** · Phase 1, Laborumgebung
- [ ] **Z. 347** · Phase 2, Echtbetrieb
- [ ] **Z. 378** · `phasen.vergleich.beschreibung` — worauf der Vergleich hinausläuft

## Fortschritt — sieben Meilensteine

- [ ] **Z. 413** · Aufbau der Security Fabric
- [ ] **Z. 425** · Aufbau der Laborumgebung
- [ ] **Z. 438** · Angriffssimulation
- [ ] **Z. 450** · Passivanalyse Schulnetz-Traffic
- [ ] **Z. 462** · Vergleichsbericht
- [ ] **Z. 475** · Konfigurations- und Betriebsdokumentation
- [ ] **Z. 486** · Abgabe

## Ergebnisse

- [ ] **Z. 515** · `ergebnisse.platzhalter` — Text im Leerzustand
- [ ] **Z. 544** · `ergebnisse.verwertung` — Verbleib der Fabric nach Projektende

## Team — vier Kurzprofile

- [ ] **Z. 572** · `bio` — David Mayerhofer
- [ ] **Z. 588** · `bio` — Michal Motola
- [ ] **Z. 603** · `bio` — Paul Bauer
- [ ] **Z. 618** · `bio` — Julian Heyderer

## Kontakt

- [ ] **Z. 650** · `kontakt.einleitung` — Text neben dem Formular

## Footer

- [ ] **Z. 679** · `footer.impressum` — ⚠️ **Anschrift gegenprüfen.** Sie steht
      nicht im Ansuchen, ich habe sie eingesetzt. Auch Medieninhaber und
      Verantwortlichkeit bitte mit der Betreuung abstimmen.

---

## Bewusst NICHT als Entwurf markiert

Diese Inhalte stammen wörtlich oder unmittelbar aus dem Ansuchen und sind
deshalb keine Entwürfe:

Projektname · Antragstitel · zentrale Forschungsfrage · Namen und Rollen der
vier Komponenten · Bausteine der Laborumgebung · die fünf Angriffsszenarien ·
die vier Punkte des Vergleichsberichts · Namen, Kürzel, Rollen und
Themenschwerpunkte aller sechs Personen · Maturajahrgang · Schule und Abteilung ·
Generalisierungshinweis im Footer.

Zwei Abweichungen davon, beide bewusst:

* **„DSGVO" durch „Datenschutz" ersetzt** in den Themenschwerpunkten von David
  Mayerhofer und Julian Heyderer. Die Rolle bleibt korrekt dargestellt, der von
  dir gestrichene DSGVO-Statusabschnitt entfällt trotzdem.
* **„SPAN-Port Setup" entfernt** aus Julian Heyderers Themenschwerpunkt, weil
  Phase 2 ohne Spiegelpunkt beschrieben wird.

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
