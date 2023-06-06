const startBtn = document.querySelector('#start-quiz-game');
const infoBox = document.querySelector('.info-box');
const exitBtn = document.querySelector('#exit-quiz-btn');
const continueBtn = document.querySelector('#continue-quiz-btn')
const quizBox = document.querySelector('.quiz-box');
const nextQuizBtn = document.querySelector('#next-btn');
const optionList = document.querySelector('.quiz-answers');
const timeCount = document.querySelector('.time');
const timeLine = document.querySelector('.time-line');
const resultBox = document.querySelector('.result-box');
const replayQuizBtn = document.querySelector('#replay-quiz');
const quitQuizBtn = document.querySelector('#quit-quiz');

let questionCounter = 0;
let questionCounter2 = 1;
let counter = 0;
let counterLine = 0;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;
let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

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
    startTimer(15);
    startTimeLine(widthValue);
});

quitQuizBtn.addEventListener('click', () => {
    window.location.reload();
})

replayQuizBtn.addEventListener('click', () => {
    window.location.reload();
})

nextQuizBtn.addEventListener('click', () => {
    if (questionCounter < questions.length - 1) {
        questionCounter++;
        showQuestion(questionCounter);
        questionCounter2++;
        questionCounterText(questionCounter2);

        clearInterval(counter);
        startTimer(timeValue);

        clearInterval(counterLine);
        startTimeLine(widthValue);

        nextQuizBtn.classList.remove('active-button');
    }
    else {
        resultBox.classList.add('active-result-box');
        quizBox.classList.remove('active-quiz-box');
        let resultBoxText = document.querySelector('#result-text');

        if (userScore > 3) {
            let scoreTag = `and congrats! , You got only <span class="result-bold">${userScore}</span> out of <span class="result-bold">${questions.length}</span>`;
            resultBoxText.innerHTML = scoreTag;
        }
        else if (userScore > 1) {
            let scoreTag = `and nice, You got only <span class="result-bold">${userScore}</span> out of <span class="result-bold">${questions.length}</span>`;
            resultBoxText.innerHTML = scoreTag;
        }
        else {
            let scoreTag = `and sorry, You got only <span class="result-bold">${userScore}</span> out of <span class="result-bold">${questions.length}</span>`;
            resultBoxText.innerHTML = scoreTag;
        }
    }
});

let showQuestion = (index) => {
    let questionHeader = document.querySelector('#question-text');
    questionHeader.innerHTML = `${questions[index].numb}.${questions[index].question}`;

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
    let option = document.querySelectorAll('.quiz-option');

    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionListSelected(this)');
    }
}

let optionListSelected = (answer) => {
    clearInterval(counter);
    clearInterval(counterLine);

    let userAnswer = answer.textContent.trim();
    let correctAnswer = questions[questionCounter].answer;
    let allOptionList = optionList.children.length;

    if (userAnswer == correctAnswer) {
        userScore++;
        answer.classList.add('correct');
        answer.insertAdjacentHTML('beforeend', tickIcon);
    }
    else {
        answer.classList.add('incorrect');
        answer.insertAdjacentHTML('beforeend', crossIcon);
        for (let i = 0; i < allOptionList; i++) {
            if (optionList.children[i].innerText == correctAnswer) {
                optionList.children[i].classList.add('correct');
                optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
            }
        }
    }

    for (let i = 0; i < allOptionList; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextQuizBtn.classList.add('active-button');
}

let questionCounterText = (count) => {
    const quizCount = document.querySelector('#quiz-counter');
    const queText = `<span class="quiz-bold">${count}</span> of <span class="quiz-bold">${questions.length}</span> Questions`;
    quizCount.innerHTML = queText;
}

let startTimer = (time) => {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.innerText = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.innerText;
            timeCount.innerText = '0' + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.innerText = '00'
        }
    }
}

let startTimeLine = (line) => {
    counterLine = setInterval(timer, 27);

    function timer() {
        line++;
        timeLine.style.width = line + 'px';
        if (line > 599) {
            clearInterval(counterLine);
        }
    }
}