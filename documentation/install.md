## SETUP

### GIT & LOCAL NODE

- Clone this repo
- Create a new `.env` file from `.env.dist` with the parameters correctly set
- `npm install`
- `npm run dev:init` (in development) or `npm run prod:init` (in production)
- `npm run dev` (in development) or `npm run prod` (in production)

### DOCKER

- Clone this repo
- Create a new `.env` file from `.env.dist` with the parameters correctly set
  - If you use the bundled docker-compose use `db` for the database host
- `docker-compose up --build -d`
- `docker-compose run app npm run prod:init`


### JOB SETUP

Read the [Job setup](job.md)

### SLACK

Read the [Slack setup](slack.md)

### JENKINS

Read the [Jenkins setup](jenkins.md)
