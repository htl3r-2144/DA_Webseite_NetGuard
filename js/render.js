/* =============================================================================
   NetGuard — Renderer
   -----------------------------------------------------------------------------
   Die Seite besteht aus mehreren HTML-Dateien. Jede davon ist nur ein Gerüst:
   Kopfzeile, Inhalt und Fußzeile baut diese Datei aus data/content.js auf.

   Welche Seite gerendert wird, steht im <body>:   <body data-seite="architektur">

   Für Inhaltsänderungen muss diese Datei NICHT angefasst werden.

   ENTWURFS-ANSICHT
   ?entwurf an die Adresse hängen, z. B. architektur.html?entwurf — dann werden
   alle noch nicht finalen Texte markiert.
   ========================================================================== */

(function () {
  'use strict';

  var C = window.NETGUARD_CONTENT;
  if (!C) {
    console.error('content.js wurde nicht geladen oder enthält einen Syntaxfehler.');
    return;
  }

  var SEITE = document.body.getAttribute('data-seite') || 'index';
  var ENTWURF_ANZEIGEN = new URLSearchParams(window.location.search).has('entwurf');
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SVG_NS = 'http://www.w3.org/2000/svg';

  document.documentElement.classList.add('js');

  /* -- Hilfsfunktionen ----------------------------------------------------- */

  /** Liest einen Text, egal ob als String oder als { text, entwurf } notiert. */
  function t(v) {
    if (v === null || v === undefined) return '';
    return typeof v === 'object' ? (v.text || '') : v;
  }
  function istEntwurf(v) { return !!(v && typeof v === 'object' && v.entwurf); }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function badge(v) {
    return (ENTWURF_ANZEIGEN && istEntwurf(v))
      ? ' <span class="entwurf-badge">Entwurf</span>' : '';
  }
  function tx(v) { return esc(t(v)) + badge(v); }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function svgEl(name, attrs) {
    var e = document.createElementNS(SVG_NS, name);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) e.setAttribute(k, attrs[k]);
    }
    return e;
  }

  var PFEIL = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">'
    + '<path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" '
    + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* Alle Seiten außer der Startseite — für Nummerierung und Blättern. */
  function unterseiten() {
    return C.navigation.filter(function (s) { return s.id !== 'index'; });
  }
  function seitenNr(id) {
    var u = unterseiten();
    for (var i = 0; i < u.length; i++) { if (u[i].id === id) return i + 1; }
    return 0;
  }
  function zweistellig(n) { return ('0' + n).slice(-2); }

  /* -- Kopfzeile ----------------------------------------------------------- */

  function renderHeader() {
    var m = C.meta;
    $('#site-header').innerHTML =
      '<div class="wrap">'
      + '<a class="brand" href="./index.html">'
      +   '<img src="' + esc(m.logo) + '" alt="' + esc(m.logoAlt) + '" '
      +   'width="' + esc(m.logoBreite) + '" height="' + esc(m.logoHoehe) + '">'
      +   '<span class="brand-name">' + esc(C.hero.projektname) + '</span>'
      + '</a>'
      + '<nav class="site-nav" aria-label="Hauptnavigation"><ul>'
      + C.navigation.map(function (s) {
          var aktiv = s.id === SEITE;
          var nr = s.id === 'index' ? '' : '<span class="nr">'
            + zweistellig(seitenNr(s.id)) + '</span>';
          return '<li><a href="' + esc(s.datei) + '"'
            + (aktiv ? ' aria-current="page"' : '') + '>'
            + nr + '<span>' + esc(s.nav) + '</span></a></li>';
        }).join('')
      + '</ul></nav>'
      + '</div>';
  }

  /* -- Seitenkopf ---------------------------------------------------------- */

  /** Kennzahlen in der Metadatenzeile — werden aus den Inhalten berechnet,
      damit sie nicht veralten, wenn jemand Einträge ergänzt. */
  function metaFuer(id) {
    if (id === 'architektur') {
      return [['Komponenten', String(C.architektur.komponenten.length)],
              ['Darstellung', 'generalisiert']];
    }
    if (id === 'phasen') {
      return [['Phasen', String(C.phasen.liste.length)],
              ['Angriffsszenarien', String(C.phasen.szenarien.liste.length)]];
    }
    if (id === 'fortschritt') {
      var f = C.fortschritt;
      var fertig = f.meilensteine.filter(function (m) {
        return m.status === 'abgeschlossen';
      }).length;
      return [['Zeitraum', f.zeitraum.von + ' – ' + f.zeitraum.bis],
              ['Meilensteine', fertig + ' von ' + f.meilensteine.length + ' erreicht']];
    }
    if (id === 'ergebnisse') {
      return [['Status', C.ergebnisse.status === 'verfuegbar' ? 'Messwerte vorhanden' : C.ergebnisse.hinweis],
              ['Auswertung', 'FortiAnalyzer und FortiSIEM']];
    }
    if (id === 'team') {
      return [['Mitglieder', String(C.team.mitglieder.length)],
              ['Betreuung', String(C.team.betreuung.personen.length)]];
    }
    if (id === 'kontakt') {
      return [['Antwort', 'per E-Mail'], ['Datenübertragung', 'keine']];
    }
    return [];
  }

  function seitenkopf(titel, lead) {
    var nr = seitenNr(SEITE);
    var gesamt = unterseiten().length;
    var meta = metaFuer(SEITE);

    return '<header class="page-head">'
      + '<div class="wrap">'
      +   '<p class="doc-index" data-auftritt>Dokument '
      +     '<span class="aktiv">' + zweistellig(nr) + '</span>'
      +     '<span class="strich"></span>' + zweistellig(gesamt) + '</p>'
      +   '<h1 data-auftritt>' + esc(titel) + '</h1>'
      +   (lead ? '<p class="page-lead" data-auftritt>' + tx(lead) + '</p>' : '')
      +   (meta.length
            ? '<dl class="doc-meta" data-auftritt>'
              + meta.map(function (p) {
                  return '<div><dt>' + esc(p[0]) + '</dt><dd>' + esc(p[1]) + '</dd></div>';
                }).join('')
              + '</dl>'
            : '')
      + '</div>'
      + '</header>';
  }

  /* -- Startseite ---------------------------------------------------------- */

  function renderIndex() {
    var h = C.hero;
    var a = C.ausgangssituation;

    var absMark = (ENTWURF_ANZEIGEN && a.absaetze.entwurf)
      ? ' <span class="entwurf-badge">Entwurf</span>' : '';

    return '<section class="hero">'
      + '<div class="wrap">'
      +   '<p class="hero-kicker" data-auftritt>Diplomarbeit · ' + esc(C.footer.schule)
      +     ' · Maturajahrgang ' + esc(C.footer.maturajahrgang) + '</p>'
      +   '<h1 data-auftritt>' + esc(h.projektname) + '</h1>'
      +   '<p class="hero-antragstitel" data-auftritt>' + esc(h.antragstitel) + '</p>'
      +   '<p class="hero-untertitel" data-auftritt>' + tx(h.untertitel) + '</p>'
      +   '<figure class="frage" data-auftritt>'
      +     '<span class="label">Zentrale Forschungsfrage</span>'
      +     '<blockquote><q>' + esc(h.forschungsfrage) + '</q></blockquote>'
      +   '</figure>'
      +   '<ul class="kennzahlen" data-auftritt>'
      +     h.kennzahlen.map(function (k) {
            return '<li><span class="wert">' + esc(k.wert) + '</span>'
              + '<span class="txt">' + esc(k.label) + '</span></li>';
          }).join('')
      +   '</ul>'
      + '</div>'
      + '</section>'

      + '<section class="block" aria-labelledby="h-ausgang">'
      + '<div class="wrap">'
      +   '<div class="rubrik"><h2 id="h-ausgang">' + esc(a.titel) + '</h2></div>'
      +   '<div class="prose">'
      +     a.absaetze.texte.map(function (p, i) {
            return '<p>' + esc(p) + (i === 0 ? absMark : '') + '</p>';
          }).join('')
      +   '</div>'
      + '</div>'
      + '</section>'

      + '<section class="block" aria-labelledby="h-index">'
      + '<div class="wrap">'
      +   '<div class="rubrik"><h2 id="h-index">Inhalt</h2></div>'
      +   '<div class="index-grid">'
      +     unterseiten().map(function (s, i) {
            return '<a class="tile" href="' + esc(s.datei) + '" data-auftritt>'
              + '<span class="nr">' + zweistellig(i + 1) + '</span>'
              + '<h3>' + esc(s.nav) + '</h3>'
              + '<p>' + tx(s.kurz) + '</p>'
              + '<span class="pfeil">' + PFEIL + '</span>'
              + '</a>';
          }).join('')
      +   '</div>'
      + '</div>'
      + '</section>';
  }

  /* -- Architektur --------------------------------------------------------- */

  /* Feste Positionen im Diagramm. Reihenfolge wie in content.js:
     0 Firewall, 1 Management, 2 Logging, 3 SIEM.                             */
  var NODE_POS = [
    { x: 360, y: 230, w: 300, h: 76 },
    { x:  40, y: 230, w: 200, h: 76 },
    { x: 280, y: 400, w: 240, h: 76 },
    { x: 560, y: 400, w: 240, h: 76 }
  ];
  var ENV_MAX = 40;

  function flowLabel(parent, x, y, text) {
    var breite = text.length * 5.6 + 12;
    parent.appendChild(svgEl('rect', {
      x: x - breite / 2, y: y - 9, width: breite, height: 16,
      rx: 3, fill: 'var(--card)'
    }));
    var el = svgEl('text', { x: x, y: y + 3, 'text-anchor': 'middle', class: 'flow-label' });
    el.textContent = text;
    parent.appendChild(el);
  }

  function quellBox(parent, x, y, w, h, titel, items) {
    parent.appendChild(svgEl('rect', { x: x, y: y, width: w, height: h, rx: 10, class: 'env-box' }));
    var lb = svgEl('text', { x: x + 14, y: y + 22, class: 'env-label' });
    lb.textContent = titel;
    parent.appendChild(lb);
    items.slice(0, 4).forEach(function (it, i) {
      var txt = String(it);
      if (txt.length > ENV_MAX) txt = txt.slice(0, ENV_MAX - 1).trim() + '…';
      var ti = svgEl('text', { x: x + 14, y: y + 46 + i * 21, class: 'env-item' });
      ti.textContent = '– ' + txt;
      parent.appendChild(ti);
    });
  }

  function renderArchitektur() {
    var a = C.architektur;
    return '<section class="block">'
      + '<div class="wrap">'
      +   '<div class="prose" style="margin-bottom:var(--sp-6)"><p>' + tx(a.einleitung) + '</p></div>'
      +   '<div class="arch-layout">'
      +     '<figure class="arch-figure" data-auftritt>'
      +       '<svg id="arch-svg" xmlns="http://www.w3.org/2000/svg"></svg>'
      +       '<figcaption class="visually-hidden">Generalisierte Darstellung. '
      +         'Es werden keine realen Adressen, Hostnamen oder Netzsegmente abgebildet.'
      +       '</figcaption>'
      +     '</figure>'
      +     '<div data-auftritt>'
      +       '<div class="arch-detail" id="arch-detail" aria-live="polite"></div>'
      +       '<div class="arch-liste" id="arch-liste" role="group" '
      +         'aria-label="Komponente auswählen"></div>'
      +     '</div>'
      +   '</div>'
      + '</div>'
      + '</section>';
  }

  function initArchitektur() {
    var a = C.architektur;
    var svg = $('#arch-svg');
    if (!svg) return;

    svg.setAttribute('viewBox', '0 0 880 510');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-labelledby', 'arch-svg-titel arch-svg-desc');

    var titelEl = svgEl('title', { id: 'arch-svg-titel' });
    titelEl.textContent = 'Architektur der Security Fabric';
    var descEl = svgEl('desc', { id: 'arch-svg-desc' });
    descEl.textContent = 'Schematische, generalisierte Darstellung: Traffic aus der '
      + 'simulierten Unternehmensumgebung und realer Schulnetzwerk-Traffic laufen über '
      + 'die ' + a.komponenten[0].name + '. Diese erhält ihre Policies vom '
      + a.komponenten[1].name + ' und liefert Logdaten an ' + a.komponenten[2].name
      + ' sowie Ereignisse an ' + a.komponenten[3].name + '.';
    svg.appendChild(titelEl);
    svg.appendChild(descEl);

    var defs = svgEl('defs', {});
    var marker = svgEl('marker', {
      id: 'pfeil', viewBox: '0 0 8 8', refX: '7', refY: '4',
      markerWidth: '7', markerHeight: '7', orient: 'auto-start-reverse'
    });
    marker.appendChild(svgEl('path', { d: 'M0 0 L8 4 L0 8 z', fill: 'var(--border-strong)' }));
    defs.appendChild(marker);
    svg.appendChild(defs);

    quellBox(svg, 120, 16, 340, 140, a.umgebung.titel, a.umgebung.bausteine);
    quellBox(svg, 500, 16, 340, 140, a.echtbetrieb.titel, a.echtbetrieb.bausteine);

    function linie(d, akzent, gestrichelt) {
      var attrs = {
        d: d, class: 'flow-line' + (akzent ? ' is-accent' : ''),
        'marker-end': 'url(#pfeil)'
      };
      if (gestrichelt) attrs['stroke-dasharray'] = '3 3';
      svg.appendChild(svgEl('path', attrs));
    }
    linie('M290,156 V192 H440 V230');
    linie('M670,156 V192 H580 V230');
    linie('M240,268 H360', true);
    linie('M460,306 V350 H400 V400', true);
    linie('M560,306 V350 H680 V400', true);
    linie('M520,438 H560', false, true);

    flowLabel(svg, 365, 192, a.fluesse.trafficLabor);
    flowLabel(svg, 625, 192, a.fluesse.trafficEcht);
    flowLabel(svg, 300, 252, a.fluesse.policy);
    flowLabel(svg, 430, 350, a.fluesse.logs);
    flowLabel(svg, 620, 350, a.fluesse.events);

    a.komponenten.slice(0, NODE_POS.length).forEach(function (k, i) {
      var p = NODE_POS[i];
      var g = svgEl('g', {
        class: 'node', 'data-id': k.id, tabindex: '0', role: 'button',
        'aria-pressed': 'false',
        'aria-label': k.name + ' — ' + k.rolle + '. Erklärung anzeigen.'
      });
      g.appendChild(svgEl('rect', {
        x: p.x, y: p.y, width: p.w, height: p.h, rx: 10, class: 'node-box'
      }));
      var n = svgEl('text', { x: p.x + 16, y: p.y + 31, class: 'node-name' });
      n.textContent = k.name;
      g.appendChild(n);
      var r = svgEl('text', { x: p.x + 16, y: p.y + 52, class: 'node-rolle' });
      r.textContent = k.rolle;
      g.appendChild(r);
      svg.appendChild(g);
    });

    $('#arch-liste').innerHTML = a.komponenten.map(function (k) {
      return '<button type="button" data-id="' + esc(k.id) + '" aria-pressed="false">'
        + esc(k.name) + '</button>';
    }).join('');

    function zeige(id) {
      var k = a.komponenten.filter(function (x) { return x.id === id; })[0];
      if (!k) return;
      $('#arch-detail').innerHTML =
        '<span class="rolle">' + esc(k.rolle) + '</span>'
        + '<h3>' + esc(k.name) + '</h3>'
        + '<p>' + tx(k.beschreibung) + '</p>';
      $$('#arch-svg .node').forEach(function (n) {
        var an = n.getAttribute('data-id') === id;
        n.classList.toggle('is-active', an);
        n.setAttribute('aria-pressed', an ? 'true' : 'false');
      });
      $$('#arch-liste button').forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-id') === id ? 'true' : 'false');
      });
    }

    $$('#arch-svg .node').forEach(function (n) {
      var id = n.getAttribute('data-id');
      n.addEventListener('mouseenter', function () { zeige(id); });
      n.addEventListener('click', function () { zeige(id); });
      n.addEventListener('focus', function () { zeige(id); });
      n.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); zeige(id); }
      });
    });
    $$('#arch-liste button').forEach(function (b) {
      b.addEventListener('click', function () { zeige(b.getAttribute('data-id')); });
    });

    zeige(a.komponenten[0].id);
  }

  /* -- Phasen -------------------------------------------------------------- */

  function renderPhasen() {
    var p = C.phasen;
    return '<section class="block">'
      + '<div class="wrap">'
      +   '<div class="phasen-grid">'
      +     p.liste.map(function (ph) {
            return '<article class="phase card" data-auftritt>'
              + '<div class="phase-head">'
              +   '<span class="phase-nummer">Phase ' + esc(ph.nummer) + '</span>'
              +   '<h2 class="phase-kurz">' + esc(ph.kurz) + '</h2>'
              + '</div>'
              + '<p class="phase-titel">' + esc(ph.titel) + '</p>'
              + '<p>' + tx(ph.beschreibung) + '</p>'
              + '<ul class="punkte">'
              +   ph.punkte.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('')
              + '</ul>'
              + '</article>';
          }).join('')
      +   '</div>'
      + '</div>'
      + '</section>'

      + '<section class="block" aria-labelledby="h-szen">'
      + '<div class="wrap">'
      +   '<div class="rubrik"><h2 id="h-szen">' + esc(p.szenarien.titel) + '</h2></div>'
      +   '<ul class="chips">'
      +     p.szenarien.liste.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('')
      +   '</ul>'
      + '</div>'
      + '</section>'

      + '<section class="block" aria-labelledby="h-vgl">'
      + '<div class="wrap">'
      +   '<div class="rubrik"><h2 id="h-vgl">' + esc(p.vergleich.titel) + '</h2></div>'
      +   '<div class="prose"><p>' + tx(p.vergleich.beschreibung) + '</p></div>'
      +   '<ul class="punkte" style="margin-top:var(--sp-4)">'
      +     p.vergleich.punkte.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('')
      +   '</ul>'
      + '</div>'
      + '</section>';
  }

  /* -- Fortschritt --------------------------------------------------------- */

  var STATUS_TEXT = {
    geplant: 'geplant', laufend: 'laufend', abgeschlossen: 'abgeschlossen'
  };

  function renderFortschritt() {
    var f = C.fortschritt;
    var haken = '<svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">'
      + '<path d="M2 6.5 L4.6 9 L10 3.4" fill="none" stroke="currentColor" '
      + 'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var liste = '<div class="timeline-progress" id="timeline-progress"></div>'
      + '<div class="timeline-arrow" id="timeline-arrow" aria-hidden="true">'
      + '<svg viewBox="0 0 10 10" focusable="false"><path d="M1 1 L9 1 L5 9 Z" '
      + 'fill="currentColor"/></svg></div>'
      + f.meilensteine.map(function (m) {
          var st = STATUS_TEXT[m.status] || m.status;
          return '<article class="meilenstein" data-status="' + esc(m.status) + '">'
            + '<span class="punkt" aria-hidden="true">'
            +   (m.status === 'abgeschlossen' ? haken : '') + '</span>'
            + '<div class="meilenstein-head">'
            +   '<h2>' + esc(m.titel) + '</h2>'
            +   '<span class="zeitraum">' + esc(m.zeitraum) + '</span>'
            +   '<span class="status">' + esc(st) + '</span>'
            + '</div>'
            + '<p>' + tx(m.beschreibung) + '</p>'
            + '</article>';
        }).join('');

    return '<section class="block">'
      + '<div class="wrap">'
      +   '<div class="timeline" id="timeline">' + liste + '</div>'
      +   '<p class="timeline-rahmen">'
      +     '<span>Projektstart ' + esc(f.zeitraum.von) + '</span>'
      +     '<span>Abgabe ' + esc(f.zeitraum.bis) + '</span>'
      +   '</p>'
      + '</div>'
      + '</section>';
  }

  /** Setzt Fortschrittslinie und Pfeil auf den aktuellen Meilenstein. */
  function animiereTimeline() {
    var tl = $('#timeline');
    var bar = $('#timeline-progress');
    var arrow = $('#timeline-arrow');
    if (!tl || !bar || !arrow) return;

    var items = $$('.meilenstein', tl);
    var ziel = -1;
    items.forEach(function (el, i) {
      var s = el.getAttribute('data-status');
      if (s === 'abgeschlossen' || s === 'laufend') ziel = i;
    });

    /* Position relativ zum Timeline-Container. Bewusst über
       getBoundingClientRect: die Punkte sind absolut innerhalb ihres
       Meilensteins positioniert, offsetTop lieferte für jeden denselben Wert. */
    var hoehe = 0;
    if (ziel >= 0) {
      var punkt = $('.punkt', items[ziel]);
      var oben = tl.getBoundingClientRect().top;
      var pr = punkt.getBoundingClientRect();
      hoehe = (pr.top + pr.height / 2) - oben - 9.6;   /* 0.6rem Startversatz */
      if (hoehe < 0) hoehe = 0;
    }

    if (REDUCED) { bar.style.transition = 'none'; arrow.style.transition = 'none'; }
    bar.style.height = hoehe + 'px';
    arrow.style.transform = 'translateY(' + hoehe + 'px)';
  }

  /* -- Ergebnisse ---------------------------------------------------------- */

  function renderErgebnisse() {
    var e = C.ergebnisse;
    var offen = e.status !== 'verfuegbar';

    return '<section class="block">'
      + '<div class="wrap">'
      +   '<p class="ergebnis-status"><span class="dot" aria-hidden="true"></span>'
      +     (offen ? esc(e.hinweis) : 'Messwerte verfügbar') + '</p>'
      +   (offen ? '<div class="prose"><p>' + tx(e.platzhalter) + '</p></div>' : '')
      +   '<div id="ergebnisse-charts"></div>'
      + '</div>'
      + '</section>'
      + '<section class="block" aria-labelledby="h-verw">'
      + '<div class="wrap">'
      +   '<div class="rubrik"><h2 id="h-verw">Verwertung</h2></div>'
      +   '<div class="prose"><p>' + tx(e.verwertung) + '</p></div>'
      + '</div>'
      + '</section>';
  }

  function initErgebnisse() {
    var e = C.ergebnisse;
    var ziel = $('#ergebnisse-charts');
    if (!ziel) return;
    var offen = e.status !== 'verfuegbar';
    (e.charts || []).forEach(function (cfg) {
      ziel.appendChild(window.NetGuardChart.erstelle(cfg, offen));
    });
  }

  /* -- Team ---------------------------------------------------------------- */

  function initialen(name) {
    return name.split(/\s+/).map(function (w) { return w.charAt(0); })
      .join('').slice(0, 2).toUpperCase();
  }

  function renderTeam() {
    var team = C.team;
    return '<section class="block">'
      + '<div class="wrap">'
      +   '<div class="team-grid">'
      +     team.mitglieder.map(function (m) {
            var avatar = m.bild
              ? '<img class="avatar" src="' + esc(m.bild) + '" width="54" height="54" '
                + 'loading="lazy" alt="Porträtfoto von ' + esc(m.name) + '">'
              : '<span class="avatar" aria-hidden="true">' + esc(initialen(m.name)) + '</span>';
            return '<article class="person card" data-auftritt>'
              + '<div class="person-head">' + avatar
              +   '<div><h2>' + esc(m.name) + '</h2>'
              +   '<span class="rolle">' + esc(m.rolle) + ' · ' + esc(m.kuerzel) + '</span></div>'
              + '</div>'
              + '<p class="bio">' + tx(m.bio) + '</p>'
              + '<p class="schwerpunkt"><span class="label">Themenschwerpunkt</span>'
              +   esc(m.schwerpunkt) + '</p>'
              + '</article>';
          }).join('')
      +   '</div>'
      + '</div>'
      + '</section>'

      + '<section class="block" aria-labelledby="h-betr">'
      + '<div class="wrap">'
      +   '<div class="rubrik"><h2 id="h-betr">' + esc(team.betreuung.titel) + '</h2></div>'
      +   '<ul class="betreuung-liste">'
      +     team.betreuung.personen.map(function (p) {
            return '<li><span class="avatar" aria-hidden="true">'
              + esc(initialen(p.name)) + '</span>'
              + '<span><span class="name">' + esc(p.name) + '</span>'
              + '<span class="rolle">' + esc(p.rolle) + ' · ' + esc(p.kuerzel)
              + '</span></span></li>';
          }).join('')
      +   '</ul>'
      + '</div>'
      + '</section>';
  }

  /* -- Kontakt ------------------------------------------------------------- */

  function renderKontakt() {
    var k = C.kontakt;
    return '<section class="block">'
      + '<div class="wrap">'
      +   '<div class="kontakt-layout">'
      +     '<form class="kontakt-form card" id="kontakt-form" data-auftritt></form>'
      +     '<div data-auftritt>'
      +       '<div class="prose" style="margin-bottom:var(--sp-5)"><p>'
      +         tx(k.einleitung) + '</p></div>'
      +       '<div class="kontakt-direkt" id="kontakt-direkt"></div>'
      +     '</div>'
      +   '</div>'
      + '</div>'
      + '</section>';
  }

  function initKontakt() {
    var k = C.kontakt;
    var form = $('#kontakt-form');
    if (!form) return;

    /* Adresse wird erst hier zusammengesetzt — sie steht nirgends im Quelltext. */
    var adresse = k.empfaengerLokal + String.fromCharCode(64) + k.empfaengerDomain;

    form.innerHTML =
      '<div class="form-feld">'
      +  '<label for="f-name">' + esc(k.felder.name) + '</label>'
      +  '<input type="text" id="f-name" name="name" required autocomplete="name">'
      + '</div>'
      + '<div class="form-feld">'
      +  '<label for="f-betreff">' + esc(k.felder.betreff) + '</label>'
      +  '<input type="text" id="f-betreff" name="betreff" required>'
      + '</div>'
      + '<div class="form-feld">'
      +  '<label for="f-nachricht">' + esc(k.felder.nachricht) + '</label>'
      +  '<textarea id="f-nachricht" name="nachricht" rows="6" required></textarea>'
      + '</div>'
      + '<button type="submit" class="btn btn-primary">' + esc(k.absendenLabel) + '</button>'
      + '<p class="form-hinweis">Beim Absenden öffnet sich Ihr Mailprogramm mit '
      + 'fertig vorbereitetem Text. Es werden keine Daten an einen Server übertragen.</p>'
      + '<p class="form-status" id="form-status" role="status"></p>';

    $('#kontakt-direkt').innerHTML =
      '<p class="kontakt-adresse"><a id="kontakt-link" href="#">' + esc(adresse) + '</a></p>'
      + '<button type="button" class="btn btn-secondary" id="kopieren">'
      + esc(k.kopierenLabel) + '</button>';

    $('#kontakt-link').setAttribute('href', 'mailto:' + adresse);

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = $('#f-name').value.trim();
      var betreff = $('#f-betreff').value.trim();
      var text = $('#f-nachricht').value.trim();
      var body = text + '\n\n--\n' + name;
      $('#form-status').textContent = 'Mailprogramm wird geöffnet …';
      window.location.href = 'mailto:' + adresse
        + '?subject=' + encodeURIComponent(k.betreffPrefix + betreff)
        + '&body=' + encodeURIComponent(body);
    });

    $('#kopieren').addEventListener('click', function () {
      var btn = $('#kopieren');
      var fertig = function () {
        btn.textContent = 'Adresse kopiert';
        setTimeout(function () { btn.textContent = k.kopierenLabel; }, 2500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(adresse).then(fertig, function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = adresse;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); fertig(); } catch (e) { /* ignoriert */ }
        document.body.removeChild(ta);
      }
    });
  }

  /* -- Blättern und Footer ------------------------------------------------- */

  function renderSeitenwechsel() {
    var alle = C.navigation;
    var i = -1;
    alle.forEach(function (s, idx) { if (s.id === SEITE) i = idx; });
    if (i < 0) return '';

    var zurueck = i > 0 ? alle[i - 1] : null;
    var weiter = i < alle.length - 1 ? alle[i + 1] : null;
    if (!zurueck && !weiter) return '';

    return '<div class="wrap"><nav class="seitenwechsel" aria-label="Seitenwechsel">'
      + (zurueck
          ? '<a href="' + esc(zurueck.datei) + '" rel="prev">'
            + '<span class="richtung">Zurück</span>'
            + '<span class="ziel">' + esc(zurueck.nav) + '</span></a>'
          : '<span></span>')
      + (weiter
          ? '<a class="weiter" href="' + esc(weiter.datei) + '" rel="next">'
            + '<span class="richtung">Weiter</span>'
            + '<span class="ziel">' + esc(weiter.nav) + '</span></a>'
          : '<span></span>')
      + '</nav></div>';
  }

  function renderFooter() {
    var f = C.footer;
    var imp = f.impressum;
    var dok = f.dokumente || [];

    var schulzeile = esc(f.schule) + (f.klasseAnzeigen ? ' · ' + esc(f.klasse) : '');

    $('#site-footer').innerHTML =
      '<div class="wrap">'
      + '<div class="footer-grid">'
      +   '<div>'
      +     '<h2>Schule</h2>'
      +     '<p class="footer-schule">' + schulzeile + '</p>'
      +     '<p>' + esc(f.abteilung) + '</p>'
      +     '<p>Maturajahrgang ' + esc(f.maturajahrgang) + '</p>'
      +   '</div>'
      +   '<div>'
      +     '<h2>' + esc(imp.titel) + badge(imp) + '</h2>'
      +     '<p>' + esc(imp.medieninhaber) + '<br>' + esc(imp.anschrift) + '</p>'
      +     '<p>Für den Inhalt verantwortlich:<br>' + esc(imp.verantwortlich) + '</p>'
      +     '<p>' + esc(imp.zweck) + '</p>'
      +     '<p>' + esc(imp.hinweis) + '</p>'
      +   '</div>'
      +   (dok.length
          ? '<div><h2>Dokumente</h2><ul class="dokumente">'
            + dok.map(function (d) {
                return '<li><a href="' + esc(d.datei) + '" download>' + esc(d.titel)
                  + '</a>' + (d.groesse ? ' <span class="mono">' + esc(d.groesse)
                  + '</span>' : '') + '</li>';
              }).join('')
            + '</ul></div>'
          : '')
      + '</div>'
      + '<p class="footer-hinweis">' + esc(f.generalisierungshinweis) + '</p>'
      + '<p class="footer-meta">'
      +   '<span>' + esc(C.hero.projektname) + ' · ' + new Date().getFullYear() + '</span>'
      +   '<span>Diese Seite lädt keine externen Ressourcen und setzt keine Cookies.</span>'
      + '</p>'
      + '</div>';
  }

  /* -- Zusammenbau --------------------------------------------------------- */

  var SEITEN = {
    index:       { render: renderIndex,       init: null },
    architektur: { render: renderArchitektur, init: initArchitektur },
    phasen:      { render: renderPhasen,      init: null },
    fortschritt: { render: renderFortschritt, init: null },
    ergebnisse:  { render: renderErgebnisse,  init: initErgebnisse },
    team:        { render: renderTeam,        init: null },
    kontakt:     { render: renderKontakt,     init: initKontakt }
  };

  var TITEL = {
    architektur: function () { return C.architektur.titel; },
    phasen:      function () { return C.phasen.titel; },
    fortschritt: function () { return C.fortschritt.titel; },
    ergebnisse:  function () { return C.ergebnisse.titel; },
    team:        function () { return C.team.titel; },
    kontakt:     function () { return C.kontakt.titel; }
  };

  function eintragFuer(id) {
    return C.navigation.filter(function (s) { return s.id === id; })[0] || {};
  }

  function staffeln() {
    $$('[data-auftritt]').forEach(function (el, i) {
      el.style.setProperty('--i', i);
    });
  }

  function initReveal() {
    var ziele = $$('.block');
    if (REDUCED || !('IntersectionObserver' in window)) {
      if ($('#timeline')) animiereTimeline();
      return;
    }
    ziele.forEach(function (s) { s.classList.add('reveal'); });
    var obs = new IntersectionObserver(function (eintraege, o) {
      eintraege.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        o.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
    ziele.forEach(function (s) { obs.observe(s); });
  }

  function start() {
    var seite = SEITEN[SEITE] || SEITEN.index;
    var eintrag = eintragFuer(SEITE);

    renderHeader();

    var html = '';
    if (SEITE !== 'index') {
      var titel = TITEL[SEITE] ? TITEL[SEITE]() : eintrag.nav || '';
      html += seitenkopf(titel, eintrag.kurz);
    }
    html += seite.render();
    html += renderSeitenwechsel();
    $('#seiteninhalt').innerHTML = html;

    if (seite.init) seite.init();
    renderFooter();
    staffeln();
    initReveal();

    /* Timeline nach dem Layout messen und animieren. */
    if ($('#timeline')) {
      window.setTimeout(animiereTimeline, REDUCED ? 0 : 260);
    }

    if (ENTWURF_ANZEIGEN) {
      console.info('Entwurfsansicht aktiv — alle markierten Texte stehen in '
        + 'data/content.js und sind noch zu ersetzen.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
