let cols = 10; // Number of columns in the grid
let rows = 10; // Number of rows in the grid
let grid = new Array(cols); // 2D array to hold cells
let stack = []; // Stack for DFS
let start, target; // Start and target cells
let path = []; // Shortest path

function setup() {
  createCanvas(400, 400); // Create canvas

  // Create grid
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  // Set start and target cells
  start = grid[0][0];
  target = grid[cols - 1][rows - 1];
  start.wall = false;
  target.wall = false;

  // Add start cell to stack
  stack.push(start);
}

function draw() {
  background(255); // Clear the canvas

  // Perform DFS steps
  if (stack.length > 0) {
    let current = stack.pop(); // Remove the last cell from the stack
    if (current === target) { // If target reached, stop
      noLoop();
      console.log("Path found!");
    }

    // Get neighbors of current cell
    let neighbors = current.getNeighbors();
    for (let neighbor of neighbors) {
      if (!neighbor.visited && !neighbor.wall) {
        stack.push(neighbor); // Add neighbor to stack
        neighbor.visited = true;
        neighbor.previous = current; // Set previous cell
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

  // Draw stack cells
  for (let cell of stack) {
    cell.show(color(0, 255, 0, 50));
  }

  // Draw visited cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].visited && !stack.includes(grid[i][j])) {
        grid[i][j].show(color(255, 0, 0, 50));
      }
    }
  }

  // Find path
  path = [];
  let temp = target;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  // Draw path
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
    this.visited = false; // Whether the cell has been visited
    this.wall = random(1) < 0.2; // 20% chance of being a wall
    this.previous = undefined; // Previous cell in the path
  }

  // Show the cell on the canvas
  show(col) {
    fill(col);
    if (this.wall) {
      fill(0); // Walls are black
    }
    noStroke();
    rect(this.i * width / cols, this.j * height / rows, width / cols, height / rows);
  }

  // Get neighboring cells
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
