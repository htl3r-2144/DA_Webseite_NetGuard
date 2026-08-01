/* =============================================================================
   NetGuard — Diagramm-Komponente
   -----------------------------------------------------------------------------
   Zeichnet gruppierte Balkendiagramme als reines SVG. Keine externe Bibliothek,
   kein Netzwerkzugriff.

   Die Daten kommen aus data/content.js -> ergebnisse.charts.
   Diese Datei muss dafür nicht angefasst werden.

   Barrierefreiheit: Jedes Diagramm hat <title> und <desc> und zusätzlich eine
   für Screenreader lesbare Tabelle mit denselben Werten.
   ========================================================================== */

window.NetGuardChart = (function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  /* Maße des Zeichenbereichs */
  var B = 640, H = 300;                       // viewBox
  var ML = 44, MR = 14, MT = 16, MB = 46;     // Ränder
  var PB = B - ML - MR;                       // Plotbreite
  var PH = H - MT - MB;                       // Plothöhe
  var BASIS = MT + PH;                        // y-Wert der Grundlinie

  function el(name, attrs, text) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) e.setAttribute(k, attrs[k]);
    }
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /**
   * Baut ein Diagramm.
   * @param {object} cfg  Konfiguration aus content.js
   * @param {boolean} leer  true = Platzhaltergerüst ohne Werte
   * @returns {HTMLElement}
   */
  function erstelle(cfg, leer) {
    var karte = document.createElement('figure');
    karte.className = 'chart-card';

    var kopf = document.createElement('h3');
    kopf.textContent = cfg.titel;
    karte.appendChild(kopf);

    var wrap = document.createElement('div');
    wrap.className = 'chart-wrap';
    karte.appendChild(wrap);

    var svg = el('svg', {
      viewBox: '0 0 ' + B + ' ' + H,
      role: 'img',
      'aria-labelledby': 'chart-t-' + cfg.id + ' chart-d-' + cfg.id
    });
    svg.appendChild(el('title', { id: 'chart-t-' + cfg.id }, cfg.titel));

    var max = (cfg.achse && cfg.achse.max) || 100;
    var schritt = (cfg.achse && cfg.achse.schritt) || 25;
    var serien = cfg.serien || [];
    var kats = cfg.kategorien || [];

    svg.appendChild(el('desc', { id: 'chart-d-' + cfg.id },
      leer
        ? 'Diagrammgerüst ohne Messwerte. Die Werte werden nach Abschluss von '
          + 'Phase 1 ergänzt.'
        : cfg.titel + ' in ' + (cfg.einheit || '') + ', '
          + serien.length + ' Serien über ' + kats.length + ' Kategorien.'
    ));

    /* Schraffurmuster für Platzhalterbalken — eigene ID je Diagramm */
    var musterId = 'schraffur-' + cfg.id;
    var defs = el('defs', {});
    var muster = el('pattern', {
      id: musterId, width: '6', height: '6',
      patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)'
    });
    muster.appendChild(el('rect', { width: '6', height: '6', fill: 'transparent' }));
    muster.appendChild(el('line', {
      x1: '0', y1: '0', x2: '0', y2: '6',
      stroke: 'var(--border-strong)', 'stroke-width': '1.5'
    }));
    defs.appendChild(muster);
    svg.appendChild(defs);

    /* Gitterlinien und Achsenbeschriftung */
    for (var v = 0; v <= max; v += schritt) {
      var y = BASIS - (v / max) * PH;
      svg.appendChild(el('line', {
        x1: ML, y1: y, x2: ML + PB, y2: y, class: 'chart-grid'
      }));
      svg.appendChild(el('text', {
        x: ML - 8, y: y + 3.5, 'text-anchor': 'end', class: 'chart-tick'
      }, String(v) + (cfg.einheit || '')));
    }

    /* Grundlinie */
    svg.appendChild(el('line', {
      x1: ML, y1: BASIS, x2: ML + PB, y2: BASIS, class: 'chart-axis'
    }));

    /* Balken */
    var gruppenBreite = PB / Math.max(kats.length, 1);
    var innen = gruppenBreite * 0.62;
    var balken = innen / Math.max(serien.length, 1);

    kats.forEach(function (kat, ki) {
      var gx = ML + ki * gruppenBreite + (gruppenBreite - innen) / 2;

      serien.forEach(function (serie, si) {
        var wert = kat.werte ? kat.werte[si] : null;
        var x = gx + si * balken;
        var w = balken - 4;

        if (wert === null || wert === undefined) {
          /* Platzhalter: fixe, niedrige Höhe, schraffiert — kein Wert impliziert */
          var ph = PH * 0.34;
          svg.appendChild(el('rect', {
            x: x, y: BASIS - ph, width: w, height: ph, rx: 2,
            fill: 'url(#' + musterId + ')',
            stroke: 'var(--border-strong)', 'stroke-width': '1'
          }));
        } else {
          var h = (Math.max(0, Math.min(wert, max)) / max) * PH;
          svg.appendChild(el('rect', {
            x: x, y: BASIS - h, width: w, height: h, rx: 2,
            class: 'chart-bar-' + (serie.ton === 'akzent' ? 'akzent' : 'neutral')
          }));
          svg.appendChild(el('text', {
            x: x + w / 2, y: BASIS - h - 6, 'text-anchor': 'middle', class: 'chart-wert'
          }, String(wert)));
        }
      });

      /* Kategoriebeschriftung, bei Bedarf auf zwei Zeilen */
      var label = el('text', {
        x: ML + ki * gruppenBreite + gruppenBreite / 2,
        y: BASIS + 20, 'text-anchor': 'middle', class: 'chart-cat'
      });
      var woerter = String(kat.label).split(' ');
      if (woerter.length > 1 && kat.label.length > 11) {
        label.appendChild(el('tspan', {
          x: ML + ki * gruppenBreite + gruppenBreite / 2, dy: '0'
        }, woerter[0]));
        label.appendChild(el('tspan', {
          x: ML + ki * gruppenBreite + gruppenBreite / 2, dy: '13'
        }, woerter.slice(1).join(' ')));
      } else {
        label.textContent = kat.label;
      }
      svg.appendChild(label);
    });

    wrap.appendChild(svg);

    /* Legende */
    var legende = document.createElement('ul');
    legende.className = 'chart-legende';
    legende.innerHTML = serien.map(function (s) {
      return '<li><span class="swatch '
        + (s.ton === 'akzent' ? 'akzent' : 'neutral')
        + '" aria-hidden="true"></span>' + esc(s.name) + '</li>';
    }).join('');
    karte.appendChild(legende);

    /* Datentabelle für Screenreader — identische Werte, ohne Grafik */
    var tabelle = document.createElement('table');
    tabelle.className = 'visually-hidden';
    var kopfZeile = '<tr><th scope="col">Szenario</th>'
      + serien.map(function (s) { return '<th scope="col">' + esc(s.name) + '</th>'; }).join('')
      + '</tr>';
    var zeilen = kats.map(function (kat) {
      return '<tr><th scope="row">' + esc(kat.label) + '</th>'
        + serien.map(function (s, si) {
            var w = kat.werte ? kat.werte[si] : null;
            return '<td>' + (w === null || w === undefined
              ? 'noch nicht gemessen'
              : esc(w) + ' ' + esc(cfg.einheit || '')) + '</td>';
          }).join('')
        + '</tr>';
    }).join('');
    tabelle.innerHTML = '<caption>' + esc(cfg.titel) + '</caption><thead>'
      + kopfZeile + '</thead><tbody>' + zeilen + '</tbody>';
    karte.appendChild(tabelle);

    return karte;
  }

  return { erstelle: erstelle };
})();
