FROM armhf/node:6.9.1-slim

# www
RUN mkdir -p /www/static
COPY ./www/server.js /www/
COPY ./www/package.json /www/
WORKDIR /www
RUN npm install

# static site data
COPY ./www/static /www/static

EXPOSE 5000
ENTRYPOINT ["npm", "start"]

