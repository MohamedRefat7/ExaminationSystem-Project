const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Get error message containers
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const errorMessage = document.getElementById("errorMessage");

  // Clear previous error messages
  emailError.textContent = "";
  passwordError.textContent = "";
  errorMessage.textContent = "";

  // Validate required fields
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
    return; // Stop further execution if validation fails
  }

  // Retrieve stored users from localStorage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if there are any users in localStorage
  if (storedUsers.length === 0) {
    errorMessage.textContent = "No account found. Please sign up first.";
    errorMessage.style.color = "red";
    return;
  }

  // Find the user with the matching email
  const user = storedUsers.find((user) => user.email === email);

  if (!user) {
    errorMessage.textContent = "No account found. Please sign up first.";
    errorMessage.style.color = "red";
    return;
  }

  // Validate password
  if (user.password === password && user.email === email) {
    // Redirect to the next page (e.g., startExam.html)
    window.location.href = "startExam.html";
  } else {
    errorMessage.textContent = "Incorrect email or password.";
    errorMessage.style.color = "red";
  }
});

// Clear error messages when the user starts typing
document.getElementById("email").addEventListener("input", function () {
  document.getElementById("emailError").textContent = "";
  document.getElementById("errorMessage").textContent = "";
});

document.getElementById("password").addEventListener("input", function () {
  document.getElementById("passwordError").textContent = "";
});

// Eye in the form
function togglePasswordVisibility(inputId, icon) {
  const inputField = document.getElementById(inputId);
  const isPassword = inputField.type === "password";
  inputField.type = isPassword ? "text" : "password";
  icon.classList.toggle("fa-eye", isPassword);
  icon.classList.toggle("fa-eye-slash", !isPassword);
}
