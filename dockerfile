ARG VERSION=latest
FROM ubuntu:${VERSION}

CMD [ "/usr/bin/sh", "mkdir", "ePharma" ]
COPY . /ePharma
RUN cd /ePharma

RUN apt-get update && apt-get install nodejs \
    npm install
EXPOSE 4200
RUN ng serve