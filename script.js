const Calculator = (() => {

	let operand1 = "";
	let operand2 = "";
	let operator = "";

    const numberBtns = Array.from(document.querySelectorAll('[data-number]'));
    numberBtns.forEach(btn => btn.addEventListener('click', () => setOperands(btn)));

    const operatorBtns = Array.from(document.querySelectorAll('[data-operation]'));
    operatorBtns.forEach(btn => btn.addEventListener('click', () => setOperator(btn)));

    const equalBtn = document.querySelector('[data-equals]');
    equalBtn.addEventListener('click', () => evaluateExpression());

    const clearBtn = document.querySelector('[data-ac]');
    clearBtn.addEventListener('click', () => clearExpression());

    const setOperands = (btn) => {

        if (!operator) {
        	operand1 += btn.innerText;
        }
        else {
        	operand2 += btn.innerText;
        }

        DisplayController.displayNumber(btn);
    
    }

    const setOperator = (btn) => {

    	if (operand1 === "") {
    		return;
        }
   
        if (!operator) { 
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

    	if (operand1 === "" || !operand2 || !operator) return;

    	let evaluation = Operations.operate(operator, parseFloat(operand1), parseFloat(operand2));
    	DisplayController.displayEvaluation(evaluation);  
    	console.log(operand1 + " " + operator + " " + operand2);

    	if (evaluation !== "undefined") operand1 = evaluation;
    	else {
    		operand1 = "";
    		DisplayController.setEvaluating(false);
    	}	
    	operand2 = "";
    	operator = "";
    }

    const clearExpression = (btn) => {

    	operand1 = "";
    	operand2 = "";
    	operator = "";
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
		operator = true;
	}

    const displayDifferentOperator = (btn) => {

    	display.textContent = display.textContent.slice(0, -3);
    	displayOperator(btn);
    }


	const displayEvaluation = (x) => {

		display.textContent = x;
		operator = false;
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

const deleteBtn = document.querySelector('[data-delete]');
deleteBtn.addEventListener('click', function(){deleteFn()})








