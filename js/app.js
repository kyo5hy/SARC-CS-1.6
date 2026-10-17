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
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // ---------- abertura (apenas visual, sem conexão real) ----------
  var splash = $("splash"), seen = false, timer;
  try { seen = sessionStorage.getItem("sarc-splash") === "1"; } catch (e) {}
  function closeSplash() {
    clearTimeout(timer);
    splash.classList.add("out");
    setTimeout(function () { splash.hidden = true; }, 450);
  }
  if (seen || reduced) { splash.hidden = true; }
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

  // contagem regressiva
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

  // faixa em movimento
  var itens = ["Counter-Strike 1.6", EVENTO.formato, "Torneio LAN", EVENTO.local, "Inscrições abertas", EVENTO.nome];
  var faixa = itens.concat(itens).map(function (t) { return "<span>" + esc(t) + "</span><span>◆</span>"; }).join("");
  $("marq").innerHTML = faixa + faixa;

  // ---------- objetivo ----------
  $("t-obj").textContent = OBJETIVO.titulo;
  $("o-txt").innerHTML = OBJETIVO.paragrafos.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  $("stats").innerHTML = [[EVENTO.formato, "Trios em confronto"], ["≤" + EVENTO.maxEquipes, "Equipes na disputa"], ["LAN", "Partidas presenciais"], ["1.6", "O clássico do CS"]]
    .map(function (s, i) {
      return '<div class="stat rv" data-tilt style="--d:' + i * 90 + 'ms"><b>' + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></div>";
    }).join("");

  // ---------- etapas, passos, regras, prêmio ----------
  $("timeline").innerHTML = ETAPAS.map(function (e, i) {
    return '<li class="rv" style="--d:' + i * 90 + 'ms"><span class="n">' + pad(i + 1) + "</span><b>" + esc(e[0]) + "</b><p>" + esc(e[1]) + "</p></li>";
  }).join("");
  $("steps").innerHTML = PASSOS.map(function (p, i) {
    return '<li class="rv" data-tilt style="--d:' + i * 70 + 'ms"><span class="num" aria-hidden="true">' + pad(i + 1) + "</span>" + esc(p) + "</li>";
  }).join("");
  $("rules").innerHTML = REGRAS.map(function (r, i) {
    var alerta = /cheat|bot|\bwo\b/i.test(r[0]) ? " alert" : "";
    return '<div class="rule rv' + alerta + '" data-tilt style="--d:' + (i % 3) * 80 + 'ms"><svg class="i" aria-hidden="true"><use href="#shield"/></svg><h3>' +
      esc(r[0]) + "</h3><p>" + esc(r[1]) + "</p></div>";
  }).join("");
  $("premio-txt").textContent = PREMIO;

  // ---------- revelar ao rolar ----------
  var rvs = $$(".rv");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    rvs.forEach(function (el) { io.observe(el); });
  } else { rvs.forEach(function (el) { el.classList.add("in"); }); }

  // ---------- inclinação 3D dos cards (só mouse) ----------
  if (fine && !reduced) {
    $$("[data-tilt]").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ty", ((x - 0.5) * 10).toFixed(2) + "deg");
        el.style.setProperty("--tx", ((0.5 - y) * 10).toFixed(2) + "deg");
        el.style.setProperty("--px", (x * 100).toFixed(0) + "%");
        el.style.setProperty("--py", (y * 100).toFixed(0) + "%");
      });
      el.addEventListener("pointerleave", function () {
        el.style.setProperty("--tx", "0deg"); el.style.setProperty("--ty", "0deg");
      });
    });
    // cena 3D do hero segue o mouse
    var hero = $("hero"), rig = $("rig");
    hero.addEventListener("pointermove", function (e) {
      var x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5;
      rig.style.setProperty("--ry", (x * 34).toFixed(1) + "deg");
      rig.style.setProperty("--rx", (-12 + y * -22).toFixed(1) + "deg");
    });
    hero.addEventListener("pointerleave", function () {
      rig.style.setProperty("--ry", "0deg"); rig.style.setProperty("--rx", "-12deg");
    });
  }

  // ---------- header, menu, destaque do link ativo ----------
  var header = $("top"), burger = $("burger"), nav = $("nav");
  function onScroll() { header.classList.toggle("sc", window.scrollY > 20); }
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
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

    // botão fixo no celular: some quando um botão de inscrição já está na tela
    var vis = {}, sticky = $("sticky");
    var sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { vis[e.target.id || "x"] = e.isIntersecting; });
      var algum = vis["hero-cta"] || vis["mid-cta"] || vis["inscricao"];
      sticky.classList.toggle("show", !algum);
    });
    sio.observe($("hero-cta")); sio.observe($("mid-cta")); sio.observe($("inscricao"));
  } else { $("sticky").classList.add("show"); }

  // ---------- partículas de fundo (canvas leve) ----------
  var cv = $("fx"), ctx = cv.getContext && cv.getContext("2d");
  if (ctx) {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5), W = 0, H = 0, dots = [], raf = 0;
    var cor = ["255,176,0", "255,176,0", "255,176,0", "74,126,230", "238,122,48"];
    var mk = function () {
      return { x: Math.random() * W, y: Math.random() * H, r: (Math.random() * 1.6 + 0.4) * dpr,
               v: (Math.random() * 0.28 + 0.08) * dpr, a: Math.random() * 6.28, c: cor[(Math.random() * cor.length) | 0] };
    };
    var size = function () {
      W = cv.width = Math.floor(window.innerWidth * dpr); H = cv.height = Math.floor(window.innerHeight * dpr);
      var n = window.innerWidth < 700 ? 28 : 60;
      while (dots.length < n) dots.push(mk());
      dots.length = n;
    };
    var draw = function () {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(function (d) {
        d.y -= d.v; d.a += 0.012; d.x += Math.sin(d.a) * 0.3 * dpr;
        if (d.y < -6) { d.y = H + 6; d.x = Math.random() * W; }
        ctx.fillStyle = "rgba(" + d.c + "," + (0.2 + 0.4 * Math.abs(Math.sin(d.a))).toFixed(2) + ")";
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283); ctx.fill();
      });
    };
    var loop = function () { draw(); raf = requestAnimationFrame(loop); };
    size(); draw();
    window.addEventListener("resize", function () { size(); if (reduced) draw(); });
    if (!reduced) {
      loop();
      document.addEventListener("visibilitychange", function () {
        cancelAnimationFrame(raf);
        if (!document.hidden) loop();
      });
    }
  }
})();
