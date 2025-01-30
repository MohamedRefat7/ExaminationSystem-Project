document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    // Reset previous error messages
    document.querySelectorAll(".error-message").forEach((errorDiv) => {
      errorDiv.textContent = "";
    });

    let isValid = true;

    // Validate First Name
    if (firstName.value.trim() === "") {
      document.getElementById("firstNameError").textContent =
        "First name is required.";
      isValid = false;
    } else if (firstName.value.length < 3 || firstName.value.length > 20) {
      document.getElementById("firstNameError").textContent =
        "First name must be between 3 and 20 characters.";
      isValid = false;
    }

    // Validate Last Name
    if (lastName.value.trim() === "") {
      document.getElementById("lastNameError").textContent =
        "Last name is required.";
      isValid = false;
    } else if (lastName.value.length < 3 || lastName.value.length > 20) {
      document.getElementById("lastNameError").textContent =
        "Last name must be between 3 and 20 characters.";
      isValid = false;
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value.trim() === "") {
      document.getElementById("emailError").textContent = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(email.value)) {
      document.getElementById("emailError").textContent =
        "Enter a valid email format.";
      isValid = false;
    }

    // Validate Password
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

    // Validate Confirm Password
    if (confirmPassword.value.trim() === "") {
      document.getElementById("confirmPasswordError").textContent =
        "Please confirm your password.";
      isValid = false;
    } else if (confirmPassword.value !== password.value) {
      document.getElementById("confirmPasswordError").textContent =
        "Passwords do not match.";
      isValid = false;
    }

    // Check if email already exists in local storage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = storedUsers.some(
      (user) => user.email === email.value.trim()
    );
    if (emailExists) {
      document.getElementById("emailError").textContent =
        "Email already exists.";
      isValid = false;
    }

    // If all validations pass
    if (isValid) {
      const user = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
      };

      storedUsers.push(user);
      localStorage.setItem("users", JSON.stringify(storedUsers));

      // Redirect to login page
      window.location.replace("../html/login.html");
    }
  });

// Add event listeners to clear error messages on user input
document.getElementById("firstName").addEventListener("input", function () {
  if (firstName.value.trim() !== "") {
    document.getElementById("firstNameError").textContent = "";
  }
});

document.getElementById("lastName").addEventListener("input", function () {
  if (lastName.value.trim() !== "") {
    document.getElementById("lastNameError").textContent = "";
  }
});

document.getElementById("email").addEventListener("input", function () {
  if (email.value.trim() !== "") {
    document.getElementById("emailError").textContent = "";
  }
});

document.getElementById("password").addEventListener("input", function () {
  if (password.value.trim() !== "") {
    document.getElementById("passwordError").textContent = "";
  }
});

document
  .getElementById("confirmPassword")
  .addEventListener("input", function () {
    if (confirmPassword.value.trim() !== "") {
      document.getElementById("confirmPasswordError").textContent = "";
    }
  });

// eye in the form
function togglePasswordVisibility(inputId, icon) {
  const inputField = document.getElementById(inputId);
  const isPassword = inputField.type === "password";
  inputField.type = isPassword ? "text" : "password";
  icon.classList.toggle("fa-eye", isPassword);
  icon.classList.toggle("fa-eye-slash", !isPassword);
}
