## User Management API

This is a user management API built with [NestJS](https://docs.nestjs.com/),  [TypeScript](https://www.typescriptlang.org/), [PostgreSQL](https://www.postgresql.org/) and like ORM using [Prisma](https://www.prisma.io/). The API provides a series of endpoints to handle CRUD operations on user data, as well as the ability to upload and download CSV files to import and export user data.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
  <a href="https://www.typescriptlang.org/" target="blank"><img src="https://cdn.iconscout.com/icon/free/png-256/free-typescript-3521774-2945272.png" width="100" alt="TypeScript" style="border-radius:19px; margin-left:10px" /></a>
  <a href="https://www.postgresql.org/" target="blank"><img src="https://cdn.iconscout.com/icon/free/png-256/free-postgresql-3521647-2945091.png" width="105" alt="PostgreSQL logo" /></a>
  <a href="https://www.prisma.io/" target="blank"><img src="https://icons.veryicon.com/png/o/business/vscode-program-item-icon/prisma.png" width="106" alt="Prisma Logo" /></a>
</p>

## API Documentation
The API is documented using Swagger. You can access the full documentation by visiting ```/api-docs``` on your server after launching the application.

## Before to Started

Before starting the application you must start the server along with the database, for this you must use Docker to start
the database ``` docker-compose up db ```.

## Installation

```bash
$ npm install

# if you don't have Nestjs or Nodejs in your local machine:
$ docker-compose up server
```

## Running the app

```bash
# generate prisma
$ npx prisma generate

# migrate prisma
$ npx prisma migrate deploy

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
Port: [http://localhost:3001/api/users](http://localhost:3001/api/users)

## Requirements

- Nodejs (optional)
- Nestjs (optional)
- Docker

## License

Made by Dario Marzzucco.
