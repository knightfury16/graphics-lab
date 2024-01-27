function setPixel(x, y, options = {}) {

    // Get the canvas element and its 2d context
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  // Default values
  const { color = 'black', style = 'rect', size = 1 } = options;

  // Validate parameters
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new Error('Coordinates must be numbers');
  }

  if (typeof color !== 'string') {
    throw new Error('Color must be a string');
  }

  if (typeof style !== 'string' || !['rect', 'circle'].includes(style)) {
    throw new Error('Style must be "rect" or "circle"');
  }

  if (typeof size !== 'number' || size <= 0) {
    throw new Error('Size must be a positive number');
  }

  ctx.fillStyle = color;

  if (style === 'rect') {
    ctx.fillRect(x, y, size, size);
  } else if (style === 'circle') {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
