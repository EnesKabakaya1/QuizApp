const startBtn = document.querySelector('#start-quiz-game');
const infoBox = document.querySelector('.info-box');
const exitBtn = document.querySelector('#exit-quiz-btn');
const continueBtn = document.querySelector('#continue-quiz-btn')
const quizBox = document.querySelector('.quiz-box');
const nextQuizBtn = document.querySelector('#next-btn');
let questionCounter = 0;
let questionCounter2 = 1;

startBtn.addEventListener('click', () => {
    infoBox.classList.add('active-info-box');
    startBtn.style.display = 'none';
});

exitBtn.addEventListener('click', () => {
    infoBox.classList.remove('active-info-box');
    startBtn.style.display = 'block';
});

continueBtn.addEventListener('click', () => {
    quizBox.classList.add('active-quiz-box');
    infoBox.classList.remove('active-info-box');
    showQuestion(0);
    questionCounterText(1);
});

nextQuizBtn.addEventListener('click', () => {
    if (questionCounter < questions.length - 1) {
        questionCounter++;
        showQuestion(questionCounter);
        questionCounter2++;
        questionCounterText(questionCounter2);
    }
    else {
        console.log('Quiz Finished');
    }
});

let showQuestion = (index) => {
    let questionHeader = document.querySelector('#question-text');
    questionHeader.innerHTML = `${questions[index].numb}.${questions[index].question}`;

    let optionList = document.querySelector('.quiz-answers');
    let options = `
        <div class="quiz-option">
            <span>${questions[index].options[0]}</span>
        </div>
        <div class="quiz-option">
            <span>${questions[index].options[1]}</span>
        </div>
        <div class="quiz-option">
            <span>${questions[index].options[2]}</span>
        </div>
        <div class="quiz-option">
            <span>${questions[index].options[3]}</span>
        </div>
    `;
    optionList.innerHTML = options;
}

let questionCounterText = (count) => {
    const quizCount = document.querySelector('#quiz-counter');
    const queText = `<span class="quiz-bold">${count}</span> of <span class="quiz-bold">${questions.length}</span> Questions`;
    quizCount.innerHTML = queText;
}