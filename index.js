const menuToggle = document.getElementById("menu-toggle");
const menuOpen = document.getElementById("menu-open");
const closeButton = document.getElementById("close-button");

function toggleMenu() {
  menuOpen.classList.toggle("active");
  menuToggle.classList.toggle("nonactive");
}

menuToggle.addEventListener("click", toggleMenu);
closeButton.addEventListener("click", toggleMenu);
