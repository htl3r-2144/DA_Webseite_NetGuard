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
    url: 'https://htl3r-2146.github.io/NetGuard/',

    // Schullogo. Datei liegt in assets/. Aktuell ein Platzhalter — ersetzen.
    logo: './assets/logo-htl.svg',
    logoAlt: 'HTL Wien 3 Rennweg',
    logoBreite: 132,   // Pixel — muss zur Datei passen, verhindert Layout-Shift
    logoHoehe: 36
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
    }
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

    // ENTWURF – von Michal ersetzen  ///  ANSCHRIFT UNBEDINGT PRÜFEN
    impressum: {
      entwurf: true,
      titel: 'Impressum und Offenlegung gemäß § 5 ECG',
      medieninhaber: 'HTL Wien 3 Rennweg',
      anschrift: 'Rennweg 89b, 1030 Wien, Österreich',
      verantwortlich: 'Projektteam NetGuard — David Mayerhofer, Michal Motola, '
        + 'Paul Bauer, Julian Heyderer',
      zweck: 'Darstellung eines Diplomarbeitsprojekts im Rahmen der Ausbildung.',
      hinweis: 'Diese Seite ist ein Schülerprojekt und keine offizielle Website '
        + 'der HTL Wien 3 Rennweg.'
    },

    // Pflichthinweis — nicht entfernen.
    generalisierungshinweis: 'Alle dargestellten Konfigurationen sind '
      + 'generalisiert; es werden keine Details der realen Schulinfrastruktur '
      + 'veröffentlicht.',

    /* Downloads. Ist die Liste leer, wird der Bereich ausgeblendet.
       Weitere Dateien: nach assets/ legen und hier eine Zeile ergänzen.

       Zum Ansuchen: Es ist die Originalfassung. Auf Seite 9 stehen die
       Schul-E-Mail-Adressen aller vier Teammitglieder — so am 28.07.2026
       entschieden.

       Falls das später zurückgenommen werden soll, reicht es NICHT, diese
       Zeile zu entfernen: die Datei liegt dann weiterhin unter
       assets/da-ansuchen.pdf und bleibt über die direkte URL erreichbar.
       Sie muss zusätzlich gelöscht und der Löschstand gepusht werden. */
    dokumente: [
      {
        titel: 'Diplomarbeitsansuchen',
        datei: './assets/da-ansuchen.pdf',
        groesse: 'PDF · 287 kB'
      }
    ]
  }
};
