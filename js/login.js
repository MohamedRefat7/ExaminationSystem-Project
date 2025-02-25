document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const submitButton = document.querySelector(
    "#loginForm button[type='submit']"
  );

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const errorMessage = document.getElementById("errorMessage");

    emailError.textContent = "";
    passwordError.textContent = "";
    errorMessage.textContent = "";

    let isValid = true;

    if (!email) {
      emailError.textContent = "Email is required.";
      isValid = false;
    }

    if (!password) {
      passwordError.textContent = "Password is required.";
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find((user) => user.email === email);

    if (!user) {
      errorMessage.textContent = "No account found. Please sign up first.";
      errorMessage.style.color = "red";
      return;
    }

    if (user.password === password && user.email === email) {
      // Show spinner and disable button
      submitButton.innerHTML = `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Loading...</span>
      `;
      submitButton.disabled = true;

      setTimeout(() => {
        localStorage.setItem("userName", user.firstName + " " + user.lastName);
        window.location.href = "startExam.html";
      }, 2000); // Simulated delay for login process
    } else {
      errorMessage.textContent = "Incorrect email or password.";
      errorMessage.style.color = "red";
    }
  });

  // Remove error messages when the user types
  ["email", "password"].forEach((id) => {
    document.getElementById(id).addEventListener("input", function () {
      document.getElementById(id + "Error").textContent = "";
      errorMessage.textContent = "";
    });
  });
});

// Eye in the form
function togglePasswordVisibility(inputId, icon) {
  const inputField = document.getElementById(inputId);
  const isPassword = inputField.type === "password";
  inputField.type = isPassword ? "text" : "password";
  icon.classList.toggle("fa-eye", isPassword);
  icon.classList.toggle("fa-eye-slash", !isPassword);
}
