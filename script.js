const quizData = [
    {
        question: "Which language is used for web page styling?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: "CSS"
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<img>", "<a>", "<link>", "<p>"],
        answer: "<a>"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Google", "Microsoft", "Netscape", "Apple"],
        answer: "Netscape"
    },
    {
        question: "Inside which HTML tag do we put JavaScript?",
        options: ["<script>", "<js>", "<javascript>", "<code>"],
        answer: "<script>"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "<!-- -->", "##", "**"],
        answer: "//"
    },
    {
        question: "Which method is used to print output in console?",
        options: ["console.log()", "print()", "document.write()", "echo()"],
        answer: "console.log()"
    }
];

let currentQuestion = 0;
let score = 0;

let timeLeft = 15;

let timer;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const scoreElement = document.getElementById('score');
const questionNumber = document.getElementById('questionNumber');
const resultBox = document.getElementById('resultBox');
const quizBox = document.querySelector('.quiz-box');
const finalScore = document.getElementById('finalScore');

const timerElement = document.getElementById('timer');

function loadQuestion() {

    resetState();

    startTimer();

    const currentQuiz = quizData[currentQuestion];

    questionNumber.innerText =
        `Question ${currentQuestion + 1}
  of ${quizData.length}`;

    questionElement.innerText =
        currentQuiz.question;

    currentQuiz.options.forEach(option => {

        const button = document.createElement('button');

        button.innerText = option;

        button.classList.add('option-btn');

        optionsElement.appendChild(button);

        button.addEventListener('click', () =>
            selectAnswer(button, currentQuiz.answer)
        );

    });
}

function resetState() {

    nextBtn.style.display = 'none';

    optionsElement.innerHTML = '';
}

function startTimer() {

    clearInterval(timer);

    timeLeft = 15;

    timerElement.innerText =
        `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {

        timeLeft--;

        timerElement.innerText =
            `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {

            clearInterval(timer);

            nextBtn.style.display = 'block';

            const buttons =
                document.querySelectorAll('.option-btn');

            buttons.forEach(btn => {

                btn.disabled = true;

            });

        }

    }, 1000);
}

function selectAnswer(button, correctAnswer) {

    clearInterval(timer);

    const buttons =
        document.querySelectorAll('.option-btn');

    buttons.forEach(btn => {

        btn.disabled = true;

        if (btn.innerText === correctAnswer) {

            btn.classList.add('correct');
        }
    });

    if (button.innerText === correctAnswer) {

        score++;

        scoreElement.innerText = `Score: ${score}`;

    } else {

        button.classList.add('wrong');
    }

    nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {

    currentQuestion++;

    if (currentQuestion < quizData.length) {

        loadQuestion();

    } else {

        showResult();
    }
});

function showResult() {

    clearInterval(timer);

    quizBox.style.display = 'none';

    resultBox.style.display = 'block';

    finalScore.innerText =
        `You scored ${score}
  out of ${quizData.length}`;
}

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    scoreElement.innerText = 'Score: 0';

    resultBox.style.display = 'none';

    quizBox.style.display = 'block';

    loadQuestion();
}

loadQuestion();