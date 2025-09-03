document.addEventListener("DOMContentLoaded", function () {
  const sections  = Array.from(document.querySelectorAll("section"));
  const upBtn     = document.getElementById("arrow-up");
  const downBtn   = document.getElementById("arrow-down");

  const TOP_OFFSET = 120; // same as your original code
  let currentIndex = 0;

  // --- helpers ---
  function clamp(n, min, max){ return Math.max(min, Math.min(n, max)); }

  function getCurrentIndexFromScroll(){
    // Find the last section whose top is above the viewport + offset
    let idx = 0;
    sections.forEach((section, i) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - TOP_OFFSET) idx = i;
    });
    return idx;
  }

  function updateArrows(){
    if (upBtn)   upBtn.disabled   = currentIndex <= 0;
    if (downBtn) downBtn.disabled = currentIndex >= sections.length - 1;
  }

  function scrollToIndex(index){
    const clamped = clamp(index, 0, sections.length - 1);
    const target  = sections[clamped];
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
    // optional: reflect in URL without jump
    history.replaceState(null, "", `#${target.id || ""}`);

    currentIndex = clamped;
    updateArrows();
  }

  // --- click handlers ---
  if (upBtn)   upBtn.addEventListener("click",  () => scrollToIndex(currentIndex - 1));
  if (downBtn) downBtn.addEventListener("click",() => scrollToIndex(currentIndex + 1));

  // --- keyboard shortcuts: Up/Down or PageUp/PageDown ---
  window.addEventListener("keydown", (e) => {
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    if (e.key === "ArrowDown" || e.key === "PageDown"){ e.preventDefault(); scrollToIndex(currentIndex + 1); }
    if (e.key === "ArrowUp"   || e.key === "PageUp")  { e.preventDefault(); scrollToIndex(currentIndex - 1); }
  });

  // --- keep arrows in sync during manual scroll ---
  function onScroll(){
    const idx = getCurrentIndexFromScroll();
    if (idx !== currentIndex){
      currentIndex = idx;
      updateArrows();
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // --- init (honor hash if present) ---
  const hash = location.hash;
  const hashIndex = hash ? sections.findIndex(s => `#${s.id}` === hash) : -1;
  currentIndex = hashIndex !== -1 ? hashIndex : getCurrentIndexFromScroll();
  updateArrows();
});
