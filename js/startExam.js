let selectedLevel = null;

document.getElementById("normalButton").addEventListener("click", function () {
  selectedLevel = "normal";
  highlightSelectedButton(this);
  clearErrorMessage();
});

document
  .getElementById("intermediateButton")
  .addEventListener("click", function () {
    selectedLevel = "intermediate";
    highlightSelectedButton(this);
    clearErrorMessage();
  });

document
  .getElementById("advancedButton")
  .addEventListener("click", function () {
    selectedLevel = "advanced";
    highlightSelectedButton(this);
    clearErrorMessage();
  });

function highlightSelectedButton(button) {
  document.querySelectorAll(".level-button").forEach((btn) => {
    btn.classList.remove("selected");
  });

  button.classList.add("selected");
}

function clearErrorMessage() {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = "";
}

document
  .getElementById("startExamButton")
  .addEventListener("click", function () {
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = "";

    if (!selectedLevel) {
      errorMessage.textContent = "Please select an exam level!";

      errorMessage.style.padding = "8px";

      return;
    }

    localStorage.setItem("examLevel", selectedLevel);

    const loader = document.getElementById("loader");
    loader.style.display = "flex";

    this.style.display = "none";

    setTimeout(() => {
      loader.style.display = "none";

      window.location.href = "exam.html";
    }, 4000);
  });
