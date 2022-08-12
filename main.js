const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', '÷', 'x', '=', 'AC'];
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
function invert(a) {
    if (Number.isFinite(a)) {
        return a * -1;
    }
    return a;
}
function operate(operator, a, b) {

    console.log({ operator });
    if (operator == '+') {
        return add(a, b);
    } else if (operator == '-') {
        return subtract(a, b);
    } else if (operator == '÷') {
        return divide(a, b);
    } else if (operator == 'x') {
        return multiply(a, b);
    } else if (operator == '+/-') {
        return invert(a);
    }
}

function handleOnClick(e) {
    let innerText = e.target.innerText;
    const display = document.querySelector('.display');
    //console.log(innerText);
    evaluate(innerText, display);
}
let lastClick = ''
let runningTotal = '';
let currentOperator = '';
let lastOperator = '';
let decimalFlag = '';

function evaluate(innerText, display) {
    console.log({ innerText });
    if (Number.isFinite(+innerText)) {
        if (numbers[0] === '' && !decimalFlag) {
            numbers[0] = innerText;
            display.innerText = numbers[0];
            console.log(`numbers[0] = ${numbers[0]}`)
        } else if (lastClick === 'number' || decimalFlag) {
            numbers[0] += innerText;
            display.innerText = numbers[0];
            console.log(`numbers[0] = ${numbers[0]}`)
        } else {
            numbers[1] = numbers[0];
            numbers[0] = innerText;
            display.innerText = numbers[0];
            console.log(`numbers[0] = ${numbers[0]}`);
            console.log(`numbers[1] = ${numbers[1]}`);

        }
        lastClick = 'number';
    } else if (innerText != 'Shift') {
        if (innerText === '=' && lastClick !== 'operator') {
            console.log(`rt before = ${runningTotal}`);

            if (runningTotal === '' || runningTotal === undefined) {
                runningTotal = operate(currentOperator, +numbers[0], +numbers[1]);
            } else {
                runningTotal = operate(currentOperator, runningTotal, +numbers[0]);
            }
            console.log({ runningTotal })
            display.innerText = runningTotal;
            decimalFlag = false;
        } else if (innerText === 'AC') {
            lastClick = ''
            runningTotal = '';
            currentOperator = '';
            numbers = [''];
            display.innerText = 0;
            decimalFlag = false;
            lastOperator = '';
        } else if (innerText === '.' && lastClick !== 'operator') {
            numbers[0] += innerText;
            display.innerText = numbers[0];
            console.log(`numbers[0] = ${numbers[0]}`)
            decimalFlag = true;
        } else {
            decimalFlag = false;
        }
        if (innerText !== '.') {
            lastOperator = currentOperator;
            currentOperator = innerText;
        }

        console.log(`currentOperator = ${currentOperator}  | runningTotal ${runningTotal} | currentNumber ${+numbers[0]}   | lastNumber ${+numbers[1]}  | numbers.length ${numbers.length} | lastClick ${lastClick}`)

        if (innerText !== 'AC' && innerText !== '=' && lastClick !== 'operator' && numbers.length === 2 && !decimalFlag) {
            if (runningTotal === '' || runningTotal === undefined) {
                runningTotal = operate(lastOperator, +numbers[0], +numbers[1]);
            } else {
                runningTotal = operate(lastOperator, runningTotal, +numbers[0]);
            }
            display.innerText = runningTotal;

        }

        lastClick = 'operator';
    }
}

let numbers = [''];

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(val => {
    val.addEventListener('click', handleOnClick);
})
function removeTransition(e) {
    if (e.propertyName == 'transform') {

        this.classList.remove('clicked');
    }

}

function onButtonPress(e) {
    let keyCode = e.keyCode;
    console.log(`before e.keyCode = ${e.keyCode}`);
    console.log(`before e.keyCode = ${e.keyCode === 187}`);
    if (keyCode === 187 && e.shiftKey) {
        keyCode = 188;
    }
    if (keyCode === 56 && e.shiftKey) {
        keyCode = 8;
    }
    console.log(`after e.keyCode = ${e.keyCode}`);
    const button = document.querySelector(`div[data-key="${keyCode}"]`);
    button?.classList.add('clicked');
    const display = document.querySelector('.display');
    let innerText = e.key;
    if (innerText == 'c') {
        innerText = 'AC';
    } else if (innerText == 'Enter') {
        innerText = '=';
    } else if (innerText === '=' && e.shiftKey) {
        innerText = '+';
    } else if (innerText === '8' && e.shiftKey) {
        innerText = 'x';
    }
    if (validKeys.includes(innerText)) {
        evaluate(innerText, display);
    }


}
window.addEventListener('keydown', onButtonPress);
buttons.forEach(button => button.addEventListener('transitionend', removeTransition));
