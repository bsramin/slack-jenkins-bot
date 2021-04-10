FROM node:14.16.0-alpine3.13 as builder

# Install essential packages
RUN npm install -g npm@7

# Copy project
COPY . /app
WORKDIR /app

# Install vendors
RUN npm install

# Build the project
RUN npm run compile

# Copy static files
COPY ./src/public /app/dist/src/public
COPY ./src/init/tables.sql /app/dist/src/init/tables.sql

FROM node:14.16.0-alpine3.13 as app

# Install git (required by npm install --production)
RUN apk add --no-cache --virtual .build-deps git

# Install essential packages
RUN npm install -g npm@7

# Copy project
COPY --from=builder /app/dist/src /app/src
COPY --from=builder /app/dist/package.json /app/package.json
COPY --from=builder /app/.env /app/.env
WORKDIR /app

# Install vendors
RUN npm install --production

# Clean
RUN apk del .build-deps
