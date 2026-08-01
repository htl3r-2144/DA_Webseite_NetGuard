# Schriftarten einlegen

Die Website lädt **keine** Schriften aus dem Internet — das ist Absicht (DSGVO,
keine Third-Party-Requests). Die Dateien müssen deshalb einmalig hier abgelegt
werden.

Solange sie fehlen, funktioniert die Seite trotzdem: sie verwendet dann die
Systemschrift. Es bricht nichts, es sieht nur generischer aus.

---

## Was gebraucht wird — genau fünf Dateien

| Zieldateiname in diesem Ordner | Quelle |
|---|---|
| `inter-400.woff2` | Inter, Regular |
| `inter-600.woff2` | Inter, SemiBold |
| `jetbrains-mono-400.woff2` | JetBrains Mono, Regular |
| `OFL-Inter.txt` | Lizenzdatei von Inter |
| `OFL-JetBrainsMono.txt` | Lizenzdatei von JetBrains Mono |

**Die Dateinamen müssen exakt so lauten.** Dann muss am CSS nichts geändert
werden.

---

## Inter herunterladen

1. `https://github.com/rsms/inter` öffnen → rechts unter **Releases** die
   neueste Version → die ZIP-Datei herunterladen.
2. ZIP entpacken, Ordner `web/` öffnen.
3. `Inter-Regular.woff2` hierher kopieren und in **`inter-400.woff2`** umbenennen.
4. `Inter-SemiBold.woff2` hierher kopieren und in **`inter-600.woff2`** umbenennen.
5. `LICENSE.txt` aus dem ZIP hierher kopieren und in **`OFL-Inter.txt`** umbenennen.

## JetBrains Mono herunterladen

1. `https://github.com/JetBrains/JetBrainsMono` öffnen → **Releases** → ZIP.
2. ZIP entpacken, Ordner `fonts/webfonts/` öffnen.
3. `JetBrainsMono-Regular.woff2` hierher kopieren und in
   **`jetbrains-mono-400.woff2`** umbenennen.
4. `OFL.txt` aus dem ZIP hierher kopieren und in **`OFL-JetBrainsMono.txt`**
   umbenennen.

> Heißt eine Datei im Download anders als hier beschrieben, **nicht raten** —
> kurz nachfragen. Falscher Name heißt: Schrift lädt nicht.

---

## Lizenz

Beide Schriften stehen unter der **SIL Open Font License 1.1**. Sie dürfen
kostenlos verwendet, eingebettet und weitergegeben werden — auch kommerziell.

Zwei Bedingungen, die hier relevant sind:

* Die Lizenzdatei muss **mitgeliefert** werden. Deshalb die beiden `OFL-*.txt`.
* Die Schriften dürfen nicht unter ihrem Originalnamen verändert weitergegeben
  werden. Umbenennen der Datei ist davon nicht betroffen — das ist nur ein
  Dateiname, keine Änderung der Schrift.

---

## Prüfen, ob es funktioniert hat

`index.html` öffnen und mit `Strg`+`F5` neu laden. Die Überschriften sollten
etwas schmaler und die technischen Begriffe in einer Schreibmaschinenschrift
erscheinen. Falls nicht: `F12` drücken, Reiter **Network**, nach `woff2` filtern
und neu laden — dort steht, welche Datei nicht gefunden wurde.
