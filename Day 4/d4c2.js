const funcs = require('../shared/functions');
const fs = require('fs');
require('dotenv').config();

const checkForWins = (board) => hasColumnWin(board) || hasRowWin(board);

const hasColumnWin = (board) => {
  for (let col = 0; col < board[0].length; col++) {
    let total = 0;
    for (let row = 0; row < board.length; row++) {
      total += board[row][col];
    }
    if (total >= 5) {
      return true;
    }
  }
  return false;
};

const hasRowWin = (board) => {
  for (let row = 0; row < board.length; row++) {
    let total = 0;
    for (let col = 0; col < board[row].length; col++) {
      total += board[row][col];
    }
    if (total >= 5) {
      return true;
    }
  }
  return false;
};

const calculateWin = (board, shadow, finalCall) => {
  let totalOfUnmarkedNumbers = 0;
  for (var row = 0; row < shadow.length; row++) {
    for (var col = 0; col < shadow[row].length; col++) {
      if (shadow[row][col] === 0) {
        totalOfUnmarkedNumbers += Number(board[row][col]);
      }
    }
  }
  return totalOfUnmarkedNumbers * Number(finalCall);
};

const main = async () => {
  const input = await funcs.input.get(4);
  const numbers = input[0].split(',');

  const boards = [];
  const shadowBoards = [];
  const boardHasWon = {};
  const winningBoards = [];
  let numberOfBoards = 0;

  // Skip first and second row, since it's the numbers and the gap before the
  // boards start. We'll need that later.
  let board = [];
  for (let i = 2; i < input.length; i++) {
    if (!input[i]) {
      shadowBoards.push(new Array(5).fill(0).map((x) => new Array(5).fill(0)));
      boards.push(board);
      boardHasWon[numberOfBoards] = false;
      numberOfBoards++;
      board = [];
    } else {
      // Split on the spaces between numbers
      const numbers = input[i].split(' ');
      // Cleans out the double-spaces
      const cleanedNumbers = [];
      for (let j = 0; j < numbers.length; j++) {
        if (numbers[j]) {
          cleanedNumbers.push(numbers[j]);
        }
      }
      board.push(cleanedNumbers);
    }
  }

  for (let i = 0; i < numbers.length; i++) {
    for (board = 0; board < boards.length; board++) {
      // Skip the board if it's already won
      if (boardHasWon[board]) {
        continue;
      }
      for (row = 0; row < boards[board].length; row++) {
        for (col = 0; col < boards[board][row].length; col++) {
          if (boards[board][row][col] === numbers[i]) {
            shadowBoards[board][row][col] = 1;
            if (checkForWins(shadowBoards[board])) {
              boardHasWon[board] = true;
              winningBoards.push([
                boards[board],
                shadowBoards[board],
                numbers[i],
                `Board ${board}`,
              ]);
            }
          }
        }
      }
    }
  }

  // After we are all done, we grab the last board that
  // was inserted into the winningBoards array since it's
  // the last one to win, and calculate the final answer
  const win = calculateWin(
    winningBoards[winningBoards.length - 1][0],
    winningBoards[winningBoards.length - 1][1],
    winningBoards[winningBoards.length - 1][2],
  );
  console.log(`Calculated total (and answer to today's prompt) is "${win}"!`);
};

main();

module.exports = main;
