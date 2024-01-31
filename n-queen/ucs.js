let cols, rows;
let grid = [];
let openSet = [];
let start, target;
let path = [];

function setup() {
  createCanvas(400, 400);
  cols = 10;
  rows = 10;

  // Create a 2D grid
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  // Set the start and target cells
  start = grid[0][0];
  target = grid[cols - 1][rows - 1];
  start.wall = false;
  target.wall = false;

  // Initialize the open set with the start cell
  openSet.push(start);
}

function draw() {
  background(255);

  // Perform UCS algorithm steps
  if (openSet.length > 0) {
    let winner = findLowestCostCell();
    if (winner === target) {
      noLoop();
      console.log("Path found!");
    }

    removeFromArray(openSet, winner);
    winner.visited = true;

    let neighbors = winner.getNeighbors();
    for (let neighbor of neighbors) {
      let tempCost = winner.cost + dist(winner.i, winner.j, neighbor.i, neighbor.j);
      if (!neighbor.visited && !neighbor.wall) {
        if (!openSet.includes(neighbor) || tempCost < neighbor.cost) {
          neighbor.cost = tempCost;
          neighbor.previous = winner;
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      }
    }
  } else {
    console.log("No solution!");
    noLoop();
    return;
  }

  // Draw grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  // Draw open set cells
  for (let cell of openSet) {
    cell.show(color(0, 255, 0, 50));
  }

  // Draw closed set cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].visited && !openSet.includes(grid[i][j])) {
        grid[i][j].show(color(255, 0, 0, 50));
      }
    }
  }

  // Draw the path
  path = [];
  let temp = target;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  noFill();
  stroke(0, 0, 255);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].i * width / cols + width / (2 * cols), path[i].j * height / rows + height / (2 * rows));
  }
  endShape();
}

// Custom Cell class
class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.cost = Infinity;
    this.visited = false;
    this.wall = random(1) < 0.2; // 20% chance of being a wall
    this.previous = undefined;
  }

  show(col) {
    fill(col);
    if (this.wall) {
      fill(0);
    }
    noStroke();
    rect(this.i * width / cols, this.j * height / rows, width / cols, height / rows);
  }

  getNeighbors() {
    let neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (this.i + i >= 0 && this.i + i < cols && this.j + j >= 0 && this.j + j < rows) {
          neighbors.push(grid[this.i + i][this.j + j]);
        }
      }
    }
    return neighbors;
  }
}

// Function to find the cell with the lowest cost in the open set
function findLowestCostCell() {
  let lowestCostIndex = 0;
  for (let i = 0; i < openSet.length; i++) {
    if (openSet[i].cost < openSet[lowestCostIndex].cost) {
      lowestCostIndex = i;
    }
  }
  return openSet[lowestCostIndex];
}

// Function to remove an element from an array
function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elt) {
      arr.splice(i, 1);
    }
  }
}
