function add(a, b) {
    if (Number.isFinite(a) && Number.isFinite(b)) {
        return a + b;
    }
    return;
}
function subtract(a, b) {
    if (Number.isFinite(a) && Number.isFinite(b)) {
        return a - b;
    }
    return;
}
function multiply(a, b) {
    console.log('multiply');
    console.log({ a });
    console.log({ b });
    if (Number.isFinite(a) && Number.isFinite(b)) {
        let c = a * b;
        console.log({ c });
        return a * b;
    }
    return;
}
function divide(a, b) {
    if (Number.isFinite(a) && Number.isFinite(b)) {
        return a / b;
    }
    return;
}
function operate(operator, a, b) {

    //console.log({ operator });
    if (operator == '+') {
        return add(a, b);
    } else if (operator == '-') {
        return subtract(a, b);
    } else if (operator == '÷') {
        return divide(a, b);
    } else if (operator == 'x') {
        return multiply(a, b);
    }
}

function handleOnClick(e) {
    let innerText = e.target.innerText;
    const display = document.querySelector('.display');
    //console.log(innerText);
    if (Number.isFinite(+innerText)) {
        if (lastClick == 'operator') {
            lastNumber = currentNumber;
            currentNumber = innerText;
            display.innerText = currentNumber;

        } else if (lastClick == '') {
            runningTotal = +innerText;
            currentNumber = +innerText;

            display.innerText = runningTotal;
            console.log({ runningTotal })
        } else {
            currentNumber += innerText;
            display.innerText = currentNumber;
            console.log({ currentNumber })
        }
        lastClick = 'number';
        console.log({ runningTotal });
    } else {
        lastClick = 'operator';
        if (innerText === '=') {
            console.log({ runningTotal });
            console.log('before');

            runningTotal = operate(currentOperator, runningTotal, +currentNumber);
            currentNumber = runningTotal;
            display.innerText = runningTotal;
            lastNumber = '';
            console.log({ runningTotal });

        } else if (innerText === 'AC') {
            lastClick = ''
            runningTotal = 0;
            currentOperator = '';
            currentNumber = '';
            display.innerText = runningTotal;
        }
        currentOperator = innerText;
        if (innerText !== '=' && innerText !== 'AC' && lastNumber != '') {
            runningTotal = operate(currentOperator, runningTotal, +currentNumber);
            display.innerText = runningTotal;

        }
        console.log({ currentOperator });
        console.log({ runningTotal });
        console.log({ currentNumber });
    }
}
let lastClick = ''
let runningTotal = 0;
let currentOperator = '';
let lastNumber = '';
let currentNumber = '';

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(val => {
    val.addEventListener('click', handleOnClick);
})