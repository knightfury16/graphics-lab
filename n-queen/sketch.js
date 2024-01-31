let board;
let queens = [];
let queenSize = 40;
let gridSize = 50;
let numQueens = 4;

function setup() {
  createCanvas(numQueens * gridSize, numQueens * gridSize);
  board = new Array(numQueens).fill().map(() => new Array(numQueens).fill(0));
  placeQueens(0);
}

function draw() {
  background(255);
  drawBoard();
  drawQueens();
}

function drawBoard() {
  for (let i = 0; i < numQueens; i++) {
    for (let j = 0; j < numQueens; j++) {
      if ((i + j) % 2 === 0) {
        fill(255);
      } else {
        fill(100);
      }
      rect(i * gridSize, j * gridSize, gridSize, gridSize);
    }
  }
}

function drawQueens() {
  for (let queen of queens) {
    fill(255, 0, 0);
    ellipse(queen.x * gridSize + gridSize / 2, queen.y * gridSize + gridSize / 2, queenSize, queenSize);
  }
}

function isSafe(row, col) {
  // Check if there's a queen in the same row
  for (let i = 0; i < col; i++) {
    if (board[row][i] === 1) {
      return false;
    }
  }
  
  // Check upper diagonal on left side
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 1) {
      return false;
    }
  }
  
  // Check lower diagonal on left side
  for (let i = row, j = col; j >= 0 && i < numQueens; i++, j--) {
    if (board[i][j] === 1) {
      return false;
    }
  }
  
  return true;
}

function placeQueens(col) {
  if (col >= numQueens) {
    return true;
  }

  for (let i = 0; i < numQueens; i++) {
    if (isSafe(i, col)) {
      board[i][col] = 1;
      queens.push({x: col, y: i});
      if (placeQueens(col + 1)) {
        return true;
      }
      board[i][col] = 0; // backtrack
      queens.pop();
    }
  }

  return false;
}
