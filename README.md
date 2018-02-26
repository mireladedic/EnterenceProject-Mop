# _**MOPTwitter Clone**_

To run the project, just run the init.bat script on windows or init.sh script on linux/mac.
To run it via the scripts, you need to have Docker running.
The steps to run it locally, without Docker are:

 - npm install
 - npm install bower -g
 - bower install
 - npm install gulp -g
 - gulp --env=production
 - npm start
**In this case, you need to have MongoDB running locally.**
Note:
Edit the mongoDb host key in config.json with the Mongo IP, either locally ***localhost*** or the Docker default ***10.0.75.2***
