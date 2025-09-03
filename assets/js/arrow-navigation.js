document.addEventListener("DOMContentLoaded", function () {
  // Include footer if it has an id="footer"
  const sections = Array.from(document.querySelectorAll("section[id], footer[id]"));
  const upBtn    = document.getElementById("arrow-up");
  const downBtn  = document.getElementById("arrow-down");

  // If your header is sticky and overlaps content, keep a small offset (can be 0)
  const TOP_OFFSET = 80;

  let currentIndex = 0;
  let isProgrammatic = false;   // block scroll handler during smooth scroll
  let scrollTimer = null;

  function clamp(n, min, max){ return Math.max(min, Math.min(n, max)); }

  // Robust “what am I on?” using viewport midpoint
  function getCurrentIndexFromScroll() {
    const yMid = (window.pageYOffset || document.documentElement.scrollTop || 0) + window.innerHeight / 2;

    // Find the last section whose top is at/above the viewport midpoint
    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].offsetTop - TOP_OFFSET;
      if (yMid >= top) idx = i; else break;
    }
    return idx;
  }

  function updateArrows(){
    if (upBtn)   upBtn.disabled   = currentIndex <= 0;
    if (downBtn) downBtn.disabled = currentIndex >= sections.length - 1;
  }

  function scrollToIndex(index) {
    const targetIndex = clamp(index, 0, sections.length - 1);
    const target = sections[targetIndex];
    if (!target) return;

    isProgrammatic = true;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${target.id}`);

    // After the scroll settles, unlock the scroll handler
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => { isProgrammatic = false; }, 450);
  }

  // Click handlers
  if (upBtn)   upBtn.addEventListener("click",   () => scrollToIndex(currentIndex - 1));
  if (downBtn) downBtn.addEventListener("click", () => scrollToIndex(currentIndex + 1));

  // Keep in sync while user scrolls manually
  window.addEventListener("scroll", () => {
    if (isProgrammatic) return;           // ignore during our own smooth scroll
    const idx = getCurrentIndexFromScroll();
    if (idx !== currentIndex) {
      currentIndex = idx;
      updateArrows();
    }
  }, { passive: true });

  // Keyboard (optional)
  window.addEventListener("keydown", (e) => {
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); scrollToIndex(currentIndex + 1); }
    if (e.key === "ArrowUp"   || e.key === "PageUp")   { e.preventDefault(); scrollToIndex(currentIndex - 1); }
  });

  // Init (honor hash)
  const hashIndex = sections.findIndex(s => `#${s.id}` === location.hash);
  currentIndex = hashIndex !== -1 ? hashIndex : getCurrentIndexFromScroll();
  updateArrows();
});
