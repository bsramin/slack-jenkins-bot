FROM node:14.16.0-alpine3.13

# Install essential packages
#RUN apk add --no-cache --update bash vim git tzdata yarn curl
RUN npm install npm@7

# Copy project
COPY . /app
WORKDIR /app

# Install vendors
RUN npm install --production

# Build the project
RUN npm run compile
