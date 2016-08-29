1. Execute Selenium

java -jar ./lib/selenium-server-standalone-2.44.0.jar

2. Create zones.json file in the project root like zones.example.json with your zones

3. Configure your crontab to execute app.js every 5 min

crontab -e

Put in crontab file the following line, replace your app path.

*/5 * * * * node /home/jansete/app.js

Next steps:
- Configure selenium like daemon
- Add gulp
