document.addEventListener("DOMContentLoaded", function () {
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navDots = Array.from(document.querySelectorAll("#dot-nav .dot"));

  // Map: section id -> dot element
  const dotById = new Map(navDots.map(d => [d.getAttribute("href").slice(1), d]));

  // If you have a fixed header, adjust this
  const HEADER_OFFSET = 80;

  // Throttle scroll handler with rAF
  let ticking = false;

  function setActive(id) {
    navDots.forEach(dot =>
      dot.classList.toggle("is-active", dot.getAttribute("href") === `#${id}`)
    );
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      // Use viewport center for robust detection across sections of different heights
      const viewportCenter = window.innerHeight / 2;
      let currentId = sections[0]?.id;

      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        // Consider "active" if the section spans the viewport center (accounting for header)
        if (rect.top - HEADER_OFFSET <= viewportCenter && rect.bottom > viewportCenter) {
          currentId = sec.id;
          break;
        }
      }
      setActive(currentId);
      ticking = false;
    });
  }

  function smoothScroll(target) {
    const el = document.querySelector(target);
    if (!el) return;
    // Manual smooth scroll that respects fixed header
    const y = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
    // Update hash without jump
    history.replaceState(null, "", target);
  }

  // Click + keyboard accessibility
  navDots.forEach((dot) => {
    dot.addEventListener("click", function (event) {
      event.preventDefault();
      smoothScroll(this.getAttribute("href"));
    });
    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        smoothScroll(dot.getAttribute("href"));
      }
    });
    // Make sure dots are focusable for keyboard users
    dot.setAttribute("tabindex", "0");
    dot.setAttribute("role", "link");
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // set initial active dot

  // Brief pulse on load to draw attention (optional; add CSS below)
  const nav = document.getElementById("dot-nav");
  if (nav) {
    nav.classList.add("pulse-once");
    setTimeout(() => nav.classList.remove("pulse-once"), 1200);
  }
});