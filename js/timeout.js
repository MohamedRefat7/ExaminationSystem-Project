let timeoutMessageShown = false;

function showTimeOutMessage() {
  if (!timeoutMessageShown) {
    var userName = localStorage.getItem("userName") || "Student";
    document.getElementById(
      "message"
    ).innerText = `Time Out! ${userName}, you took too long to complete the exam.`;
    timeoutMessageShown = true;
  }
}

// Show the timeout message on page load
window.onload = showTimeOutMessage;

document.getElementById("retryButton").addEventListener("click", function () {
  // direct me to startExam.html
  window.location.href = "startExam.html";
});
