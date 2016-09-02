function getLatLng() {
  var hash = location.hash;
  var coordinates = hash.replace("#", "");
  return coordinates.split(",");
}

function largeScan(lat, lng, desv, iters) {
  var desvIter = desv / iters;
  var minLat = lat - desv;
  var maxLat = lat + desv;
  var minLng = lng - desv;
  var maxLng = lng + desv;

  for (i = minLat; i < maxLat; i = i + desvIter) {
    for (j = minLng; j < maxLng; j = j + desvIter) {
      getPokemon(i, j);
    } 
  }
}

function executeScan(desv, iters) {
  var coordinates = getLatLng();
  var lat = parseFloat(coordinates.lat);
  var lng = parseFloat(coordinates.lng);
  desv || (desv = 0.0075);
  iters || (iters = 35);
  largeScan(lat, lng, desv, iters);
}

executeScan();