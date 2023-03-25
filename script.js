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

var section = document.querySelector("#start-quiz");
var currentQuestion = 0;

function displayOptions(index) {
  var orderedList = document.createElement("ol");
  section.appendChild(orderedList);
  for (let i = 0; i < 4; i++) {
    var displayOption = document.createElement("li");
    displayOption.setAttribute("class", "quiz-options");
    displayOption.textContent = listOfQuestions[index].options[i];
    orderedList.appendChild(displayOption);
  }
  currentQuestion++;
  addClickEvent();
}

function nextQuestion() {
  section.textContent = "";
  var displayQuestion = document.createElement("h2");
  displayQuestion.textContent = listOfQuestions[currentQuestion].question;
  section.appendChild(displayQuestion);
  displayOptions(currentQuestion);
}

var start = document.querySelector("button");
start.addEventListener("click", function () {
  nextQuestion();
});

function addClickEvent() {
  var selectAnswer = document.querySelectorAll("li");
  selectAnswer.forEach(createClickEvent);
  function createClickEvent(eachSelectAnswer) {
    eachSelectAnswer.addEventListener("click", function (event) {
      console.log(currentQuestion);
      console.log("this is the length of list " + listOfQuestions.length);
      if (currentQuestion < listOfQuestions.length) {
        nextQuestion();
      } else {
        section.textContent = "";
      }
    });
  }
}

function checkAnswers(event) {}
