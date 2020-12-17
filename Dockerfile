FROM node:10.17.0-jessie-slim as node
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y git

# Install app dependencies
COPY package.json /usr/src/app/
RUN NODE_ENV=production npm install

# Bundle app source
COPY ./ /usr/src/app/src

# Make the app available on port
EXPOSE 3000
CMD [ "node", "./src/server.js" ]
