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

    //console.log({ operator });
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
    if (Number.isFinite(+innerText)) {
        if (numbers[0] === '') {
            numbers[0] = innerText;
            display.innerText = numbers[0];
            console.log(`numbers[0] = ${numbers[0]}`)
        } else if (lastClick === 'number') {
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
    } else {
        if (innerText === '=' && lastClick !== 'operator') {
            if (runningTotal === '') {
                runningTotal = operate(currentOperator, +numbers[0], +numbers[1]);
            } else {
                runningTotal = operate(currentOperator, runningTotal, +numbers[0]);
            }
            console.log({ runningTotal })
            display.innerText = runningTotal;
        } else if (innerText === 'AC') {
            lastClick = ''
            runningTotal = '';
            currentOperator = '';
            numbers = [''];
            display.innerText = 0;
        } else if (false) {
            //innerText === '+/-'
            if (lastClick == 'number') {
                numbers[0] = operate(currentOperator, +numbers[0], runningTotal)?.toString();
                display.innerText = numbers[0];
            } else if (lastClick == 'operator') {
                runningTotal = operate(currentOperator, runningTotal, +numbers[0]);
                display.innerText = runningTotal;
            }

        }

        currentOperator = innerText;
        console.log(`currentOperator = ${currentOperator}  | runningTotal ${runningTotal} | currentNumber ${+numbers[0]}   | lastNumber ${+numbers[1]}  | numbers.length ${numbers.length} | lastClick ${lastClick}`)

        if (innerText !== 'AC' && innerText !== '=' && lastClick !== 'operator' && numbers.length === 2) {
            if (runningTotal === '') {
                runningTotal = operate(currentOperator, +numbers[0], +numbers[1]);
            } else {
                runningTotal = operate(currentOperator, runningTotal, +numbers[0]);
            }
            display.innerText = runningTotal;

        }
        lastClick = 'operator';
    }
}
let lastClick = ''
let runningTotal = '';
let currentOperator = '';


let numbers = [''];

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(val => {
    val.addEventListener('click', handleOnClick);
})