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
