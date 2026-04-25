FROM node

RUN apt-get -y update 
RUN apt-get install -y git
RUN git config --global http.sslVerify false

WORKDIR /opt
RUN git clone https://github.com/david-drummer/progrendszerek.git

WORKDIR /opt/progrendszerek

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]