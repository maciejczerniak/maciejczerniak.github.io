document.addEventListener("DOMContentLoaded", () => {
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navDots = Array.from(document.querySelectorAll("#dot-nav .dot"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Map href -> element once
  const targetMap = new Map(
    navDots
      .map((dot) => [dot.getAttribute("href"), document.querySelector(dot.getAttribute("href"))])
      .filter(([, el]) => el) // keep only existing
  );

  function setActive(id) {
    const href = `#${id}`;
    navDots.forEach((dot) => {
      const isActive = dot.getAttribute("href") === href;
      dot.classList.toggle("bg-gray-800", isActive);
      dot.setAttribute("aria-current", isActive ? "page" : "false");
    });
  }

  // Click/keyboard: smooth scroll (respect reduced motion), then focus section
  function goTo(href) {
    const el = targetMap.get(href);
    if (!el) return;

    if (!prefersReducedMotion && "scrollIntoView" in el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      el.scrollIntoView(); // instant
    }

    // Move focus for keyboard/screen-reader users after the scroll completes
    // Use a rAF to allow layout to settle.
    requestAnimationFrame(() => el.focus({ preventScroll: true }));
    history.replaceState(null, "", href); // update URL hash without jump
  }

  navDots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      goTo(dot.getAttribute("href"));
    });
    // Space/Enter support is automatic for links, but this ensures consistency if rendered as buttons
    dot.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        goTo(dot.getAttribute("href"));
      }
    });
  });

  // Observe which section is centered in the viewport
  // Tweak rootMargin/threshold to match your header height and feel.
  const observer = new IntersectionObserver(
    (entries) => {
      // Pick the most visible intersecting section
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) setActive(visible.target.id);
    },
    {
      // If you have a fixed header ~120px, push the top boundary down.
      root: null,
      rootMargin: "-120px 0px -40% 0px",
      threshold: [0.4, 0.6, 0.8],
    }
  );

  sections.forEach((s) => observer.observe(s));

  // On load: honor hash or default to the first section
  const initialHash = window.location.hash && targetMap.has(window.location.hash) ? window.location.hash : `#${sections[0]?.id}`;
  if (initialHash) {
    setActive(initialHash.replace("#", ""));
  }
});
