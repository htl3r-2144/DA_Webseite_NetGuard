/* =============================================================================
   NetGuard — Hightech-Effekte (ohne Bibliothek)
   -----------------------------------------------------------------------------
   Läuft nach js/render.js. Alles ist reine Dekoration: Inhalte bleiben ohne
   dieses Skript vollständig lesbar. Bei prefers-reduced-motion passiert nichts
   außer dem Video-Band (das dann per CSS ausgeblendet ist).

   1  Entschlüsseln   Überschriften "decodieren" sich beim ersten Sichtbarwerden
   2  Zähler          Kennzahlen zählen von 0 hoch
   3  Lichtkegel      Kacheln/Karten leuchten unter dem Mauszeiger, kippen leicht
   4  Konsole         Zeilen der Statuskonsole erscheinen wie getippt
   5  Video-Band      Loop hinter der Forschungsfrage (assets/media/hero-loop.mp4)
   ========================================================================== */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FEIN = window.matchMedia('(pointer: fine)').matches;
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function sobaldSichtbar(el, fn, schwelle) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var o = new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting) return;
      o.disconnect(); fn();
    }, { threshold: schwelle || 0.4 });
    o.observe(el);
  }

  /* 1 -- Entschlüsseln ----------------------------------------------------- */
  var ZEICHEN = '01<>/\\[]{}#$%&*+=?ABCDEF';
  function entschluesseln(el) {
    if (el.children.length) return;            // nur reine Text-Überschriften
    var ziel = el.textContent;
    if (!ziel.trim() || ziel.length > 60) return;
    el.setAttribute('aria-label', ziel);
    el.classList.add('fx-scramble');
    var dauer = 22 + ziel.length, bild = 0;
    function schritt() {
      var fertig = Math.floor((bild / dauer) * ziel.length);
      var html = '';
      for (var i = 0; i < ziel.length; i++) {
        var c = ziel[i];
        if (i < fertig || c === ' ') html += c.replace(/&/g, '&amp;').replace(/</g, '&lt;');
        else html += '<span class="fx-z" aria-hidden="true">'
          + ZEICHEN[Math.floor(Math.random() * ZEICHEN.length)].replace(/&/g, '&amp;').replace(/</g, '&lt;')
          + '</span>';
      }
      el.innerHTML = html;
      if (++bild <= dauer) requestAnimationFrame(schritt);
      else { el.textContent = ziel; el.classList.remove('fx-scramble'); el.removeAttribute('aria-label'); }
    }
    schritt();
  }

  /* 2 -- Zähler ------------------------------------------------------------ */
  function zaehlen(el) {
    var text = el.textContent.trim();
    var m = text.match(/^(\D*)(\d+)(\D*)$/);
    if (!m) return;
    var ziel = parseInt(m[2], 10), t0 = null, dauer = 1100;
    function schritt(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dauer);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = m[1] + Math.round(ziel * e) + m[3];
      if (p < 1) requestAnimationFrame(schritt);
    }
    el.textContent = m[1] + '0' + m[3];
    requestAnimationFrame(schritt);
  }

  /* 3 -- Lichtkegel + Kippen ---------------------------------------------- */
  function lichtkegel(el) {
    el.classList.add('fx-glow');
    if (FEIN) el.classList.add('fx-tilt');
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      if (FEIN) {
        el.style.setProperty('--ry', ((x - 0.5) * 5).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((0.5 - y) * 5).toFixed(2) + 'deg');
      }
    });
    el.addEventListener('pointerleave', function () {
      el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
    });
  }

  /* 4 -- Konsole tippt ----------------------------------------------------- */
  function konsoleTippen(k) {
    var zeilen = k.querySelectorAll('.k-line');
    if (!zeilen.length) return;
    k.classList.add('fx-tippen');
    Array.prototype.forEach.call(zeilen, function (z, i) {
      setTimeout(function () { z.classList.add('is-da'); }, 450 + i * 230);
    });
  }

  /* 5 -- Video-Band -------------------------------------------------------- */
  function videoBand() {
    var band = document.querySelector('.frage-band');
    if (!band || REDUCED) return;
    if (navigator.connection && navigator.connection.saveData) return;
    var v = document.createElement('video');
    v.className = 'frage-video';
    v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
    v.setAttribute('aria-hidden', 'true');
    v.preload = 'none';
    v.addEventListener('error', function () { v.remove(); }, true);
    var s = document.createElement('source');
    s.src = './assets/media/hero-loop.mp4'; s.type = 'video/mp4';
    s.addEventListener('error', function () { v.remove(); });
    v.appendChild(s);
    band.insertBefore(v, band.firstChild);
    sobaldSichtbar(band, function () { v.load(); var p = v.play(); if (p && p.catch) p.catch(function () {}); }, 0.1);
  }

  function start() {
    // Höhe des Heros für die Scan-Linie
    var hero = document.querySelector('.hero');
    if (hero) hero.style.setProperty('--scan-h', hero.offsetHeight + 'px');

    videoBand();
    if (REDUCED) return;

    $$('.page-head h1, .rubrik h2, .split-head h2, .labor-titel').forEach(function (h) {
      sobaldSichtbar(h, function () { entschluesseln(h); }, 0.6);
    });
    $$('.kennzahlen .wert').forEach(function (w) {
      sobaldSichtbar(w, function () { zaehlen(w); }, 0.8);
    });
    $$('.tile, .card').forEach(lichtkegel);
    var k = document.querySelector('.hero .konsole');
    if (k) konsoleTippen(k);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
