const Calculator = (() => {

	let operand1 = "";
	let operand2 = "";
	let operator = "";
	let evaluated = false;
	let previousOperator = "";
	let previousOperand = "";

    const numberBtns = Array.from(document.querySelectorAll('[data-number]'));
    numberBtns.forEach(btn => btn.addEventListener('click', () => setOperands(btn)));

    const operatorBtns = Array.from(document.querySelectorAll('[data-operation]'));
    operatorBtns.forEach(btn => btn.addEventListener('click', () => setOperator(btn)));

    const equalBtn = document.querySelector('[data-equals]');
    equalBtn.addEventListener('click', () => evaluateExpression());

    const clearBtn = document.querySelector('[data-ac]');
    clearBtn.addEventListener('click', () => clearExpression());

    const deleteBtn = document.querySelector('[data-delete]');
    deleteBtn.addEventListener('click', () => deleteFromExpression());


    const setOperands = (btn) => {

        if (!operator) {
        	if (evaluated) { 
                clearExpression();
            }
            if (validateOperands(btn.innerText, operand1)) {
                if (btn.innerText === '.' && operand1.length === 0) {
                    operand1 += '0';
                    DisplayController.displayNumber('0');
                }
                operand1 += btn.innerText;
            }
            else return;
        }
        else {

            if (validateOperands(btn.innerText, operand2)) {
                if (btn.innerText === '.' && operand2.length === 0) {
                    operand2 += '0';
                    DisplayController.displayNumber('0');
                }
        	    operand2 += btn.innerText;
            }
            else return;
        }

        DisplayController.displayNumber(btn.innerText);    
    }

    const validateOperands = (text, operand) => {

        if (text === '.' && operand.includes('.')) return false;
        else if (operand.length === 1 && operand[0] == '0' && text !== '.') return false;
        return true;
    }

    const setOperator = (btn) => {

    	if ((operand1 === "" || operand1 === "-" || operand1 === '.' || operand2 === '.') && btn.innerText !== '-') return;

        else if ((operand1 === "-" || operand1 === '.' || operand2 === '.') && btn.innerText === "-") return

        else if (operand1[operand1.length-1] === '.' || operand2[operand2.length-1] === '.') return;

        else if (operand1 === "-.") return;

        else if (operand1 === "" && btn.innerText === '-') {
        	setOperands(btn);
        	return;
        }
   
        else if (!operator) { 
            operator = btn.innerText;
        }
        else {

        	if (!operand2) {
        		DisplayController.displayDifferentOperator(btn);
        		operator = btn.innerText;
        		return;
        	}
        	evaluateExpression();
        	operator = btn.innerText;
        }

    	DisplayController.displayOperator(btn);
    }

    const evaluateExpression = () => {

    	let evaluation = null;

        if (operand2[operand2.length-1] == '.') return;

    	else if (operand2 === "" && previousOperand !== "" && operator === "") {
    	    evaluation = Operations.operate(previousOperator, parseFloat(operand1), parseFloat(previousOperand));
    	}
    	else if (operand1 !== "" && operand2 !== "" && operator !== "") {
    		evaluation = Operations.operate(operator, parseFloat(operand1), parseFloat(operand2));
    		previousOperator = operator;
    		previousOperand = operand2;
    	}

    	else return;

        DisplayController.displayEvaluation(evaluation);
        evaluated = true;  

    	if (evaluation === "Undefined") {

    		operand1 = "";
    		DisplayController.setEvaluating(false);  		
    	}
    	else operand1 = evaluation.toString();

    	operand2 = "";
    	operator = "";
    }

    const deleteFromExpression = () => {

        if (operand2 !== "") {
            operand2 = operand2.slice(0, -1);
            DisplayController.deleteLastDigit();
            return;
        }

        else if (operator) {
            operator = "";
            DisplayController.deleteOperator();
            return;
        }

        else if (operand1 !== "" && evaluated !== true) {

            operand1 = operand1.slice(0, -1);
            DisplayController.deleteLastDigit();
            return;
        }
        else return;
    }

    const clearExpression = (btn) => {

    	operand1 = "";
    	operand2 = "";
    	operator = "";
    	previousOperand = "";
    	previousOperator = "";
    	evaluated = false;
    	DisplayController.clearDisplay();
    }

    return;
})();

const Operations = (() => {

    const add = (a, b) => (a + b);

    const subtract = (a, b) => (a - b);

    const multiply = (a, b) => (a * b);

    const divide = (a, b) => b === 0 ? "Undefined" : a / b;

    const operate = (operator, a, b) => {
	    if (operator === '+') return add(a, b);
	    else if (operator === '-') return subtract(a, b);
	    else if(operator === '*') return multiply(a, b);
	    else if(operator === '÷') return divide(a, b);
    }

    return {add, subtract, multiply, divide, operate};
})();

const DisplayController = (() => {

	let evaluating = false;

	const display = document.querySelector('[data-display]');

	const displayDefault = () => {
		display.textContent = "0";
	}

	const displayNumber = (num) => {
		if (!evaluating) {
			display.textContent = "";
			evaluating = true;
		}

        display.textContent += num;
	}

    const getCommaDelimited = (text) => {

        return (text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    }

    const searchForDecimal = (text) => {

        freq = {};

        for (let char of text) {

            if (char === '.') {

                freq[char] ? freq[char] += 1: freq[char] = 1;
            }
        }

        return freq['.'];
    }
		
	const displayOperator = (btn) => {

		display.textContent += " " + btn.innerText + " ";
	}

    const displayDifferentOperator = (btn) => {

    	display.textContent = display.textContent.slice(0, -3);
    	displayOperator(btn);
    }

    const deleteLastDigit = () => {

        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent === "") {
            clearDisplay();
        }
    }

    const deleteOperator = () => {

        display.textContent = display.textContent.slice(0, -3);
    }


	const displayEvaluation = (x) => {

        let text = x.toString();
        if(text.includes('.')) {
            let stext = text.split('.');
            display.textContent = getCommaDelimited(stext[0]) + '.' + stext[1];
        }   
		else display.textContent = getCommaDelimited(x);
	}

	const getDisplayValue = () => {

		return display.textContent;
	}

	const clearDisplay = () => {
		displayDefault();
		evaluating = false;
	}

	const setEvaluating = (bool) => {

		evaluating = bool;
	}

	return {displayDefault,
            displayNumber,
            displayOperator,
            displayEvaluation,
            getDisplayValue,
            clearDisplay,
            displayDifferentOperator,
            setEvaluating,
            deleteLastDigit,
            deleteOperator};
})();

DisplayController.displayDefault();







