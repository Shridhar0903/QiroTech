// ================================
// SERVICES HOVER + ACTIVE EFFECT
// ================================

const serviceItems = document.querySelectorAll(".service-item");

serviceItems.forEach((item) => {
  // HOVER ACTIVE
  item.addEventListener("mouseenter", () => {
    serviceItems.forEach((el) => {
      el.classList.remove("active");
    });

    item.classList.add("active");
  });
});

// ===============================
// PROCESS TIMELINE ANIMATION
// SMOOTH VERSION
// ===============================

const mainTitle = document.getElementById("mainTitle");
const processSection = document.getElementById("processSection");
const glowingLine = document.getElementById("glowingLine");
const movingDot = document.getElementById("movingDot");
const steps = document.querySelectorAll(".step");

const timelineSection = document.querySelector(".process-timeline");

const scrollWrapper = document.querySelector(".scroll-wrapper");

/* PATH LENGTH */
const pathLength = glowingLine.getTotalLength();

glowingLine.style.strokeDasharray = pathLength;
glowingLine.style.strokeDashoffset = pathLength;

/* ===============================
   SMOOTH VARIABLES
=============================== */

let currentProgress = 0;
let targetProgress = 0;

/* ===============================
   GET SCROLL VALUES
=============================== */

function updateScrollValues() {
  const rect = processSection.getBoundingClientRect();

  const windowHeight = window.innerHeight;

  let scrollPercent = (windowHeight / 2 - rect.top) / rect.height;

  if (scrollPercent < 0) {
    scrollPercent = 0;
  }

  if (scrollPercent > 1) {
    scrollPercent = 1;
  }

  targetProgress = scrollPercent;
}

/* ===============================
   SMOOTH ANIMATION LOOP
=============================== */

function animate() {
  /* SMOOTH INTERPOLATION */
  currentProgress += (targetProgress - currentProgress) * 0.08;

  const progress = currentProgress * 100;

  // ===============================
  // TITLE FADE
  // ===============================

  const titleRect = mainTitle.getBoundingClientRect();

  const windowHeight = window.innerHeight;

  let titleFade = 1 - (windowHeight - titleRect.top) / 800;

  if (titleFade > 1) {
    titleFade = 1;
  }

  if (titleFade < 0) {
    titleFade = 0;
  }

  mainTitle.style.opacity = titleFade;

  mainTitle.style.transform = `translateY(${(1 - titleFade) * -40}px)`;

  // ===============================
  // LINE ANIMATION
  // ===============================

  glowingLine.style.strokeDashoffset =
    pathLength - currentProgress * pathLength;

  // ===============================
  // DOT MOVEMENT
  // ===============================

  movingDot.style.offsetDistance = progress + "%";

  // ===============================
  // STEP VISIBILITY
  // ===============================

  steps.forEach((step) => {
    const showAt = parseFloat(step.getAttribute("data-show"));

    const hideAt = parseFloat(step.getAttribute("data-hide"));

    if (progress >= showAt && progress <= hideAt) {
      step.classList.add("visible");
    } else {
      step.classList.remove("visible");
    }
  });

  // ===============================
  // SMOOTH 3D DEPTH EFFECT
  // ===============================

  const scale = 1 - currentProgress * 0.12;

  const translateY = currentProgress * -80;

  const rotateX = currentProgress * 5;

  scrollWrapper.style.transform = `
    perspective(1600px)
    translateY(${translateY}px)
    scale(${scale})
    rotateX(${rotateX}deg)
    `;

  requestAnimationFrame(animate);
}

/* ===============================
   EVENTS
=============================== */

window.addEventListener("scroll", updateScrollValues);

window.addEventListener("resize", updateScrollValues);

/* INIT */
updateScrollValues();
animate();
