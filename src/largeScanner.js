function getLatLng(marker) {
  return marker._latlng;
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
  var coordinates = getLatLng(marker);
  var lat = coordinates.lat;
  var lng = coordinates.lng;
  desv || (desv = 0.0075);
  iters || (iters = 35);
  largeScan(lat, lng, desv, iters);
}

executeScan();