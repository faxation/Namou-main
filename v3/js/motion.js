(function () {
  "use strict";

  var doc = document.documentElement;
  var body = document.body;
  var themeToggle = document.getElementById("themeToggle");
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  var themeKey = "namou-v3-theme";
  var savedTheme = localStorage.getItem(themeKey);

  if (savedTheme === "dark") {
    doc.setAttribute("data-theme", "dark");
  }

  function closeMenu() {
    if (!mobileMenu || !navToggle) {
      return;
    }

    mobileMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var isDark = doc.getAttribute("data-theme") === "dark";

      if (isDark) {
        doc.removeAttribute("data-theme");
        localStorage.setItem(themeKey, "light");
      } else {
        doc.setAttribute("data-theme", "dark");
        localStorage.setItem(themeKey, "dark");
      }
    });
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      var nextState = navToggle.getAttribute("aria-expanded") !== "true";

      navToggle.setAttribute("aria-expanded", String(nextState));
      mobileMenu.classList.toggle("is-open", nextState);
      body.classList.toggle("menu-open", nextState);
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  var accordion = document.getElementById("routeAccordion");

  if (accordion) {
    var items = Array.prototype.slice.call(
      accordion.querySelectorAll("[data-accordion-item]")
    );

    function activate(item) {
      items.forEach(function (entry) {
        entry.classList.toggle("is-active", entry === item);
      });
    }

    items.forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        if (window.innerWidth > 720) {
          activate(item);
        }
      });

      item.addEventListener("focusin", function () {
        activate(item);
      });

      item.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          return;
        }

        activate(item);
      });
    });
  }

  var carousel = document.querySelector("[data-carousel]");

  if (carousel) {
    var track = carousel.querySelector(".carousel__track");
    var slides = Array.prototype.slice.call(track.children);
    var prevButton = document.querySelector("[data-carousel-prev]");
    var nextButton = document.querySelector("[data-carousel-next]");
    var currentIndex = 0;
    var autoplayId = null;

    function renderCarousel() {
      track.style.transform = "translateX(" + currentIndex * -100 + "%)";
    }

    function goTo(nextIndex) {
      currentIndex = (nextIndex + slides.length) % slides.length;
      renderCarousel();
    }

    function stopAutoplay() {
      if (autoplayId) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }
    }

    function startAutoplay() {
      stopAutoplay();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      autoplayId = window.setInterval(function () {
        goTo(currentIndex + 1);
      }, 5400);
    }

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        goTo(currentIndex - 1);
        startAutoplay();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        goTo(currentIndex + 1);
        startAutoplay();
      });
    }

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    renderCarousel();
    startAutoplay();
  }

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !window.gsap ||
    !window.ScrollTrigger
  ) {
    return;
  }

  window.gsap.registerPlugin(window.ScrollTrigger);

  window.gsap.from(".nav__inner", {
    y: -18,
    opacity: 0,
    duration: 0.85,
    ease: "power3.out"
  });

  window.gsap.from(".hero__copy > *", {
    y: 28,
    opacity: 0,
    duration: 0.95,
    stagger: 0.1,
    delay: 0.12,
    ease: "power3.out"
  });

  window.gsap.from(".hero-card, .decision-panel", {
    y: 34,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    delay: 0.24,
    ease: "power3.out"
  });

  window.gsap.utils
    .toArray(
      ".section__intro, .bento-card, .accordion-card, .journey-card, .conversation-card, .cta__inner"
    )
    .forEach(function (element) {
      window.gsap.from(element, {
        y: 44,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 82%"
        }
      });
    });

  window.gsap.utils.toArray(".journey-card").forEach(function (card) {
    var image = card.querySelector("img");

    if (!image) {
      return;
    }

    window.gsap.fromTo(
      image,
      {
        scale: 0.86,
        opacity: 0.38,
        y: 40
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          end: "bottom 36%",
          scrub: true
        }
      }
    );
  });

  var scrubWords = window.gsap.utils.toArray(".scrub-word");

  if (scrubWords.length) {
    window.gsap.set(scrubWords, { opacity: 0.18 });

    window.gsap.to(scrubWords, {
      opacity: 1,
      stagger: 0.18,
      ease: "none",
      scrollTrigger: {
        trigger: ".process__headline",
        start: "top 78%",
        end: "bottom 30%",
        scrub: true
      }
    });
  }
})();
