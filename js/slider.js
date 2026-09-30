/* ============================================
   TALLER MECÁNICO — slider.js
   ============================================ */

(function () {
  "use strict";

  // Referencias DOM
  const pista     = document.getElementById("sliderPista");
  const slides    = document.querySelectorAll(".slide");
  const puntos    = document.querySelectorAll(".punto");
  const btnPrev   = document.getElementById("btnPrev");
  const btnNext   = document.getElementById("btnNext");
  const contador  = document.getElementById("sliderActual");
  const totalEl   = document.getElementById("sliderTotal");

  const total = slides.length;
  let actual  = 0;
  let timer   = null;
  const INTERVALO = 5000; // 5 segundos auto-avance

  // Mostrar total en el contador
  if (totalEl) totalEl.textContent = total;

  /* ─── Función principal: ir a un slide ─── */
  function irA(idx) {
    // Limitar rango circular
    actual = (idx + total) % total;

    // Mover la pista
    pista.style.transform = "translateX(-" + actual * 100 + "%)";

    // Actualizar puntos
    puntos.forEach(function (p, i) {
      p.classList.toggle("activo", i === actual);
    });

    // Actualizar contador numérico
    if (contador) contador.textContent = actual + 1;
  }

  /* ─── Auto-avance ─── */
  function iniciarTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
      irA(actual + 1);
    }, INTERVALO);
  }

  function detenerTimer() {
    clearInterval(timer);
  }

  /* ─── Botones prev / next ─── */
  if (btnPrev) {
    btnPrev.addEventListener("click", function () {
      irA(actual - 1);
      iniciarTimer(); // Reiniciar timer al interactuar
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", function () {
      irA(actual + 1);
      iniciarTimer();
    });
  }

  /* ─── Puntos ─── */
  puntos.forEach(function (p) {
    p.addEventListener("click", function () {
      irA(parseInt(p.dataset.idx));
      iniciarTimer();
    });
  });

  /* ─── Pausar al pasar el mouse ─── */
  var hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("mouseenter", detenerTimer);
    hero.addEventListener("mouseleave", iniciarTimer);
  }

  /* ─── Swipe táctil ─── */
  var touchInicioX = 0;

  if (pista) {
    pista.addEventListener("touchstart", function (e) {
      touchInicioX = e.changedTouches[0].clientX;
    }, { passive: true });

    pista.addEventListener("touchend", function (e) {
      var diff = touchInicioX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        irA(diff > 0 ? actual + 1 : actual - 1);
        iniciarTimer();
      }
    }, { passive: true });
  }

  /* ─── Nav: marcar enlace activo al hacer scroll ─── */
  var navLinks = document.querySelectorAll(".nav-links a");

  function actualizarNavActivo() {
    var scrollY = window.scrollY;
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      var seccion = document.querySelector(href);
      if (!seccion) return;
      var top    = seccion.offsetTop - 80;
      var bottom = top + seccion.offsetHeight;
      link.classList.toggle("activo", scrollY >= top && scrollY < bottom);
    });
  }

  window.addEventListener("scroll", actualizarNavActivo, { passive: true });

  /* ─── Inicializar ─── */
  irA(0);
  iniciarTimer();

})();
