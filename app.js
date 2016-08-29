var util = require('util');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var fs = require('fs');

// Async Function
var scanZones = function(zones) {
  var driver = new webdriver.Builder()
      .forBrowser('firefox')
      .usingServer('http://127.0.0.2:4444/wd/hub')
      .build();
  var minIter = 1;
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
var pieces = splitZones(zones, 5);;

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

function executeScanner(zone, driver) {
  console.log(Date() + ' - Scanning in ' + zone.desc + ' - Owner: ' + zone.owner);
  driver.get('https://fastpokemap.se/#' + zone.lat + ',' + zone.long);
  driver.executeScript(largeScanner);
}

function getMilisSecs(mins) {
  return mins * 60 * 1000;
}

