let selectedLevel = null; // Variable to store the selected level

// Event listeners for level selection buttons
document.getElementById("normalButton").addEventListener("click", function () {
  selectedLevel = "normal";
  highlightSelectedButton(this);
  clearErrorMessage(); // Clear the error message when a level is selected
});

document
  .getElementById("intermediateButton")
  .addEventListener("click", function () {
    selectedLevel = "intermediate";
    highlightSelectedButton(this);
    clearErrorMessage(); // Clear the error message when a level is selected
  });

document
  .getElementById("advancedButton")
  .addEventListener("click", function () {
    selectedLevel = "advanced";
    highlightSelectedButton(this);
    clearErrorMessage(); // Clear the error message when a level is selected
  });

// Function to highlight the selected button
function highlightSelectedButton(button) {
  // Remove highlight from all buttons
  document.querySelectorAll(".level-button").forEach((btn) => {
    btn.classList.remove("selected");
  });

  // Highlight the selected button
  button.classList.add("selected");
}

// Function to clear the error message
function clearErrorMessage() {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = ""; // Clear the error message
}

// Event listener for the Start Exam button
document
  .getElementById("startExamButton")
  .addEventListener("click", function () {
    const errorMessage = document.getElementById("errorMessage");

    // Clear any previous error message
    errorMessage.textContent = "";

    if (!selectedLevel) {
      errorMessage.textContent = "Please select an exam level!";
      errorMessage.style.color = "red";
      return;
    }

    // Save the selected level to localStorage
    localStorage.setItem("examLevel", selectedLevel);

    // Show loader
    const loader = document.getElementById("loader");
    loader.style.display = "flex"; // Show loader

    // Hide the button
    this.style.display = "none"; // Hide the Start Exam button

    // Wait for 4 seconds, then load the exam page
    setTimeout(() => {
      // Hide the loader
      loader.style.display = "none";

      // Redirect to the exam page
      window.location.href = "exam.html";
    }, 4000);
  });
