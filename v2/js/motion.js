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

  // ── Stat count-up — animate from 0 to the displayed integer when a stat
  //    enters the viewport. Detects the "1,000+", "25,000+", "~30M" formats
  //    on landowner and the "0%" cell on home, parses out the numeric core,
  //    and re-injects with the original prefix/suffix preserved.
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function parseStatText(text) {
    var match = text.match(/^(\D*)([\d,]+(?:\.\d+)?)([^\d]*)$/);
    if (!match) return null;
    var num = parseFloat(match[2].replace(/,/g, ""));
    if (!isFinite(num)) return null;
    return { prefix: match[1], value: num, suffix: match[3], original: text };
  }
  function formatStat(value, parsed) {
    var rounded = parsed.value >= 100 ? Math.round(value) : Math.round(value * 10) / 10;
    var withCommas = rounded >= 1000
      ? Math.round(rounded).toLocaleString("en-US")
      : String(rounded);
    return parsed.prefix + withCommas + parsed.suffix;
  }
  function countUp(el) {
    if (prefersReducedMotion) return;
    var parsed = parseStatText(el.textContent.trim());
    if (!parsed) return;
    var duration = 900;
    var start = performance.now();
    var initial = 0;
    function step(now) {
      var t = Math.min(1, (now - start) / duration);
      // ease-out-quart to match --ease curve
      var eased = 1 - Math.pow(1 - t, 4);
      var value = initial + (parsed.value - initial) * eased;
      el.textContent = formatStat(value, parsed);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = parsed.original;
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          countUp(e.target);
          statObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".stat__num, .bento__stat").forEach(function (el) {
      statObserver.observe(el);
    });
  }

  // ── Scroll progress bar — single fixed line at the top of the viewport.
  //    On browsers without scroll-driven CSS timelines, this rAF loop drives
  //    the same .scroll-progress element. With them, the CSS animation wins
  //    (no JS run). Cheap fallback — capped at one rAF per scroll.
  var progressEl = document.createElement("div");
  progressEl.className = "scroll-progress";
  progressEl.setAttribute("aria-hidden", "true");
  document.body.appendChild(progressEl);
  var supportsScrollTimeline =
    typeof CSS !== "undefined" && CSS.supports && CSS.supports("animation-timeline: scroll()");
  if (!supportsScrollTimeline && !prefersReducedMotion) {
    var ticking = false;
    function updateProgress() {
      var doc = document.documentElement;
      var scrolled = doc.scrollTop || document.body.scrollTop;
      var max = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      var pct = max > 0 ? scrolled / max : 0;
      progressEl.style.transform = "scaleX(" + pct.toFixed(4) + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    }, { passive: true });
    updateProgress();
  }
})();
