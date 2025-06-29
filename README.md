# Baller Bot Backend

![Logo](./docs/banner.png)

## Table of Contents

- [Requirements](#requirements)
- [Tech Stack](#tech-stack)
- [Run Locally](#run-locally)
- [Environment Variables](#environment-variables)
- [Other Commands](#other-commands)
- [Code Quality Tools](#code-quality-tools)

## Requirements

- Node.js
- Configured `.env` file
- Yarn (optional)
- Sqlite database `<name>.db` file added to `data` folder (optional)

## Tech Stack

[![My Skills](https://skillicons.dev/icons?i=ts,nest,prisma,sqlite&theme=dark)](https://skillicons.dev)

## Run Locally

Clone the project

```bash
  git clone https://github.com/ulyagram77/baller-bot-backend.git
```

Go to the project directory

```bash
  cd baller-bot-backend
```

Install dependencies

```bash
  yarn
```

Create environment file

```bash
  cp .env.example .env
```

Fill in the environment variables in `.env` file (see [Environment Variables](#environment-variables) section)

Generate Prisma client and apply database migrations (it will also create the database file if it doesn't exist):

```bash
  yarn db:migrate:prod
```

Start the development server

```bash
  yarn start:dev
```

You can inspect documentation and database after via:

- Swagger docs: [http://localhost:3001/api](http://localhost:3001/api)
- Prisma studio: [http://localhost:5555](http://localhost:5555)

> [!NOTE]
>
> 1. On first run, make sure to execute `yarn db:migrate:prod` to create the SQLite database and apply all migrations, as the database file is not exsisted before.
> 2. To access prisma studio, you will need to run `yarn db:studio`, details in the [Other Commands](#other-commands) section.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Parameter               | Description                                     |
| :---------------------- | :---------------------------------------------- |
| `NODE_ENV`              | Node environment (development, production)      |
| `PORT`                  | Port on which server will run (3000 if not set) |
| `BOT_API_KEY`           | Your `telegram` bot API key                     |
| `DATABASE_URL`          | Your `sqlite` file location                     |
| `JWT_SECRET`            | Your `jwt` signature secret                     |
| `JWT_ACCESS_TOKEN_TTL`  | Your `jwt` access token expiration time         |
| `JWT_REFRESH_TOKEN_TTL` | Your `jwt` refresh token expiration time        |
| `COOKIE_DOMAIN`         | Your `jwt` cookie domain (localhost for dev)    |

> [!IMPORTANT]
> The `JWT_ACCESS_TOKEN_TTL` and `JWT_REFRESH_TOKEN_TTL` values expressed in seconds or a string describing a time span [vercel/ms](https://github.com/vercel/ms).

## Other Commands

Compile and run the project:

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# build for production
$ yarn run build
```

Run tests:

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

Work with the database:

```bash
# create and apply migrations
$ yarn run db:migrate

# apply already created migrations
$ yarn run db:migrate:prod

# reset the database
$ yarn run db:reset

# show the database in the browser client
$ yarn run db:show
```

Team instruments:

```bash
# run the linter
$ yarn run lint

# run the formatter
$ yarn run format
```

## Code Quality Tools

This project uses the following tools to ensure code quality and consistency:

- **[ESLint](https://eslint.org/)** – Lints JavaScript/TypeScript code
- **[Prettier](https://prettier.io/)** – Formats code automatically
- **[Husky](https://typicode.github.io/husky/)** – Runs linting and formatting on git hooks
- **[Lint-staged](https://github.com/okonet/lint-staged)** – Runs linting and formatting on staged files

> [!NOTE]
> All tools are automatically triggered on commit using `husky` and `lint-staged`.  
> Only staged files are checked and auto-fixed before committing.
