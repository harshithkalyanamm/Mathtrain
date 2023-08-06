const operand1 = document.querySelector("#operand1");
const operand2 = document.querySelector("#operand2");
const operator = document.querySelector("#operator");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const msgbox = document.querySelector("#msgbox");
const correctBeep = document.querySelector("#correctBeep");
const wrongBeep = document.querySelector("#wrongBeep");

let indexofAns;
let interval;
console.log('test 123');

const options = [option1, option2, option3, option4];

const generateNumber = (lower, upper) => {
    const randomNumber = Math.floor(Math.random() * (upper - lower + 1)) + lower;
    return randomNumber;
}

const generateOperator = () => {
    const arrayOperators = ['+', '-', '*', '/'];
    let randomNumber = generateNumber(0, arrayOperators.length - 1);
    return arrayOperators[randomNumber];
}

const generateQuestion = () => {
    operand1.textContent = generateNumber(-50, 50);
    operand2.textContent = generateNumber(-50, 50);
    operator.textContent = generateOperator();
    for (let i = 0; i < options.length; i++) {
        options[i].style.backgroundColor = "rgb(77, 62, 71)";
        options[i].removeAttribute("disabled");
        msgbox.textContent = "Result";
    }
}



const generateAnswer = () => {
    generateQuestion();
    let a = parseInt(operand1.textContent);
    let b = parseInt(operand2.textContent);
    let op = operator.textContent;
    let ans = 0;


    // Calculate the correct answer based on the operator
    switch (op) {
        case "+":
            ans = a + b;
            break;
        case "-":
            ans = a - b;
            break;
        case "*":
            ans = a * b;
            break;
        case "/":
            ans = a / b;
            break;
    }

    indexofAns = generateNumber(0, options.length - 1);
    for (let i = 0; i < options.length; i++) {
        if (i !== indexofAns) {
            options[i].textContent = generateNumber(ans - 50, ans + 50);
        } else {
            options[i].textContent = ans;
        }
    }
    clearInterval(interval);
    for (let i = 0; i < options.length; i++) {
        options[i].removeEventListener("click", clickHandler);
        options[i].addEventListener("click", clickHandler);
    }
}

const clickHandler = (event) => {
    for (let j = 0; j < options.length; j++) {
        if (j === indexofAns) {
            options[j].style.backgroundColor = "green";
        } else {
            options[j].style.backgroundColor = "red";
        }
        options[j].setAttribute("disabled", "true");
    }
    let selectedOption = parseFloat(event.target.textContent);
    let correctAnswer = parseFloat(options[indexofAns].textContent);
    
    if (selectedOption === correctAnswer) {
        msgbox.textContent = "Correct Answer";
        correctBeep.play();
    } else {
        msgbox.textContent = "Wrong Answer";
        wrongBeep.play();
    }
    interval = setInterval(generateAnswer, 10000);
};

generateAnswer();
