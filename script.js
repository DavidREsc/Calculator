let a = '';
let b = '';
let operator = '';
let clearScreen = false;
let evaluated = false;

const add = (a, b) => (a + b);

const subtract = (a, b) => (a - b);

const multiply = (a, b) => (a * b);

const divide = (a, b) => b === 0 ? "LOL" : a / b;

const operate = (operator, a, b) => {

	if (operator === '+') return add(a, b);
	else if (operator === '-') return subtract(a, b);
	else if(operator === '*') return multiply(a, b);
	else if(operator === '÷') return divide(a, b);
}

function setNumber(num) {

	if (clearScreen) {

		screen.textContent = ''; 
		clearScreen = false;
	}

	if (evaluated) {

        screen.textContent = '';
		acFn();
		evaluated = false;
	}

	if(num === '.' && screen.textContent.includes('.')) return;

    screen.textContent += num;
}

function setOperator(op) {

	if (operator) {
  
        if (evaluated) {

        	operator = op.textContent;
        	evaluated = false;
        	a = parseFloat(screen.textContent);
        	clearScreen = true;
        }

        else {

            equalFn(); 
            operator = op.textContent;
		    a = parseFloat(screen.textContent);
		    evaluated = false;
		    clearScreen = true;
		}

		return;
	}

	operator = op.textContent;
    a = parseFloat(screen.textContent);
    clearScreen = true;	
}

function equalFn() {

    if (evaluated) {

    	a = parseFloat(screen.textContent);
    }

    else {

        b = parseFloat(screen.textContent);
    }

    let ans = operate(operator, a, b);
    screen.textContent = '';
    screen.textContent += ans;
    evaluated = true;  
    b = '';
}

function acFn() {

	a = '';
	b = '';
	operator = '';
	screen.textContent = '';
}

function deleteFn() {

	screen.textContent = screen.textContent.slice(0, -1);
}

const numberBtns = Array.from(document.querySelectorAll('[data-number]'));
numberBtns.forEach(number => number.addEventListener('click', function(){setNumber(number.textContent)}));

const operators = Array.from(document.querySelectorAll('[data-operation]'));
operators.forEach(operator => operator.addEventListener('click', function(){setOperator(operator)}));

const equalBtn = document.querySelector('[data-equals]');
equalBtn.addEventListener('click', function(){equalFn()});

const acBtn = document.querySelector('[data-ac]');
acBtn.addEventListener('click', function(){acFn()});

const deleteBtn = document.querySelector('[data-delete]');
deleteBtn.addEventListener('click', function(){deleteFn()})

const screen = document.querySelector('[data-display]');







