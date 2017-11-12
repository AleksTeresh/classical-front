FROM node:boron

# Create app directory
WORKDIR /usr/src/app

RUN npm isntall cubx-http-server -g

# Bundle app source
COPY . .

EXPOSE 80

CMD [ "npm", "run", "start-server" ]
