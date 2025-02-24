const menuToggle = document.getElementById("menu-toggle");
const menuOpen = document.getElementById("menu-open");
const closeButton = document.getElementById("close-button");
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

function toggleMenu() {
  menuOpen.classList.toggle("active");
  menuToggle.classList.toggle("nonactive");
}

const setError = (input, message) => {
  const formControl = input.parentElement;
  const errorDisplay = formControl.querySelector(".error");

  errorDisplay.innerText = message;
  formControl.classList.add("error");
  formControl.classList.remove("success");
  return false;
};

const setSuccess = (input) => {
  const formControl = input.parentElement;
  const errorDisplay = formControl.querySelector(".error");

  errorDisplay.innerText = "";
  formControl.classList.remove("error");
  formControl.classList.add("success");
  return true;
};

const isEmailValid = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validateInput = (input, rules) => {
  const value = input.value.trim();

  if (value === "") {
    return setError(
      input,
      `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required`
    );
  }

  if (rules.minLength && value.length < rules.minLength) {
    return setError(
      input,
      `${
        input.id.charAt(0).toUpperCase() + input.id.slice(1)
      } should be at least ${rules.minLength} characters long`
    );
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return setError(input, rules.errorMessage);
  }

  return setSuccess(input);
};

const validateInputs = () => {
  const namevalid = validateInput(nameInput, {
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z ]+$/,
    errorMessage: "Name should only contain letters and spaces",
  });

  const emailValid = validateInput(emailInput, {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: "Please enter a valid email",
  });

  const messageValid = validateInput(messageInput, {
    minLength: 10,
    maxLength: 500,
  });

  return namevalid && emailValid && messageValid;
};

menuToggle.addEventListener("click", toggleMenu);
closeButton.addEventListener("click", toggleMenu);

[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener("input", () => {
    const rules = {
      name: {
        minLength: 3,
        maxLength: 50,
        pattern: /^[a-zA-Z ]+$/,
        errorMessage: "Name should only contain letters and spaces",
      },
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Please enter a valid email",
      },
      message: {
        minLength: 10,
        maxLength: 500,
      },
    };

    validateInput(input, rules[input.id]);
  });
});

function createToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icon = document.createElement("i");
  icon.className =
    type === "success"
      ? "fa-solid fa-circle-check"
      : "fa-solid fa-circle-exclamation";

  const messageDiv = document.createElement("div");
  messageDiv.className = "toast-message";
  messageDiv.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(messageDiv);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (validateInputs()) {
    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        createToast("Message sent successfully!", "success");
        contactForm.reset();
        document.querySelectorAll(".form-group").forEach((group) => {
          group.classList.remove("success");
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      createToast("Failed to send message. Please try again later.", "error");
    }
  }
});
