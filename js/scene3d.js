/* =============================================================================
   NetGuard — 3D-Szenen (Three.js r160, lokal unter js/vendor/three.min.js)
   -----------------------------------------------------------------------------
   Zwei Szenen:
     NetGuard3D.hero(el)          Startseite: Gewebe in 3D + schwebende Geräte
     NetGuard3D.labor(el, opts)   Architektur: drehbarer Laboraufbau, anklickbar

   Die Geräte sind bewusst generisch (keine Hersteller-Logos). Ihre Frontblenden
   kommen aus assets/media/tex-*.webp (mit Higgsfield erzeugt). Fehlen die
   Dateien oder blockiert der Browser sie (Doppelklick, file://), zeichnet
   das Skript die Blenden selbst — die Seite funktioniert in jedem Fall.

   Farben werden zur Laufzeit aus den CSS-Variablen gelesen; es gibt hier
   keinen einzigen eigenen Farbwert außer reinem Schwarz/Weiß für Licht.
   Bei prefers-reduced-motion wird genau ein Standbild gerendert.
   ========================================================================== */
(function () {
  'use strict';

  var THREE = window.THREE;
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FILE = location.protocol === 'file:';

  function webglOk() {
    if (!THREE) return false;
    try {
      var c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
    } catch (e) { return false; }
  }

  /* -- Farben aus dem Design-System --------------------------------------- */
  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }
  function farben() {
    return {
      bg:      new THREE.Color(cssVar('--bg', '#F2F4F6')),
      card:    new THREE.Color(cssVar('--card', '#FFFFFF')),
      fg:      new THREE.Color(cssVar('--fg', '#0F1720')),
      fg3:     new THREE.Color(cssVar('--fg-3', '#5C6773')),
      border:  new THREE.Color(cssVar('--border-strong', '#BAC3CC')),
      accent:  new THREE.Color(cssVar('--accent', '#BF2117')),
      lauf:    new THREE.Color(cssVar('--status-lauf', '#1759B5')),
      fertig:  new THREE.Color(cssVar('--status-fertig', '#157A44')),
      konsole: new THREE.Color(cssVar('--konsole-bg', '#0F1720')),
      accentHex: cssVar('--accent', '#BF2117'),
      fgHex:     cssVar('--fg', '#0F1720'),
      fg3Hex:    cssVar('--fg-3', '#5C6773'),
      laufHex:   cssVar('--status-lauf', '#1759B5'),
      fertigHex: cssVar('--status-fertig', '#157A44'),
      konsoleHex: cssVar('--konsole-bg', '#0F1720'),
      konsoleFg: cssVar('--konsole-fg', '#D7DEE5'),
      monoFont:  cssVar('--font-mono', 'monospace')
    };
  }

  /* -- Texturen: KI-Bild, sonst selbst gezeichnet ------------------------- */
  function canvasTex(w, h, zeichne) {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    zeichne(c.getContext('2d'), w, h);
    var t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }

  function metallGrund(g, w, h, F) {
    var grad = g.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#2a323b'); grad.addColorStop(0.5, F.konsoleHex); grad.addColorStop(1, '#1b232c');
    g.fillStyle = grad; g.fillRect(0, 0, w, h);
    g.globalAlpha = 0.06; g.fillStyle = '#fff';
    for (var i = 0; i < h; i += 3) g.fillRect(0, i, w, 1);   // gebürstet
    g.globalAlpha = 1;
  }

  function texServer(F) {
    return canvasTex(1024, 180, function (g, w, h) {
      metallGrund(g, w, h, F);
      g.fillStyle = '#0a0f14'; g.fillRect(0, 0, 46, h); g.fillRect(w - 46, 0, 46, h);  // Rack-Ohren
      g.fillStyle = '#39424c';
      [40, h - 40].forEach(function (y) { g.beginPath(); g.arc(23, y, 7, 0, 7); g.arc(w - 23, y, 7, 0, 7); g.fill(); });
      // Lüftungswabe links
      g.strokeStyle = 'rgba(255,255,255,0.10)'; g.lineWidth = 1;
      for (var y = 24; y < h - 20; y += 12) for (var x = 70; x < 250; x += 14) {
        g.beginPath(); g.arc(x + ((y / 12) % 2) * 7, y, 4, 0, 7); g.stroke();
      }
      // 8 Laufwerksschächte
      for (var i = 0; i < 8; i++) {
        var bx = 280 + i * 82;
        g.fillStyle = '#141b22'; g.fillRect(bx, 26, 74, h - 52);
        g.strokeStyle = 'rgba(255,255,255,0.12)'; g.strokeRect(bx + 0.5, 26.5, 73, h - 53);
        g.fillStyle = i % 3 === 0 ? F.laufHex : F.fertigHex;
        g.fillRect(bx + 8, h - 44, 10, 5);
      }
      g.fillStyle = F.accentHex; g.fillRect(70, h - 14, w - 140, 3);          // Akzentlinie
    });
  }

  function texFirewall(F) {
    return canvasTex(1024, 128, function (g, w, h) {
      metallGrund(g, w, h, F);
      g.fillStyle = F.accentHex; g.fillRect(0, 0, 90, h);                     // roter Streifen
      g.fillStyle = 'rgba(255,255,255,0.85)';
      g.fillRect(28, 44, 34, 40); g.fillStyle = F.accentHex; g.fillRect(34, 50, 22, 28);
      // 16 RJ45-Ports in zwei Reihen
      for (var i = 0; i < 16; i++) {
        var col = i % 8, row = Math.floor(i / 8);
        var px = 150 + col * 74, py = 18 + row * 52;
        g.fillStyle = '#05080b'; g.fillRect(px, py, 56, 40);
        g.fillStyle = '#1d252e'; g.fillRect(px + 14, py + 30, 28, 10);
        g.fillStyle = (i * 7) % 5 ? F.fertigHex : '#d29a1e';
        g.fillRect(px + 4, py + 3, 8, 4);
      }
      // 2 SFP + Konsole
      for (var s = 0; s < 2; s++) { g.fillStyle = '#05080b'; g.fillRect(760 + s * 70, 30, 58, 64); }
      g.fillStyle = '#05080b'; g.fillRect(920, 44, 60, 36);
    });
  }

  /* Bildschirm des Angreifer-Laptops: animiertes Terminal (keine echten Wörter). */
  function terminalTex(F) {
    var c = document.createElement('canvas');
    c.width = 512; c.height = 320;
    var g = c.getContext('2d');
    var t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    var zeilen = [], tick = 0;
    var GLYPH = '01<>/{}[]#$%&=+*:;ABCDEF0123456789';
    function zufallsZeile() {
      var n = 8 + Math.floor(Math.random() * 30), s = '';
      for (var i = 0; i < n; i++) s += Math.random() < 0.18 ? ' ' : GLYPH[Math.floor(Math.random() * GLYPH.length)];
      return { s: s, rot: Math.random() < 0.18 };
    }
    for (var i = 0; i < 16; i++) zeilen.push(zufallsZeile());
    function zeichne() {
      g.fillStyle = '#05080b'; g.fillRect(0, 0, 512, 320);
      g.strokeStyle = 'rgba(255,255,255,0.12)'; g.strokeRect(10.5, 10.5, 491, 299);
      g.font = '15px ' + F.monoFont;
      zeilen.forEach(function (z, i) {
        g.fillStyle = z.rot ? F.accentHex : '#3fbf7a';
        g.globalAlpha = 0.45 + 0.55 * (i / zeilen.length);
        g.fillText(z.s, 22, 34 + i * 17.5);
      });
      g.globalAlpha = 1;
      g.fillStyle = 'rgba(255,255,255,0.04)';
      for (var y = 0; y < 320; y += 4) g.fillRect(0, y, 512, 1);   // Scanlines
      t.needsUpdate = true;
    }
    zeichne();
    t.userData.update = function () {
      if (++tick % 6) return;
      zeilen.shift(); zeilen.push(zufallsZeile()); zeichne();
    };
    return t;
  }

  /* KI-Textur nachladen und bei Erfolg austauschen (nicht bei file://). */
  function ersetzeTextur(material, url) {
    if (FILE) return;
    new THREE.TextureLoader().load(url, function (tex) {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      var alt = material.map;
      material.map = tex; material.needsUpdate = true;
      if (alt) alt.dispose();
    }, undefined, function () { /* Datei fehlt: selbst gezeichnete Blende bleibt */ });
  }

  /* -- Geräte-Modelle ------------------------------------------------------ */
  function gehaeuseMaterial(F) {
    return new THREE.MeshStandardMaterial({ color: F.konsole, metalness: 0.55, roughness: 0.42 });
  }

  /** Quader mit eigener Frontblende (Seite +z). Maße in "Höheneinheiten". */
  function geraet(F, breite, hoehe, tiefe, frontTex, texUrl) {
    var korpus = gehaeuseMaterial(F);
    var front = new THREE.MeshStandardMaterial({ map: frontTex, metalness: 0.35, roughness: 0.5 });
    if (texUrl) ersetzeTextur(front, texUrl);
    var mats = [korpus, korpus, korpus, korpus, front, korpus];
    var m = new THREE.Mesh(new THREE.BoxGeometry(breite, hoehe, tiefe), mats);
    // Kante: feine Haarlinie wie im 2D-Design
    var kante = new THREE.LineSegments(
      new THREE.EdgesGeometry(m.geometry),
      new THREE.LineBasicMaterial({ color: F.border, transparent: true, opacity: 0.55 })
    );
    m.add(kante);
    m.userData.front = front;
    return m;
  }

  function server(F)   { return geraet(F, 4.4, 0.78, 2.6, texServer(F),   './assets/media/tex-server.webp'); }
  function firewall(F) { return geraet(F, 4.4, 0.42, 1.8, texFirewall(F), './assets/media/tex-firewall.webp'); }

  function laptop(F) {
    var grp = new THREE.Group();
    var korpus = gehaeuseMaterial(F);
    var basis = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 1.5), korpus);
    grp.add(basis);
    var tex = terminalTex(F);
    var screenMat = new THREE.MeshBasicMaterial({ map: tex });
    var deckel = new THREE.Group();
    var rueck = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 0.06), korpus);
    rueck.position.y = 0.7;
    var bild = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.22), screenMat);
    bild.position.set(0, 0.7, 0.035);
    deckel.add(rueck, bild);
    deckel.position.set(0, 0.04, -0.72);
    deckel.rotation.x = -0.32;
    grp.add(deckel);
    // Tastatur-Andeutung
    var tasten = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.7),
      new THREE.MeshBasicMaterial({ color: 0x05080b }));
    tasten.rotation.x = -Math.PI / 2; tasten.position.set(0, 0.041, -0.08);
    grp.add(tasten);
    grp.userData.screen = tex;
    return grp;
  }

  /* Virtuelle Maschine: halbtransparenter Block mit leuchtender Kante. */
  function vmBlock(F, farbe) {
    var grp = new THREE.Group();
    var box = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.5, 0.9),
      new THREE.MeshStandardMaterial({ color: F.card, transparent: true, opacity: 0.55,
        metalness: 0.1, roughness: 0.3, emissive: farbe, emissiveIntensity: 0.06 }));
    var kante = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry),
      new THREE.LineBasicMaterial({ color: farbe, transparent: true, opacity: 0.9 }));
    grp.add(box, kante);
    grp.userData.box = box; grp.userData.kante = kante;
    return grp;
  }

  /* Beschriftung als Sprite (Mono-Schrift wie die Seite). */
  function label(F, text, sub) {
    var c = document.createElement('canvas');
    var g = c.getContext('2d');
    c.width = 512; c.height = sub ? 150 : 96;
    g.fillStyle = 'rgba(255,255,255,0.92)';
    g.strokeStyle = F.border.getStyle();
    g.lineWidth = 3;
    var r = 18, w = c.width - 6, h = c.height - 6;
    g.beginPath(); g.roundRect(3, 3, w, h, r); g.fill(); g.stroke();
    g.fillStyle = F.accentHex; g.fillRect(3, 18, 6, h - 30);
    g.fillStyle = F.fgHex; g.font = '600 44px ' + F.monoFont; g.textBaseline = 'middle';
    g.fillText(text, 30, sub ? 52 : c.height / 2);
    if (sub) { g.fillStyle = F.fg3Hex; g.font = '26px ' + F.monoFont; g.fillText(sub, 30, 108); }
    var tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
    s.scale.set(c.width / 240, c.height / 240, 1);
    s.renderOrder = 10;
    return s;
  }

  /* -- Datenpakete auf einer Strecke -------------------------------------- */
  function strecke(F, punkte, farbe, opts) {
    opts = opts || {};
    var kurve = new THREE.CatmullRomCurve3(punkte, false, 'catmullrom', 0.1);
    var linie = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(kurve.getPoints(60)),
      new THREE.LineBasicMaterial({ color: farbe, transparent: true, opacity: opts.opacity || 0.45 })
    );
    var pakete = [];
    var geo = new THREE.SphereGeometry(opts.groesse || 0.06, 10, 8);
    var mat = new THREE.MeshBasicMaterial({ color: farbe });
    for (var i = 0; i < (opts.anzahl || 3); i++) {
      var p = new THREE.Mesh(geo, mat);
      p.userData.t = i / (opts.anzahl || 3);
      pakete.push(p);
    }
    return {
      linie: linie, pakete: pakete, kurve: kurve, tempo: opts.tempo || 0.12,
      bis: opts.bis || 1,
      update: function (dt) {
        var self = this;
        pakete.forEach(function (p) {
          p.userData.t = (p.userData.t + dt * self.tempo) % 1;
          var t = p.userData.t * self.bis;
          p.position.copy(kurve.getPointAt(t));
          var rand = Math.min(p.userData.t, 1 - p.userData.t) * 8;
          p.scale.setScalar(Math.min(1, rand) + 0.001);
        });
      }
    };
  }

  /* -- Gemeinsames Render-Gerüst ------------------------------------------ */
  function buehne(el, opts) {
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(opts.fov || 35, 1, 0.1, 200);

    // Licht: weiche Grundhelle + Studio-Licht von oben links + roter Kantenschein
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8a96a3, 1.6));
    var key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(-6, 10, 8); scene.add(key);
    var rim = new THREE.PointLight(opts.F.accent, 18, 30, 1.6);
    rim.position.set(6, 2, -4); scene.add(rim);

    var sichtbar = true, laeuft = false, uhr = new THREE.Clock(), schritte = [];
    function groesse() {
      var w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (opts.onResize) opts.onResize(w, h);
      if (REDUCED || !laeuft) renderer.render(scene, camera);
    }
    function frame() {
      if (!laeuft) return;
      var dt = Math.min(uhr.getDelta(), 0.05);
      schritte.forEach(function (f) { f(dt, uhr.elapsedTime); });
      renderer.render(scene, camera);
      requestAnimationFrame(frame);
    }
    function start() {
      if (laeuft || REDUCED || !sichtbar || document.hidden) return;
      laeuft = true; uhr.getDelta(); requestAnimationFrame(frame);
    }
    function stop() { laeuft = false; }

    new ResizeObserver(groesse).observe(el);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        sichtbar = e[0].isIntersecting;
        sichtbar ? start() : stop();
      }, { rootMargin: '80px' }).observe(el);
    }
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

    return {
      renderer: renderer, scene: scene, camera: camera,
      jedesBild: function (f) { schritte.push(f); },
      start: function () {
        groesse();
        if (REDUCED) { schritte.forEach(function (f) { f(0, 0); }); renderer.render(scene, camera); }
        else start();
        el.classList.add('is-3d');
      },
      einmal: function () { renderer.render(scene, camera); }
    };
  }

  /* ======================================================================
     HERO — Gewebe in 3D, darüber die drei Geräte der Spielwiese
     ====================================================================== */
  function hero(el, stageEl) {
    if (!webglOk()) return false;
    var F = farben();
    var B = buehne(el, { F: F, fov: 32 });
    var scene = B.scene, camera = B.camera;
    scene.fog = new THREE.Fog(F.bg, 18, 42);

    /* Gewebe: Kett- und Schussfäden als welliges Netz. */
    var N = 26, S = 1.6, halb = (N - 1) * S / 2;
    var pos = [], knotenPos = [];
    var gewebe = new THREE.Group();
    gewebe.rotation.x = -Math.PI / 2.35;
    gewebe.position.set(0, -3.2, -6);
    scene.add(gewebe);

    var fadenGeo = new THREE.BufferGeometry();
    for (var i = 0; i < N; i++) {
      for (var j = 0; j < N - 1; j++) {
        pos.push(-halb + i * S, -halb + j * S, 0, -halb + i * S, -halb + (j + 1) * S, 0);
        pos.push(-halb + j * S, -halb + i * S, 0, -halb + (j + 1) * S, -halb + i * S, 0);
      }
    }
    fadenGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    var basis = Float32Array.from(pos);
    var faeden = new THREE.LineSegments(fadenGeo,
      new THREE.LineBasicMaterial({ color: F.fg, transparent: true, opacity: 0.13 }));
    gewebe.add(faeden);

    for (i = 0; i < N; i++) for (j = 0; j < N; j++) {
      if ((i + j) % 2) continue;
      knotenPos.push(-halb + i * S, -halb + j * S, 0);
    }
    var knotenGeo = new THREE.BufferGeometry();
    knotenGeo.setAttribute('position', new THREE.Float32BufferAttribute(knotenPos, 3));
    var knotenBasis = Float32Array.from(knotenPos);
    var knoten = new THREE.Points(knotenGeo,
      new THREE.PointsMaterial({ color: F.fg, size: 0.09, transparent: true, opacity: 0.35 }));
    gewebe.add(knoten);

    function welle(x, y, t) {
      return Math.sin(x * 0.32 + t * 0.6) * 0.35 + Math.cos(y * 0.27 + t * 0.45) * 0.35;
    }

    /* Pakete auf dem Gewebe: rote Punkte, die Fäden entlanglaufen. */
    var paketMat = new THREE.MeshBasicMaterial({ color: F.accent });
    var paketGeo = new THREE.SphereGeometry(0.075, 10, 8);
    var gewebePakete = [];
    for (i = 0; i < 14; i++) {
      var p = new THREE.Mesh(paketGeo, paketMat);
      p.userData = { achse: i % 2, linie: Math.floor(Math.random() * N), t: Math.random(), v: 0.03 + Math.random() * 0.05 };
      gewebe.add(p);
      gewebePakete.push(p);
    }

    /* Ereignis-Ringe: Knoten leuchten kurz rot auf. */
    var ringe = [];
    for (i = 0; i < 6; i++) {
      var ring = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.17, 32),
        new THREE.MeshBasicMaterial({ color: F.accent, transparent: true, opacity: 0, side: THREE.DoubleSide }));
      ring.userData.phase = Math.random() * 6;
      gewebe.add(ring);
      ringe.push(ring);
    }

    /* Geräte: Firewall in der Mitte, Server rechts hinten, Laptop links. */
    var geraete = new THREE.Group();
    scene.add(geraete);
    var inhalt = new THREE.Group();     // Inhalt mittig in der Gruppe
    inhalt.position.x = -0.85;
    geraete.add(inhalt);
    var fw = firewall(F);  fw.position.set(0, 0.2, 0);
    var sv = server(F);    sv.position.set(2.6, 1.55, -2.2);
    var lt = laptop(F);    lt.position.set(-3.1, -0.9, 0.6); lt.rotation.y = 0.55;
    inhalt.add(fw, sv, lt);

    var angriff = strecke(F, [
      new THREE.Vector3(-2.7, -0.3, 0.5), new THREE.Vector3(-1.9, 0.4, 0.6), new THREE.Vector3(-1.2, 0.25, 0.7)
    ], F.accent, { anzahl: 4, tempo: 0.35, opacity: 0.5 });
    var fabric = strecke(F, [
      new THREE.Vector3(1.2, 0.45, -0.4), new THREE.Vector3(2.0, 1.0, -1.2), new THREE.Vector3(2.2, 1.3, -1.9)
    ], F.lauf, { anzahl: 3, tempo: 0.22, opacity: 0.45 });
    inhalt.add(angriff.linie, fabric.linie);
    angriff.pakete.concat(fabric.pakete).forEach(function (pk) { inhalt.add(pk); });

    /* Schutzschild-Puls an der Firewall, wenn ein Angriffspaket ankommt. */
    var schild = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9),
      new THREE.MeshBasicMaterial({ color: F.accent, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }));
    schild.position.set(-1.25, 0.25, 0.72);
    schild.rotation.y = Math.PI / 2;
    inhalt.add(schild);

    camera.position.set(0, 1.4, 13);
    camera.lookAt(0, 0, 0);

    /* Geräte-Gruppe auf die Bühne (rechte Spalte) projizieren. */
    var ray = new THREE.Vector3();
    function platzieren() {
      if (!stageEl) return;
      var r = el.getBoundingClientRect(), s = stageEl.getBoundingClientRect();
      if (!r.width || !s.width) return;
      var nx = ((s.left + s.width / 2 - r.left) / r.width) * 2 - 1;
      var ny = -(((s.top + s.height / 2 - r.top) / r.height) * 2 - 1);
      ray.set(nx, ny, 0.5).unproject(camera).sub(camera.position).normalize();
      var dist = 13;
      geraete.position.copy(camera.position).add(ray.multiplyScalar(dist));
      // Breite der Bühne in Welt-Einheiten bei dieser Entfernung
      var hoeheWelt = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * dist;
      var breiteWelt = hoeheWelt * camera.aspect * (s.width / r.width);
      geraete.scale.setScalar(Math.min(breiteWelt / 8.4, (hoeheWelt * s.height / r.height) / 4.8));
    }
    B.renderer.domElement.addEventListener('webglcontextlost', function (e) { e.preventDefault(); });

    /* Maus-Parallaxe (sanft). */
    var ziel = { x: 0, y: 0 }, ist = { x: 0, y: 0 };
    window.addEventListener('pointermove', function (e) {
      ziel.x = (e.clientX / window.innerWidth) * 2 - 1;
      ziel.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    var fadenArr = fadenGeo.attributes.position.array;
    var knotenArr = knotenGeo.attributes.position.array;
    var schildZeit = 0;

    B.jedesBild(function (dt, t) {
      // Gewebe wellen
      for (var k = 0; k < fadenArr.length; k += 3) fadenArr[k + 2] = welle(basis[k], basis[k + 1], t);
      fadenGeo.attributes.position.needsUpdate = true;
      for (k = 0; k < knotenArr.length; k += 3) knotenArr[k + 2] = welle(knotenBasis[k], knotenBasis[k + 1], t);
      knotenGeo.attributes.position.needsUpdate = true;

      gewebePakete.forEach(function (p) {
        var u = p.userData;
        u.t += dt * u.v;
        if (u.t > 1) { u.t = 0; u.linie = Math.floor(Math.random() * N); u.achse = 1 - u.achse; }
        var a = -halb + u.linie * S, b = -halb + u.t * (N - 1) * S;
        var x = u.achse ? b : a, y = u.achse ? a : b;
        p.position.set(x, y, welle(x, y, t) + 0.04);
      });
      ringe.forEach(function (r, i) {
        var zyk = ((t + r.userData.phase) % 6) / 6;
        if (zyk < 0.01 || !r.userData.gesetzt) {
          var idx = Math.floor(Math.random() * (knotenBasis.length / 3)) * 3;
          r.position.set(knotenBasis[idx], knotenBasis[idx + 1], 0);
          r.userData.gesetzt = true;
        }
        r.position.z = welle(r.position.x, r.position.y, t) + 0.02;
        r.scale.setScalar(1 + zyk * 6);
        r.material.opacity = zyk < 0.3 ? 0.85 * (1 - zyk / 0.3) : 0;
      });

      // Geräte schweben
      fw.position.y = 0.2 + Math.sin(t * 0.9) * 0.06;
      sv.position.y = 1.55 + Math.sin(t * 0.7 + 1) * 0.08;
      lt.position.y = -0.9 + Math.sin(t * 0.8 + 2) * 0.07;
      lt.userData.screen.userData.update();

      angriff.update(dt); fabric.update(dt);
      angriff.pakete.forEach(function (pk) { if (pk.userData.t > 0.97) schildZeit = 1; });
      schildZeit = Math.max(0, schildZeit - dt * 2.2);
      schild.material.opacity = schildZeit * 0.35;
      schild.scale.setScalar(1 + (1 - schildZeit) * 0.4);

      // Parallaxe
      ist.x += (ziel.x - ist.x) * 0.04; ist.y += (ziel.y - ist.y) * 0.04;
      camera.position.x = ist.x * 0.9;
      camera.position.y = 1.4 - ist.y * 0.5;
      camera.lookAt(0, 0, 0);
      geraete.rotation.y = -0.62 + ist.x * 0.14;
      geraete.rotation.x = 0.3 + ist.y * 0.06;
      platzieren();
    });

    B.start();
    camera.lookAt(0, 0, 0);
    geraete.rotation.set(0.3, -0.62, 0);
    platzieren();
    if (REDUCED) B.einmal();
    return true;
  }

  /* ======================================================================
     LABOR — drehbarer Laboraufbau auf der Architekturseite
     ====================================================================== */
  function labor(el, opts) {
    if (!webglOk()) return false;
    opts = opts || {};
    var F = farben();
    var B = buehne(el, { F: F, fov: 30 });
    var scene = B.scene, camera = B.camera;

    var welt = new THREE.Group();
    scene.add(welt);

    /* Boden: feines Gewebe-Raster */
    var raster = new THREE.GridHelper(22, 22, F.border, F.border);
    raster.material.transparent = true; raster.material.opacity = 0.5;
    raster.position.y = -2.2;
    welt.add(raster);

    /* Rack (offener Rahmen) mit Firewall (1 HE) und Server (2 HE). */
    var rack = new THREE.Group();
    var schiene = new THREE.MeshStandardMaterial({ color: F.konsole, metalness: 0.6, roughness: 0.4 });
    [[-2.35, -1.05], [2.35, -1.05], [-2.35, 1.05], [2.35, 1.05]].forEach(function (p) {
      var s = new THREE.Mesh(new THREE.BoxGeometry(0.12, 4.4, 0.12), schiene);
      s.position.set(p[0], 0, p[1]); rack.add(s);
    });
    /* Ober- und Unterrahmen als dünne Streben statt voller Platten */
    [2.2, -2.2].forEach(function (y) {
      [-1.05, 1.05].forEach(function (z) {
        var q = new THREE.Mesh(new THREE.BoxGeometry(4.82, 0.08, 0.08), schiene);
        q.position.set(0, y, z); rack.add(q);
      });
      [-2.35, 2.35].forEach(function (x) {
        var q = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 2.22), schiene);
        q.position.set(x, y, 0); rack.add(q);
      });
    });
    var fw = firewall(F); fw.position.set(0, 0.95, 0); fw.scale.set(1, 1, 1.1);
    var sv = server(F);   sv.position.set(0, -0.2, 0); sv.scale.set(1, 1, 0.8);
    rack.add(fw, sv);
    welt.add(rack);

    /* VMs auf dem UCS-Server: Management, Logging, SIEM (schweben darüber). */
    var vmFarben = [F.lauf, F.fertig, F.accent];
    var vms = [];
    var komponenten = opts.komponenten || [];
    var vmIds = komponenten.slice(1, 4);
    vmIds.forEach(function (k, i) {
      var vm = vmBlock(F, vmFarben[i]);
      vm.position.set(4.6, 2.3 - i * 1.15, -0.4 + i * 0.25);
      vm.userData.id = k.id;
      welt.add(vm);
      vms.push(vm);
      var lb = label(F, k.name, 'VM · ' + k.rolle);
      lb.position.set(0, 0.62, 0);
      vm.add(lb);
      // Verbindung VM -> Server
      var verb = strecke(F, [
        new THREE.Vector3(4.0, 2.3 - i * 1.15, -0.4 + i * 0.25),
        new THREE.Vector3(3.0, 0.3 - i * 0.2, 0.2),
        new THREE.Vector3(2.25, -0.2, 0.4)
      ], vmFarben[i], { anzahl: 2, tempo: 0.18 + i * 0.04, opacity: 0.35, groesse: 0.05 });
      welt.add(verb.linie); verb.pakete.forEach(function (p) { welt.add(p); });
      vm.userData.verb = verb;
    });

    /* Quellen: Angreifer-Laptop (Kali) links, Unternehmensumgebung hinten. */
    var lt = laptop(F); lt.position.set(-5.4, -1.4, 1.4); lt.rotation.y = 0.75; lt.scale.setScalar(1.05);
    welt.add(lt);
    var umgebung = new THREE.Group();
    for (var c = 0; c < 4; c++) {
      var cl = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9 + (c % 2) * 0.5, 0.7),
        new THREE.MeshStandardMaterial({ color: F.card, metalness: 0.1, roughness: 0.6 }));
      cl.position.set(-4.6 + (c % 2) * 1.0, -1.75 + (0.45 + (c % 2) * 0.25), -3.2 - Math.floor(c / 2) * 1.0);
      var ck = new THREE.LineSegments(new THREE.EdgesGeometry(cl.geometry),
        new THREE.LineBasicMaterial({ color: F.lauf, transparent: true, opacity: 0.7 }));
      cl.add(ck);
      umgebung.add(cl);
    }
    welt.add(umgebung);

    var fwName = komponenten[0] ? komponenten[0].name : 'Firewall';
    var fwRolle = komponenten[0] ? komponenten[0].rolle : 'Firewall';
    var lbFw = label(F, fwName, fwRolle);
    lbFw.position.set(-2.4, 2.05, 1.5); welt.add(lbFw);
    var lbSv = label(F, 'Cisco UCS', 'Server · Hypervisor');
    lbSv.position.set(-2.4, -0.75, 1.5); welt.add(lbSv);
    var lbKali = label(F, 'Kali Linux', 'Angreifer-VM');
    lbKali.position.set(-6.3, 0.45, 2.1); welt.add(lbKali);
    var lbUmg = label(F, 'Spielwiese', 'AD · Clients · Fileserver');
    lbUmg.position.set(-4.7, 1.35, -4.5); welt.add(lbUmg);

    /* Grundrauschen: ruhige Pakete, solange kein Ablauf läuft. */
    var angriff = strecke(F, [
      new THREE.Vector3(-4.9, -0.9, 1.3), new THREE.Vector3(-3.4, 0.6, 1.2), new THREE.Vector3(-2.25, 0.95, 0.9)
    ], F.accent, { anzahl: 3, tempo: 0.3, opacity: 0.35 });
    var verkehr = strecke(F, [
      new THREE.Vector3(-3.9, -0.8, -2.8), new THREE.Vector3(-3.1, 0.6, -1.6), new THREE.Vector3(-2.25, 0.95, -0.6)
    ], F.lauf, { anzahl: 3, tempo: 0.22, opacity: 0.35 });
    [angriff, verkehr].forEach(function (s) { welt.add(s.linie); s.pakete.forEach(function (p) { welt.add(p); }); });
    function grundrauschen(an) {
      [angriff, verkehr].forEach(function (s) {
        s.linie.visible = an;
        s.pakete.forEach(function (p) { p.visible = an; });
      });
    }

    /* -- Angriffs-Simulator ------------------------------------------------ */
    var ANKER = {
      kali:      new THREE.Vector3(-5.0, -0.6, 1.3),
      umgebung:  new THREE.Vector3(-4.1, -0.4, -3.6),
      fortigate: new THREE.Vector3(-2.3, 0.95, 0.3),
      server:    new THREE.Vector3(2.3, -0.2, 0.3)
    };
    var vmNachId = {};
    vms.forEach(function (vm) { vmNachId[vm.userData.id] = vm; });
    if (komponenten[0]) ANKER[komponenten[0].id] = ANKER.fortigate;

    function anker(name) {
      if (vmNachId[name]) return vmNachId[name].position.clone().add(new THREE.Vector3(-0.7, 0, 0));
      return (ANKER[name] || ANKER.fortigate).clone();
    }

    var ART_FARBE = { angriff: F.accent, verkehr: F.lauf, log: F.fertig, event: F.fg3 };
    var fluege = [], pulse = [];
    var flugGeo = new THREE.SphereGeometry(0.085, 12, 10);

    function flug(von, nach, farbe, anzahl, dauer, fertig, stopBei) {
      var a = anker(von), b = anker(nach);
      var mitte = a.clone().lerp(b, 0.5);
      mitte.y += 1.1 + a.distanceTo(b) * 0.1;
      var kurve = new THREE.QuadraticBezierCurve3(a, mitte, b);
      var linie = new THREE.Line(new THREE.BufferGeometry().setFromPoints(kurve.getPoints(48)),
        new THREE.LineDashedMaterial({ color: farbe, dashSize: 0.16, gapSize: 0.1, transparent: true, opacity: 0.85 }));
      linie.computeLineDistances();
      welt.add(linie);
      var mat = new THREE.MeshBasicMaterial({ color: farbe });
      var pk = [];
      for (var i = 0; i < anzahl; i++) {
        var m = new THREE.Mesh(flugGeo, mat);
        m.visible = false;
        welt.add(m);
        pk.push(m);
      }
      fluege.push({ kurve: kurve, linie: linie, pk: pk, t: 0, dauer: dauer, fertig: fertig,
                    stopBei: stopBei || 1, aus: 0 });
    }

    function puls(name, farbe, gross) {
      var kugel = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 14),
        new THREE.MeshBasicMaterial({ color: farbe, wireframe: true, transparent: true, opacity: 0.9, depthWrite: false }));
      kugel.position.copy(anker(name));
      welt.add(kugel);
      pulse.push({ m: kugel, t: 0, gross: gross || 2.4 });
    }

    function aufraeumen() {
      fluege.forEach(function (f) { welt.remove(f.linie); f.pk.forEach(function (p) { welt.remove(p); }); });
      pulse.forEach(function (p) { welt.remove(p.m); });
      fluege = []; pulse = [];
    }

    var ablaufNr = 0;
    /** Spielt eine Schrittfolge ab. Jeder Schritt:
        { von, nach, art, effekt, bei, fokus, dauer }  — onSchritt(i) meldet den
        aktuellen Schritt, onSchritt(schritte.length) das Ende. */
    function ablauf(schritte, onSchritt) {
      var nr = ++ablaufNr;
      aufraeumen();
      grundrauschen(false);
      auto = false;

      function effekt(s) {
        var ort = s.bei || s.nach;
        if (!s.effekt || !ort) return;
        var farbe = s.effekt === 'still' ? F.border : (s.effekt === 'treffer' ? F.accent : (s.effekt === 'ok' ? F.fertig : F.accent));
        puls(ort, farbe, s.effekt === 'block' ? 3 : 2.2);
        if (s.effekt === 'block' && ort === (komponenten[0] && komponenten[0].id)) fwBlitz = 1;
      }

      if (REDUCED) {
        schritte.forEach(function (s, i) {
          if (s.von) flug(s.von, s.nach, ART_FARBE[s.art] || F.accent, 1, 1, null, 1);
          effekt(s);
          onSchritt(i);
        });
        fluege.forEach(function (f) { f.linie.material.opacity = 0.85; });
        pulse.forEach(function (p) { p.m.scale.setScalar(1.4); p.m.material.opacity = 0.5; });
        onSchritt(schritte.length);
        B.einmal();
        return;
      }

      var i = 0;
      function weiter() {
        if (nr !== ablaufNr) return;
        if (i >= schritte.length) { onSchritt(schritte.length); grundrauschen(true); return; }
        var s = schritte[i];
        onSchritt(i);
        if (s.fokus) markiere(s.fokus);
        var naechster = function () {
          if (nr !== ablaufNr) return;
          effekt(s);
          i++;
          setTimeout(weiter, s.pause || 900);
        };
        if (s.von) {
          var istAngriff = s.art === 'angriff';
          flug(s.von, s.nach, ART_FARBE[s.art] || F.accent, istAngriff ? 6 : 3,
               s.dauer || (istAngriff ? 1.8 : 1.4), naechster, s.effekt === 'block' ? 0.88 : 1);
        } else {
          naechster();
        }
      }
      weiter();
    }

    /* Klickbare Ziele */
    var ziele = [{ obj: fw, id: komponenten[0] && komponenten[0].id }]
      .concat(vms.map(function (v) { return { obj: v, id: v.userData.id }; }));
    var fwBlitz = 0, fwAktiv = false;
    function markiere(id) {
      ziele.forEach(function (z) {
        var an = z.id === id;
        if (z.obj === fw) {
          fwAktiv = an;
          fw.material[0].emissive = F.accent;
          fw.material[0].emissiveIntensity = an ? 0.1 : 0;
        } else {
          z.obj.userData.box.material.emissiveIntensity = an ? 0.45 : 0.06;
          z.obj.userData.box.material.opacity = an ? 0.8 : 0.55;
        }
      });
      if (REDUCED) B.einmal();
    }

    /* Steuerung: ziehen = drehen, Strg + Rad = zoomen (ohne fremde Bibliothek). */
    var rot = { y: -0.55, x: 0.34 }, rotZiel = { y: -0.55, x: 0.34 }, abstand = 21, abstandZiel = 21;
    var zieht = false, lx = 0, ly = 0, bewegt = 0, auto = true;
    var cv = B.renderer.domElement;
    cv.style.touchAction = 'pan-y';
    cv.addEventListener('pointerdown', function (e) {
      zieht = true; bewegt = 0; lx = e.clientX; ly = e.clientY; auto = false;
      cv.setPointerCapture(e.pointerId);
    });
    cv.addEventListener('pointermove', function (e) {
      if (zieht) {
        var dx = e.clientX - lx, dy = e.clientY - ly;
        bewegt += Math.abs(dx) + Math.abs(dy);
        rotZiel.y += dx * 0.006;
        rotZiel.x = Math.max(0.05, Math.min(0.9, rotZiel.x + dy * 0.004));
        lx = e.clientX; ly = e.clientY;
        if (REDUCED) { rot.x = rotZiel.x; rot.y = rotZiel.y; kamera(); B.einmal(); }
      } else {
        var t = treffer(e);
        cv.style.cursor = t ? 'pointer' : 'grab';
      }
    });
    cv.addEventListener('pointerup', function (e) {
      zieht = false;
      if (bewegt < 6) {
        var t = treffer(e);
        if (t && opts.onSelect) opts.onSelect(t);
      }
    });
    cv.addEventListener('wheel', function (e) {
      if (!e.ctrlKey && !e.metaKey) return;   // Seite soll normal scrollen
      e.preventDefault();
      abstandZiel = Math.max(12, Math.min(28, abstandZiel + e.deltaY * 0.01));
    }, { passive: false });

    var raycaster = new THREE.Raycaster(), maus = new THREE.Vector2();
    function treffer(e) {
      var r = cv.getBoundingClientRect();
      maus.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(maus, camera);
      for (var i = 0; i < ziele.length; i++) {
        if (raycaster.intersectObject(ziele[i].obj, true).length) return ziele[i].id;
      }
      return null;
    }

    function kamera() {
      camera.position.set(
        Math.sin(rot.y) * Math.cos(rot.x) * abstand - 0.4,
        Math.sin(rot.x) * abstand + 0.5,
        Math.cos(rot.y) * Math.cos(rot.x) * abstand
      );
      camera.lookAt(-0.4, 0.2, -0.4);
    }

    B.jedesBild(function (dt, t) {
      if (auto && !zieht) rotZiel.y += dt * 0.06;
      rot.y += (rotZiel.y - rot.y) * 0.08;
      rot.x += (rotZiel.x - rot.x) * 0.08;
      abstand += (abstandZiel - abstand) * 0.08;
      kamera();

      vms.forEach(function (vm, i) {
        vm.position.y = 2.3 - i * 1.15 + Math.sin(t * 0.9 + i) * 0.06;
        vm.rotation.y = Math.sin(t * 0.4 + i) * 0.15;
        vm.userData.verb.update(dt);
      });
      lt.userData.screen.userData.update();
      angriff.update(dt); verkehr.update(dt);

      // Flüge des Simulators
      for (var i = fluege.length - 1; i >= 0; i--) {
        var f = fluege[i];
        if (f.t < 1) {
          f.t = Math.min(1, f.t + dt / f.dauer);
          var n = f.pk.length;
          f.pk.forEach(function (p, k) {
            var lokal = f.t * (1 + (n - 1) * 0.1) - k * 0.1;
            p.visible = lokal > 0 && lokal < 1;
            if (p.visible) p.position.copy(f.kurve.getPointAt(Math.min(1, lokal) * f.stopBei));
          });
          if (f.t >= 1) {
            f.pk.forEach(function (p) { p.visible = false; });
            if (f.fertig) { var cb = f.fertig; f.fertig = null; cb(); }
          }
        } else {
          f.aus += dt;                                   // Linie blendet langsam aus
          f.linie.material.opacity = Math.max(0.18, 0.85 - f.aus * 0.25);
        }
      }
      for (var j = pulse.length - 1; j >= 0; j--) {
        var p = pulse[j];
        p.t += dt * 0.9;
        p.m.scale.setScalar(0.3 + p.t * p.gross);
        p.m.material.opacity = Math.max(0, 0.9 * (1 - p.t));
        if (p.t >= 1) { welt.remove(p.m); pulse.splice(j, 1); }
      }
      fwBlitz = Math.max(0, fwBlitz - dt * 1.2);
      fw.material[0].emissive = F.accent;
      fw.material[0].emissiveIntensity = Math.max(fwAktiv ? 0.1 : 0, fwBlitz * 0.6);
    });

    kamera();
    B.start();
    if (REDUCED) { kamera(); B.einmal(); }

    return { markiere: markiere, ablauf: ablauf };
  }

  window.NetGuard3D = { hero: hero, labor: labor, verfuegbar: webglOk };
})();
