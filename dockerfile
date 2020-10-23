ARG VERSION=10.19.0
FROM node:${VERSION}

RUN mkdir /ePharma

WORKDIR /ePahrma

COPY . /ePharma 

# COPY package.json /ePharma
# COPY angular.json /ePharma
# COPY tsconfig.json /ePharma
# COPY tslint.json /ePharma

RUN cd /ePharma && pwd

RUN npm install -g @angular/cli@latest

RUN npm install

EXPOSE 80

CMD [ "ng", "serve" ]
