/* =============================================================================
   NetGuard — Inhalte der Projektwebsite
   =============================================================================

   DIESE DATEI IST DIE EINZIGE, DIE FÜR INHALTS-UPDATES ANGEFASST WIRD.
   HTML, CSS und JavaScript müssen dafür nie geändert werden.

   ---------------------------------------------------------------------------
   ANLEITUNG FÜR TEAMMITGLIEDER OHNE WEB-ERFAHRUNG
   ---------------------------------------------------------------------------

   1) Text ändern
      Text steht immer zwischen zwei Anführungszeichen: 'so ein Text'
      Einfach den Text zwischen den Anführungszeichen austauschen.
      Die Anführungszeichen selbst und das Komma am Zeilenende NICHT löschen.

   2) Apostroph im Text
      Kommt im Text selbst ein ' vor (z. B. "Fortinet's"), muss davor ein
      Backslash: 'Fortinet\'s'.  Einfacher: Anführungszeichen nach außen
      tauschen -> "Fortinet's".

   3) Entwurfstexte ersetzen        <<< DAS IST DER HÄUFIGSTE FALL
      Texte, die noch nicht final sind, sehen so aus:

          beschreibung: { text: 'Vorläufiger Text …', entwurf: true },

      Wenn der Text final ist, ersetzt du den GANZEN Block durch nur den Text:

          beschreibung: 'Der endgültige Text.',

      Damit verschwindet gleichzeitig die Entwurfs-Markierung auf der Website.
      Das ist die Erledigt-Markierung — es gibt keine zweite Liste zu pflegen.

   4) Neuen Eintrag hinzufügen (z. B. Meilenstein, Teammitglied)
      Einen bestehenden Eintrag von { bis }, inklusive Komma, kopieren,
      darunter einfügen und die Werte anpassen. Reihenfolge in der Liste
      = Reihenfolge auf der Website.

   5) Eintrag ausblenden
      Nicht löschen, sondern zwei Schrägstriche an den Zeilenanfang setzen:
          // { name: '…' },
      So bleibt er als Vorlage erhalten.

   6) Nach dem Speichern
      index.html im Browser öffnen (Doppelklick genügt) und mit Strg+F5 neu
      laden. Erscheint eine leere Seite, ist meistens ein Komma oder eine
      Klammer verrutscht: F12 drücken, Reiter "Console" zeigt die Zeile an.

   ---------------------------------------------------------------------------
   REGELN FÜR INHALTE — bitte einhalten
   ---------------------------------------------------------------------------
   * Keine IP-Adressen, keine VLAN-IDs, keine Hostnamen, keine Seriennummern.
   * Keine Beschreibung der realen Schulnetz-Topologie oder -Segmentierung.
   * Alle Arbeiten finden in der isolierten Spielwiese statt. Keine Aussagen,
     die einen Zugriff auf das Produktivnetz der Schule nahelegen.
   * Keine E-Mail-Adressen im Klartext (siehe Abschnitt "kontakt").
   * Keine Ergebnisse behaupten, die noch nicht gemessen wurden.
   ========================================================================== */

window.NETGUARD_CONTENT = {

  /* ==========================================================================
     META — Titel, Beschreibung und Bilder für Browser-Tab und Link-Vorschau
     ========================================================================== */
  meta: {
    titel: 'NetGuard — Threat Detection unter realen Bedingungen',
    // Wird in Suchergebnissen und Link-Vorschauen angezeigt. Max. ca. 160 Zeichen.
    beschreibung: 'Diplomarbeit an der HTL Wien 3 Rennweg: Fortinet Security Fabric '
      + 'im Labor, acht Angriffsszenarien, gemessen vor und nach gezielter '
      + 'Optimierung.',
    // Adresse der veröffentlichten Seite (GitHub Pages). Wird für Sitemap,
    // strukturierte Daten und Link-Vorschau verwendet. Ändert sich der
    // Repository-Name, hier UND in jeder .html-Datei (canonical/og:url) anpassen.
    url: 'https://htl3r-2144.github.io/DA_Webseite_NetGuard/',

    // Schullogo (offizielle Wortmarke der HTL Wien 3 Rennweg).
    // Das Logo ist eine nachgezeichnete Grafik und braucht einen hellen
    // Untergrund — im dunklen Modus bekommt es automatisch eine weiße Plakette.
    logo: './assets/logo-htl.svg',
    logoMitSlogan: './assets/logo-htl-slogan.svg',   // Fußzeile
    logoAlt: 'HTL Wien 3 Rennweg',
    logoBreite: 103,   // Pixel bei 40 px Höhe — verhindert Layout-Shift
    logoHoehe: 40,
    schulWebsite: 'https://www.htl.rennweg.at/',

    /* Optionale, cookiefreie Besucherstatistik (z. B. Umami oder Plausible,
       selbst gehostet). Standard: aus — es wird nichts geladen.
       Zum Einschalten beide Felder ausfüllen, z. B.
         skript: 'https://stats.example.at/script.js',
         websiteId: '1234-abcd'
       Solange leer, gilt der Hinweis „keine externen Ressourcen" in der
       Fußzeile und in der Datenschutzerklärung. Beim Einschalten diese beiden
       Stellen im Datenschutz-Text anpassen! Ohne Cookies ist kein Banner nötig.
       Alternative ohne Skript: GitHub → Repository → Insights → Traffic. */
    analytik: { skript: '', websiteId: '' }
  },

  /* ==========================================================================
     NAVIGATION — die Unterseiten
     --------------------------------------------------------------------------
     Jeder Eintrag ist eine eigene HTML-Datei im Hauptordner. Die Reihenfolge
     hier bestimmt die Reihenfolge im Menü UND die Nummerierung.

     "kurz" ist der Einzeiler auf den Kacheln der Startseite.

     Eine Seite entfernen: Zeile auskommentieren (// davor). Eine Seite
     hinzufügen: neue HTML-Datei anlegen (bestehende kopieren, unten im
     <body> das data-seite anpassen) und hier eintragen.
     ========================================================================== */
  navigation: [
    {
      id: 'index',
      datei: './index.html',
      nav: 'Übersicht'
    },
    {
      id: 'architektur',
      datei: './architektur.html',
      nav: 'Architektur',
      // ENTWURF – von Michal ersetzen
      kurz: { text: 'Die vier Fortinet-Komponenten und ihr Zusammenspiel.', entwurf: true }
    },
    {
      id: 'phasen',
      datei: './phasen.html',
      nav: 'Phasen',
      // ENTWURF – von Michal ersetzen
      kurz: { text: 'Aufbau, Baseline-Messung, Optimierung und Re-Messung.', entwurf: true }
    },
    {
      id: 'fortschritt',
      datei: './fortschritt.html',
      nav: 'Fortschritt',
      // ENTWURF – von Michal ersetzen
      kurz: { text: 'Sieben Meilensteine von September 2026 bis Mai 2027.', entwurf: true }
    },
    {
      id: 'ergebnisse',
      datei: './ergebnisse.html',
      nav: 'Ergebnisse',
      // ENTWURF – von Michal ersetzen
      kurz: { text: 'Baseline gegen optimierte Konfiguration — folgt nach der ersten Messreihe.', entwurf: true }
    },
    {
      id: 'team',
      datei: './team.html',
      nav: 'Team',
      // ENTWURF – von Michal ersetzen
      kurz: { text: 'Vier Schüler, zwei Betreuer, klar getrennte Zuständigkeiten.', entwurf: true }
    },
    {
      id: 'kontakt',
      datei: './kontakt.html',
      nav: 'Kontakt',
      // ENTWURF – von Michal ersetzen
      kurz: { text: 'Fragen zum Projekt oder zur Dokumentation.', entwurf: true }
    },
    {
      id: 'faq',
      datei: './faq.html',
      nav: 'FAQ',
      // ENTWURF – von Michal ersetzen
      kurz: { text: 'Antworten auf die häufigsten Fragen zum Projekt.', entwurf: true }
    },

    /* Seiten, die nur in der Fußzeile verlinkt sind (kein Menüpunkt, keine
       Kachel, keine Nummer). nurFooter: true lässt sie im Menü aus. */
    { id: 'impressum',   datei: './impressum.html',   nav: 'Impressum',   nurFooter: true },
    { id: 'datenschutz', datei: './datenschutz.html', nav: 'Datenschutz', nurFooter: true }
  ],

  /* ==========================================================================
     HERO — der Kopfbereich der Startseite
     ========================================================================== */
  hero: {
    projektname: 'NetGuard',

    // Arbeitstitel laut Antrag v3 (18.09.2026): „NetGuard: Threat Detection
    // unter realen Bedingungen". Der Vorsatz „NetGuard:" steht nicht hier, weil
    // die Überschrift darüber bereits NetGuard lautet. Faktum, kein Entwurf.
    antragstitel: 'Threat Detection unter realen Bedingungen',

    // ENTWURF – von Michal ersetzen
    untertitel: {
      text: 'Eine Fortinet Security Fabric wird in einer isolierten, simulierten '
        + 'Unternehmensumgebung aufgebaut. Acht Angriffsszenarien laufen zuerst '
        + 'gegen die Standardkonfiguration und nach gezielter Optimierung noch '
        + 'einmal. Der Vergleich zeigt, wie viel Erkennungsleistung erst durch '
        + 'die Konfiguration entsteht.',
      entwurf: true
    },

    // Zentrale Forschungsfrage, wörtlich aus dem Antrag v3 — Faktum.
    forschungsfrage: 'Wie stark lässt sich die Erkennungsleistung einer Fortinet '
      + 'Security Fabric in einer simulierten Unternehmensumgebung durch '
      + 'gezielte Konfiguration steigern, gemessen an Erkennungsrate, '
      + 'False-Positive-Rate und Time-to-Detect über acht definierte '
      + 'Angriffsszenarien?',

    // Die beiden Schaltflächen im Hero. "ziel" ist die id einer Seite aus
    // "navigation". Die erste ist die Hauptaktion (farbig).
    aktionen: [
      { label: 'Architektur ansehen',   ziel: 'architektur' },
      { label: 'Fortschritt verfolgen', ziel: 'fortschritt' }
    ],

    /* Statuskonsole rechts im Hero. Die Werte werden automatisch aus
       "fortschritt" und "architektur" berechnet — hier stehen nur die
       Beschriftungen. Der Befehl ist reine Gestaltung. */
    konsole: {
      befehl: 'netguard status',
      zeilen: {
        projekt: 'Projekt', phase: 'Phase', meilensteine: 'Meilensteine',
        aktuell: 'Aktuell', komponenten: 'Fabric', stand: 'Stand'
      }
    },

    // Drei Kennzahlen unter dem Hero. Kurz halten — je 1-2 Wörter.
    kennzahlen: [
      { wert: '4',  label: 'Fortinet-Komponenten' },
      { wert: '8',  label: 'Angriffsszenarien' },
      { wert: '2',  label: 'Messreihen' }
    ]
  },

  /* ==========================================================================
     AUSGANGSSITUATION
     ========================================================================== */
  ausgangssituation: {
    titel: 'Ausgangssituation',

    // ENTWURF – von Michal ersetzen
    absaetze: {
      entwurf: true,
      texte: [
        'Die HTL Wien 3 Rennweg verfügt über einen Cisco UCS-Server und eine '
        + 'physische FortiGate-Appliance. Damit lässt sich eine komplette '
        + 'Fortinet Security Fabric aufbauen: nicht nur eine Firewall, sondern '
        + 'auch zentrales Management mit dem FortiManager, Log-Auswertung mit '
        + 'dem FortiAnalyzer und Event-Korrelation mit FortiSIEM. Die Lizenzen '
        + 'stellt das Fortinet Academic Program kostenlos bereit.',

        'In der Praxis werden solche Systeme oft installiert und dann '
        + 'weitgehend mit den Standardeinstellungen betrieben. Wie viel '
        + 'Erkennungsleistung erst durch die Konfiguration entsteht, also durch '
        + 'Security Profiles, eigene Correlation Rules, Event Handler und '
        + 'Hardening, ist selten mit Zahlen belegt.',

        'In einer isolierten Laborumgebung lässt sich genau das messen, weil '
        + 'sich Ausgangszustand und Angriffe beliebig oft gleich wiederholen '
        + 'lassen. Deshalb findet die gesamte Arbeit in einer simulierten '
        + 'Unternehmensumgebung statt, ohne Verbindung zum Produktivnetz der '
        + 'Schule.'
      ]
    }
  },

  /* ==========================================================================
     ARCHITEKTUR — Diagramm der vier Fortinet-Komponenten
     --------------------------------------------------------------------------
     WICHTIG: Das Diagramm ist auf GENAU VIER Komponenten in dieser Reihenfolge
     ausgelegt (Firewall, Management, Logging, Korrelation). Namen, Rollen und
     Beschreibungen können frei geändert werden — die Anzahl nicht.
     ========================================================================== */
  architektur: {
    titel: 'Architektur',

    // ENTWURF – von Michal ersetzen
    einleitung: {
      text: 'Die vier Komponenten der Security Fabric übernehmen getrennte '
        + 'Aufgaben und tauschen ihre Daten untereinander aus. Den Verkehr '
        + 'liefern zwei Quellen: die simulierte Unternehmensumgebung und eine '
        + 'Angreifer-VM mit Kali Linux. Die Darstellung ist bewusst '
        + 'generalisiert.',
      entwurf: true
    },

    komponenten: [
      {
        id: 'fortigate',
        name: 'FortiGate',
        rolle: 'Next-Generation Firewall',   // Faktum aus dem Ansuchen
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Physische Appliance im Datenpfad. Setzt Zonen und Policies '
            + 'durch, trennt die Segmente der Spielwiese und erzeugt die '
            + 'Logdaten, auf denen die Auswertung aufbaut. In der Optimierung '
            + 'kommen Security Profiles (IPS, Application Control, Web Filter, '
            + 'Antivirus) und SSL Deep Inspection dazu.',
          entwurf: true
        }
      },
      {
        id: 'fortimanager',
        name: 'FortiManager',
        rolle: 'Zentrales Policy-Management',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Verwaltet Policy-Packages, Lizenzen und Versionsstände '
            + 'zentral. Jede Änderung beim Tuning wird als eigene Policy-Revision '
            + 'abgelegt, dadurch bleibt jeder Schritt nachvollziehbar und lässt '
            + 'sich zurückrollen. Die Baseline ist als markierte Revision '
            + 'festgehalten.',
          entwurf: true
        }
      },
      {
        id: 'fortianalyzer',
        name: 'FortiAnalyzer',
        rolle: 'Log-Aggregation und Forensik',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Nimmt die Logdaten der FortiGate auf, hält sie nach einem '
            + 'festgelegten Retention-Konzept vor und macht sie für forensische '
            + 'Suche und Reports durchsuchbar. Event Handler melden Angriffe, '
            + 'Automation Stitches reagieren darauf, etwa mit Quarantäne oder '
            + 'Benachrichtigung.',
          entwurf: true
        }
      },
      {
        id: 'fortisiem',
        name: 'FortiSIEM',
        rolle: 'Event-Korrelation, Alerting, CMDB',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Korreliert Ereignisse aus der gesamten Fabric über Correlation '
            + 'Rules zu Incidents und führt eine CMDB der Systeme in der '
            + 'Spielwiese. Ein Incident-Workflow regelt Schweregrad, Zuweisung '
            + 'und Eskalation. Hier entstehen die Kennzahlen, an denen die '
            + 'Erkennungsleistung gemessen wird.',
          entwurf: true
        }
      }
    ],

    /* Die beiden Quellkästen oben im Diagramm — Fakten aus dem Ansuchen.
       WICHTIG: Diese Zeilen werden direkt in die Grafik gezeichnet.
       Maximal 40 Zeichen pro Zeile und höchstens vier Zeilen, sonst laufen
       sie aus dem Kasten heraus. Längere Texte werden automatisch gekürzt. */
    umgebung: {
      titel: 'Spielwiese: simulierte Unternehmensumgebung',
      bausteine: [
        'Windows Server mit AD, DNS und DHCP',
        'zwei domänenbeigetretene Client-VMs',
        'WLAN-Simulation mit 802.1X/RADIUS',
        'Fileserver und Intranet-Dienste'
      ]
    },

    // Zweite Quelle: die Angreifer-VM, von der die acht Szenarien ausgehen.
    angreifer: {
      titel: 'Angreifer-VM mit Kali Linux',
      bausteine: [
        'acht definierte Angriffsszenarien',
        'als wiederholbare Skripte abgelegt',
        'Start immer vom gleichen VM-Snapshot',
        'nur innerhalb der isolierten Spielwiese'
      ]
    },

    // Beschriftungen der Pfeile im Diagramm. Kurz halten, max. ca. 20 Zeichen.
    fluesse: {
      trafficLabor:  'Traffic',
      angriffe:      'Angriffe',
      policy:        'Policy-Deployment',
      logs:          'Logs',
      events:        'Events'
    }
  },

  /* ==========================================================================
     PHASEN — Aufbauphase und Evaluierungsphase (Antrag v3)
     ========================================================================== */
  phasen: {
    titel: 'Zwei Phasen',

    liste: [
      {
        nummer: 1,
        kurz: 'Aufbauphase',
        titel: 'Security Fabric und Spielwiese',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Auf der Cisco UCS entsteht die Spielwiese, eine isolierte, '
            + 'simulierte Unternehmensumgebung. Parallel dazu werden die vier '
            + 'Fortinet-Komponenten in Betrieb genommen und zur Security Fabric '
            + 'verbunden. Am Ende steht ein definierter Ausgangszustand: '
            + 'Segmentierung und Logging sind aktiv, Security Profiles und eigene '
            + 'Correlation Rules bewusst noch nicht. Das ist die Baseline.',
          entwurf: true
        },
        punkte: [
          'FortiGate, FortiManager, FortiAnalyzer und FortiSIEM zur Fabric verbunden',
          'Active Directory, zwei Client-VMs, 802.1X über RADIUS, FSSO und Fileserver',
          'Isolation zum Produktivnetz per Konnektivitätstest nachgewiesen',
          'Baseline als FortiManager-Revision und VM-Snapshot festgehalten'
        ]
      },
      {
        nummer: 2,
        kurz: 'Evaluierungsphase',
        titel: 'Baseline, Optimierung, Re-Messung',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Acht Angriffsszenarien laufen mit Kali Linux zuerst gegen die '
            + 'Baseline. Danach wird die Fabric gezielt optimiert, jede Änderung '
            + 'wird protokolliert. Zum Schluss laufen dieselben acht Szenarien '
            + 'vom gleichen VM-Snapshot aus noch einmal, diesmal gegen die '
            + 'optimierte Konfiguration.',
          entwurf: true
        },
        punkte: [
          'Baseline-Messung nach einem vorab freigegebenen Kennzahlenmodell',
          'Optimierung: Security Profiles, SSL Deep Inspection, Correlation Rules, '
            + 'Event Handler, Automation Stitches und Hardening',
          'jeder Tuning-Schritt als eigene Policy-Revision im FortiManager',
          'Re-Messung aller acht Szenarien unter gleichen Bedingungen'
        ]
      }
    ],

    // Die acht Angriffsszenarien — Fakten aus dem Antrag v3.
    szenarien: {
      titel: 'Die acht Angriffsszenarien',
      liste: [
        'Port Scan',
        'Brute Force gegen SMB/RDP',
        'Lateral Movement',
        'C2-Beaconing',
        'Policy-Verstoß zwischen VLANs',
        'Malware-Download',
        'Web-Filter-Umgehung',
        'DNS-Tunneling'
      ]
    },

    // Worauf der Vergleich hinausläuft.
    vergleich: {
      titel: 'Der Vergleich',
      // ENTWURF – von Michal ersetzen
      beschreibung: {
        text: 'Aus den beiden Messreihen entsteht der Evaluierungsbericht. Er '
          + 'beantwortet die Forschungsfrage mit gemessenen Werten und zeigt, '
          + 'welche Maßnahme welchen Anteil am Erkennungsgewinn hat.',
        entwurf: true
      },
      punkte: [
        'Erkennungsrate, False-Positive-Rate und Time-to-Detect je Szenario, '
          + 'Baseline gegen optimierte Konfiguration',
        'Zuordnung der Verbesserungen zu den einzelnen Maßnahmen',
        'Effekt der SSL Deep Inspection getrennt ausgewiesen',
        'Zielwert: nach dem Tuning mindestens sieben von acht Szenarien als '
          + 'Incident erkannt',
        'Konfigurationsempfehlungen für vergleichbare Umgebungen'
      ]
    }
  },

  /* ==========================================================================
     FORTSCHRITT — Meilenstein-Timeline
     --------------------------------------------------------------------------
     phase:   1 oder 2      — zu welcher Projektphase der Meilenstein gehört
     status:  'geplant'       — grau, offener Kreis
              'laufend'       — farbig, gefüllt; die Fortschrittslinie endet hier
              'abgeschlossen' — gefüllt mit Häkchen
     Es sollte immer höchstens EIN Meilenstein 'laufend' sein.
     ========================================================================== */
  fortschritt: {
    titel: 'Fortschritt',
    hinweis: 'Zeitplan des Projekts. Der Status wird laufend aktualisiert.',
    zeitraum: { von: 'September 2026', bis: 'Mai 2027' },

    /* Der Antrag v3 nennt keine Termine. Die Zeiträume stammen aus dem
       bisherigen Zeitplan und sind den neuen Arbeitsschritten zugeordnet.
       Bitte mit dem Plan in Jira abgleichen. */
    meilensteine: [
      {
        id: 'fabric',
        phase: 1,
        titel: 'Aufbau der Security Fabric',
        zeitraum: '09/2026 – 10/2026',
        status: 'geplant',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Lizenzen über das Fortinet Academic Program, Versionsmatrix, '
            + 'Installation aller vier Komponenten, Verbindung zur Fabric und '
            + 'erstes Policy-Package über den FortiManager.',
          entwurf: true
        }
      },
      {
        id: 'spielwiese',
        phase: 1,
        titel: 'Aufbau der Spielwiese',
        zeitraum: '10/2026 – 12/2026',
        status: 'geplant',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Active Directory mit DNS, DHCP und Gruppenrichtlinien, zwei '
            + 'Client-VMs, 802.1X über RADIUS, FSSO und Fileserver. Abschluss: '
            + 'Isolationsnachweis und Baseline als markierte Revision.',
          entwurf: true
        }
      },
      {
        id: 'baseline',
        phase: 2,
        titel: 'Baseline-Messung',
        zeitraum: '12/2026 – 01/2027',
        status: 'geplant',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Die acht Angriffsszenarien laufen gegen die '
            + 'Standardkonfiguration. Ergebnis ist der Baseline-Bericht mit den '
            + 'Erkennungslücken je Szenario.',
          entwurf: true
        }
      },
      {
        id: 'optimierung',
        phase: 2,
        titel: 'Optimierung der Security Fabric',
        zeitraum: '01/2027 – 03/2027',
        status: 'geplant',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Security Profiles, SSL Deep Inspection, eigene Correlation '
            + 'Rules, Event Handler, Automation Stitches und Hardening. Jeder '
            + 'Schritt wird als eigene Revision im FortiManager abgelegt.',
          entwurf: true
        }
      },
      {
        id: 'remessung',
        phase: 2,
        titel: 'Re-Messung und Evaluierungsbericht',
        zeitraum: '03/2027 – 04/2027',
        status: 'geplant',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Alle acht Szenarien laufen noch einmal vom gleichen Snapshot '
            + 'aus. Der Bericht stellt beide Messreihen gegenüber und leitet '
            + 'Konfigurationsempfehlungen ab.',
          entwurf: true
        }
      },
      {
        id: 'doku',
        phase: 2,
        titel: 'Konfigurations- und Betriebsdokumentation',
        zeitraum: '04/2027',
        status: 'geplant',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Vollständige Installationsanleitung je Komponente, geprüft von '
            + 'einem Teammitglied, das am jeweiligen Teilbereich nicht beteiligt '
            + 'war.',
          entwurf: true
        }
      },
      {
        id: 'abgabe',
        phase: 2,
        titel: 'Abgabe',
        zeitraum: '05/2027',
        status: 'geplant',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Fertigstellung und Abgabe der Diplomarbeit.',
          entwurf: true
        }
      }
    ]
  },

  /* ==========================================================================
     ERGEBNISSE
     --------------------------------------------------------------------------
     status: 'ausstehend'  — zeigt den Platzhalter mit leerem Diagrammgerüst
             'verfuegbar'  — zeigt die Diagramme mit den Werten aus "charts"

     So trägst du später Messwerte ein:
       1. In "kategorien" bei "werte" die Zahlen eintragen.
       2. Reihenfolge der Werte = Reihenfolge der Serien.
          Beispiel: werte: [41, 88]  ->  41 % Baseline, 88 % optimiert
       3. null bedeutet "noch nicht gemessen" und wird schraffiert dargestellt.
       4. Wenn alle Werte da sind, status auf 'verfuegbar' setzen.
     ========================================================================== */
  ergebnisse: {
    titel: 'Ergebnisse',
    status: 'ausstehend',
    hinweis: 'folgt nach der Baseline-Messung',

    // ENTWURF – von Michal ersetzen
    platzhalter: {
      text: 'Es liegen noch keine Messwerte vor. Nach der Baseline-Messung '
        + 'erscheinen hier die Werte der Standardkonfiguration je Szenario. Nach '
        + 'der Re-Messung kommen die Werte der optimierten Konfiguration dazu, '
        + 'damit beide Messreihen direkt vergleichbar sind.',
      entwurf: true
    },

    charts: [
      {
        id: 'erkennungsraten',
        titel: 'Erkennungsrate je Szenario',
        einheit: '%',
        achse: { max: 100, schritt: 25 },
        serien: [
          { name: 'Baseline (Standardkonfiguration)', ton: 'neutral' },
          { name: 'Optimierte Konfiguration',         ton: 'akzent'  }
        ],
        kategorien: [
          { label: 'Port Scan',           werte: [null, null] },
          { label: 'Brute Force',         werte: [null, null] },
          { label: 'Lateral Movement',    werte: [null, null] },
          { label: 'C2-Beaconing',        werte: [null, null] },
          { label: 'Policy-Verstoß',      werte: [null, null] },
          { label: 'Malware-Download',    werte: [null, null] },
          { label: 'Web-Filter-Umgehung', werte: [null, null] },
          { label: 'DNS-Tunneling',       werte: [null, null] }
        ]
      }
    ],

    // ENTWURF – von Michal ersetzen
    verwertung: {
      text: 'Die Security Fabric bleibt nach Projektende an der HTL Wien 3 '
        + 'Rennweg und kann im Unterricht weiterverwendet werden. '
        + 'Konfigurationen, Installationsanleitungen und die FortiSIEM-Regeln '
        + 'stehen nachfolgenden Jahrgängen als Lehr- und Referenzmaterial zur '
        + 'Verfügung. Der Szenarienkatalog samt Skripten ist wiederverwendbar: '
        + 'Künftige Gruppen können eigene Konfigurationen gegen dieselben '
        + 'Szenarien messen.',
      entwurf: true
    }
  },

  /* ==========================================================================
     TEAM
     --------------------------------------------------------------------------
     bild: null       -> Platzhalter mit Initialen (aktuell so eingestellt)
     bild: './assets/team/nachname.jpg'  -> Foto, sobald eines vorliegt.
           Empfohlen: quadratisch, 320x320 Pixel.
     name, kuerzel, rolle und schwerpunkt stammen aus dem Antrag v3.
     ========================================================================== */
  team: {
    titel: 'Team',

    mitglieder: [
      {
        name: 'David Mayerhofer',
        kuerzel: 'MAY',
        rolle: 'Projektleiter',
        komponente: 'FortiManager',
        schwerpunkt: 'Projektkoordination, FortiManager (Policy-Packages, '
          + 'Revisionen, Audit-Trail), Lizenzierung und Versionsstände, '
          + 'Netzwerksegmentierung und Isolationsnachweis, Hardening, '
          + 'Gesamtdokumentation',
        bild: null,
        // ENTWURF – von Michal ersetzen
        bio: {
          text: 'Verantwortet Projektkoordination, Lizenzen und Versionsstände. '
            + 'Setzt den FortiManager auf, trennt die Spielwiese über '
            + 'Policy-Packages in Segmente, weist die Isolation nach und legt '
            + 'jeden Tuning-Schritt als Revision ab. Führt die '
            + 'Hardening-Bewertung und die Gesamtdokumentation.',
          entwurf: true
        }
      },
      {
        name: 'Michal Motola',
        kuerzel: 'MOT',
        rolle: 'Stellvertretender Projektleiter',
        komponente: 'FortiGate',
        schwerpunkt: 'FortiGate (Zonen, Policies, IPS, Application Control, '
          + 'Web Filter, SSL Inspection), Active Directory, 802.1X und FSSO, '
          + 'Angriffssimulation mit Kali Linux',
        bild: null,
        // ENTWURF – von Michal ersetzen
        bio: {
          text: 'Konfiguriert die FortiGate von der Grundkonfiguration bis zu '
            + 'IPS, Application Control, Web Filter und SSL Deep Inspection. '
            + 'Baut Active Directory, 802.1X und FSSO auf und führt die '
            + 'Angriffsszenarien 1 bis 4 mit Kali Linux durch.',
          entwurf: true
        }
      },
      {
        name: 'Paul Bauer',
        kuerzel: 'BAU',
        rolle: 'Projektmitarbeiter',
        komponente: 'FortiSIEM',
        schwerpunkt: 'FortiSIEM (Deployment, CMDB, Correlation Rules, '
          + 'Incident-Workflow), Kennzahlenmodell, Auswertung beider '
          + 'Messreihen, Evaluierungsbericht',
        bild: null,
        // ENTWURF – von Michal ersetzen
        bio: {
          text: 'Deployt FortiSIEM mit Supervisor und Worker und schreibt die '
            + 'Correlation Rules samt Incident-Workflow. Legt das '
            + 'Kennzahlenmodell fest, wertet beide Messreihen aus und verfasst '
            + 'den Evaluierungsbericht.',
          entwurf: true
        }
      },
      {
        name: 'Julian Heyderer',
        kuerzel: 'HEY',
        rolle: 'Projektmitarbeiter',
        komponente: 'FortiAnalyzer',
        schwerpunkt: 'FortiAnalyzer (Logging, Retention, Event Handler, '
          + 'Forensik, Reports), Spielwiese-Clients und Dienste, Antivirus und '
          + 'Automation Stitches, Lasttests',
        bild: null,
        // ENTWURF – von Michal ersetzen
        bio: {
          text: 'Richtet den FortiAnalyzer mit Logging, Retention, Event '
            + 'Handlern und Reports ein. Stellt Clients und Dienste der '
            + 'Spielwiese bereit, konfiguriert Antivirus und Automation '
            + 'Stitches und misst die Szenarien 6 bis 8.',
          entwurf: true
        }
      }
    ],

    betreuung: {
      titel: 'Projektbetreuung',
      personen: [
        { name: 'Christian Schöndorfer', kuerzel: 'SDO', rolle: 'Hauptbetreuung' },
        { name: 'Clemens Kussbach',      kuerzel: 'KUS', rolle: 'Stellvertretende Hauptbetreuung' }
      ]
    }
  },

  /* ==========================================================================
     KONTAKT
     --------------------------------------------------------------------------
     Die Adresse steht bewusst NICHT im Klartext, sondern in zwei Teilen. Erst
     im Browser wird daraus eine funktionierende Adresse zusammengesetzt. Damit
     findet sie kein Crawler im Seitenquelltext.

     Das Formular sendet nichts an einen Server: Beim Absenden öffnet sich das
     Mailprogramm des Besuchers mit fertig ausgefülltem Entwurf. Abgeschickt
     wird die Nachricht dort vom Besucher selbst.
     ========================================================================== */
  kontakt: {
    titel: 'Kontakt',
    // ENTWURF – von Michal ersetzen
    einleitung: {
      text: 'Fragen zum Projekt, zur Umsetzung oder zur Dokumentation gerne per '
        + 'Nachricht. Das Formular öffnet Ihr Mailprogramm mit fertig '
        + 'vorbereitetem Text — abgeschickt wird die Nachricht von Ihnen selbst.',
      entwurf: true
    },
    empfaengerLokal: '2146',              // Teil vor dem @
    empfaengerDomain: 'htl.rennweg.at',   // Teil nach dem @
    betreffPrefix: '[NetGuard] ',
    felder: {
      name:      'Name',
      betreff:   'Betreff',
      nachricht: 'Nachricht'
    },
    absendenLabel: 'Nachricht senden',
    kopierenLabel: 'Adresse kopieren'
  },

  /* ==========================================================================
     FAQ — häufige Fragen
     --------------------------------------------------------------------------
     Jede Frage ist ein Eintrag { frage, antwort }. Reihenfolge = Anzeige.
     Die Antworten sind Entwürfe aus dem Ansuchen — bitte prüfen.
     ========================================================================== */
  faq: {
    titel: 'Häufige Fragen',
    fragen: [
      {
        frage: 'Was ist eine Fortinet Security Fabric?',
        antwort: { text: 'Ein Verbund aus mehreren Fortinet-Produkten, die ihre '
          + 'Daten untereinander austauschen: Die FortiGate setzt Regeln im '
          + 'Datenpfad durch, der FortiManager verwaltet die Konfiguration '
          + 'zentral, der FortiAnalyzer sammelt und durchsucht Logdaten, und '
          + 'FortiSIEM korreliert Ereignisse aus allen Quellen zu Incidents.',
          entwurf: true }
      },
      {
        frage: 'Was ist die Spielwiese?',
        antwort: { text: 'So nennt das Team die simulierte '
          + 'Unternehmensumgebung auf dem Cisco UCS-Server: ein Windows Server '
          + 'mit Active Directory, DNS, DHCP und Gruppenrichtlinien, zwei '
          + 'Client-VMs, eine WLAN-Simulation mit 802.1X über RADIUS und ein '
          + 'Fileserver mit Intranet-Diensten. Sie ist vom Netz der Schule '
          + 'getrennt und vollständig in die Security Fabric eingebunden.',
          entwurf: true }
      },
      {
        frage: 'Was bedeuten Baseline und Optimierung?',
        antwort: { text: 'Die Baseline ist die Standardkonfiguration der '
          + 'Fabric: Firewall-Policies und Logging sind aktiv, Security '
          + 'Profiles und eigene Correlation Rules noch nicht. Gegen sie laufen '
          + 'die acht Angriffsszenarien zuerst. Danach wird die Fabric gezielt '
          + 'optimiert, und dieselben Szenarien laufen vom gleichen '
          + 'Ausgangszustand aus noch einmal. Der Unterschied zwischen beiden '
          + 'Messreihen ist der Erkennungsgewinn durch die Konfiguration.',
          entwurf: true }
      },
      {
        frage: 'Wird in das Schulnetz eingegriffen?',
        antwort: { text: 'Nein. Alle Messungen und Angriffe laufen '
          + 'ausschließlich in der isolierten Spielwiese, es gibt kein Routing '
          + 'ins Produktivnetz der Schule. Vor dem ersten Angriffslauf wird die '
          + 'Isolation mit einem Konnektivitätstest nachgewiesen und von der '
          + 'Hauptbetreuung gegengezeichnet.',
          entwurf: true }
      },
      {
        frage: 'Werden personenbezogene Daten verarbeitet?',
        antwort: { text: 'Nein. Gearbeitet wird nur mit Testbenutzern und '
          + 'Testdaten in der Spielwiese. Netzwerkverkehr aus dem Schulbetrieb '
          + 'wird weder erhoben noch gespeichert.',
          entwurf: true }
      },
      {
        frage: 'Welche Hardware wird verwendet?',
        antwort: { text: 'Ein Cisco UCS-Server, auf dem FortiManager, '
          + 'FortiAnalyzer, FortiSIEM und die Spielwiese als virtuelle Maschinen '
          + 'laufen, sowie eine physische FortiGate-Appliance. Beides stellt die '
          + 'HTL Wien 3 Rennweg bereit, die Lizenzen kommen über das Fortinet '
          + 'Academic Program.',
          entwurf: true }
      },
      {
        frage: 'Wie wird die Erkennungsleistung gemessen?',
        antwort: { text: 'Vor Messbeginn legt das Team ein Kennzahlenmodell '
          + 'fest, das die Hauptbetreuung freigibt. Je Szenario werden '
          + 'Erkennungsrate, False-Positive-Rate, Time-to-Detect und der '
          + 'Schweregrad des Incidents erfasst. Die Szenarien liegen als Skripte '
          + 'vor und starten immer vom gleichen VM-Snapshot, damit beide '
          + 'Messreihen vergleichbar sind.',
          entwurf: true }
      },
      {
        frage: 'Wann gibt es Ergebnisse?',
        antwort: { text: 'Die ersten Werte kommen nach der Baseline-Messung, '
          + 'voraussichtlich Anfang 2027. Nach der Re-Messung folgt der '
          + 'Vergleich mit der optimierten Konfiguration. Die Seite '
          + '„Ergebnisse" wird dann laufend ergänzt.',
          entwurf: true }
      },
      {
        frage: 'Was bleibt nach dem Projekt an der Schule?',
        antwort: { text: 'Die Security Fabric bleibt an der HTL Wien 3 Rennweg '
          + 'und kann im Unterricht weiterverwendet werden. Konfigurationen, '
          + 'Installationsanleitungen und die FortiSIEM-Regeln stehen '
          + 'nachfolgenden Jahrgängen zur Verfügung, der Szenarienkatalog samt '
          + 'Skripten ist wiederverwendbar.',
          entwurf: true }
      },
      {
        frage: 'Warum lädt diese Website keine externen Inhalte?',
        antwort: 'Weil das zum Thema passt: Eine Seite über Netzwerksicherheit '
          + 'soll selbst keine Daten an Dritte weitergeben. Schriften und Grafiken '
          + 'liegen lokal, es gibt kein Tracking und keine Cookies.'
      }
    ]
  },

  /* ==========================================================================
     RECHTLICHES — Impressum und Datenschutzerklärung
     --------------------------------------------------------------------------
     Beide Seiten bestehen aus Abschnitten { titel, absaetze: [ ... ] }.
     Ein Absatz kann ein String sein oder { text, entwurf: true }.
     Die Texte sind ENTWÜRFE — Anschrift, Ansprechpersonen und Formulierungen
     bitte mit der Betreuung / Schulleitung abstimmen, bevor sie final sind.
     ========================================================================== */
  impressum: {
    titel: 'Impressum',
    einleitung: 'Offenlegung gemäß § 5 E-Commerce-Gesetz und § 25 Mediengesetz.',
    stand: '09.09.2026',
    abschnitte: [
      {
        titel: 'Medieninhaber und Herausgeber',
        absaetze: [
          { text: 'HTL Wien 3 Rennweg, Rennweg 89b, 1030 Wien, Österreich.',
            entwurf: true },
          { text: 'Für den Inhalt verantwortlich: Projektteam NetGuard — David '
            + 'Mayerhofer, Michal Motola, Paul Bauer, Julian Heyderer '
            + '(Diplomarbeit, Maturajahrgang 2027).', entwurf: true },
          'Kontakt: über das Kontaktformular oder die dort angegebene Adresse.'
        ]
      },
      {
        titel: 'Zweck der Website',
        absaetze: [
          'Darstellung eines Diplomarbeitsprojekts im Rahmen der Ausbildung an '
          + 'der Höheren Abteilung für Informationstechnologie. Diese Seite ist '
          + 'ein Schülerprojekt und keine offizielle Website der HTL Wien 3 '
          + 'Rennweg.'
        ]
      },
      {
        titel: 'Haftungsausschluss',
        absaetze: [
          'Die Inhalte wurden mit Sorgfalt erstellt. Für Richtigkeit, '
          + 'Vollständigkeit und Aktualität wird keine Gewähr übernommen. '
          + 'Alle Angaben zur Infrastruktur sind bewusst generalisiert.',
          'Für Inhalte verlinkter externer Seiten sind ausschließlich deren '
          + 'Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine '
          + 'Rechtsverstöße erkennbar.'
        ]
      },
      {
        titel: 'Urheberrecht und Marken',
        absaetze: [
          'Texte, Grafiken und Diagramme dieser Website stammen vom Projektteam '
          + 'NetGuard, soweit nicht anders gekennzeichnet.',
          { text: 'Das Logo der HTL Wien 3 Rennweg wird mit Zustimmung der Schule '
            + 'verwendet.', entwurf: true },
          'Fortinet, FortiGate, FortiManager, FortiAnalyzer und FortiSIEM sind '
          + 'Marken der Fortinet, Inc. Cisco und Cisco UCS sind Marken der Cisco '
          + 'Systems, Inc. Die Nennung dient ausschließlich der Beschreibung des '
          + 'Projekts; es besteht keine Verbindung zu den Markeninhabern.',
          'Verwendete Schriften: Inter, JetBrains Mono und IBM Plex Sans '
          + 'Condensed, jeweils unter der SIL Open Font License 1.1. Die '
          + 'Lizenztexte liegen im Ordner assets/fonts.'
        ]
      }
    ]
  },

  datenschutz: {
    titel: 'Datenschutzerklärung',
    einleitung: 'Diese Website ist so gebaut, dass so wenig Daten wie möglich '
      + 'anfallen. Hier steht, was trotzdem verarbeitet wird und warum.',
    stand: '09.09.2026',
    abschnitte: [
      {
        titel: 'Verantwortlicher',
        absaetze: [
          { text: 'HTL Wien 3 Rennweg, Rennweg 89b, 1030 Wien. Inhaltlich betreut '
            + 'vom Projektteam NetGuard. Erreichbar über die Kontaktseite.',
            entwurf: true }
        ]
      },
      {
        titel: 'Hosting (GitHub Pages)',
        absaetze: [
          'Die Seite wird über GitHub Pages ausgeliefert, einen Dienst der '
          + 'GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA. '
          + 'Beim Aufruf verarbeitet GitHub technisch notwendige Daten wie '
          + 'IP-Adresse, Zeitpunkt, aufgerufene Datei, Browser und Betriebssystem '
          + '(Server-Logs). Rechtsgrundlage ist das berechtigte Interesse an '
          + 'einer sicheren und stabilen Bereitstellung (Art. 6 Abs. 1 lit. f '
          + 'DSGVO).',
          'GitHub ist unter dem EU-US Data Privacy Framework zertifiziert. '
          + 'Details: GitHub Privacy Statement (docs.github.com).'
        ]
      },
      {
        titel: 'Keine Cookies, kein Tracking',
        absaetze: [
          'Diese Website setzt keine Cookies, bindet keine Analyse-, Werbe- '
          + 'oder Social-Media-Dienste ein und lädt keine Inhalte von Dritten '
          + 'nach. Schriften und Grafiken liegen auf demselben Server wie die '
          + 'Seite selbst. Ein Cookie-Banner ist deshalb nicht erforderlich.',
          'Einzige Ausnahme: Wählt man über den Schalter in der Kopfzeile ein '
          + 'helles oder dunkles Farbschema, wird diese Wahl im lokalen Speicher '
          + 'des Browsers (localStorage) abgelegt — ein einzelner Wert, ohne '
          + 'Kennung, nur auf dem eigenen Gerät. Er ist für die gewünschte '
          + 'Darstellung unbedingt erforderlich und kann in den '
          + 'Browser-Einstellungen jederzeit gelöscht werden.'
        ]
      },
      {
        titel: 'Kontaktaufnahme',
        absaetze: [
          'Das Kontaktformular sendet nichts an einen Server. Beim Absenden '
          + 'öffnet sich das Mailprogramm auf dem eigenen Gerät mit einem '
          + 'vorbereiteten Entwurf; die Nachricht wird von dort verschickt. Die '
          + 'übermittelten Angaben (Name, Betreff, Text, Absenderadresse) werden '
          + 'ausschließlich zur Beantwortung der Anfrage verwendet und im '
          + 'Schul-E-Mail-System gespeichert (Art. 6 Abs. 1 lit. b bzw. f DSGVO).'
        ]
      },
      {
        titel: 'Externe Links',
        absaetze: [
          'Links zu anderen Websites (z. B. zur Schule oder zu GitHub) sind als '
          + 'solche erkennbar. Beim Anklicken gelten die Datenschutzbestimmungen '
          + 'des jeweiligen Anbieters.'
        ]
      },
      {
        titel: 'Ihre Rechte',
        absaetze: [
          'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, '
          + 'Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. '
          + 'Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das '
          + 'Datenschutzrecht verstößt, können Sie sich bei der österreichischen '
          + 'Datenschutzbehörde beschweren (Barichgasse 40–42, 1030 Wien, '
          + 'dsb.gv.at).'
        ]
      }
    ]
  },

  /* ==========================================================================
     FEHLERSEITE — wird bei einer unbekannten Adresse angezeigt (404)
     ========================================================================== */
  fehlerseite: {
    titel: 'Seite nicht gefunden',
    text: 'Unter dieser Adresse gibt es nichts. Vielleicht wurde die Seite '
      + 'umbenannt oder der Link ist unvollständig. Diese Seiten gibt es:'
  },

  /* ==========================================================================
     FOOTER — Schule, Impressum, rechtliche Hinweise
     ========================================================================== */
  footer: {

    schule: 'HTL Wien 3 Rennweg',
    abteilung: 'Höhere Abteilung für Informationstechnologie',
    maturajahrgang: '2027',

    // Klasse laut Antrag v3. Wird derzeit nicht angezeigt — zum Anzeigen
    // klasseAnzeigen auf true setzen.
    klasse: '5AX',
    klasseAnzeigen: false,

    // ENTWURF – ANSCHRIFT UNBEDINGT PRÜFEN. Das vollständige Impressum steht
    // oben unter "impressum" und hat eine eigene Seite.
    anschrift: { text: 'Rennweg 89b, 1030 Wien', entwurf: true },
    hinweis: 'Diplomarbeitsprojekt — keine offizielle Website der HTL Wien 3 Rennweg.',
    quelltext: 'https://github.com/htl3r-2144/DA_Webseite_NetGuard',

    // Pflichthinweis — nicht entfernen.
    generalisierungshinweis: 'Alle dargestellten Konfigurationen sind '
      + 'generalisiert; es werden keine Details der realen Schulinfrastruktur '
      + 'veröffentlicht.',

    /* Downloads. Ist die Liste leer, wird der Bereich ausgeblendet.
       Weitere Dateien: nach assets/ legen und hier eine Zeile ergänzen.

       Diplomarbeitsansuchen entfernt: Auf Seite 9 der Originalfassung
       stehen die Schul-E-Mail-Adressen aller vier Teammitglieder — das
       ist personenbezogene Daten, die hier nicht öffentlich stehen
       dürfen. assets/da-ansuchen.pdf wurde deshalb ebenfalls gelöscht. */
    dokumente: []
  }
};
