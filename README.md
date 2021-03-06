# Pokemon Go Fast Scanner
**Related Project**

For manage zones to use in this project:

https://github.com/jansete/pokemon-go-buddy-tools

This was a tool to scan faster with fastpokemap.se project (now the project is unavailable). Thanks for your poke-effort.

**1. Install Java & Node**
```
sudo apt-get update
sudo apt-get install default-jre
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**2. Install Chrome if run with UI**
```
sudo apt-get install libxss1 libappindicator1 libindicator7
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome*.deb
sudo apt-get install -f
```

**3. Install phantomjs if run without UI**
```
npm install -g phantomjs
```

**3. Install dependencies**
```
npm install
```

**4. Execute Selenium or create daemon(6)**
```
java -jar ./lib/selenium-server-standalone-2.44.0.jar
```

**5. Create config.json file in the project root like config.example.json with your endpoint**

**6. Configure selenium as service**
More daemon info: http://libslack.org/daemon/README
```
sudo apt-get install daemon
daemon --name="selenium_service" --output=log.txt sh selenium.sh
```
Other tips for daemon package:
```
daemon --name="selenium_service" --running # Check if daemon is running
daemon --name="selenium_service" --stop # Stop daemon
```

**7. Configure your crontab to execute app.js every 5 min**
```
crontab -e
```
Put in crontab file the following line, replace your app path.
```
*/5 * * * * node /home/jansete/pokemon-go-fast-scanner/app.js
```
Or you can use shell script to add more operations, example included.
```
*/5 * * * * sh /home/jansete/pokemon-go-fast-scanner/app.sh
```

**Zones json example**
```
{
  "1": {"lat": 40.45040881142351, "long": -3.675613403320313, "desc": "Madrid - Parque de Berlín", "owner": "Jansete"}
}
```

**Mobile**
You can change or minify (https://jscompress.com/) one script and save as web browser bookmark to use in your phones. URL example:
```
javascript:function getLatLong().....and more happy minified script
```

## Next steps:
- Add refresh cache script (added but not working yet)
- Add desktop alert (added but not working yet)
- Add gulp
