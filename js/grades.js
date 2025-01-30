window.onload = function () {
  displayGrades();

  // Retry Exam Button
  document.getElementById("retryButton").addEventListener("click", function () {
    window.location.href = "startExam.html";
  });
};
