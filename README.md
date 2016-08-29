1. Install Java & Node

sudo apt-get update
sudo apt-get install default-jre

curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs

2. Install Chrome if run with UI

sudo apt-get install libxss1 libappindicator1 libindicator7
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome*.deb
sudo apt-get install -f

3. Install phantomjs if run without UI

npm install -g phantomjs

3. Install dependencies

npm install

4. Execute Selenium

java -jar ./lib/selenium-server-standalone-2.44.0.jar

5. Create zones.json file in the project root like zones.example.json with your zones

6. Configure your crontab to execute app.js every 5 min

crontab -e

Put in crontab file the following line, replace your app path.

*/5 * * * * node /home/jansete/app.js

Next steps:
- Configure selenium like daemon
- Add gulp
