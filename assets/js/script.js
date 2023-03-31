// list of objects containing the question as a string, options as a list and answer as a string
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
var startInterval;
var headerEl = document.querySelector("#header-container");
var counDownEl = document.querySelector("#timer");
var startEl = document.querySelector("#start");
var highscoresEl = document.querySelector("#highscores");
var startQuizEl = document.querySelector("#start-quiz");
var highscoreListEl = document.querySelector("#highscore-list");
var checkHighscoresEl = document.querySelector("#check-highscores");
var submitButton = document.querySelector("#submit");
var enterInitialsEl = document.querySelector("#enter-initals");
var isAnswerCorrectEl = document.querySelector("#is-answer > p");
var isAnswerCorrectContainer = document.querySelector("#is-answer");
var goBackButton = document.querySelector("#go-back");
var clearHighscores = document.querySelector("#clear-highscores");
var quizSection = document.querySelector("#quiz-section");
var questionH2 = document.createElement("h2");
var quizQuestion = document.createElement("h2");
var orderedList = document.createElement("ol");

//for the list length of listOfQuestions loop and display the questions with the options on screen by creating elemtns and appending them
function displayQuestion() {
  startQuizEl.dataset.state = "hidden";
  quizSection.dataset.state = "visible";
  quizSection.setAttribute("data-state", "visible");
  orderedList.textContent = "";
  //validates which question to display and that it doesn't go past the length of the list
  if (currentQuestion < listOfQuestions.length) {
    quizQuestion.textContent = listOfQuestions[currentQuestion].question;
    quizSection.appendChild(quizQuestion);
    quizSection.appendChild(orderedList);
    //loops the options available and displays them on screen by creating list element and changing it's content then appending it
    for (let i = 0; i < listOfQuestions[currentQuestion].options.length; i++) {
      var quizOptions = document.createElement("li");
      quizOptions.setAttribute("class", "quiz-options");
      quizOptions.textContent = listOfQuestions[currentQuestion].options[i];
      orderedList.appendChild(quizOptions);
    }
    //adds on click event to the list items as they were dynamically created, loops through each option
    var selectAnswer = document.querySelectorAll(".quiz-options");
    selectAnswer.forEach(createClickEvent);
    //on click event, will check if the slected option was correct or wrong and increment score if correct, minus the timer if wrong
    function createClickEvent(eachSelectAnswer) {
      eachSelectAnswer.addEventListener("click", function (event) {
        if (
          listOfQuestions[currentQuestion].answer == event.target.textContent
        ) {
          isAnswerCorrectEl.textContent = "Correct!";
          score++;
        } else {
          startTime -= 10;
          isAnswerCorrectEl.textContent = "Wrong!";
        }
        displayIsAnswerCorrect();
        //increments the question to be displayed
        currentQuestion++;
        //recursive function call
        displayQuestion();
      });
    }
  } else {
    quizSection.textContent = "";
    displayEnterName();
  }
}

//adds a delay to the display answer, will show up for 1 second after selecting an option.
function displayIsAnswerCorrect() {
  isAnswerCorrectContainer.dataset.state = "visible";
  setTimeout(function () {
    isAnswerCorrectContainer.dataset.state = "hidden";
  }, 1000);
}

//displays finaly score on screen and a text input for user's initals
function displayEnterName() {
  clearInterval(startInterval);
  document.querySelector("input").value = "";
  enterInitialsEl.dataset.state = "visible";
  var finalScore = document.querySelector(".final-score");
  //converts the score into a % grade
  score = (score / listOfQuestions.length) * 100;
  finalScore.textContent = "Your final score is: " + score + "%";
}

//updates the userHighscore variable with localstorage value, if none, sets the list to empty
function checkLocalStorage() {
  if (JSON.parse(localStorage.getItem("highscores")) == null) {
    userHighscore = [];
  } else {
    userHighscore = JSON.parse(localStorage.getItem("highscores"));
  }
}

//starts the countdown timer and when timer reaches 0 quiz is over and it calls displayEnterName function
function timer() {
  startInterval = setInterval(function () {
    startTime--;
    counDownEl.textContent = "Time: " + startTime + " second(s)";
    if (startTime <= 0) {
      var quizSection = document.querySelector("#quiz-section");
      quizSection.textContent = "";
      displayEnterName();
    }
  }, 1000);
}

// displays the highscore screen and hides the header
function displayHighscores() {
  highscoreListEl.textContent = "";
  headerEl.dataset.state = "hidden";
  for (let i = 0; i < userHighscore.length; i++) {
    var highscoresListElement = document.createElement("li");
    highscoresListElement.setAttribute("class", "user-highscore-list-item");
    highscoresListElement.textContent = userHighscore[i];
    highscoreListEl.appendChild(highscoresListElement);
  }
}

//add on click event listener to the start quiz button
startEl.addEventListener("click", function () {
  displayQuestion();
  timer();
});

//add on click event listener to the "your highscore" link in the header, hides sections that are not needed and calls the displayHighscores function
checkHighscoresEl.addEventListener("click", function () {
  //stops the timer incase user clicks "Your highscore" when the quiz has started.
  clearInterval(startInterval);
  startQuizEl.dataset.state = "hidden";
  highscoresEl.dataset.state = "visible";
  enterInitialsEl.dataset.state = "hidden";
  quizSection.dataset.state = "hidden";
  checkLocalStorage();
  displayHighscores();
});

//add on click event to the go back button to restart the quiz
goBackButton.addEventListener("click", function () {
  currentQuestion = 0;
  score = 0;
  startTime = 60;
  counDownEl.textContent = "Time: " + startTime + " second(s)";
  startQuizEl.dataset.state = "visible";
  highscoresEl.dataset.state = "hidden";
  headerEl.dataset.state = "visible";
});

//add on click event to clear high score button and removes the localstorage key "highscores" and clears the list of highscores on screen
clearHighscores.addEventListener("click", function () {
  localStorage.removeItem("highscores");
  highscoreListEl.textContent = "";
});

//add on click event to the submit button, prevent default from happening,
//stores the input value into a list and get converted into a string to store in localstorage then calls displayhighscores function
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var textInput = document.querySelector("input").value;
  //capitalize the initals
  textInput = textInput.toUpperCase();
  //validation to ensure user input is not empty
  if (textInput == "") {
    alert("Please enter your initals");
  } else {
    checkLocalStorage();
    userHighscore.push(textInput + " - " + score + "%");
    localStorage.setItem("highscores", JSON.stringify(userHighscore));
    enterInitialsEl.dataset.state = "hidden";
    highscoresEl.dataset.state = "visible";
    displayHighscores();
  }
});
