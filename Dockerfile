FROM node:14.16.0-alpine3.13

# Install essential packages
#RUN apk add --no-cache --update bash vim git tzdata yarn curl
RUN npm install -g npm@7

# Copy project
COPY . /app
WORKDIR /app

# Install vendors
RUN npm install

# Build the project
RUN npm run compile
