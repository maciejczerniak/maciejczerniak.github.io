document.addEventListener("DOMContentLoaded", function () {
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navDots = Array.from(document.querySelectorAll("#dot-nav .dot"));
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  const ACTIVE_DOT_CLASS = "bg-gray-800"; // same class you already use
  const TOP_OFFSET = 120;                  // same offset you already use

  let currentIndex = 0;

  // --- helpers ---
  function clamp(n, min, max) {
    return Math.max(min, Math.min(n, max));
  }

  function getCurrentIndexFromScroll() {
    // Find the last section whose top is above the viewport + offset
    let idx = 0;
    sections.forEach((section, i) => {
      const top = section.offsetTop;
      if (window.pageYOffset >= top - TOP_OFFSET) idx = i;
    });
    return idx;
  }

  function setActiveByIndex(index) {
    const id = sections[index]?.id;
    const href = `#${id}`;
    navDots.forEach((dot) => {
      const isActive = dot.getAttribute("href") === href;
      dot.classList.toggle(ACTIVE_DOT_CLASS, isActive);
      dot.setAttribute("aria-current", isActive ? "page" : "false");
    });
  }

  function updateArrows() {
    prevBtn && (prevBtn.disabled = currentIndex <= 0);
    nextBtn && (nextBtn.disabled = currentIndex >= sections.length - 1);
  }

  function smoothScrollToIndex(index) {
    const clamped = clamp(index, 0, sections.length - 1);
    const target = sections[clamped];
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    // Update URL hash without causing a jump
    history.replaceState(null, "", `#${target.id}`);

    currentIndex = clamped;
    setActiveByIndex(currentIndex);
    updateArrows();
  }

  // --- your existing dots still work ---
  navDots.forEach((dot) => {
    dot.addEventListener("click", function (event) {
      event.preventDefault();
      const target = this.getAttribute("href");
      const idx = sections.findIndex((s) => `#${s.id}` === target);
      if (idx !== -1) smoothScrollToIndex(idx);
    });
  });

  // --- new: arrow buttons ---
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      smoothScrollToIndex(currentIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      smoothScrollToIndex(currentIndex + 1);
    });
  }

  // --- keep everything in sync while user scrolls manually ---
  function onScroll() {
    const idx = getCurrentIndexFromScroll();
    if (idx !== currentIndex) {
      currentIndex = idx;
      setActiveByIndex(currentIndex);
      updateArrows();
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // --- init on load (respect hash if present) ---
  const hashIndex = sections.findIndex((s) => `#${s.id}` === location.hash);
  currentIndex = hashIndex !== -1 ? hashIndex : getCurrentIndexFromScroll();
  setActiveByIndex(currentIndex);
  updateArrows();
});
