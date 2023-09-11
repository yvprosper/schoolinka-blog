# Schoolinka Blog Service

RESTful API with Domain Driven Design

## Development Environment Setup

1. Make sure you have nvm, node v18.17.0 or LTS version of node installed
2. Install `yarn` - `npm install -g yarn`.


## Documentation
Find the API documentation [HERE](https://schoolinka-blog.onrender.com/docs)

## Docker support

**Prerequisites**

1. [Docker](https://www.docker.com/products/docker-engine) Community Edition v17 or higher

```sh
$ docker build -t schoolinka-blog-service  .
$ docker run -p 40121:40121 --env-file=.env  schoolinka-blog-service
```

Access `http://localhost:<PORT>` and you're ready to go!

> http://localhost:40121/


## Quick Start
1. to clone the project `git clone https://github.com/yvprosper/schoolinka-blog.git`
2. install neccesary dependencies using `yarn install`
3. create `.env` file in root directory, populate with variables values in the `.env.example` file 
4. start the server locally using `yarn start:dev`
5. Access the default url with `http://localhost:<PORT>` 
> http://localhost:40121/


## Overview 
- uses Node.js > v16
- written using ES6 and Typescript
- uses Yarn for package dependency management


## Database
- PostgreSQL - Main datastore


## Some Tech

- Express - Node Framweork

- Awilix - dependency resolution support powered by Proxy

- Nodemon - Use for development file reload.

- CORS - a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

- Http-status - Utility to interact with HTTP status code.

- Sequelize - Sequelize is a modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more. Featuring solid transaction support, relations, eager and lazy loading, read replication and more.

- Dayjs - Parse, validate, manipulate, and display dates and times in JavaScript.

## Author
[Eravwuvieke Prosper Ilouoghene](https://www.linkedin.com/in/prosper-eravwuvieke-25b534163/)


## License
MIT License - fork, modify and use however you want.
