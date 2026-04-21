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
      }, 5200);
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
    y: -22,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });

  window.gsap.from(".hero__inner > *", {
    y: 34,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    delay: 0.12,
    ease: "power3.out"
  });

  window.gsap.from(".hero__stage", {
    y: 40,
    opacity: 0,
    duration: 1.05,
    delay: 0.28,
    ease: "power3.out"
  });

  window.gsap.utils
    .toArray(
      ".section__intro, .route-card, .bento-card, .stack-card, .brief-card, .cta__inner"
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

  window.gsap.utils.toArray(".stack-card").forEach(function (card, index, cards) {
    card.style.zIndex = String(cards.length - index);

    window.gsap.fromTo(
      card,
      {
        y: index === 0 ? 0 : 160,
        rotate: index % 2 === 0 ? 1.5 : -1.5,
        opacity: index === 0 ? 1 : 0.7
      },
      {
        y: 0,
        rotate: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          end: "top 26%",
          scrub: true
        }
      }
    );

    var image = card.querySelector("img");

    if (image) {
      window.gsap.fromTo(
        image,
        {
          scale: 0.82,
          opacity: 0.3
        },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "bottom 32%",
            scrub: true
          }
        }
      );
    }
  });

  window.gsap.utils.toArray(".route-card__thumb, .brief-card__portrait").forEach(function (element, index) {
    window.gsap.from(element, {
      scale: 0.92,
      opacity: 0,
      duration: 0.7,
      delay: index * 0.03,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 88%"
      }
    });
  });
})();
