var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var questionCounterText = document.getElementById('questionCounter');
var scoreText = document.getElementById('score');
var nextButton = document.getElementsByClassName("next-btn");



var CurrentQuestions = {};
var AcceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions =
[
    {
        question: "which team won the 2006 FIFA World Cup?",
        option1: "Spain",
        option2: "Italy",
        option3: "Brazil",
        Answer: 2

    },
    {
        question: "who was the first prime minister of Nigeria?",
        option1: "Nnamdi Kanu",
        option2: "Alh Tafawa Belewa",
        option3: "Obafemi Awolowo",
        Answer: 2

    },
    {
        question: "What is the full meaning of HTML?",
        option1: "HyperText Markup Language",
        option2: "HyperText Mixedup Language",
        option3: "HyperTune Mashup Lingua",
        Answer: 1

    },
    {
        question: "American Musician 'Drake' was born in what year?",
        option1: "1995",
        option2: "1989",
        option3: "1987",
        Answer: 3

    },
    {
        question: "Which is the largest Country in the world?",
        option1: "Russia",
        option2: "China",
        option3: "India",
        Answer: 1

    }
];

var CORRECTBONUS = 2;
var MAXQUESTION = 5;

startgame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAXQUESTION){
        //go to the endpage
        return window.location.assign("/end.html");
    }

    questionCounter ++;
    questionCounterText.innerText = questionCounter + "/" + MAXQUESTION;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["option" + number];
    });
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        let selectedChoice = e.target;
        let selectedAnswer = selectedChoice.dataset["number"];

        let correctness = selectedAnswer == currentQuestion.Answer ? 'correct' : 'incorrect';
        if (correctness === 'correct') {
            incrementScore (CORRECTBONUS);
        }
        selectedChoice.parentElement.classList.add(correctness);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(correctness);
            getNewQuestion();
        }, 500);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startgame();

