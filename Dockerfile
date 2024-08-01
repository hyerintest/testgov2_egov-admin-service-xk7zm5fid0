### STAGE 1: Build ###
FROM registry.turacocloud.com/turaco-package/node:14.8.0-alpine as build-stage

WORKDIR /usr/src/app

ARG PROFILE
ARG BASE_URL

ENV BASE_URL $BASE_URL

COPY package*.json ./

RUN npm install
COPY . .

RUN if npm run build:${PROFILE} > /dev/null 2>&1; then \
       npm run build:${PROFILE}; \
    else \
       npm run build; \
    fi

ENV SERVICE_PATH "/"
RUN chmod 777 /usr/src/app/start.sh

CMD /usr/src/app/start.sh

