FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# RUN npm isntall cubx-http-server -g

# Bundle app source
COPY . .

RUN npm install minimist
RUN npm install http-proxy
RUN npm install express

CMD [ "npm", "run", "start-server" ]
