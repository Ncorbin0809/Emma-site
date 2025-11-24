// --------------- All page JS ---------------
document.addEventListener("DOMContentLoaded", () => {
  // ----- Mobile menu -----
  const toggleButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (toggleButton && mobileMenu) {
    toggleButton.addEventListener("click", (event) => {
      event.stopPropagation();
      mobileMenu.classList.toggle("open");
    });

    mobileMenu.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.addEventListener("click", () => {
      if (mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open");
      }
    });
  }

  // ----- Portfolio filtering (runs only on portfolio page) -----
  const grid = document.getElementById("portfolioGrid");
  const filterBar = document.querySelector(".filter-bar");

  if (!grid || !filterBar) return; // not on portfolio page

  const items = Array.from(grid.querySelectorAll(".masonry-item"));
  const buttons = Array.from(filterBar.querySelectorAll(".filter"));

  // normalize helper
  const norm = (s) => (s || "").toString().toLowerCase().trim();

  function setActiveButton(btn) {
    buttons.forEach((b) => {
      const isActive = b === btn;
      b.classList.toggle("is-active", isActive);
      b.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function applyFilter(tagRaw) {
    const tag = norm(tagRaw);

    items.forEach((item) => {
      const tagList = norm(item.dataset.tags)
        .split(",")
        .map((t) => norm(t))
        .filter(Boolean);

      const show = tag === "all" || tagList.includes(tag);
      item.style.display = show ? "block" : "none";
    });

    // Nudge layout so CSS columns collapse gaps after many hides/shows
    grid.style.transform = "translateZ(0)";
    requestAnimationFrame(() => (grid.style.transform = ""));
  }

  // Clicks on any filter button (works even if you add buttons later)
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    const tag = btn.dataset.filter;
    if (!tag) return;

    setActiveButton(btn);
    applyFilter(tag);
  });

  // Initialize to "All"
  const defaultBtn =
    filterBar.querySelector('.filter[data-filter="all"]') || buttons[0];
  if (defaultBtn) {
    setActiveButton(defaultBtn);
    applyFilter(defaultBtn.dataset.filter);
  }
});
