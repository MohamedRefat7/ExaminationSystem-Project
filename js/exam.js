var errorDisplay = document.getElementsByClassName("error")[0];
var examContainer = document.getElementById("exam-container");
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let markedQuestions = [];
let timeLeft = 120;
function loadQuestions() {
  const selectedLevel = localStorage.getItem("examLevel");

  let jsonFile;
  switch (selectedLevel) {
    case "intermediate":
      jsonFile = "../json/intermediate-questions.json";
      break;
    case "advanced":
      jsonFile = "../json/advanced-questions.json";
      break;
    default:
      jsonFile = "../json/normal-questions.json";
  }

  fetch(jsonFile)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${jsonFile}: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      questions = shuffle(data);
      displayQuestion();
      startTimer(300);
    })
    .catch((error) => {
      console.error(error);

      examContainer.style.display = "none";

      const retryContainer = document.getElementById("backContainer");
      const errorMessage = document.getElementById("backErrorMessage");
      errorMessage.textContent =
        "Failed to load questions. Please try again Or try another exam Level.";
      retryContainer.style.display = "block";

      document.getElementById("backButton").addEventListener("click", () => {
        window.location.href = "startExam.html";
      });
    });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayQuestion() {
  const container = document.getElementById("question-container");
  const question = questions[currentQuestionIndex];
  container.innerHTML = `
       <div class="question-header-timer">
    <h2>Choose the correct answer</h2>
    <div id="timer">${formatTime(timeLeft)}</div>
    </div>
    <div class="question ">
      <div class="question-text">
        <h2 id="question-text">${question.text}</h2>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="35" height="35" x="0" y="0" viewBox="0 0 682.667 682.667" style="enable-background:new 0 0 512 512" xml:space="preserve" class="mark-question">
  <g>
    <defs>
      <clipPath id="a" clipPathUnits="userSpaceOnUse">
        <path d="M0 512h512V0H0Z" fill="#000000" opacity="1" data-original="#000000"></path>
      </clipPath>
    </defs>
    <g clip-path="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
      <path d="M0 0v-512" style="stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; stroke-dasharray: none; stroke-opacity: 1;" transform="translate(76 512)" fill="black" stroke="#000000" stroke-width="30px" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000"></path>
      <path d="M0 0s45-30 90-30c71.903 0 108.097 60 180 60 45 0 90-30 90-30v-240s-45 30-90 30c-71.903 0-108.097-60-180-60-45 0-90 30-90 30" style="stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; stroke-dasharray: none; stroke-opacity: 1;" transform="translate(76 467)" fill="black" stroke="#000000" stroke-width="30px" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000"></path>
    </g>
  </g>
</svg>

      </div>
      <ul>
        ${question.answers
          .map(
            (answer, index) => `
          <li class="question">
            <label>
              <input type="radio" name="answer" value="${index}" ${
              question.selectedAnswer === index ? "checked" : ""
            }/>
              <span>${answer}</span>
            </label>
          </li>
        `
          )
          .join("")}
      </ul>
      <div class="btns col-12 ">
        <button id="previous-btn" onclick="PreviousQuestion()" class="col-5  col-xl-2" >Prev</button>
        <p class="counter-pages ">
          <span id="current-page">${currentQuestionIndex + 1}</span>/
          <span id="total-pages">${questions.length}</span>
        </p>
        <button id="next-btn" onclick="nextQuestion()" class="col-4  col-xl-2">Next</button>
        <button id="submit-btn" class="col-12  col-xl-3" onclick="submitExam()">Submit</button>
      </div>
    </div>
  `;

  const markImage = container.querySelector(".mark-question");
  markImage.addEventListener("click", markQuestion);

  // Save the selected answer when the user changes their selection
  const radioButtons = container.querySelectorAll('input[name="answer"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      const selectedValue = parseInt(radio.value);
      questions[currentQuestionIndex].selectedAnswer = selectedValue;
    });
  });
  const questionText = document.getElementById("question-text");
  questionText.innerText = questions[currentQuestionIndex].text;

  updateFlagColor();
}

function markQuestion() {
  const markImage = document.querySelector(".mark-question");
  const paths = markImage.querySelectorAll("path");
  const markedContent = document.getElementById("marked-question-content");
  const currentQuestion = questions[currentQuestionIndex];

  const isMarked = markedQuestions.some(
    (q) => q.index === currentQuestionIndex
  );

  if (isMarked) {
    // Unmark the question
    markedQuestions = markedQuestions.filter(
      (q) => q.index !== currentQuestionIndex
    );

    // Restore flag color to black
    paths.forEach((path) => path.setAttribute("fill", "black"));

    // Remove from marked list
    const markedQuestionItem = markedContent.querySelector(
      `.marked-question-item[data-index='${currentQuestionIndex}']`
    );
    if (markedQuestionItem) {
      markedContent.removeChild(markedQuestionItem);
    }
  } else {
    // Mark the question
    markedQuestions.push({
      index: currentQuestionIndex,
      text: currentQuestion.text,
    });

    // Change flag color to red
    paths.forEach((path) => path.setAttribute("fill", "#007bff"));

    // Add to marked questions section
    const markedQuestionHTML = document.createElement("div");
    markedQuestionHTML.className = "marked-question-item";
    markedQuestionHTML.setAttribute("data-index", currentQuestionIndex);
    markedQuestionHTML.innerHTML = `
      <h3 class="marked-question-text">Q${currentQuestionIndex + 1}: ${
      currentQuestion.text
    }</h3>
      <img src="../img/svgexport-17.svg" class="delete-marked-question" alt="Remove Marked Question">
    `;

    markedContent.appendChild(markedQuestionHTML);

    // Clicking a marked question navigates to it
    markedQuestionHTML.addEventListener("click", () => {
      saveCurrentAnswer();
      currentQuestionIndex = parseInt(
        markedQuestionHTML.getAttribute("data-index"),
        10
      );
      displayQuestion();
    });

    // Remove when clicking delete button
    const deleteImg = markedQuestionHTML.querySelector(
      ".delete-marked-question"
    );
    deleteImg.addEventListener("click", (event) => {
      event.stopPropagation();
      markedQuestions = markedQuestions.filter(
        (q) => q.index !== currentQuestionIndex
      );
      markedContent.removeChild(markedQuestionHTML);
      updateFlagColor();
    });
  }
}

function updateFlagColor() {
  const markImage = document.querySelector(".mark-question");
  const paths = markImage.querySelectorAll("path");

  const isMarked = markedQuestions.some(
    (q) => q.index === currentQuestionIndex
  );

  if (isMarked) {
    paths.forEach((path) => path.setAttribute("fill", "#007bff"));
  } else {
    paths.forEach((path) => path.setAttribute("fill", "black"));
  }
}

function saveCurrentAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const selectedValue = parseInt(selectedAnswer.value);
    questions[currentQuestionIndex].selectedAnswer = selectedValue;
  }
}

function nextQuestion() {
  saveCurrentAnswer();
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  }
  updateNavigationButtons();
}

function PreviousQuestion() {
  saveCurrentAnswer();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
  updateNavigationButtons();
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById("previous-btn");
  const nextBtn = document.getElementById("next-btn");

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === questions.length - 1;

  if (prevBtn.disabled) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }

  if (nextBtn.disabled) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
}

function submitExam() {
  saveCurrentAnswer();
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].selectedAnswer === undefined) {
      currentQuestionIndex = i;
      displayQuestion();
      return;
    }
  }

  score = questions.filter((q) => q.selectedAnswer === q.correctAnswer).length;
  const grade = ((score / questions.length) * 100).toFixed(2) + "%";
  localStorage.setItem("userGrade", grade);
  window.location.href = "grades.html";
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = formatTime(timeLeft);

    if (timeLeft <= 45) {
      document.getElementById("timer").classList.add("red");
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      localStorage.setItem("examStatus", "timeout");
      window.location.href = "timeout.html";
    }
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
}

function displayGrades() {
  const userName = localStorage.getItem("userName") || "Student";

  const grade = localStorage.getItem("userGrade") || "0%";

  const gradeMessage = document.getElementById("gradeMessage");
  const scorePercentage = parseFloat(grade);

  if (scorePercentage >= 50) {
    gradeMessage.textContent = `Congratulations ${userName}, your grade is ${grade}!`;
  } else {
    gradeMessage.innerHTML = `Your Score is ${grade}.<br> Sorry ${userName}, better luck next time!`;
  }
}

loadQuestions();
