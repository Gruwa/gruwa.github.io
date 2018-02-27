# Build: docker build -f angular5.dockerfile -t gruwa/angular5 .
# look for images: docker images

FROM node:latest

MAINTAINER Aleksey Zolotarenko

ENV NODE_ENV=development
ENV PORT=4204

COPY      . /var/www
WORKDIR   /var/www

RUN       yarn install
#RUN       npm i --save node-sass@4.7.2
#RUN       npm rebuild node-sass --force

EXPOSE $PORT

ENTRYPOINT [ "npm", "start"]
