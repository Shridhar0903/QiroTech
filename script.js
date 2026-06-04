// ===================================================
// Navbar gkasmorphism effect when scroll
// ================================================
const updatednavbar = document.querySelector(".topbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    updatednavbar.classList.add("scrolled");
  } else {
    updatednavbar.classList.remove("scrolled");
  }
});

// ===================================================
// Navbar Colour Change Black and White
// ===================================================

const navbar = document.querySelector(".topbar");
const darkSections = document.querySelectorAll(".dark-section");

function updateNavbarColor() {
  const navbarHeight = navbar.offsetHeight;

  // navbar च्या middle point ची position
  const checkPoint = navbarHeight / 2;

  let isDark = false;

  darkSections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= checkPoint && rect.bottom >= checkPoint) {
      isDark = true;
    }
  });

  navbar.classList.toggle("dark-nav", isDark);
}

window.addEventListener("scroll", updateNavbarColor);
window.addEventListener("resize", updateNavbarColor);

updateNavbarColor();

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
// =========================
// FILTER BUTTONS
// =========================

const filterButtons = document.querySelectorAll(".filter-btn");
const allProjects = document.querySelectorAll(".showcase-card");

function initFilterButtons() {
  if (!filterButtons.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Active button
      filterButtons.forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      // ALL
      if (filter === "all") {
        allProjects.forEach((project) => {
          if (project.classList.contains("extra-project")) {
            project.style.display = "none";
          } else {
            project.style.display = "flex";
          }
        });

        isOpen = false;
        viewAllBtn.innerHTML = `
          <span>VIEW ALL</span>
          <span class="showcase-viewall-icon">↗</span>
        `;

        document.querySelector(".showcase-bottom").style.display = "block";
      }

      // Specific Category
      else {
        allProjects.forEach((project) => {
          if (project.dataset.category === filter) {
            project.style.display = "flex";
          } else {
            project.style.display = "none";
          }
        });

        // Hide View All button
        document.querySelector(".showcase-bottom").style.display = "none";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initFilterButtons);
// =========================
// View All Projects
// =========================
const viewAllBtn = document.getElementById("viewAllBtn");
const extraProjects = document.querySelectorAll(".extra-project");

let isOpen = false;

viewAllBtn.addEventListener("click", function (e) {
  e.preventDefault();

  isOpen = !isOpen;

  extraProjects.forEach((project) => {
    project.style.display = isOpen ? "flex" : "none";
  });

  viewAllBtn.textContent = isOpen ? "SHOW LESS" : "VIEW ALL PROJECTS";
});

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
