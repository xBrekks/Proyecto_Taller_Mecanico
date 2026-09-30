/* ============================================================
   MOTORFIX — main.js
   Slider automático con prev/next
   ============================================================ */

(function () {
    "use strict";

    var slides   = document.querySelectorAll(".slide-image");
    var btnLeft  = document.querySelector(".left-arrow");
    var btnRight = document.querySelector(".right-arrow");
    var actual   = 0;
    var total    = slides.length;
    var timer    = null;
    var INTERVALO = 5000;

    function irA(idx) {
        slides[actual].classList.remove("active");
        actual = (idx + total) % total;
        slides[actual].classList.add("active");
    }

    function iniciar() {
        clearInterval(timer);
        timer = setInterval(function () { irA(actual + 1); }, INTERVALO);
    }

    if (btnLeft)  btnLeft.addEventListener("click",  function () { irA(actual - 1); iniciar(); });
    if (btnRight) btnRight.addEventListener("click", function () { irA(actual + 1); iniciar(); });

    var seccion = document.querySelector(".slide-section");
    if (seccion) {
        seccion.addEventListener("mouseenter", function () { clearInterval(timer); });
        seccion.addEventListener("mouseleave", iniciar);
    }

    irA(0);
    iniciar();
})();
 /* ============================================================
   CONTROL DEL MENÚ MÓVIL
   ============================================================ */
document.addEventListener("DOMContentLoaded", function() {
    var btnMenu = document.getElementById("btnMenu");
    var btnClose = document.getElementById("btnClose");
    var mobileDrawer = document.getElementById("mobileDrawer");
    var drawerLinks = document.querySelectorAll(".drawer-links a");

    // Abrir menú
    if (btnMenu && mobileDrawer) {
        btnMenu.addEventListener("click", function() {
            mobileDrawer.classList.add("open");
        });
    }

    // Cerrar menú con la [X]
    if (btnClose && mobileDrawer) {
        btnClose.addEventListener("click", function() {
            mobileDrawer.classList.remove("open");
        });
    }

    // Cerrar menú automáticamente al hacer clic en cualquier sección
    if (drawerLinks.length > 0) {
        drawerLinks.forEach(function(link) {
            link.addEventListener("click", function() {
                mobileDrawer.classList.remove("open");
            });
        });
    }
});