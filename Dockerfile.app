FROM node:18.14.0-bullseye-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
# copy app source code and set permissions
COPY --chown=node:node . .
# building for production
RUN npm ci --only=production
EXPOSE 80/tcp
# start process as node user
USER node
# node is not designed to run as PID 1, use dumb init to start node
CMD [ "dumb-init", "node", "app.js" ]