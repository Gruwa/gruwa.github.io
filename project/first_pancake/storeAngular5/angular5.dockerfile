# Build: docker build -f angular5.dockerfile -t gruwa/angular5 .
# look for images: docker images

FROM node:latest

MAINTAINER Aleksey Zolotarenko

ENV NODE_ENV=development
ENV PORT=8000

COPY      . /var/www
WORKDIR   /var/www

RUN       npm install

EXPOSE $PORT

ENTRYPOINT [ "npm", "start"]
