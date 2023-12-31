const prompt = require("prompt-sync")(); // Import user prompt

// Global variables
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

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

// Spin the slots
const spin = () => {
    // Generates an array of all the possible symbols we can pick from
    const symbols = [];
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    // Has all of the different reels
    const reels = [];

    // Loop through all of the available reels
    for (i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};

// Transpose the reels Matrix
const transpose = (reels) => {
    const rows = [];

    for (i = 0; i < ROWS; i++) {
        rows.push([]);
        for (j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
};

// Print to the user what they spun
const printSlots = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }

        console.log(rowString);
    }
};

// Check if the user won or lost
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        // Compare the symbols to see if you won (all must be same to win)
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings;
};

// Allow the game to be played
const game = () => {
    // let allows you to change variable value overtime, unlike const which is fixed.
    let balance = deposit();

    while (true) {
        console.log("You have a balance of $" + balance);
        const numLines = getNumLines();
        const bet = getBet(balance, numLines);
        balance -= bet * numLines;
        const reels = spin();
        const rows = transpose(reels);
        printSlots(rows);
        const winnings = getWinnings(rows, bet, numLines);
        balance += winnings;
        console.log("You won, $" + winnings);

        // Check if user has insufficent funds, and if they want to play again.
        if (balance <= 0) {
            console.log("You've gone broke!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)? ");

        if (playAgain != "y") break;
    }
}

game();