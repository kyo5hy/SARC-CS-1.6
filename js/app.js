// Monta a página a partir de js/config.js. Não precisa editar este arquivo.
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // ---------- título: letras caem uma a uma ----------
  var h1a = $("h1a");
  h1a.innerHTML = h1a.textContent.split("").map(function (c, i) { return '<i style="--i:' + i + '">' + esc(c) + "</i>"; }).join("");
  function start() { root.classList.add("go"); }

  // ---------- abertura (apenas visual, sem conexão real) ----------
  var splash = $("splash"), seen = false, timer;
  try { seen = sessionStorage.getItem("sarc-splash") === "1"; } catch (e) {}
  function closeSplash() {
    clearTimeout(timer);
    splash.classList.add("out");
    start();
    setTimeout(function () { splash.hidden = true; }, 450);
  }
  if (seen || reduced) { splash.hidden = true; start(); }
  else {
    try { sessionStorage.setItem("sarc-splash", "1"); } catch (e) {}
    timer = setTimeout(closeSplash, 1600);
    $("skip").addEventListener("click", closeSplash);
  }

  // ---------- links de inscrição e rodapé ----------
  $$("[data-inscricao]").forEach(function (a) { a.href = URL_INSCRICAO; });
  if (EVENTO.instagram) { $("f-ig").href = EVENTO.instagram; $("f-ig").hidden = false; }
  if (EVENTO.contato) { $("f-ct").href = EVENTO.contato; $("f-ct").hidden = false; }

  // ---------- hero ----------
  document.title = EVENTO.nome + " — " + EVENTO.subtitulo;
  $("h-sub").textContent = EVENTO.subtitulo;
  $("h-data").textContent = EVENTO.data;
  $("h-chips").innerHTML = [EVENTO.local, "Formato " + EVENTO.formato, "LAN", "Até " + EVENTO.maxEquipes + " equipes"]
    .map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("");

  var alvo = EVENTO.dataISO ? new Date(EVENTO.dataISO).getTime() : NaN;
  var box = $("count");
  if (!isNaN(alvo)) {
    var tick = function () {
      var s = Math.floor(Math.max(0, alvo - Date.now()) / 1000);
      var v = [[Math.floor(s / 86400), "dias"], [Math.floor(s % 86400 / 3600), "horas"], [Math.floor(s % 3600 / 60), "min"], [s % 60, "seg"]];
      box.innerHTML = v.map(function (x) { return "<div><b>" + pad(x[0]) + "</b><small>" + x[1] + "</small></div>"; }).join("");
    };
    tick(); setInterval(tick, 1000);
  } else {
    box.innerHTML = '<div class="soon">Em breve</div>';
  }

  var itens = ["Counter-Strike 1.6", EVENTO.formato, "Torneio LAN", EVENTO.local, "Inscrições abertas", EVENTO.nome];
  var faixa = itens.concat(itens).map(function (t) { return "<span>" + esc(t) + "</span><span>◆</span>"; }).join("");
  $("marq").innerHTML = faixa + faixa;

  // ---------- diorama 3D do deserto (CSS puro, montado aqui) ----------
  // Unidades em "u". Terreno 8x8. Cada peça: x/z = posição, w/d/h = largura/profundidade/altura,
  // y = altura da base (padrão .35, em cima do terreno), c = cor, k = tipo, deco = detalhes por face (f,b,r,l).
  var S1 = "#d9b27a", S2 = "#c9985a", S3 = "#d2a468";
  var PECAS = [
    { k: "ground", x: 0, z: 0, w: 8, d: 8, h: .35, y: 0 },
    { k: "plate", x: -2.5, z: 2.6, w: 2.7, d: 2.4, h: .04 },
    { k: "plate", x: 2.7, z: 2.6, w: 2.4, d: 2.4, h: .04 },
    // portão (fundo)
    { x: 0, z: -3, w: 4.2, d: 1.3, h: 2.1, c: S1, deco: { f: "arch", b: "win" } },
    { x: -1.65, z: -3, w: .9, d: .9, h: .7, y: 2.45, c: S2 },
    { x: 1.65, z: -3, w: .9, d: .9, h: .7, y: 2.45, c: S2 },
    // torre com bandeira
    { x: -3.1, z: -2.2, w: 1.2, d: 1.2, h: 3.3, c: S1, deco: { f: "slit", r: "slit", l: "slit" } },
    { x: -3.1, z: -2.2, w: 1.5, d: 1.5, h: .28, y: 3.65, c: "#bd8a4f" },
    { k: "pole", x: -3.1, z: -2.2, w: .07, d: .07, h: 1.2, y: 3.93, c: "#5a3a1c", flag: 1 },
    // casas
    { x: 3.1, z: -1, w: 1.9, d: 2.3, h: 1.5, c: S1, deco: { l: "arch", f: "win" } },
    { x: 3.1, z: -1, w: 2.1, d: 2.5, h: .16, y: 1.85, c: S2 },
    { x: -3.15, z: .2, w: 1.4, d: 1.7, h: 1.2, c: S1, deco: { r: "arch", f: "win" } },
    { x: -3.15, z: .2, w: 1.55, d: 1.85, h: .14, y: 1.55, c: S2 },
    // muros e monumento central
    { x: -1.45, z: -1.35, w: 1.7, d: .3, h: .8, c: S3 },
    { x: 1.45, z: -1.35, w: 1.7, d: .3, h: .8, c: S3 },
    { x: 0, z: .45, w: .7, d: .7, h: 1.05, c: S3 },
    { x: 0, z: .45, w: .95, d: .95, h: .14, y: 1.4, c: S2 },
    // tochas
    { k: "pole", x: -1.05, z: -2.2, w: .12, d: .12, h: .75, c: "#6b4423" },
    { k: "flame", x: -1.05, z: -2.2, w: .2, d: .2, h: .24, y: 1.1 },
    { k: "pole", x: 1.05, z: -2.2, w: .12, d: .12, h: .75, c: "#6b4423" },
    { k: "flame", x: 1.05, z: -2.2, w: .2, d: .2, h: .24, y: 1.1 },
    // caixotes do sítio A
    { k: "crate", x: -3.0, z: 2.7, w: .85, d: .85, h: .85 },
    { k: "crate", x: -2.0, z: 2.95, w: .7, d: .7, h: .7 },
    { k: "crate", x: -3.0, z: 2.7, w: .55, d: .55, h: .55, y: 1.2 },
    // caixotes do sítio B
    { k: "crate", x: 2.35, z: 2.85, w: .9, d: .9, h: .9 },
    { k: "crate", x: 3.25, z: 2.4, w: .7, d: .7, h: .7 },
    { k: "crate", x: 2.35, z: 2.85, w: .6, d: .6, h: .6, y: 1.25 }
  ];
  var MARCAS = [
    { t: "A", x: -2.6, z: 2.7, y: 2.3 },
    { t: "B", x: 2.7, z: 2.6, y: 2.3 },
    { t: "CT", x: 0, z: -3, y: 3.7, cls: "ct" }
  ];
  var POEIRA = [[-1.1, 1.5, 0], [1.4, -.2, 1.8], [2.3, 3.4, 3.2], [-3.4, -1, 4.4], [.2, 3.2, .9]];

  var world = $("world"), frag = document.createDocumentFragment();
  var ring = document.createElement("div"); ring.className = "ring"; frag.appendChild(ring);
  PECAS.forEach(function (o) {
    var el = document.createElement("div");
    el.className = "bx " + (o.k || "");
    var st = "--x:" + o.x + ";--z:" + o.z + ";--w:" + o.w + ";--d:" + o.d + ";--h:" + o.h + ";--y:" + (o.y == null ? .35 : o.y) + ";";
    if (o.c) st += "--c:" + o.c + ";";
    el.style.cssText = st;
    var dc = o.deco || {}, h = "";
    ["f", "b", "r", "l", "t"].forEach(function (f) { h += '<i class="f f' + f + (dc[f] ? " " + dc[f] : "") + '"></i>'; });
    if (o.flag) h += '<i class="flag"></i>';
    el.innerHTML = h;
    frag.appendChild(el);
  });
  MARCAS.forEach(function (o) {
    var p = document.createElement("div");
    p.className = "bpos";
    p.style.cssText = "--x:" + o.x + ";--z:" + o.z + ";--y:" + o.y + ";animation-delay:-" + (o.x + 3) * .4 + "s";
    p.innerHTML = '<div class="bill ' + (o.cls || "") + '"><b class="tag">' + o.t + "</b></div>";
    frag.appendChild(p);
  });
  // coroa 3D + placa do campeão (dados em CAMPEAO, no config.js)
  var C = (typeof CAMPEAO !== "undefined" && CAMPEAO) || {};
  var tem = !!(C.equipe && String(C.equipe).trim());
  var jog = (C.jogadores || []).filter(function (j) { return j && String(j).trim(); }).slice(0, 3);
  var cr = document.createElement("div");
  cr.className = "bpos crown " + (tem ? "won" : "tbd");
  cr.style.cssText = "--x:0;--z:0;--y:7.6";
  var cpp = "";
  for (var n = 0; n < 8; n++) cpp += '<i class="cp" style="--i:' + n + '"><u></u></i>';
  cr.innerHTML = '<div class="cspin">' + cpp + "</div>";
  frag.appendChild(cr);
  var pl = document.createElement("div");
  pl.className = "bpos plqpos " + (tem ? "won" : "tbd");
  pl.style.cssText = "--x:0;--z:0;--y:5.9;animation-delay:-1.2s";
  pl.innerHTML = '<div class="bill plq"><small>Campeão · SARC 2026</small><b>' + esc(tem ? C.equipe : "A definir") + "</b><ol>" +
    [0, 1, 2].map(function (i) { return "<li>" + esc(jog[i] || (tem ? "—" : "???")) + "</li>"; }).join("") + "</ol></div>";
  frag.appendChild(pl);
  POEIRA.forEach(function (o) {
    var p = document.createElement("div");
    p.className = "bpos pf";
    p.style.cssText = "--x:" + o[0] + ";--z:" + o[1] + ";--y:.5";
    p.innerHTML = '<div class="bill"><i class="puff" style="--dl:' + o[2] + 's"></i></div>';
    frag.appendChild(p);
  });
  world.appendChild(frag);

  // ---------- conteúdo ----------
  $("t-obj").textContent = OBJETIVO.titulo;
  $("o-txt").innerHTML = OBJETIVO.paragrafos.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  $("stats").innerHTML = [[EVENTO.formato, "Trios em confronto"], ["≤" + EVENTO.maxEquipes, "Equipes na disputa"], ["LAN", "Partidas presenciais"], ["1.6", "O clássico do CS"]]
    .map(function (s, i) {
      return '<div class="stat rv" data-tilt style="--d:' + i * 90 + 'ms"><b data-final="' + esc(s[0]) + '">' + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></div>";
    }).join("");
  $("timeline").innerHTML = ETAPAS.map(function (e, i) {
    return '<li class="rv" style="--d:' + (300 + i * 140) + 'ms"><span class="n">' + pad(i + 1) + "</span><b>" + esc(e[0]) + "</b><p>" + esc(e[1]) + "</p></li>";
  }).join("");
  $("steps").innerHTML = PASSOS.map(function (p, i) {
    return '<li class="rv" data-tilt style="--d:' + i * 70 + 'ms"><span class="num" aria-hidden="true">' + pad(i + 1) + "</span>" + esc(p) + "</li>";
  }).join("");
  $("rules").innerHTML = REGRAS.map(function (r, i) {
    var alerta = /cheat|bot|\bwo\b/i.test(r[0]) ? " alert" : "";
    return '<div class="rule rv' + alerta + '" data-tilt style="--d:' + (i % 3) * 80 + 'ms"><svg class="i" aria-hidden="true"><use href="#shield"/></svg><h3>' +
      esc(r[0]) + "</h3><p>" + esc(r[1]) + "</p></div>";
  }).join("");
  $("premio-txt").innerHTML = esc(PREMIO) + (tem ? '<span class="champ">Campeão: ' + esc(C.equipe) + (jog.length ? " — " + jog.map(esc).join(", ") : "") + "</span>" : "");

  // faíscas douradas no prêmio
  if (!reduced) {
    var sp = "";
    for (var k = 0; k < 18; k++) {
      sp += '<i style="left:' + (Math.random() * 100).toFixed(1) + "%;animation-duration:" + (3 + Math.random() * 4).toFixed(1) + "s;animation-delay:-" + (Math.random() * 6).toFixed(1) + 's"></i>';
    }
    $("spk").innerHTML = sp;
  }

  // ---------- organização + crédito ----------
  function pessoa(o) {
    if (!o || !o.nome) return "";
    var lk = function (u, ic, nm) { return u ? '<a href="' + esc(u) + '" target="_blank" rel="noopener" aria-label="' + nm + " de " + esc(o.nome) + '"><svg aria-hidden="true"><use href="#' + ic + '"/></svg></a>' : ""; };
    var soc = lk(o.linkedin, "in", "LinkedIn") + lk(o.github, "gh", "GitHub");
    return '<div class="pp"><strong>' + esc(o.nome) + "</strong>" + (o.cargo ? "<small>" + esc(o.cargo) + "</small>" : "") + (soc ? '<span class="soc">' + soc + "</span>" : "") + "</div>";
  }
  var fs = (typeof FOTOS_EVENTO !== "undefined" ? FOTOS_EVENTO : []).filter(function (f) { return f && f.src; }).slice(0, 6);
  if (fs.length) {
    $("gal-g").innerHTML = fs.map(function (f) {
      return '<figure><img src="' + esc(f.src) + '" alt="' + esc(f.legenda || "Foto do evento") + '" loading="lazy" onerror="this.closest(\'figure\').remove()">' + (f.legenda ? "<figcaption>" + esc(f.legenda) + "</figcaption>" : "") + "</figure>";
    }).join("");
    $("fotos").hidden = false;
  }
  var oc = pessoa(ORGANIZACAO.coordenador), ot = (ORGANIZACAO.equipe || []).map(pessoa).join("");
  if (oc || ot) { $("org-c").innerHTML = oc; $("org-t").innerHTML = ot; $("org").hidden = false; }
  if (CREDITO_SITE && CREDITO_SITE.nome) {
    $("f-credit").innerHTML = esc(CREDITO_SITE.texto || "Site por") + " " + (CREDITO_SITE.link ? '<a href="' + esc(CREDITO_SITE.link) + '" target="_blank" rel="noopener">' + esc(CREDITO_SITE.nome) + "</a>" : esc(CREDITO_SITE.nome));
    $("f-credit").hidden = false;
  }

  // ---------- efeito "embaralhar" nos números ----------
  function scramble(el) {
    var fin = el.getAttribute("data-final") || el.textContent, n = 0, chars = "0123456789#%$&X";
    var t = setInterval(function () {
      n++;
      el.textContent = fin.split("").map(function (c, i) { return i < n / 2 ? c : chars.charAt((Math.random() * chars.length) | 0); }).join("");
      if (n >= fin.length * 2 + 2) { clearInterval(t); el.textContent = fin; }
    }, 45);
  }

  // ---------- revelar ao rolar ----------
  var rvs = $$(".rv");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (e.target.classList.contains("stat")) { var b = e.target.querySelector("b"); setTimeout(function () { scramble(b); }, 250); }
        io.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    rvs.forEach(function (el) { io.observe(el); });
  } else { rvs.forEach(function (el) { el.classList.add("in"); }); }

  // ---------- mouse: inclinação dos cards, diorama e brilho ----------
  if (fine && !reduced) {
    $$("[data-tilt]").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ty", ((x - 0.5) * 10).toFixed(2) + "deg");
        el.style.setProperty("--tx", ((0.5 - y) * 10).toFixed(2) + "deg");
        el.style.setProperty("--px", (x * 100).toFixed(0) + "%");
        el.style.setProperty("--py", (y * 100).toFixed(0) + "%");
      });
      el.addEventListener("pointerleave", function () { el.style.setProperty("--tx", "0deg"); el.style.setProperty("--ty", "0deg"); });
    });
    var hero = $("hero"), rig = $("rig"), cg = $("cglow");
    var tx = -30, ty = 0, cx = -30, cy = 0, gx = 0, gy = 0, tgx = 0, tgy = 0, run = false;
    var frame = function () {
      cx += (tx - cx) * .08; cy += (ty - cy) * .08; gx += (tgx - gx) * .18; gy += (tgy - gy) * .18;
      rig.style.transform = "rotateX(" + cx.toFixed(2) + "deg) rotateY(" + cy.toFixed(2) + "deg)";
      cg.style.transform = "translate3d(" + gx.toFixed(1) + "px," + gy.toFixed(1) + "px,0)";
      if (Math.abs(tx - cx) + Math.abs(ty - cy) + Math.abs(tgx - gx) + Math.abs(tgy - gy) > .05) requestAnimationFrame(frame); else run = false;
    };
    var kick = function () { if (!run) { run = true; requestAnimationFrame(frame); } };
    hero.addEventListener("pointermove", function (e) { ty = (e.clientX / window.innerWidth - 0.5) * 30; tx = -30 + (e.clientY / window.innerHeight - 0.5) * -16; kick(); });
    hero.addEventListener("pointerleave", function () { ty = 0; tx = -30; kick(); });
    window.addEventListener("pointermove", function (e) { tgx = e.clientX; tgy = e.clientY; kick(); }, { passive: true });
  }

  // ---------- header, menu, barra de progresso, parallax ----------
  var dun = document.querySelector(".dunes"), header = $("top"), burger = $("burger"), nav = $("nav"), prog = $("prog"), tk = false;
  function onScroll() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("sc", y > 20);
    prog.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0).toFixed(4) + ")";
    dun.style.setProperty("--sy", y);
    tk = false;
  }
  onScroll();
  window.addEventListener("scroll", function () { if (!tk) { tk = true; requestAnimationFrame(onScroll); } }, { passive: true });
  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  });
  if ("IntersectionObserver" in window) {
    var links = $$("#nav a[href^='#']");
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ["hero", "evento", "como", "participar", "regras", "premio"].forEach(function (id) { spy.observe($(id)); });

    var vis = {}, sticky = $("sticky");
    var sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { vis[e.target.id || "x"] = e.isIntersecting; });
      sticky.classList.toggle("show", !(vis["hero-cta"] || vis["mid-cta"] || vis["inscricao"]));
    });
    sio.observe($("hero-cta")); sio.observe($("mid-cta")); sio.observe($("inscricao"));
  } else { $("sticky").classList.add("show"); }

  // ---------- poeira ao vento (canvas leve) ----------
  var cv = $("fx"), ctx = cv.getContext && cv.getContext("2d");
  if (ctx) {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5), W = 0, H = 0, dots = [], gusts = [], raf = 0, last = 0;
    var cor = ["238,205,155", "238,205,155", "255,178,58", "238,122,48"];
    var mk = function (init) {
      return { x: init ? Math.random() * W : -10, y: Math.random() * H, r: (Math.random() * 1.7 + 0.4) * dpr,
               v: (Math.random() * 0.9 + 0.25) * dpr, a: Math.random() * 6.28, c: cor[(Math.random() * cor.length) | 0] };
    };
    var size = function () {
      W = cv.width = Math.floor(window.innerWidth * dpr); H = cv.height = Math.floor(window.innerHeight * dpr);
      var n = window.innerWidth < 700 ? 34 : 70;
      while (dots.length < n) dots.push(mk(true));
      dots.length = n;
    };
    var draw = function () {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(function (d) {
        d.x += d.v; d.a += 0.015; d.y += Math.sin(d.a) * 0.35 * dpr;
        if (d.x > W + 10) { d.x = -10; d.y = Math.random() * H; }
        ctx.fillStyle = "rgba(" + d.c + "," + (0.18 + 0.32 * Math.abs(Math.sin(d.a * .7))).toFixed(2) + ")";
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283); ctx.fill();
      });
      gusts.forEach(function (g) {
        g.x += g.v; g.life -= 0.008;
        var gr = ctx.createLinearGradient(g.x - g.len, 0, g.x, 0);
        gr.addColorStop(0, "rgba(238,205,155,0)"); gr.addColorStop(1, "rgba(238,205,155," + Math.max(0, g.life * 0.22).toFixed(3) + ")");
        ctx.strokeStyle = gr; ctx.lineWidth = g.w; ctx.beginPath(); ctx.moveTo(g.x - g.len, g.y); ctx.lineTo(g.x, g.y); ctx.stroke();
      });
      gusts = gusts.filter(function (g) { return g.life > 0 && g.x - g.len < W; });
    };
    var loop = function (t) {
      if (t - last > 5500 && gusts.length < 4) {
        last = t;
        for (var i = 0; i < 3; i++) gusts.push({ x: -50 - Math.random() * 200, y: Math.random() * H, len: (140 + Math.random() * 260) * dpr, v: (14 + Math.random() * 10) * dpr, w: (1 + Math.random() * 1.6) * dpr, life: 1 });
      }
      draw(); raf = requestAnimationFrame(loop);
    };
    size(); draw();
    window.addEventListener("resize", function () { size(); if (reduced) draw(); });
    if (!reduced) {
      raf = requestAnimationFrame(loop);
      document.addEventListener("visibilitychange", function () {
        cancelAnimationFrame(raf);
        if (!document.hidden) raf = requestAnimationFrame(loop);
      });
    }
  }
})();
