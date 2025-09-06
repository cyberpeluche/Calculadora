const calculator = document.querySelector('.calculator');
const display = document.getElementById('display');
const keys = calculator.querySelector('.calculator-keys');

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

keys.addEventListener('click', e => {
    const { target } = e;
    if (!target.matches('button')) {
        return;
    }

    const key = target;
    const action = key.dataset.action;
    const keyContent = key.textContent;

    if (!action) {
        handleNumber(keyContent);
    } else if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        handleOperator(action, keyContent);
    } else if (action === 'decimal') {
        handleDecimal(keyContent);
    } else if (action === 'clear') {
        handleClear();
    } else if (action === 'calculate') {
        handleCalculate();
    } else if (action === 'negate') {
        handleNegate();
    } else if (action === 'percent') {
        handlePercent();
    }
});

function handleNumber(keyContent) {
    const displayedNum = display.value;
    if (waitingForSecondValue) {
        display.value = keyContent;
        waitingForSecondValue = false;
    } else {
        display.value = displayedNum === '0' ? keyContent : displayedNum + keyContent;
    }
}

function handleOperator(action, keyContent) {
    const inputValue = parseFloat(display.value);

    if (operator && waitingForSecondValue) {
        operator = action;
        return;
    }

    if (firstValue === null) {
        firstValue = inputValue;
    } else if (operator) {
        const result = calculate(firstValue, inputValue, operator);
        display.value = String(result);
        firstValue = result;
    }
    if  (firstValue === "5+5"){
        resultValue = "puto";
        return;
    }

    waitingForSecondValue = true;
    operator = action;
}

function handleDecimal(keyContent) {
    if (waitingForSecondValue) {
        display.value = '0.';
        waitingForSecondValue = false;
        return;
    }
    if (!display.value.includes('.')) {
        display.value += keyContent;
    }
   
    }


function handleClear() {
    display.value = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}

function handleCalculate() {
    const inputValue = parseFloat(display.value);

    if (operator && firstValue !== null) {
        const result = calculate(firstValue, inputValue, operator);
        display.value = String(result);
        firstValue = result;
        operator = null;
    }
}

function handleNegate() {
    display.value = String(parseFloat(display.value) * -1);
}

function handlePercent() {
    display.value = String(parseFloat(display.value) / 100);
}

function calculate(first, second, operator) {
    let result = 0;
    if (operator === 'add') {
        result = first + second;
    } else if (operator === 'subtract') {
        result = first - second;
    } else if (operator === 'multiply') {
        result = first * second;
    } else if (operator === 'divide') {
        result = first / second;
    }
    return result;
}