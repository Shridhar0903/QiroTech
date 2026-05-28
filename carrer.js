/* =========================
   CAREER ACCORDION
========================= */

const careerItems = document.querySelectorAll(".career-item");

careerItems.forEach((item) => {
  const header = item.querySelector(".career-header");

  header.addEventListener("click", () => {
    // close others
    careerItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    // toggle current
    item.classList.toggle("active");
  });
});
