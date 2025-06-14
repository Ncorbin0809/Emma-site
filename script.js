document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  // Toggle menu on hamburger click
  toggleButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click from bubbling
    mobileMenu.classList.toggle("open");
  });

  // Prevent menu clicks from bubbling up
  mobileMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Close menu if clicking outside
  document.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) {
      mobileMenu.classList.remove("open");
    }
  });
});
