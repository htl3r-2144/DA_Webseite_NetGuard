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
  var HEUTE = new Date();

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
  /** Wie tx, aber Zeilenumbrüche im Text werden zu <br>. */
  function txbr(v) { return esc(t(v)).replace(/\n/g, '<br>') + badge(v); }

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
  function datumDE(d) {
    return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2)
      + '.' + d.getFullYear();
  }

  var PFEIL = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">'
    + '<path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" '
    + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* Das Gewebe-Zeichen: drei Kett- und drei Schussfäden — das Motiv der Seite. */
  var WEAVE = '<svg class="weave" viewBox="0 0 16 16" aria-hidden="true" focusable="false">'
    + '<path d="M2 4h12M2 8h12M2 12h12M4 2v12M8 2v12M12 2v12" fill="none" '
    + 'stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'
    + '<circle cx="8" cy="8" r="1.9" fill="currentColor"/></svg>';

  /* -- Theme-Umschalter ----------------------------------------------------
     Hell ist auf jeder Seite der Standard, unabhängig vom Systemschema. Ein
     Klick setzt data-theme und merkt sich die Wahl im localStorage — damit
     gilt sie auf allen Seiten. Das Flackern beim Laden verhindert ein
     Inline-Skript im <head> jeder Seite, das die gespeicherte Wahl vor dem
     ersten Rendern setzt.                                                  */
  var THEME_KEY = 'netguard-theme';

  var ICON_SONNE = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">'
    + '<circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/>'
    + '<path d="M10 1.5v2.4M10 16.1v2.4M18.5 10h-2.4M3.9 10H1.5M15.9 4.1l-1.7 1.7'
    + 'M5.8 14.2l-1.7 1.7M15.9 15.9l-1.7-1.7M5.8 5.8 4.1 4.1" stroke="currentColor" '
    + 'stroke-width="1.6" stroke-linecap="round"/></svg>';
  var ICON_MOND = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">'
    + '<path d="M17 12.4A7.5 7.5 0 1 1 7.6 3a6 6 0 0 0 9.4 9.4Z" fill="none" '
    + 'stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" '
    + 'stroke-linecap="round"/></svg>';

  function gespeichertesTheme() {
    try { return window.localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  /** Hell ist der Standard auf jeder Seite; nur eine gespeicherte Wahl ändert das. */
  function effektivesTheme() {
    var g = gespeichertesTheme();
    return g === 'dark' ? 'dark' : 'light';
  }
  function wendeTheme(modus) {
    document.documentElement.setAttribute('data-theme', modus);
    var btn = $('#theme-toggle');
    if (!btn) return;
    var hell = modus === 'light';
    btn.innerHTML = hell ? ICON_MOND : ICON_SONNE;
    btn.setAttribute('aria-pressed', hell ? 'false' : 'true');
    btn.setAttribute('aria-label', hell
      ? 'Dunkles Farbschema aktivieren' : 'Helles Farbschema aktivieren');
    var meta = $('meta[name="theme-color"]:not([media])');
    if (meta) meta.setAttribute('content', hell ? '#F2F4F6' : '#0B0F14');
  }
  function initThemeToggle() {
    var btn = $('#theme-toggle');
    if (!btn) return;
    wendeTheme(effektivesTheme());
    btn.addEventListener('click', function () {
      var neu = document.documentElement.getAttribute('data-theme') === 'light'
        ? 'dark' : 'light';
      try { window.localStorage.setItem(THEME_KEY, neu); } catch (e) { /* ignoriert */ }
      wendeTheme(neu);
    });
    /* Wird das Schema in einem anderen Tab umgeschaltet, zieht dieser Tab
       sofort nach — die Wahl gilt überall. */
    window.addEventListener('storage', function (e) {
      if (e.key === THEME_KEY) wendeTheme(effektivesTheme());
    });
  }

  /* -- Navigation: Hilfen -------------------------------------------------- */

  /** Menüseiten: alles außer Startseite und Fußzeilen-Seiten. */
  function unterseiten() {
    return C.navigation.filter(function (s) { return s.id !== 'index' && !s.nurFooter; });
  }
  function hauptseiten() {
    return C.navigation.filter(function (s) { return !s.nurFooter; });
  }
  function footerseiten() {
    return C.navigation.filter(function (s) { return s.nurFooter; });
  }
  function seitenNr(id) {
    var u = unterseiten();
    for (var i = 0; i < u.length; i++) { if (u[i].id === id) return i + 1; }
    return 0;
  }
  function zweistellig(n) { return ('0' + n).slice(-2); }
  function eintragFuer(id) {
    return C.navigation.filter(function (s) { return s.id === id; })[0] || {};
  }
  function dateiFuer(id) { return eintragFuer(id).datei || './index.html'; }

  /* -- Projektstand (für Konsole und Timeline) ----------------------------- */

  /** Zerlegt '09/2026 – 10/2026' oder '04/2027' in Start- und Enddatum. */
  function zeitraumParsen(s) {
    var m = String(s).match(/(\d{2})\/(\d{4})/g);
    if (!m) return null;
    var a = m[0].split('/'), b = (m[1] || m[0]).split('/');
    var von = new Date(+a[1], +a[0] - 1, 1);
    var bis = new Date(+b[1], +b[0], 0, 23, 59, 59);   // letzter Tag des Monats
    return { von: von, bis: bis };
  }
  function laufendLautPlan(m) {
    var z = zeitraumParsen(m.zeitraum);
    return !!(z && HEUTE >= z.von && HEUTE <= z.bis);
  }

  function projektstand() {
    var ms = C.fortschritt.meilensteine;
    var fertig = ms.filter(function (m) { return m.status === 'abgeschlossen'; }).length;
    var aktuell = ms.filter(function (m) { return m.status === 'laufend'; })[0]
      || ms.filter(laufendLautPlan)[0]
      || ms.filter(function (m) { return m.status !== 'abgeschlossen'; })[0]
      || ms[ms.length - 1];
    var phase = aktuell && aktuell.phase ? aktuell.phase : 1;
    var phaseEintrag = C.phasen.liste.filter(function (p) { return p.nummer === phase; })[0];
    return {
      fertig: fertig, gesamt: ms.length, aktuell: aktuell,
      phase: phase, phaseKurz: phaseEintrag ? phaseEintrag.kurz : ''
    };
  }

  /* -- Kopfzeile ----------------------------------------------------------- */

  function renderHeader() {
    var m = C.meta;
    $('#site-header').innerHTML =
      '<span class="scroll-progress" id="scroll-progress" aria-hidden="true"></span>'
      + '<div class="wrap">'
      + '<a class="brand" href="./index.html" aria-label="' + esc(C.hero.projektname)
      +   ' — zur Startseite">'
      +   '<span class="brand-logo"><img src="' + esc(m.logo) + '" alt="' + esc(m.logoAlt) + '" '
      +   'width="' + esc(m.logoBreite) + '" height="' + esc(m.logoHoehe) + '" '
      +   'decoding="async"></span>'
      +   '<span class="brand-name">' + WEAVE + esc(C.hero.projektname) + '</span>'
      + '</a>'
      + '<button type="button" class="nav-toggle" id="nav-toggle" '
      +   'aria-expanded="false" aria-controls="site-nav" aria-label="Menü öffnen">'
      +   '<span class="nav-toggle-bar" aria-hidden="true"></span>'
      +   '<span class="nav-toggle-bar" aria-hidden="true"></span>'
      + '</button>'
      + '<nav class="site-nav" id="site-nav" aria-label="Hauptnavigation"><ul>'
      + hauptseiten().map(function (s) {
          var aktiv = s.id === SEITE;
          var nr = s.id === 'index' ? '' : '<span class="nr">'
            + zweistellig(seitenNr(s.id)) + '</span>';
          return '<li><a href="' + esc(s.datei) + '"'
            + (aktiv ? ' aria-current="page"' : '') + '>'
            + nr + '<span>' + esc(s.nav) + '</span></a></li>';
        }).join('')
      + '</ul></nav>'
      + '<button type="button" class="theme-toggle" id="theme-toggle"></button>'
      + '</div>';
    initThemeToggle();
    initNav();
    initScrollProgress();
  }

  function initNav() {
    var header = $('#site-header');
    var btn = $('#nav-toggle');
    if (!btn) return;
    function setze(offen) {
      header.classList.toggle('nav-open', offen);
      btn.setAttribute('aria-expanded', offen ? 'true' : 'false');
      btn.setAttribute('aria-label', offen ? 'Menü schließen' : 'Menü öffnen');
      document.body.classList.toggle('nav-offen', offen);
    }
    btn.addEventListener('click', function () {
      setze(!header.classList.contains('nav-open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        setze(false); btn.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) setze(false);
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (e) {
      if (e.matches) setze(false);
    });
  }

  function initScrollProgress() {
    var bar = $('#scroll-progress');
    if (!bar) return;
    var tick = false;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
      bar.style.transform = 'scaleX(' + p + ')';
      tick = false;
    }
    window.addEventListener('scroll', function () {
      if (!tick) { tick = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
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
      var st = projektstand();
      return [['Zeitraum', f.zeitraum.von + ' – ' + f.zeitraum.bis],
              ['Meilensteine', st.fertig + ' von ' + st.gesamt + ' erreicht']];
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
    if (id === 'faq') {
      return [['Fragen', String(C.faq.fragen.length)], ['Stand', datumDE(HEUTE)]];
    }
    if (id === 'impressum' || id === 'datenschutz') {
      return [['Stand', C[id].stand || datumDE(HEUTE)], ['Cookies', 'keine']];
    }
    return [];
  }

  function seitenkopf(titel, lead, opts) {
    opts = opts || {};
    var nr = seitenNr(SEITE);
    var gesamt = unterseiten().length;
    var meta = metaFuer(SEITE);
    var index = nr
      ? '<p class="doc-index" data-auftritt>' + WEAVE + 'Dokument '
        + '<span class="aktiv">' + zweistellig(nr) + '</span>'
        + '<span class="strich"></span>' + zweistellig(gesamt) + '</p>'
      : '<p class="doc-index" data-auftritt>' + WEAVE + esc(opts.kicker || 'Rechtliches') + '</p>';

    return '<header class="page-head">'
      + '<div class="wrap">'
      +   index
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

  function renderKonsole() {
    var k = C.hero.konsole;
    var st = projektstand();
    var z = k.zeilen;
    var komponenten = C.architektur.komponenten.map(function (x) { return x.name; });

    function zeile(label, wert, extra) {
      return '<span class="k-line' + (extra ? ' ' + extra : '') + '">'
        + '<span class="k-key">' + esc(label) + '</span>'
        + '<span class="k-val">' + wert + '</span></span>';
    }
    var aktuell = st.aktuell
      ? esc(st.aktuell.titel) + ' <span class="k-dim">' + esc(st.aktuell.zeitraum) + '</span>'
      : '—';

    return '<figure class="konsole" data-auftritt aria-label="Projektstatus">'
      + '<figcaption class="k-bar"><span class="k-dot" aria-hidden="true"></span>'
      +   '<span class="k-title">' + esc(C.hero.projektname.toLowerCase()) + ' · status</span>'
      +   '<span class="k-live"><span class="k-pulse" aria-hidden="true"></span>live</span>'
      + '</figcaption>'
      + '<div class="k-body">'
      +   '<span class="k-line k-cmd"><span class="k-prompt" aria-hidden="true">$</span> '
      +     esc(k.befehl) + '</span>'
      +   zeile(z.projekt, esc(C.hero.projektname) + ' <span class="k-dim">'
      +     esc(C.footer.maturajahrgang) + '</span>')
      +   zeile(z.phase, esc(st.phase) + ' <span class="k-dim">· ' + esc(st.phaseKurz) + '</span>')
      +   zeile(z.meilensteine, '<span class="k-meter" aria-hidden="true">'
      +     C.fortschritt.meilensteine.map(function (m) {
              return '<i data-status="' + esc(m.status) + '"></i>';
            }).join('')
      +     '</span> ' + esc(st.fertig) + '/' + esc(st.gesamt) + ' abgeschlossen')
      +   zeile(z.aktuell, aktuell)
      +   zeile(z.komponenten, komponenten.map(function (n) {
              return '<span class="k-tag">' + esc(n) + '</span>';
            }).join(''))
      +   zeile(z.stand, esc(datumDE(HEUTE)))
      +   '<span class="k-line k-cmd"><span class="k-prompt" aria-hidden="true">$</span> '
      +     '<span class="k-cursor" aria-hidden="true"></span></span>'
      + '</div>'
      + '</figure>';
  }

  function renderIndex() {
    var h = C.hero;
    var a = C.ausgangssituation;

    var absMark = (ENTWURF_ANZEIGEN && a.absaetze.entwurf)
      ? ' <span class="entwurf-badge">Entwurf</span>' : '';

    var aktionen = (h.aktionen || []).map(function (ak, i) {
      return '<a class="btn ' + (i === 0 ? 'btn-primary' : 'btn-secondary') + '" href="'
        + esc(dateiFuer(ak.ziel)) + '">' + esc(ak.label) + (i === 0 ? PFEIL : '') + '</a>';
    }).join('');

    return '<section class="hero" aria-labelledby="h-hero">'
      + '<svg class="fabric" id="fabric-mesh" aria-hidden="true" focusable="false"></svg>'
      + '<div class="wrap hero-grid">'
      +   '<div class="hero-text">'
      +     '<p class="hero-kicker" data-auftritt>' + WEAVE + 'Diplomarbeit · ' + esc(C.footer.schule)
      +       ' · Maturajahrgang ' + esc(C.footer.maturajahrgang) + '</p>'
      +     '<h1 id="h-hero" data-auftritt>' + esc(h.projektname) + '</h1>'
      +     '<p class="hero-antragstitel" data-auftritt>' + esc(h.antragstitel) + '</p>'
      +     '<p class="hero-untertitel" data-auftritt>' + tx(h.untertitel) + '</p>'
      +     '<div class="hero-aktionen" data-auftritt>' + aktionen + '</div>'
      +   '</div>'
      +   renderKonsole()
      + '</div>'
      + '</section>'

      + '<section class="frage-band" aria-labelledby="h-frage">'
      + '<div class="wrap">'
      +   '<h2 id="h-frage" class="label">Zentrale Forschungsfrage</h2>'
      +   '<blockquote class="frage"><p>' + esc(h.forschungsfrage) + '</p></blockquote>'
      +   '<ul class="kennzahlen">'
      +     h.kennzahlen.map(function (k) {
            return '<li><span class="wert">' + esc(k.wert) + '</span>'
              + '<span class="txt">' + esc(k.label) + '</span></li>';
          }).join('')
      +   '</ul>'
      + '</div>'
      + '</section>'

      + '<section class="block" aria-labelledby="h-ausgang">'
      + '<div class="wrap split">'
      +   '<div class="split-head"><h2 id="h-ausgang">' + esc(a.titel) + '</h2></div>'
      +   '<div class="prose prose-lg">'
      +     a.absaetze.texte.map(function (p, i) {
            return '<p>' + esc(p) + (i === 0 ? absMark : '') + '</p>';
          }).join('')
      +   '</div>'
      + '</div>'
      + '</section>'

      + '<section class="block" aria-labelledby="h-index">'
      + '<div class="wrap">'
      +   '<div class="rubrik"><h2 id="h-index">Inhalt</h2>'
      +     '<span class="rubrik-meta">' + unterseiten().length + ' Dokumente</span></div>'
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

  /** Das Gewebe im Hero: Kett- und Schussfäden, Knoten an den Kreuzungen,
      Pakete, die an den Fäden entlanglaufen, und Knoten, die kurz aufleuchten.
      Reines SVG, keine Bibliothek. Bei reduzierter Bewegung steht alles still. */
  function initFabric() {
    var svg = $('#fabric-mesh');
    if (!svg) return;
    var W = 760, H = 560, STEP = 76, OFF = 22;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('preserveAspectRatio', 'xMaxYMin slice');

    var xs = [], ys = [], x, y;
    for (x = OFF; x <= W; x += STEP) xs.push(x);
    for (y = OFF; y <= H; y += STEP) ys.push(y);

    var faeden = svgEl('g', { class: 'f-threads' });
    xs.forEach(function (px) {
      faeden.appendChild(svgEl('line', { x1: px, y1: 0, x2: px, y2: H }));
    });
    ys.forEach(function (py) {
      faeden.appendChild(svgEl('line', { x1: 0, y1: py, x2: W, y2: py }));
    });
    svg.appendChild(faeden);

    /* Knoten: nur jede zweite Kreuzung — das ergibt das Bindungsmuster. */
    var knoten = svgEl('g', { class: 'f-nodes' });
    var alle = [];
    xs.forEach(function (px, i) {
      ys.forEach(function (py, j) {
        if ((i + j) % 2) return;
        var n = svgEl('circle', { cx: px, cy: py, r: 2.2 });
        knoten.appendChild(n);
        alle.push({ x: px, y: py, el: n });
      });
    });
    svg.appendChild(knoten);

    /* Deterministische "Zufalls"-Folge, damit es bei jedem Laden gleich aussieht. */
    var seed = 7;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    /* Aufleuchtende Knoten (Ereignisse) */
    var heiss = svgEl('g', { class: 'f-hot' });
    for (var k = 0; k < 7; k++) {
      var p = alle[Math.floor(rnd() * alle.length)];
      var ring = svgEl('circle', { cx: p.x, cy: p.y, r: 3, class: 'f-ring' });
      ring.style.animationDelay = (rnd() * 9).toFixed(2) + 's';
      heiss.appendChild(ring);
    }
    svg.appendChild(heiss);

    if (REDUCED) return;

    /* Pakete: laufen einen Faden entlang, biegen an einer Kreuzung ab. */
    var pakete = svgEl('g', { class: 'f-packets' });
    for (var q = 0; q < 6; q++) {
      var horizontalZuerst = rnd() > 0.5;
      var a = xs[Math.floor(rnd() * xs.length)], b = ys[Math.floor(rnd() * ys.length)];
      var d = horizontalZuerst
        ? 'M' + (-20) + ',' + b + ' H' + a + ' V' + (H + 20)
        : 'M' + a + ',' + (-20) + ' V' + b + ' H' + (W + 20);
      var dot = svgEl('circle', { r: 3.2, class: 'f-packet' });
      var mot = svgEl('animateMotion', {
        dur: (7 + rnd() * 7).toFixed(1) + 's',
        begin: (rnd() * 8).toFixed(1) + 's',
        repeatCount: 'indefinite', path: d
      });
      dot.appendChild(mot);
      pakete.appendChild(dot);
    }
    svg.appendChild(pakete);
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
      +   '<div class="prose prose-lg" style="margin-bottom:var(--sp-6)"><p>' + tx(a.einleitung) + '</p></div>'
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
      if (akzent && !REDUCED) {
        /* Laufende Datenpakete auf den Fabric-Verbindungen */
        svg.appendChild(svgEl('path', { d: d, class: 'flow-pulse' }));
      }
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
      g.appendChild(svgEl('rect', {
        x: p.x, y: p.y + 10, width: 3, height: p.h - 20, rx: 1.5, class: 'node-mark'
      }));
      var n = svgEl('text', { x: p.x + 18, y: p.y + 31, class: 'node-name' });
      n.textContent = k.name;
      g.appendChild(n);
      var r = svgEl('text', { x: p.x + 18, y: p.y + 52, class: 'node-rolle' });
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
        + '<h2>' + esc(k.name) + '</h2>'
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
      +   '<div class="rubrik"><h2 id="h-szen">' + esc(p.szenarien.titel) + '</h2>'
      +     '<span class="rubrik-meta">' + p.szenarien.liste.length + ' Szenarien</span></div>'
      +   '<ol class="szenarien">'
      +     p.szenarien.liste.map(function (s, i) {
            return '<li><span class="nr">' + zweistellig(i + 1) + '</span>' + esc(s) + '</li>';
          }).join('')
      +   '</ol>'
      + '</div>'
      + '</section>'

      + '<section class="block" aria-labelledby="h-vgl">'
      + '<div class="wrap split">'
      +   '<div class="split-head"><h2 id="h-vgl">' + esc(p.vergleich.titel) + '</h2></div>'
      +   '<div>'
      +     '<div class="prose prose-lg"><p>' + tx(p.vergleich.beschreibung) + '</p></div>'
      +     '<ul class="punkte" style="margin-top:var(--sp-5)">'
      +       p.vergleich.punkte.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('')
      +     '</ul>'
      +   '</div>'
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
      + f.meilensteine.map(function (m, i) {
          var st = STATUS_TEXT[m.status] || m.status;
          var heute = laufendLautPlan(m)
            ? '<span class="heute" title="Laut Zeitplan aktueller Abschnitt">Heute</span>' : '';
          return '<article class="meilenstein" data-status="' + esc(m.status) + '">'
            + '<span class="punkt" aria-hidden="true">'
            +   (m.status === 'abgeschlossen' ? haken : '') + '</span>'
            + '<div class="meilenstein-head">'
            +   '<span class="ms-nr">' + zweistellig(i + 1) + '</span>'
            +   '<h2>' + esc(m.titel) + '</h2>'
            +   '<span class="zeitraum">' + esc(m.zeitraum) + '</span>'
            +   '<span class="status">' + esc(st) + '</span>'
            +   heute
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
      +   (offen ? '<div class="prose prose-lg"><p>' + tx(e.platzhalter) + '</p></div>' : '')
      +   '<div id="ergebnisse-charts"></div>'
      + '</div>'
      + '</section>'
      + '<section class="block" aria-labelledby="h-verw">'
      + '<div class="wrap split">'
      +   '<div class="split-head"><h2 id="h-verw">Verwertung</h2></div>'
      +   '<div class="prose prose-lg"><p>' + tx(e.verwertung) + '</p></div>'
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
              ? '<img class="avatar" src="' + esc(m.bild) + '" width="56" height="56" '
                + 'loading="lazy" decoding="async" alt="Porträtfoto von ' + esc(m.name) + '">'
              : '<span class="avatar" aria-hidden="true">' + esc(initialen(m.name)) + '</span>';
            return '<article class="person card" data-auftritt>'
              + '<div class="person-head">' + avatar
              +   '<div><h2>' + esc(m.name) + '</h2>'
              +   '<span class="rolle">' + esc(m.rolle) + ' · ' + esc(m.kuerzel) + '</span></div>'
              + '</div>'
              + (m.komponente
                  ? '<span class="komponente">' + WEAVE + esc(m.komponente) + '</span>' : '')
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
      +     '<form class="kontakt-form card" id="kontakt-form" novalidate data-auftritt></form>'
      +     '<div data-auftritt>'
      +       '<div class="prose prose-lg" style="margin-bottom:var(--sp-5)"><p>'
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
      +  '<input type="text" id="f-name" name="name" required autocomplete="name" '
      +    'maxlength="120" aria-describedby="e-name">'
      +  '<span class="form-fehler" id="e-name" role="alert"></span>'
      + '</div>'
      + '<div class="form-feld">'
      +  '<label for="f-betreff">' + esc(k.felder.betreff) + '</label>'
      +  '<input type="text" id="f-betreff" name="betreff" required maxlength="150" '
      +    'aria-describedby="e-betreff">'
      +  '<span class="form-fehler" id="e-betreff" role="alert"></span>'
      + '</div>'
      + '<div class="form-feld">'
      +  '<label for="f-nachricht">' + esc(k.felder.nachricht) + '</label>'
      +  '<textarea id="f-nachricht" name="nachricht" rows="6" required minlength="10" '
      +    'maxlength="3000" aria-describedby="e-nachricht"></textarea>'
      +  '<span class="form-fehler" id="e-nachricht" role="alert"></span>'
      + '</div>'
      + '<button type="submit" class="btn btn-primary">' + esc(k.absendenLabel) + PFEIL + '</button>'
      + '<p class="form-hinweis">Beim Absenden öffnet sich Ihr Mailprogramm mit '
      + 'fertig vorbereitetem Text. Es werden keine Daten an einen Server übertragen.</p>'
      + '<p class="form-status" id="form-status" role="status"></p>';

    $('#kontakt-direkt').innerHTML =
      '<p class="label">Direkt per E-Mail</p>'
      + '<p class="kontakt-adresse"><a id="kontakt-link" href="#">' + esc(adresse) + '</a></p>'
      + '<button type="button" class="btn btn-secondary" id="kopieren">'
      + esc(k.kopierenLabel) + '</button>';

    $('#kontakt-link').setAttribute('href', 'mailto:' + adresse);

    function pruefe(feld, fehlerId, meldungen) {
      var el = $(feld), out = $(fehlerId);
      var v = el.value.trim();
      var msg = '';
      if (!v) msg = meldungen.leer;
      else if (el.minLength > 0 && v.length < el.minLength) msg = meldungen.kurz;
      out.textContent = msg;
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ok = pruefe('#f-name', '#e-name', { leer: 'Bitte einen Namen angeben.' });
      ok = pruefe('#f-betreff', '#e-betreff', { leer: 'Bitte einen Betreff angeben.' }) && ok;
      ok = pruefe('#f-nachricht', '#e-nachricht', {
        leer: 'Bitte eine Nachricht eingeben.',
        kurz: 'Die Nachricht ist sehr kurz — bitte mindestens 10 Zeichen.'
      }) && ok;
      if (!ok) {
        $('#form-status').textContent = '';
        var erstes = $('[aria-invalid="true"]', form);
        if (erstes) erstes.focus();
        return;
      }
      var name = $('#f-name').value.trim();
      var betreff = $('#f-betreff').value.trim();
      var text = $('#f-nachricht').value.trim();
      var body = text + '\n\n--\n' + name;
      $('#form-status').textContent = 'Mailprogramm wird geöffnet …';
      window.location.href = 'mailto:' + adresse
        + '?subject=' + encodeURIComponent(k.betreffPrefix + betreff)
        + '&body=' + encodeURIComponent(body);
    });

    $$('input, textarea', form).forEach(function (el) {
      el.addEventListener('input', function () {
        if (el.getAttribute('aria-invalid') === 'true') {
          el.setAttribute('aria-invalid', 'false');
          $('#' + el.getAttribute('aria-describedby')).textContent = '';
        }
      });
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

  /* -- FAQ ----------------------------------------------------------------- */

  function renderFaq() {
    var f = C.faq;
    return '<section class="block">'
      + '<div class="wrap faq-layout">'
      +   '<div class="faq-liste">'
      +     f.fragen.map(function (q, i) {
            return '<details class="faq" name="faq"' + (i === 0 ? ' open' : '') + ' data-auftritt>'
              + '<summary><span class="nr">' + zweistellig(i + 1) + '</span>'
              +   '<span class="frage-text">' + esc(q.frage) + '</span>'
              +   '<span class="faq-icon" aria-hidden="true"></span></summary>'
              + '<div class="faq-antwort"><p>' + tx(q.antwort) + '</p></div>'
              + '</details>';
          }).join('')
      +   '</div>'
      +   '<aside class="faq-aside card" data-auftritt>'
      +     '<p class="label">Nicht dabei?</p>'
      +     '<p>Alle anderen Fragen beantwortet das Team gerne direkt.</p>'
      +     '<a class="btn btn-secondary" href="' + esc(dateiFuer('kontakt')) + '">Zum Kontakt' + PFEIL + '</a>'
      +   '</aside>'
      + '</div>'
      + '</section>';
  }

  /* -- Rechtliche Seiten (Impressum, Datenschutz) -------------------------- */

  function renderRechtliches() {
    var r = C[SEITE];
    return '<section class="block">'
      + '<div class="wrap rechtliches">'
      +   r.abschnitte.map(function (ab, i) {
            return '<section class="rechts-abschnitt" aria-labelledby="r-' + i + '">'
              + '<h2 id="r-' + i + '">' + esc(ab.titel) + '</h2>'
              + '<div class="prose">'
              +   ab.absaetze.map(function (p) { return '<p>' + txbr(p) + '</p>'; }).join('')
              + '</div>'
              + '</section>';
          }).join('')
      +   '<p class="rechts-stand">Stand: ' + esc(r.stand || datumDE(HEUTE)) + '</p>'
      + '</div>'
      + '</section>';
  }

  /* -- Fehlerseite (404) --------------------------------------------------- */

  function renderFehler() {
    var f = C.fehlerseite;
    return '<section class="block">'
      + '<div class="wrap">'
      +   '<div class="prose prose-lg" style="margin-bottom:var(--sp-6)"><p>' + esc(f.text) + '</p></div>'
      +   '<div class="index-grid">'
      +     hauptseiten().map(function (s, i) {
            return '<a class="tile" href="' + esc(s.datei) + '" data-auftritt>'
              + '<span class="nr">' + (s.id === 'index' ? 'Start' : zweistellig(i)) + '</span>'
              + '<h3>' + esc(s.nav) + '</h3>'
              + (s.kurz ? '<p>' + tx(s.kurz) + '</p>' : '<p>Übersicht und Projektstatus.</p>')
              + '<span class="pfeil">' + PFEIL + '</span>'
              + '</a>';
          }).join('')
      +   '</div>'
      + '</div>'
      + '</section>';
  }

  /* -- Blättern und Footer ------------------------------------------------- */

  function renderSeitenwechsel() {
    var alle = hauptseiten();
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
    var m = C.meta;
    var dok = f.dokumente || [];
    var extern = ' rel="noopener" target="_blank"';
    var analytikAktiv = !!(m.analytik && m.analytik.skript);

    var schulzeile = esc(f.schule) + (f.klasseAnzeigen ? ' · ' + esc(f.klasse) : '');

    $('#site-footer').innerHTML =
      '<div class="wrap">'
      + '<div class="footer-grid">'
      +   '<div class="footer-schule-block">'
      +     (m.schulWebsite
            ? '<a class="footer-logo" href="' + esc(m.schulWebsite) + '"' + extern
              + ' aria-label="' + esc(f.schule) + ' — Website der Schule (öffnet in neuem Tab)">'
            : '<span class="footer-logo">')
      +       '<img src="' + esc(m.logoMitSlogan || m.logo) + '" alt="' + esc(m.logoAlt) + '" '
      +         'width="152" height="78" loading="lazy" decoding="async">'
      +     (m.schulWebsite ? '</a>' : '</span>')
      +     '<p class="footer-schule">' + schulzeile + '</p>'
      +     '<p>' + esc(f.abteilung) + '</p>'
      +     (f.anschrift ? '<p>' + tx(f.anschrift) + '</p>' : '')
      +     '<p>Maturajahrgang ' + esc(f.maturajahrgang) + '</p>'
      +   '</div>'
      +   '<div>'
      +     '<h2>Dokumente</h2>'
      +     '<ul class="footer-links">'
      +       hauptseiten().map(function (s) {
                return '<li><a href="' + esc(s.datei) + '"'
                  + (s.id === SEITE ? ' aria-current="page"' : '') + '>' + esc(s.nav) + '</a></li>';
              }).join('')
      +     '</ul>'
      +   '</div>'
      +   '<div>'
      +     '<h2>Rechtliches</h2>'
      +     '<ul class="footer-links">'
      +       footerseiten().map(function (s) {
                return '<li><a href="' + esc(s.datei) + '"'
                  + (s.id === SEITE ? ' aria-current="page"' : '') + '>' + esc(s.nav) + '</a></li>';
              }).join('')
      +       (f.quelltext ? '<li><a href="' + esc(f.quelltext) + '"' + extern
                + '>Quelltext auf GitHub</a></li>' : '')
      +       dok.map(function (d) {
                return '<li><a href="' + esc(d.datei) + '" download>' + esc(d.titel)
                  + '</a>' + (d.groesse ? ' <span class="mono">' + esc(d.groesse)
                  + '</span>' : '') + '</li>';
              }).join('')
      +     '</ul>'
      +   '</div>'
      +   '<div class="footer-hinweis-block">'
      +     '<h2>Hinweis</h2>'
      +     '<p>' + esc(f.hinweis) + '</p>'
      +     '<p>' + esc(f.generalisierungshinweis) + '</p>'
      +   '</div>'
      + '</div>'
      + '<p class="footer-meta">'
      +   '<span>' + WEAVE + esc(C.hero.projektname) + ' · ' + HEUTE.getFullYear() + '</span>'
      +   '<span>' + (analytikAktiv
            ? 'Cookiefreie Besucherstatistik aktiv — Details in der Datenschutzerklärung.'
            : 'Diese Seite lädt keine externen Ressourcen und setzt keine Cookies.') + '</span>'
      + '</p>'
      + '</div>';
  }

  /* -- Strukturierte Daten und optionale Statistik ------------------------- */

  function absoluteUrl(datei) {
    var basis = C.meta.url.replace(/\/?$/, '/');
    return basis + String(datei).replace(/^\.\//, '').replace(/^index\.html$/, '');
  }

  function injectJsonLd() {
    var eintrag = eintragFuer(SEITE);
    var titel = document.title;
    var beschreibung = ($('meta[name="description"]') || {}).content || C.meta.beschreibung;
    var graph = [
      {
        '@type': 'WebSite', '@id': absoluteUrl('index.html') + '#website',
        url: absoluteUrl('index.html'), name: C.hero.projektname,
        description: C.meta.beschreibung, inLanguage: 'de-AT',
        publisher: { '@id': absoluteUrl('index.html') + '#org' }
      },
      {
        '@type': 'EducationalOrganization', '@id': absoluteUrl('index.html') + '#org',
        name: C.footer.schule, url: C.meta.schulWebsite || undefined,
        logo: absoluteUrl(C.meta.logoMitSlogan || C.meta.logo)
      },
      {
        '@type': 'WebPage', url: absoluteUrl(eintrag.datei || 'index.html'),
        name: titel, description: beschreibung, inLanguage: 'de-AT',
        isPartOf: { '@id': absoluteUrl('index.html') + '#website' },
        about: { '@type': 'Thesis', name: C.hero.antragstitel,
                 inSupportOf: 'Reife- und Diplomprüfung',
                 sourceOrganization: { '@id': absoluteUrl('index.html') + '#org' } }
      }
    ];
    if (SEITE !== 'index' && eintrag.datei) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Übersicht', item: absoluteUrl('index.html') },
          { '@type': 'ListItem', position: 2, name: eintrag.nav, item: absoluteUrl(eintrag.datei) }
        ]
      });
    }
    if (SEITE === 'faq') {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: C.faq.fragen.map(function (q) {
          return { '@type': 'Question', name: q.frage,
                   acceptedAnswer: { '@type': 'Answer', text: t(q.antwort) } };
        })
      });
    }
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(s);
  }

  function injectAnalytik() {
    var a = C.meta.analytik;
    if (!a || !a.skript) return;
    var s = document.createElement('script');
    s.defer = true;
    s.src = a.skript;
    if (a.websiteId) s.setAttribute('data-website-id', a.websiteId);
    document.head.appendChild(s);
  }

  /* -- Zusammenbau --------------------------------------------------------- */

  var SEITEN = {
    index:       { render: renderIndex,       init: initFabric },
    architektur: { render: renderArchitektur, init: initArchitektur },
    phasen:      { render: renderPhasen,      init: null },
    fortschritt: { render: renderFortschritt, init: null },
    ergebnisse:  { render: renderErgebnisse,  init: initErgebnisse },
    team:        { render: renderTeam,        init: null },
    kontakt:     { render: renderKontakt,     init: initKontakt },
    faq:         { render: renderFaq,         init: null },
    impressum:   { render: renderRechtliches, init: null },
    datenschutz: { render: renderRechtliches, init: null },
    fehler:      { render: renderFehler,      init: null }
  };

  var TITEL = {
    architektur: function () { return C.architektur.titel; },
    phasen:      function () { return C.phasen.titel; },
    fortschritt: function () { return C.fortschritt.titel; },
    ergebnisse:  function () { return C.ergebnisse.titel; },
    team:        function () { return C.team.titel; },
    kontakt:     function () { return C.kontakt.titel; },
    faq:         function () { return C.faq.titel; },
    impressum:   function () { return C.impressum.titel; },
    datenschutz: function () { return C.datenschutz.titel; },
    fehler:      function () { return C.fehlerseite.titel; }
  };

  function staffeln() {
    $$('[data-auftritt]').forEach(function (el, i) {
      el.style.setProperty('--i', Math.min(i, 12));
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
    var seite = SEITEN[SEITE] || SEITEN.fehler;
    var eintrag = eintragFuer(SEITE);

    renderHeader();

    var html = '';
    if (SEITE !== 'index') {
      var titel = TITEL[SEITE] ? TITEL[SEITE]() : eintrag.nav || '';
      var lead = eintrag.kurz;
      var opts = {};
      if (SEITE === 'impressum' || SEITE === 'datenschutz') lead = C[SEITE].einleitung;
      if (SEITE === 'fehler' || !SEITEN[SEITE]) { opts.kicker = 'Fehler 404'; lead = ''; }
      html += seitenkopf(titel, lead, opts);
    }
    html += seite.render();
    html += renderSeitenwechsel();
    $('#seiteninhalt').innerHTML = html;

    if (seite.init) seite.init();
    renderFooter();
    injectJsonLd();
    injectAnalytik();
    staffeln();
    initReveal();

    /* Timeline nach dem Layout messen und animieren. */
    if ($('#timeline')) {
      window.setTimeout(animiereTimeline, REDUCED ? 0 : 260);
      window.addEventListener('resize', animiereTimeline);
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
