// ===========================================
// Circle technology Animation
// ===========================================

const buildSection = document.getElementById("buildStackSection");

function animateBuildSection() {
  if (!buildSection) return;

  const rect = buildSection.getBoundingClientRect();

  if (rect.top <= 0 && rect.bottom >= window.innerHeight / 1.3) {
    buildSection.classList.add("active");
  } else {
    buildSection.classList.remove("active");
  }
}

window.addEventListener("scroll", animateBuildSection);

window.addEventListener("load", animateBuildSection);

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

window.addEventListener("load", revealOnScroll);

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

  // CLOSE WITH ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menuOverlay.classList.remove("active");

      document.body.style.overflow = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", initMenuOverlay);

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
// HERO ORB SCROLL ANIMATION
// =========================

function animateOrbOnScroll() {
  if (window.innerWidth <= 1024) {
    orbStage.style.transform = "";
    orbShell.style.borderRadius = "";
    orbShell.style.filter = "";
    orbShadow.style.transform = "";
    orbShadow.style.opacity = "";
    return;
  }
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

  orbStage.style.transform = `
    translateY(${moveY}px)
    scale(${scale})
    rotate(${rotate}deg)
  `;

  // morphing blob
  const r1 = 50 - progress * 8;

  const r2 = 50 + progress * 8;

  const r3 = 50 + progress * 4;

  const r4 = 50 - progress * 4;

  orbShell.style.borderRadius = `
    ${r1}% ${r2}% ${r3}% ${r4}% /
    ${50 - progress * 2}% ${50 - progress * 8}%
    ${50 + progress * 10}% ${50 + progress * 2}%
  `;

  // lighting
  orbShell.style.filter = `
    brightness(${1 - progress * 0.03})
    saturate(${1.02 + progress * 0.03})
  `;

  // shadow
  const shadowScale = 1 - progress * 0.28;

  orbShadow.style.transform = `
    translateX(-50%)
    scale(${shadowScale})
  `;

  orbShadow.style.opacity = `${0.34 - progress * 0.1}`;
}

window.addEventListener("scroll", animateOrbOnScroll, { passive: true });

window.addEventListener("resize", animateOrbOnScroll);

window.addEventListener("load", animateOrbOnScroll);

// =========================
// HERO ORB MOUSE MOVEMENT
// =========================

function animateOrbOnMouse(e) {
  if (!orbShell) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 12;

  const y = (e.clientY / window.innerHeight - 0.5) * 12;

  orbShell.style.transform = `
    translate(${x * 0.2}px, ${y * 0.2}px)
  `;
}

window.addEventListener("mousemove", animateOrbOnMouse);

// =========================
// FILTER BUTTONS
// =========================

const filterButtons = document.querySelectorAll(".filter-btn");

function initFilterButtons() {
  if (!filterButtons.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));

      btn.classList.add("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", initFilterButtons);

// =========================
// FOOTER SCROLL TOP
// =========================

const footerScrollTop = document.querySelector(".footer-mdx-scrolltop");

function initFooterScrollTop() {
  if (!footerScrollTop) return;

  footerScrollTop.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

document.addEventListener("DOMContentLoaded", initFooterScrollTop);

// =========================
// FOOTER LOGO ANIMATION
// =========================

const footerLogos = document.querySelectorAll(".footer-mdx-logo");

const footerSection = document.querySelector(".footer-mdx");

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

window.addEventListener("scroll", animateFooterLogos, { passive: true });

window.addEventListener("resize", animateFooterLogos);

window.addEventListener("load", animateFooterLogos);

// =====================================================================================
// HERO NEXT SECTION SCROLL ANIMATION
// =====================================================================================

const heroSection = document.querySelector(".hero-section");

function heroScrollAnimation() {
  if (!heroSection) return;

  const rect = heroSection.getBoundingClientRect();

  // progress
  const progress = Math.min(
    Math.max((window.innerHeight - rect.top) / window.innerHeight, 0),
    1,
  );

  // white circle scale
  const scaleValue = 0.55 + progress * 0.55;

  heroSection.style.setProperty("--heroScale", scaleValue);

  // aura animation
  const auraScale = 0.72 + progress * 0.4;

  const auraMove = progress * -120;

  const innerMove = progress * -60;

  heroSection.style.setProperty("--auraScale", auraScale);

  heroSection.style.setProperty("--auraMove", `${auraMove}px`);

  heroSection.style.setProperty("--auraInnerMove", `${innerMove}px`);

  heroSection.style.setProperty("--auraInnerScale", 1 + progress * 0.08);

  // reveal content
  if (progress > 0.35) {
    heroSection.classList.add("active");
  } else {
    heroSection.classList.remove("active");
  }
}

window.addEventListener("scroll", heroScrollAnimation);

window.addEventListener("load", heroScrollAnimation);

// =====================================================================================
// IDEAS SECTION ANIMATION
// =====================================================================================

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

// =====================================================================================
// SHOWREEL VIDEO SCALE ANIMATION
// =====================================================================================

const showreelCard = document.getElementById("showreelCard");

function animateShowreelCard() {
  if (!showreelCard) return;

  const rect = showreelCard.getBoundingClientRect();

  const windowHeight = window.innerHeight;

  // progress
  let progress = (windowHeight - rect.top) / (windowHeight * 1.2);

  progress = clamp(progress, 0, 1);

  // scale
  const scale = 0.72 + progress * 0.28;

  // move
  const moveY = 140 - progress * 140;

  // radius
  const radius = 34 - progress * 34;

  // apply
  showreelCard.style.setProperty("--videoScale", scale);

  showreelCard.style.setProperty("--videoMove", `${moveY}px`);

  showreelCard.style.borderRadius = `${radius}px`;
}

window.addEventListener("scroll", animateShowreelCard, { passive: true });

window.addEventListener("resize", animateShowreelCard);

window.addEventListener("load", animateShowreelCard);
