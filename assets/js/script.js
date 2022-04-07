//GIVEN I am taking a code quiz
//WHEN I click the start button
//THEN a timer starts and I am presented with a question
//WHEN I answer a question
//THEN I am presented with another question
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//WHEN the game is over
//THEN I can save my initials and score





var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var secondsLeft = 60;


const start = document.querySelector("#start");


const codersIntro = document.querySelector("#challenge-begins");

var questionsEl = document.querySelector(".all-question");


let questionEl = document.querySelector("#question");
const correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;



const finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");


const highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];


const ansBtn = document.querySelectorAll("button.answer-btn")


let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");


const ans1Btn = document.querySelector("#answer-1");
const ans2Btn = document.querySelector("#answer-2");
const ans3Btn = document.querySelector("#answer-3");
const ans4Btn = document.querySelector("#answer-4");




const questions = [ 
    {
        question: "Commonly used data types DO Not include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed within _______.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];


function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}


function startQuiz() {
    codersIntro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}


function checkAnswer(event) {
    event.preventDefault();

    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

  
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
   
    
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

 
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
  
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}


function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}


start.addEventListener("click", startQuiz);


ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});


submitScrBtn.addEventListener("click", addScore);


goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    codersIntro.style.display = "block";
    secondsLeft = 60;
    time.textContent = `Time:${secondsLeft}s`;
});

clearScrBtn.addEventListener("click", clearScores);


viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } 
    else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
    
    else {
        return alert("Hey. Take Quiz. There is No High Score.");
    }
});




