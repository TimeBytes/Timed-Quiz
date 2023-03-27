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
var currentQuestion = 0;
var startTime = 90;
var countDown = document.querySelector("#timer");
var start = document.querySelector("#start");
var questionH2 = document.createElement("h2");
var section = document.querySelector("#start-quiz");
var quizQuestion = document.createElement("h2");
var orderedList = document.createElement("ol");
var highscores = document.querySelector("#highscores");

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
    var selectAnswer = document.querySelectorAll("li");
    selectAnswer.forEach(createClickEvent);
    function createClickEvent(eachSelectAnswer) {
      eachSelectAnswer.addEventListener("click", function (event) {
        currentQuestion++;
        userAnswer.push(event.target.textContent);
        displayQuestion();
      });
    }
  } else {
    quizSection.textContent = "";
    displayEnterName();
  }
}
function userScore() {
  for (let i = 0; i < userAnswer.length; i++) {
    console.log(userAnswer[i] == listOfQuestions[i].answer);
    if (userAnswer[i] == listOfQuestions[i].answer) {
      score++;
    }
  }
  score = (score / userAnswer.length) * 100;
}

function displayEnterName() {
  var enterInitials = document.querySelector("#enter-initals");
  enterInitials.dataset.state = "visible";
  var finalScore = document.querySelector(".final-score");
  userScore();
  finalScore.textContent = "Your final score is: " + score + "%";
  var submit = document.querySelector("#submit");
  submit.addEventListener("click", function (event) {
    event.preventDefault();
    var textInput = document.querySelector("input").value;
    enterInitials.dataset.state = "hidden";
    highscores.dataset.state = "visible";
  });
}

function timer() {
  setInterval(function () {
    countDown.textContent = "Time: " + startTime;
    startTime--;
  }, 1000);
}

start.addEventListener("click", function () {
  console.log("hello");
  displayQuestion();
  timer();
});
