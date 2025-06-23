# Baller Bot Backend

![Logo](./docs/banner.png)

## Table of Contents

- [Tech Stack](#tech-stack)
- [Run Locally](#run-locally)
- [Environment Variables](#environment-variables)
- [Other Commands](#other-commands)
- [Code Quality Tools](#code-quality-tools)

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

Start the development server

```bash
  yarn start:dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Parameter      | Description                   |
| :------------- | :---------------------------- |
| `PORT`         | Port on which server will run |
| `BOT_API_KEY`  | Your `telegram` bot API key   |
| `DATABASE_URL` | Your `sqlite` file location   |

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
