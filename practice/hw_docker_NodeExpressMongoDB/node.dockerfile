# Build: docker build -f node.dockerfile -t danwahlin/node .
# look for images: docker images

# Option 1
# Start MongoDB and Node (link Node to MongoDB container with legacy linking)

# docker run -d --name my-mongodb mongo
#look for results: docker ps

#Start container mongoDM with link on my-mongoDB
# docker run -d -p 3000:3000 --link my-mongodb:mongodb --name nodeapp danwahlin/node
#look for for result: docker ps

# Option 2: Create a custom bridge network and add containers into it

# docker network create --driver bridge isolated_network
# docker run -d --net=isolated_network --name mongodb mongo
# docker run -d --net=isolated_network --name nodeapp -p 3000:3000 danwahlin/node

# Seed the database with sample database
# Run: docker exec nodeapp node dbSeeder.js
# look for results http://localhost:3000/

FROM node:latest

MAINTAINER Dan Wahlin

ENV NODE_ENV=development 
ENV PORT=3000

COPY      . /var/www
WORKDIR   /var/www

RUN       npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]