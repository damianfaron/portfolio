const currentNumber = document.querySelector('.currentNumber');
const previousNumber = document.querySelector('.previousNumber');
const mathSign = document.querySelector('.mathSing');
const clearButton = document.querySelector('.clear');
const numbersButtons = document.querySelectorAll('.number');
const operatorsButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const calculatorHistrory = document.querySelector('.history');
const historyBtn = document.querySelector('.history-btn');
// zmienne

let resault = '';

// funkcje
function displayNumbers() {
	if (this.textContent === '.' && currentNumber.innerHTML.includes('.')) return;
	if (this.textContent === '.' && currentNumber.innerHTML === '')
		return (currentNumber.innerHTML = '.0');

	currentNumber.innerHTML += this.textContent;
}

function operate() {
	if (currentNumber.innerHTML === '' && this.textContent === '-') {
		currentNumber.innerHTML = '-';
		return;
	} else if (currentNumber.innerHTML === '') {
		return;
	}

	if (mathSign.innerHTML !== '') {
		showResault();
	}
	previousNumber.innerHTML = currentNumber.innerHTML;
	mathSign.innerHTML = this.textContent;
	currentNumber.innerHTML = '';
}

function showResault() {
	if (previousNumber.innerHTML === '' && currentNumber.innerHTML === '') return;

	let a = Number(currentNumber.innerHTML);
	let b = Number(previousNumber.innerHTML);
	let operator = mathSign.innerHTML;

	switch (operator) {
		case '+':
			resault = a + b;
			break;
		case '-':
			resault = b - a;
			break;
		case 'x':
			resault = a * b;
			break;
		case ':':
			resault = b / a;
			break;
		case '2^':
			resault = b ** a;
			break;
		default:
			break;
	}
	addToHistory();

	currentNumber.innerHTML = resault;
	previousNumber.innerHTML = '';
	mathSign.innerHTML = '';
}

function addToHistory() {
	const newHistoryItem = document.createElement('li');
	newHistoryItem.innerHTML = ` ${currentNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML}  =${resault}`;
	newHistoryItem.classList.add('history-item');
	calculatorHistrory.appendChild(newHistoryItem);
	updateHistoryButtonVisibility();
}
function clearHistory() {
	calculatorHistrory.textContent = '';
	updateHistoryButtonVisibility();
}

function updateHistoryButtonVisibility() {
	if (calculatorHistrory.children.length > 0) {
		historyBtn.classList.add('active');
	} else {
		historyBtn.classList.remove('active');
	}
}

function clearScreen() {
	resault = '';
	currentNumber.innerHTML = '';
	previousNumber.innerHTML = '';
	mathSign.innerHTML = '';
}

// nasłuchiwanie przycisków
operatorsButtons.forEach((button) => button.addEventListener('click', operate));
equalsButton.addEventListener('click', showResault);
clearButton.addEventListener('click', clearScreen);
numbersButtons.forEach((button) => {
	button.addEventListener('click', displayNumbers);
});
historyBtn.addEventListener('click', clearHistory);
