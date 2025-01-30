const loginForm = document.getElementById("loginForm");

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

  if (storedUsers.length === 0) {
    errorMessage.textContent = "No account found. Please sign up first.";
    errorMessage.style.color = "red";
    return;
  }

  const user = storedUsers.find((user) => user.email === email);

  if (!user) {
    errorMessage.textContent = "No account found. Please sign up first.";
    errorMessage.style.color = "red";
    return;
  }

  if (user.password === password && user.email === email) {
    localStorage.setItem("userName", user.firstName + " " + user.lastName);
    window.location.href = "startExam.html";
  } else {
    errorMessage.textContent = "Incorrect email or password.";
    errorMessage.style.color = "red";
  }
});

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
