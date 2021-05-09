const Calculator = (() => {

	let operand1 = "";
	let operand2 = "";
	let operator = "";
	let evaluated = false;
	let lastOperator = "";
	let lastOperand = "";

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
        	operand1 += btn.innerText;
        }
        else {
        	operand2 += btn.innerText;
        }

        DisplayController.displayNumber(btn);
    
    }

    const setOperator = (btn) => {

    	if ((operand1 === "" || operand1 === "-") && btn.innerText !== '-') return;

        else if (operand1 === "-" && btn.innerText === "-") return

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

    	if (operand2 === "" && lastOperator !== "") {
    	    evaluation = Operations.operate(lastOperator, parseFloat(operand1), parseFloat(lastOperand));
    	}
    	else if (operand1 !== "" && operand2 !== "" && operator !== "") {
    		evaluation = Operations.operate(operator, parseFloat(operand1), parseFloat(operand2));
    		lastOperator = operator;
    		lastOperand = operand2;
    	}

    	else return;

        DisplayController.displayEvaluation(evaluation);
        evaluated = true;  

    	if (evaluation === "undefined" || evaluation === "infinity") {

    		operand1 = "";
    		DisplayController.setEvaluating(false);  		
    	}
    	else operand1 = evaluation;

    	operand2 = "";
    	operator = "";
    }

    const deleteFromExpression = () => {

    	console.log("HI");
    }

    const clearExpression = (btn) => {

    	operand1 = "";
    	operand2 = "";
    	operator = "";
    	lastOperand = "";
    	lastOperator = "";
    	evaluated = false;
    	DisplayController.clearDisplay();
    }

    return;
})();

const Operations = (() => {

    const add = (a, b) => (a + b);

    const subtract = (a, b) => (a - b);

    const multiply = (a, b) => (a * b);

    const divide = (a, b) => b === 0 ? "undefined" : a / b;

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

	const displayNumber = (btn) => {
		if (!evaluating) {
			display.textContent = "";
			evaluating = true;
		}

		display.textContent += btn.innerText;
	}
		
	const displayOperator = (btn) => {

		display.textContent += " " + btn.innerText + " ";
	}

    const displayDifferentOperator = (btn) => {

    	display.textContent = display.textContent.slice(0, -3);
    	displayOperator(btn);
    }


	const displayEvaluation = (x) => {

		display.textContent = x;
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

	return {displayDefault, displayNumber, displayOperator, displayEvaluation, getDisplayValue, clearDisplay, displayDifferentOperator, setEvaluating};
})();

DisplayController.displayDefault();
