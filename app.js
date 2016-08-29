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

// Logic
var largeScanner = fs.readFileSync('src/largeScanner.js', 'utf8');

var zones = JSON.parse(fs.readFileSync('zones.json', 'utf8'));
var pieces = createQueues(zones, 5);

pieces.forEach(function(splitted_zones) {
  scanZones(splitted_zones);
});


// Functions
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
  console.log(Date() + ' - Scanning in ' + zone.desc + ' - Owner: ' + zone.owner);
  driver.get('https://fastpokemap.se/#' + zone.lat + ',' + zone.long);
  driver.executeScript(largeScanner);
}

function getMilisSecs(mins) {
  return mins * 60 * 1000;
}

