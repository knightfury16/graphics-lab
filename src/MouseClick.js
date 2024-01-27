// MouseClick.js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var startClick = null;

var shapes = []; //Array to store drawn shape


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

    var color = _globalColor;
    // Check if it's a right-click
    if (evt.button === 2) {
      console.log('Right clicked');
      // 2 corresponds to right-click
      // Remove the last line from the array
      if (shapes.length > 0) {
        shapes.pop();
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Redraw all lines except the last one
        shapes.forEach(shape => {
          if (shape.type == 'line') {
            drawLine(shape.pos.x0, shape.pos.y0, shape.pos.x1, shape.pos.y1, shape.color);
          } else {
            drawCircle(shape.pos.x0, shape.pos.y0, shape.pos.raius, shape.color);
          }
        });
      }
      return; // Exit the event listener function
    }

    var mousePos = getMousePos(canvas, evt);
    console.log('Clicked at = ', mousePos);

    if (isCircleMode) {
      drawCircle(mousePos.x, mousePos.y, _radius, color);
      shapes.push({
        type: 'circle',
        pos: {
          x0: mousePos.x,
          y0: mousePos.y,
          raius: _radius
        },
        color
      });
    } else {
      if (startClick === null) {
        // First click, set start point
        startClick = mousePos;
      } else {
        // Second click, draw line
        drawLine(startClick.x, startClick.y, mousePos.x, mousePos.y, color);
        // Store the line in the array
        shapes.push({
          type: 'line',
          pos: {
            x0: startClick.x,
            y0: startClick.y,
            x1: mousePos.x,
            y1: mousePos.y
          },
          color
        });
        // Reset start click to null
        startClick = null;
      }
    }
  },
  false
);
