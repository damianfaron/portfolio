const items = document.querySelectorAll('.tictactoe__item');
const info = document.querySelector('.info');
const restBtn = document.querySelector('.rest-button');
// const nameInput = document.querySelector('#name-input');
// const playerNameDisplay = document.querySelector('.player-name');
// const okButton = document.querySelector('#ok-button');
// console.log(items);
let activePlayer;
let fields;
let gameActive;
// let playerName = '';

// =====================================
// =================================================================
// tryb AI zmienne
// =====================================
// =================================================================
const modeSelect = document.querySelector('#mode-selecet');
let isAIMode = false;

// =======================
const resetGameState = () => {
	activePlayer = 'X';
	fields = ['', '', '', '', '', '', '', '', ''];
	gameActive = true;
	// playerName = nameInput.value;
	// playerNameDisplay.innerText = playerName;
	// if (nameInput.value.trim() === '') {
	// 	info.innerText = 'Proszę wpisać imię przed rozpoczęciem gry'; // Komunikat jeśli imię nie jest wpisane
	// 	return; // Nie rozpoczynaj gry, jeśli imię nie jest wpisane
	// }

	// playerName = nameInput.value.trim(); // Pobranie imienia z inputa
	// playerNameDisplay.innerText = `Gracz: ${playerName}`; // Wyświetlenie imienia gracza

	// activePlayer = 'X';
	// fields = ['', '', '', '', '', '', '', '', ''];
	// gameActive = true;
	// nameInput.value = ''; // Wyczyść zawartość inputa po rozpoczęciu gry
	// info.innerText = '';
	// playerNameDisplay.innerText = `Gracz: ${playerName}`;
};
resetGameState();
let winningConditions = [
	// warunki wygrywające
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2],
];
// strzałkowe
const displayWinInfo = () => {
	info.innerText = `Gratulacje ${activePlayer}, Wygrałeś!`;
};
const displayTieInfo = () => {
	info.innerText = `REMIS!`;
};
const clearMessage = () => {
	info.innerText = '';
};
const validateGame = () => {
	let gameWon = false;
	// iteracja od komórki 0 do 7 = 8
	for (let i = 0; i <= 7; i++) {
		const [positionA, positionB, positionC] = winningConditions[i];
		const value1 = fields[positionA];
		const value2 = fields[positionB];
		const value3 = fields[positionC];

		if (value1 !== '' && value1 === value2 && value1 === value3) {
			gameWon = true;
			break;
		}
	}
	if (gameWon) {
		gameActive = false;
		displayWinInfo();
	} else if (isBoardFull()) {
		gameWon = false;
		displayTieInfo();
	}
};
const getAIMove = (fields) => {
	const availablePositions = fields
		.map((field, index) => (field === '' ? index : null))
		.filter((index) => index !== null);

	if (availablePositions.length > 0) {
		const randomIndex = Math.floor(Math.random() * availablePositions.length);
		return availablePositions[randomIndex];
	}
	return null;
};

const isBoardFull = () => {
	return fields.find((field) => field === '') === undefined;
};
// funkcje anonimowa

items.forEach((item) => {
	item.addEventListener('click', (e) => {
		// destrukturyzacja - wyciągnięcie danych z tablicy
		const { position } = e.target.dataset;
		// wyciągnięcie pozycji przy pomocy instrukcji:
		// console.log(position);
		if (gameActive && fields[position] === '') {
			// czy aktywny ?

			fields[position] = activePlayer;
			// dodawanie elementu
			e.target.classList.add(`tictactoe__item--player-${activePlayer}`);
			validateGame();
			activePlayer = activePlayer === 'X' ? 'O' : 'X';

			//
			// console.log(e);
			// console.log(e.target.dataset);
			// jeżeli aktywny gracz jest X to zwróci X jeżeli nie to będzie Y i od nowa

			// =========================
			// AI mode
			// =========================
			if (isAIMode && activePlayer === 'O' && gameActive) {
				setTimeout(() => {
					const aiMove = getAIMove(fields);
					if (aiMove !== null) {
						fields[aiMove] = activePlayer;
						items[aiMove].classList.add(
							`tictactoe__item--player-${activePlayer}`
						);
						validateGame();

						// Sprawdź, czy gra się zakończyła po ruchu AI
						if (!gameActive) return;

						activePlayer = activePlayer === 'X' ? 'O' : 'X';
					}
				}, 500); // Opóźnienie dla ruchu AI
			}
		}
	});
});
const removeClasses = () => {
	items.forEach((item) => {
		item.classList.remove(
			'tictactoe__item--player-X',
			'tictactoe__item--player-O'
		);
	});
};
const updateGameMode = () => {
	const selectedMode = modeSelect.value; // Pobranie aktualnie wybranego trybu
	isAIMode = selectedMode === 'ai-easy'; // Ustawienie trybu AI
};

// funkcja ustawiająca stan gry

const handleButtonClick = () => {
	resetGameState();
	removeClasses();
	clearMessage();
	updateGameMode();
	// setPlayerName();
};

restBtn.addEventListener('click', handleButtonClick);
// ===============================================

modeSelect.addEventListener('change', handleButtonClick);
// okButton.addEventListener('click', handleButtonClick);

// ==
// const setPlayerName = () => {
// 	if (nameInput.value.trim() !== '') {
// 		playerName = nameInput.value.trim(); // Zapisz imię
// 		playerNameDisplay.innerText = `Gracz: ${playerName}`; // Wyświetl imię gracza
// 		resetGameState(); // Rozpocznij grę
// 	} else {
// 		info.innerText = 'Proszę wpisać imię przed rozpoczęciem gry'; // Komunikat o konieczności wpisania imienia
// 	}
// };
