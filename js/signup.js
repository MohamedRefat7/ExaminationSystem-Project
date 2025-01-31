document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");
  const submitButton = document.querySelector(
    "#signupForm button[type='submit']"
  );

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    document.querySelectorAll(".error-message").forEach((errorDiv) => {
      errorDiv.textContent = "";
    });

    let isValid = true;

    const NamePattern = /^[a-zA-Z]+$/;
    if (firstName.value.trim() === "") {
      document.getElementById("firstNameError").textContent =
        "First name is required.";
      isValid = false;
    } else if (!NamePattern.test(firstName.value)) {
      document.getElementById("firstNameError").textContent =
        "First name must contain only letters.";
      isValid = false;
    } else if (firstName.value.length < 3 || firstName.value.length > 20) {
      document.getElementById("firstNameError").textContent =
        "First name must be between 3 and 20 characters.";
      isValid = false;
    }

    if (lastName.value.trim() === "") {
      document.getElementById("lastNameError").textContent =
        "Last name is required.";
      isValid = false;
    } else if (!NamePattern.test(lastName.value)) {
      document.getElementById("lastNameError").textContent =
        "Last name must contain only letters.";
      isValid = false;
    } else if (lastName.value.length < 3 || lastName.value.length > 20) {
      document.getElementById("lastNameError").textContent =
        "Last name must be between 3 and 20 characters.";
      isValid = false;
    }

    const emailPattern =
      /^[a-zA-Z]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value.trim() === "") {
      document.getElementById("emailError").textContent = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(email.value)) {
      document.getElementById("emailError").textContent =
        "Enter a valid email format start with name@example.com";
      isValid = false;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (password.value.trim() === "") {
      document.getElementById("passwordError").textContent =
        "Password is required.";
      isValid = false;
    } else if (!passwordPattern.test(password.value)) {
      document.getElementById("passwordError").textContent =
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.";
      isValid = false;
    }

    if (confirmPassword.value.trim() === "") {
      document.getElementById("confirmPasswordError").textContent =
        "Please confirm your password.";
      isValid = false;
    } else if (confirmPassword.value !== password.value) {
      document.getElementById("confirmPasswordError").textContent =
        "Passwords do not match.";
      isValid = false;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = storedUsers.some(
      (user) => user.email === email.value.trim()
    );
    if (emailExists) {
      document.getElementById("emailError").textContent =
        "Email already exists.";
      isValid = false;
    }

    if (isValid) {
      // Show spinner and disable button
      submitButton.innerHTML = `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Loading...</span>
      `;
      submitButton.disabled = true;

      setTimeout(() => {
        // Store user data
        const user = {
          firstName: firstName.value.trim(),
          lastName: lastName.value.trim(),
          email: email.value.trim(),
          password: password.value.trim(),
        };

        storedUsers.push(user);
        localStorage.setItem("users", JSON.stringify(storedUsers));
        localStorage.setItem("userName", user.firstName + " " + user.lastName);

        window.location.replace("../html/login.html");
      }, 2000);
    } else {
      submitButton.innerHTML = "Submit";
      submitButton.disabled = false;
    }
  });
});

// Remove error messages when user types
["firstName", "lastName", "email", "password", "confirmPassword"].forEach(
  (id) => {
    document.getElementById(id).addEventListener("input", function () {
      if (this.value.trim() !== "") {
        document.getElementById(id + "Error").textContent = "";
      }
    });
  }
);

// Toggle password visibility
function togglePasswordVisibility(inputId, icon) {
  const inputField = document.getElementById(inputId);
  const isPassword = inputField.type === "password";
  inputField.type = isPassword ? "text" : "password";
  icon.classList.toggle("fa-eye", isPassword);
  icon.classList.toggle("fa-eye-slash", !isPassword);
}
