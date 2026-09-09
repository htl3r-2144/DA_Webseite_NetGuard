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
   * Keine Klassenbezeichnungen im Zusammenhang mit Phase 2.
   * Keine E-Mail-Adressen im Klartext (siehe Abschnitt "kontakt").
   * Keine Ergebnisse behaupten, die noch nicht gemessen wurden.
   ========================================================================== */

window.NETGUARD_CONTENT = {

  /* ==========================================================================
     META — Titel, Beschreibung und Bilder für Browser-Tab und Link-Vorschau
     ========================================================================== */
  meta: {
    titel: 'NetGuard — Fortinet Security Fabric in der Praxis',
    // Wird in Suchergebnissen und Link-Vorschauen angezeigt. Max. ca. 160 Zeichen.
    beschreibung: 'Diplomarbeit an der HTL Wien 3 Rennweg: Aufbau einer Fortinet '
      + 'Security Fabric in einer Laborumgebung und Evaluierung ihrer '
      + 'Erkennungsleistung an realem Schulnetzwerk-Traffic.',
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
      kurz: { text: 'Laborumgebung und Echtbetrieb im direkten Vergleich.', entwurf: true }
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
      kurz: { text: 'Erkennungsraten und False Positives — folgt nach Phase 1.', entwurf: true }
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

    // Wörtlicher Titel aus dem Diplomarbeitsansuchen — Faktum, kein Entwurf.
    antragstitel: 'Fortinet Security Fabric in der Praxis: Aufbau einer '
      + 'simulierten Unternehmensinfrastruktur und Evaluierung anhand realer '
      + 'Schulnetzwerkdaten',

    // ENTWURF – von Michal ersetzen
    untertitel: {
      text: 'Eine Security Fabric wird unter Laborbedingungen aufgebaut und '
        + 'anschließend an realem Netzwerkverkehr gemessen. Untersucht wird, '
        + 'wie viel von der Erkennungsleistung im Labor unter echten '
        + 'Bedingungen übrig bleibt.',
      entwurf: true
    },

    // Zentrale Forschungsfrage, wörtlich aus dem Ansuchen — Faktum.
    forschungsfrage: 'Wie gut lässt sich die Erkennungsleistung einer in einer '
      + 'Laborumgebung konfigurierten Fortinet Security Fabric auf realen '
      + 'Schulnetzwerktraffic übertragen, gemessen an Erkennungsrate, '
      + 'False-Positive-Rate und neu auftretenden Ereignistypen in FortiSIEM?',

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
      { wert: '2',  label: 'Projektphasen' },
      { wert: '9',  label: 'Monate Laufzeit' }
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
        'Moderne Unternehmensnetze verbinden Verzeichnisdienste, WLAN-Infrastruktur '
        + 'und heterogene Endgeräte zu einer großen Angriffsfläche. Eine einzelne '
        + 'Firewall sieht davon immer nur einen Ausschnitt: Ereignisse entstehen an '
        + 'verschiedenen Stellen und bleiben unverbunden, solange sie niemand '
        + 'zusammenführt.',

        'Integrierte Ansätze wie die Fortinet Security Fabric setzen genau dort an '
        + 'und korrelieren sicherheitsrelevante Ereignisse zentral. Wie belastbar '
        + 'das in der Praxis ist, lässt sich allerdings nur beurteilen, wenn '
        + 'dieselbe Konfiguration unter zwei unterschiedlichen Bedingungen läuft — '
        + 'einmal kontrolliert, einmal unter realem Verkehr.',

        'An der HTL Wien 3 Rennweg stehen mit einem Cisco UCS-Server und einer '
        + 'physischen FortiGate-Appliance die Voraussetzungen dafür zur Verfügung. '
        + 'Darauf lässt sich eine vollständige Security Fabric aufbauen: zunächst '
        + 'in einer isolierten Laborumgebung, anschließend zur Analyse von realem '
        + 'Schulnetzwerk-Traffic.'
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
        + 'Aufgaben und tauschen ihre Daten untereinander aus. Die Darstellung '
        + 'ist bewusst generalisiert und bildet keine reale Netzwerktopologie ab.',
      entwurf: true
    },

    komponenten: [
      {
        id: 'fortigate',
        name: 'FortiGate',
        rolle: 'Next-Generation Firewall',   // Faktum aus dem Ansuchen
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Physische Appliance im Datenpfad. Setzt Policies, Zonen und IPS '
            + 'durch, trennt die Segmente der Laborumgebung und erzeugt die '
            + 'Logdaten, auf denen die gesamte Auswertung aufbaut.',
          entwurf: true
        }
      },
      {
        id: 'fortimanager',
        name: 'FortiManager',
        rolle: 'Zentrales Policy-Management',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Verwaltet Policy-Packages, Konfigurationsstände und Backups '
            + 'zentral. Änderungen werden nicht direkt auf der Appliance '
            + 'vorgenommen, sondern als Package ausgerollt — das erzeugt einen '
            + 'nachvollziehbaren Audit-Trail.',
          entwurf: true
        }
      },
      {
        id: 'fortianalyzer',
        name: 'FortiAnalyzer',
        rolle: 'Log-Aggregation und Forensik',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Nimmt die Logdaten der FortiGate auf, macht sie durchsuchbar und '
            + 'erzeugt Reports. Grundlage für forensische Rückfragen: was ist wann '
            + 'passiert, und welche Ereignisse gehören zusammen.',
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
            + 'Rules zu Incidents, führt eine CMDB der bekannten Systeme und löst '
            + 'Alerts aus. Hier entstehen die Kennzahlen, an denen die '
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
      titel: 'Simulierte Unternehmensumgebung',
      bausteine: [
        'Windows Server mit Active Directory',
        'domänenbeigetretene Client-VMs',
        'WLAN-Simulation mit 802.1X/RADIUS',
        'Fileserver und Intranet-Dienste'
      ]
    },

    echtbetrieb: {
      titel: 'Realer Schulnetzwerk-Traffic (Phase 2)',
      bausteine: [
        'produktiver Netzwerkverkehr',
        'ausschließlich passive Analyse',
        'kein Eingriff in den Betrieb'
      ]
    },

    // Beschriftungen der Pfeile im Diagramm. Kurz halten, max. ca. 20 Zeichen.
    fluesse: {
      trafficLabor:  'Traffic',
      trafficEcht:   'Schulnetz-Traffic',
      policy:        'Policy-Deployment',
      logs:          'Logs',
      events:        'Events'
    }
  },

  /* ==========================================================================
     PHASEN — Phase 1 und Phase 2 gegenübergestellt
     ========================================================================== */
  phasen: {
    titel: 'Zwei Phasen',

    liste: [
      {
        nummer: 1,
        kurz: 'Laborumgebung',
        titel: 'Kontrollierte Bedingungen',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Auf dem Cisco UCS-Server entsteht eine isolierte '
            + 'Unternehmensumgebung, die vollständig in die Security Fabric '
            + 'eingebunden wird. Der Verkehr ist bekannt, die Angriffe sind '
            + 'definiert — dadurch ist jedes ausgelöste Ereignis einer Ursache '
            + 'zuordenbar.',
          entwurf: true
        },
        punkte: [
          'isolierte Umgebung, kein Kontakt zum Produktivnetz',
          'alle vier Fortinet-Komponenten zur Fabric verbunden',
          'fünf definierte Angriffsszenarien mit Kali Linux',
          'Erkennungsrate, Alerts und False Positives je Szenario dokumentiert'
        ]
      },
      {
        nummer: 2,
        kurz: 'Echtbetrieb',
        titel: 'Realer Netzwerkverkehr',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Dieselbe Konfiguration wird anschließend mit realem '
            + 'Schulnetzwerk-Traffic konfrontiert. Die Analyse erfolgt rein '
            + 'passiv, ohne Eingriff in den laufenden Betrieb. Hier zeigt sich, '
            + 'welche Ereignistypen im Labor schlicht nicht vorkommen.',
          entwurf: true
        },
        punkte: [
          'realer Netzwerkverkehr statt simuliertem',
          'ausschließlich passive Analyse, kein Eingriff in den Betrieb',
          'Authentifizierungs-, DNS- und Web-Traffic über Correlation Rules',
          'neu auftretende Ereignistypen werden erfasst'
        ]
      }
    ],

    // Fünf Angriffsszenarien aus Phase 1 — Fakten aus dem Ansuchen.
    szenarien: {
      titel: 'Angriffsszenarien in Phase 1',
      liste: [
        'Port Scan',
        'Brute Force gegen SMB/RDP',
        'Lateral Movement',
        'C2-Traffic-Simulation',
        'Policy-Verstoß'
      ]
    },

    // Worauf der Vergleich hinausläuft.
    vergleich: {
      titel: 'Der Vergleich',
      // ENTWURF – von Michal ersetzen
      beschreibung: {
        text: 'Aus beiden Phasen entsteht ein strukturierter Vergleichsbericht. '
          + 'Er beantwortet die Forschungsfrage mit gemessenen Werten statt mit '
          + 'Einschätzungen.',
        entwurf: true
      },
      punkte: [
        'quantitative Gegenüberstellung der Erkennungsraten beider Phasen',
        'Auflistung der in Phase 2 neu aufgetretenen Ereignistypen',
        'vergleichende Bewertung der False-Positive-Raten',
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

    meilensteine: [
      {
        id: 'fabric',
        phase: 1,
        titel: 'Aufbau der Security Fabric',
        zeitraum: '09/2026 – 10/2026',
        status: 'geplant',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Installation und Lizenzierung aller vier Komponenten, '
            + 'Verbindung zur Fabric, erstes Policy-Package über den '
            + 'FortiManager ausgerollt.',
          entwurf: true
        }
      },
      {
        id: 'labor',
        phase: 1,
        titel: 'Aufbau der Laborumgebung',
        zeitraum: '10/2026 – 12/2026',
        status: 'geplant',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Active Directory, Client-VMs, WLAN-Simulation mit 802.1X und '
            + 'Fileserver aufsetzen und vollständig in die Fabric integrieren.',
          entwurf: true
        }
      },
      {
        id: 'angriffe',
        phase: 1,
        titel: 'Angriffssimulation',
        zeitraum: '12/2026 – 01/2027',
        status: 'geplant',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Durchführung der fünf definierten Szenarien mit Kali Linux, '
            + 'Auswertung der ausgelösten Incidents und Anpassung der '
            + 'Correlation Rules.',
          entwurf: true
        }
      },
      {
        id: 'passivanalyse',
        phase: 2,
        titel: 'Passivanalyse Schulnetz-Traffic',
        zeitraum: '01/2027 – 03/2027',
        status: 'geplant',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Analyse von realem Netzwerkverkehr durch die Fabric, ohne '
            + 'Eingriff in den laufenden Betrieb.',
          entwurf: true
        }
      },
      {
        id: 'vergleich',
        phase: 2,
        titel: 'Vergleichsbericht',
        zeitraum: '03/2027 – 04/2027',
        status: 'geplant',
        // ENTWURF – von Michal ersetzen
        beschreibung: {
          text: 'Gegenüberstellung der Erkennungsraten und False-Positive-Raten '
            + 'beider Phasen, Ableitung von Konfigurationsempfehlungen.',
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
          Beispiel: werte: [82, 61]  ->  82 % in Phase 1, 61 % in Phase 2
       3. null bedeutet "noch nicht gemessen" und wird schraffiert dargestellt.
       4. Wenn alle Werte da sind, status auf 'verfuegbar' setzen.
     ========================================================================== */
  ergebnisse: {
    titel: 'Ergebnisse',
    status: 'ausstehend',
    hinweis: 'folgt nach Phase 1',

    // ENTWURF – von Michal ersetzen
    platzhalter: {
      text: 'Es liegen noch keine Messwerte vor. Sobald die Angriffssimulation '
        + 'in Phase 1 abgeschlossen ist, werden hier die Erkennungsraten je '
        + 'Szenario veröffentlicht, später ergänzt um die Werte aus Phase 2.',
      entwurf: true
    },

    charts: [
      {
        id: 'erkennungsraten',
        titel: 'Erkennungsrate je Szenario',
        einheit: '%',
        achse: { max: 100, schritt: 25 },
        serien: [
          { name: 'Phase 1 (Labor)',     ton: 'akzent'  },
          { name: 'Phase 2 (Schulnetz)', ton: 'neutral' }
        ],
        kategorien: [
          { label: 'Port Scan',        werte: [null, null] },
          { label: 'Brute Force',      werte: [null, null] },
          { label: 'Lateral Movement', werte: [null, null] },
          { label: 'C2-Simulation',    werte: [null, null] },
          { label: 'Policy-Verstoß',   werte: [null, null] }
        ]
      }
    ],

    // ENTWURF – von Michal ersetzen
    verwertung: {
      text: 'Die aufgebaute Security Fabric verbleibt nach Projektabschluss an '
        + 'der HTL Wien 3 Rennweg. Dokumentierte Konfigurationen, '
        + 'Deployment-Anleitungen und Correlation Rules stehen nachfolgenden '
        + 'Jahrgängen als Lehr- und Referenzmaterial zur Verfügung.',
      entwurf: true
    }
  },

  /* ==========================================================================
     TEAM
     --------------------------------------------------------------------------
     bild: null       -> Platzhalter mit Initialen (aktuell so eingestellt)
     bild: './assets/team/nachname.jpg'  -> Foto, sobald eines vorliegt.
           Empfohlen: quadratisch, 320x320 Pixel.
     name, kuerzel, rolle und schwerpunkt stammen aus dem Ansuchen.
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
          + 'Backups, Audit-Trail), Datenschutzkoordination, Gesamtdokumentation',
        bild: null,
        // ENTWURF – von Michal ersetzen
        bio: {
          text: 'Setzt den FortiManager auf und verwaltet die Policy-Packages. '
            + 'Verantwortet Projektkoordination und Zeitplanung und prüft die '
            + 'Gesamtdokumentation auf Vollständigkeit und Konsistenz.',
          entwurf: true
        }
      },
      {
        name: 'Michal Motola',
        kuerzel: 'MOT',
        rolle: 'Stellvertretender Projektleiter',
        komponente: 'FortiGate',
        schwerpunkt: 'FortiGate (Policies, Zonen, IPS, SSL Inspection), '
          + 'AD-Infrastruktur, Labor-VMs, Angriffssimulation, Hardening',
        bild: null,
        // ENTWURF – von Michal ersetzen
        bio: {
          text: 'Konfiguriert Policies, Zonen und IPS auf der FortiGate und baut '
            + 'die AD-Infrastruktur samt Labor-VMs auf. Plant und führt die '
            + 'Angriffsszenarien mit Kali Linux durch und bewertet die '
            + 'Konfiguration anhand einer anerkannten Hardening-Checkliste.',
          entwurf: true
        }
      },
      {
        name: 'Paul Bauer',
        kuerzel: 'BAU',
        rolle: 'Projektmitarbeiter',
        komponente: 'FortiSIEM',
        schwerpunkt: 'FortiSIEM (Deployment Supervisor und Worker, Correlation '
          + 'Rules, Alerting, CMDB)',
        bild: null,
        // ENTWURF – von Michal ersetzen
        bio: {
          text: 'Deployt FortiSIEM vollständig und konfiguriert Correlation Rules '
            + 'und Alerting. Wertet die Erkennungsraten beider Phasen aus und '
            + 'erstellt den strukturierten Vergleichsbericht.',
          entwurf: true
        }
      },
      {
        name: 'Julian Heyderer',
        kuerzel: 'HEY',
        rolle: 'Projektmitarbeiter',
        komponente: 'FortiAnalyzer',
        schwerpunkt: 'FortiAnalyzer (Logging, Reports, Forensik), '
          + 'Datenschutzkonzept und Anonymisierung',
        bild: null,
        // ENTWURF – von Michal ersetzen
        bio: {
          text: 'Konfiguriert den FortiAnalyzer für Logging, forensische Suche '
            + 'und automatisierte Reports. Arbeitet das Anonymisierungskonzept '
            + 'aus und implementiert es technisch.',
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
        frage: 'Wird in das Schulnetz eingegriffen?',
        antwort: { text: 'Nein. Phase 2 ist eine rein passive Analyse von '
          + 'Netzwerkverkehr. Es werden keine Verbindungen blockiert, keine '
          + 'Geräte verändert und kein Betrieb beeinflusst.',
          entwurf: true }
      },
      {
        frage: 'Werden personenbezogene Daten verarbeitet?',
        antwort: { text: 'Das Datenschutzkonzept sieht Anonymisierung vor, '
          + 'bevor Daten ausgewertet werden. Auf dieser Website werden keine '
          + 'Messdaten aus dem Schulnetz veröffentlicht, nur aggregierte '
          + 'Kennzahlen wie Erkennungsraten je Szenario.',
          entwurf: true }
      },
      {
        frage: 'Welche Hardware wird verwendet?',
        antwort: { text: 'Ein Cisco UCS-Server für die virtualisierte Labor- und '
          + 'Fabric-Umgebung sowie eine physische FortiGate-Appliance. Beides '
          + 'steht an der HTL Wien 3 Rennweg zur Verfügung.',
          entwurf: true }
      },
      {
        frage: 'Wie wird die Erkennungsleistung gemessen?',
        antwort: { text: 'In Phase 1 werden fünf definierte Angriffsszenarien '
          + 'ausgeführt; je Szenario wird dokumentiert, ob und wie die Fabric '
          + 'sie erkennt, welche Alerts entstehen und wie viele False Positives '
          + 'auftreten. In Phase 2 wird dieselbe Konfiguration an realem '
          + 'Verkehr beobachtet und mit den Laborwerten verglichen.',
          entwurf: true }
      },
      {
        frage: 'Wann gibt es Ergebnisse?',
        antwort: { text: 'Nach Abschluss der Angriffssimulation in Phase 1, '
          + 'voraussichtlich ab Anfang 2027. Die Seite „Ergebnisse" wird dann '
          + 'laufend ergänzt.',
          entwurf: true }
      },
      {
        frage: 'Was bleibt nach dem Projekt an der Schule?',
        antwort: { text: 'Die aufgebaute Security Fabric samt dokumentierter '
          + 'Konfiguration, Deployment-Anleitungen und Correlation Rules. '
          + 'Nachfolgende Jahrgänge können darauf aufbauen.',
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

    // Im Ansuchen steht 4AX (Schuljahr 2025/26). Im Maturajahr ist es 5AX.
    // Wird derzeit nicht angezeigt — zum Anzeigen klasseAnzeigen auf true setzen.
    klasse: '4AX',
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
