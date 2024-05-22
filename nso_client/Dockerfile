FROM node:alpine as base

RUN addgroup -g 1001 nso \
  && adduser -G nso -h /home/nso -u 1001 -D nso

FROM base

USER nso

WORKDIR /home/nso/client

COPY --chown=nso:nso . .

RUN npm install

