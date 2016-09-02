// @ todo use args from command line with minimist
var mode = 'server'; // Or Desktop
var browser = 'chrome';
if (mode == 'server') {
  browser = 'phantomjs';
}
var util = require('util');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var fs = require('fs');
var largeScanner = fs.readFileSync('src/largeScanner.js', 'utf8');

// Async Function
var scanZones = function(zones) {
  var driver = new webdriver.Builder()
      .forBrowser(browser)
      .build();
  var minIter = 3.5;
  var mins = 0;

  zones.forEach(function(zone) {
    if (mins > 0) {
      setTimeout(function(){
        executeScanner(zone, driver);
      }, getMilisSecs(mins));
    }
    else {
      executeScanner(zone, driver);
    }
    mins = mins + minIter;
  });

  var miliSecs = getMilisSecs(mins);

// @todo @see driver.wait();
  setTimeout(function(){
    driver.quit();
    console.log('------------');
    console.log(Date() + ' - End of scan.');
  }, miliSecs);
};

// App execution
main();

// Functions
function main() {
  var http = require('http');
  var url = getZonesUrl();

  http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){
      var response = JSON.parse(body);
      var zones = response.places;

      if (zones != "undefined" && zones.length) {
        var pieces = createQueues(zones, 5);

        pieces.forEach(function(splitted_zones) {
          scanZones(splitted_zones);
        });
      }
    });
  }).on('error', function(e){
    console.log("Got an error: ", e);
  });
}

function getZonesUrl() {
  var config = getConfig();
  return config.endpoint + '/v' + config.version + '/places';
}

function getConfig() {
  return JSON.parse(fs.readFileSync('config.json', 'utf8'));
}

function splitZones(zones, limit) {
  var pieces = [];
  var i = 0;
  var j = 0;

  Object.keys(zones).forEach(function(key) {
    if (j == 0) {
      pieces[i] = [];
    }
    pieces[i][j] = zones[key];
    j++;
    if (j == limit) {
      j = 0;
      i++;
    }
  });

  return pieces;
}

function createQueues(zones, limit) {
  var queues = [];
  var i = 0;
  var j = 0;

  Object.keys(zones).forEach(function(key) {
    if (j == 0) {
      queues[i] = [];
    }
    queues[i][j] = zones[key];
    i++;
    if (i == limit) {
      i = 0;
      j++;
    }
  });

  return queues;
}

function executeScanner(zone, driver) {
  console.log(Date() + ' - Scanning in ' + zone.name + ' - Owner: ' + zone.user.full_name);
  driver.get('https://fastpokemap.se/#' + zone.geo_lat + ',' + zone.geo_lng);
  driver.executeScript(largeScanner);
}

function getMilisSecs(mins) {
  return mins * 60 * 1000;
}
