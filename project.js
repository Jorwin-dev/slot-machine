// Deposit some money

// Determine the number of lines to bet on

// Collect an amount to bet

// Spin the slots

// Check if the user won or lost

// Give the user winnings or keep the bet

// Play again?

// Import user prompt
const prompt = require("prompt-sync")();

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

const depositAmount = deposit();

console.log(depositAmount);