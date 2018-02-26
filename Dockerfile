#node parent image
FROM node:carbon
#set working directory
WORKDIR /usr/src/app
#copy current directory contains into the container
COPY package*.json ./
# install all needed packages
RUN npm install
RUN npm install gulp-cli -g
RUN npm install bower -g
RUN echo '{ "allow_root": true }' > /root/.bowerrc
COPY . .
RUN bower install
RUN gulp --env=production
#make port avelible to the world outside this container
EXPOSE 8080
#run app when container lauches
CMD ["npm", "start"]