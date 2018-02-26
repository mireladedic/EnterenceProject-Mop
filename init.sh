#!/usr/bin/env bash
npm install
npm install bower -g
bower install
npm install gulp -g
gulp --env=production

docker run --name mop_twitter -p 27017:27017 -d mongo
#create docker image
docker build . -t m_twitter
#run the app,mapping my machines port 3000 to my container published port
docker run -p 8080:8080 m_twitter