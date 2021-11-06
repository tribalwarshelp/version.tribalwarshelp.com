
FROM node:14.18.1-alpine as build-deps

#Stage 1

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./

ARG VERSION="v0.0.0"
ARG ENABLE_SENTRY="false"
ARG SENTRY_URL=""
ARG SENTRY_ORG=""
ARG SENTRY_PROJECT=""
ARG SENTRY_AUTH_TOKEN=""
ARG SENTRY_DSN=""

ENV REACT_APP_ENABLE_SENTRY=$ENABLE_SENTRY \
    SENTRY_URL=$SENTRY_URL \
    SENTRY_ORG=$SENTRY_ORG \
    SENTRY_PROJECT=$SENTRY_PROJECT \
    SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN \
    REACT_APP_SENTRY_DSN=$SENTRY_DSN \
    REACT_APP_VERSION=$VERSION \
    NODE_ENV=production

RUN yarn build

#Stage 2

FROM nginx:1.21-alpine
COPY --from=build-deps /usr/src/app/build /var/www
COPY default.conf /etc/nginx/templates/default.conf.template
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
