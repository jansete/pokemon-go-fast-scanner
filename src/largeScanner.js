function getLatLong() {
  var hash = location.hash;
  var coordinates = hash.replace("#", "");
  return coordinates.split(",");
}

function largeScan(lat, long, desv, iters) {
  var desvIter = desv / iters;
  var minLat = lat - desv;
  var maxLat = lat + desv;
  var minLong = long - desv;
  var maxLong = long + desv;

  for (i = minLat; i < maxLat; i = i + desvIter) {
    for (j = minLong; j < maxLong; j = j + desvIter) {
      getPokemon(i, j);
    } 
  }
}

function executeScan(desv, iters) {
  var coordinates = getLatLong();
  var lat = parseFloat(coordinates[0]);
  var long = parseFloat(coordinates[1]);
  desv || (desv = 0.0075);
  iters || (iters = 35);
  largeScan(lat, long, desv, iters);
}

executeScan();