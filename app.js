document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('#display');
    const buttons = document.querySelectorAll('button');
    let firstOperand = '';
    let secondOperand = '';
    let currentOperator = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;

            if (button.id === 'clear') {
                clearDisplay();
                return;
            }

            if (button.classList.contains('operator')) {
                handleOperator(value);
                return;
            }

            if (value === '=') {
                calculate();
                return;
            }

            if (shouldResetDisplay) {
                display.value = '';
                shouldResetDisplay = false;
            }

            if (value === '.' && display.value.includes('.')) return;

            display.value += value;
        });
    });

    function handleOperator(operator) {
        if (currentOperator !== null) calculate();
        firstOperand = display.value;
        currentOperator = operator;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (currentOperator === null || shouldResetDisplay) return;

        secondOperand = display.value;
        const result = operate(currentOperator, parseFloat(firstOperand), parseFloat(secondOperand));

        display.value = result;
        currentOperator = null;
    }

    function operate(operator, firstNum, secondNum) {
        switch (operator) {
            case '+':
                return firstNum + secondNum;
            case '-':
                return firstNum - secondNum;
            case '*':
                return firstNum * secondNum;
            case '/':
                if (secondNum === 0) {
                    alert('Cannot divide by zero');
                    clearDisplay();
                    return '';
                }
                return firstNum / secondNum;
            default:
                return null;
        }
    }

    function clearDisplay() {
        display.value = '';
        firstOperand = '';
        secondOperand = '';
        currentOperator = null;
        shouldResetDisplay = false;
    }
});
