window.onload = function () {
  displayGrades();

  document.getElementById("retryButton").addEventListener("click", function () {
    window.location.href = "startExam.html";
  });
};
