const listOfQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    options: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within _____:",
    options: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
    answer: "Parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store _____:",
    options: [
      "Numbers and strings",
      "Other arrays",
      "Booleans",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question:
      " String values must be enclosed within _____ when being assigned to variables.",
    options: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
    answer: "Quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is",
    options: ["Javascript", "Terminal / Bash", "For loops", "Console.log"],
    answer: "Console.log",
  },
];
var score = 0;
var userAnswer = [];
var userHighscore = [];
var currentQuestion = 0;
var startTime = 60;
var countDown = document.querySelector("#timer");
var start = document.querySelector("#start");
var questionH2 = document.createElement("h2");
var section = document.querySelector("#start-quiz");
var quizQuestion = document.createElement("h2");
var orderedList = document.createElement("ol");
var highscores = document.querySelector("#highscores");
var highscoreList = document.querySelector("#highscore-list");
var checkHighscores = document.querySelector("#check-highscores");
var submit = document.querySelector("#submit");
var enterInitials = document.querySelector("#enter-initals");

function displayQuestion() {
  section.dataset.state = "hidden";
  var quizSection = document.querySelector("#quiz-section");
  orderedList.textContent = "";
  if (currentQuestion < listOfQuestions.length) {
    quizQuestion.textContent = listOfQuestions[currentQuestion].question;
    quizSection.appendChild(quizQuestion);
    quizSection.appendChild(orderedList);
    for (let i = 0; i < listOfQuestions[currentQuestion].options.length; i++) {
      var quizOptions = document.createElement("li");
      quizOptions.setAttribute("class", "quiz-options");
      quizOptions.textContent = listOfQuestions[currentQuestion].options[i];
      orderedList.appendChild(quizOptions);
    }
    var selectAnswer = document.querySelectorAll(".quiz-options");
    selectAnswer.forEach(createClickEvent);
    function createClickEvent(eachSelectAnswer) {
      eachSelectAnswer.addEventListener("click", function (event) {
        if (
          listOfQuestions[currentQuestion].answer == event.target.textContent
        ) {
          score++;
        } else {
          startTime -= 10;
        }
        currentQuestion++;
        displayQuestion();
      });
    }
  } else {
    quizSection.textContent = "";
    console.log("why here");
    displayEnterName();
  }
}

function displayEnterName() {
  clearInterval(startInterval);
  document.querySelector("input").value = "";

  enterInitials.dataset.state = "visible";
  var finalScore = document.querySelector(".final-score");
  score = (score / listOfQuestions.length) * 100;
  finalScore.textContent = "Your final score is: " + score + "%";
}
function checkLocalStorage() {
  if (JSON.parse(localStorage.getItem("highscores")) == null) {
    userHighscore = [];
  } else {
    userHighscore = JSON.parse(localStorage.getItem("highscores"));
  }
}
function timer() {
  startInterval = setInterval(function () {
    startTime--;
    countDown.textContent = "Time: " + startTime;
    if (startTime <= 0) {
      var quizSection = document.querySelector("#quiz-section");
      quizSection.textContent = "";
      displayEnterName();
    }
  }, 1000);
}

function displayHighscores() {
  highscoreList.textContent = "";
  for (let i = 0; i < userHighscore.length; i++) {
    console.log(userHighscore);
    var highscoresListElement = document.createElement("li");
    highscoresListElement.setAttribute("class", "user-highscore-list-item");
    highscoresListElement.textContent = userHighscore[i];
    highscoreList.appendChild(highscoresListElement);
  }
}

start.addEventListener("click", function () {
  displayQuestion();
  timer();
});

checkHighscores.addEventListener("click", function () {
  section.dataset.state = "hidden";
  highscores.dataset.state = "visible";
  enterInitials.dataset.state = "hidden";
  checkLocalStorage();
  displayHighscores();
});

var goBackButton = document.querySelector("#go-back");
var clearHighscores = document.querySelector("#clear-highscores");

goBackButton.addEventListener("click", function () {
  currentQuestion = 0;
  score = 0;
  startTime = 60;
  countDown.textContent = "Time: " + startTime;
  section.dataset.state = "visible";
  highscores.dataset.state = "hidden";
});

clearHighscores.addEventListener("click", function () {
  localStorage.removeItem("highscores");
  highscoreList.textContent = "";
});

submit.addEventListener("click", function (event) {
  event.preventDefault();
  var textInput = document.querySelector("input").value;
  if (textInput == "") {
    alert("Please enter your initals");
  } else {
    checkLocalStorage();
    userHighscore.push(textInput + " - " + score + "%");
    localStorage.setItem("highscores", JSON.stringify(userHighscore));
    enterInitials.dataset.state = "hidden";
    highscores.dataset.state = "visible";
    console.log("world");
    displayHighscores();
  }
});
