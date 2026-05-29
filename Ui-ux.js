/* =========================================
   REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal-up");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < triggerBottom) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/* =========================================
   MOUSE PARALLAX
========================================= */

const parallaxArea = document.getElementById("parallaxArea");

const layers = document.querySelectorAll(".parallax-layer");

parallaxArea.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  const rect = parallaxArea.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const moveX = (x - centerX) / 25;
  const moveY = (y - centerY) / 25;

  layers.forEach((layer) => {
    const speed = layer.getAttribute("data-speed");

    const translateX = (moveX * speed) / 50;
    const translateY = (moveY * speed) / 50;

    layer.style.transform = `translate(${translateX}px, ${translateY}px)`;
  });
});

/* =========================================
   RESET POSITION
========================================= */

parallaxArea.addEventListener("mouseleave", () => {
  layers.forEach((layer) => {
    layer.style.transform = "translate(0px,0px)";
  });
});
