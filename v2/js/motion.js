/* Namou v2 — motion layer + shared contact constants */
window.Namou = window.Namou || {};
window.Namou.PHONE = "971569636360";
window.Namou.PHONE_DISPLAY = "+971 56 963 6360";
window.Namou.EMAIL = "reachus@namou.ae";
/**
 * Build a wa.me deep link with a pre-filled message.
 * @param {string} msg — plain-text message (will be URL-encoded)
 */
window.Namou.waUrl = function (msg) {
  return "https://wa.me/" + window.Namou.PHONE + "?text=" + encodeURIComponent(msg);
};

(function () {
  "use strict";

  // ── Mobile menu
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  if (navToggle && mobileMenu) {
    function setMenuState(open) {
      mobileMenu.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    navToggle.addEventListener("click", function () {
      setMenuState(!mobileMenu.classList.contains("is-open"));
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenuState(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) setMenuState(false);
    });
  }

  // ── Fade-in on scroll (ScrollTrigger-lite using IntersectionObserver)
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e, i) {
          if (e.isIntersecting) {
            setTimeout(function () {
              e.target.classList.add("motion-in");
            }, i * 80);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "-40px 0px" }
    );
    document.querySelectorAll(".motion-fade").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".motion-fade").forEach(function (el) {
      el.classList.add("motion-in");
    });
  }

  // ── Scrubbing text reveal (word-by-word opacity scrub)
  function setupScrub(container) {
    if (!container) return;
    var words = container.querySelectorAll(".scrub-word");
    if (!words.length) return;
    function update() {
      var rect = container.getBoundingClientRect();
      var vh = window.innerHeight;
      var start = vh * 0.8;
      var end = vh * 0.2;
      var progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      var activeIdx = Math.floor(progress * words.length);
      words.forEach(function (w, i) {
        if (i < activeIdx) w.classList.add("active");
        else w.classList.remove("active");
      });
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
  document.querySelectorAll("[data-scrub]").forEach(setupScrub);

  // ── Subtle parallax on hero inline image (follows cursor slightly)
  var heroImg = document.querySelector(".hero__inline-img");
  if (heroImg && window.matchMedia("(min-width: 900px)").matches) {
    document.addEventListener("mousemove", function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 12;
      var y = (e.clientY / window.innerHeight - 0.5) * 8;
      heroImg.style.transform =
        "translate(" + x.toFixed(2) + "px, calc(-0.1em + " + y.toFixed(2) + "px))";
    });
  }
})();
