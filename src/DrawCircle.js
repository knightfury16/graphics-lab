// Bresenham's Circle Algorithm
function drawCircle(x0, y0, radius, color) {
  var x = radius;
  var y = 0;
  var err = 0;

  while (x >= y) {
      setPixel(x0 + x, y0 + y, {color}); // Octant 1
      setPixel(x0 + y, y0 + x, {color}); // Octant 2
      setPixel(x0 - y, y0 + x, {color}); // Octant 3
      setPixel(x0 - x, y0 + y, {color}); // Octant 4
      setPixel(x0 - x, y0 - y, {color}); // Octant 5
      setPixel(x0 - y, y0 - x, {color}); // Octant 6
      setPixel(x0 + y, y0 - x, {color}); // Octant 7
      setPixel(x0 + x, y0 - y, {color}); // Octant 8
      

      if (err <= 0) {
          y += 1;
          err += 2 * y + 1;
      }
      if (err > 0) {
          x -= 1;
          err -= 2 * x + 1;
      }
  }
}