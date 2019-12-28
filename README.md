# ONClick API and User Interface

This is the fullstack app for the ONClick\
ONClick is a project management tool for ON Semiconductor Tarlac. This repository is only for ONClick API.
This is my personal project but this system is mainly use in OSPI Tarlac

## Installation

To run the app, run these commands in two separate terminal windows from the root:

```bash
cd server && npm i && npm start
```

and

```bash
cd client && npm i && npm start
```

## What I learn

- [NodeJS](https://nodejs.org/en/) - is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [GraphQL](https://graphql.org/learn/) - GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - is the best way to quickly build a production-ready, self-documenting API for GraphQL clients, using data from any source.
- [Sequelize](https://sequelize.org/) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
- [PostgresSQL](https://www.postgresql.org/) - is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
- [Heroku](https://www.heroku.com/) - is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.

## Authors

- **Raniel Garcia** - _Initial work_

## Sample GraphQL Queries

### SignIn

```
mutation{signIn (login: "ranielgarcia@email.com", password:"password")
    {
        token
    }
}
```

### code to generate token:

```
const createToken = async (user, secret, expiresIn) => {
    const { id, email, username, role } = user;
    return await jwt.sign({ id, email, username, role }, secret, { expiresIn });
};
```

### output:

```
{
    "data": {
        "signIn": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJyYW5pZWwxMDFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJSYW5pZWwiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE1Nzc1Mzk1NDksImV4cCI6MTU3NzU0MTM0OX0.GwVt2gHDfH9SNG5-FtGOGISEwG_HVu0ZvNBgR_bDmk8"
        }
    }
}
```
