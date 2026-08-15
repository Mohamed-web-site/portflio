/* =========================================
   MOHAMED STORE — SCRIPT.JS
   PART 1 / 3
========================================= */

"use strict";


/* =========================================
   DOM HELPERS
========================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


/* =========================================
   PRELOADER
========================================= */

window.addEventListener("load", () => {

  const preloader = $("#preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 500);
  }

});


/* =========================================
   HEADER SCROLL
========================================= */

const header = $(".header");

function updateHeader() {

  if (!header) return;

  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

}

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


/* =========================================
   MOBILE MENU
========================================= */

const mobileToggle = $(".mobile-toggle");
const navMenu = $(".nav-menu");

if (mobileToggle && navMenu) {

  mobileToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const opened =
      navMenu.classList.contains("open");

    mobileToggle.setAttribute(
      "aria-expanded",
      opened
    );

    const lines =
      $$("span", mobileToggle);

    if (opened) {

      if (lines[0])
        lines[0].style.transform =
          "translateY(5px) rotate(45deg)";

      if (lines[1])
        lines[1].style.opacity = "0";

      if (lines[2])
        lines[2].style.transform =
          "translateY(-5px) rotate(-45deg)";

    } else {

      lines.forEach(line => {
        line.style.transform = "";
        line.style.opacity = "";
      });

    }

  });


  /* Close menu after clicking link */

  $$(".nav-link", navMenu).forEach(link => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("open");

      mobileToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      $$("span", mobileToggle).forEach(line => {
        line.style.transform = "";
        line.style.opacity = "";
      });

    });

  });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
  $$("section[id]");

const navLinks =
  $$(".nav-link");

function updateActiveNav() {

  let current = "";

  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 180;

    if (
      window.scrollY >= sectionTop
    ) {
      current = section.id;
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    const href =
      link.getAttribute("href");

    if (
      href === `#${current}`
    ) {
      link.classList.add("active");
    }

  });

}

window.addEventListener(
  "scroll",
  updateActiveNav,
  { passive: true }
);

updateActiveNav();


/* =========================================
   THEME SYSTEM
========================================= */

const themeToggle =
  $(".themeToggle");

const THEME_KEY =
  "mohamed-store-theme";

function applyTheme(theme) {

  if (theme === "light") {

    document.body.classList.add("light");

  } else {

    document.body.classList.remove("light");

  }

  if (!themeToggle) return;

  const icon =
    $("i", themeToggle);

  if (!icon) return;

  if (theme === "light") {

    icon.className =
      "fa-solid fa-moon";

    themeToggle.setAttribute(
      "aria-label",
      "Switch to dark mode"
    );

  } else {

    icon.className =
      "fa-solid fa-sun";

    themeToggle.setAttribute(
      "aria-label",
      "Switch to light mode"
    );

  }

}


/* Load saved theme */

const savedTheme =
  localStorage.getItem(THEME_KEY);

if (savedTheme) {

  applyTheme(savedTheme);

} else {

  const prefersLight =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

  applyTheme(
    prefersLight
      ? "light"
      : "dark"
  );

}


/* Toggle theme */

if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    () => {

      const isLight =
        document.body.classList.contains(
          "light"
        );

      const newTheme =
        isLight
          ? "dark"
          : "light";

      applyTheme(newTheme);

      localStorage.setItem(
        THEME_KEY,
        newTheme
      );

    }
  );

}


/* =========================================
   SMOOTH ANCHOR SCROLL
========================================= */

$$('a[href^="#"]').forEach(link => {

  link.addEventListener(
    "click",
    event => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        $(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );

});


/* =========================================
   BACK TO TOP
========================================= */

const backTop =
  $(".back-top");

if (backTop) {

  backTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
  $$(
    ".service-item, .project-card, " +
    ".pricing-card, .why-item, " +
    ".contact-form, .cta-box"
  );

if (
  "IntersectionObserver"
  in window
) {

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.style.opacity =
              "1";

            entry.target.style.transform =
              "translateY(0)";

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );

  revealElements.forEach(
    element => {

      element.style.opacity = "0";

      element.style.transform =
        "translateY(25px)";

      element.style.transition =
        "opacity .7s ease, " +
        "transform .7s ease";

      revealObserver.observe(element);

    }
  );

}


/* =========================================
   SERVICE HOVER EFFECT
========================================= */

$$(".service-item").forEach(
  item => {

    item.addEventListener(
      "mouseenter",
      () => {

        item.style.zIndex = "2";

      }
    );

    item.addEventListener(
      "mouseleave",
      () => {

        item.style.zIndex = "";

      }
    );

  }
);


/* =========================================
   DYNAMIC CURRENT YEAR
========================================= */

const yearElements =
  $$("[data-year]");

yearElements.forEach(
  element => {

    element.textContent =
      new Date().getFullYear();

  }
);


/* =========================================
   PROTECT AGAINST EMPTY LINKS
========================================= */

$$('a[href="#"]').forEach(
  link => {

    link.addEventListener(
      "click",
      event => {
        event.preventDefault();
      }
    );

  }
);


/* =========================================
   KEYBOARD ESCAPE
========================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape")
      return;

    if (navMenu) {
      navMenu.classList.remove(
        "open"
      );
    }

  }
);


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
  "%c MOHAMED STORE ",
  "background:#a8e6c5;color:#07100b;" +
  "padding:8px 14px;" +
  "border-radius:8px;" +
  "font-weight:800;"
);

console.log(
  "Website initialized successfully."
);