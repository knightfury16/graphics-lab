// MouseClick.js

var color = 'red';
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var startClick = null;
var lines = []; // Array to store drawn lines

//Block Context menu, right click context within the canvas
canvas.addEventListener('contextmenu', evt => {
  evt.preventDefault();
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener(
  'mousedown',
  function (evt) {
    // Check if it's a right-click
    if (evt.button === 2) {
      console.log('Right clicked');
      // 2 corresponds to right-click
      // Remove the last line from the array
      if (lines.length > 0) {
        lines.pop();
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Redraw all lines except the last one
        lines.forEach(line => {
          drawLine(line.x0, line.y0, line.x1, line.y1, line.color);
        });
      }
      return; // Exit the event listener function
    }

    var mousePos = getMousePos(canvas, evt);
    console.log("Clicked at = ", mousePos)

    if (startClick === null) {
      // First click, set start point
      startClick = mousePos;
    } else {
      // Second click, draw line
      drawLine(startClick.x, startClick.y, mousePos.x, mousePos.y, color);
      // Store the line in the array
      lines.push({
        x0: startClick.x,
        y0: startClick.y,
        x1: mousePos.x,
        y1: mousePos.y,
        color
      });
      // Reset start click to null
      startClick = null;
    }
  },
  false
);
