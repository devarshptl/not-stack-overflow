FROM node:bookworm as base

RUN addgroup -gid 1001 nso \
  && adduser --ingroup nso --home /home/nso --uid 1001 --disabled-password nso

FROM base

USER nso

WORKDIR /home/nso/server

COPY --chown=nso:nso . .

RUN npm install
