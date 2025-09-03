document.addEventListener("DOMContentLoaded", function () {
  const sections = Array.from(document.querySelectorAll("section[id], footer[id]"));
  const upBtn = document.getElementById("arrow-up");
  const downBtn = document.getElementById("arrow-down");

  const TOP_OFFSET = 0; // adjust if you have a fixed header
  let currentIndex = 0;

  function clamp(n, min, max) {
    return Math.max(min, Math.min(n, max));
  }

  function getCurrentIndexFromScroll() {
    let idx = 0;
    sections.forEach((section, i) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - TOP_OFFSET) idx = i;
    });
    return idx;
  }

  function updateArrows() {
    upBtn.disabled = currentIndex <= 1;
    downBtn.disabled = currentIndex >= sections.length - 1;
  }

  function scrollToIndex(index) {
    const clamped = clamp(index, 0, sections.length - 1);
    const target = sections[clamped];
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${target.id}`);
    currentIndex = clamped;
    updateArrows();
  }

  // Arrow click events
  upBtn.addEventListener("click", () => scrollToIndex(currentIndex - 1));
  downBtn.addEventListener("click", () => scrollToIndex(currentIndex + 1));

  // Sync while scrolling manually
  window.addEventListener("scroll", () => {
    const idx = getCurrentIndexFromScroll();
    if (idx !== currentIndex) {
      currentIndex = idx;
      updateArrows();
    }
  }, { passive: true });

  // Init
  const hashIndex = sections.findIndex(s => `#${s.id}` === location.hash);
  currentIndex = hashIndex !== -1 ? hashIndex : getCurrentIndexFromScroll();
  updateArrows();
});
