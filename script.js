// ===========================================
// Animation
// ===========================================
// =========================
// REVEAL ANIMATION
// =========================

const reveals = document.querySelectorAll(
  ".reveal-up, .reveal-left, .reveal-right",
);

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
// =========================
// MENU OVERLAY
// =========================
const menuBtn = document.querySelector(".menu-btn");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");

function initMenuOverlay() {
  if (!menuBtn || !menuOverlay || !menuClose) return;

  // OPEN MENU
  menuBtn.addEventListener("click", () => {
    menuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // CLOSE MENU
  menuClose.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  // CLOSE WHEN CLICK OUTSIDE
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // CLOSE WITH ESC KEY
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  initMenuOverlay();
});

// =========================
// HERO SECTION ELEMENTS
// =========================
const orbStage = document.getElementById("orbStage");
const orbShell = document.getElementById("orbShell");
const orbShadow = document.getElementById("orbShadow");
const header = document.querySelector(".topbar");

// =========================
// HELPERS
// =========================
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// =========================
// HERO ORB ANIMATION ON SCROLL
// =========================
function animateOrbOnScroll() {
  if (!orbStage || !orbShell || !orbShadow) return;

  const headerHeight = header ? header.offsetHeight : 0;
  const heroHeight = window.innerHeight - headerHeight;

  const scrollY = window.scrollY;
  const progress = Math.min(scrollY / (heroHeight * 0.95), 1);

  // movement
  const moveY = progress * (window.innerWidth < 768 ? 180 : 420);

  // scale
  const scale = 1 - progress * (window.innerWidth < 768 ? 0.34 : 0.54);

  // rotate
  const rotate = progress * 8;

  orbStage.style.transform = `translateY(${moveY}px) scale(${scale}) rotate(${rotate}deg)`;

  // morphing blob
  const r1 = 50 - progress * 8;
  const r2 = 50 + progress * 8;
  const r3 = 50 + progress * 4;
  const r4 = 50 - progress * 4;

  orbShell.style.borderRadius = `${r1}% ${r2}% ${r3}% ${r4}% /
     ${50 - progress * 2}% ${50 - progress * 8}%
     ${50 + progress * 10}% ${50 + progress * 2}%`;

  // lighting
  orbShell.style.filter = `brightness(${1 - progress * 0.03})
     saturate(${1.02 + progress * 0.03})`;

  // shadow
  const shadowScale = 1 - progress * 0.28;

  orbShadow.style.transform = `translateX(-50%) scale(${shadowScale})`;

  orbShadow.style.opacity = `${0.34 - progress * 0.1}`;
}

// =========================
// HERO ORB MOUSE MOVEMENT
// =========================
function animateOrbOnMouse(e) {
  if (!orbShell) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;

  orbShell.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
}

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  animateOrbOnScroll();
});

// =========================
// EVENTS
// =========================
window.addEventListener("scroll", animateOrbOnScroll, {
  passive: true,
});

window.addEventListener("resize", animateOrbOnScroll);

window.addEventListener("load", animateOrbOnScroll);

window.addEventListener("mousemove", animateOrbOnMouse);

// =========================
// FILTER BUTTONS
// =========================
const filterButtons = document.querySelectorAll(".filter-btn");

if (filterButtons.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

// =========================
// FOOTER SCROLL TOP
// =========================
const footerScrollTop = document.querySelector(".footer-mdx-scrolltop");

if (footerScrollTop) {
  footerScrollTop.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
// =======================================================
window.addEventListener("scroll", animateFooterLogos, { passive: true });
window.addEventListener("resize", animateFooterLogos);
window.addEventListener("load", animateFooterLogos);

const footerLogos = document.querySelectorAll(".footer-mdx-logo");
const footerSection = document.querySelector(".footer-mdx");

// =========================
// FOOTER LOGO ANIMATION
// =========================
function animateFooterLogos() {
  if (!footerSection || !footerLogos.length) return;

  const rect = footerSection.getBoundingClientRect();
  const triggerPoint = window.innerHeight * 0.78;

  if (rect.top <= triggerPoint && rect.bottom >= 120) {
    footerLogos.forEach((logo) => logo.classList.add("show"));
  } else {
    footerLogos.forEach((logo) => logo.classList.remove("show"));
  }
}
// =====================================================================================
/* =========================================================
   HERO Next section SCROLL ANIMATION
========================================================= */

const heroSection = document.querySelector(".hero-section");

function heroScrollAnimation() {
  if (!heroSection) return;

  const rect = heroSection.getBoundingClientRect();

  /* SCROLL PROGRESS */

  const progress = Math.min(
    Math.max((window.innerHeight - rect.top) / window.innerHeight, 0),
    1,
  );

  /* CIRCLE SCALE */

  const scaleValue = 0.55 + progress * 0.55;

  /* APPLY SCALE */

  heroSection.style.setProperty("--heroScale", scaleValue);

  /* CONTENT REVEAL */

  if (progress > 0.35) {
    heroSection.classList.add("active");
  } else {
    heroSection.classList.remove("active");
  }
}

/* =========================================================
   EVENTS
========================================================= */

window.addEventListener("scroll", heroScrollAnimation);

window.addEventListener("load", heroScrollAnimation);

// =====================================================================================

/* =========================
   IDEAS SECTION ANIMATION
========================= */

const ideasSection = document.querySelector(".ideas-section");

function animateIdeasSection() {
  if (!ideasSection) return;

  const rect = ideasSection.getBoundingClientRect();

  const triggerPoint = window.innerHeight * 0.43;

  if (rect.top < triggerPoint) {
    ideasSection.classList.add("active");
  } else {
    ideasSection.classList.remove("active");
  }
}

window.addEventListener("scroll", animateIdeasSection);

window.addEventListener("load", animateIdeasSection);
