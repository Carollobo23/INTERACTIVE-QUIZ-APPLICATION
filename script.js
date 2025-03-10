const questions=[
    {
        question: "What is the primary function of the CPU?",
        answers: ["To store data", "To process instructions", "To display graphics", "To connect to the internet"],
        correctAnswer: "To process instructions"
    },
    {
        question: "Which of the following is an example of system software?",
        answers: ["Microsoft Word", "Adobe Photoshop", "Operating System", "Google Chrome"],
        correctAnswer: "Operating System"
    },
    {
        question: "What does RAM stand for?",
        answers: ["Read Access Memory", "Random Access Memory", "Remote Access Module", "Real Application Memory"],
        correctAnswer: "Random Access Memory"
    },
    {
        question: "Which of the following is a storage device?",
        answers: ["Monitor", "Keyboard", "Hard Disk Drive (HDD)", "Mouse"],
        correctAnswer: "Hard Disk Drive (HDD)"
    },
    {
        question: "What does IP stand for?",
        answers: ["Internet Protocol", "Intranet Program", "Information Processing", "Integrated Platform"],
        correctAnswer: "Internet Protocol"
    },
    {
        question: "Which of the following is used to connect multiple computers in a local area network (LAN)?",
        answers: ["Modem", "Router", "Switch", "Firewall"],
        correctAnswer: "Switch"
    },
    {
        question: "What does URL stand for?",
        answers: ["Universal Resource Locator", "Uniform Resource Locator", "Unified Routing Logic", "User Retrieval Link"],
        correctAnswer: "Uniform Resource Locator"
    },
    {
        question: "What is the purpose of a firewall?",
        answers: ["To increase internet speed", "To protect against unauthorized access", "To display web pages", "To store data"],
        correctAnswer: "To protect against unauthorized access"
    },
    {
        question: "Which of the following is a programming language?",
        answers: ["Microsoft Excel", "Adobe Acrobat", "Python", "Windows Explorer"],
        correctAnswer: "Python"
    },
    {
        question: "What is a database?",
        answers: ["A collection of web pages", "An organized collection of data", "A type of computer virus", "A graphical user interface"],
        correctAnswer: "An organized collection of data"
    },
    {
        question: "What is an algorithm?",
        answers: ["A type of computer hardware", "A set of well-defined instructions to solve a problem", "A programming language", "A database management system"],
        correctAnswer: "A set of well-defined instructions to solve a problem"
    },
    {
        question: "Which of the following file extensions indicates an image file?",
        answers: [".txt", ".docx", ".jpg", ".exe"],
        correctAnswer: ".jpg"
    },
    {
        question: "What is malware?",
        answers: ["Software designed to harm computer systems", "Software used for data backup", "Software used for web browsing", "Software used for word processing"],
        correctAnswer: "Software designed to harm computer systems"
    },
    {
        question: "What does Ctrl+C typically do in most applications?",
        answers: ["Cut", "Copy", "Paste", "Close"],
        correctAnswer: "Copy"
    },
    {
        question: "What is cloud computing?",
        answers: ["Storing data on a physical hard drive", "Delivering computing services over the internet", "Using a computer without a monitor", "Programming in assembly language"],
        correctAnswer: "Delivering computing services over the internet"
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button =document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("btn");
        button.dataset.correct = answer === currentQuestion.correctAnswer;
        answerButtons.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;

    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    document.querySelector('.progress-bar-fill').style.width = `${progressPercent}%`;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz();
