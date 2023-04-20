FROM node:16-alpine3.13

RUN mkdir -p /root/app
WORKDIR /root/app
COPY . /root/app
RUN ls -a /root/app
RUN node -v
RUN npm install
RUN ls -a /root/app
CMD [ "npm", "run", "start" ]

EXPOSE 9090