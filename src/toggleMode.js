document.getElementById('toggleButton').addEventListener('click', function() {
  isCircleMode = !isCircleMode;
  var button = document.getElementById('toggleButton');
  var circleRadiusDiv = document.getElementById('circleRadius');
  if (isCircleMode) {
    button.textContent = 'Switch to Line Mode';
    circleRadiusDiv.style.display = 'block';
  } else {
    button.textContent = 'Switch to Circle Mode';
    circleRadiusDiv.style.display = 'none';
  }
});

document.getElementById('radiusInput').addEventListener('change', function() {
  var radius = parseInt(this.value);
  if (radius < 1) {
    radius = 1;
  }
  _radius = radius;

});

document.getElementById('changeColorBtn').addEventListener('click', () => {
  
  var colorValue = document.getElementById('colorInput').value;
  _globalColor = colorValue;
});