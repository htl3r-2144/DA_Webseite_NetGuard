# NetGuard — Projektwebsite

Website zur Diplomarbeit *„Fortinet Security Fabric in der Praxis"* der
HTL Wien 3 Rennweg, Maturajahrgang 2027.

Statische Seite ohne Build-Step, ohne Framework, ohne npm. Vanilla HTML, CSS und
JavaScript. Zur Laufzeit werden **keine** externen Ressourcen geladen: keine
Fonts von Google, kein CDN, kein Analytics, keine Cookies.

---

## Aufbau — sieben eigenständige Seiten

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
kontakt.html        Kontaktformular
```

Die HTML-Dateien sind reine Gerüste — Kopfzeile, Inhalt und Fußzeile baut
`js/render.js` aus `data/content.js` auf. Welche Seite gerendert wird, steht im
`<body data-seite="…">`.

```
data/content.js     ALLE Inhalte — die einzige Datei für Updates
css/styles.css      Design-Tokens und Layout
js/render.js        baut die Seiten aus content.js auf
js/chart.js         SVG-Balkendiagramm für die Ergebnisse
assets/             Logo, Favicon, Social-Preview, Schriften, Antrags-PDF
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

## Noch abzulegende Dateien

| Datei | Zweck | Anleitung |
|---|---|---|
| `assets/fonts/*.woff2` (3 Stück) | Schriftarten | [assets/fonts/README.md](assets/fonts/README.md) |
| `assets/fonts/OFL-*.txt` (2 Stück) | Lizenztexte, Pflicht | dito |
| `assets/logo-htl.svg` | Schullogo — aktuell Platzhalter | gleiche Datei überschreiben, Maße 132×36 |

Beides ist optional in dem Sinn, dass die Seite auch ohne diese Dateien
vollständig funktioniert.

### Antrags-PDF

`assets/da-ansuchen.pdf` liegt bereits im Ordner und ist im Footer verlinkt. Es
ist die **Originalfassung**, inklusive der Schul-E-Mail-Adressen aller vier
Teammitglieder auf Seite 9 (Entscheidung vom 28.07.2026).

Soll das später zurückgenommen werden, genügt es **nicht**, den Eintrag in
`data/content.js` zu löschen. Die Datei bleibt dann weiterhin unter
`https://htl3r-2146.github.io/NetGuard/assets/da-ansuchen.pdf` erreichbar. Nötig
sind beide Schritte:

```bash
git rm assets/da-ansuchen.pdf && git commit -m "Antrag entfernt" && git push
```

und den Eintrag bei `dokumente` in `data/content.js` entfernen.

---

## Veröffentlichen auf GitHub Pages

Einmalig:

```bash
git init && git add -A && git commit -m "NetGuard Projektwebsite"
```

Dann auf GitHub das Repository `NetGuard` anlegen und pushen:

```bash
git remote add origin https://github.com/htl3r-2146/NetGuard.git && git branch -M main && git push -u origin main
```

Anschließend im Repository unter **Settings → Pages** als Quelle `main` und
`/ (root)` auswählen. Die Seite ist danach erreichbar unter:

```
https://htl3r-2146.github.io/NetGuard/
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
python -m http.server 8123 --directory "C:\Users\Michal\Claude Code\NetGuard"
```

---

## Rahmenbedingungen

* Heller Modus ist Standard, dunkler Modus über `prefers-color-scheme`.
* Kontraste durchgehend mindestens WCAG AA (schwächster Wert 4,91:1).
* `prefers-reduced-motion: reduce` schaltet sämtliche Animationen ab.
* Alle Angaben zur Infrastruktur sind generalisiert. Keine IP-Adressen, keine
  Hostnamen, keine Netzsegmente, keine Klassenbezeichnungen.
