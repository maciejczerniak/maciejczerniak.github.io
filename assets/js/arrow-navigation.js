document.addEventListener("DOMContentLoaded", function () {
  // All sections you want to step through
  const sections = Array.from(document.querySelectorAll("section[id]")); // footer id not required
  const upBtn    = document.getElementById("arrow-up");
  const downBtn  = document.getElementById("arrow-down");

  const TOP_OFFSET = 50; // adjust for your fixed navbar height if needed
  let currentIndex = 0;          // 0..sections.length ; note: length == "bottom"
  let isProgrammatic = false;    // block scroll handler during our own smooth scroll
  let scrollTimer = null;

  function clamp(n, min, max) { return Math.max(min, Math.min(n, max)); }

  // Robust current section using viewport midpoint
  function getCurrentIndexFromScroll() {
    const yMid = (window.pageYOffset || document.documentElement.scrollTop || 0) + window.innerHeight / 2;

    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].offsetTop - TOP_OFFSET;
      if (yMid >= top) idx = i; else break;
    }
    return idx;
  }

  function atPageBottom() {
    const doc = document.documentElement;
    return window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
  }

  function updateArrows() {
    // allow one extra "down" step to the bottom
    upBtn.disabled   = currentIndex <= 0;
    downBtn.disabled = currentIndex >= sections.length;
  }

  function scrollToIndex(index) {
    // index can be 0..sections.length ; where length means "scroll to bottom"
    const targetIndex = clamp(index, 0, sections.length);
    isProgrammatic = true;

    if (targetIndex === sections.length) {
      // one more step beyond last section → bottom of page
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
      // no hash to set here
    } else {
      const target = sections[targetIndex];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${target.id}`);
      }
    }

    // unlock scroll handler shortly after smooth scroll finishes
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => { isProgrammatic = false; }, 450);
  }

  // Click handlers
  upBtn.addEventListener("click",   () => scrollToIndex(currentIndex - 1));
  downBtn.addEventListener("click", () => scrollToIndex(currentIndex + 1));

  // Sync while user scrolls manually
  window.addEventListener("scroll", () => {
    if (isProgrammatic) return;

    if (atPageBottom()) {
      currentIndex = sections.length; // "bottom" marker
    } else {
      currentIndex = getCurrentIndexFromScroll();
    }
    updateArrows();
  }, { passive: true });

  // Keyboard shortcuts (optional)
  window.addEventListener("keydown", (e) => {
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); scrollToIndex(currentIndex + 1); }
    if (e.key === "ArrowUp"   || e.key === "PageUp")   { e.preventDefault(); scrollToIndex(currentIndex - 1); }
  });

  // Init (honor hash if present; if page loads at bottom, treat as bottom)
  if (atPageBottom()) {
    currentIndex = sections.length;
  } else {
    const hashIndex = sections.findIndex(s => `#${s.id}` === location.hash);
    currentIndex = hashIndex !== -1 ? hashIndex : getCurrentIndexFromScroll();
  }
  updateArrows();
});
