const menuToggle = document.getElementById("menu-toggle");
const menuOpen = document.getElementById("menu-open");
const closeButton = document.getElementById("close-button");
const contactForm = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

function toggleMenu() {
  menuOpen.classList.toggle("active");
  menuToggle.classList.toggle("nonactive");
}

function showAlert(type, duration = 5000) {
  successMessage.style.display = "none";
  errorMessage.style.display = "none";

  if (type === "success") {
    successMessage.style.display = "block";
  } else if (type === "error") {
    errorMessage.style.display = "block";
  }

  setTimeout(() => {
    successMessage.style.display = "none";
    errorMessage.style.display = "none";
  }, duration);
}

menuToggle.addEventListener("click", toggleMenu);
closeButton.addEventListener("click", toggleMenu);
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = document.getElementById("submit-button");
  const originalText = submitButton.textContent;

  try {
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      body: new FormData(contactForm),
    });

    const data = await response.json();

    if (response.status === 200) {
      showAlert("success");
      contactForm.reset();
    } else {
      throw new Error(data.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Error:", error);
    showAlert("error");
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
});
