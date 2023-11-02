// Spin the slots

// Check if the user won or lost

// Give the user winnings or keep the bet

// Play again?

// Import user prompt
const prompt = require("prompt-sync")();

// Determine the amount of money being deposited
const deposit = () => {
    while(true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
        return numberDepositAmount;
        }
    }
};

// Determine the number of lines to bet on
const getNumLines = () => {
    while(true) {
        const lines = prompt("Enter the # of lines to bet on (1-3): ");
        const numLines = parseFloat(lines);

        if (isNaN(numLines) || numLines <= 0 || numLines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
        return numLines;
        }
    }
};

// Collect an amount to bet
const getBet = (balance, lines) => {
    while(true) {
        const bet = prompt("Enter the bet per line: ");
        const numBet = parseFloat(bet);

        if (isNaN(numBet) || numBet <= 0 || numBet > (balance / lines)) {
            console.log("Invalid bet, try again.");
        } else {
        return numBet;
        }
    }
};

// let allows you to change variable value overtime, unlike const which is fixed.
let balance = deposit();
const numLines = getNumLines();
const bet = getBet(balance, numLines);