const fs = require('fs')

// Input
const drawings = `31,50,68,16,25,15,28,80,41,8,75,45,96,9,3,98,83,27,62,42,59,99,95,13,55,10,23,84,18,76,87,56,88,66,1,58,92,89,19,54,85,74,39,93,77,26,30,52,69,48,91,73,72,38,64,53,32,51,6,29,17,90,34,61,70,4,7,57,44,97,82,37,43,14,81,65,11,22,5,36,71,35,78,12,0,94,47,49,33,79,63,86,40,21,24,46,20,2,67,60`
const boards = fs.readFileSync('./input.txt').toString().replaceAll(`\n\n`, ' ').replaceAll('\n', ' ').replaceAll('  ', ' ')

const drawingsArr = drawings.split(',')
// const boardsStr = boards.replaceAll('  ', ' ')

// Part 1

let winningDraw;


// Calculates answer
const calculateRemaining = board => {
  let remainder = 0;
  board.forEach(row => row.forEach(input => {
    if (Number.isFinite(input)) remainder += input;
  }))
  console.log(`The answer is ${remainder * winningDraw}.`)
}

// Creates an array of bingo boards from a given string of numbers
const assembleBoards = (boardsStr) => {
  const bingoArr = [];
  let counter = 0;
  const boardsArr = boardsStr.split(' ')
  for (let i = 0; i < boardsArr.length / 25; i++) {
    const bingoBoard = [];
    for (let j = 0; j < 5; j++) {
      const rowArr = [];
      for (let k = 0; k < 5; k++) {
        rowArr[k] = Number(boardsArr[counter])
        counter++
      }
      bingoBoard[j] = rowArr
    }
    bingoArr[i] = bingoBoard;
  }
  return bingoArr;
}

// Simulates a game of bingo with a given array of bingo boards
const simulateBingo = (bingoArr) => {
  for (let i = 0; i < drawingsArr.length; i++) {
    const currentDraw = Number(drawingsArr[i]);
    bingoArr.forEach(board => {
      board.forEach(row => {
        if (row.includes(currentDraw)) row[row.indexOf(currentDraw)] = true;
        if (row.every((value) => value === true)) {
          i = drawingsArr.length;
          winningDraw = currentDraw;
          calculateRemaining(board)
        }
      })
      for (let j = 0; j < 5; j++) {
        const col = [];
        for (let k = 0; k < 5; k++) {
          col[k] = board[k][j]
        }
        if (col.every((value) => value === true)) {
          i = drawingsArr.length;
          winningDraw = currentDraw;
          calculateRemaining(board)
        }
      }
    })
  }
}


// Part 2

// Checks to see if there is one board left then sends it to calculate the answer
const isOnlyOne = (currentDraw, bingoArr) => {
  if (bingoArr.length === 1) {
    winningDraw = currentDraw;
    calculateRemaining(bingoArr[0]);
  }
}

// Plays bingo until there is only one board left
const simulateBingoAllTheWay = (bingoArr) => {
  for (let i = 0; i < drawingsArr.length; i++) {
    const currentDraw = Number(drawingsArr[i]);
    bingoArr.forEach(board => {
      board.forEach(row => {
        if (row.includes(currentDraw)) row[row.indexOf(currentDraw)] = true;
        if (row.every((value) => value === true)) {
          isOnlyOne(currentDraw, bingoArr);
          bingoArr = bingoArr.filter(oldBoard => oldBoard !== board)

        }
      })
      for (let j = 0; j < 5; j++) {
        const col = [];
        for (let k = 0; k < 5; k++) {
          col[k] = board[k][j]
        }
        if (col.every((value) => value === true)) {
          isOnlyOne(currentDraw, bingoArr);
          bingoArr = bingoArr.filter(oldBoard => oldBoard !== board)
        }
      }
    })
  }
}


const init = () => {
  const bingoBoards = assembleBoards(boards)
  simulateBingo(bingoBoards);
  simulateBingoAllTheWay(bingoBoards);
}

init();