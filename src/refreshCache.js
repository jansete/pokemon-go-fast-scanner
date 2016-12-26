function getLatLng() {
  var hash = location.hash;
  var coordinates = hash.replace("#", "");
  return coordinates.split(",");
}

function refreshCache(lat, lng, desv, iters) {
  var desvIter = desv / iters;
  var minLat = lat - desv;
  var maxLat = lat + desv;
  var minLng = lng - desv;
  var maxLng = lng + desv;

  for (i = minLat; i < maxLat; i = i + desvIter) {
    for (j = minLng; j < maxLng; j = j + desvIter) {
      loadCache({lat: i, lng: j});
    }
  }
}

function executeRefresh(desv, iters) {
  var coordinates = getLatLng();
  var lat = parseFloat(coordinates[0]);
  var lng = parseFloat(coordinates[1]);
  desv || (desv = 0.01);
  iters || (iters = 20);
  refreshCache(lat, lng, desv, iters);
}

executeRefresh();