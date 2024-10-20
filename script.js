// ----  variable declarations
let isRunning = false;
let playerHasWon = false;
let computerHasWon = false;
let playerPoints = 0;
let computerPoints = 0;
let playerMove, computerMove;
let playerMoveIsRock;
let playerMoveIsPaper;
let playerMoveIsScissors;
let computerMoveIsRock;
let computerMoveIsPaper;
let computerMoveIsScissors;
let pMoveEqualsCMove; // playerMove == computerMove
let pMoveBeatsCMove = false;
let roundResultMessage;
const PLAYERDRAWMESSAGE = ", so it's a tie. ";
const PLAYERWINMESSAGE = ", so you win! ";
const PLAYERLOSEMESSAGE = ", so you lose. ";
let score;
let randomNumber;
// ------- end of variable declarations---

// interactive elements
const pointsToWinText = document.getElementById("pointsToWinText");
const goButton = document.getElementById("submit");
const rockElement = document.getElementById("rockElement");
const paperElement = document.getElementById("paperElement");
const scissorsElement = document.getElementById("scissorsElement");
const computerElement = document.getElementById("computerElement");
const scoreMessage = document.getElementById("scoreMessage");
const resultMessage = document.getElementById("resultMessage");

goButton.addEventListener("click", (e) => {
    isRunning = true;
	startGame();
    pointsToWin = pointsToWinText.value;
})

rockElement.addEventListener("click", (e) => {
    if (isRunning) {
		resetRound();
		playerMove = "rock";
        playerMoveIsRock = true; 
		getComputerMove();
		evaluateRoundResult();
		evaluateGameResult();
	}
})

paperElement.addEventListener("click", (e) => {
    if (isRunning) {
		resetRound();
		playerMove = "paper";
        playerMoveIsPaper = true; 
		getComputerMove();
		evaluateRoundResult();
		evaluateGameResult();
	}
})

scissorsElement.addEventListener("click", (e) => {
    if (isRunning) {
		resetRound();
		playerMove = "scissors";
        playerMoveIsScissors = true; 
		getComputerMove();
		evaluateRoundResult();
		evaluateGameResult();
    }
})

// ---

function startGame() {
	score = 0;
	resetRound();
	playerHasWon = false;
	computerHasWon = false;
}

function resetRound() {
	computerMove = "";
	playerMove = "";
    playerMoveIsRock = false;
    playerMoveIsPaper = false;
    playerMoveIsScissors = false;
    computerMoveIsRock = false;
    computerMoveIsPaper = false;
    computerMoveIsScissors = false;
	roundResultMessage = "";
}

function getComputerMove() {
	randomNumber = Math.floor(Math.random() * 3);
	console.log(`%c ${randomNumber} `, 'color: red;');
	switch (randomNumber) {
		case 0:
			computerMove = "rock";
			roundResultMessage = "The computer choose rock";
			computerMoveIsRock = true;
			computerElement.innerHTML = '🪨';
			break;
		case 1:
			computerMove = "paper";
			roundResultMessage = "The computer choose paper";
			computerMoveIsPaper = true;
			computerElement.innerHTML = '📃';
			break;
		case 2: // (case 2)
			computerMove = "scissors";
			roundResultMessage = "The computer choose scissors";
			computerMoveIsScissors = true;
			computerElement.innerHTML = '✂️';
			break;
	}
	console.log(`%c ${computerMove} `, 'color: blue;');
}

function evaluateRoundResult() {
	pMoveEqualsCMove = playerMove.includes(computerMove);
	console.log(pMoveEqualsCMove);
	// This evaluates who wins by checking the player's move against 
	// what that move is weak and strong against. I don't look for ties 
	// here because I check for a tie with the previous line pMoveEqualsCMove
	if (playerMoveIsRock) {
		if (computerMoveIsScissors) {
			pMoveBeatsCMove = true;
		// I don't use else if ComputerMoveIsScissors or else if ComputerMoveIsRock 
		// because if computerMove isn't paper, then the player automatically
		// doesn't beat the computerMove. I don't distinguish between 
		// ComputerMoveIsScissors and ComputerMoveIsRock because I have a 
		// pMoveEqualsCMove which distinguishes it for me later
		} else { 
			pMoveBeatsCMove = false;
		} // if statement for determining win when playerMoveIsRock
	} else if (playerMoveIsPaper) {
		if (computerMoveIsRock) {
			pMoveBeatsCMove = true;
		} else {
			pMoveBeatsCMove = false;
		} // if statement for determining win when playerMoveIsPaper
	} else if (playerMoveIsScissors) {
		if (computerMoveIsPaper) {
			pMoveBeatsCMove = true;
		} else {
			pMoveBeatsCMove = false;
		} // if statement for determining win when playerMoveIsScissors
	} // if statement for determining who wins

	// output for game results

	if (pMoveEqualsCMove) {
		score = "(" + playerPoints + "-" + computerPoints + ")";
		scoreMessage.innerHTML = roundResultMessage + PLAYERDRAWMESSAGE + score;
	} else if (pMoveBeatsCMove) {
		playerPoints++;
		score = "(" + playerPoints + "-" + computerPoints + ")";
		scoreMessage.innerHTML = roundResultMessage + PLAYERWINMESSAGE + score;
	//  else alone works for player losses because there isn't a tie and the player doesn't win
	} else { 
		computerPoints++;
		score = "(" + playerPoints + "-" + computerPoints + ")";
		scoreMessage.innerHTML = roundResultMessage + PLAYERLOSEMESSAGE + score;
	} // if statement for output
	
	playerHasWon = playerPoints == pointsToWin;
	computerHasWon = computerPoints == pointsToWin;
}

function evaluateGameResult() {
	if (playerHasWon) {
		resultMessage.innerHTML = "Congratulations! You won!";
	} else if (computerHasWon) {
		resultMessage.innerHTML = "Sorry, you lost. Better luck next time!";
	}
}